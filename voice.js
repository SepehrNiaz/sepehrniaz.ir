// ─────────────────────────────────────────────────────────────
//  Spoken language detection — runs entirely in the browser.
//  Whisper base (OpenAI, MIT) on ONNX Runtime Web (MIT), served
//  from assets/voice/. The recording never leaves the device.
//  Pipeline: 16 kHz mono audio → 80-band log-mel (same maths as
//  Whisper's own feature extractor) → encoder → one decoder step
//  from <|startoftranscript|> → probabilities of the 99 language tokens.
// ─────────────────────────────────────────────────────────────
const BASE = new URL("assets/voice/", import.meta.url).href;
const FILES = {
  enc: "models/encoder.onnx",
  dec: "models/decoder.onnx",
  data: ["models/decoder.onnx_data", "models/decoder.onnx_data_1", "models/decoder.onnx_data_2"]
};
const LANG_IDS = {"af":50327,"am":50334,"ar":50272,"as":50350,"az":50304,"ba":50355,"be":50330,"bg":50292,"bn":50302,"bo":50347,"br":50309,"bs":50315,"ca":50270,"cs":50283,"cy":50297,"da":50285,"de":50261,"el":50281,"en":50259,"es":50262,"et":50307,"eu":50310,"fa":50300,"fi":50277,"fo":50338,"fr":50265,"gl":50319,"gu":50333,"haw":50352,"ha":50354,"he":50279,"hi":50276,"hr":50291,"ht":50339,"hu":50286,"hy":50312,"id":50275,"is":50311,"it":50274,"ja":50266,"jw":50356,"ka":50329,"kk":50316,"km":50323,"kn":50306,"ko":50264,"la":50294,"lb":50345,"ln":50353,"lo":50336,"lt":50293,"lv":50301,"mg":50349,"mi":50295,"mk":50308,"ml":50296,"mn":50314,"mr":50320,"ms":50282,"mt":50343,"my":50346,"ne":50313,"nl":50271,"nn":50342,"no":50288,"oc":50328,"pa":50321,"pl":50269,"ps":50340,"pt":50267,"ro":50284,"ru":50263,"sa":50344,"sd":50332,"si":50322,"sk":50298,"sl":50305,"sn":50324,"so":50326,"sq":50317,"sr":50303,"su":50357,"sv":50273,"sw":50318,"ta":50287,"te":50299,"tg":50331,"th":50289,"tk":50341,"tl":50348,"tr":50268,"tt":50351,"uk":50280,"ur":50290,"uz":50337,"vi":50278,"yi":50335,"yo":50325,"zh":50260};
const NAMES = {
  af: ["Afrikaans", "آفریکانس"], am: ["Amharic", "امهری"], ar: ["Arabic", "عربی"], as: ["Assamese", "آسامی"], az: ["Azerbaijani", "آذربایجانی"],
  ba: ["Bashkir", "باشقیری"], be: ["Belarusian", "بلاروسی"], bg: ["Bulgarian", "بلغاری"], bn: ["Bengali", "بنگالی"], bo: ["Tibetan", "تبتی"],
  br: ["Breton", "برتون"], bs: ["Bosnian", "بوسنیایی"], ca: ["Catalan", "کاتالان"], cs: ["Czech", "چکی"], cy: ["Welsh", "ولزی"],
  da: ["Danish", "دانمارکی"], de: ["German", "آلمانی"], el: ["Greek", "یونانی"], en: ["English", "انگلیسی"], es: ["Spanish", "اسپانیایی"],
  et: ["Estonian", "استونیایی"], eu: ["Basque", "باسکی"], fa: ["Persian", "فارسی"], fi: ["Finnish", "فنلاندی"], fo: ["Faroese", "فارویی"],
  fr: ["French", "فرانسوی"], gl: ["Galician", "گالیسیایی"], gu: ["Gujarati", "گجراتی"], haw: ["Hawaiian", "هاوایی"], ha: ["Hausa", "هوسا"],
  he: ["Hebrew", "عبری"], hi: ["Hindi", "هندی"], hr: ["Croatian", "کرواتی"], ht: ["Haitian Creole", "کریول هائیتی"], hu: ["Hungarian", "مجاری"],
  hy: ["Armenian", "ارمنی"], id: ["Indonesian", "اندونزیایی"], is: ["Icelandic", "ایسلندی"], it: ["Italian", "ایتالیایی"], ja: ["Japanese", "ژاپنی"],
  jw: ["Javanese", "جاوه‌ای"], ka: ["Georgian", "گرجی"], kk: ["Kazakh", "قزاقی"], km: ["Khmer", "خمری"], kn: ["Kannada", "کانادایی"],
  ko: ["Korean", "کره‌ای"], la: ["Latin", "لاتین"], lb: ["Luxembourgish", "لوگزامبورگی"], ln: ["Lingala", "لینگالا"], lo: ["Lao", "لائوسی"],
  lt: ["Lithuanian", "لیتوانیایی"], lv: ["Latvian", "لتونیایی"], mg: ["Malagasy", "مالاگاسی"], mi: ["Maori", "مائوری"], mk: ["Macedonian", "مقدونی"],
  ml: ["Malayalam", "مالایالم"], mn: ["Mongolian", "مغولی"], mr: ["Marathi", "مراتی"], ms: ["Malay", "مالایی"], mt: ["Maltese", "مالتی"],
  my: ["Burmese", "برمه‌ای"], ne: ["Nepali", "نپالی"], nl: ["Dutch", "هلندی"], nn: ["Norwegian Nynorsk", "نروژی (نینورسک)"], no: ["Norwegian", "نروژی"],
  oc: ["Occitan", "اکسیتان"], pa: ["Punjabi", "پنجابی"], pl: ["Polish", "لهستانی"], ps: ["Pashto", "پشتو"], pt: ["Portuguese", "پرتغالی"],
  ro: ["Romanian", "رومانیایی"], ru: ["Russian", "روسی"], sa: ["Sanskrit", "سانسکریت"], sd: ["Sindhi", "سندی"], si: ["Sinhala", "سینهالی"],
  sk: ["Slovak", "اسلواکی"], sl: ["Slovenian", "اسلوونیایی"], sn: ["Shona", "شونا"], so: ["Somali", "سومالیایی"], sq: ["Albanian", "آلبانیایی"],
  sr: ["Serbian", "صربی"], su: ["Sundanese", "سوندایی"], sv: ["Swedish", "سوئدی"], sw: ["Swahili", "سواحیلی"], ta: ["Tamil", "تامیلی"],
  te: ["Telugu", "تلوگو"], tg: ["Tajik", "تاجیکی"], th: ["Thai", "تایلندی"], tk: ["Turkmen", "ترکمنی"], tl: ["Tagalog", "تاگالوگ"],
  tr: ["Turkish", "ترکی استانبولی"], tt: ["Tatar", "تاتاری"], uk: ["Ukrainian", "اوکراینی"], ur: ["Urdu", "اردو"], uz: ["Uzbek", "ازبکی"],
  vi: ["Vietnamese", "ویتنامی"], yi: ["Yiddish", "ییدیش"], yo: ["Yoruba", "یوروبایی"], zh: ["Chinese", "چینی"]
};

const T = {
  en: {
    eyebrow: "Lab · Speech", title: "Which language is this?",
    lead: "Speak, or upload a recording, and an AI model works out which of 99 languages it is — right in your browser.",
    privacy: "Everything runs on your device. Your voice is never uploaded.",
    record: "Start recording", stop: "Stop and detect", upload: "Upload audio", again: "Record again",
    idleTitle: "Press record and speak for 5–15 seconds", idleText: "Any language works. Read a sentence, sing, or talk naturally.",
    recording: "Listening…", maxNote: "Stops by itself after 30 seconds",
    loading: "Loading the speech model…", loadingNote: "About 80 MB — only the first time, then it's saved on your device",
    loadingFile: (a, b) => `${a} of ${b} MB`,
    analysing: "Working out the language…", analysingNote: "This can take a few seconds on a phone",
    result: "Detected language", confidence: "confidence", others: "Other possibilities",
    unsure: "Not sure — speak a little longer or more clearly for a firmer answer.",
    quiet: "I couldn't hear clear speech. Try again a bit closer to the microphone.",
    short: "That was very short. Speak for at least 3 seconds for a reliable result.",
    errMic: "Microphone access was blocked. Allow the microphone for this site in your browser settings, then try again.",
    errFramed: "The microphone can't be used inside this embedded preview. Open the site directly — or upload a recording here.",
    errNoMic: "No microphone was found. You can still upload a recording.",
    errSecure: "The microphone only works on a secure (https) page.",
    errLoad: "The speech model couldn't be loaded. Check your connection and try again.",
    errAudio: "That file couldn't be read as audio.",
    seconds: (n) => `${n} s`, heard: (n) => `Analysed ${n} seconds of audio`,
    howTitle: "How it works",
    how1T: "Sound to picture", how1D: "Your audio is turned into a spectrogram: 80 frequency bands, 100 times a second — the same input the model was trained on.",
    how2T: "Whisper", how2D: "OpenAI's open-source Whisper model (base size, 74 million parameters) listens to the spectrogram and predicts which language token comes first.",
    how3T: "On your device", how3D: "The model runs with ONNX Runtime in WebAssembly. Nothing is sent anywhere; after the first visit it works from your device's storage.",
    credit: "Built with OpenAI's Whisper (MIT) and Microsoft's ONNX Runtime Web (MIT), hosted on this site.",
    pageTitle: "Spoken language detection — free online tool · Sepehr Niaz"
  },
  fa: {
    eyebrow: "آزمایشگاه · گفتار", title: "این چه زبانی است؟",
    lead: "حرف بزن یا یک صدای ضبط‌شده بده؛ یک مدل هوش مصنوعی از بین ۹۹ زبان تشخیص می‌دهد کدام است — داخل مرورگر خودت.",
    privacy: "همه چیز روی دستگاه خودت اجرا می‌شود. صدایت هیچ‌وقت جایی فرستاده نمی‌شود.",
    record: "شروع ضبط", stop: "توقف و تشخیص", upload: "انتخاب فایل صوتی", again: "ضبط دوباره",
    idleTitle: "ضبط را بزن و ۵ تا ۱۵ ثانیه حرف بزن", idleText: "هر زبانی باشد کار می‌کند. یک جمله بخوان، آواز بخوان یا عادی صحبت کن.",
    recording: "در حال گوش دادن…", maxNote: "بعد از ۳۰ ثانیه خودش متوقف می‌شود",
    loading: "در حال بارگذاری مدل گفتار…", loadingNote: "حدود ۸۰ مگابایت — فقط بار اول، بعد روی دستگاهت ذخیره می‌شود",
    loadingFile: (a, b) => `${fa(a)} از ${fa(b)} مگابایت`,
    analysing: "در حال تشخیص زبان…", analysingNote: "روی گوشی ممکن است چند ثانیه طول بکشد",
    result: "زبان تشخیص داده‌شده", confidence: "اطمینان", others: "احتمال‌های دیگر",
    unsure: "مطمئن نیستم — برای جواب دقیق‌تر کمی طولانی‌تر یا واضح‌تر حرف بزن.",
    quiet: "صدای واضحی نشنیدم. کمی نزدیک‌تر به میکروفون دوباره امتحان کن.",
    short: "خیلی کوتاه بود. برای نتیجه‌ی مطمئن دست‌کم ۳ ثانیه حرف بزن.",
    errMic: "دسترسی به میکروفون بسته شده است. از تنظیمات مرورگر اجازه‌ی میکروفون را برای این سایت بده و دوباره امتحان کن.",
    errFramed: "داخل این پیش‌نمایش نمی‌شود از میکروفون استفاده کرد. سایت را مستقیم باز کن — یا همین‌جا یک فایل صوتی انتخاب کن.",
    errNoMic: "میکروفونی پیدا نشد. هنوز می‌توانی یک فایل صوتی انتخاب کنی.",
    errSecure: "میکروفون فقط روی صفحه‌ی امن (https) کار می‌کند.",
    errLoad: "مدل گفتار بارگذاری نشد. اینترنت را بررسی کن و دوباره امتحان کن.",
    errAudio: "این فایل به‌عنوان صدا خوانده نشد.",
    seconds: (n) => `${fa(n)} ثانیه`, heard: (n) => `${fa(n)} ثانیه صدا بررسی شد`,
    howTitle: "چطور کار می‌کند",
    how1T: "از صدا به تصویر", how1D: "صدایت به یک طیف‌نگار تبدیل می‌شود: ۸۰ باند فرکانسی، ۱۰۰ بار در ثانیه — همان ورودی‌ای که مدل با آن آموزش دیده است.",
    how2T: "Whisper", how2D: "مدل متن‌باز Whisper از OpenAI (اندازه‌ی base، ۷۴ میلیون پارامتر) به طیف‌نگار گوش می‌دهد و پیش‌بینی می‌کند اولین نشانه‌ی زبان کدام است.",
    how3T: "روی دستگاه خودت", how3D: "مدل با ONNX Runtime در WebAssembly اجرا می‌شود. هیچ چیز جایی فرستاده نمی‌شود؛ بعد از بار اول از حافظه‌ی دستگاهت کار می‌کند.",
    credit: "ساخته‌شده با Whisper از OpenAI (MIT) و ONNX Runtime Web از مایکروسافت (MIT) که روی همین سایت میزبانی می‌شوند.",
    pageTitle: "تشخیص زبان گفتار — ابزار آنلاین رایگان · سپهر نیاز"
  }
};
function fa(n) { return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); }
const lang = () => (document.documentElement.lang === "fa" ? "fa" : "en");
const t = (k) => T[lang()][k];
const num = (n) => (lang() === "fa" ? fa(n) : String(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = (id) => document.getElementById(id);

const recBtn = $("vo-rec"), fileIn = $("vo-file"), stage = $("vo-stage"), out = $("vo-result");

// ── Whisper log-mel features (matches the reference to ~1e-5) ─
const SR = 16000, NFFT = 400, HOP = 160, NMEL = 80, NS = 480000, NFRAMES = 3000, NBIN = NFFT / 2 + 1;
let tables = null;
function buildTables() {
  const hzToMel = (f) => { const sp = 200 / 3, minHz = 1000, minMel = minHz / sp, step = Math.log(6.4) / 27; return f >= minHz ? minMel + Math.log(f / minHz) / step : f / sp; };
  const melToHz = (m) => { const sp = 200 / 3, minHz = 1000, minMel = minHz / sp, step = Math.log(6.4) / 27; return m >= minMel ? minHz * Math.exp(step * (m - minMel)) : sp * m; };
  const fft = Array.from({ length: NBIN }, (_, i) => (i * SR) / NFFT);
  const lo = hzToMel(0), hi = hzToMel(SR / 2);
  const melF = Array.from({ length: NMEL + 2 }, (_, i) => melToHz(lo + ((hi - lo) * i) / (NMEL + 1)));
  const filters = new Float32Array(NMEL * NBIN);
  for (let m = 0; m < NMEL; m++) {
    const enorm = 2 / (melF[m + 2] - melF[m]);
    for (let k = 0; k < NBIN; k++) {
      const lower = (fft[k] - melF[m]) / (melF[m + 1] - melF[m]), upper = (melF[m + 2] - fft[k]) / (melF[m + 2] - melF[m + 1]);
      filters[m * NBIN + k] = Math.max(0, Math.min(lower, upper)) * enorm;
    }
  }
  const win = new Float32Array(NFFT), cos = new Float32Array(NBIN * NFFT), sin = new Float32Array(NBIN * NFFT);
  for (let n = 0; n < NFFT; n++) win[n] = 0.5 - 0.5 * Math.cos((2 * Math.PI * n) / NFFT);
  for (let k = 0; k < NBIN; k++) for (let n = 0; n < NFFT; n++) { const a = (2 * Math.PI * k * n) / NFFT; cos[k * NFFT + n] = Math.cos(a); sin[k * NFFT + n] = Math.sin(a); }
  return { filters, win, cos, sin };
}
function logMel(audio) {
  tables = tables || buildTables();
  const { filters, win, cos, sin } = tables;
  const len = Math.min(audio.length, NS);
  const x = new Float32Array(NS + NFFT);           // centre padding (reflect) around the 30 s window
  x.set(audio.subarray(0, len), NFFT / 2);
  for (let i = 1; i <= NFFT / 2; i++) { x[NFFT / 2 - i] = x[NFFT / 2 + i]; x[NFFT / 2 + NS - 1 + i] = x[NFFT / 2 + NS - 1 - i]; }
  const mel = new Float32Array(NMEL * NFRAMES).fill(1e-10);
  const lastFrame = Math.min(NFRAMES, Math.ceil((len + NFFT) / HOP) + 1); // frames past the audio are silent
  const frame = new Float32Array(NFFT), power = new Float32Array(NBIN);
  for (let f = 0; f < lastFrame; f++) {
    const off = f * HOP;
    for (let n = 0; n < NFFT; n++) frame[n] = x[off + n] * win[n];
    for (let k = 0; k < NBIN; k++) {
      let re = 0, im = 0; const base = k * NFFT;
      for (let n = 0; n < NFFT; n++) { re += frame[n] * cos[base + n]; im -= frame[n] * sin[base + n]; }
      power[k] = re * re + im * im;
    }
    for (let m = 0; m < NMEL; m++) {
      let s = 0; const base = m * NBIN;
      for (let k = 0; k < NBIN; k++) s += filters[base + k] * power[k];
      mel[m * NFRAMES + f] = Math.max(s, 1e-10);
    }
  }
  let max = -Infinity;
  for (let i = 0; i < mel.length; i++) { mel[i] = Math.log10(mel[i]); if (mel[i] > max) max = mel[i]; }
  for (let i = 0; i < mel.length; i++) mel[i] = (Math.max(mel[i], max - 8) + 4) / 4;
  return mel;
}

// ── Model loading (with progress, kept in the browser's cache storage) ─
let ort = null, enc = null, dec = null, loading = null;
async function fetchBytes(path, onBytes) {
  const url = BASE + path;
  let cache = null;
  try { cache = await caches.open("sn-voice-v1"); const hit = await cache.match(url); if (hit) { const b = new Uint8Array(await hit.arrayBuffer()); onBytes(b.length); return b; } } catch (e) { cache = null; }
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`);
  const reader = res.body.getReader(), parts = [];
  let got = 0;
  for (;;) { const { done, value } = await reader.read(); if (done) break; parts.push(value); got += value.length; onBytes(value.length); }
  const b = new Uint8Array(got); let o = 0; for (const p of parts) { b.set(p, o); o += p.length; }
  try { if (cache) await cache.put(url, new Response(b)); } catch (e) {}
  return b;
}
async function load() {
  if (enc) return;
  if (loading) return loading;
  loading = (async () => {
    const total = 77.1; let done = 0;
    const tick = (n) => { done += n / 1e6; say(t("loading"), `${t("loadingFile")(Math.min(Math.round(done), Math.round(total)), Math.round(total))} · ${t("loadingNote")}`); };
    say(t("loading"), t("loadingNote"));
    ort = await import(BASE + "ort.wasm.min.mjs");
    ort.env.wasm.wasmPaths = BASE;
    ort.env.wasm.numThreads = 1; // GitHub Pages can't enable cross-origin isolation, so no threads
    const [e, d, ...data] = await Promise.all([fetchBytes(FILES.enc, tick), fetchBytes(FILES.dec, tick), ...FILES.data.map((p) => fetchBytes(p, tick))]);
    say(t("loading"), t("loadingNote"));
    enc = await ort.InferenceSession.create(e, { executionProviders: ["wasm"] });
    dec = await ort.InferenceSession.create(d, { executionProviders: ["wasm"], externalData: FILES.data.map((p, i) => ({ path: p.split("/").pop(), data: data[i] })) });
  })();
  try { await loading; } catch (err) { loading = null; throw err; }
}

async function detect(audio) {
  const feats = logMel(audio);
  const h = (await enc.run({ input_features: new ort.Tensor("float32", feats, [1, NMEL, NFRAMES]) }))[enc.outputNames[0]];
  const r = await dec.run({ input_ids: new ort.Tensor("int64", BigInt64Array.from([50258n]), [1, 1]), encoder_hidden_states: h });
  const logits = r[dec.outputNames[0]].data; // [1, 1, vocab]
  const codes = Object.keys(LANG_IDS), vals = codes.map((c) => logits[LANG_IDS[c]]);
  const mx = Math.max(...vals), ex = vals.map((v) => Math.exp(v - mx)), sum = ex.reduce((a, b) => a + b, 0);
  return codes.map((c, i) => ({ code: c, p: ex[i] / sum })).sort((a, b) => b.p - a.p);
}

// ── Audio in: microphone or file, as 16 kHz mono ───────────
async function to16k(buf) {
  const ch = buf.numberOfChannels, n = buf.length, mono = new Float32Array(n);
  for (let c = 0; c < ch; c++) { const d = buf.getChannelData(c); for (let i = 0; i < n; i++) mono[i] += d[i] / ch; }
  if (buf.sampleRate === SR) return mono;
  try {
    const oc = new OfflineAudioContext(1, Math.ceil((n * SR) / buf.sampleRate), SR);
    const b = oc.createBuffer(1, n, buf.sampleRate); b.copyToChannel(mono, 0);
    const s = oc.createBufferSource(); s.buffer = b; s.connect(oc.destination); s.start();
    return (await oc.startRendering()).getChannelData(0);
  } catch (e) { // fallback: average the samples that fall into each output sample
    const ratio = buf.sampleRate / SR, outLen = Math.floor(n / ratio), o = new Float32Array(outLen);
    for (let i = 0; i < outLen; i++) { const a = Math.floor(i * ratio), z = Math.min(n, Math.floor((i + 1) * ratio)); let s = 0; for (let j = a; j < z; j++) s += mono[j]; o[i] = s / Math.max(1, z - a); }
    return o;
  }
}
async function decode(blob) {
  const AC = window.AudioContext || window.webkitAudioContext, bytes = await blob.arrayBuffer();
  // decode straight to 16 kHz where the browser allows it (one resampling step instead of two)
  let ac;
  try { ac = new AC({ sampleRate: SR }); } catch (e) { ac = new AC(); }
  try { return await to16k(await ac.decodeAudioData(bytes)); } finally { ac.close && ac.close(); }
}

let rec = null, stream = null, chunks = [], timer = 0, started = 0, meterRaf = 0, actx = null;
async function startRecording() {
  if (!window.isSecureContext || !navigator.mediaDevices || !window.MediaRecorder) { fail(t("errSecure")); return; }
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: { channelCount: 1, echoCancellation: false, noiseSuppression: false, autoGainControl: true } });
  } catch (e) {
    const framed = (() => { try { return window.self !== window.top; } catch (er) { return true; } })();
    fail(e && e.name === "NotFoundError" ? t("errNoMic") : framed ? t("errFramed") : t("errMic"));
    return;
  }
  load().catch(() => {}); // start downloading the model while the visitor speaks
  chunks = [];
  rec = new MediaRecorder(stream);
  rec.ondataavailable = (e) => { if (e.data && e.data.size) chunks.push(e.data); };
  rec.onstop = async () => {
    stream.getTracks().forEach((tr) => tr.stop()); cancelAnimationFrame(meterRaf); clearInterval(timer);
    if (actx) { actx.close(); actx = null; }
    const blob = new Blob(chunks, { type: rec.mimeType || "audio/webm" });
    rec = null; paint();
    await analyse(blob);
  };
  rec.start(250);
  started = performance.now();
  stage.innerHTML = `<div class="vo-live"><div class="vo-meter"><i id="vo-level"></i></div><b>${esc(t("recording"))}</b><span class="vo-time" id="vo-time">${esc(t("seconds")(0))}</span><small>${esc(t("maxNote"))}</small></div>`;
  timer = setInterval(() => {
    const s = Math.floor((performance.now() - started) / 1000);
    const el = $("vo-time"); if (el) el.textContent = t("seconds")(s);
    if (s >= 30 && rec) rec.stop();
  }, 250);
  try { // live level meter
    actx = new (window.AudioContext || window.webkitAudioContext)();
    const an = actx.createAnalyser(); an.fftSize = 512; actx.createMediaStreamSource(stream).connect(an);
    const buf = new Float32Array(an.fftSize);
    const draw = () => { an.getFloatTimeDomainData(buf); let s = 0; for (const v of buf) s += v * v; const lvl = Math.min(1, Math.sqrt(s / buf.length) * 6); const el = $("vo-level"); if (el) el.style.transform = `scaleX(${0.04 + lvl * 0.96})`; meterRaf = requestAnimationFrame(draw); };
    draw();
  } catch (e) {}
  out.innerHTML = "";
  paint();
}

async function analyse(blob) {
  let audio;
  try { audio = await decode(blob); } catch (e) { fail(t("errAudio")); return; }
  try { await load(); } catch (e) { fail(t("errLoad")); return; }
  // silence check: average loudness of the clip
  let s = 0; for (let i = 0; i < audio.length; i++) s += audio[i] * audio[i];
  const rms = Math.sqrt(s / Math.max(1, audio.length)), secs = audio.length / SR;
  if (rms < 0.004) { fail(t("quiet")); return; }
  say(t("analysing"), t("analysingNote"));
  await new Promise((r) => setTimeout(r, 30));
  const res = await detect(audio);
  showResult(res, secs);
  return res;
}

// ── UI ─────────────────────────────────────────────────────
function idle() {
  stage.innerHTML = `<div class="vo-idle"><svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/></svg><b>${esc(t("idleTitle"))}</b><span>${esc(t("idleText"))}</span></div>`;
}
function say(text, sub) { stage.innerHTML = `<div class="vo-busy"><span class="vis-spin" aria-hidden="true"></span><b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</div>`; }
function fail(text) { stage.innerHTML = `<div class="vo-busy"><b class="vis-err">${esc(text)}</b></div>`; }
let lastRes = null, lastSecs = 0;
function showResult(res, secs) {
  lastRes = res; lastSecs = secs;
  const L = lang() === "fa" ? 1 : 0, top = res[0];
  const pct = (p) => `${num(Math.round(p * 100))}%`;
  stage.innerHTML = `<div class="vo-top"><small>${esc(t("result"))}</small><b>${esc(NAMES[top.code] ? NAMES[top.code][L] : top.code)}</b><span>${esc(t("confidence"))}: ${pct(top.p)}</span>${top.p < 0.3 ? `<small class="vo-unsure">${esc(t("unsure"))}</small>` : ""}</div>`;
  out.innerHTML = `${secs < 3 ? `<p class="vo-warn">${esc(t("short"))}</p>` : ""}<h3>${esc(t("others"))}</h3>` +
    res.slice(0, 6).map((r) => `<div class="vis-bar vo-bar"><span>${esc(NAMES[r.code] ? NAMES[r.code][L] : r.code)}</span><i><b style="width:${Math.max(1, Math.round(r.p * 100))}%"></b></i><em>${pct(r.p)}</em></div>`).join("") +
    `<p class="muted vo-heard">${esc(t("heard")(Math.round(secs * 10) / 10))}</p>`;
}
function paint() {
  document.querySelectorAll("[data-v]").forEach((el) => {
    const k = el.dataset.v === "record" && rec ? "stop" : el.dataset.v;
    if (T.en[k] != null && typeof T.en[k] === "string") el.textContent = t(k);
  });
  recBtn.classList.toggle("rec", !!rec);
  document.title = t("pageTitle");
}
recBtn.addEventListener("click", () => (rec ? rec.stop() : startRecording()));
fileIn.addEventListener("change", () => { const f = fileIn.files[0]; fileIn.value = ""; if (f) { out.innerHTML = ""; analyse(f); } });
document.addEventListener("cv:langchange", () => { paint(); if (lastRes) showResult(lastRes, lastSecs); else if (!rec) idle(); });

paint();
idle();
// For automated checks
window.__voiceAnalyse = async (src) => { const b = await (await fetch(src)).blob(); return analyse(b); };
window.__voiceMel = (a) => logMel(a);
