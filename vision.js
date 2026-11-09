// ─────────────────────────────────────────────────────────────
//  Face, hand & body detection — runs entirely in the browser.
//  Models: MediaPipe Face Landmarker, Gesture Recognizer and Pose
//  Landmarker (Apache 2.0), served from assets/vision/. No image
//  ever leaves the device.
// ─────────────────────────────────────────────────────────────
const BASE = new URL("assets/vision/", import.meta.url).href;

const T = {
  en: {
    start: "Start camera", stop: "Stop camera", photo: "Upload a photo", face: "Face", hands: "Hands", body: "Body",
    emptyTitle: "Start the camera or upload a photo", emptyText: "Works best in good light, facing the camera.",
    loading: "Loading the AI models…", loadingNote: "About 30 MB — only the first time", loadingStep: (n, t) => `Model ${n} of ${t}`,
    starting: "Starting the camera…", analysing: "Analysing the photo…",
    errCamera: "Camera access was blocked. Allow the camera for this site in your browser settings, then try again.",
    errFramed: "The camera can't be used inside this embedded preview. Open the site directly to use it — or upload a photo here.",
    errNoCam: "No camera was found. You can still upload a photo.",
    errSecure: "The camera only works on a secure (https) page.",
    errLoad: "The AI models couldn't be loaded. Check your connection and try again.",
    errPhoto: "That file couldn't be opened as an image.",
    pFace: "Face", faces: (n) => (n === 1 ? "1 face" : `${n} faces`), noFace: "No face found",
    facing: "Facing", straight: "Straight ahead", turnedL: "Turned to your left", turnedR: "Turned to your right",
    up: "Looking up", down: "Looking down", tiltL: "Head tilted to your left", tiltR: "Head tilted to your right", level: "Head level",
    pEyes: "Eyes", eyeL: "Left eye", eyeR: "Right eye", gaze: "Looking", gazeC: "Straight ahead", gazeL: "To your left", gazeR: "To your right",
    open: "Open", closed: "Closed", wink: "Winking 😉", state: "Eyes",
    colour: "Eye colour (estimate)", tooFar: "Come a little closer to read eye colour", lidsClosed: "Open your eyes to read the colour",
    colours: { darkbrown: "Dark brown", brown: "Brown", lightbrown: "Light brown", hazel: "Hazel", green: "Green", blue: "Blue", bluegray: "Blue-grey", gray: "Grey" },
    pExpr: "Expression", smile: "Smile", jaw: "Mouth open", brows: "Eyebrows up", frown: "Frown", pucker: "Pucker", puff: "Cheeks puffed",
    moods: { neutral: "Neutral 😐", smile: "Smiling 🙂", laugh: "Big smile 😄", surprise: "Surprised 😮", kiss: "Kiss 😗", frown: "Frowning 😠", puff: "Puffed cheeks 🐡" },
    pHands: "Hands", noHands: "No hands found", handL: "Left hand", handR: "Right hand", fingers: (n) => (n === 1 ? "1 finger up" : `${n} fingers up`),
    gestures: { Thumb_Up: "Thumbs up 👍", Thumb_Down: "Thumbs down 👎", Victory: "Victory ✌️", Open_Palm: "Open palm ✋", Closed_Fist: "Fist ✊", Pointing_Up: "Pointing up ☝️", ILoveYou: "I love you 🤟", None: "" },
    pBody: "Body", noBody: "No body found", points: (n) => `${n} of 33 points visible`,
    bothUp: "Both arms raised 🙌", leftUp: "Left arm raised", rightUp: "Right arm raised", armsDown: "Arms down",
    off: "Turned off", fps: "fps", pageTitle: "Face, hand & body detection — free online tool · Sepehr Niaz"
  },
  fa: {
    start: "شروع دوربین", stop: "توقف دوربین", photo: "انتخاب عکس", face: "صورت", hands: "دست", body: "بدن",
    emptyTitle: "دوربین را روشن کن یا یک عکس انتخاب کن", emptyText: "در نور خوب و رو به دوربین بهتر کار می‌کند.",
    loading: "در حال بارگذاری مدل‌های هوش مصنوعی…", loadingNote: "حدود ۳۰ مگابایت — فقط بار اول", loadingStep: (n, t) => `مدل ${fa(n)} از ${fa(t)}`,
    starting: "در حال روشن کردن دوربین…", analysing: "در حال بررسی عکس…",
    errCamera: "دسترسی به دوربین بسته شده است. از تنظیمات مرورگر اجازه‌ی دوربین را برای این سایت بده و دوباره امتحان کن.",
    errFramed: "داخل این پیش‌نمایش نمی‌شود از دوربین استفاده کرد. برای دوربین، سایت را مستقیم باز کن — یا همین‌جا یک عکس انتخاب کن.",
    errNoCam: "دوربینی پیدا نشد. هنوز می‌توانی یک عکس انتخاب کنی.",
    errSecure: "دوربین فقط روی صفحه‌ی امن (https) کار می‌کند.",
    errLoad: "مدل‌های هوش مصنوعی بارگذاری نشدند. اینترنت را بررسی کن و دوباره امتحان کن.",
    errPhoto: "این فایل به‌عنوان عکس باز نشد.",
    pFace: "صورت", faces: (n) => `${fa(n)} صورت`, noFace: "صورتی پیدا نشد",
    facing: "جهت سر", straight: "رو به جلو", turnedL: "چرخیده به چپِ تو", turnedR: "چرخیده به راستِ تو",
    up: "رو به بالا", down: "رو به پایین", tiltL: "سر کج به چپِ تو", tiltR: "سر کج به راستِ تو", level: "سر صاف",
    pEyes: "چشم‌ها", eyeL: "چشم چپ", eyeR: "چشم راست", gaze: "نگاه", gazeC: "رو به جلو", gazeL: "به چپِ تو", gazeR: "به راستِ تو",
    open: "باز", closed: "بسته", wink: "چشمک 😉", state: "وضعیت",
    colour: "رنگ چشم (تخمینی)", tooFar: "برای تشخیص رنگ چشم کمی نزدیک‌تر بیا", lidsClosed: "برای تشخیص رنگ، چشم‌هایت را باز کن",
    colours: { darkbrown: "قهوه‌ای تیره", brown: "قهوه‌ای", lightbrown: "قهوه‌ای روشن", hazel: "عسلی", green: "سبز", blue: "آبی", bluegray: "آبی‌طوسی", gray: "طوسی" },
    pExpr: "حالت صورت", smile: "لبخند", jaw: "دهان باز", brows: "ابرو بالا", frown: "اخم", pucker: "غنچه‌ی لب", puff: "باد کردن لپ",
    moods: { neutral: "عادی 😐", smile: "لبخند 🙂", laugh: "خنده 😄", surprise: "متعجب 😮", kiss: "بوس 😗", frown: "اخم 😠", puff: "لپ باد کرده 🐡" },
    pHands: "دست‌ها", noHands: "دستی پیدا نشد", handL: "دست چپ", handR: "دست راست", fingers: (n) => `${fa(n)} انگشت باز`,
    gestures: { Thumb_Up: "لایک 👍", Thumb_Down: "دیسلایک 👎", Victory: "پیروزی ✌️", Open_Palm: "کف دست باز ✋", Closed_Fist: "مشت ✊", Pointing_Up: "اشاره به بالا ☝️", ILoveYou: "دوستت دارم 🤟", None: "" },
    pBody: "بدن", noBody: "بدنی پیدا نشد", points: (n) => `${fa(n)} از ۳۳ نقطه دیده می‌شود`,
    bothUp: "هر دو دست بالا 🙌", leftUp: "دست چپ بالا", rightUp: "دست راست بالا", armsDown: "دست‌ها پایین",
    off: "خاموش", fps: "fps", pageTitle: "تشخیص چهره، دست و بدن — ابزار آنلاین رایگان · سپهر نیاز"
  }
};
function fa(n) { return String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]); }
const lang = () => (document.documentElement.lang === "fa" ? "fa" : "en");
const t = (k) => T[lang()][k];
const num = (n) => (lang() === "fa" ? fa(n) : String(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const $ = (id) => document.getElementById(id);
const video = $("vis-video"), img = $("vis-img"), canvas = $("vis-canvas"), ctx = canvas.getContext("2d");
const view = $("vis-view"), status = $("vis-status"), empty = $("vis-empty"), fpsEl = $("vis-fps");
const camBtn = $("vis-cam"), fileIn = $("vis-file");
const sample = document.createElement("canvas"), sctx = sample.getContext("2d", { willReadFrequently: true });

const on = { face: true, hands: true, body: true };
let mp = null, tasks = null, draw = null, loading = null;
let mode = null, stream = null, raf = 0, lastTime = -1, frame = 0, last = {}, eyeCache = null;
let fpsCount = 0, fpsStart = 0;

// ── Loading ────────────────────────────────────────────────
function syncEmpty() { empty.hidden = !!mode || !status.hidden; }
function say(text, sub) {
  status.hidden = !text;
  status.innerHTML = text ? `<span class="vis-spin" aria-hidden="true"></span><b>${esc(text)}</b>${sub ? `<small>${esc(sub)}</small>` : ""}` : "";
  syncEmpty();
}
function fail(text) {
  status.hidden = false;
  status.innerHTML = `<b class="vis-err">${esc(text)}</b>`;
  syncEmpty();
}
async function load() {
  if (tasks) return tasks;
  if (loading) return loading;
  loading = (async () => {
    say(t("loading"), t("loadingNote"));
    mp = await import(BASE + "vision_bundle.mjs");
    const files = await mp.FilesetResolver.forVisionTasks(BASE + "wasm");
    const make = async (Cls, file, extra, step) => {
      say(t("loading"), `${t("loadingStep")(step, 3)} · ${t("loadingNote")}`);
      let err;
      for (const delegate of ["GPU", "CPU"]) {
        try {
          return await Cls.createFromOptions(files, { baseOptions: { modelAssetPath: BASE + "models/" + file, delegate }, runningMode: "VIDEO", ...extra });
        } catch (e) { err = e; }
      }
      throw err;
    };
    const face = await make(mp.FaceLandmarker, "face_landmarker.task", { numFaces: 4, outputFaceBlendshapes: true, outputFacialTransformationMatrixes: false }, 1);
    const hands = await make(mp.GestureRecognizer, "gesture_recognizer.task", { numHands: 2 }, 2);
    const body = await make(mp.PoseLandmarker, "pose_landmarker_lite.task", { numPoses: 1 }, 3);
    draw = new mp.DrawingUtils(ctx);
    tasks = { face, hands, body, running: "VIDEO" };
    say("");
    return tasks;
  })();
  try { return await loading; } catch (e) { loading = null; throw e; }
}
async function setRunning(m) {
  if (tasks.running === m) return;
  await Promise.all([tasks.face, tasks.hands, tasks.body].map((x) => x.setOptions({ runningMode: m })));
  tasks.running = m;
}

// ── Camera ─────────────────────────────────────────────────
async function startCamera() {
  if (!window.isSecureContext || !navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { fail(t("errSecure")); return; }
  try {
    say(t("starting"));
    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } }, audio: false });
  } catch (e) {
    stream = null;
    const framed = (() => { try { return window.self !== window.top; } catch (er) { return true; } })();
    fail(e && (e.name === "NotFoundError" || e.name === "OverconstrainedError") ? t("errNoCam") : framed ? t("errFramed") : t("errCamera"));
    return;
  }
  try { await load(); } catch (e) { stopCamera(); fail(t("errLoad")); return; }
  await setRunning("VIDEO");
  video.srcObject = stream;
  await video.play();
  mode = "camera"; last = {}; eyeCache = null; frame = 0; lastTime = -1;
  img.hidden = true; video.hidden = false; empty.hidden = true; fpsEl.hidden = false;
  view.classList.add("mirror", "live");
  fitView(video.videoWidth, video.videoHeight);
  camBtn.classList.remove("primary"); paintControls();
  fpsStart = performance.now(); fpsCount = 0;
  loop();
}
function stopCamera() {
  cancelAnimationFrame(raf);
  if (stream) stream.getTracks().forEach((tr) => tr.stop());
  stream = null; video.srcObject = null;
  if (mode === "camera") { mode = null; ctx.clearRect(0, 0, canvas.width, canvas.height); fpsEl.hidden = true; view.classList.remove("live"); renderPanel({}); say(""); }
  camBtn.classList.add("primary"); paintControls();
}
function fitView(w, h) {
  canvas.width = w; canvas.height = h;
  view.style.aspectRatio = `${w} / ${h}`;
  sample.width = w; sample.height = h;
}
function loop() {
  if (mode !== "camera") return;
  raf = requestAnimationFrame(loop);
  if (video.readyState < 2 || video.currentTime === lastTime) return;
  lastTime = video.currentTime;
  if (canvas.width !== video.videoWidth) fitView(video.videoWidth, video.videoHeight);
  const now = performance.now();
  frame++;
  const r = {};
  r.face = on.face ? tasks.face.detectForVideo(video, now) : null;
  r.hands = on.hands ? tasks.hands.recognizeForVideo(video, now) : null;
  // the body model is the heaviest: run it on every other frame on the camera
  r.body = on.body ? (frame % 2 === 0 || !last.body ? tasks.body.detectForVideo(video, now) : last.body) : null;
  last = r;
  paint(r);
  if (on.face && r.face && r.face.faceLandmarks.length && frame % 12 === 1) eyeCache = readEyes(video, r.face);
  if (frame % 6 === 0) renderPanel(r);
  fpsCount++;
  if (now - fpsStart > 1000) { fpsEl.textContent = `${num(Math.round((fpsCount * 1000) / (now - fpsStart)))} ${t("fps")}`; fpsStart = now; fpsCount = 0; }
}

// ── Photo ──────────────────────────────────────────────────
async function analysePhoto(file) {
  if (!file) return;
  stopCamera();
  const url = URL.createObjectURL(file);
  img.src = url;
  try { await img.decode(); } catch (e) { fail(t("errPhoto")); return; }
  try { await load(); } catch (e) { fail(t("errLoad")); return; }
  say(t("analysing"));
  await setRunning("IMAGE");
  mode = "photo"; view.classList.remove("mirror", "live");
  video.hidden = true; img.hidden = false; empty.hidden = true; fpsEl.hidden = true;
  fitView(img.naturalWidth, img.naturalHeight);
  await new Promise((res) => setTimeout(res, 30));
  last = {
    face: on.face ? tasks.face.detect(img) : null,
    hands: on.hands ? tasks.hands.recognize(img) : null,
    body: on.body ? tasks.body.detect(img) : null
  };
  eyeCache = last.face && last.face.faceLandmarks.length ? readEyes(img, last.face) : null;
  paint(last);
  renderPanel(last);
  say("");
}

// ── Drawing ────────────────────────────────────────────────
function paint(r) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!draw) return;
  const s = Math.max(1, canvas.width / 640);
  const F = mp.FaceLandmarker;
  if (r.body) for (const lm of r.body.landmarks) {
    draw.drawConnectors(lm, mp.PoseLandmarker.POSE_CONNECTIONS, { color: "rgba(52, 211, 153, .85)", lineWidth: 3 * s });
    draw.drawLandmarks(lm.slice(11), { color: "#34d399", fillColor: "#0b1120", lineWidth: 1.5 * s, radius: 3 * s });
  }
  if (r.face) for (const lm of r.face.faceLandmarks) {
    draw.drawConnectors(lm, F.FACE_LANDMARKS_TESSELATION, { color: "rgba(34, 211, 238, .22)", lineWidth: 0.7 * s });
    for (const set of [F.FACE_LANDMARKS_FACE_OVAL, F.FACE_LANDMARKS_LIPS, F.FACE_LANDMARKS_LEFT_EYE, F.FACE_LANDMARKS_RIGHT_EYE, F.FACE_LANDMARKS_LEFT_EYEBROW, F.FACE_LANDMARKS_RIGHT_EYEBROW])
      draw.drawConnectors(lm, set, { color: "rgba(34, 211, 238, .9)", lineWidth: 1.4 * s });
    draw.drawConnectors(lm, F.FACE_LANDMARKS_LEFT_IRIS, { color: "#a78bfa", lineWidth: 1.6 * s });
    draw.drawConnectors(lm, F.FACE_LANDMARKS_RIGHT_IRIS, { color: "#a78bfa", lineWidth: 1.6 * s });
  }
  if (r.hands) for (const lm of r.hands.landmarks) {
    draw.drawConnectors(lm, mp.GestureRecognizer.HAND_CONNECTIONS, { color: "#8b5cf6", lineWidth: 3.2 * s });
    draw.drawLandmarks(lm, { color: "#22d3ee", fillColor: "#0b1120", lineWidth: 1.6 * s, radius: 3.4 * s });
  }
}

// ── Reading the results ────────────────────────────────────
const RIGHT_EYE = [33, 246, 161, 160, 159, 158, 157, 173, 133, 155, 154, 153, 145, 144, 163, 7]; // the person's right eye
const LEFT_EYE = [263, 466, 388, 387, 386, 385, 384, 398, 362, 382, 381, 380, 374, 373, 390, 249]; // the person's left eye
const P = (lm, i, w, h) => [lm[i].x * w, lm[i].y * h];
const dist = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
function inside(pt, poly) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if ((yi > pt[1]) !== (yj > pt[1]) && pt[0] < ((xj - xi) * (pt[1] - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
function blend(face, name) {
  const b = face && face.faceBlendshapes && face.faceBlendshapes[0];
  const c = b && b.categories.find((x) => x.categoryName === name);
  return c ? c.score : 0;
}

// Which iris (468 or 473) sits in which eye: decide by position, not by name
function irises(lm, w, h) {
  const cR = centroid(RIGHT_EYE.map((i) => P(lm, i, w, h))), a = P(lm, 468, w, h), b = P(lm, 473, w, h);
  const aIsRight = dist(a, cR) < dist(b, cR);
  return { right: aIsRight ? [468, 469, 470, 471, 472] : [473, 474, 475, 476, 477], left: aIsRight ? [473, 474, 475, 476, 477] : [468, 469, 470, 471, 472] };
}
function centroid(pts) { return [pts.reduce((s, p) => s + p[0], 0) / pts.length, pts.reduce((s, p) => s + p[1], 0) / pts.length]; }

function readEyes(source, faceRes) {
  const w = canvas.width, h = canvas.height;
  sctx.drawImage(source, 0, 0, w, h);
  const lm = faceRes.faceLandmarks[0], ir = irises(lm, w, h);
  const out = {};
  for (const side of ["right", "left"]) {
    const [ci, ...ring] = ir[side];
    const c = P(lm, ci, w, h), r = ring.reduce((s, i) => s + dist(P(lm, i, w, h), c), 0) / ring.length;
    if (r < 4) { out[side] = { far: true }; continue; }
    const lid = (side === "right" ? RIGHT_EYE : LEFT_EYE).map((i) => P(lm, i, w, h));
    const x0 = Math.max(0, Math.floor(c[0] - r)), y0 = Math.max(0, Math.floor(c[1] - r));
    const bw = Math.min(w - x0, Math.ceil(2 * r) + 1), bh = Math.min(h - y0, Math.ceil(2 * r) + 1);
    if (bw < 3 || bh < 3) { out[side] = { far: true }; continue; }
    const data = sctx.getImageData(x0, y0, bw, bh).data;
    const R = [], G = [], B = [];
    for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
      const px = [x0 + x + 0.5, y0 + y + 0.5], d = dist(px, c) / r;
      if (d < 0.35 || d > 0.92 || !inside(px, lid)) continue; // skip the pupil, the edge of the iris and the eyelids
      const k = (y * bw + x) * 4, rr = data[k], gg = data[k + 1], bb = data[k + 2];
      const v = Math.max(rr, gg, bb) / 255;
      if (v > 0.9 || v < 0.08) continue; // skip reflections and lashes
      R.push(rr); G.push(gg); B.push(bb);
    }
    if (R.length < 12) { out[side] = { closed: true }; continue; }
    const med = (a) => a.sort((m, n) => m - n)[a.length >> 1];
    const rgb = [med(R), med(G), med(B)];
    out[side] = { rgb, name: classify(rgb) };
  }
  return out;
}
function classify([r, g, b]) {
  const mx = Math.max(r, g, b) / 255, mn = Math.min(r, g, b) / 255, v = mx, s = mx ? (mx - mn) / mx : 0;
  let hue = 0;
  if (mx !== mn) {
    const d = mx - mn, R = r / 255, G = g / 255, B = b / 255;
    hue = mx === R ? ((G - B) / d) % 6 : mx === G ? (B - R) / d + 2 : (R - G) / d + 4;
    hue = (hue * 60 + 360) % 360;
  }
  if (v < 0.2) return "darkbrown";
  if (s < 0.16) return v > 0.42 ? "gray" : "darkbrown";
  if (hue >= 175 && hue < 260) return s < 0.3 ? "bluegray" : "blue";
  if (hue >= 75 && hue < 175) return "green";
  if (hue >= 45 && hue < 75) return "hazel";
  if (hue >= 18 && hue < 45) return v > 0.5 ? "lightbrown" : "brown";
  return v < 0.3 ? "darkbrown" : "brown";
}

function headPose(lm, w, h) {
  const nose = P(lm, 1, w, h), cr = P(lm, 234, w, h), cl = P(lm, 454, w, h);
  const half = Math.abs(cl[0] - cr[0]) / 2 || 1, mid = (cl[0] + cr[0]) / 2;
  const yaw = (nose[0] - mid) / half; // < 0: nose towards the image's left = the person's right
  const eyes = (P(lm, 33, w, h)[1] + P(lm, 263, w, h)[1]) / 2, mouth = (P(lm, 13, w, h)[1] + P(lm, 14, w, h)[1]) / 2;
  const pitch = (nose[1] - eyes) / ((mouth - eyes) || 1); // about 0.6 when facing the camera
  const o1 = P(lm, 33, w, h), o2 = P(lm, 263, w, h);
  const roll = (Math.atan2(o2[1] - o1[1], o2[0] - o1[0]) * 180) / Math.PI; // > 0: the person's left eye is lower
  return { yaw, pitch, roll };
}
function gaze(lm, w, h) {
  const ir = irises(lm, w, h);
  const ratio = (eye, corners) => {
    const xs = corners.map((i) => P(lm, i, w, h)[0]), c = P(lm, eye[0], w, h)[0];
    return (c - Math.min(...xs)) / ((Math.max(...xs) - Math.min(...xs)) || 1);
  };
  return (ratio(ir.right, [33, 133]) + ratio(ir.left, [362, 263])) / 2; // < 0.5: iris towards the image's left = the person's right
}
function fingers(lm, w, h) {
  const p = (i) => P(lm, i, w, h), wrist = p(0);
  let n = 0;
  for (const [tip, pip] of [[8, 6], [12, 10], [16, 14], [20, 18]]) if (dist(p(tip), wrist) > dist(p(pip), wrist) * 1.12) n++;
  if (dist(p(4), p(9)) > dist(p(3), p(9)) * 1.12 && dist(p(4), p(17)) > dist(p(5), p(17)) * 0.9) n++;
  return n;
}

const bar = (label, v) => `<div class="vis-bar"><span>${esc(label)}</span><i><b style="width:${Math.round(v * 100)}%"></b></i><em>${num(Math.round(v * 100))}%</em></div>`;
const row = (k, v) => `<div class="vis-row"><span>${esc(k)}</span><b>${v}</b></div>`;
const head = (title, extra) => `<h3>${esc(title)}${extra ? `<small>${extra}</small>` : ""}</h3>`;
const offCard = (title) => head(title) + `<p class="muted">${esc(t("off"))}</p>`;

function renderPanel(r) {
  const w = canvas.width, h = canvas.height, has = !!mode;
  const fc = r.face && r.face.faceLandmarks.length ? r.face : null;
  // Face
  $("vis-c-face").innerHTML = !on.face ? offCard(t("pFace")) : head(t("pFace"), fc ? esc(t("faces")(fc.faceLandmarks.length)) : "") + (!has ? dash() : !fc ? `<p class="muted">${esc(t("noFace"))}</p>` : (() => {
    const hp = headPose(fc.faceLandmarks[0], w, h);
    const dir = hp.yaw < -0.28 ? t("turnedR") : hp.yaw > 0.28 ? t("turnedL") : hp.pitch < 0.42 ? t("up") : hp.pitch > 0.8 ? t("down") : t("straight");
    const tilt = hp.roll > 10 ? t("tiltL") : hp.roll < -10 ? t("tiltR") : t("level");
    return row(t("facing"), esc(dir)) + row("↻", esc(tilt));
  })());
  // Eyes
  $("vis-c-eyes").innerHTML = !on.face ? offCard(t("pEyes")) : head(t("pEyes")) + (!has ? dash() : !fc ? `<p class="muted">${esc(t("noFace"))}</p>` : (() => {
    const lm = fc.faceLandmarks[0], g = gaze(lm, w, h);
    const bl = blend(fc, "eyeBlinkLeft"), br = blend(fc, "eyeBlinkRight");
    const st = bl > 0.5 && br > 0.5 ? t("closed") : (bl > 0.5) !== (br > 0.5) ? t("wink") : t("open");
    const look = g < 0.4 ? t("gazeR") : g > 0.6 ? t("gazeL") : t("gazeC");
    const sw = (side, label) => {
      const e = eyeCache && eyeCache[side];
      if (!e) return "";
      if (e.far) return `<div class="vis-eye"><span>${esc(label)}</span><em class="muted">${esc(t("tooFar"))}</em></div>`;
      if (e.closed) return `<div class="vis-eye"><span>${esc(label)}</span><em class="muted">${esc(t("lidsClosed"))}</em></div>`;
      return `<div class="vis-eye"><span>${esc(label)}</span><i style="background:rgb(${e.rgb.join(",")})"></i><b>${esc(t("colours")[e.name])}</b></div>`;
    };
    return row(t("state"), esc(st)) + row(t("gaze"), esc(look)) + `<p class="vis-sub">${esc(t("colour"))}</p>` + sw("right", t("eyeR")) + sw("left", t("eyeL"));
  })());
  // Expression
  $("vis-c-expr").innerHTML = !on.face ? offCard(t("pExpr")) : (() => {
    if (!has || !fc) return head(t("pExpr")) + (has ? `<p class="muted">${esc(t("noFace"))}</p>` : dash());
    const v = {
      smile: (blend(fc, "mouthSmileLeft") + blend(fc, "mouthSmileRight")) / 2, jaw: blend(fc, "jawOpen"),
      brows: (blend(fc, "browInnerUp") + blend(fc, "browOuterUpLeft") + blend(fc, "browOuterUpRight")) / 3,
      frown: (blend(fc, "browDownLeft") + blend(fc, "browDownRight")) / 2, pucker: blend(fc, "mouthPucker"), puff: blend(fc, "cheekPuff")
    };
    const m = t("moods");
    const mood = v.puff > 0.45 ? m.puff : v.pucker > 0.6 ? m.kiss : v.jaw > 0.35 && v.brows > 0.35 ? m.surprise : v.smile > 0.6 && v.jaw > 0.2 ? m.laugh : v.smile > 0.4 ? m.smile : v.frown > 0.45 ? m.frown : m.neutral;
    return head(t("pExpr"), esc(mood)) + ["smile", "jaw", "brows", "frown", "pucker", "puff"].map((k) => bar(t(k), Math.min(1, v[k]))).join("");
  })();
  // Hands
  const hr = r.hands && r.hands.landmarks.length ? r.hands : null;
  $("vis-c-hands").innerHTML = !on.hands ? offCard(t("pHands")) : head(t("pHands"), hr ? num(hr.landmarks.length) : "") + (!has ? dash() : !hr ? `<p class="muted">${esc(t("noHands"))}</p>` : hr.landmarks.map((lm, i) => {
    // checked on test photos: for normal (not mirrored) frames the model's label is the person's own hand
    const side = hr.handedness[i] && hr.handedness[i][0] && hr.handedness[i][0].categoryName === "Left" ? t("handL") : t("handR");
    const g = hr.gestures[i] && hr.gestures[i][0], gName = g && g.score > 0.5 ? t("gestures")[g.categoryName] || "" : "";
    return `<div class="vis-hand"><b>${esc(side)}</b><span>${esc(t("fingers")(fingers(lm, w, h)))}</span>${gName ? `<em>${esc(gName)}</em>` : ""}</div>`;
  }).join(""));
  // Body
  const br = r.body && r.body.landmarks.length ? r.body.landmarks[0] : null;
  $("vis-c-body").innerHTML = !on.body ? offCard(t("pBody")) : head(t("pBody")) + (!has ? dash() : !br ? `<p class="muted">${esc(t("noBody"))}</p>` : (() => {
    const vis = (i) => (br[i].visibility == null ? 1 : br[i].visibility) > 0.5;
    const seen = br.filter((p) => (p.visibility == null ? 1 : p.visibility) > 0.5).length;
    const up = (wr, sh) => vis(wr) && vis(sh) && br[wr].y < br[sh].y; // MediaPipe pose uses the person's own left/right
    const L = up(15, 11), R = up(16, 12);
    const arms = L && R ? t("bothUp") : L ? t("leftUp") : R ? t("rightUp") : t("armsDown");
    return row("✦", esc(t("points")(seen))) + row("⇡", esc(arms));
  })());
}
const dash = () => `<p class="muted">—</p>`;

// ── Controls ───────────────────────────────────────────────
function paintControls() {
  document.querySelectorAll("[data-v]").forEach((el) => {
    const k = el.dataset.v === "start" && mode === "camera" ? "stop" : el.dataset.v;
    el.textContent = t(k);
  });
}
camBtn.addEventListener("click", () => (mode === "camera" ? stopCamera() : startCamera()));
fileIn.addEventListener("change", () => { analysePhoto(fileIn.files[0]); fileIn.value = ""; });
document.querySelectorAll(".vis-chip").forEach((b) => b.addEventListener("click", () => {
  const k = b.dataset.t; on[k] = !on[k];
  b.classList.toggle("on", on[k]); b.setAttribute("aria-pressed", on[k]);
  if (mode === "photo" && tasks && img.complete) {
    if (on[k] && !last[k]) last[k] = k === "face" ? tasks.face.detect(img) : k === "hands" ? tasks.hands.recognize(img) : tasks.body.detect(img);
    if (!on[k]) last[k] = null;
    paint(last);
  }
  renderPanel(last);
}));
document.addEventListener("cv:langchange", () => { paintControls(); renderPanel(last); document.title = t("pageTitle"); });
document.addEventListener("visibilitychange", () => { if (document.hidden && mode === "camera") stopCamera(); });

paintControls();
renderPanel({});
document.title = t("pageTitle");
// For automated checks: analyse an image already on the page
window.__visionAnalyse = async (src) => { const blob = await (await fetch(src)).blob(); await analysePhoto(blob); return { face: last.face && last.face.faceLandmarks.length, hands: last.hands && last.hands.landmarks.length, body: last.body && last.body.landmarks.length, panel: document.getElementById("vis-panel").innerText }; };
