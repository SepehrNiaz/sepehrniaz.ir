// Language understanding for the site's assistant. Runs entirely in the
// browser: Persian/English normalisation, light stemming, typo-tolerant
// keyword matching, intent scoring and entity extraction (contact details,
// money, counts, timelines, places, names). No network, no model files.
(function (root) {
  "use strict";

  // ── Characters & digits ─────────────────────────────────────
  const FA_DIGITS = "۰۱۲۳۴۵۶۷۸۹";
  const AR_DIGITS = "٠١٢٣٤٥٦٧٨٩";
  const toLatinDigits = (s) =>
    String(s == null ? "" : s)
      .replace(/[۰-۹]/g, (d) => FA_DIGITS.indexOf(d))
      .replace(/[٠-٩]/g, (d) => AR_DIGITS.indexOf(d));
  const toFaDigits = (s) => String(s).replace(/\d/g, (d) => FA_DIGITS[d]);

  // Unify Arabic/Persian letter variants, drop diacritics and joiners, lowercase
  function normalize(s) {
    return toLatinDigits(s)
      .replace(/[يى]/g, "ی")
      .replace(/ك/g, "ک")
      .replace(/ة/g, "ه")
      .replace(/[أإٱ]/g, "ا")
      .replace(/ؤ/g, "و")
      .replace(/ئ(?=\s|$)/g, "ی")
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[‌‍‎‏ ]/g, " ")
      .replace(/،/g, ",")
      .replace(/؟/g, "?")
      .replace(/؛/g, ";")
      .toLowerCase();
  }

  // Normalised text with punctuation turned into spaces (for matching)
  const clean = (s) =>
    normalize(s)
      .replace(/['’`]/g, "")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();

  const PERSIAN_RE = /[؀-ۿ]/g;
  const LATIN_RE = /[A-Za-z]/g;
  // "fa", "en" or null when the text has too few letters to tell
  function detectLanguage(s) {
    // Emails, links and numbers say nothing about the language
    s = String(s).replace(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g, " ").replace(/(?:https?:\/\/|www\.)\S+/g, " ");
    const fa = (String(s).match(PERSIAN_RE) || []).length;
    const en = (String(s).match(LATIN_RE) || []).length;
    if (fa >= 2 && fa >= en * 0.6) return "fa";
    if (en >= 3 && en > fa * 2) {
      // Latin-only text that is just an email/handle/brand isn't a language signal
      // One stray Latin word ("aligmail", "CCNA") isn't enough to switch language
      const words = clean(s).split(" ").filter((w) => /^[a-z]{2,}$/.test(w) && !EN_NEUTRAL.has(w));
      if (words.length >= 2 || (words.length === 1 && EN_SHORT.has(words[0]))) return "en";
    }
    return null;
  }
  const EN_SHORT = new Set(["yes", "no", "yeah", "yep", "nope", "hi", "hello", "hey", "thanks", "thank", "please", "sure", "skip", "help", "remote", "onsite", "email", "phone", "whatsapp", "telegram"]);
  // Words that show up in Persian messages too and shouldn't flip the language
  const EN_NEUTRAL = new Set(["it", "ok", "okay", "pc", "cctv", "vpn", "ccna", "f5", "ltm", "asm", "ceh", "cisco", "python", "linux", "windows", "excel", "instagram", "network", "security", "nmap", "wireshark", "gmail", "com", "www", "http", "https", "email", "ip", "lan", "wan", "wifi", "dvr", "nvr", "isp"]);

  // ── Tokens & stems ──────────────────────────────────────────
  const STOP_FA = new Set("و در به از که را با این آن اون برای یک یه من ما شما تو او هم رو هست است هستم هستیم هستید بود باشه باشد شده شد می نمی ها های تا اگر ولی اما یا چه چی چیه چطور کی کجا ام ای اش مون تون شون دیگه دیگر خیلی کمی یکم لطفا لطفاً ممنون سلام خب خوب آره بله نه یعنی پس همین".split(" "));
  const STOP_EN = new Set("a an the and or but if to of in on at for with from by about as is are am was were be been being i me my we our you your he she they them it its this that these those do does did have has had can could would should will shall may might must just so very really please hi hello hey thanks thank yes no not ok okay".split(" "));

  const FA_PREFIXES = ["نمی", "می"];
  const FA_SUFFIXES = ["هایی", "هایم", "هایت", "هایش", "هامون", "هاتون", "هاشون", "های", "ها", "ترین", "تری", "تر", "یی", "ای", "ام", "ات", "اش", "مان", "تان", "شان", "یم", "ید", "ند", "ه", "ی"];
  function stemFa(w) {
    let s = w;
    for (const p of FA_PREFIXES) if (s.length > p.length + 2 && s.startsWith(p)) { s = s.slice(p.length); break; }
    for (const suf of FA_SUFFIXES) {
      if (s.length - suf.length >= 3 && s.endsWith(suf)) { s = s.slice(0, -suf.length); break; }
    }
    return s;
  }
  function stemEn(w) {
    if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
    if (w.length > 4 && w.endsWith("ies")) return w.slice(0, -3) + "y";
    if (w.length > 4 && w.endsWith("ied")) return w.slice(0, -3) + "y";
    if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
    if (w.length > 4 && /(ss|x|ch|sh)es$/.test(w)) return w.slice(0, -2);
    if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss") && !w.endsWith("us")) return w.slice(0, -1);
    return w;
  }
  const isPersianWord = (w) => /[؀-ۿ]/.test(w);
  const stem = (w) => (isPersianWord(w) ? stemFa(w) : stemEn(w));

  function tokenize(s, keepStop) {
    return clean(s)
      .split(" ")
      .filter((w) => w && (keepStop || !(STOP_FA.has(w) || STOP_EN.has(w))));
  }
  const stems = (s, keepStop) => tokenize(s, keepStop).map(stem);

  // ── Fuzzy matching ──────────────────────────────────────────
  // Damerau-Levenshtein distance with an early exit once it passes `max`
  function editDistance(a, b, max) {
    if (a === b) return 0;
    if (Math.abs(a.length - b.length) > max) return max + 1;
    const prev2 = new Array(b.length + 1).fill(0);
    let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
      const cur = [i];
      let rowMin = i;
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        let v = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
        if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) v = Math.min(v, prev2[j - 2] + 1);
        cur[j] = v;
        if (v < rowMin) rowMin = v;
      }
      if (rowMin > max) return max + 1;
      for (let j = 0; j <= b.length; j++) prev2[j] = prev[j];
      prev = cur;
    }
    return prev[b.length];
  }

  // How well one input stem matches one keyword stem (0..1)
  function stemSimilarity(token, key) {
    if (token === key) return 1;
    if (key.length >= 4 && token.startsWith(key)) return 0.9;
    if (token.length >= 4 && key.startsWith(token) && token.length >= key.length - 2) return 0.85;
    const len = Math.max(token.length, key.length);
    // Short words are too easy to confuse ("مرسی" vs "مدرس"), so no typo tolerance below 5 letters
    if (Math.min(token.length, key.length) < 5) return 0;
    const max = len >= 8 ? 2 : 1;
    const d = editDistance(token, key, max);
    return d <= max ? (d === 1 ? 0.8 : 0.65) : 0;
  }

  // Prepare a keyword phrase once: its stems, or a raw substring for very short tokens
  const phraseCache = new Map();
  function preparePhrase(phrase) {
    let p = phraseCache.get(phrase);
    if (!p) {
      const norm = clean(phrase);
      p = { norm, stems: norm.split(" ").filter(Boolean).map(stem) };
      phraseCache.set(phrase, p);
    }
    return p;
  }

  // Score (0..1) for a keyword phrase against an analysed message
  function matchPhrase(msg, phrase) {
    const p = preparePhrase(phrase);
    if (!p.stems.length) return 0;
    // Exact phrase inside the normalised text is the strongest signal
    if ((" " + msg.norm + " ").includes(" " + p.norm + " ")) return 1;
    if (p.stems.length === 1) {
      let best = 0;
      for (const t of msg.stems) { const s = stemSimilarity(t, p.stems[0]); if (s > best) best = s; if (best === 1) break; }
      return best;
    }
    // Multi-word: every word must appear, roughly in order
    let total = 0, last = -1;
    for (const k of p.stems) {
      let best = 0, at = -1;
      msg.stems.forEach((t, i) => { const s = stemSimilarity(t, k); if (s > best) { best = s; at = i; } });
      if (best < 0.6) return 0;
      total += best * (at >= last ? 1 : 0.85);
      last = at;
    }
    return total / p.stems.length;
  }

  // Analyse a message once so it can be matched against many intents
  function analyse(text) {
    const norm = clean(text);
    return { raw: String(text), norm, stems: norm ? norm.split(" ").map(stem) : [], lang: detectLanguage(text) };
  }

  // Score every intent: weighted keyword hits plus best-matching example phrase.
  // intents: [{ id, keywords: [[phrase, weight], ...], examples: [phrase, ...], negative?: [...] }]
  function classify(msg, intents) {
    if (typeof msg === "string") msg = analyse(msg);
    const results = [];
    for (const intent of intents) {
      let score = 0;
      // One-word keywords: each word of the message counts once, for its strongest keyword
      const perToken = new Map();
      for (const [phrase, weight] of intent.keywords || []) {
        const p = preparePhrase(phrase);
        if (p.stems.length === 1) {
          let best = 0, at = -1;
          msg.stems.forEach((t, i) => { const sc = stemSimilarity(t, p.stems[0]); if (sc > best) { best = sc; at = i; } });
          if (best > 0 && best * weight > (perToken.get(at) || 0)) perToken.set(at, best * weight);
        } else {
          const m = matchPhrase(msg, phrase);
          if (m) score += m * weight;
        }
      }
      for (const v of perToken.values()) score += v;
      let ex = 0;
      for (const e of intent.examples || []) {
        const p = preparePhrase(e);
        if (!p.stems.length) continue;
        let hit = 0;
        for (const k of p.stems) {
          let best = 0;
          for (const t of msg.stems) { const s = stemSimilarity(t, k); if (s > best) best = s; }
          hit += best;
        }
        const sim = hit / Math.sqrt(p.stems.length * Math.max(1, msg.stems.length));
        if (sim > ex) ex = sim;
      }
      score += ex * 1.5;
      for (const phrase of intent.negative || []) if (matchPhrase(msg, phrase) >= 0.9) score *= 0.3;
      // Words that decide the kind of request ("teach me networking" is training, not networking)
      if (score > 0 && (intent.dominant || []).some((p) => matchPhrase(msg, p) >= 0.85)) score *= 1.6;
      if (score > 0) results.push({ id: intent.id, score });
    }
    return results.sort((a, b) => b.score - a.score);
  }

  // ── Number words ────────────────────────────────────────────
  const FA_NUM = {
    صفر: 0, یک: 1, یه: 1, یکی: 1, دو: 2, دوتا: 2, سه: 3, چهار: 4, پنج: 5, شش: 6, شیش: 6, هفت: 7, هشت: 8, نه: 9, ده: 10,
    یازده: 11, دوازده: 12, سیزده: 13, چهارده: 14, پانزده: 15, پونزده: 15, شانزده: 16, شونزده: 16, هفده: 17, هیفده: 17,
    هجده: 18, هیجده: 18, نوزده: 19, بیست: 20, سی: 30, چهل: 40, پنجاه: 50, شصت: 60, هفتاد: 70, هشتاد: 80, نود: 90,
    صد: 100, یکصد: 100, دویست: 200, سیصد: 300, چهارصد: 400, پانصد: 500, پونصد: 500, ششصد: 600, هفتصد: 700, هشتصد: 800, نهصد: 900
  };
  const EN_NUM = {
    zero: 0, one: 1, a: 1, an: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
    eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18, nineteen: 19,
    twenty: 20, thirty: 30, forty: 40, fifty: 50, sixty: 60, seventy: 70, eighty: 80, ninety: 90, hundred: 100, dozen: 12, couple: 2, few: 3
  };
  // Replace spelled-out numbers ("بیست و پنج", "twenty five") with digits.
  // Only when a number-ish context follows, so "نه" (no) and "a" stay words.
  const UNIT_HINT = /^(تا|عدد|دستگاه|نفر|کامپیوتر|سیستم|کاربر|دوربین|کارمند|پرسنل|میلیون|میلیارد|هزار|تومان|تومن|ریال|دلار|روز|هفته|ماه|سال|ساعت|computers?|pcs?|devices?|users?|people|employees|staff|cameras?|systems?|laptops?|million|billion|thousand|dollars?|toman|rials?|days?|weeks?|months?|years?|hours?|of)$/;
  function replaceNumberWords(text) {
    const words = text.split(/\s+/);
    const out = [];
    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const table = FA_NUM[w] !== undefined ? FA_NUM : EN_NUM[w] !== undefined ? EN_NUM : null;
      if (!table) { out.push(w); continue; }
      let total = 0, j = i, used = false;
      while (j < words.length) {
        const v = table[words[j]];
        if (v === undefined) break;
        if (v === 100 && total > 0 && total < 10) total *= 100; else total += v;
        used = true;
        j++;
        if (words[j] === "و" || words[j] === "and" || words[j] === "-") {
          if (table[words[j + 1]] !== undefined) { j++; continue; }
          break;
        }
      }
      const next = words[j] || "";
      const strong = total >= 11 || (table === FA_NUM && w !== "نه" && w !== "یه" && w !== "یک") || (table === EN_NUM && !["a", "an", "few", "couple"].includes(w));
      if (used && UNIT_HINT.test(next) && (strong || ["few", "couple", "dozen"].includes(w) || /^(تا|عدد)$/.test(next))) {
        out.push(String(total));
        i = j - 1;
      } else out.push(w);
    }
    return out.join(" ");
  }

  // ── Entities ────────────────────────────────────────────────
  const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/;
  function extractEmail(text) {
    const m = toLatinDigits(text).match(EMAIL_RE);
    return m ? m[0].replace(/\.$/, "").toLowerCase() : null;
  }

  // Iranian mobiles/landlines in any common form, normalised to +98…
  function extractPhone(text) {
    let t = toLatinDigits(text).replace(EMAIL_RE, " ");
    t = t.replace(/(\d)[\s\-().]+(?=\d)/g, "$1");
    let m = t.match(/(?:\+|00)98\s*0?(9\d{9})(?!\d)/) || t.match(/(?<!\d)0?(9\d{9})(?!\d)/);
    if (m) return "+98" + m[1];
    m = t.match(/(?:\+|00)98\s*0?([1-8]\d{9})(?!\d)/);
    if (m) return "+98" + m[1];
    m = t.match(/(?<!\d)0([1-8]\d{9})(?!\d)/);
    if (m) return "+98" + m[1];
    m = t.match(/\+(\d{8,15})(?!\d)/);
    if (m) return "+" + m[1];
    return null;
  }
  const isValidEmail = (s) => /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(String(s || "").trim());

  const URL_RE = /(?:https?:\/\/|www\.)[^\s]+|(?<![@\w])[a-z0-9-]+\.(?:com|ir|org|net|io|co)(?:\/[^\s]*)?/i;
  const extractUrl = (text) => { const m = String(text).match(URL_RE); return m ? m[0] : null; };

  // Money: "۵۰ میلیون"، "بین ۲۰ تا ۳۰ میلیون تومان"، "$500"، "2 billion rial", "توافقی"
  const SCALE = { هزار: 1e3, k: 1e3, thousand: 1e3, میلیون: 1e6, m: 1e6, mil: 1e6, million: 1e6, میلیارد: 1e9, b: 1e9, billion: 1e9 };
  const CURRENCY = { تومان: "toman", تومن: "toman", toman: "toman", tomans: "toman", ت: "toman", ریال: "rial", rial: "rial", rials: "rial", دلار: "usd", "$": "usd", usd: "usd", dollar: "usd", dollars: "usd", یورو: "eur", eur: "eur", euro: "eur", euros: "eur", "€": "eur" };
  const NEGOTIABLE = /(توافقی|قابل مذاکره|مذاکره|بستگی داره|بستگی دارد|هنوز مشخص نیست|مشخص نیست|negotiable|depends|open to discuss|tbd|to be discussed)/;
  function extractMoney(text) {
    const t = replaceNumberWords(normalize(text).replace(/,(?=\d{3})/g, "").replace(/٬/g, ""));
    const num = "(\\d+(?:\\.\\d+)?)";
    const scale = "(هزار|میلیون|میلیارد|thousand|million|billion|mil|k|m|b)?";
    const cur = "(تومان|تومن|ریال|دلار|یورو|toman|tomans|rials?|dollars?|usd|eur|euros?|\\$|€)?";
    const re = new RegExp(`(\\$|€)?\\s*${num}\\s*${scale}\\s*(?:(?:تا|الی|-|–|to|and)\\s*(\\$|€)?\\s*${num}\\s*${scale})?\\s*${cur}`, "g");
    let best = null;
    for (const m of t.matchAll(re)) {
      const [, pre1, n1, s1, pre2, n2, s2, c] = m;
      const scale1 = s1 && SCALE[s1], scale2 = s2 && SCALE[s2];
      const currency = CURRENCY[c] || CURRENCY[pre1] || CURRENCY[pre2] || null;
      if (!scale1 && !scale2 && !currency) continue; // a bare number isn't money
      // "k"/"m" right before a count word ("20 m2") is unlikely; accept as money only with scale or currency
      const sc2 = scale2 || scale1 || 1;
      const sc1 = scale1 || (n2 ? sc2 : 1);
      let min = parseFloat(n1) * sc1;
      let max = n2 ? parseFloat(n2) * sc2 : null;
      let cy = currency || (/[؀-ۿ]/.test(s1 || s2 || "") ? "toman" : sc1 >= 1e6 ? "toman" : "usd");
      if (cy === "rial") { min /= 10; if (max) max /= 10; cy = "toman"; }
      // "۱۵ تومن" for a budget or salary means 15 million in everyday Persian
      if (cy === "toman" && !scale1 && !scale2 && min < 1000 && (!max || max < 1000)) { min *= 1e6; if (max) max *= 1e6; }
      const before = t.slice(Math.max(0, m.index - 12), m.index);
      const kind = /(تا|تا سقف|سقف|حداکثر|زیر|کمتر از|up to|under|max|maximum|below)\s*$/.test(before) && !max ? "max" : /(حداقل|بالای|بیشتر از|at least|over|above|from)\s*$/.test(before) && !max ? "min" : max ? "range" : "about";
      const cand = { min, max, currency: cy, kind, text: m[0].trim() };
      if (!best || (max && !best.max) || min > best.min) best = cand;
    }
    if (best) return best;
    if (NEGOTIABLE.test(normalize(text))) return { negotiable: true, text: String(text).trim() };
    return null;
  }

  function formatAmount(v, cy, lang) {
    if (cy === "usd" || cy === "eur") {
      const sym = cy === "usd" ? "$" : "€";
      const s = v >= 1e6 ? `${+(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `${+(v / 1e3).toFixed(1)}K` : `${v}`;
      if (lang === "fa") {
        const w = v >= 1e6 ? `${toFaDigits(+(v / 1e6).toFixed(2))} میلیون` : v >= 1e3 ? `${toFaDigits(+(v / 1e3).toFixed(1))} هزار` : toFaDigits(v);
        return `${w} ${cy === "usd" ? "دلار" : "یورو"}`;
      }
      return `${sym}${s}`;
    }
    const units = lang === "fa" ? [[1e9, "میلیارد"], [1e6, "میلیون"], [1e3, "هزار"]] : [[1e9, "billion"], [1e6, "million"], [1e3, "thousand"]];
    for (const [n, name] of units) if (v >= n) { const x = +(v / n).toFixed(2); return lang === "fa" ? `${toFaDigits(x)} ${name}` : `${x} ${name}`; }
    return lang === "fa" ? toFaDigits(v) : String(v);
  }
  function formatMoney(m, lang) {
    if (!m) return "";
    if (m.negotiable) return lang === "fa" ? "توافقی / هنوز مشخص نیست" : "Negotiable / not decided yet";
    const unit = m.currency === "toman" ? (lang === "fa" ? " تومان" : " toman") : "";
    const a = formatAmount(m.min, m.currency, lang);
    if (m.max) {
      const b = formatAmount(m.max, m.currency, lang);
      const sa = a.split(" "), sb = b.split(" ");
      const first = sa.length === 2 && sb.length >= 2 && sa[1] === sb[1] ? sa[0] : a;
      return lang === "fa" ? `بین ${first} تا ${b}${unit}` : `${first} – ${b}${unit}`;
    }
    const pre = { max: lang === "fa" ? "تا سقف " : "up to ", min: lang === "fa" ? "حداقل " : "at least ", about: lang === "fa" ? "حدود " : "about " }[m.kind] || "";
    return `${pre}${a}${unit}`;
  }
  // Rough value in toman for lead scoring
  const moneyInToman = (m) => (!m || m.negotiable ? 0 : (m.max || m.min) * (m.currency === "usd" ? 60000 : m.currency === "eur" ? 65000 : 1));

  // Counts: "۲۰ دستگاه"، "twenty computers", "a team of 15"
  const COUNT_UNITS = {
    device: /^(دستگاه|کامپیوتر|کامپیوتری|سیستم|رایانه|لپتاپ|لپ تاپ|pc|pcs|computers?|devices?|laptops?|systems?|workstations?|machines?)$/,
    user: /^(نفر|کاربر|کارمند|پرسنل|کارکن|نیرو|users?|people|persons?|employees|staff|members|students?|participants?|trainees?)$/,
    camera: /^(دوربین|cameras?|cctv)$/,
    branch: /^(شعبه|دفتر|branch|branches|offices?|sites?)$/
  };
  function extractCounts(text) {
    const words = replaceNumberWords(clean(text)).split(" ");
    const out = {};
    for (let i = 0; i < words.length; i++) {
      if (!/^\d+$/.test(words[i])) continue;
      const n = parseInt(words[i], 10);
      if (n <= 0 || n > 100000) continue;
      for (let k = 1; k <= 2; k++) {
        const w = words[i + k];
        if (!w) break;
        if (w === "تا" || w === "عدد" || w === "of" || w === "or" || w === "تایی") continue;
        let hit = false;
        for (const [kind, re] of Object.entries(COUNT_UNITS)) if (re.test(w) && out[kind] === undefined) { out[kind] = n; hit = true; break; }
        break;
      }
    }
    return out;
  }
  // A lone number answer ("20", "حدود ۵۰") when we asked for a count
  function extractBareNumber(text) {
    const t = replaceNumberWords(clean(text) + " تا");
    const m = t.match(/(?:^|\s)(\d{1,6})(?:\s|$)/);
    return m ? parseInt(m[1], 10) : null;
  }

  // Timelines and urgency
  const JALALI = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
  const GREG = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const TIMELINE_RULES = [
    [/(همین الان|همین الآن|الان|فوری|فورا|فوراً|اورژانسی|اضطراری|خیلی عجله|عجله دارم|سریع|هرچه زودتر|هر چه زودتر|asap|urgent|urgently|right now|immediately|emergency|as soon as possible)/, "high", "فوری / هرچه زودتر", "As soon as possible", 1],
    [/(امروز|امشب|today|tonight)/, "high", "امروز", "Today", 0],
    [/(فردا|پس فردا|tomorrow)/, "high", "فردا", "Tomorrow", 1],
    [/(این هفته|همین هفته|آخر هفته|اخر هفته|تا آخر هفته|this week|end of the week|weekend|within the week)/, "high", "همین هفته", "This week", 5],
    [/(هفته بعد|هفته ی بعد|هفته آینده|هفته ی آینده|هفته دیگه|next week|in a week|within a week|one week)/, "normal", "هفته‌ی آینده", "Next week", 10],
    [/(دو هفته|۲ هفته|2 هفته|two weeks|2 weeks|couple of weeks|a fortnight)/, "normal", "تا دو هفته‌ی آینده", "Within two weeks", 14],
    [/(این ماه|همین ماه|تا آخر ماه|اخر ماه|آخر ماه|this month|end of the month|within a month)/, "normal", "همین ماه", "This month", 25],
    [/(ماه بعد|ماه ی بعد|ماه آینده|ماه ی آینده|ماه دیگه|next month|in a month)/, "normal", "ماه آینده", "Next month", 40],
    [/(چند ماه|سه ماه|۳ ماه|3 ماه|فصل بعد|few months|couple of months|next quarter|3 months|three months)/, "low", "طی چند ماه آینده", "In a few months", 90],
    [/(عجله ای نیست|عجله‌ای نیست|عجله ندارم|زمانش مهم نیست|منعطف|هر وقت|هروقت|no rush|not urgent|no hurry|flexible|whenever|anytime|any time|later|eventually)/, "low", "عجله‌ای نیست / منعطف", "No rush / flexible", 120]
  ];
  function extractTimeline(text) {
    const n = replaceNumberWords(clean(text));
    for (const [re, urgency, fa, en, days] of TIMELINE_RULES) if (re.test(n)) return { urgency, fa, en, days };
    let m = n.match(/(\d+)\s*(روز|هفته|ماه|سال|days?|weeks?|months?|years?)/);
    if (m) {
      const k = parseInt(m[1], 10);
      const unit = m[2];
      const mult = /روز|day/.test(unit) ? 1 : /هفته|week/.test(unit) ? 7 : /ماه|month/.test(unit) ? 30 : 365;
      const days = k * mult;
      const faUnit = { 1: "روز", 7: "هفته", 30: "ماه", 365: "سال" }[mult];
      const enUnit = { 1: "day", 7: "week", 30: "month", 365: "year" }[mult] + (k > 1 ? "s" : "");
      return { urgency: days <= 7 ? "high" : days <= 45 ? "normal" : "low", fa: `ظرف ${toFaDigits(k)} ${faUnit}`, en: `Within ${k} ${enUnit}`, days };
    }
    for (const month of JALALI) {
      const d = n.match(new RegExp(`(?:^|\\s)(\\d{1,2})\\s*${month}(?=\\s|$)`));
      const ctx = n.match(new RegExp(`(?:^|\\s)(اول|اوایل|اواسط|اواخر|آخر|اخر|نیمه|تا|از|قبل از|بعد از)\\s*(?:ماه\\s*)?${month}(?=\\s|$)|(?:^|\\s)ماه\\s*${month}(?=\\s|$)|(?:^|\\s)${month}\\s*ماه(?=\\s|$)`));
      if (d || ctx) {
        const label = d ? `${toFaDigits(d[1])} ${month}` : ctx[0].trim();
        return { urgency: "normal", fa: label, en: d ? `${d[1]} ${month}` : label, days: 30 };
      }
    }
    for (const month of GREG) if (new RegExp(`\\b${month}\\b`).test(n)) {
      const d = n.match(new RegExp(`(\\d{1,2})\\s*${month}|${month}\\s*(\\d{1,2})`));
      const day = d && (d[1] || d[2]);
      const cap = month[0].toUpperCase() + month.slice(1);
      return { urgency: "normal", fa: day ? `${toFaDigits(day)} ${cap}` : cap, en: day ? `${cap} ${day}` : cap, days: 30 };
    }
    return null;
  }

  // Places
  const CITIES = {
    شیراز: "Shiraz", تهران: "Tehran", اصفهان: "Isfahan", مشهد: "Mashhad", تبریز: "Tabriz", کرج: "Karaj", اهواز: "Ahvaz", قم: "Qom",
    کرمان: "Kerman", یزد: "Yazd", بوشهر: "Bushehr", رشت: "Rasht", ارومیه: "Urmia", ساری: "Sari", کرمانشاه: "Kermanshah", همدان: "Hamadan",
    زاهدان: "Zahedan", بندرعباس: "Bandar Abbas", "بندر عباس": "Bandar Abbas", اراک: "Arak", قزوین: "Qazvin", زنجان: "Zanjan", گرگان: "Gorgan",
    مرودشت: "Marvdasht", کازرون: "Kazerun", جهرم: "Jahrom", فسا: "Fasa", لار: "Lar", داراب: "Darab", آباده: "Abadeh", صدرا: "Sadra",
    کیش: "Kish", قشم: "Qeshm", دبی: "Dubai"
  };
  const CITY_EN = Object.fromEntries(Object.values(CITIES).map((c) => [c.toLowerCase(), c]));
  function extractLocation(text) {
    const n = clean(text);
    const out = {};
    if (/(دورکاری|دور کاری|ریموت|از راه دور|راه دور|آنلاین|انلاین|اینترنتی|غیرحضوری|غیر حضوری|انی دسک|anydesk|remote|remotely|online|virtual|work from home|wfh)/.test(n)) out.mode = "remote";
    if (/(حضوری|محل|دفتر ما|شرکت ما|on site|onsite|on-site|in person|in-person|at our office|on location)/.test(n)) out.mode = out.mode === "remote" ? "hybrid" : "onsite";
    if (/(ترکیبی|هیبرید|hybrid)/.test(n)) out.mode = "hybrid";
    for (const [fa, en] of Object.entries(CITIES)) if ((" " + n + " ").includes(" " + fa + " ") || (" " + n + " ").includes(" " + fa)) { out.city = en; break; }
    if (!out.city) for (const [low, en] of Object.entries(CITY_EN)) if (new RegExp(`\\b${low}\\b`).test(n)) { out.city = en; break; }
    return Object.keys(out).length ? out : null;
  }

  // Employment type
  function extractEmployment(text) {
    const n = clean(text);
    if (/(تمام وقت|تمام‌وقت|فول تایم|full time|fulltime|full-time|permanent|استخدام دائم)/.test(n)) return "full_time";
    if (/(پاره وقت|پاره‌وقت|نیمه وقت|پارت تایم|part time|part-time|parttime)/.test(n)) return "part_time";
    if (/(کارآموزی|کاراموزی|internship|intern)/.test(n)) return "internship";
    if (/(پروژه ای|پروژه‌ای|قراردادی|موقت|فریلنس|contract|freelance|project based|project-based|temporary)/.test(n)) return "contract";
    return null;
  }

  // Yes / no / skip / unsure
  const YES = /^(بله|بلی|آره|اره|آری|اری|اوهوم|درسته|درست است|صحیحه|صحیح است|دقیقا|دقیقاً|اوکی|اوکیه|باشه|حتما|حتماً|قبول|موافقم|تایید|تأیید|تایید میکنم|ارسال کن|بفرست|yes|yeah|yep|yup|ya|sure|ok|okay|correct|right|exactly|confirm|confirmed|send it|go ahead|looks good|perfect|all good|that's right|thats right)(\s|$)/;
  const NO = /^(نه|نخیر|خیر|نچ|اصلا|اصلاً|غلطه|اشتباهه|اشتباه است|درست نیست|no|nope|nah|not really|wrong|incorrect|not correct|cancel)(\s|$)/;
  const SKIP = /(?:^|\s)(نمی دونم|نمیدونم|نمی دانم|نمیدانم|مطمئن نیستم|ایده ای ندارم|فعلا نه|رد کن|رد شو|بگذر|بعدا میگم|بعدا می گم|مهم نیست|ندارم|هیچی|بی خیال|بیخیال|نمیخوام بگم|نمی خوام بگم|ترجیح میدم نگم|skip|pass|don't know|dont know|do not know|dunno|not sure|no idea|n a|none|nothing|no preference|doesn't matter|doesnt matter|rather not say|prefer not to say)(?=\s|$)/;
  // Like clean() but keeps apostrophes ("don't")
  const soft = (t) => normalize(t).replace(/[^\p{L}\p{N}\s']/gu, " ").replace(/\s+/g, " ").trim();
  const isYes = (t) => YES.test(soft(t));
  const isNo = (t) => NO.test(soft(t));
  const isSkip = (t) => SKIP.test(soft(t)) && soft(t).split(" ").length <= 6;
  const isQuestion = (t) => /[?؟]\s*$/.test(String(t).trim()) || /^(آیا|چطور|چگونه|چه|چی|کی|کجا|چرا|چند|کدام|کدوم|what|how|who|where|when|why|which|do you|does he|is he|can you|can he|are you)(\s|$)/.test(clean(t));

  // Names
  const NAME_STOP = new Set("همین امروز فردا دیروز دیشب الان اگه اگر بشه نشه میشه نمیشه باشه فقط نه بله آره اره اوکی ممنون مرسی لطفا سلام خداحافظ ایمیل ایمیلم شماره شمارم تلفن موبایل واتساپ تلگرام کار شرکت پروژه مشکل دارم ندارم میخوام نمیخوام هست نیست چی چرا کجا چطور خوب بد عالی هیچی حتما خیلی کم زیاد هفته ماه سال تومان میلیون فوری عجله ای قیمت سوال کمک راستش اینکه today tomorrow yesterday yes no thanks please hello email phone whatsapp telegram sure maybe nothing none great good fine help question urgent asap thank looking interested from a an the here trying not sure available sorry fine good ok okay just calling writing contacting reaching hoping wondering going working new glad happy fine with in at on for to and or the manager owner student engineer developer هم که از در به با برای دنبال نیازمند علاقه‌مند علاقمند خوشحال ممنون مدیر صاحب کارشناس دانشجو مهندس یک یه شرکت آقای خانم جناب سرکار نماینده اینجا".split(" "));
  const TITLE_RE = /^(آقای|اقای|خانم|جناب|سرکار|دکتر|مهندس|mr\.?|mrs\.?|ms\.?|miss|dr\.?|eng\.?)\s+/i;
  function tidyName(s) {
    let n = String(s).replace(/[.,،!?؟:;"'()]/g, " ").replace(/\s+/g, " ").trim();
    const title = n.match(TITLE_RE);
    n = n.replace(TITLE_RE, "");
    let words = n.split(" ").filter(Boolean);
    const cut = words.findIndex((w, i) => i > 0 && NAME_STOP.has(w.toLowerCase()));
    if (cut > 0) words = words.slice(0, cut);
    if (!words.length || words.length > 4) return null;
    if (words.some((w) => /\d|@/.test(w) || w.length < 2 || NAME_STOP.has(w.toLowerCase()))) return null;
    const pretty = words.map((w) => (/^[a-z]/i.test(w) ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w)).join(" ");
    return title ? `${title[1].replace(/\.$/, "")} ${pretty}` : pretty;
  }
  function extractName(text, expecting) {
    const raw = normalize(text).replace(EMAIL_RE, " ");
    const pats = [
      /(?:اسمم|اسم من|نام من|نامم|اسم بنده|نام بنده)\s*(?:هم)?\s*[:：]?\s*([\p{L}\s]{2,40}?)\s*(?:هست|است|ه|هستش|می باشد|میباشد|می‌باشد)?(?=[.,!?\n]|$|\s+(?:و|هستم|از|ایمیلم|شمارم|شماره|ایمیل))/u,
      /(?:^|[\s.,!])(?:من|بنده)\s+([\p{L}]{2,}(?:\s+[\p{L}]{2,}){0,2})\s+(?:هستم|هستش)/u,
      /(?:my name is|my name's|name is|name:|this is|call me)\s+([a-z][a-z'-]+(?:\s+[a-z][a-z'-]+){0,2})/i,
      /(?:^|[\s.,!])(?:i am|i'm|im)\s+([a-z][a-z'-]+(?:\s+[a-z][a-z'-]+)?)(?=[.,!]|$|\s+(?:and|from|with|my|at|,))/i
    ];
    for (const re of pats) {
      const m = raw.match(re);
      if (m) { const n = tidyName(m[1]); if (n) return n; }
    }
    if (expecting) {
      // Whole answer is the name ("Ali Rezaei", "علی رضایی هستم")
      const stripped = raw
        .replace(/^(سلام|درود|hi|hello|hey)[\s,!]*/i, "")
        .replace(/^(من|بنده|i'm|i am|it's|its|im)\s+/i, "")
        .replace(/\s*(هستم|هستش|هست|است|here)\s*[.!]*$/i, "")
        .replace(/[.!]+$/, "");
      return tidyName(stripped);
    }
    return null;
  }

  // Company / organisation
  function extractCompany(text) {
    const raw = normalize(text);
    const stopFa = /\s+(هستم|هستیم|است|هست|در|برای|از|و|که|با|میخواهد|می خواهد|میخوایم|نیاز|دنبال|به|را|رو)(\s|$)/;
    let m = raw.match(/(?:شرکت|موسسه|مؤسسه|سازمان|هتل|فروشگاه|دفتر|استارتاپ|گروه|کارخانه|مدرسه|دانشگاه|کلینیک|بیمارستان|رستوران)\s+([\p{L}\d][\p{L}\d\s&.-]{1,40})/u);
    // "یه شرکت نرم‌افزاری" describes the company, it isn't its name
    if (m && /(?:^|\s)(یه|یک|یکی از)\s*$/.test(raw.slice(0, m.index))) m = null;
    if (m) {
      const kind = raw.slice(m.index).split(/\s+/)[0];
      let name = m[1].split(stopFa)[0].trim().split(" ").slice(0, 3).join(" ");
      name = name.replace(/[.,!?]+$/, "");
      if (name && !NAME_STOP.has(name) && !/^(ما|من|شما|خودمون|خودم|کوچک|بزرگ)$/.test(name)) return `${kind} ${name}`;
    }
    const orig = String(text);
    m = orig.match(/\b([A-Z][\w&.-]*(?:\s+[A-Z][\w&.-]*){0,3})\s+(?:company|co\.?|inc\.?|ltd\.?|llc|group|corp\.?|corporation|hotel|agency|studio)\b/);
    if (m) return m[0].trim();
    m = orig.match(/\b(?:work(?:ing)? (?:at|for)|from|at|with|represent(?:ing)?)\s+([A-Z][\w&.-]*(?:\s+[A-Z][\w&.-]*){0,3})/);
    if (m && !/^(Shiraz|Tehran|Iran|I|The|A)$/.test(m[1])) return m[1].trim();
    return null;
  }

  // Everything we can pull out of one message
  function extractAll(text) {
    return {
      email: extractEmail(text),
      phone: extractPhone(text),
      url: extractUrl(text),
      money: extractMoney(text),
      counts: extractCounts(text),
      timeline: extractTimeline(text),
      location: extractLocation(text),
      employment: extractEmployment(text),
      name: extractName(text, false),
      company: extractCompany(text)
    };
  }

  root.SepehrBot = root.SepehrBot || {};
  root.SepehrBot.nlu = {
    normalize, clean, toLatinDigits, toFaDigits, detectLanguage, tokenize, stems, stem, editDistance,
    analyse, matchPhrase, classify, replaceNumberWords,
    extractEmail, extractPhone, isValidEmail, extractUrl, extractMoney, formatMoney, moneyInToman,
    extractCounts, extractBareNumber, extractTimeline, extractLocation, extractEmployment,
    extractName, extractCompany, extractAll, isYes, isNo, isSkip, isQuestion, CITIES
  };
})(typeof window !== "undefined" ? window : globalThis);
