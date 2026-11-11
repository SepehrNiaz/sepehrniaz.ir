// ─────────────────────────────────────────────────────────────
//  Object detection with voice — runs entirely in the browser.
//  MediaPipe Object Detector with EfficientDet-Lite2 (80 everyday
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
    loading: "Loading the AI model…", loadingNote: "About 8 MB — only the first time", starting: "Starting the camera…", analysing: "Looking at the photo…",
    errCamera: "Camera access was blocked. Allow the camera for this site in your browser settings, then try again.",
    errFramed: "The camera can't be used inside this embedded preview. Open the site directly — or upload a photo here.",
    errNoCam: "No camera was found. You can still upload a photo.", errSecure: "The camera only works on a secure (https) page.",
    errLoad: "The AI model couldn't be loaded. Check your connection and try again.", errPhoto: "That file couldn't be opened as an image.",
    seen: "In view", nothing: "Nothing recognised yet", total: (n) => (n === 1 ? "1 object" : `${n} objects`),
    iSee: "I see", and: "and", noVoice: "Your device has no Persian voice, so names are read in English.", noSpeech: "Your browser can't read text aloud.",
    howTitle: "How it works",
    how1T: "One look per frame", how1D: "EfficientDet-Lite2, a small neural network, looks at each frame and draws a box around every object it recognises, with how sure it is.",
    how2T: "80 everyday objects", how2D: "People, cups, bottles, phones, laptops, keyboards, chairs, books, fruit, animals, vehicles and more — the COCO set.",
    how3T: "Speech on your device", how3D: "Names are read with your device's built-in voice. New objects are announced as they appear, and the whole scene is read again every few seconds.",
    credit: "Built with Google's open-source MediaPipe and EfficientDet-Lite2 (Apache 2.0), hosted on this site.",
    pageTitle: "Object detection with voice — free online tool · Sepehr Niaz"
  },
  fa: {
    eyebrow: "آزمایشگاه · بینایی ماشین", title: "تشخیص اشیا با صدا",
    lead: "دوربین را رو به اطرافت بگیر: ۸۰ نوع وسیله‌ی روزمره را پیدا می‌کند و می‌تواند اسمشان را بلند بگوید.",
    privacy: "همه چیز روی دستگاه خودت اجرا می‌شود. تصویر دوربین هیچ‌وقت از گوشی یا کامپیوترت خارج نمی‌شود.",
    start: "شروع دوربین", stop: "توقف دوربین", photo: "انتخاب عکس", flip: "عوض کردن دوربین", speak: "خواندن با صدا", mute: "قطع صدا",
    emptyTitle: "دوربین را روشن کن یا یک عکس انتخاب کن", emptyText: "یک لیوان، گوشی، لپ‌تاپ، صندلی یا کتاب را امتحان کن.",
    loading: "در حال بارگذاری مدل هوش مصنوعی…", loadingNote: "حدود ۸ مگابایت — فقط بار اول", starting: "در حال روشن کردن دوربین…", analysing: "در حال بررسی عکس…",
    errCamera: "دسترسی به دوربین بسته شده است. از تنظیمات مرورگر اجازه‌ی دوربین را برای این سایت بده و دوباره امتحان کن.",
    errFramed: "داخل این پیش‌نمایش نمی‌شود از دوربین استفاده کرد. سایت را مستقیم باز کن — یا همین‌جا یک عکس انتخاب کن.",
    errNoCam: "دوربینی پیدا نشد. هنوز می‌توانی یک عکس انتخاب کنی.", errSecure: "دوربین فقط روی صفحه‌ی امن (https) کار می‌کند.",
    errLoad: "مدل هوش مصنوعی بارگذاری نشد. اینترنت را بررسی کن و دوباره امتحان کن.", errPhoto: "این فایل به‌عنوان عکس باز نشد.",
    seen: "در تصویر", nothing: "هنوز چیزی تشخیص داده نشده", total: (n) => `${fa(n)} شیء`,
    iSee: "می‌بینم", and: "و", noVoice: "دستگاهت صدای فارسی ندارد، برای همین اسم‌ها به انگلیسی خوانده می‌شوند.", noSpeech: "مرورگرت نمی‌تواند متن را با صدا بخواند.",
    howTitle: "چطور کار می‌کند",
    how1T: "یک نگاه در هر فریم", how1D: "EfficientDet-Lite2، یک شبکه‌ی عصبی کوچک، به هر فریم نگاه می‌کند و دور هر شیئی که می‌شناسد کادر می‌کشد، همراه با میزان اطمینانش.",
    how2T: "۸۰ وسیله‌ی روزمره", how2D: "آدم، لیوان، بطری، گوشی، لپ‌تاپ، کیبورد، صندلی، کتاب، میوه، حیوانات، وسایل نقلیه و بیشتر — مجموعه‌ی COCO.",
    how3T: "صدا روی دستگاه خودت", how3D: "اسم‌ها با صدای داخلی دستگاهت خوانده می‌شوند. هر شیء جدید همان لحظه اعلام می‌شود و کل صحنه هر چند ثانیه دوباره خوانده می‌شود.",
    credit: "ساخته‌شده با MediaPipe و EfficientDet-Lite2 گوگل (Apache 2.0) که روی همین سایت میزبانی می‌شوند.",
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
let mediaW = 0, mediaH = 0, lastDet = [], lastRun = 0, lastCost = 0;

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
    det = await mp.ObjectDetector.createFromOptions(files, { baseOptions: { modelAssetPath: BASE + "models/efficientdet_lite2.tflite", delegate: "CPU" }, runningMode: "VIDEO", scoreThreshold: 0.3, maxResults: 20 });
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
window.addEventListener("resize", () => { layout(); if (mode) show(lastDet, true); });

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
  mode = "camera"; lastTime = -1; tracks = []; sceneAt = 0; saidScene = "";
  // Starting the camera is a tap, so sound may start with it
  if (!speakOn && window.speechSynthesis && !speakTouched) { speakOn = true; unlockSpeech(); pickVoice(); }
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
  const now = performance.now();
  if (video.readyState < 2 || video.currentTime === lastTime || now - lastRun < Math.max(110, lastCost * 1.5)) return;
  lastTime = video.currentTime; lastRun = now;
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) fit(video.videoWidth, video.videoHeight);
  const r = det.detectForVideo(video, now);
  lastCost = performance.now() - now;   // leave the page room to breathe on slow phones
  show(follow(r.detections));
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
  tracks = [];
  const kept = tidy(r.detections.filter((d) => d.categories[0].score >= 0.38));
  show(kept, true);
  return kept.map((d) => d.categories[0].categoryName);
}

// ── Cleaning up what the model returns ───────────────────────
const COLORS = ["#22d3ee", "#a78bfa", "#34d399", "#f59e0b", "#fb7185", "#60a5fa"];
const iou = (a, b) => {
  const x = Math.max(0, Math.min(a.originX + a.width, b.originX + b.width) - Math.max(a.originX, b.originX));
  const y = Math.max(0, Math.min(a.originY + a.height, b.originY + b.height) - Math.max(a.originY, b.originY));
  const i = x * y; return i / (a.width * a.height + b.width * b.height - i || 1);
};
// One box per object: when two boxes sit on the same thing, keep the surer one
function tidy(dets) {
  const out = [];
  for (const d of [...dets].sort((a, b) => b.categories[0].score - a.categories[0].score)) {
    const same = out.some((o) => { const v = iou(o.boundingBox, d.boundingBox); return v > 0.8 || (v > 0.45 && o.categories[0].categoryName === d.categories[0].categoryName); });
    if (!same) out.push(d);
  }
  return out;
}
// Follow objects from frame to frame: boxes glide instead of jumping, an object
// appears only after it has been seen a few times, and it survives a missed frame
let tracks = [], trackId = 0;
function follow(dets) {
  const fresh = tidy(dets);
  for (const tk of tracks) tk.hit = false;
  for (const d of fresh) {
    const name = d.categories[0].categoryName, b = d.boundingBox;
    let best = null, bestV = 0.25;
    for (const tk of tracks) { if (tk.hit || tk.name !== name) continue; const v = iou(tk.box, b); if (v > bestV) { best = tk; bestV = v; } }
    if (best) {
      const k = 0.55, o = best.box;
      best.box = { originX: o.originX + (b.originX - o.originX) * k, originY: o.originY + (b.originY - o.originY) * k, width: o.width + (b.width - o.width) * k, height: o.height + (b.height - o.height) * k };
      best.score += (d.categories[0].score - best.score) * 0.4; best.seen++; best.miss = 0; best.hit = true;
    } else tracks.push({ id: trackId++, name, box: { ...b }, score: d.categories[0].score, seen: 1, miss: 0, hit: true });
  }
  tracks = tracks.filter((tk) => tk.hit || ++tk.miss <= (tk.seen >= 3 ? 4 : 0));
  return tracks.filter((tk) => tk.seen >= 3 && (tk.score >= 0.42 || tk.seen >= 8))
    .map((tk) => ({ id: tk.id, boundingBox: tk.box, categories: [{ categoryName: tk.name, score: tk.score }] }));
}

// ── Drawing: boxes on the canvas, labels as HTML so they never mirror ─
function show(detections, once) {
  lastDet = detections;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const s = Math.max(1, canvas.width / 640), mir = view.classList.contains("mirror");
  const html = [];
  // big boxes first, so the small ones are drawn (and labelled) on top
  const order = [...detections].sort((a, b) => b.boundingBox.width * b.boundingBox.height - a.boundingBox.width * a.boundingBox.height);
  order.forEach((d, i) => {
    const b = d.boundingBox, c = d.categories[0], col = COLORS[(d.id != null ? d.id : i) % COLORS.length];
    const x0 = Math.max(0, b.originX), y0 = Math.max(0, b.originY), w = Math.min(canvas.width, b.originX + b.width) - x0, h = Math.min(canvas.height, b.originY + b.height) - y0;
    ctx.lineWidth = 2.5 * s; ctx.strokeStyle = col; ctx.fillStyle = col + "1f";
    ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y0, w, h, 8 * s) : ctx.rect(x0, y0, w, h); ctx.fill(); ctx.stroke();
    const x = ((mir ? canvas.width - x0 - w : x0) / canvas.width) * 100, y = (y0 / canvas.height) * 100;
    html.push(`<span style="left:${x.toFixed(2)}%;top:${y.toFixed(2)}%;--c:${col}">${esc(nameOf(c.categoryName))} <i>${num(Math.round(c.score * 100))}%</i></span>`);
  });
  tags.innerHTML = html.join("");
  placeTags();
  renderList();
  announce(detections, once);
}
// Keep every label inside the picture and off the other labels
function placeTags() {
  const W = tags.clientWidth, H = tags.clientHeight, placed = [];
  if (!W || !H) return;
  for (const el of tags.children) {
    const w = el.offsetWidth, h = el.offsetHeight;
    let x = Math.min(Math.max(0, el.offsetLeft), W - w), y = el.offsetTop - h - 2;
    if (y < 0) y = el.offsetTop + 3;          // no room above the box: go inside it
    for (let tries = 0; tries < 8; tries++) {
      const hit = placed.find((p) => x < p.x + p.w + 2 && x + w + 2 > p.x && y < p.y + p.h + 2 && y + h + 2 > p.y);
      if (!hit) break;
      y = hit.y + hit.h + 3;
    }
    y = Math.min(Math.max(0, y), H - h);
    el.style.left = x + "px"; el.style.top = y + "px";
    placed.push({ x, y, w, h });
  }
}
function renderList() {
  if (!mode) { list.innerHTML = `<p class="muted">—</p>`; return; }
  const counts = {};
  for (const d of lastDet) { const n = d.categories[0].categoryName; counts[n] = counts[n] || { n: 0, s: 0 }; counts[n].n++; counts[n].s = Math.max(counts[n].s, d.categories[0].score); }
  const rows = Object.entries(counts).sort((a, b) => b[1].n - a[1].n || b[1].s - a[1].s);
  list.innerHTML = `<h3>${esc(t("seen"))}${rows.length ? `<small>${esc(t("total")(lastDet.length))}</small>` : ""}</h3>` +
    (rows.length ? rows.map(([n, v]) => `<div class="vis-row"><span>${esc(nameOf(n))}${v.n > 1 ? ` × ${num(v.n)}` : ""}</span><b>${num(Math.round(v.s * 100))}%</b></div>`).join("") : `<p class="muted">${esc(t("nothing"))}</p>`);
}

// ── Voice: say new objects as they appear, and the whole scene every few seconds ─
let speakOn = false, speakTouched = false, voice = null, voiceLang = "en";
let sceneAt = 0, saidScene = "", speakStart = 0;
const spokenAt = new Map();
function unlockSpeech() { try { speechSynthesis.cancel(); speechSynthesis.speak(new SpeechSynthesisUtterance(" ")); } catch (e) {} }
const NUM_WORDS = { en: ["", "", "two", "three", "four", "five", "six", "seven", "eight", "nine"], fa: ["", "", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"] };
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
  const now = performance.now(), counts = new Map();
  for (const d of detections) { const k = d.categories[0].categoryName; counts.set(k, (counts.get(k) || 0) + 1); }
  for (const k of [...spokenAt.keys()]) if (!counts.has(k) && now - spokenAt.get(k) > 4000) spokenAt.delete(k);
  // some phones leave "speaking" stuck on: clear it so the voice never goes silent
  if (speechSynthesis.speaking) { if (now - speakStart > 9000) speechSynthesis.cancel(); else return; }
  if (!counts.size || now - lastSpeak < 900) return;
  const fresh = [...counts.keys()].filter((k) => !spokenAt.has(k));
  const scene = [...counts].map(([k, n]) => k + n).sort().join(",");
  const again = now - sceneAt > 7000 || (once && scene !== saidScene);
  if (!fresh.length && !again) return;
  const keys = again || once ? [...counts.keys()] : fresh;
  if (again || once) { sceneAt = now; saidScene = scene; }
  keys.forEach((k) => spokenAt.set(k, now));
  lastSpeak = now; speakStart = now;
  const fa = voiceLang === "fa", L = fa ? "fa" : "en";
  const names = keys.slice(0, 6).map((k) => { const n = counts.get(k), w = fa ? FA[k] || k : k; return n > 1 ? `${NUM_WORDS[L][Math.min(n, 9)]} ${fa ? w : w + (/(s|x|ch|sh)$/.test(w) ? "es" : "s")}` : w; });
  const text = fa ? `${T.fa.iSee} ${names.join(` ${T.fa.and} `)}` : `${T.en.iSee} ${names.length > 1 ? names.slice(0, -1).join(", ") + ` ${T.en.and} ` + names[names.length - 1] : names[0]}`;
  const u = new SpeechSynthesisUtterance(text);
  if (voice) u.voice = voice;
  u.lang = fa ? "fa-IR" : "en-US"; u.rate = 1.05;
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
  speakOn = !speakOn; speakTouched = true;
  if (window.speechSynthesis) { speechSynthesis.cancel(); if (speakOn) { unlockSpeech(); pickVoice(); spokenAt.clear(); sceneAt = 0; saidScene = ""; if (lastDet.length) announce(lastDet, true); } }
  pickVoice(); paint();
});
fileIn.addEventListener("change", () => { analysePhoto(fileIn.files[0]); fileIn.value = ""; });
document.addEventListener("cv:langchange", () => { paint(); pickVoice(); if (mode) show(lastDet, true); else renderList(); });
document.addEventListener("visibilitychange", () => { if (document.hidden && mode === "camera") stopCamera(); });

paint(); renderList(); pickVoice();
window.__objectsAnalyse = async (src) => { const b = await (await fetch(src)).blob(); return analysePhoto(b); };
