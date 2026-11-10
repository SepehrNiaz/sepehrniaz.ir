// ─────────────────────────────────────────────────────────────
//  Rock · Paper · Scissors with your real hand — in the browser.
//  MediaPipe Gesture Recognizer (Apache 2.0) reads ✊ ✋ ✌️ from the
//  camera; the computer picks at random. First to 5 wins.
// ─────────────────────────────────────────────────────────────
const BASE = new URL("assets/vision/", import.meta.url).href;
const MOVES = { rock: "✊", paper: "✋", scissors: "✌️" };
const FROM_GESTURE = { Closed_Fist: "rock", Open_Palm: "paper", Victory: "scissors" };
const BEATS = { rock: "scissors", paper: "rock", scissors: "paper" };
const WIN = 5;
const T = {
  en: {
    eyebrow: "Lab · Game", title: "Rock · Paper · Scissors",
    lead: "Play against the computer with your real hand. Show ✊ rock, ✋ paper or ✌️ scissors to the camera when the countdown ends.",
    privacy: "Everything runs on your device. Your camera image never leaves your phone or computer.",
    start: "Start camera", stop: "Stop camera", play: "Play a round", next: "Next round", reset: "New game",
    emptyTitle: "Start the camera to play", emptyText: "Hold your hand up in front of the camera, about half a metre away.",
    loading: "Loading the AI model…", loadingNote: "About 8 MB — only the first time", starting: "Starting the camera…",
    errCamera: "Camera access was blocked. Allow the camera for this site in your browser settings, then try again.",
    errFramed: "The camera can't be used inside this embedded preview. Open the site directly to play.",
    errNoCam: "No camera was found.", errSecure: "The camera only works on a secure (https) page.",
    errLoad: "The AI model couldn't be loaded. Check your connection and try again.",
    you: "You", cpu: "Computer", yourHand: "Your hand", none: "Show your hand",
    names: { rock: "Rock", paper: "Paper", scissors: "Scissors" },
    go: "Shoot!", win: "You win this round! 🎉", lose: "Computer wins this round", draw: "Draw — same move",
    missed: "I couldn't see your move. Keep your hand in view and try again.",
    gameWin: "You won the game! 🏆", gameLose: "The computer won the game. Rematch?",
    ready: "Ready? Press “Play a round”, then show your move on “Shoot!”.",
    howTitle: "How it works",
    how1T: "Reading your hand", how1D: "A gesture model finds 21 points on your hand and recognises a closed fist, an open palm and a victory sign — rock, paper and scissors.",
    how2T: "Fair play", how2D: "The computer picks its move at random only after your move is read, from what the camera saw in the half-second after “Shoot!”.",
    how3T: "Private", how3D: "Everything happens on your device. No video is recorded or sent anywhere.",
    credit: "Built with Google's open-source MediaPipe Gesture Recognizer (Apache 2.0), hosted on this site.",
    pageTitle: "Rock Paper Scissors with your hand — free browser game · Sepehr Niaz"
  },
  fa: {
    eyebrow: "آزمایشگاه · بازی", title: "سنگ · کاغذ · قیچی",
    lead: "با دست واقعی‌ات با کامپیوتر بازی کن. وقتی شمارش تمام شد، ✊ سنگ، ✋ کاغذ یا ✌️ قیچی را جلوی دوربین نشان بده.",
    privacy: "همه چیز روی دستگاه خودت اجرا می‌شود. تصویر دوربین هیچ‌وقت از گوشی یا کامپیوترت خارج نمی‌شود.",
    start: "شروع دوربین", stop: "توقف دوربین", play: "شروع دست", next: "دست بعدی", reset: "بازی جدید",
    emptyTitle: "برای بازی دوربین را روشن کن", emptyText: "دستت را حدود نیم متر جلوی دوربین بگیر.",
    loading: "در حال بارگذاری مدل هوش مصنوعی…", loadingNote: "حدود ۸ مگابایت — فقط بار اول", starting: "در حال روشن کردن دوربین…",
    errCamera: "دسترسی به دوربین بسته شده است. از تنظیمات مرورگر اجازه‌ی دوربین را برای این سایت بده و دوباره امتحان کن.",
    errFramed: "داخل این پیش‌نمایش نمی‌شود از دوربین استفاده کرد. برای بازی سایت را مستقیم باز کن.",
    errNoCam: "دوربینی پیدا نشد.", errSecure: "دوربین فقط روی صفحه‌ی امن (https) کار می‌کند.",
    errLoad: "مدل هوش مصنوعی بارگذاری نشد. اینترنت را بررسی کن و دوباره امتحان کن.",
    you: "تو", cpu: "کامپیوتر", yourHand: "دست تو", none: "دستت را نشان بده",
    names: { rock: "سنگ", paper: "کاغذ", scissors: "قیچی" },
    go: "حالا!", win: "این دست را بردی! 🎉", lose: "این دست را کامپیوتر برد", draw: "مساوی — حرکت یکسان",
    missed: "حرکتت را ندیدم. دستت را جلوی دوربین نگه دار و دوباره امتحان کن.",
    gameWin: "بازی را بردی! 🏆", gameLose: "کامپیوتر بازی را برد. یک دست دیگر؟",
    ready: "آماده‌ای؟ «شروع دست» را بزن و روی «حالا!» حرکتت را نشان بده.",
    howTitle: "چطور کار می‌کند",
    how1T: "خواندن دست", how1D: "یک مدل حرکات دست ۲۱ نقطه روی دستت پیدا می‌کند و مشت، کف دست باز و علامت پیروزی را تشخیص می‌دهد — یعنی سنگ، کاغذ و قیچی.",
    how2T: "بازی منصفانه", how2D: "کامپیوتر فقط بعد از خوانده شدن حرکت تو، به‌صورت تصادفی انتخاب می‌کند؛ از چیزی که دوربین در نیم‌ثانیه‌ی بعد از «حالا!» دیده است.",
    how3T: "خصوصی", how3D: "همه چیز روی دستگاه خودت انجام می‌شود. هیچ ویدیویی ضبط یا جایی فرستاده نمی‌شود.",
    credit: "ساخته‌شده با Gesture Recognizer متن‌باز MediaPipe گوگل (Apache 2.0) که روی همین سایت میزبانی می‌شود.",
    pageTitle: "سنگ کاغذ قیچی با دست — بازی رایگان مرورگر · سپهر نیاز"
  }
};
function fa(n) { return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); }
const lang = () => (document.documentElement.lang === "fa" ? "fa" : "en");
const t = (k) => T[lang()][k];
const num = (n) => (lang() === "fa" ? fa(n) : String(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = (id) => document.getElementById(id);

const video = $("gm-video"), canvas = $("gm-canvas"), ctx = canvas.getContext("2d");
const view = $("gm-view"), frameEl = $("gm-frame"), status = $("gm-status"), empty = $("gm-empty"), hand = $("gm-hand"), big = $("gm-big");
const camBtn = $("gm-cam"), playBtn = $("gm-play"), resetBtn = $("gm-reset"), board = $("gm-board"), msg = $("gm-msg");

let mp = null, rec = null, drawer = null, loading = null, mode = null, stream = null, raf = 0, lastTime = -1, mediaW = 0, mediaH = 0;
let current = null, sampling = null, busy = false;
const score = { you: 0, cpu: 0 };
let lastRound = null; // { you, cpu, result } for repainting on language change

function syncEmpty() { empty.hidden = !!mode || !status.hidden; }
function say(text, sub) { status.hidden = !text; status.innerHTML = text ? `<span class="vis-spin" aria-hidden="true"></span><b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}` : ""; syncEmpty(); }
function fail(text) { status.hidden = false; status.innerHTML = `<b class="vis-err">${esc(text)}</b>`; syncEmpty(); }

async function load() {
  if (rec) return rec;
  if (loading) return loading;
  loading = (async () => {
    say(t("loading"), t("loadingNote"));
    mp = await import(BASE + "vision_bundle.mjs");
    const files = await mp.FilesetResolver.forVisionTasks(BASE + "wasm");
    let err;
    for (const delegate of ["GPU", "CPU"]) {
      try { rec = await mp.GestureRecognizer.createFromOptions(files, { baseOptions: { modelAssetPath: BASE + "models/gesture_recognizer.task", delegate }, runningMode: "VIDEO", numHands: 1 }); break; }
      catch (e) { err = e; }
    }
    if (!rec) throw err;
    drawer = new mp.DrawingUtils(ctx);
    say("");
    return rec;
  })();
  try { return await loading; } catch (e) { loading = null; throw e; }
}
function fit(w, h) { if (!w || !h) return; canvas.width = w; canvas.height = h; mediaW = w; mediaH = h; layout(); }
function layout() {
  if (!mode || !mediaW) { view.style.height = ""; frameEl.style.width = frameEl.style.height = ""; return; }
  const vw = view.clientWidth, maxH = Math.round(window.innerHeight * (window.innerWidth < 960 ? 0.48 : 0.7));
  const vh = Math.min(Math.round((vw * mediaH) / mediaW), maxH);
  view.style.height = vh + "px";
  const k = Math.min(vw / mediaW, vh / mediaH);
  frameEl.style.width = Math.round(mediaW * k) + "px"; frameEl.style.height = Math.round(mediaH * k) + "px";
}
window.addEventListener("resize", layout);

async function startCamera() {
  if (!window.isSecureContext || !navigator.mediaDevices) { fail(t("errSecure")); return; }
  try { say(t("starting")); stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false }); }
  catch (e) {
    stream = null;
    const framed = (() => { try { return window.self !== window.top; } catch (er) { return true; } })();
    fail(e && (e.name === "NotFoundError" || e.name === "OverconstrainedError") ? t("errNoCam") : framed ? t("errFramed") : t("errCamera"));
    return;
  }
  try { await load(); } catch (e) { stopCamera(); fail(t("errLoad")); return; }
  video.srcObject = stream; await video.play();
  mode = "camera"; lastTime = -1; view.classList.add("mirror", "active");
  fit(video.videoWidth, video.videoHeight); say("");
  camBtn.classList.remove("primary"); playBtn.disabled = false; msg.textContent = t("ready");
  paint(); loop();
}
function stopCamera() {
  cancelAnimationFrame(raf);
  if (stream) stream.getTracks().forEach((tr) => tr.stop());
  stream = null; video.srcObject = null;
  if (mode) { mode = null; ctx.clearRect(0, 0, canvas.width, canvas.height); view.classList.remove("active"); layout(); say(""); }
  camBtn.classList.add("primary"); playBtn.disabled = true; current = null; paintHand(); paint();
}
function loop() {
  if (mode !== "camera") return;
  raf = requestAnimationFrame(loop);
  if (video.readyState < 2 || video.currentTime === lastTime) return;
  lastTime = video.currentTime;
  if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) fit(video.videoWidth, video.videoHeight);
  const r = rec.recognizeForVideo(video, performance.now());
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const s = Math.max(1, canvas.width / 640);
  for (const lm of r.landmarks) {
    drawer.drawConnectors(lm, mp.GestureRecognizer.HAND_CONNECTIONS, { color: "#8b5cf6", lineWidth: 3.2 * s });
    drawer.drawLandmarks(lm, { color: "#22d3ee", fillColor: "#0b1120", lineWidth: 1.6 * s, radius: 3.4 * s });
  }
  const g = r.gestures[0] && r.gestures[0][0];
  current = g && g.score > 0.55 ? FROM_GESTURE[g.categoryName] || null : null;
  if (sampling) sampling.push(current);
  paintHand();
}

// ── A round: 3 · 2 · 1 · Shoot! → read the hand for ~0.6 s → compare ─
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
let audio = null;
function beep(freq, ms) {
  try { audio = audio || new (window.AudioContext || window.webkitAudioContext)(); const o = audio.createOscillator(), g = audio.createGain(); o.frequency.value = freq; g.gain.value = 0.08; o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + ms / 1000); } catch (e) {}
}
async function round() {
  if (busy || mode !== "camera") return;
  if (score.you >= WIN || score.cpu >= WIN) reset();
  busy = true; playBtn.disabled = true; lastRound = null; board.classList.remove("show");
  for (const n of [3, 2, 1]) { big.textContent = num(n); big.className = "gm-big pop"; beep(520, 120); await wait(700); big.className = "gm-big"; await wait(60); }
  big.textContent = t("go"); big.className = "gm-big pop go"; beep(880, 220);
  sampling = []; await wait(650);
  const picks = sampling.filter(Boolean); sampling = null;
  big.className = "gm-big";
  if (!picks.length) { msg.textContent = t("missed"); busy = false; playBtn.disabled = false; paint(); return; }
  const tally = {}; for (const p of picks) tally[p] = (tally[p] || 0) + 1;
  const you = Object.entries(tally).sort((a, b) => b[1] - a[1])[0][0];
  const cpu = ["rock", "paper", "scissors"][Math.floor(Math.random() * 3)];
  const result = you === cpu ? "draw" : BEATS[you] === cpu ? "win" : "lose";
  if (result === "win") score.you++; else if (result === "lose") score.cpu++;
  lastRound = { you, cpu, result };
  paintBoard(true);
  busy = false; playBtn.disabled = false; paint();
}
function reset() { score.you = 0; score.cpu = 0; lastRound = null; board.classList.remove("show"); msg.textContent = mode ? t("ready") : ""; paintScore(); paint(); }

// ── Painting ────────────────────────────────────────────────
function paintHand() { hand.innerHTML = mode ? `<small>${esc(t("yourHand"))}</small><b>${current ? `${MOVES[current]} ${esc(t("names")[current])}` : esc(t("none"))}</b>` : ""; }
function paintScore() { $("gm-you").textContent = num(score.you); $("gm-cpu").textContent = num(score.cpu); }
function paintBoard(animate) {
  paintScore();
  if (!lastRound) return;
  const { you, cpu, result } = lastRound;
  $("gm-you-move").textContent = MOVES[you]; $("gm-cpu-move").textContent = MOVES[cpu];
  $("gm-you-name").textContent = t("names")[you]; $("gm-cpu-name").textContent = t("names")[cpu];
  const over = score.you >= WIN ? t("gameWin") : score.cpu >= WIN ? t("gameLose") : "";
  msg.textContent = over || t(result);
  msg.className = `gm-msg ${over ? (score.you >= WIN ? "win" : "lose") : result}`;
  if (animate) { board.classList.remove("show"); void board.offsetWidth; }
  board.classList.add("show");
}
function paint() {
  document.querySelectorAll("[data-v]").forEach((el) => {
    let k = el.dataset.v;
    if (k === "start" && mode) k = "stop";
    if (k === "play" && lastRound) k = "next";
    if (typeof T.en[k] === "string") el.textContent = t(k);
  });
  $("gm-you-label").textContent = t("you"); $("gm-cpu-label").textContent = t("cpu");
  document.title = t("pageTitle");
}
camBtn.addEventListener("click", () => (mode ? stopCamera() : startCamera()));
playBtn.addEventListener("click", round);
resetBtn.addEventListener("click", reset);
document.addEventListener("cv:langchange", () => { paint(); paintHand(); if (lastRound) paintBoard(false); else if (mode) msg.textContent = t("ready"); });
document.addEventListener("visibilitychange", () => { if (document.hidden && mode) stopCamera(); });
document.addEventListener("keydown", (e) => { if (e.code === "Space" && mode && !busy && document.activeElement === document.body) { e.preventDefault(); round(); } });

playBtn.disabled = true; paint(); paintScore();
// For automated checks: feed a fixed move instead of the camera
window.__gameRound = async (move) => { const prev = mode; mode = "camera"; const iv = setInterval(() => { if (sampling) sampling.push(move); }, 50); await round(); clearInterval(iv); mode = prev; return { lastRound, score: { ...score }, msg: msg.textContent }; };
