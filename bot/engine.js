// The assistant's dialogue engine. It works out what the visitor needs,
// fills in what it can from their own words, asks only for what's missing,
// answers side questions without losing its place, lets people skip, go
// back or correct an answer, shows a summary to confirm, and finally builds
// a categorised, prioritised request for Sepehr.
//
// Usage: const bot = SepehrBot.createEngine({ cv, lang });
//        bot.start() / bot.handle(value, label) → { bubbles, done, lead, progress }
(function (root) {
  "use strict";
  const { nlu, knowledge: K } = root.SepehrBot;

  const CMD = "\u0001"; // prefix for values sent by chips/buttons
  const cmd = (s) => CMD + s;

  // Small seeded PRNG so phrasing varies but a restored chat stays consistent
  function rng(state) {
    let t = (state.seed = (state.seed + 0x6d2b79f5) | 0);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  const ORG_SLOT = { id: "org", type: "text", label: { fa: "شرکت", en: "Company" } };
  const ANSWERABLE = ["about", "skills", "certs", "experience", "education", "location", "availability", "rates", "contact_direct", "languages", "projects"];

  function createEngine(opts) {
    const cv = opts.cv;
    const now = opts.now || (() => new Date());
    let state = fresh(opts.lang || "fa");

    function fresh(lang) {
      return { v: 2, lang, phase: "start", category: null, slots: {}, skipped: {}, pending: null, stack: [], fails: {}, unclear: 0, suggest: null, history: [], seed: (Date.now() % 100000) | 0, sentOk: null };
    }

    // ── Helpers ────────────────────────────────────────────────
    const L = () => state.lang;
    const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "fa" in v) ? (v[L()] != null ? v[L()] : v.en) : v);
    const num = (n) => (L() === "fa" ? nlu.toFaDigits(n) : String(n));
    const pick = (arr) => arr[Math.floor(rng(state) * arr.length)];
    // "Ali" from "Ali Rezaei", but keep "خانم احمدی" / "Dr. Karimi" whole
    const firstName = () => {
      if (!state.slots.name) return "";
      const n = state.slots.name.text;
      return /^(آقای|خانم|جناب|سرکار|دکتر|مهندس|Mr|Mrs|Ms|Miss|Dr|Eng)(\.|\s|$)/i.test(n) ? n : n.split(" ")[0];
    };
    function say(key, vars) {
      const p = K.PHRASES[key];
      let s = pick(p[L()] || p.en);
      const v = Object.assign({ name: "" }, vars || {});
      s = s.replace(/\{name\}،\s*/g, v.name ? `${v.name}، ` : "").replace(/\{name\},\s*/g, v.name ? `${v.name}, ` : "");
      return s.replace(/\{(\w+)\}/g, (_, k) => (v[k] != null ? v[k] : ""));
    }
    const category = () => K.CATEGORIES.find((c) => c.id === state.category);
    const allSlots = () => (category() ? category().slots : []).concat(K.CONTACT_SLOTS);
    const slotDef = (id) => {
      if (id && id.endsWith("__city")) {
        const base = allSlots().find((s) => s.id === id.slice(0, -6));
        return { id, type: "city", base: base && base.id, label: { fa: "شهر", en: "City" }, ask: { fa: ["در کدام شهر؟"], en: ["Which city?"] } };
      }
      return allSlots().find((s) => s.id === id);
    };

    // Order of questions still to ask (respecting conditions)
    function sequence() {
      const seq = [];
      const add = (s) => {
        if (s.when && !s.when(state)) return;
        seq.push(s);
        const v = state.slots[s.id];
        if (s.type === "location" && v && v.v === "other_city" && !v.city) seq.push(slotDef(s.id + "__city"));
      };
      (category() ? category().slots : []).forEach(add);
      const sl = state.slots;
      K.CONTACT_SLOTS.forEach((s) => {
        if (s.id === "contact_method" && (sl.email && !sl.phone)) return; // email given → that's the method
        if (s.id === "email") { const m = sl.contact_method && sl.contact_method.v; if (!(m === "email" || (!m && sl.email))) return; }
        if (s.id === "phone") { const m = sl.contact_method && sl.contact_method.v; if (!(["phone", "whatsapp", "telegram"].includes(m) || (!m && sl.phone && !sl.email))) return; }
        add(s);
      });
      return seq;
    }
    const isDone = (s) => state.slots[s.id] != null || state.skipped[s.id];
    const nextSlot = () => sequence().find((s) => !isDone(s));
    function progress() {
      if (!state.category) return 0;
      const seq = sequence();
      const done = seq.filter(isDone).length;
      return state.phase === "done" ? 1 : Math.min(0.97, done / Math.max(1, seq.length));
    }

    // ── Showing values ─────────────────────────────────────────
    function display(s, val, lang) {
      lang = lang || L();
      if (!val) return "";
      const t = (o) => (o && typeof o === "object" ? (o[lang] != null ? o[lang] : o.en) : o);
      switch (s.type) {
        case "money": return val.money ? nlu.formatMoney(val.money, lang) : val.text;
        case "timeline": return val.fa ? (lang === "fa" ? val.fa : val.en) : val.text;
        case "count": return val.n != null ? (lang === "fa" ? nlu.toFaDigits(val.n) : String(val.n)) : val.text;
        case "location": {
          if (val.text && !val.v) return val.text;
          const chip = (s.chips || []).find((c) => c.v === val.v);
          const modeLabel = { onsite: { fa: "حضوری", en: "On-site" }, remote: { fa: "از راه دور", en: "Remote" }, hybrid: { fa: "ترکیبی", en: "Hybrid" }, other_city: { fa: "حضوری", en: "On-site" }, any: { fa: "فرقی نمی‌کند", en: "Either" } }[val.v];
          if (val.city) {
            const city = lang === "fa" ? (Object.keys(nlu.CITIES).find((k) => nlu.CITIES[k] === val.city) || val.city) : val.city;
            return `${t(modeLabel) || ""}${modeLabel ? (lang === "fa" ? " در " : " in ") : ""}${city}`.trim();
          }
          return chip ? t(chip) : t(modeLabel) || val.text || "";
        }
        case "choice": case "yesno": {
          if (val.text && (val.v === "other" || !val.v)) return val.text;
          const chip = (s.chips || []).find((c) => c.v === val.v);
          if (chip) return t(chip).replace(/^[^\p{L}\p{N}]+/u, "");
          if (s.type === "yesno") return val.v === "yes" ? (lang === "fa" ? "بله" : "Yes") : (lang === "fa" ? "نه" : "No");
          return val.text || val.v;
        }
        default: return val.text;
      }
    }

    // ── Chips ─────────────────────────────────────────────────
    const categoryChips = () => K.CATEGORIES.map((c) => ({ label: tr(c.chip), value: cmd("cat:" + c.id) }));
    function slotChips(s) {
      const chips = (s.chips || []).map((c) => ({ label: tr(c), value: cmd("opt:" + c.v) }));
      if (s.optional && !(s.chips || []).some((c) => c.v === "skip")) chips.push({ label: L() === "fa" ? "رد شدن ⏭" : "Skip ⏭", value: cmd("skip"), ghost: true });
      return chips;
    }

    function ask(s, prefix) {
      let q = pick(tr(s.ask));
      const n = firstName();
      q = q.replace(/\{name\}،\s*/g, n ? `${n}، ` : "").replace(/\{name\},\s*/g, n ? `${n}, ` : "");
      if (q && !q.includes(n) && n && rng(state) < 0.25 && s.type !== "name") q = (L() === "fa" ? `${n}، ` : `${n}, `) + q[0].toLowerCase() + q.slice(1);
      if (L() === "en" && q) q = q[0].toUpperCase() + q.slice(1);
      state.pending = s.id;
      const text = prefix ? `${prefix}\n\n${q}` : q;
      return { text, chips: slotChips(s) };
    }

    // Move on: next question, or the summary when nothing is left
    function advance(prefix) {
      const s = nextSlot();
      if (s) { state.phase = "slots"; return [ask(s, prefix)]; }
      return showSummary(prefix);
    }

    function summaryRows(lang) {
      const rows = [{ id: "category", label: lang === "fa" ? "دسته‌بندی" : "Category", value: `${category().emoji} ${(category().label)[lang]}` }];
      if (state.slots.org) rows.push({ id: "org", label: ORG_SLOT.label[lang], value: state.slots.org.text, readonly: true });
      sequence().forEach((s) => {
        const v = state.slots[s.id];
        if (v == null) return;
        const label = s.type === "city" ? (lang === "fa" ? "شهر" : "City") : s.label[lang];
        rows.push({ id: s.id, label, value: display(s, v, lang) });
      });
      return rows;
    }
    function showSummary(prefix) {
      state.phase = "confirm";
      state.pending = null;
      const intro = say("summaryIntro");
      return [{
        text: prefix ? `${prefix}\n\n${intro}` : intro,
        card: {
          kind: "summary",
          rows: summaryRows(L()).map((r) => Object.assign(r, r.readonly ? {} : { edit: cmd("edit:" + r.id) })),
          actions: [
            { label: L() === "fa" ? "✅ ارسال برای سپهر" : "✅ Send to Sepehr", value: cmd("confirm"), primary: true },
            { label: L() === "fa" ? "✏️ ویرایش" : "✏️ Edit", value: cmd("edit?") }
          ]
        }
      }];
    }

    // ── Understanding an answer to a specific question ─────────
    function matchChoice(s, text, threshold) {
      const msg = nlu.analyse(text);
      let best = null, bestScore = 0, bestPos = -1;
      for (const c of s.chips || []) {
        if (c.v === "skip") continue;
        const words = [c.fa, c.en].concat(c.match || []);
        let sc = 0;
        for (const w of words) {
          const plain = String(w).replace(/[^\p{L}\p{N}\s/+]/gu, " ").replace(/\s+/g, " ").trim();
          if (!plain) continue;
          if (nlu.clean(plain) === msg.norm) { sc = 1.2; break; }
          sc = Math.max(sc, nlu.matchPhrase(msg, plain));
        }
        const pos = firstPos(msg, words);
        const later = msg.lang === "fa" || (!msg.lang && L() === "fa") ? pos < bestPos : pos > bestPos;
        if (sc > bestScore + 0.01 || (Math.abs(sc - bestScore) <= 0.01 && sc > 0 && later)) { bestScore = sc; best = c; bestPos = pos; }
      }
      return bestScore >= (threshold || 0.8) ? best : null;
    }

    // Where in the message an option's words first appear (for breaking ties)
    function firstPos(msg, words) {
      let pos = -1;
      for (const w of words) {
        const st = nlu.stems(String(w));
        if (!st.length) continue;
        const i = msg.stems.findIndex((x) => x === st[0] || (st[0].length >= 4 && x.startsWith(st[0])));
        if (i >= 0 && (pos < 0 || i < pos)) pos = i;
      }
      return pos < 0 ? 999 : pos;
    }

    const TIMELINE_CHIP_VALUES = {
      asap: { urgency: "high", fa: "هرچه زودتر", en: "As soon as possible", days: 2 },
      today: { urgency: "high", fa: "همین امروز", en: "Today", days: 0 },
      this_week: { urgency: "high", fa: "همین هفته", en: "This week", days: 5 },
      this_month: { urgency: "normal", fa: "همین ماه", en: "This month", days: 25 },
      flexible: { urgency: "low", fa: "عجله‌ای نیست", en: "No rush", days: 90 }
    };

    // Does the message clearly carry a different kind of information than this question asks for?
    function foreignInfo(s, ents) {
      const t = s.type;
      if (ents.email && t !== "email") return true;
      if (ents.phone && t !== "phone") return true;
      if (ents.money && !ents.money.negotiable && t !== "money") return true;
      if (ents.timeline && t !== "timeline" && t !== "text") return true;
      if (ents.counts && Object.keys(ents.counts).length && t !== "count") return true;
      if (ents.location && t !== "location" && t !== "city" && t !== "text") return true;
      if (ents.company && !["text", "longtext"].includes(t)) return true;
      return false;
    }

    // Returns { value } | { skip } | { error } | null (didn't understand)
    function parseAnswer(s, text, ents, chipValue) {
      const skipWords = nlu.isSkip(text);
      const t = String(text).trim();
      if (chipValue === "skip") return { skip: true };
      if (s.optional && s.type !== "yesno" && !chipValue && nlu.isNo(t) && t.split(/\s+/).length <= 3) return { skip: true };
      switch (s.type) {
        case "choice": case "yesno": {
          if (s.type === "yesno") {
            if (chipValue === "yes" || nlu.isYes(t)) return { value: { v: "yes" } };
            if (chipValue === "no" || nlu.isNo(t)) return { value: { v: "no" } };
            if (skipWords) return { skip: true };
            return null;
          }
          if (chipValue) { const c = (s.chips || []).find((x) => x.v === chipValue); if (c) return { value: { v: c.v } }; }
          // A contact detail typed instead of picking a method
          if (s.id === "contact_method") {
            if (ents.email) return { value: { v: "email" } };
            if (ents.phone) return { value: { v: /واتس|whats/i.test(t) ? "whatsapp" : /تلگرام|telegram/i.test(t) ? "telegram" : "phone" } };
          }
          const c = matchChoice(s, t);
          if (c) return { value: { v: c.v } };
          if (skipWords) return { skip: true };
          if (s.allowOther && t.length >= 2 && !nlu.isYes(t) && !nlu.isNo(t) && !foreignInfo(s, ents)) return { value: { v: "other", text: t }, weak: true };
          return null;
        }
        case "text":
          if (chipValue) { const c = (s.chips || []).find((x) => x.v === chipValue); if (c) return { value: { text: c[L()] || c.en, v: c.v } }; }
          if (skipWords) return { skip: true };
          if (s.id === "company" || s.id === "organization") { if (ents.company) return { value: { text: ents.company } }; }
          return t.length >= 2 && !foreignInfo(s, ents) ? { value: { text: t }, weak: t.split(/\s+/).length <= 1 } : null;
        case "longtext":
          if (skipWords) return { skip: true };
          if (s.optional && nlu.isNo(t) && t.split(/\s+/).length <= 5) return { skip: true };
          if (s.optional && nlu.isYes(t) && t.split(/\s+/).length <= 2) return { error: "goAhead" };
          if (t.replace(/\s/g, "").length < 4) return { error: "tooShort" };
          return { value: { text: t } };
        case "money": {
          if (chipValue === "negotiable") return { value: { money: { negotiable: true } } };
          if (ents.money) return { value: { money: ents.money } };
          if (skipWords) return { skip: true };
          const n = nlu.extractBareNumber(t);
          if (n != null) {
            // A bare number: in Iran that's almost always millions of toman
            const money = n < 1000 ? { min: n * 1e6, currency: "toman", kind: "about" } : { min: n, currency: "toman", kind: "about" };
            return { value: { money } };
          }
          return t.length >= 2 && !foreignInfo(s, ents) ? { value: { text: t }, weak: true } : null;
        }
        case "timeline": {
          if (chipValue && TIMELINE_CHIP_VALUES[chipValue]) return { value: Object.assign({}, TIMELINE_CHIP_VALUES[chipValue]) };
          if (ents.timeline) return { value: ents.timeline };
          if (/(فرقی نمی|فرق نمی|مهم نیست|هر وقت|هروقت|doesn'?t matter|whenever|any ?time|no preference)/i.test(nlu.normalize(t))) return { value: Object.assign({}, TIMELINE_CHIP_VALUES.flexible) };
          if (skipWords) return { skip: true };
          return t.length >= 2 && !foreignInfo(s, ents) ? { value: { text: t }, weak: true } : null;
        }
        case "count": {
          if (chipValue) { const c = (s.chips || []).find((x) => x.v === chipValue); if (c) return { value: /^\d+$/.test(chipValue) && chipValue === "1" ? { n: 1 } : { text: c[L()] || c.en, v: c.v } }; }
          const kinds = s.countKind || ["device"];
          for (const k of kinds) if (ents.counts && ents.counts[k] != null) return { value: { n: ents.counts[k] } };
          const n = nlu.extractBareNumber(t);
          if (n != null) return { value: { n } };
          if (skipWords) return { skip: true };
          const chip = matchChoice(s, t);
          if (chip) return { value: chip.v === "1" ? { n: 1 } : { text: chip[L()] || chip.en, v: chip.v } };
          // Vague amounts are fine ("خیلی زیاد", "a few"); anything else needs a number
          if (/(زیاد|کم|چند|تعدادی|همه|کلی|few|many|several|lots|a lot|dozens|hundreds|all|whole)/i.test(nlu.normalize(t))) return { value: { text: t }, weak: true };
          return { error: "needNumber" };
        }
        case "location": {
          if (chipValue) {
            const c = (s.chips || []).find((x) => x.v === chipValue);
            if (c) return { value: { v: c.v, city: c.v === "onsite" ? "Shiraz" : undefined } };
          }
          const loc = ents.location;
          if (loc && (loc.mode || loc.city)) {
            const v = loc.mode || (loc.city === "Shiraz" ? "onsite" : "other_city");
            return { value: { v: v === "onsite" && loc.city && loc.city !== "Shiraz" ? "other_city" : v, city: loc.city || (v === "onsite" ? "Shiraz" : undefined) } };
          }
          const c = matchChoice(s, t);
          if (c) return { value: { v: c.v, city: c.v === "onsite" ? "Shiraz" : undefined } };
          if (skipWords) return { skip: true };
          return t.length >= 2 && !foreignInfo(s, ents) ? { value: { text: t }, weak: true } : null;
        }
        case "city": {
          const loc = ents.location;
          if (loc && loc.city) return { value: { city: loc.city } };
          if (skipWords) return { skip: true };
          const name = t.replace(/^(شهر|city of|in)\s+/i, "").trim();
          return name.length >= 2 && name.split(/\s+/).length <= 3 ? { value: { city: name } } : null;
        }
        case "name": {
          if (ents.name) return { value: { text: ents.name } };
          const n = nlu.extractName(t, true);
          const otherInfo = ents.timeline || ents.money || ents.email || ents.phone || Object.keys(ents.counts || {}).length;
          if (n && !nlu.isQuestion(t) && !otherInfo) return { value: { text: n }, weak: n.split(" ").length > 3 };
          if (skipWords) return { error: "badName" };
          return { error: "badName" };
        }
        case "email": {
          if (ents.email) return { value: { text: ents.email } };
          if (skipWords) return { skip: true };
          return { error: "badEmail" };
        }
        case "phone": {
          if (ents.phone) return { value: { text: ents.phone } };
          if (skipWords) return { skip: true };
          return { error: "badPhone" };
        }
      }
      return null;
    }

    // Fill other empty questions from details the visitor volunteered
    function prefill(text, ents, opts) {
      const filled = [];
      const pend = state.pending;
      const set = (s, val) => { state.slots[s.id] = val; delete state.skipped[s.id]; filled.push(s); };
      const msg = nlu.analyse(text);
      // "I'm Ali …" said explicitly corrects an earlier name
      if (ents.name && state.slots.name && state.slots.name.text !== ents.name && pend !== "name") {
        state.slots.name = { text: ents.name };
        filled.push(K.CONTACT_SLOTS.find((x) => x.id === "name"));
      }
      for (const s of allSlots()) {
        if (s.id === pend || state.slots[s.id] != null) continue;
        if (s.when && !s.when(state)) continue;
        switch (s.type) {
          case "money": if (ents.money && !ents.money.negotiable && !filled.some((f) => f.type === "money")) set(s, { money: ents.money }); break;
          case "timeline": if (ents.timeline && !filled.some((f) => f.type === "timeline")) set(s, ents.timeline); break;
          case "count": { const k = (s.countKind || ["device"]).find((k) => ents.counts && ents.counts[k] != null); if (k) set(s, { n: ents.counts[k] }); break; }
          case "location": {
            const loc = ents.location;
            if (loc && (loc.mode || loc.city) && !filled.some((f) => f.type === "location")) {
              const v = loc.mode || (loc.city === "Shiraz" ? "onsite" : "other_city");
              set(s, { v: v === "onsite" && loc.city && loc.city !== "Shiraz" ? "other_city" : v, city: loc.city || (v === "onsite" ? "Shiraz" : undefined) });
            }
            break;
          }
          case "name": if (ents.name) set(s, { text: ents.name }); break;
          case "email": if (ents.email) set(s, { text: ents.email }); break;
          case "phone": if (ents.phone) set(s, { text: ents.phone }); break;
          case "text": if ((s.id === "company" || s.id === "organization") && ents.company) set(s, { text: ents.company }); break;
          case "choice":
            if (s.id === "employment" && ents.employment) set(s, { v: ents.employment });
            else if (s.id === "contact_method") {
              if (/واتساپ|واتس اپ|whatsapp/i.test(text) && (ents.phone || state.slots.phone)) set(s, { v: "whatsapp" });
              else if (/تلگرام|telegram/i.test(text) && (ents.phone || state.slots.phone)) set(s, { v: "telegram" });
            } else {
              // Initial description: confident matches; later messages: only a reply that *is* an option
              const c = matchChoice(s, text, opts && opts.choices ? 0.9 : 1.1);
              if (c) set(s, { v: c.v });
            }
            break;
          case "longtext":
            // A detailed first message is the description itself
            if (opts && opts.description && !filled.some((f) => f.type === "longtext") && !s.optional && nlu.tokenize(text).length >= 8) set(s, { text: String(text).trim() });
            break;
        }
      }
      // A company mentioned in passing, for categories that don't ask for one
      const hasOrgSlot = allSlots().some((x) => x.id === "company" || x.id === "organization");
      if (ents.company && !hasOrgSlot && !state.slots.org) { state.slots.org = { text: ents.company }; filled.push(ORG_SLOT); }
      return filled.filter((s) => s.id !== state.pending);
    }
    function notedText(filled) {
      const items = filled.filter((s) => s.type !== "longtext").map((s) => `${s.label[L()]}: ${display(s, state.slots[s.id])}`);
      return items.length ? say("noted", { list: items.join(L() === "fa" ? "، " : ", ") }) : "";
    }
    const ackText = () => say("ack");

    function bestIntent(msg, ids, min) {
      const r = nlu.classify(msg, K.INTENTS.filter((i) => !ids || ids.includes(i.id)));
      return r[0] && r[0].score >= (min || 2.5) ? r[0] : null;
    }

    function answerIntent(id) {
      const ctx = { cv, lang: L(), tr, num };
      switch (id) {
        case "greet": {
          const h = now().getHours();
          const fa = h < 12 ? "صبح بخیر" : h < 17 ? "روز بخیر" : "عصر بخیر";
          const en = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
          return L() === "fa" ? `سلام، ${fa}! 🙂` : `Hi, ${en.toLowerCase()}! 🙂`;
        }
        case "how_are_you": return L() === "fa" ? "ممنون، خوبم 🙂 آماده‌ام کمکتان کنم." : "I'm good, thanks 🙂 Ready to help.";
        case "thanks": return L() === "fa" ? "خواهش می‌کنم 🙏" : "You're welcome 🙏";
        case "bye": return L() === "fa" ? "خدانگهدار! هر وقت خواستید همین‌جا هستم. 👋" : "Bye! I'm here whenever you need. 👋";
        case "bot": return L() === "fa" ? "من دستیار خودکار سایت سپهر هستم؛ یک ربات که داخل مرورگر خودتان اجرا می‌شود. درخواستتان را مرتب می‌کنم و برای خود سپهر می‌فرستم تا شخصاً جواب بدهد." : "I'm the automated assistant on Sepehr's site — a bot running right in your browser. I organise your request and send it to Sepehr, who replies personally.";
        case "have_question": return L() === "fa" ? "حتماً، بپرسید 🙂 اگر درباره‌ی سپهر است جواب می‌دهم، و اگر درخواستی دارید مرتبش می‌کنم و برایش می‌فرستم." : "Of course, go ahead 🙂 If it's about Sepehr I'll answer, and if it's a request I'll organise it and send it to him.";
        case "help": return L() === "fa" ? "من درخواست شما را قدم‌به‌قدم می‌گیرم و دسته‌بندی‌شده برای سپهر می‌فرستم. هر وقت خواستید می‌توانید بنویسید «برگرد»، «از اول»، «رد کن» یا مثلاً «ایمیلم را عوض کن». درباره‌ی مهارت‌ها، مدارک یا سوابق سپهر هم می‌توانید بپرسید." : "I take your request step by step and send it to Sepehr, organised by topic. You can say “back”, “start over”, “skip” or e.g. “change my email” at any time. You can also ask about Sepehr's skills, certificates or experience.";
        case "joke": return pick(K.JOKES[L()]);
        case "human": return K.answerFor("contact_direct", ctx);
        default: return K.answerFor(id, ctx);
      }
    }

    // ── Phases ────────────────────────────────────────────────
    function setCategory(id) {
      state.category = id;
      state.phase = "slots";
      state.unclear = 0;
      state.suggest = null;
      // Drop answers that belonged to the old category
      const keep = new Set(K.CONTACT_SLOTS.map((s) => s.id));
      const mine = new Set(category().slots.map((s) => s.id));
      for (const k of Object.keys(state.slots)) if (!keep.has(k) && !mine.has(k)) delete state.slots[k];
      state.stack = state.stack.filter((k) => keep.has(k) || mine.has(k));
    }

    function chooseCategory(id, text) {
      setCategory(id);
      let filled = [];
      if (text) filled = prefill(text, nlu.extractAll(text), { choices: true, description: true });
      const parts = [say("gotCategory", { cat: tr(category().label), ack: "" }).trim()];
      const noted = notedText(filled);
      if (noted) parts.push(noted);
      if (id === "network_security" && state.slots.service && state.slots.service.v === "incident") parts.push(say("incidentTip"));
      return advance(parts.join(" "));
    }

    function handleStart(text, msg, ents) {
      const cats = nlu.classify(msg, K.CATEGORIES);
      const c = cats[0];
      const intent = bestIntent(msg);
      const catScore = c ? c.score : 0;
      // A clear request wins over small talk ("سلام، پرینترم خرابه")
      if (c && catScore >= 2.5 && (!intent || !ANSWERABLE.includes(intent.id) || catScore >= intent.score * 0.9)) {
        // Two categories nearly tied: ask instead of guessing
        const second = cats[1];
        if (second && second.score >= 2.5 && second.score >= catScore * 0.8) {
          state.pendingText = text;
          const a = K.CATEGORIES.find((x) => x.id === c.id), b = K.CATEGORIES.find((x) => x.id === second.id);
          return [{ text: say("whichCategory", { a: tr(a.label), b: tr(b.label) }), chips: [a, b].map((x) => ({ label: `${x.emoji} ${tr(x.label)}`, value: cmd("cat:" + x.id) })) }];
        }
        const greet = intent && intent.id === "greet" ? answerIntent("greet") + " " : "";
        const out = chooseCategory(c.id, text);
        if (greet) out[0].text = greet + out[0].text;
        return out;
      }
      if (intent) {
        if (intent.id === "restart") return restart();
        const answer = answerIntent(intent.id);
        if (intent.id === "have_question") return [{ text: answer }];
        if (ANSWERABLE.includes(intent.id) || ["bot", "help", "human", "joke"].includes(intent.id)) {
          return [{ text: answer }, { text: say("askWhat"), chips: categoryChips() }];
        }
        if (intent.id === "bye") return [{ text: answer }];
        return [{ text: `${answer} ${say("askWhat")}`, chips: categoryChips() }];
      }
      state.unclear++;
      // A weak hint of a category: offer the best guesses rather than guessing
      if (c && catScore >= 1 && state.unclear < 3) {
        state.pendingText = text;
        const guesses = cats.filter((x) => x.score >= Math.max(1, catScore * 0.5)).slice(0, 2).map((x) => K.CATEGORIES.find((k) => k.id === x.id));
        const chips = guesses.map((x) => ({ label: `${x.emoji} ${tr(x.label)}`, value: cmd("cat:" + x.id) }));
        if (!guesses.some((x) => x.id === "other")) chips.push({ label: tr(K.CATEGORIES.find((k) => k.id === "other").chip), value: cmd("cat:other"), ghost: true });
        return [{ text: say("guessCategory"), chips }];
      }
      // Several words we couldn't place: treat it as a free-form request
      if (state.unclear >= 2 || msg.stems.length >= 6) {
        setCategory("other");
        state.slots.description = { text: String(text).trim() };
        const filled = prefill(text, ents);
        return advance([ackText(), notedText(filled)].filter(Boolean).join(" "));
      }
      return [{ text: say("unclear"), chips: categoryChips() }];
    }

    function handleSlotAnswer(text, msg, ents, chipValue) {
      const s = slotDef(state.pending) || nextSlot();
      if (!s) return showSummary();
      state.pending = s.id;

      // Side question? Answer it, then repeat the current question
      if (!chipValue) {
        const intent = bestIntent(msg);
        const question = nlu.isQuestion(text);
        const quickParse = parseAnswer(s, text, ents, null);
        const parsedStrongly = quickParse && (quickParse.skip || quickParse.error === "goAhead" || (quickParse.value && !quickParse.weak));
        const ownContact = ents.email || ents.phone;
        const sideTopic = intent && !(ownContact && ["contact_direct", "human"].includes(intent.id)) && (ANSWERABLE.includes(intent.id) || ["bot", "help", "human", "joke", "how_are_you"].includes(intent.id));
        const namesSepehr = /سپهر|sepehr/i.test(text);
        const askedAboutSepehr = sideTopic && question && (s.type !== "longtext" || intent.score >= 3 || namesSepehr);
        if (sideTopic && (askedAboutSepehr || (!parsedStrongly && (question || intent.score >= 3.5 || !quickParse)))) {
          const again = ask(s);
          return [{ text: answerIntent(intent.id) }, { text: `${say("resume")} ${again.text}`, chips: again.chips }];
        }
        // A question about Sepehr we have no answer for: note it and carry on
        if (!sideTopic && question && namesSepehr && (!parsedStrongly || s.type === "longtext")) {
          state.questions = (state.questions || []).concat(String(text).trim());
          const again = ask(s);
          return [{ text: say("aboutUnknown") }, { text: `${say("resume")} ${again.text}`, chips: again.chips }];
        }
        if (intent && ["thanks", "greet"].includes(intent.id) && !parsedStrongly && msg.stems.length <= 2) {
          const again = ask(s);
          return [{ text: `${answerIntent(intent.id)} ${again.text}`, chips: again.chips }];
        }
        // Sounds like a different kind of request altogether?
        const cats = nlu.classify(msg, K.CATEGORIES);
        const answeredHere = state.stack.filter((k) => category().slots.some((x) => x.id === k)).length;
        if (cats[0] && cats[0].id !== state.category && cats[0].score >= 5 && !parsedStrongly && answeredHere <= 1 && K.CATEGORIES.some((c) => c.slots.some((x) => x.id === s.id)) && category().slots.some((x) => x.id === s.id)) {
          state.suggest = { id: cats[0].id, text };
          const label = tr(K.CATEGORIES.find((c) => c.id === cats[0].id).label);
          return [{ text: say("switchCat", { cat: label }), chips: [{ label: L() === "fa" ? "بله، عوض کن" : "Yes, switch", value: cmd("switch:yes") }, { label: L() === "fa" ? "نه، ادامه بده" : "No, carry on", value: cmd("switch:no") }] }];
        }
      }

      const res = parseAnswer(s, text, ents, chipValue);
      if (!res) {
        state.fails[s.id] = (state.fails[s.id] || 0) + 1;
        const noted = notedText(prefill(text, ents));
        const again = ask(s);
        return [{ text: `${noted ? noted + " " : ""}${say("pickOne")}\n\n${again.text}`, chips: again.chips }];
      }
      if (res.error) {
        state.fails[s.id] = (state.fails[s.id] || 0) + 1;
        const f = state.fails[s.id];
        if (res.error === "tooShort" && f >= 2) { state.slots[s.id] = { text: String(text).trim() }; return afterFill(s, text, ents); }
        if (res.error === "badName" && f >= 2 && String(text).trim().length >= 2 && String(text).trim().length <= 40) { state.slots[s.id] = { text: String(text).trim() }; return afterFill(s, text, ents); }
        const chips = slotChips(s);
        if ((res.error === "badEmail" || res.error === "badPhone") && f >= 2) {
          chips.push({ label: L() === "fa" ? "🔁 راه تماس دیگر" : "🔁 Another way", value: cmd("edit:contact_method"), ghost: true });
          return [{ text: `${say(res.error)} ${say("switchMethod")}`, chips }];
        }
        return [{ text: say(res.error), chips }];
      }
      if (res.skip) {
        if (!s.optional && !["email", "phone"].includes(s.type)) {
          state.fails[s.id] = (state.fails[s.id] || 0) + 1;
          if (s.type === "longtext" && state.fails[s.id] < 2) return [{ text: say("cantSkip"), chips: slotChips(s) }];
          state.slots[s.id] = { text: L() === "fa" ? "نامشخص" : "Not sure", v: s.type === "choice" ? "other" : undefined, unknown: true };
        } else if (["email", "phone"].includes(s.type)) {
          // No email/phone after all: let them pick another way
          delete state.slots.contact_method;
          state.pending = "contact_method";
          const m = K.CONTACT_SLOTS.find((x) => x.id === "contact_method");
          return [ask(m, say("switchMethod"))];
        } else {
          state.skipped[s.id] = true;
          state.stack.push(s.id);
          return advance(say("skipped"));
        }
      } else {
        if (s.type === "city") {
          const base = state.slots[s.base];
          if (base) base.city = res.value.city;
          state.slots[s.id] = { text: res.value.city };
        } else state.slots[s.id] = res.value;
      }
      return afterFill(s, text, ents);
    }

    function afterFill(s, text, ents) {
      delete state.skipped[s.id];
      state.stack.push(s.id);
      state.fails[s.id] = 0;
      const filled = prefill(text, ents);
      const parts = [];
      if (s.id === "authorization" && state.slots.authorization && state.slots.authorization.v === "no") parts.push(say("pentestWarn"));
      else if (s.type === "name") parts.push(L() === "fa" ? `خوشبختم ${firstName()} 🙂` : `Nice to meet you, ${firstName()} 🙂`);
      else if (s.id === "service" && state.slots.service.v === "incident") parts.push(say("incidentTip"));
      else parts.push(ackText());
      const noted = notedText(filled);
      if (noted) parts.push(noted);
      return advance(parts.join(" "));
    }

    function handleConfirm(text, msg) {
      if (nlu.isYes(text)) return finish();
      if (nlu.isNo(text)) return chooseEdit();
      const field = editField(msg);
      if (field) return startEdit(field);
      return [{ text: say("confirmPrompt"), chips: [{ label: L() === "fa" ? "✅ بله، ارسال کن" : "✅ Yes, send it", value: cmd("confirm") }, { label: L() === "fa" ? "✏️ ویرایش" : "✏️ Edit", value: cmd("edit?") }] }];
    }

    function chooseEdit() {
      state.phase = "confirm";
      const chips = summaryRows(L()).filter((r) => !r.readonly).map((r) => ({ label: r.label, value: cmd("edit:" + r.id) }));
      return [{ text: say("whichEdit"), chips }];
    }

    function editField(msg) {
      let best = null, bestScore = 0;
      for (const [id, words] of K.EDIT_FIELDS) {
        for (const w of words) { const sc = nlu.matchPhrase(msg, w); if (sc > bestScore) { bestScore = sc; best = id; } }
      }
      if (bestScore < 0.85) return null;
      if (best === "budget" || best === "salary" || best === "timeline" || best === "work_mode" || best === "company") {
        // Map to the slot of that type in this category
        const typeOf = { budget: "money", salary: "money", timeline: "timeline", work_mode: "location", company: "text" }[best];
        const s = (category() ? category().slots : []).find((x) => x.id === best || (x.type === typeOf && (best !== "company" || ["company", "organization"].includes(x.id))));
        return s ? s.id : null;
      }
      return best;
    }

    function startEdit(id) {
      if (id === "category") {
        state.category = null;
        state.phase = "category";
        state.pending = null;
        return [{ text: say("askWhat"), chips: categoryChips() }];
      }
      const s = slotDef(id);
      if (!s || (s.when && !s.when(state))) return chooseEdit();
      delete state.slots[id];
      delete state.skipped[id];
      if (id.endsWith("__city")) { const base = state.slots[id.slice(0, -6)]; if (base) delete base.city; }
      if (s.type === "location") delete state.slots[id + "__city"];
      if (id === "contact_method") { delete state.skipped.email; delete state.skipped.phone; }
      state.phase = "slots";
      const q = ask(s);
      return [{ text: `${say("editAsk", { field: s.label[L()] })}\n\n${q.text}`, chips: q.chips }];
    }

    function goBack() {
      const last = state.stack.pop();
      if (!last) return [{ text: say("nothingBack") }].concat(state.pending ? [ask(slotDef(state.pending))] : []);
      delete state.slots[last];
      delete state.skipped[last];
      state.phase = "slots";
      return [ask(slotDef(last), say("backDone"))];
    }

    function restart() {
      const lang = state.lang;
      state = fresh(lang);
      return [{ text: say("restarted") }].concat(intro(true));
    }

    // ── Finishing ─────────────────────────────────────────────
    function priorityOf() {
      const sl = state.slots;
      let urgency = "normal";
      for (const s of sequence()) {
        const v = sl[s.id];
        if (s.type === "timeline" && v && v.urgency) urgency = v.urgency === "high" ? "high" : urgency === "high" ? "high" : v.urgency === "low" && urgency !== "high" ? "low" : urgency;
      }
      if (sl.service && sl.service.v === "incident") urgency = "high";
      const base = { job_offer: 35, freelance_project: 30, network_security: 30, it_support: 20, training: 25, collaboration: 20, other: 10 }[state.category] || 10;
      let score = base;
      const money = sequence().map((s) => s.type === "money" && sl[s.id] && sl[s.id].money).find(Boolean);
      if (money && !money.negotiable) score += 15 + (nlu.moneyInToman(money) >= 5e7 ? 10 : 0);
      else if (money) score += 5;
      score += urgency === "high" ? 20 : urgency === "normal" ? 10 : 0;
      const detail = sequence().filter((s) => s.type === "longtext" && sl[s.id] && !sl[s.id].unknown).reduce((n, s) => n + sl[s.id].text.length, 0);
      score += detail >= 120 ? 10 : detail >= 40 ? 5 : 0;
      if (sl.company || sl.organization || sl.org) score += 5;
      if (sl.email) score += 5;
      if (sl.phone) score += 5;
      score = Math.min(100, score);
      const level = urgency === "high" ? "high" : score >= 65 ? "medium" : "normal";
      return { urgency, score, level };
    }

    function buildLead() {
      const p = priorityOf();
      const cat = category();
      const fields = summaryRows("fa").filter((r) => r.id !== "category");
      const sl = state.slots;
      const keyLine = fields.filter((f) => !["name", "email", "phone", "contact_method", "notes"].includes(f.id)).slice(0, 4).map((f) => `${f.label}: ${f.value}`).join(" | ");
      const who = sl.name ? sl.name.text : "یک بازدیدکننده";
      const org = sl.company ? ` از ${sl.company.text}` : sl.organization && sl.organization.v !== "self" ? ` از ${sl.organization.text}` : sl.org ? ` از ${sl.org.text}` : "";
      const summary = `${who}${org} درخواست «${cat.label.fa}» دارد. ${keyLine}`.trim();
      return {
        category: cat.id,
        categoryLabel: cat.label,
        emoji: cat.emoji,
        priority: p,
        summary,
        fields,
        fieldsEn: summaryRows("en").filter((r) => r.id !== "category"),
        contact: { name: sl.name && sl.name.text, email: sl.email && sl.email.text, phone: sl.phone && sl.phone.text, method: sl.contact_method ? sl.contact_method.v : sl.email ? "email" : "phone" },
        questions: state.questions || [],
        lang: state.lang,
        transcript: state.history.map((h) => `${h.role === "user" ? "👤" : "🤖"} ${h.text}`).join("\n")
      };
    }

    function finish() {
      state.phase = "done";
      state.pending = null;
      const lead = buildLead();
      return { bubbles: [{ text: say("sending"), sending: true }], lead };
    }

    // Called by the UI once the email has (or hasn't) gone out
    function afterSend(ok) {
      state.sentOk = ok;
      if (ok) {
        const m = state.slots.contact_method ? state.slots.contact_method.v : state.slots.email ? "email" : "phone";
        const methodLabel = { email: { fa: "ایمیل", en: "email" }, phone: { fa: "تماس تلفنی", en: "phone" }, whatsapp: { fa: "واتساپ", en: "WhatsApp" }, telegram: { fa: "تلگرام", en: "Telegram" } }[m] || { fa: "راهی که گفتید", en: "your chosen method" };
        const n = firstName();
        const out = [{ text: say("sent", { method: methodLabel[L()], name: n ? (L() === "fa" ? ` ${n}` : `, ${n}`) : "" }), chips: [{ label: L() === "fa" ? "🔄 درخواست جدید" : "🔄 New request", value: cmd("restart"), ghost: true }] }];
        record(out);
        return out;
      }
      state.phase = "confirm";
      const c = cv.contact || {};
      const out = [{ text: L() === "fa" ? `ارسال انجام نشد (احتمالاً مشکل اینترنت). دوباره امتحان کنید، یا مستقیم ایمیل بزنید: ${c.email || ""}` : `Sending failed (probably a connection problem). Try again, or email directly: ${c.email || ""}`, chips: [{ label: L() === "fa" ? "🔁 تلاش دوباره" : "🔁 Try again", value: cmd("confirm") }] }];
      record(out);
      return out;
    }

    // ── Entry points ──────────────────────────────────────────
    function intro(skipHello) {
      state.phase = "category";
      const hello = skipHello ? "" : say("greetHello", { name: "" }) + " ";
      return [{ text: hello + say("intro") }, { text: say("askWhat"), chips: categoryChips() }];
    }

    function record(bubbles) {
      for (const b of bubbles) if (b.text) state.history.push({ role: "bot", text: b.text.replace(/\n+/g, " ") });
      if (state.history.length > 120) state.history = state.history.slice(-120);
    }

    function result(out) {
      const r = Array.isArray(out) ? { bubbles: out } : out;
      record(r.bubbles);
      return { bubbles: r.bubbles, lead: r.lead || null, done: state.phase === "done", progress: progress(), phase: state.phase, lang: state.lang, category: state.category };
    }

    function start() {
      return result(intro(false));
    }

    function handle(input, label) {
      const isCmd = typeof input === "string" && input.startsWith(CMD);
      const text = isCmd ? (label || "") : String(input || "").trim().slice(0, 1500);
      if (!isCmd && !text) return result([]);
      state.history.push({ role: "user", text: label || text });
      if (!isCmd) { const lang = nlu.detectLanguage(text); if (lang) state.lang = lang; }

      if (isCmd) return result(command(input.slice(1), text));

      const msg = nlu.analyse(text);
      const ents = nlu.extractAll(text);
      const top = bestIntent(msg, ["restart", "back", "frustration", "edit"], 2.8);

      if (state.phase === "done") {
        if (top && top.id === "restart") return result(restart());
        const intent = bestIntent(msg);
        if (intent && (ANSWERABLE.includes(intent.id) || ["thanks", "bye", "bot", "greet", "joke"].includes(intent.id))) return result([{ text: answerIntent(intent.id) }]);
        return result([{ text: say("afterDone"), chips: [{ label: L() === "fa" ? "🔄 درخواست جدید" : "🔄 New request", value: cmd("restart") }] }]);
      }
      if (top && top.id === "restart" && msg.stems.length <= 4) return result(restart());
      if (top && top.id === "frustration") {
        const c = cv.contact || {};
        const lines = [c.email && `📧 ${c.email}`, c.phone && `📞 ${c.phone}`].filter(Boolean).join("\n");
        const out = [{ text: `${say("frustration")}\n${lines}` }];
        const s = state.pending && slotDef(state.pending);
        if (s) out.push(ask(s, say("resume")));
        else if (state.phase !== "confirm") out.push({ text: say("askWhat"), chips: categoryChips() });
        return result(out);
      }
      if (top && top.id === "back" && msg.stems.length <= 4 && state.phase !== "category" && state.phase !== "start") return result(goBack());
      if (top && top.id === "edit" && state.category) {
        const f = editField(msg);
        if (f) {
          // "change my email to x@y.com" — apply it straight away
          const s = slotDef(f);
          const direct = s && parseAnswer(s, text, ents, null);
          if (direct && direct.value && !direct.weak && ["email", "phone", "name", "money", "timeline"].includes(s.type)) {
            state.slots[f] = direct.value;
            return result(advance(`${ackText()} ${s.label[L()]}: ${display(s, direct.value)}`));
          }
          return result(startEdit(f));
        }
        if (state.phase === "confirm") return result(chooseEdit());
      }

      if (state.suggest) {
        const sug = state.suggest;
        state.suggest = null;
        if (nlu.isYes(text)) return result(chooseCategory(sug.id, sug.text));
        if (nlu.isNo(text)) { const s = slotDef(state.pending); return result(s ? [ask(s)] : advance()); }
      }

      switch (state.phase) {
        case "start": case "category": return result(handleStart(text, msg, ents));
        case "slots": return result(handleSlotAnswer(text, msg, ents, null));
        case "confirm": return result(handleConfirm(text, msg));
      }
      return result([]);
    }

    function command(c, label) {
      if (c.startsWith("cat:")) {
        const t = state.pendingText;
        state.pendingText = null;
        const id = c.slice(4);
        if (id === "other" && t && nlu.analyse(t).stems.length >= 3) { setCategory("other"); state.slots.description = { text: t }; return advance(ackText()); }
        return chooseCategory(id, t || null);
      }
      if (c === "restart") return restart();
      if (c === "confirm") return state.category ? finish() : intro(true);
      if (c === "edit?") return chooseEdit();
      if (c.startsWith("edit:")) return startEdit(c.slice(5));
      if (c === "skip") return state.phase === "slots" ? handleSlotAnswer(label, nlu.analyse(label), nlu.extractAll(""), "skip") : [];
      if (c.startsWith("opt:")) {
        if (state.phase !== "slots") return [];
        return handleSlotAnswer(label, nlu.analyse(label), nlu.extractAll(""), c.slice(4));
      }
      if (c.startsWith("switch:")) {
        const sug = state.suggest;
        state.suggest = null;
        if (c === "switch:yes" && sug) return chooseCategory(sug.id, sug.text);
        const s = slotDef(state.pending);
        return s ? [ask(s)] : advance();
      }
      return [];
    }

    return {
      start, handle, afterSend,
      save: () => JSON.parse(JSON.stringify(state)),
      load: (saved) => { if (saved && saved.v === 2) state = Object.assign(fresh(saved.lang || "fa"), saved); },
      setLang: (lang) => { state.lang = lang; },
      get state() { return state; },
      progress, CMD
    };
  }

  // FormSubmit payload for a finished request (labels in Persian for Sepehr)
  function emailPayload(lead) {
    const pr = { high: "🔴 فوری", medium: "🟠 مهم", normal: "🟢 عادی" }[lead.priority.level];
    const urgency = { high: "زیاد", normal: "معمولی", low: "کم" }[lead.priority.urgency];
    const methodFa = { email: "ایمیل", phone: "تماس تلفنی", whatsapp: "واتساپ", telegram: "تلگرام" }[lead.contact.method] || "—";
    const details = lead.fields.filter((f) => !["name", "email", "phone", "contact_method"].includes(f.id)).map((f) => `• ${f.label}: ${f.value}`).join("\n");
    const payload = {
      _subject: `[ربات سایت] ${pr} | ${lead.emoji} ${lead.categoryLabel.fa} | ${lead.contact.name || "بدون نام"}`,
      _template: "table",
      _captcha: "false",
      "منبع": "دستیار هوشمند سایت (ربات محلی)",
      "دسته‌بندی": `${lead.emoji} ${lead.categoryLabel.fa} / ${lead.categoryLabel.en}`,
      "اولویت": `${pr} · امتیاز ${lead.priority.score} از ۱۰۰ · فوریت: ${urgency}`,
      "خلاصه": lead.summary,
      "جزئیات": details,
      "نام": lead.contact.name || "—",
      "ایمیل": lead.contact.email || "—",
      "تلفن": lead.contact.phone || "—",
      "راه تماس ترجیحی": methodFa,
      "سؤال‌های بی‌پاسخ": lead.questions && lead.questions.length ? lead.questions.map((q) => `• ${q}`).join("\n") : "—",
      "زبان گفتگو": lead.lang === "fa" ? "فارسی" : "انگلیسی",
      "متن کامل گفتگو": lead.transcript
    };
    if (lead.contact.email) payload._replyto = lead.contact.email;
    return payload;
  }

  root.SepehrBot.createEngine = createEngine;
  root.SepehrBot.emailPayload = emailPayload;
})(typeof window !== "undefined" ? window : globalThis);
