// ─────────────────────────────────────────────────────────────
//  Object detection with voice — runs entirely in the browser.
//  MediaPipe Object Detector with EfficientDet-Lite0 (80 everyday
//  objects, Apache 2.0), served from assets/vision/. It can read
//  what it sees out loud with the device's own speech voice.
// ─────────────────────────────────────────────────────────────
const BASE = new URL("assets/vision/", import.meta.url).href;
const FA = {
  person: "آدم", bicycle: "دوچرخه", car: "ماشین", motorcycle: "موتورسیکلت", airplane: "هواپیما", bus: "اتوبوس", train: "قطار", truck: "کامیون", boat: "قایق",
  "traffic light": "چراغ راهنمایی", "fire hydrant": "شیر آتش‌نشانی", "stop sign": "تابلوی ایست", "parking meter": "پارکومتر", bench: "نیمکت", bird: "پرنده", cat: "گربه",
  dog: "سگ", horse: "اسب", sheep: "گوسفند", cow: "گاو", elephant: "فیل", bear: "خرس", zebra: "گورخر", giraffe: "زرافه", backpack: "کوله‌پشتی", umbrella: "چتر",
  handbag: "کیف دستی", tie: "کراوات", suitcase: "چمدان", frisbee: "فریزبی", skis: "اسکی", snowboard: "اسنوبرد", "sports ball": "توپ", kite: "بادبادک",
  "baseball bat": "چوب بیسبال", "baseball glove": "دستکش بیسبال", skateboard: "اسکیت‌برد", surfboard: "تخته‌موج‌سواری", "tennis racket": "راکت تنیس", bottle: "بطری",
  "wine glass": "جام", cup: "لیوان", fork: "چنگال", knife: "چاقو", spoon: "قاشق", bowl: "کاسه", banana: "موز", apple: "سیب", sandwich: "ساندویچ", orange: "پرتقال",
  broccoli: "بروکلی", carrot: "هویج", "hot dog": "هات‌داگ", pizza: "پیتزا", donut: "دونات", cake: "کیک", chair: "صندلی", couch: "مبل", "potted plant": "گلدان",
  bed: "تخت", "dining table": "میز", toilet: "توالت", tv: "تلویزیون", laptop: "لپ‌تاپ", mouse: "ماوس", remote: "کنترل", keyboard: "کیبورد", "cell phone": "گوشی",
  microwave: "مایکروویو", oven: "فر", toaster: "توستر", sink: "سینک", refrigerator: "یخچال", book: "کتاب", clock: "ساعت", vase: "گلدان شیشه‌ای", scissors: "قیچی",
  "teddy bear": "عروسک خرسی", "hair drier": "سشوار", toothbrush: "مسواک"
};
const T = {
  en: {
    eyebrow: "Lab · Computer vision", title: "Object detection with voice",
    lead: "Point your camera at things around you: it finds 80 kinds of everyday objects and can say their names out loud.",
    privacy: "Everything runs on your device. Your camera image never leaves your phone or computer.",
    start: "Start camera", stop: "Stop camera", photo: "Upload a photo", flip: "Switch camera", speak: "Read aloud", mute: "Stop reading",
    emptyTitle: "Start the camera or upload a photo", emptyText: "Try a cup, a phone, a laptop, a chair or a book.",
    loading: "Loading the AI model…", loadingNote: "About 5 MB — only the first time", starting: "Starting the camera…", analysing: "Looking at the photo…",
    errCamera: "Camera access was blocked. Allow the camera for this site in your browser settings, then try again.",
    errFramed: "The camera can't be used inside this embedded preview. Open the site directly — or upload a photo here.",
    errNoCam: "No camera was found. You can still upload a photo.", errSecure: "The camera only works on a secure (https) page.",
    errLoad: "The AI model couldn't be loaded. Check your connection and try again.", errPhoto: "That file couldn't be opened as an image.",
    seen: "In view", nothing: "Nothing recognised yet", total: (n) => (n === 1 ? "1 object" : `${n} objects`),
    iSee: "I see", and: "and", noVoice: "Your device has no Persian voice, so names are read in English.", noSpeech: "Your browser can't read text aloud.",
    howTitle: "How it works",
    how1T: "One look per frame", how1D: "EfficientDet-Lite0, a small neural network, looks at each frame and draws a box around every object it recognises, with how sure it is.",
    how2T: "80 everyday objects", how2D: "People, cups, bottles, phones, laptops, keyboards, chairs, books, fruit, animals, vehicles and more — the COCO set.",
    how3T: "Speech on your device", how3D: "Names are read with your device's built-in voice. New objects are announced once, so it doesn't repeat itself.",
    credit: "Built with Google's open-source MediaPipe and EfficientDet-Lite0 (Apache 2.0), hosted on this site.",
    pageTitle: "Object detection with voice — free online tool · Sepehr Niaz"
  },
  fa: {
    eyebrow: "آزمایشگاه · بینایی ماشین", title: "تشخیص اشیا با صدا",
    lead: "دوربین را رو به اطرافت بگیر: ۸۰ نوع وسیله‌ی روزمره را پیدا می‌کند و می‌تواند اسمشان را بلند بگوید.",
    privacy: "همه چیز روی دستگاه خودت اجرا می‌شود. تصویر دوربین هیچ‌وقت از گوشی یا کامپیوترت خارج نمی‌شود.",
    start: "شروع دوربین", stop: "توقف دوربین", photo: "انتخاب عکس", flip: "عوض کردن دوربین", speak: "خواندن با صدا", mute: "قطع صدا",
    emptyTitle: "دوربین را روشن کن یا یک عکس انتخاب کن", emptyText: "یک لیوان، گوشی، لپ‌تاپ، صندلی یا کتاب را امتحان کن.",
    loading: "در حال بارگذاری مدل هوش مصنوعی…", loadingNote: "حدود ۵ مگابایت — فقط بار اول", starting: "در حال روشن کردن دوربین…", analysing: "در حال بررسی عکس…",
    errCamera: "دسترسی به دوربین بسته شده است. از تنظیمات مرورگر اجازه‌ی دوربین را برای این سایت بده و دوباره امتحان کن.",
    errFramed: "داخل این پیش‌نمایش نمی‌شود از دوربین استفاده کرد. سایت را مستقیم باز کن — یا همین‌جا یک عکس انتخاب کن.",
    errNoCam: "دوربینی پیدا نشد. هنوز می‌توانی یک عکس انتخاب کنی.", errSecure: "دوربین فقط روی صفحه‌ی امن (https) کار می‌کند.",
    errLoad: "مدل هوش مصنوعی بارگذاری نشد. اینترنت را بررسی کن و دوباره امتحان کن.", errPhoto: "این فایل به‌عنوان عکس باز نشد.",
    seen: "در تصویر", nothing: "هنوز چیزی تشخیص داده نشده", total: (n) => `${fa(n)} شیء`,
    iSee: "می‌بینم", and: "و", noVoice: "دستگاهت صدای فارسی ندارد، برای همین اسم‌ها به انگلیسی خوانده می‌شوند.", noSpeech: "مرورگرت نمی‌تواند متن را با صدا بخواند.",
    howTitle: "چطور کار می‌کند",
    how1T: "یک نگاه در هر فریم", how1D: "EfficientDet-Lite0، یک شبکه‌ی عصبی کوچک، به هر فریم نگاه می‌کند و دور هر شیئی که می‌شناسد کادر می‌کشد، همراه با میزان اطمینانش.",
    how2T: "۸۰ وسیله‌ی روزمره", how2D: "آدم، لیوان، بطری، گوشی، لپ‌تاپ، کیبورد، صندلی، کتاب، میوه، حیوانات، وسایل نقلیه و بیشتر — مجموعه‌ی COCO.",
    how3T: "صدا روی دستگاه خودت", how3D: "اسم‌ها با صدای داخلی دستگاهت خوانده می‌شوند. هر شیء جدید فقط یک بار اعلام می‌شود تا تکراری نشود.",
    credit: "ساخته‌شده با MediaPipe و EfficientDet-Lite0 گوگل (Apache 2.0) که روی همین سایت میزبانی می‌شوند.",
    pageTitle: "تشخیص اشیا با صدا — ابزار آنلاین رایگان · سپهر نیاز"
  }
};
function fa(n) { return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); }
const lang = () => (document.documentElement.lang === "fa" ? "fa" : "en");
const t = (k) => T[lang()][k];
const num = (n) => (lang() === "fa" ? fa(n) : String(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const nameOf = (en) => (lang() === "fa" ? FA[en] || en : en);
const $ = (id) => document.getElementById(id);

const video = $("ob-video"), img = $("ob-img"), canvas = $("ob-canvas"), ctx = canvas.getContext("2d");
const view = $("ob-view"), frameEl = $("ob-frame"), tags = $("ob-tags"), status = $("ob-status"), empty = $("ob-empty"), list = $("ob-list"), note = $("ob-note");
const camBtn = $("ob-cam"), flipBtn = $("ob-flip"), speakBtn = $("ob-speak"), fileIn = $("ob-file");

let det = null, loading = null, mode = null, stream = null, raf = 0, lastTime = -1, facing = "environment", running = "VIDEO";
let mediaW = 0, mediaH = 0, lastDet = [];

function syncEmpty() { empty.hidden = !!mode || !status.hidden; }
function say(text, sub) { status.hidden = !text; status.innerHTML = text ? `<span class="vis-spin" aria-hidden="true"></span><b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}` : ""; syncEmpty(); }
function fail(text) { status.hidden = false; status.innerHTML = `<b class="vis-err">${esc(text)}</b>`; syncEmpty(); }

async function load() {
  if (det) return det;
  if (loading) return loading;
  loading = (async () => {
    say(t("loading"), t("loadingNote"));
    const mp = await import(BASE + "vision_bundle.mjs");
    const files = await mp.FilesetResolver.forVisionTasks(BASE + "wasm");
    // CPU on purpose: this small int8 model is fast there, and some GPU drivers return wrong boxes for it
    det = await mp.ObjectDetector.createFromOptions(files, { baseOptions: { modelAssetPath: BASE + "models/efficientdet_lite0.tflite", delegate: "CPU" }, runningMode: "VIDEO", scoreThreshold: 0.45, maxResults: 12 });
    say("");
    return det;
  })();
  try { return await loading; } catch (e) { loading = null; throw e; }
}
async function setRunning(m) { if (running !== m) { await det.setOptions({ runningMode: m }); running = m; } }

// The picture and the boxes share one frame with the picture's exact shape
function fit(w, h) { if (!w || !h) return; canvas.width = w; canvas.height = h; mediaW = w; mediaH = h; layout(); }
function layout() {
  if (!mode || !mediaW) { view.style.height = ""; frameEl.style.width = frameEl.style.height = ""; return; }
  const vw = view.clientWidth, maxH = Math.round(window.innerHeight * (window.innerWidth < 960 ? 0.55 : 0.74));
  const vh = Math.min(Math.round((vw * mediaH) / mediaW), maxH);
  view.style.height = vh + "px";
  const k = Math.min(vw / mediaW, vh / mediaH);
  frameEl.style.width = Math.round(mediaW * k) + "px"; frameEl.style.height = Math.round(mediaH * k) + "px";
}
window.addEventListener("resize", layout);

async function startCamera() {
  if (!window.isSecureContext || !navigator.mediaDevices) { fail(t("errSecure")); return; }
  try {
    say(t("starting"));
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: facing }, width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  } catch (e) {
    stream = null;
    const framed = (() => { try { return window.self !== window.top; } catch (er) { return true; } })();
    fail(e && (e.name === "NotFoundError" || e.name === "OverconstrainedError") ? t("errNoCam") : framed ? t("errFramed") : t("errCamera"));
    return;
  }
  try { await load(); } catch (e) { stopCamera(); fail(t("errLoad")); return; }
  await setRunning("VIDEO");
  video.srcObject = stream; await video.play();
  const s = stream.getVideoTracks()[0].getSettings ? stream.getVideoTracks()[0].getSettings() : {};
  const mirrored = (s.facingMode || facing) === "user";
  mode = "camera"; lastTime = -1; seenFor.clear();
  img.hidden = true; video.hidden = false; view.classList.toggle("mirror", mirrored); view.classList.add("active");
  fit(video.videoWidth, video.videoHeight); say("");
  camBtn.classList.remove("primary"); flipBtn.hidden = false; paint();
  loop();
}
function stopCamera() {
  cancelAnimationFrame(raf);
  if (stream) stream.getTracks().forEach((tr) => tr.stop());
  stream = null; video.srcObject = null;
  if (mode === "camera") { mode = null; ctx.clearRect(0, 0, canvas.width, canvas.height); tags.innerHTML = ""; view.classList.remove("active", "mirror"); lastDet = []; renderList(); layout(); say(""); }
  camBtn.classList.add("primary"); flipBtn.hidden = true; paint();
}
function loop() {
  if (mode !== "camera") return;
  raf = requestAnimationFrame(loop);
  if (video.readyState < 2 || video.currentTime === lastTime) return;
  lastTime = video.currentTime;
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) fit(video.videoWidth, video.videoHeight);
  const r = det.detectForVideo(video, performance.now());
  show(r.detections);
}
async function analysePhoto(file) {
  if (!file) return;
  stopCamera();
  img.src = URL.createObjectURL(file);
  try { await img.decode(); } catch (e) { fail(t("errPhoto")); return; }
  try { await load(); } catch (e) { fail(t("errLoad")); return; }
  say(t("analysing"));
  await setRunning("IMAGE");
  mode = "photo"; video.hidden = true; img.hidden = false; view.classList.remove("mirror"); view.classList.add("active");
  fit(img.naturalWidth, img.naturalHeight);
  await new Promise((r) => setTimeout(r, 30));
  const r = det.detect(img);
  say("");
  show(r.detections, true);
  return r.detections.map((d) => d.categories[0].categoryName);
}

// ── Drawing: boxes on the canvas, labels as HTML so they never mirror ─
const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#f59e0b", "#fb7185", "#60a5fa"];
function show(detections, once) {
  lastDet = detections;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const s = Math.max(1, canvas.width / 640), mir = view.classList.contains("mirror");
  const html = [];
  detections.forEach((d, i) => {
    const b = d.boundingBox, c = d.categories[0], col = COLORS[i % COLORS.length];
    ctx.lineWidth = 3 * s; ctx.strokeStyle = col;
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(b.originX, b.originY, b.width, b.height, 8 * s) : ctx.rect(b.originX, b.originY, b.width, b.height); ctx.stroke();
    const x = ((mir ? canvas.width - b.originX - b.width : b.originX) / canvas.width) * 100, y = (b.originY / canvas.height) * 100;
    html.push(`<span style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;--c:${col}">${esc(nameOf(c.categoryName))} ${num(Math.round(c.score * 100))}%</span>`);
  });
  tags.innerHTML = html.join("");
  renderList();
  announce(detections, once);
}
function renderList() {
  if (!mode) { list.innerHTML = `<p class="muted">—</p>`; return; }
  const counts = {};
  for (const d of lastDet) { const n = d.categories[0].categoryName; counts[n] = counts[n] || { n: 0, s: 0 }; counts[n].n++; counts[n].s = Math.max(counts[n].s, d.categories[0].score); }
  const rows = Object.entries(counts).sort((a, b) => b[1].n - a[1].n || b[1].s - a[1].s);
  list.innerHTML = `<h3>${esc(t("seen"))}${rows.length ? `<small>${esc(t("total")(lastDet.length))}</small>` : ""}</h3>` +
    (rows.length ? rows.map(([n, v]) => `<div class="vis-row"><span>${esc(nameOf(n))}${v.n > 1 ? ` × ${num(v.n)}` : ""}</span><b>${num(Math.round(v.s * 100))}%</b></div>`).join("") : `<p class="muted">${esc(t("nothing"))}</p>`);
}

// ── Voice: announce objects that stay in view, once in a while ─
let speakOn = false, voice = null, voiceLang = "en";
const seenFor = new Map(), spokenAt = new Map();
function pickVoice() {
  const vs = window.speechSynthesis ? speechSynthesis.getVoices() : [];
  const want = lang();
  voice = vs.find((v) => v.lang && v.lang.toLowerCase().startsWith(want)) || (want === "fa" ? null : null);
  voiceLang = voice ? want : "en";
  if (!voice) voice = vs.find((v) => v.lang && v.lang.toLowerCase().startsWith("en")) || null;
  note.textContent = !window.speechSynthesis ? t("noSpeech") : speakOn && want === "fa" && voiceLang !== "fa" ? t("noVoice") : "";
}
if (window.speechSynthesis) speechSynthesis.onvoiceschanged = pickVoice;
let lastSpeak = 0;
function announce(detections, once) {
  if (!speakOn || !window.speechSynthesis) return;
  const now = performance.now(), present = new Set(detections.map((d) => d.categories[0].categoryName));
  for (const k of [...seenFor.keys()]) if (!present.has(k)) seenFor.delete(k);
  for (const k of present) seenFor.set(k, (seenFor.get(k) || 0) + 1);
  if (now - lastSpeak < 1500 || speechSynthesis.speaking) return;
  const fresh = [...present].filter((k) => (once || seenFor.get(k) >= 4) && now - (spokenAt.get(k) || -1e9) > 12000);
  if (!fresh.length) return;
  fresh.forEach((k) => spokenAt.set(k, now));
  lastSpeak = now;
  const fa = voiceLang === "fa", names = fresh.slice(0, 4).map((k) => (fa ? FA[k] || k : k));
  const text = fa ? `${T.fa.iSee} ${names.join(` ${T.fa.and} `)}` : `${T.en.iSee} ${names.length > 1 ? names.slice(0, -1).join(", ") + ` ${T.en.and} ` + names[names.length - 1] : names[0]}`;
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = fa ? "fa-IR" : "en-US"; u.rate = 1;
  speechSynthesis.speak(u);
}

function paint() {
  document.querySelectorAll("[data-v]").forEach((el) => {
    let k = el.dataset.v;
    if (k === "start" && mode === "camera") k = "stop";
    if (k === "speak" && speakOn) k = "mute";
    if (typeof T.en[k] === "string") el.textContent = t(k);
  });
  speakBtn.classList.toggle("on", speakOn);
  document.title = t("pageTitle");
}
camBtn.addEventListener("click", () => (mode === "camera" ? stopCamera() : startCamera()));
flipBtn.addEventListener("click", async () => { facing = facing === "environment" ? "user" : "environment"; stopCamera(); await startCamera(); });
speakBtn.addEventListener("click", () => {
  speakOn = !speakOn;
  if (window.speechSynthesis) { speechSynthesis.cancel(); if (speakOn) { pickVoice(); spokenAt.clear(); speechSynthesis.speak(new SpeechSynthesisUtterance("")); if (lastDet.length) announce(lastDet, true); } }
  pickVoice(); paint();
});
fileIn.addEventListener("change", () => { analysePhoto(fileIn.files[0]); fileIn.value = ""; });
document.addEventListener("cv:langchange", () => { paint(); pickVoice(); if (mode) show(lastDet, true); else renderList(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && mode === "camera") stopCamera(); });

paint(); renderList(); pickVoice();
window.__objectsAnalyse = async (src) => { const b = await (await fetch(src)).blob(); return analysePhoto(b); };
