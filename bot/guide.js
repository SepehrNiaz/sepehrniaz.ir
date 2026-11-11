// ─────────────────────────────────────────────────────────────
//  The site's learning guide. It greets visitors, gives a tour of
//  the site, explains the page they are on, and teaches (through
//  bot/teacher.js): terms, commands, step-by-step lessons, quizzes.
//  Requests for Sepehr are handed to his own assistant on the
//  résumé page. Runs locally, in Persian or English.
// ─────────────────────────────────────────────────────────────
(function (root) {
  "use strict";
  const SB = (root.SepehrBot = root.SepehrBot || {});
  const CMD = "\u0001";
  const cmd = (s) => CMD + s;

  // [id, link, Persian, English]
  const TOUR = [
    ["tracks", "#tracks", "🧭 «مسیرهای یادگیری»: چهار مسیر داریم — لینوکس، برنامه‌نویسی، شبکه و امنیت. اگر تازه‌کاری، از لینوکس شروع کن؛ بقیه روی آن ساخته می‌شوند.", "🧭 “Learning tracks”: there are four — Linux, Programming, Networking and Security. If you're new, start with Linux; the others build on it."],
    ["articles", "#articles", "📚 «درس‌های گام‌به‌گام»: مقاله‌های کوتاه و عملی با خروجی واقعی دستورها. هر کدام را می‌توانی همین‌جا در گفتگو هم با من قدم‌به‌قدم بخوانی.", "📚 “Step-by-step lessons”: short, practical articles with real command output. I can also walk you through any of them right here in the chat."],
    ["practice", "practice/", "⌨️ «آزمایشگاه تمرین»: یک ترمینال لینوکس، خط فرمان ویندوز، پایتون، جاوااسکریپت، HTML و SQL — همه داخل مرورگر. آنجا یک مربی تمرین می‌دهد و اشتباه‌ها را توضیح می‌دهد.", "⌨️ “Practice lab”: a Linux terminal, Windows command line, Python, JavaScript, HTML and SQL — all in your browser. A coach there gives you exercises and explains mistakes."],
    ["lab", "#lab", "🤖 «ابزارهای هوش مصنوعی»: تشخیص چهره و دست، تشخیص اشیا با صدا، تشخیص زبان از روی صدا و بازی سنگ‌کاغذقیچی با دوربین. همه روی دستگاه خودت اجرا می‌شوند.", "🤖 “AI tools”: face and hand detection, object detection with voice, spoken-language detection and a rock-paper-scissors camera game. They all run on your own device."],
    ["library", "#library", "📖 «کتابخانه»: کتاب رایگان «هک و امنیت شبکه» را می‌توانی همین‌جا مثل یک کتاب واقعی ورق بزنی.", "📖 “Library”: the free book “Hacking & Network Security” — you can flip through it here like a real book."],
    ["portfolio", "#portfolio", "🛠️ «ابزارها»: شش ابزار متن‌باز پایتون برای شبکه و پشتیبانی IT، با توضیح اینکه هر کدام چه مشکلی را حل می‌کند و از آن چه یاد می‌گیری.", "🛠️ “Tools”: six open-source Python tools for networking and IT support, each with the problem it solves and what you can learn from it."],
    ["resume", "resume.html", "👤 «رزومه»: سپهر نیاز، تکنسین IT در شیراز، این سایت را ساخته است. اگر برایش کار یا پروژه‌ای داری، دستیارش در صفحه‌ی رزومه درخواستت را می‌گیرد.", "👤 “Résumé”: Sepehr Niaz, an IT technician in Shiraz, built this site. If you have a job or project for him, his assistant on the résumé page takes your request."]
  ];
  const PAGES = {
    vision: ["این ابزار با دوربین یا یک عکس، صورت، چشم‌ها، حالت چهره، دست‌ها و بدن را تشخیص می‌دهد. «شروع دوربین» را بزن، رو به دوربین بنشین و مثلاً لبخند بزن یا ✌️ نشان بده. هیچ تصویری جایی فرستاده نمی‌شود.", "This tool finds your face, eyes, expression, hands and body from the camera or a photo. Press “Start camera”, face it, then smile or show ✌️. No image is sent anywhere."],
    objects: ["این ابزار ۸۰ وسیله‌ی روزمره را با دوربین پیدا می‌کند. دوربین را رو به یک لیوان، گوشی یا کتاب بگیر. با «خواندن با صدا» اسمشان را بلند می‌گوید.", "This tool finds 80 everyday objects with the camera. Point it at a cup, a phone or a book. “Read aloud” makes it say their names."],
    voice: ["این ابزار از روی صدا تشخیص می‌دهد به چه زبانی حرف می‌زنی (۹۹ زبان). «شروع ضبط» را بزن و ۵ تا ۱۵ ثانیه صحبت کن. بار اول دانلود مدل کمی طول می‌کشد.", "This tool works out which of 99 languages you are speaking. Press “Start recording” and talk for 5–15 seconds. The first load of the model takes a while."],
    game: ["اینجا با دست واقعی‌ات با کامپیوتر سنگ‌کاغذقیچی بازی می‌کنی. دوربین را روشن کن، «شروع دست» را بزن و وقتی «حالا!» آمد ✊ یا ✋ یا ✌️ نشان بده.", "Here you play rock-paper-scissors with your real hand. Start the camera, press “Play a round”, and show ✊, ✋ or ✌️ on “Shoot!”."],
    practice: ["اینجا آزمایشگاه تمرین است. از بالا یک محیط انتخاب کن (لینوکس، ویندوز، پایتون، جاوااسکریپت، HTML یا SQL). مربیِ کنار صفحه تمرین می‌دهد، هر دستور را توضیح می‌دهد و اگر گیر کردی راهنمایی می‌کند.", "This is the practice lab. Pick an environment at the top (Linux, Windows, Python, JavaScript, HTML or SQL). The coach beside it gives exercises, explains each command and gives hints when you're stuck."]
  };
  const P = {
    hello: { fa: "سلام! 👋 من راهنمای هوشمند این سایتم. اینجا می‌توانی شبکه، امنیت، لینوکس و برنامه‌نویسی را رایگان یاد بگیری و تمرین کنی.\nاز کجا شروع کنیم؟", en: "Hi! 👋 I'm this site's AI guide. Here you can learn and practise networking, security, Linux and programming for free.\nWhere shall we start?" },
    back: { fa: "می‌توانم سایت را نشانت بدهم، درس بدهم، آزمون بگیرم یا هر مفهومی را توضیح بدهم. چه کار کنیم؟", en: "I can show you around, teach a lesson, quiz you or explain any term. What would you like?" },
    cTour: { fa: "🧭 سایت را نشانم بده", en: "🧭 Show me around" }, cLearn: { fa: "🎓 می‌خواهم یاد بگیرم", en: "🎓 I want to learn" },
    cPractice: { fa: "⌨️ می‌خواهم تمرین کنم", en: "⌨️ I want to practise" }, cSepehr: { fa: "💼 با سپهر کار دارم", en: "💼 I have work for Sepehr" },
    go: { fa: "↗ برو به این بخش", en: "↗ Take me there" }, next: { fa: "▶ بعدی", en: "▶ Next" }, endTour: { fa: "پایان گشت", en: "End the tour" },
    tourOf: { fa: (i, n) => `(${i} از ${n})`, en: (i, n) => `(${i} of ${n})` },
    tourDone: { fa: "✅ این هم از کل سایت! حالا می‌خواهی یاد بگیری، تمرین کنی یا سؤالی داری؟", en: "✅ That's the whole site! Now, would you like to learn, practise, or ask something?" },
    sepehr: { fa: "برای پیشنهاد کار، پروژه یا پشتیبانی فنی، دستیارِ سپهر در صفحه‌ی رزومه درخواستت را می‌گیرد و برایش می‌فرستد.", en: "For a job offer, a project or tech support, Sepehr's assistant on the résumé page takes your request and sends it to him." },
    toResume: { fa: "💼 رفتن به دستیار سپهر", en: "💼 Go to Sepehr's assistant" },
    onArticle: { fa: (t) => `داری درس «${t}» را می‌خوانی. 📘 می‌خواهی همین درس را با هم قدم‌به‌قدم مرور کنیم، یا بعد از خواندن از تو آزمون بگیرم؟`, en: (t) => `You're reading “${t}”. 📘 Shall we go through it step by step together, or shall I quiz you after you've read it?` },
    stepThis: { fa: "📘 قدم‌به‌قدم مرور کنیم", en: "📘 Go through it step by step" }, quizThis: { fa: "📝 از این مبحث آزمون بگیر", en: "📝 Quiz me on this topic" },
    openPractice: { fa: "⌨️ بازکردن آزمایشگاه تمرین", en: "⌨️ Open the practice lab" },
    practiceTip: { fa: "بهترین راه یادگیری، تمرین است. در آزمایشگاه تمرین می‌توانی دستورها و کدها را واقعاً اجرا کنی و مربی قدم‌به‌قدم راهنمایی‌ات می‌کند.", en: "The best way to learn is to practise. In the practice lab you can really run commands and code, and a coach guides you step by step." }
  };
  const ROUTES = [
    [/(کتاب|book|pdf)/, "library"], [/(تمرین|ترمینال مجازی|practice|playground|کد بزنم|اجرا کنم|run code|try code)/, "practice"],
    [/(تشخیص چهره|چهره|دوربین|face|camera|اشیا|object|تشخیص زبان|بازی|game|هوش مصنوعی|ai tool)/, "lab"],
    [/(ابزار|tool|پورت اسکنر|subnet calculator)/, "portfolio"], [/(مقاله|article|درس ها|درس‌ها|lessons list)/, "articles"],
    [/(مسیر|track|از کجا شروع|where.*start|roadmap|نقشه راه)/, "tracks"], [/(رزومه|resume|cv|سپهر کی|who is sepehr|درباره سپهر|about sepehr|سازنده)/, "resume"]
  ];
  const REQUEST = /(استخدام|پیشنهاد کار|همکاری|سفارش|قیمت|هزینه|مشاوره|پشتیبانی می ?خوا|پروژه دارم|کار دارم|تماس با سپهر|hire|job offer|quote|price|contact sepehr|work for sepehr|freelance)/;
  const TOUR_RE = /(نشونم بده|نشانم بده|راهنمایی کن|معرفی کن|سایت چی|چی داره|چه چیزهایی|tour|show me around|what can (i|you)|what is this site|what's here|help me)/;

  function createGuide(opts) {
    const learn = opts.learn || { tracks: [], articles: [] };
    const page = opts.page || { kind: "hub", id: "" };
    const nlu = SB.nlu;
    let state = fresh(opts.lang || "fa");
    function fresh(lang) { return { v: 1, lang, tour: -1, teach: { active: true, mode: null }, history: [] }; }
    const L = () => state.lang;
    const say = (k) => P[k][L()];
    const home = page.kind === "hub" ? "" : "index.html";
    const link = (href) => (href.charAt(0) === "#" ? home + href : href);
    const teacher = SB.createTeacher({ learn, lang: L, cmd, state: () => state.teach, base: "" });
    const mainChips = () => [{ label: say("cTour"), value: cmd("g:tour") }, { label: say("cLearn"), value: cmd("teach") }, { label: say("cPractice"), href: "practice/" }, { label: say("cSepehr"), value: cmd("g:sepehr"), ghost: true }];
    const faDigits = (n) => (L() === "fa" ? String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]) : String(n));

    function welcome() {
      if (page.kind === "article") {
        const a = (learn.articles || []).find((x) => x.id === page.id);
        if (a) return [{ text: say("onArticle")(a.title[L()] || a.title.en), chips: [{ label: say("stepThis"), value: cmd("t:lesson:" + a.id) }, { label: say("quizThis"), value: cmd("t:quiz:" + a.track) }, { label: say("cPractice"), href: "practice/" }, { label: say("cTour"), value: cmd("g:tour"), ghost: true }] }];
      }
      if (PAGES[page.id]) return [{ text: "👋 " + PAGES[page.id][L() === "fa" ? 0 : 1], chips: [{ label: say("cLearn"), value: cmd("teach") }, { label: say("cTour"), value: cmd("g:tour") }].concat(page.id === "practice" ? [] : [{ label: say("cPractice"), href: "practice/" }]) }];
      return [{ text: say("hello"), chips: mainChips() }];
    }
    function tourStep(i) {
      if (i >= TOUR.length) { state.tour = -1; return [{ text: say("tourDone"), chips: mainChips().slice(1) }]; }
      state.tour = i;
      const s = TOUR[i];
      return [{ text: `${s[L() === "fa" ? 2 : 3]}\n${say("tourOf")(faDigits(i + 1), faDigits(TOUR.length))}`, chips: [{ label: say("next"), value: cmd("g:next") }, { label: say("go"), href: link(s[1]) }, { label: say("endTour"), value: cmd("g:end"), ghost: true }] }];
    }
    function section(id) {
      const s = TOUR.find((x) => x[0] === id);
      return [{ text: s[L() === "fa" ? 2 : 3], chips: [{ label: say("go"), href: link(s[1]) }, { label: say("cLearn"), value: cmd("teach") }, { label: say("cTour"), value: cmd("g:tour"), ghost: true }] }];
    }
    const toSepehr = () => [{ text: say("sepehr"), chips: [{ label: say("toResume"), href: "resume.html#contact" }, { label: say("cLearn"), value: cmd("teach"), ghost: true }] }];

    function record(b) { for (const x of b) if (x.text) state.history.push({ role: "bot", text: x.text.replace(/\n+/g, " ") }); if (state.history.length > 80) state.history = state.history.slice(-80); }
    const result = (bubbles) => { record(bubbles); return { bubbles, lead: null, done: false, progress: 0, phase: "guide", lang: state.lang, category: null }; };

    function command(c) {
      if (c === "g:tour") return tourStep(0);
      if (c === "g:next") return tourStep(state.tour + 1);
      if (c === "g:end") { state.tour = -1; return [{ text: say("back"), chips: mainChips() }]; }
      if (c === "g:sepehr" || c === "t:exit") return toSepehr();
      if (c === "g:practice") return [{ text: say("practiceTip"), chips: [{ label: say("openPractice"), href: "practice/" }] }];
      if (c === "restart") { state = fresh(state.lang); return welcome(); }
      return teacher.command(c);
    }
    function handle(input, label) {
      const isCmd = typeof input === "string" && input.startsWith(CMD);
      const text = isCmd ? (label || "") : String(input || "").trim().slice(0, 1500);
      if (!isCmd && !text) return result([]);
      state.history.push({ role: "user", text: label || text });
      if (isCmd) return result(command(input.slice(1)));
      const lang = nlu && nlu.detectLanguage ? nlu.detectLanguage(text) : null;
      if (lang) state.lang = lang;
      const t = text.toLowerCase().replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/‌/g, " ");
      if (state.teach.mode === "quiz") return result(teacher.handle(text));
      if (state.tour >= 0 && /^(بعدی|بعد|ادامه|next|continue|ok|باشه|آره|بله|yes)$/.test(t.trim())) return result(tourStep(state.tour + 1));
      if (REQUEST.test(t)) return result(toSepehr());
      if (teacher.wants(text)) return result(teacher.handle(text));
      if (TOUR_RE.test(t)) return result(tourStep(0));
      for (const [re, id] of ROUTES) if (re.test(t)) return result(section(id));
      if (/^(سلام|درود|hi|hello|hey|salam)\b/.test(t.trim()) && t.split(" ").length <= 3) return result([{ text: say("hello"), chips: mainChips() }]);
      if (/(مرسی|ممنون|تشکر|thanks|thank you)/.test(t)) return result([{ text: L() === "fa" ? "خواهش می‌کنم! 🌟 هر وقت سؤالی داشتی همین‌جا هستم." : "You're welcome! 🌟 I'm right here whenever you have a question.", chips: mainChips() }]);
      return result(teacher.handle(text));
    }
    return {
      start: () => result(welcome()),
      handle, afterSend: () => [],
      save: () => JSON.parse(JSON.stringify(state)),
      load: (saved) => { if (saved && saved.v === 1) state = Object.assign(fresh(saved.lang || "fa"), saved); },
      setLang: (lang) => { state.lang = lang; },
      get state() { return state; },
      progress: () => 0, CMD
    };
  }
  SB.createGuide = createGuide;
  SB.guideData = { TOUR, PAGES };
})(typeof window !== "undefined" ? window : globalThis);
