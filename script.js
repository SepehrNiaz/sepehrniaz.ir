(function () {
  const cv = window.CV;
  const c = cv.contact;
  const root = document.documentElement;
  const $ = (id) => document.getElementById(id);
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Icons (Lucide, MIT) ───────────────────────────────────
  const ICONS = {
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
    sms: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    whatsapp: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>',
    github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/>',
    pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    network: '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    terminal: '<polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/>',
    monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    camera: '<path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    chart: '<path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>',
    file: '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="8" x2="16" y1="13" y2="13"/><line x1="8" x2="13" y1="17" y2="17"/>',
    code: '<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>',
    languages: '<path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    graduation: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    check: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    send: '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    arrow: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2m-7.07-2.93 1.41-1.41M17.66 6.34l1.41-1.41M2 12h2m16 0h2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    hand: '<path d="M18 11V6a2 2 0 0 0-4 0"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-6-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>',
    arrows: '<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>',
    list: '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
    minus: '<path d="M5 12h14"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    back: '<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>',
    zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8v6M8 11h6"/>',
    chevron: '<path d="m15 18-6-6 6-6"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    alert: '<circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/>'
  };
  // Icons with a direction (arrows, send) are mirrored in right-to-left mode
  const FLIP = { arrow: 1, send: 1 };
  const icon = (name) => `<svg class="icon${FLIP[name] ? " flip" : ""}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.award}</svg>`;
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
  const ext = (href) => (/^https?:/.test(href) ? ' target="_blank" rel="noopener"' : "");
  const show = (id, on) => { const s = $(id); if (s) s.style.display = on ? "" : "none"; };

  // ── Interface text ────────────────────────────────────────
  const UI = {
    en: {
      navAbout: "About", navExperience: "Experience", navCerts: "Certificates", navSkills: "Skills", navPortfolio: "Projects", navContact: "Contact",
      hi: "Hi, I'm", leaveNote: "Leave a note", viewCerts: "View certificates", downloadCv: "Download CV", scrollDown: "Scroll down",
      aboutEyebrow: "01 · About", aboutTitle: "Who I am",
      expEyebrow: "02 · Experience", expTitle: "Where I work",
      eduEyebrow: "03 · Education & languages", eduTitle: "What I'm learning",
      certEyebrow: "04 · Certificates", certTitle: "Training & certificates",
      skillEyebrow: "05 · Skills", skillTitle: "What I'm good at",
      portEyebrow: "06 · Projects", portTitle: "Projects & tools", portWriting: "Writing & reports", portDetails: "Details", portClose: "Close",
      portIntro: "Working tools I wrote for real problems in network, security and IT support. Each one comes with its source code, documentation and automated tests.",
      portAll: "All", portNetwork: "Networking", portSecurity: "Security", portSupport: "IT support",
      portProblem: "The problem", portSolution: "What I built", portFeatures: "Features", portTech: "Built with",
      portCode: "View code", portPreview: "Open full size",
      projEyebrow: "07 · More work", projTitle: "Writing & reports",
      libEyebrow: "07 · Library", libTitle: "Articles & books", libIntro: "My writing, free to read online.", navLibrary: "Books", libRead: "Start reading", libContinue: "Continue from page", libDownload: "Download PDF", libPages: "pages", libFree: "Free", libContents: "Contents", libBack: "Back to the site", libPage: "Page", libOf: "of", libLoading: "Loading the book…", libFailed: "The book couldn't load. Please check your connection and try again.", libRetry: "Try again", navAsk: "How would you like to turn the pages?", navAskNote: "You can change this any time from the top bar.", navSwipe: "With your finger", navSwipeHint: "Swipe the page, or tap its edge", navButtons: "With buttons", navButtonsHint: "Use the arrow buttons under the book", navMode: "Page turning", libOpenPdf: "Open PDF", libZoomIn: "Zoom in", libZoomOut: "Zoom out", libBy: "By", libBook: "Book", libArticle: "Article", libToc: "Contents", libClose: "Close",
      contactEyebrow: "08 · Contact", contactTitle: "Let's work together",
      contactText: "Have a job, a project or a question? Leave a note and it goes straight to my inbox, or reach me directly.",
      fName: "Your name", fEmail: "Your email", fPhone: "Phone (optional)", fMessage: "Your message",
      send: "Send message", sending: "Sending…",
      invalid: "Please fill in your name, a valid email and a message.",
      sent: "Thanks! Your message has been sent.",
      failed: "Something went wrong. Please email me directly instead.",
      subject: (n) => `New note from ${n} via your CV site`,
      email: "Email", call: "Call", whatsapp: "WhatsApp", chat: "Send a chat", sms: "Text message", sendSms: "Send an SMS",
      linkedin: "LinkedIn", profile: "View profile", github: "GitHub", website: "Website",
      currently: "Currently", studying: "Studying", basedIn: "Based in", certificates: "Certificates", completed: (n) => `${n} completed`,
      skillsCount: (n) => `${n} skills`, viewCert: "View certificate", breakdown: "Breakdown", issuedBy: "Issued by", openPdf: "Open PDF", close: "Close", prev: "Previous", next: "Next",
      ping: "Reply: ready to help. Scroll down to contact ↓",
      backTop: "Back to top ↑", toggleTheme: "Toggle dark mode", switchLang: "فارسی", langShort: "فا"
    },
    fa: {
      navAbout: "درباره من", navExperience: "سوابق کاری", navCerts: "گواهینامه‌ها", navSkills: "مهارت‌ها", navPortfolio: "پروژه‌ها", navContact: "تماس",
      hi: "سلام، من", leaveNote: "پیام بگذارید", viewCerts: "مشاهده‌ی گواهینامه‌ها", downloadCv: "دانلود رزومه", scrollDown: "پایین بروید",
      aboutEyebrow: "۰۱ · درباره من", aboutTitle: "معرفی من",
      expEyebrow: "۰۲ · تجربه", expTitle: "سوابق کاری",
      eduEyebrow: "۰۳ · تحصیلات و زبان‌ها", eduTitle: "آموزش و یادگیری",
      certEyebrow: "۰۴ · گواهینامه‌ها", certTitle: "دوره‌ها و گواهینامه‌ها",
      skillEyebrow: "۰۵ · مهارت‌ها", skillTitle: "در چه کارهایی مهارت دارم",
      portEyebrow: "۰۶ · پروژه‌ها", portTitle: "پروژه‌ها و ابزارها", portWriting: "نوشته‌ها و گزارش‌ها", portDetails: "جزئیات", portClose: "بستن",
      portIntro: "ابزارهای کاربردی که برای مشکلات واقعی شبکه، امنیت و پشتیبانی IT نوشته‌ام. هرکدام کد منبع، مستندات و تست خودکار دارد.",
      portAll: "همه", portNetwork: "شبکه", portSecurity: "امنیت", portSupport: "پشتیبانی IT",
      portProblem: "مشکل", portSolution: "راه‌حل من", portFeatures: "امکانات", portTech: "ابزار و فناوری",
      portCode: "مشاهده‌ی کد", portPreview: "نمایش در اندازه‌ی کامل",
      projEyebrow: "۰۷ · کارهای دیگر", projTitle: "نوشته‌ها و گزارش‌ها",
      libEyebrow: "۰۷ · کتابخانه", libTitle: "مقالات و کتاب‌ها", libIntro: "نوشته‌های من؛ برای مطالعه‌ی آنلاین و رایگان.", navLibrary: "کتاب‌ها", libRead: "شروع مطالعه", libContinue: "ادامه از صفحه‌ی", libDownload: "دانلود PDF", libPages: "صفحه", libFree: "رایگان", libContents: "فهرست مطالب", libBack: "بازگشت به سایت", libPage: "صفحه", libOf: "از", libLoading: "در حال بارگذاری کتاب…", libFailed: "کتاب بارگذاری نشد. لطفاً اتصال اینترنت را بررسی کنید و دوباره امتحان کنید.", libRetry: "تلاش دوباره", navAsk: "دوست دارید صفحه‌ها را چطور ورق بزنید؟", navAskNote: "هر وقت خواستید می‌توانید از نوار بالا عوضش کنید.", navSwipe: "با انگشت", navSwipeHint: "صفحه را بکشید یا روی لبه‌اش بزنید", navButtons: "با دکمه‌ها", navButtonsHint: "با دکمه‌های فلش زیر کتاب", navMode: "روش ورق زدن", libOpenPdf: "باز کردن PDF", libZoomIn: "بزرگ‌نمایی", libZoomOut: "کوچک‌نمایی", libBy: "نوشته‌ی", libBook: "کتاب", libArticle: "مقاله", libToc: "فهرست", libClose: "بستن",
      contactEyebrow: "۰۸ · تماس", contactTitle: "بیایید با هم کار کنیم",
      contactText: "پیشنهاد کار، پروژه یا سؤالی دارید؟ پیام بگذارید تا مستقیم به ایمیلم برسد، یا مستقیم با من تماس بگیرید.",
      fName: "نام شما", fEmail: "ایمیل شما", fPhone: "تلفن (اختیاری)", fMessage: "پیام شما",
      send: "ارسال پیام", sending: "در حال ارسال…",
      invalid: "لطفاً نام، یک ایمیل معتبر و پیامتان را وارد کنید.",
      sent: "ممنون! پیام شما ارسال شد.",
      failed: "مشکلی پیش آمد. لطفاً مستقیم به من ایمیل بزنید.",
      subject: (n) => `پیام جدید از ${n} از طریق سایت رزومه`,
      email: "ایمیل", call: "تماس تلفنی", whatsapp: "واتساپ", chat: "ارسال پیام", sms: "پیامک", sendSms: "ارسال پیامک",
      linkedin: "لینکدین", profile: "مشاهده‌ی پروفایل", github: "گیت‌هاب", website: "وب‌سایت",
      currently: "شغل فعلی", studying: "تحصیل", basedIn: "محل زندگی", certificates: "گواهینامه‌ها", completed: (n) => `${n} دوره`,
      skillsCount: (n) => `${n} مهارت`, viewCert: "مشاهده‌ی گواهینامه", breakdown: "جزئیات", issuedBy: "صادرکننده:", openPdf: "باز کردن PDF", close: "بستن", prev: "قبلی", next: "بعدی",
      ping: "پاسخ: آماده‌ی کمک. برای تماس پایین بروید ↓",
      backTop: "بازگشت به بالا ↑", toggleTheme: "تغییر حالت تاریک", switchLang: "English", langShort: "EN"
    }
  };

  let lang = root.lang === "fa" ? "fa" : "en";
  const ui = (k) => UI[lang][k];
  // Pick the right language from a { en, fa } value; plain values are shared
  const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) && ("en" in v || "fa" in v) ? (v[lang] != null ? v[lang] : v.en) : v);
  const num = (n) => (lang === "fa" ? Number(n).toLocaleString("fa-IR") : String(n));
  const nameEn = typeof cv.name === "string" ? cv.name : cv.name.en;
  const initials = nameEn.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  // ── Render everything that depends on the language ────────
  function render() {
    const name = tr(cv.name), title = tr(cv.title), location = tr(cv.location);
    document.title = `${name} · ${title} · ${location.split(/[,،]/)[0]}`;
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = ui(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-label]").forEach((el) => el.setAttribute("aria-label", ui(el.dataset.i18nLabel)));

    $("logo").innerHTML = `<b>${esc(initials)}</b><span>${esc(name)}</span>`;
    $("name").textContent = name;
    $("footer-name").textContent = name;
    $("year").textContent = num(new Date().getFullYear()).replace(/٬/g, "");
    $("lead").innerHTML = `${icon("pin")}<span>${esc(location)}</span>`;
    const available = tr(cv.available);
    $("status-text").textContent = available || "";
    show("status", !!available);

    $("avatar").innerHTML = cv.photo ? `<img src="${esc(cv.photo)}" alt="${esc(name)}">` : esc(initials);
    $("badges").innerHTML = (tr(cv.badges) || []).slice(0, 4)
      .map((b, i) => `<span class="badge">${icon(["network", "shield", "terminal", "award"][i])}<bdi>${esc(b)}</bdi></span>`).join("");

    // Contact methods
    const phone = (c.phone || "").replace(/[^\d+]/g, "");
    const methods = [];
    if (c.email) methods.push({ icon: "mail", label: ui("email"), value: c.email, ltr: true, href: `mailto:${c.email}` });
    if (phone) {
      methods.push({ icon: "phone", label: ui("call"), value: c.phone, ltr: true, href: `tel:${phone}` });
      if (c.whatsapp) methods.push({ icon: "whatsapp", label: ui("whatsapp"), value: ui("chat"), href: `https://wa.me/${phone.replace("+", "")}` });
      methods.push({ icon: "sms", label: ui("sms"), value: ui("sendSms"), href: `sms:${phone}` });
    }
    if (c.linkedin) methods.push({ icon: "linkedin", label: ui("linkedin"), value: ui("profile"), href: c.linkedin });
    if (c.github) methods.push({ icon: "github", label: ui("github"), value: c.github.replace(/^https?:\/\/(www\.)?/, ""), ltr: true, href: c.github });
    if (c.website) methods.push({ icon: "globe", label: ui("website"), value: c.website.replace(/^https?:\/\//, ""), ltr: true, href: c.website });

    $("contact-links").innerHTML = methods.map((m) =>
      `<a class="contact-link" href="${esc(m.href)}"${ext(m.href)}>
        <span class="icon-tile">${icon(m.icon)}</span>
        <span><small>${esc(m.label)}</small><b${m.ltr ? ' dir="ltr"' : ""}>${esc(m.value)}</b></span>${icon("arrow")}
      </a>`).join("");
    $("quick-links").innerHTML = methods.filter((m) => m.icon !== "sms").map((m) =>
      `<a href="${esc(m.href)}"${ext(m.href)} aria-label="${esc(m.label)}" title="${esc(m.label)}">${icon(m.icon)}</a>`).join("");

    $("actions").innerHTML =
      `<a href="#contact" class="btn primary">${icon("send")}${esc(ui("leaveNote"))}</a>` +
      (c.resumePdf ? `<a href="${esc(c.resumePdf)}" class="btn" download>${icon("download")}${esc(ui("downloadCv"))}</a>` : "") +
      (cv.certifications && cv.certifications.length ? `<a href="#certifications" class="btn">${icon("award")}${esc(ui("viewCerts"))}</a>` : "");

    // Stats
    show("stats", cv.stats && cv.stats.length);
    $("stats").innerHTML = (cv.stats || []).map((s, i) =>
      `<div class="card stat reveal" style="--d:${i * 0.08}s">
        <strong class="gradient-text" data-count="${Number(s.value) || 0}" data-suffix="${esc(tr(s.suffix) || "")}">${num(0)}${esc(tr(s.suffix) || "")}</strong>
        <span>${esc(tr(s.label))}</span>
      </div>`).join("");

    // About
    $("summary").textContent = tr(cv.summary);
    const job = (cv.experience || [])[0];
    const edu = (cv.education || [])[0];
    const aboutCards = [];
    if (job) aboutCards.push(["briefcase", ui("currently"), tr(job.role)]);
    if (edu) aboutCards.push(["graduation", ui("studying"), tr(edu.degree)]);
    aboutCards.push(["pin", ui("basedIn"), location]);
    if (cv.certifications) aboutCards.push(["award", ui("certificates"), ui("completed")(num(cv.certifications.length))]);
    $("about-cards").innerHTML = aboutCards.map(([ic, k, v]) =>
      `<div class="card mini"><span class="icon-tile">${icon(ic)}</span><div><small>${esc(k)}</small><b>${esc(v)}</b></div></div>`).join("");

    const term = [
      ["whoami", nameEn.toLowerCase().replace(/\s+/g, "_")],
      ["cat role.txt", job ? `${tr(job.role)} @ ${tr(job.company)}` : title],
      edu && ["cat study.txt", `${tr(edu.degree)} · ${tr(edu.school)}`],
      (cv.badges || []).length && ["ls certificates/", cv.badges.map((b) => b.replace(/\s+/g, "_")).join("  ")],
      ["ping sepehr", ui("ping")]
    ].filter(Boolean);
    $("terminal").innerHTML = term.map(([cmd, out]) =>
      `<span class="p">➜</span> <span class="c">~</span> <span class="k">${esc(cmd)}</span>\n<bdi>${esc(out)}</bdi>\n`).join("\n");

    // Experience
    show("experience", cv.experience && cv.experience.length);
    $("experience-list").innerHTML = (cv.experience || []).map((x) => {
      const max = Math.max(1, ...(x.breakdown || []).map((b) => b.value));
      const chart = x.breakdown && x.breakdown.length
        ? `<aside class="job-chart">
            <h4>${esc(tr(x.breakdownTitle) || ui("breakdown"))}</h4>
            ${x.breakdown.map((b) =>
              `<div class="bar"><div class="bar-label"><span>${esc(tr(b.label))}</span><b>${num(b.value)}</b></div>
                <div class="bar-track"><div class="bar-fill" style="--w:${(b.value / max) * 100}%"></div></div></div>`).join("")}
          </aside>` : "";
      return `<article class="card job reveal"${chart ? "" : ' style="grid-template-columns:1fr"'}>
        <div class="job-main">
          <div class="job-head">
            <span class="icon-tile">${icon("briefcase")}</span>
            <div><h3>${esc(tr(x.role))}</h3><p>${esc(tr(x.company))}</p></div>
            <span class="pill">${esc(tr(x.period))}</span>
          </div>
          <ul class="points">${(tr(x.points) || []).map((p) => `<li>${icon("check")}<span>${esc(p)}</span></li>`).join("")}</ul>
        </div>${chart}
      </article>`;
    }).join("");

    // Education & languages
    const hasEdu = cv.education && cv.education.length, hasLang = cv.languages && cv.languages.length;
    show("education", hasEdu || hasLang);
    show("education-list", hasEdu);
    show("languages", hasLang);
    $("education-list").innerHTML = (cv.education || []).map((x) =>
      `<article class="card edu reveal">
        <span class="icon-tile">${icon("graduation")}</span>
        <div>
          <h3>${esc(tr(x.degree))}</h3>
          <p>${esc(tr(x.school))}</p>
          <div class="tags"><span class="pill">${esc(tr(x.period))}</span>${x.status ? `<span class="pill green">${esc(tr(x.status))}</span>` : ""}</div>
        </div>
      </article>`).join("");

    const C = 2 * Math.PI * 46;
    $("languages").innerHTML =
      `<svg width="0" height="0" style="position:absolute"><defs><linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--c1)"/><stop offset="1" stop-color="var(--c2)"/></linearGradient></defs></svg>` +
      (cv.languages || []).map((l, i) => {
        const pct = Math.max(0, Math.min(100, Number(l.percent) || 0));
        return `<article class="card lang reveal" style="--d:${i * 0.1}s">
          <div class="gauge"><svg viewBox="0 0 110 110"><circle class="track" cx="55" cy="55" r="46"/>
            <circle class="val" cx="55" cy="55" r="46" style="--off:${C * (1 - pct / 100)}"/></svg><span>${lang === "fa" ? `٪${num(pct)}` : `${pct}%`}</span></div>
          <div><h3>${esc(tr(l.name))}</h3><p>${esc(tr(l.level))}</p></div>
        </article>`;
      }).join("");

    // Certificates: preview image on each card, full view in the viewer
    show("certifications", cv.certifications && cv.certifications.length);
    $("cert-list").innerHTML = (cv.certifications || []).map((x, i) => {
      const detail = tr(x.detail), issuer = tr(x.issuer), name = tr(x.name);
      const thumb = x.image
        ? `<button type="button" class="cert-thumb" data-cert="${i}" aria-label="${esc(ui("viewCert"))}: ${esc(name)}">
            <img src="${esc(x.image)}" alt="${esc(name)}" loading="lazy" decoding="async"><span class="cert-zoom">${icon("zoom")}</span></button>`
        : "";
      return `<article class="card hover cert reveal${x.image ? " has-thumb" : ""}" style="--d:${(i % 3) * 0.08}s" data-cert="${i}">
        ${thumb}
        <div class="cert-body">
          <div class="cert-top"><span class="icon-tile">${icon(x.icon || "award")}</span>
            <div><h3><bdi>${esc(name)}</bdi></h3>${detail ? `<p><bdi>${esc(detail)}</bdi></p>` : ""}${issuer ? `<p class="cert-issuer">${esc(ui("issuedBy"))} <bdi>${esc(issuer)}</bdi></p>` : ""}</div></div>
          <div class="cert-foot"><span class="pill">${esc(tr(x.period))}</span>${x.file ? `<a class="open" href="${esc(x.file)}" target="_blank" rel="noopener">PDF ${icon("arrow")}</a>` : ""}</div>
        </div>
      </article>`;
    }).join("");

    // Skills
    show("skills", cv.skills && cv.skills.length);
    const groups = cv.skills && cv.skills.length && typeof tr(cv.skills[0]) === "string"
      ? [{ group: ui("navSkills"), icon: "terminal", items: cv.skills }] : cv.skills || [];
    $("skill-list").innerHTML = groups.map((g, i) => {
      const items = (tr(g.items) || []).map(tr);
      return `<article class="card hover skill reveal" style="--d:${(i % 2) * 0.08}s">
        <div class="skill-head"><span class="icon-tile">${icon(g.icon || "terminal")}</span>
          <div><h3>${esc(tr(g.group))}</h3><span>${esc(ui("skillsCount")(num(items.length)))}</span></div></div>
        <ul class="chips">${items.map((s) => `<li><bdi>${esc(s)}</bdi></li>`).join("")}</ul>
      </article>`;
    }).join("");

    // Portfolio: detailed showcases with a preview of each tool
    renderPortfolio();
    renderLibrary();

    // Buttons and form
    $("send-btn").innerHTML = `${icon("send")}${esc(ui("send"))}`;
    $("form-status").textContent = "";
    $("form-status").className = "form-status";
    langBtn.textContent = ui("langShort");
    langBtn.setAttribute("aria-label", ui("switchLang"));
    langBtn.title = ui("switchLang");
    themeBtn.setAttribute("aria-label", ui("toggleTheme"));

    document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));
  }

  // ── Projects: compact cards + a details window ───────────
  const PORT_CATS = { network: "portNetwork", security: "portSecurity", support: "portSupport", writing: "portWriting" };
  let portFilter = "all";
  // Tools from cv.portfolio, then writing/reports from cv.projects
  const portItems = () => (cv.portfolio || []).concat((cv.projects || []).map((x) => Object.assign({ category: "writing", tagline: x.description }, x)));
  function portPreview(x, mini) {
    const p = x.preview || {};
    if (p.image) return `<img src="${esc(p.image)}" alt="${esc(tr(x.name))}" loading="lazy" decoding="async">`;
    if (p.output) {
      const out = mini ? p.output.split("\n").slice(0, 7).join("\n") : p.output;
      return `<div class="terminal port-term" dir="ltr"><div class="terminal-bar"><span></span><span></span><span></span><em>${esc((x.path || "").split("/").pop())}</em></div>
        <pre><span class="p">$</span> <span class="k">${esc(p.cmd || "")}</span>\n${esc(out)}</pre></div>`;
    }
    return `<div class="port-art">${icon(x.icon || "file")}</div>`;
  }
  function renderPortfolio() {
    const items = portItems();
    show("portfolio", items.length);
    if (!items.length) return;
    const counts = items.reduce((m, x) => ((m[x.category] = (m[x.category] || 0) + 1), m), {});
    const tabs = [["all", ui("portAll"), items.length]].concat(
      Object.keys(PORT_CATS).filter((k) => counts[k]).map((k) => [k, ui(PORT_CATS[k]), counts[k]]));
    $("port-filters").innerHTML = tabs.map(([k, label, n]) =>
      `<button type="button" role="tab" data-filter="${k}" aria-selected="${k === portFilter}" class="${k === portFilter ? "on" : ""}">
        ${esc(label)}<span>${num(n)}</span></button>`).join("");
    const repo = cv.portfolioRepo || "";
    $("portfolio-list").innerHTML = items.map((x, i) => {
      const name = esc(tr(x.name));
      const href = x.link || (x.path ? repo + x.path : "");
      const detailed = !!(x.problem || x.features);
      const hidden = portFilter !== "all" && x.category !== portFilter;
      return `<article class="card hover port reveal${detailed ? " is-detailed" : ""}" style="--d:${(i % 3) * 0.06}s" data-cat="${esc(x.category)}" data-port="${i}"${hidden ? " hidden" : ""}>
        <div class="port-thumb${(x.preview || {}).image ? " is-img" : ""}">${portPreview(x, true)}</div>
        <div class="port-body">
          <div class="port-head"><span class="pill">${esc(ui(PORT_CATS[x.category]) || "")}</span></div>
          <h3>${name}</h3>
          <p>${esc(tr(x.tagline))}</p>
          ${(x.tech || []).length ? `<ul class="chips port-tech">${x.tech.slice(0, 4).map((t) => `<li><bdi>${esc(t)}</bdi></li>`).join("")}</ul>` : ""}
          <div class="port-foot">
            ${detailed ? `<button type="button" class="btn sm port-more" data-port="${i}">${esc(ui("portDetails"))}</button>` : ""}
            ${href ? `<a class="port-code" href="${esc(href)}"${ext(href)}>${icon("github")}${esc(ui("portCode"))}</a>` : ""}
          </div>
        </div>
      </article>`;
    }).join("");
  }
  $("port-filters").addEventListener("click", (e) => {
    const b = e.target.closest("[data-filter]");
    if (!b) return;
    portFilter = b.dataset.filter;
    $("port-filters").querySelectorAll("button").forEach((x) => {
      const on = x === b;
      x.classList.toggle("on", on);
      x.setAttribute("aria-selected", on);
    });
    $("portfolio-list").querySelectorAll(".port").forEach((card) => {
      card.hidden = portFilter !== "all" && card.dataset.cat !== portFilter;
      if (!card.hidden) card.classList.add("in");
    });
  });

  // Details window for one project
  const pmodal = document.createElement("div");
  pmodal.className = "pmodal";
  pmodal.hidden = true;
  pmodal.setAttribute("role", "dialog");
  pmodal.setAttribute("aria-modal", "true");
  document.body.appendChild(pmodal);
  let pmodalFocus = null;
  function openProject(i) {
    const x = portItems()[i];
    if (!x) return;
    const repo = cv.portfolioRepo || "";
    const href = x.link || (x.path ? repo + x.path : "");
    const name = esc(tr(x.name));
    pmodal.innerHTML = `<div class="pmodal-panel">
      <header class="pmodal-head">
        <span class="icon-tile">${icon(x.icon || "code")}</span>
        <div><span class="pill">${esc(ui(PORT_CATS[x.category]) || "")}</span><h3>${name}</h3></div>
        <button type="button" class="viewer-btn pmodal-close" aria-label="${esc(ui("portClose"))}">${icon("close")}</button>
      </header>
      <div class="pmodal-body">
        <p class="port-tagline">${esc(tr(x.tagline))}</p>
        ${x.preview ? `<div class="pmodal-preview">${portPreview(x, false)}</div>` : ""}
        ${x.problem ? `<div class="port-ps"><div><h4>${esc(ui("portProblem"))}</h4><p>${esc(tr(x.problem))}</p></div><div><h4>${esc(ui("portSolution"))}</h4><p>${esc(tr(x.solution))}</p></div></div>` : ""}
        ${x.features ? `<h4>${esc(ui("portFeatures"))}</h4><ul class="points">${(tr(x.features) || []).map((f) => `<li>${icon("check")}<span>${esc(f)}</span></li>`).join("")}</ul>` : ""}
        ${(x.tech || []).length ? `<h4>${esc(ui("portTech"))}</h4><ul class="chips port-tech">${x.tech.map((t) => `<li><bdi>${esc(t)}</bdi></li>`).join("")}</ul>` : ""}
        ${href ? `<div class="port-actions"><a class="btn primary sm" href="${esc(href)}"${ext(href)}>${icon("github")}${esc(ui("portCode"))}</a></div>` : ""}
      </div>
    </div>`;
    pmodal.setAttribute("aria-label", tr(x.name));
    pmodalFocus = document.activeElement;
    pmodal.hidden = false;
    document.body.classList.add("no-scroll");
    pmodal.querySelector(".pmodal-close").focus();
  }
  function closeProject() {
    pmodal.hidden = true;
    document.body.classList.remove("no-scroll");
    if (pmodalFocus && pmodalFocus.focus) pmodalFocus.focus();
  }
  $("portfolio-list").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest("[data-port]");
    const x = card && portItems()[+card.dataset.port];
    if (x && (x.problem || x.features)) openProject(+card.dataset.port);
  });
  pmodal.addEventListener("click", (e) => { if (e.target === pmodal || e.target.closest(".pmodal-close")) closeProject(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !pmodal.hidden) closeProject(); });

  // ── Library: books & articles ─────────────────────────────
  // Home page shows only covers and titles; the book page and reader open on click.
  const PDFJS = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/";
  // Only books in the site's current language are listed (books with no language show in both)
  const libItems = () => (cv.library || []).filter((b) => !b.lang || b.lang === lang);
  const savedPage = (id) => { try { return parseInt(localStorage.getItem("book:" + id), 10) || 0; } catch (e) { return 0; } };
  const savePage = (id, n) => { try { localStorage.setItem("book:" + id, String(n)); } catch (e) {} };

  function renderLibrary() {
    const items = libItems();
    show("library", items.length);
    $("library-list").innerHTML = items.map((b, i) => `
      <a class="card hover lib-card reveal" href="#book/${esc(b.id)}" style="--d:${(i % 2) * 0.08}s" aria-label="${esc(tr(b.title))}">
        <span class="lib-cover"><img src="${esc(b.cover)}" alt="${esc(tr(b.title))}" loading="lazy" decoding="async"></span>
        <span class="lib-info">
          <span class="pill">${esc(ui(b.type === "article" ? "libArticle" : "libBook"))}</span>
          <h3>${esc(tr(b.title))}</h3>
          <p>${esc(tr(b.subtitle))}</p>
          <span class="lib-meta">${[b.pages ? `${num(b.pages)} ${ui("libPages")}` : "", tr(b.language), ui("libFree")].filter(Boolean).map(esc).join(lang === "fa" ? " ، " : " · ")}</span>
          <span class="lib-cta">${esc(ui("libRead"))} ${icon("arrow")}</span>
        </span>
      </a>`).join("");
  }

  // Full-screen book view: an intro page, then the reader
  const bookView = document.createElement("div");
  bookView.className = "book";
  bookView.hidden = true;
  bookView.setAttribute("role", "dialog");
  bookView.setAttribute("aria-modal", "true");
  document.body.appendChild(bookView);
  let current = null, reader = null;

  // A shared link opens its book even in the other language, by switching the site to that language
  const findBook = (id) => (cv.library || []).find((b) => b.id === id);
  function parseHash() {
    const m = location.hash.match(/^#book\/([\w-]+)(\/read(?:\/(\d+))?)?$/);
    return m ? { id: m[1], read: !!m[2], page: m[3] ? parseInt(m[3], 10) : 0 } : null;
  }

  const digits = (str) => (lang === "fa" ? nlu2fa(str) : str);
  const nlu2fa = (str) => String(str).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  function bookIntro(b) {
    const last = savedPage(b.id);
    const chapters = (b.chapters || []).map((c, i) => `
      <li><a href="#book/${esc(b.id)}/read/${c.page}"><span class="ch-num">${c.n ? digits(String(c.n).padStart(2, "0")) : "•"}</span><span class="ch-title">${esc(tr(c.title))}</span><span class="ch-page">${num(c.page)}</span></a></li>`).join("");
    return `
      <header class="book-bar">
        <a class="book-btn" href="#library" data-close>${icon("back")}<span>${esc(ui("libBack"))}</span></a>
      </header>
      <div class="book-scroll">
        <div class="wrap book-intro">
          <div class="book-cover-lg"><img src="${esc(b.cover)}" alt="${esc(tr(b.title))}"></div>
          <div class="book-about">
            <span class="pill">${esc(ui(b.type === "article" ? "libArticle" : "libBook"))}</span>
            <h1>${esc(tr(b.title))}</h1>
            <p class="book-sub">${esc(tr(b.subtitle))}</p>
            <p class="book-author">${esc(ui("libBy"))} <b>${esc(tr(b.author))}</b></p>
            <ul class="chips book-facts">
              ${b.pages ? `<li>${num(b.pages)} ${esc(ui("libPages"))}</li>` : ""}
              ${b.language ? `<li>${esc(tr(b.language))}</li>` : ""}
              ${b.edition ? `<li>${esc(tr(b.edition))}</li>` : ""}
              <li class="free">${esc(ui("libFree"))}</li>
            </ul>
            <p class="book-desc">${esc(tr(b.description))}</p>
            <div class="book-actions">
              <a class="btn primary" href="#book/${esc(b.id)}/read${last > 1 ? "/" + last : ""}">${icon("book")}${esc(last > 1 ? `${ui("libContinue")} ${num(last)}` : ui("libRead"))}</a>
            </div>
            ${chapters ? `<h2 class="book-toc-title">${esc(ui("libContents"))}</h2><ol class="book-toc">${chapters}</ol>` : ""}
          </div>
        </div>
      </div>`;
  }

  function openBook(route) {
    const b = findBook(route.id);
    if (!b) return closeBook(true);
    if (b.lang && b.lang !== lang) { setLang(b.lang); }
    if (bookView.hidden) { bookView.hidden = false; document.body.classList.add("no-scroll"); }
    if (route.read) return openReader(b, route.page || savedPage(b.id) || 1);
    stopReader();
    current = b;
    bookView.classList.remove("reading");
    bookView.innerHTML = bookIntro(b);
    bookView.setAttribute("aria-label", tr(b.title));
    bookView.querySelector(".book-scroll").scrollTop = 0;
    const back = bookView.querySelector("[data-close]");
    if (back) back.focus({ preventScroll: true });
  }

  function closeBook(silent) {
    stopReader();
    bookView.hidden = true;
    bookView.innerHTML = "";
    document.body.classList.remove("no-scroll");
    current = null;
    if (!silent && parseHash()) history.replaceState(null, "", location.pathname + location.search + "#library");
  }

  // ── Reader (pdf.js, loaded only when someone starts reading) ──
  let pdfjsPromise = null;
  function loadPdfJs() {
    if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
    if (!pdfjsPromise) pdfjsPromise = new Promise((resolve, reject) => {
      const sc = document.createElement("script");
      sc.src = PDFJS + "pdf.min.js";
      sc.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + "pdf.worker.min.js"; resolve(window.pdfjsLib); };
      sc.onerror = () => { pdfjsPromise = null; reject(new Error("pdf.js failed to load")); };
      document.head.appendChild(sc);
    });
    return pdfjsPromise;
  }
  const docs = {};

  function stopReader() {
    if (!reader) return;
    reader.destroy();
    reader = null;
  }

  // Flipbook reader: two facing pages on wide screens, one on phones.
  // Pages turn with a 3D animation by tapping a page edge, swiping, the
  // arrow keys or the buttons. Persian books turn right-to-left.
  const readNav = () => { try { const v = localStorage.getItem("reader:nav"); return v === "swipe" || v === "buttons" ? v : null; } catch (e) { return null; } };
  async function openReader(b, page) {
    if (reader && reader.book === b) { reader.goTo(page); return; }
    stopReader();
    current = b;
    bookView.classList.add("reading");
    const rtl = (b.direction || (b.language && b.language.en === "Persian" ? "rtl" : "ltr")) === "rtl";
    const toc = (b.chapters || []).map((c) => `<li><button type="button" data-page="${c.page}"><span>${esc(tr(c.title))}</span><em>${num(c.page)}</em></button></li>`).join("");
    const prevIcon = icon("chevron"), nextIcon = icon("chevron");
    bookView.innerHTML = `
      <header class="book-bar reader-bar">
        <a class="book-btn" href="#book/${esc(b.id)}" aria-label="${esc(ui("libClose"))}">${icon("back")}</a>
        <b class="reader-title">${esc(tr(b.title))}</b>
        <span class="reader-page"><span>${esc(ui("libPage"))}</span><input type="number" min="1" max="${b.pages || 999}" value="${page}" inputmode="numeric" aria-label="${esc(ui("libPage"))}"><span>${esc(ui("libOf"))} <em class="reader-total">${num(b.pages || "")}</em></span></span>
        <span class="reader-tools">
          <button type="button" class="book-btn" data-nav-toggle></button>
          <button type="button" class="book-btn" data-zoom aria-label="${esc(ui("libZoomIn"))}" aria-pressed="false">${icon("zoom")}</button>
          ${toc ? `<button type="button" class="book-btn" data-toc aria-label="${esc(ui("libToc"))}">${icon("list")}</button>` : ""}
        </span>
      </header>
      <div class="reader-body">
        ${toc ? `<nav class="reader-toc" aria-label="${esc(ui("libToc"))}"><h2>${esc(ui("libContents"))}</h2><ol>${toc}</ol></nav>` : ""}
        <div class="flip-area">
          <div class="flip-stage" dir="ltr"><p class="reader-status">${esc(ui("libLoading"))}</p></div>
          <div class="flip-controls" dir="ltr">
            <button type="button" class="book-btn flip-btn" data-go="${rtl ? "next" : "prev"}" aria-label="${esc(ui(rtl ? "next" : "prev"))}">${prevIcon}</button>
            <input type="range" class="flip-range" min="1" max="${b.pages || 1}" value="${page}" aria-label="${esc(ui("libPage"))}"${rtl ? ' style="direction:rtl"' : ""}>
            <button type="button" class="book-btn flip-btn flip-right" data-go="${rtl ? "prev" : "next"}" aria-label="${esc(ui(rtl ? "prev" : "next"))}">${nextIcon}</button>
          </div>
        </div>
      </div>`;
    const stage = bookView.querySelector(".flip-stage");
    const input = bookView.querySelector(".reader-page input");
    const range = bookView.querySelector(".flip-range");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const state = { book: b, current: page, destroy: () => {}, goTo: () => {} };
    reader = state;

    let doc;
    try {
      const lib = await loadPdfJs();
      doc = docs[b.file] || (docs[b.file] = await lib.getDocument(b.file).promise);
    } catch (e) {
      if (reader !== state) return;
      stage.innerHTML = `<div class="reader-fail"><p>${esc(ui("libFailed"))}</p><button type="button" class="btn primary" data-retry>${esc(ui("libRetry"))}</button></div>`;
      stage.querySelector("[data-retry]").addEventListener("click", () => { stopReader(); openReader(b, page); });
      return;
    }
    if (reader !== state) return;
    const total = doc.numPages;
    bookView.querySelector(".reader-total").textContent = num(total);
    input.max = range.max = total;
    const vp1 = (await doc.getPage(1)).getViewport({ scale: 1 });
    const ratio = vp1.width / vp1.height;

    // Layout: how big a page is and whether two fit side by side
    let pw = 0, ph = 0, spread = false, zoom = 1;
    const cache = new Map(); // page number -> canvas rendered at the current size
    const pending = new Map();
    function layout() {
      const box = stage.getBoundingClientRect();
      const maxH = Math.max(200, box.height - 8);
      const twoW = Math.min(maxH * ratio, (box.width - 24) / 2);
      spread = zoom === 1 && box.width >= 820 && twoW >= 260;
      pw = Math.floor(spread ? twoW : Math.min(maxH * ratio, box.width - 16));
      // Zoomed: one page, about twice as large, scrollable inside the stage
      if (zoom > 1) pw = Math.floor(Math.min(Math.max(pw * zoom, Math.min(box.width - 16, 1100)), 1600));
      ph = Math.floor(pw / ratio);
    }
    function render(n) {
      if (n < 1 || n > total) return Promise.resolve(null);
      const hit = cache.get(n);
      if (hit && hit.width === renderWidth()) return Promise.resolve(hit);
      if (pending.has(n)) return pending.get(n);
      const job = (async () => {
        const pg = await doc.getPage(n);
        const scale = renderWidth() / pg.getViewport({ scale: 1 }).width;
        const v = pg.getViewport({ scale });
        const c = document.createElement("canvas");
        c.width = Math.floor(v.width);
        c.height = Math.floor(v.height);
        await pg.render({ canvasContext: c.getContext("2d"), viewport: v }).promise;
        cache.set(n, c);
        pending.delete(n);
        return c;
      })().catch(() => { pending.delete(n); return null; });
      pending.set(n, job);
      return job;
    }
    const dpr = () => Math.min(window.devicePixelRatio || 1, 3);
    // Render well above screen resolution so small text stays sharp (capped to keep phones happy)
    const renderWidth = () => Math.floor(Math.min(2600, Math.max(pw * dpr() * 1.6, pw * 2.2)));
    function copy(n) {
      const src = cache.get(n);
      const c = document.createElement("canvas");
      if (!src) { c.width = c.height = 1; return c; }
      c.width = src.width; c.height = src.height;
      c.getContext("2d").drawImage(src, 0, 0);
      return c;
    }
    // Keep memory low: only pages near the current one stay rendered
    function prune() { for (const n of cache.keys()) if (Math.abs(n - state.current) > 5) cache.delete(n); }

    // Which pages are visible for a given page number.
    // Spread: the cover stands alone; then 2|3, 4|5 … (first of the pair on the reading-start side)
    function viewFor(n) {
      if (!spread) return { pages: [n], first: n };
      if (n <= 1) return { pages: [null, 1], first: 1 };
      const a = n % 2 === 0 ? n : n - 1;
      return { pages: [a, a + 1 <= total ? a + 1 : null], first: a };
    }
    // Step to the next/previous view
    const nextOf = (n) => (spread ? (n <= 1 ? 2 : viewFor(n).first + 2) : n + 1);
    const prevOf = (n) => (spread ? (viewFor(n).first <= 2 ? 1 : viewFor(n).first - 2) : n - 1);

    // Visual slots: in RTL the first page of a pair sits on the right
    function slotsFor(view) {
      const [a, z] = view.pages;
      return rtl ? { left: z, right: a } : { left: a, right: z };
    }

    let bookEl, leftEl, rightEl, busy = false;
    function build() {
      layout();
      stage.innerHTML = `<div class="flip-book${spread ? " spread" : ""}" style="width:${spread ? pw * 2 : pw}px;height:${ph}px">
        <div class="flip-page flip-left"></div>${spread ? '<div class="flip-page flip-right-page"></div><span class="flip-spine"></span>' : ""}
        <button type="button" class="flip-hit hit-left" aria-hidden="true" tabindex="-1"></button>
        <button type="button" class="flip-hit hit-right" aria-hidden="true" tabindex="-1"></button>
      </div>`;
      bookEl = stage.querySelector(".flip-book");
      leftEl = stage.querySelector(".flip-left");
      rightEl = stage.querySelector(".flip-right-page");
      bookEl.querySelector(".hit-left").addEventListener("click", () => turn(rtl ? 1 : -1));
      bookEl.querySelector(".hit-right").addEventListener("click", () => turn(rtl ? -1 : 1));
    }
    function paint(el, n) {
      if (!el) return;
      el.innerHTML = "";
      el.classList.toggle("blank", !n);
      if (n) { const c = cache.get(n); if (c) el.appendChild(copy(n)); else el.innerHTML = `<span class="reader-num">${num(n)}</span>`; }
    }
    async function show(n) {
      const view = viewFor(n);
      await Promise.all(view.pages.map((p) => p && render(p)));
      if (reader !== state) return;
      const sl = slotsFor(view);
      if (spread) { paint(leftEl, sl.left); paint(rightEl, sl.right); } else paint(leftEl, n);
      bookEl.classList.toggle("closed-left", spread && !sl.left);
      bookEl.classList.toggle("closed-right", spread && !sl.right);
      // Warm up the neighbours
      [nextOf(n), nextOf(nextOf(n)), prevOf(n)].forEach((p) => { if (p >= 1 && p <= total) viewFor(p).pages.forEach((q) => q && render(q)); });
    }
    function setCurrent(n) {
      state.current = n;
      if (document.activeElement !== input) input.value = n;
      range.value = n;
      savePage(b.id, n);
      prune();
    }

    // dir: +1 next, -1 previous
    async function turn(dir) {
      if (busy) return;
      const from = state.current;
      const to = dir > 0 ? nextOf(from) : prevOf(from);
      if (to < 1 || to > total || to === from) return;
      busy = true;
      const fromView = viewFor(from), toView = viewFor(to);
      await Promise.all(toView.pages.map((p) => p && render(p)));
      if (reader !== state) { busy = false; return; }
      if (reduce) { setCurrent(to); await show(to); busy = false; return; }

      // Which side lifts: moving forward in RTL lifts the left page and lays it on the right
      const liftsLeft = (dir > 0) === rtl;
      const fromSl = slotsFor(fromView), toSl = slotsFor(toView);
      const leaf = document.createElement("div");
      // Spread: the lifted page pivots on the spine. One page: it pivots on the spine edge (right for RTL books)
      leaf.className = "flip-leaf " + (spread ? (liftsLeft ? "from-left" : "from-right") : `single ${rtl ? "pivot-right" : "pivot-left"}`);
      const front = document.createElement("div"), back = document.createElement("div");
      front.className = "flip-face front";
      back.className = "flip-face back";
      if (spread) {
        const frontN = liftsLeft ? fromSl.left : fromSl.right;
        const backN = liftsLeft ? toSl.right : toSl.left;
        if (frontN) front.appendChild(copy(frontN)); else front.classList.add("blank");
        if (backN) back.appendChild(copy(backN)); else back.classList.add("blank");
        // Underneath: the page that will be revealed on the lifted side
        paint(liftsLeft ? leftEl : rightEl, liftsLeft ? toSl.left : toSl.right);
        bookEl.classList.toggle(liftsLeft ? "closed-left" : "closed-right", !(liftsLeft ? toSl.left : toSl.right));
      } else {
        // One page: going forward the page peels away revealing the next; going back the previous page lays down on top
        if (dir > 0) { front.appendChild(copy(from)); paint(leftEl, to); }
        else { front.appendChild(copy(to)); leaf.classList.add("incoming"); }
        back.classList.add("blank");
      }
      leaf.append(front, back);
      bookEl.appendChild(leaf);
      // Next frame: start the turn
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      leaf.classList.add("go");
      // Opening or closing the cover: slide the book to its open/closed position as the page turns
      if (spread) { bookEl.classList.toggle("closed-left", !toSl.left); bookEl.classList.toggle("closed-right", !toSl.right); }
      await new Promise((r) => { const done = () => r(); leaf.addEventListener("transitionend", done, { once: true }); setTimeout(done, 900); });
      if (reader !== state) return;
      setCurrent(to);
      await show(to);
      leaf.remove();
      busy = false;
    }
    state.goTo = async (n) => {
      n = Math.max(1, Math.min(total, n || 1));
      setCurrent(n);
      bookView.classList.remove("toc-open");
      await show(n);
    };

    // Controls
    // How pages turn: finger (swipe / tap the edge) or buttons. Asked once, changeable from the bar.
    let navMode = readNav();
    const navBtn = bookView.querySelector("[data-nav-toggle]");
    function applyNav() {
      bookView.dataset.nav = navMode || "swipe";
      const m = navMode === "buttons" ? "buttons" : "swipe";
      navBtn.innerHTML = icon(m === "buttons" ? "arrows" : "hand");
      const label = `${ui("navMode")}: ${ui(m === "buttons" ? "navButtons" : "navSwipe")}`;
      navBtn.setAttribute("aria-label", label);
      navBtn.title = label;
    }
    function chooseNav(m) {
      navMode = m;
      try { localStorage.setItem("reader:nav", m); } catch (e) {}
      applyNav();
      const ask = bookView.querySelector(".nav-ask");
      if (ask) ask.remove();
    }
    function askNav() {
      const old = bookView.querySelector(".nav-ask");
      if (old) old.remove();
      const box = document.createElement("div");
      box.className = "nav-ask";
      box.setAttribute("role", "dialog");
      box.setAttribute("aria-modal", "true");
      box.innerHTML = `<div class="nav-ask-card">
        <h2>${esc(ui("navAsk"))}</h2>
        <div class="nav-ask-options">
          <button type="button" data-nav="swipe"><span class="nav-ask-icon">${icon("hand")}</span><b>${esc(ui("navSwipe"))}</b><small>${esc(ui("navSwipeHint"))}</small></button>
          <button type="button" data-nav="buttons"><span class="nav-ask-icon">${icon("arrows")}</span><b>${esc(ui("navButtons"))}</b><small>${esc(ui("navButtonsHint"))}</small></button>
        </div>
        <p>${esc(ui("navAskNote"))}</p>
      </div>`;
      box.querySelectorAll("[data-nav]").forEach((btn) => btn.addEventListener("click", () => chooseNav(btn.dataset.nav)));
      bookView.querySelector(".reader-body").appendChild(box);
      box.querySelector("[data-nav]").focus();
    }
    navBtn.addEventListener("click", askNav);
    applyNav();
    if (!navMode) askNav();

    const zoomBtn = bookView.querySelector("[data-zoom]");
    zoomBtn.addEventListener("click", () => {
      zoom = zoom > 1 ? 1 : 2;
      zoomBtn.setAttribute("aria-pressed", String(zoom > 1));
      zoomBtn.setAttribute("aria-label", ui(zoom > 1 ? "libZoomOut" : "libZoomIn"));
      zoomBtn.classList.toggle("on", zoom > 1);
      stage.classList.toggle("zoomed", zoom > 1);
      relayout();
      stage.scrollTop = 0;
      // Persian lines start on the right
      requestAnimationFrame(() => { stage.scrollLeft = rtl ? stage.scrollWidth : 0; });
    });
    bookView.querySelectorAll("[data-go]").forEach((btn) => btn.addEventListener("click", () => turn(btn.dataset.go === "next" ? 1 : -1)));
    range.addEventListener("input", () => { input.value = range.value; });
    range.addEventListener("change", () => state.goTo(parseInt(range.value, 10)));
    input.addEventListener("change", () => state.goTo(parseInt(input.value, 10)));
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") state.goTo(parseInt(input.value, 10)); });
    const tocBtn = bookView.querySelector("[data-toc]");
    if (tocBtn) tocBtn.addEventListener("click", () => { bookView.classList.toggle(window.innerWidth > 960 ? "toc-hidden" : "toc-open"); setTimeout(relayout, 300); });
    bookView.querySelectorAll(".reader-toc [data-page]").forEach((btn) => btn.addEventListener("click", () => state.goTo(+btn.dataset.page)));
    const onKey = (e) => {
      if (reader !== state || e.target === input) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); turn(rtl ? 1 : -1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); turn(rtl ? -1 : 1); }
      else if (e.key === "PageDown" || e.key === " ") { e.preventDefault(); turn(1); }
      else if (e.key === "PageUp") { e.preventDefault(); turn(-1); }
    };
    document.addEventListener("keydown", onKey);
    // Swipe: drag the page the way you would a paper page
    let tx = null, ty = null;
    const onTouchStart = (e) => { tx = e.touches[0].clientX; ty = e.touches[0].clientY; };
    const onTouchEnd = (e) => {
      if (tx == null) return;
      const dx = e.changedTouches[0].clientX - tx, dy = e.changedTouches[0].clientY - ty;
      tx = null;
      if (navMode !== "swipe") return;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) turn((dx > 0) === rtl ? 1 : -1);
    };
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    // Re-fit on resize / rotation
    let rt = null;
    function relayout() {
      if (reader !== state) return;
      cache.clear();
      build();
      show(state.current);
    }
    const onResize = () => { clearTimeout(rt); rt = setTimeout(relayout, 150); };
    window.addEventListener("resize", onResize);
    state.destroy = () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      cache.clear();
    };

    build();
    setCurrent(Math.max(1, Math.min(total, page)));
    await show(state.current);
  }

  function route() {
    const r = parseHash();
    if (r) openBook(r);
    else if (!bookView.hidden) closeBook(true);
  }
  window.addEventListener("hashchange", route);
  bookView.addEventListener("click", (e) => {
    if (e.target.closest("[data-close]")) { e.preventDefault(); closeBook(false); document.getElementById("library").scrollIntoView(); }
  });
  document.addEventListener("keydown", (e) => {
    if (bookView.hidden || e.key !== "Escape") return;
    if (bookView.classList.contains("toc-open")) bookView.classList.remove("toc-open");
    else if (bookView.classList.contains("reading") && current) location.hash = "#book/" + current.id;
    else { closeBook(false); document.getElementById("library").scrollIntoView(); }
  });
  document.addEventListener("cv:langchange", () => {
    if (bookView.hidden || !current) return;
    // The open book belongs to the other language: go back to the library
    if (current.lang && current.lang !== lang) { closeBook(false); return; }
    if (!bookView.classList.contains("reading")) openBook({ id: current.id });
  });
  // A shared link straight to a book opens it
  if (parseHash()) setTimeout(route, 0);

  // ── Certificate viewer ────────────────────────────────────
  const viewer = document.createElement("div");
  viewer.className = "viewer";
  viewer.hidden = true;
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.innerHTML = `
    <button type="button" class="viewer-btn viewer-close"></button>
    <button type="button" class="viewer-btn viewer-nav viewer-prev"></button>
    <figure><img alt=""><figcaption><div><b></b><span></span></div><a target="_blank" rel="noopener" class="btn primary sm"></a></figcaption></figure>
    <button type="button" class="viewer-btn viewer-nav viewer-next"></button>`;
  document.body.appendChild(viewer);
  let viewIndex = 0, lastFocus = null;
  const certs = () => (cv.certifications || []).filter((c) => c.image);
  function showCert(i) {
    const list = cv.certifications || [];
    const withImg = list.map((c, k) => (c.image ? k : -1)).filter((k) => k >= 0);
    if (!withImg.length) return;
    const pos = (withImg.indexOf(i) + withImg.length) % withImg.length;
    viewIndex = withImg[pos < 0 ? 0 : pos];
    const c = list[viewIndex];
    const img = viewer.querySelector("img");
    // Keep the caption as wide as the picture
    img.onload = () => { viewer.querySelector("figcaption").style.width = `${img.clientWidth}px`; };
    img.src = c.image;
    img.alt = tr(c.name);
    viewer.querySelector("figcaption b").textContent = tr(c.name);
    viewer.querySelector("figcaption span").textContent = [tr(c.issuer), tr(c.period)].filter(Boolean).join(" · ");
    const a = viewer.querySelector("figcaption a");
    a.hidden = !c.file;
    if (c.file) { a.href = c.file; a.textContent = ui("openPdf"); }
    viewer.querySelector(".viewer-close").innerHTML = icon("close");
    viewer.querySelector(".viewer-close").setAttribute("aria-label", ui("close"));
    viewer.querySelector(".viewer-prev").innerHTML = icon("chevron");
    viewer.querySelector(".viewer-prev").setAttribute("aria-label", ui("prev"));
    viewer.querySelector(".viewer-next").innerHTML = icon("chevron");
    viewer.querySelector(".viewer-next").setAttribute("aria-label", ui("next"));
    viewer.querySelectorAll(".viewer-nav").forEach((b) => (b.hidden = certs().length < 2));
    viewer.setAttribute("aria-label", tr(c.name));
  }
  function step(dir) {
    const list = cv.certifications || [];
    const withImg = list.map((c, k) => (c.image ? k : -1)).filter((k) => k >= 0);
    const pos = withImg.indexOf(viewIndex);
    showCert(withImg[(pos + dir + withImg.length) % withImg.length]);
  }
  function openViewer(i) {
    lastFocus = document.activeElement;
    showCert(i);
    viewer.hidden = false;
    document.body.classList.add("no-scroll");
    viewer.querySelector(".viewer-close").focus();
  }
  function closeViewer() {
    viewer.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  $("cert-list").addEventListener("click", (e) => {
    if (e.target.closest("a")) return;
    const card = e.target.closest("[data-cert]");
    if (card && (cv.certifications || [])[+card.dataset.cert] && cv.certifications[+card.dataset.cert].image) openViewer(+card.dataset.cert);
  });
  viewer.addEventListener("click", (e) => {
    if (e.target === viewer || e.target.closest(".viewer-close")) closeViewer();
    else if (e.target.closest(".viewer-prev")) step(-1);
    else if (e.target.closest(".viewer-next")) step(1);
  });
  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    const rtl = root.dir === "rtl";
    if (e.key === "Escape") closeViewer();
    else if (e.key === "ArrowLeft") step(rtl ? 1 : -1);
    else if (e.key === "ArrowRight") step(rtl ? -1 : 1);
  });
  // Swipe on phones
  let touchX = null;
  viewer.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  viewer.addEventListener("touchend", (e) => {
    if (touchX == null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    touchX = null;
    if (Math.abs(dx) > 50) step((dx < 0) !== (root.dir === "rtl") ? 1 : -1);
  });
  document.addEventListener("cv:langchange", () => { if (!viewer.hidden) showCert(viewIndex); });
  window.addEventListener("resize", () => { if (!viewer.hidden) { const img = viewer.querySelector("img"); viewer.querySelector("figcaption").style.width = `${img.clientWidth}px`; } });

  // ── Scroll reveal + count-up ──────────────────────────────
  const countUp = (el) => {
    const target = Number(el.dataset.count), suffix = el.dataset.suffix || "";
    if (reduceMotion) { el.textContent = num(target) + suffix; return; }
    const start = performance.now(), dur = 1400;
    (function step(now) {
      const t = Math.min(1, (now - start) / dur), eased = 1 - Math.pow(1 - t, 3);
      el.textContent = num(Math.round(target * eased)) + suffix;
      if (t < 1) requestAnimationFrame(step);
    })(start);
  };
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("in");
      e.target.querySelectorAll("[data-count]").forEach(countUp);
      revealObs.unobserve(e.target);
    });
  }, { threshold: 0.15 });

  // ── Language toggle ───────────────────────────────────────
  const langBtn = $("lang-toggle");
  const themeBtn = $("theme-toggle");
  function setLang(next) {
    lang = next;
    root.lang = lang;
    root.dir = lang === "fa" ? "rtl" : "ltr";
    try { localStorage.setItem("lang", lang); } catch (e) {}
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch (e) {}
    render();
    restartTyping();
    document.dispatchEvent(new CustomEvent("cv:langchange", { detail: { lang } }));
  }
  langBtn.addEventListener("click", () => setLang(lang === "fa" ? "en" : "fa"));

  // ── Theme toggle ──────────────────────────────────────────
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : !window.matchMedia("(prefers-color-scheme: light)").matches;
  const paintTheme = () => { themeBtn.innerHTML = icon(isDark() ? "sun" : "moon"); };
  themeBtn.addEventListener("click", () => {
    root.dataset.theme = isDark() ? "light" : "dark";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
    paintTheme();
    if (reduceMotion) drawNetwork();
  });

  // ── Typed roles ───────────────────────────────────────────
  const typedEl = $("typed");
  let typingTimer = null;
  function restartTyping() {
    clearTimeout(typingTimer);
    const roles = (tr(cv.roles) || []).length ? tr(cv.roles) : [tr(cv.title)];
    if (reduceMotion) { typedEl.textContent = roles[0]; return; }
    let r = 0, ch = 0, deleting = false;
    (function tick() {
      const word = roles[r];
      ch += deleting ? -1 : 1;
      typedEl.textContent = word.slice(0, ch);
      let delay = deleting ? 35 : 70;
      if (!deleting && ch === word.length) { delay = 1800; deleting = true; }
      else if (deleting && ch === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
      typingTimer = setTimeout(tick, delay);
    })();
  }

  render();
  paintTheme();
  restartTyping();

  // ── Nav: background on scroll + active link ───────────────
  const nav = $("nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 20);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  const navLinks = [...document.querySelectorAll(".nav-links a")];
  const sectionObs = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = document.querySelector(a.getAttribute("href")); if (s) sectionObs.observe(s); });

  // ── Animated network background ───────────────────────────
  const canvas = $("network");
  const ctx = canvas.getContext("2d");
  let nodes = [], w = 0, h = 0, running = true, mouse = null;
  const rgb = () => getComputedStyle(root).getPropertyValue("--node").trim() || "34, 211, 238";
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = Math.round(Math.min(90, (w * h) / 16000));
    nodes = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.8
    }));
  }
  function drawNetwork() {
    const col = rgb(), link = 140;
    ctx.clearRect(0, 0, w, h);
    for (const n of nodes) {
      if (!reduceMotion) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }
    }
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < link) {
          ctx.strokeStyle = `rgba(${col}, ${0.18 * (1 - d / link)})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
      if (mouse) {
        const d = Math.hypot(a.x - mouse.x, a.y - mouse.y);
        if (d < 180) {
          ctx.strokeStyle = `rgba(${col}, ${0.45 * (1 - d / 180)})`;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      ctx.fillStyle = `rgba(${col}, 0.75)`;
      ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2); ctx.fill();
    }
    if (running && !reduceMotion) requestAnimationFrame(drawNetwork);
  }
  resize();
  drawNetwork();
  window.addEventListener("resize", () => { resize(); if (reduceMotion) drawNetwork(); });
  const hero = document.querySelector(".hero");
  hero.addEventListener("mousemove", (e) => { const r = canvas.getBoundingClientRect(); mouse = { x: e.clientX - r.left, y: e.clientY - r.top }; });
  hero.addEventListener("mouseleave", () => { mouse = null; });
  new IntersectionObserver(([e]) => {
    const was = running;
    running = e.isIntersecting;
    if (running && !was && !reduceMotion) requestAnimationFrame(drawNetwork);
  }).observe(hero);

  // ── Contact form → emailed to you via FormSubmit ──────────
  const form = $("contact-form");
  const status = $("form-status");
  const sendBtn = $("send-btn");
  if (!c.email) { form.style.display = "none"; return; }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return;
    let ok = true;
    form.querySelectorAll("[required]").forEach((f) => {
      const bad = !f.value.trim() || (f.type === "email" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
      f.parentElement.classList.toggle("invalid", bad);
      if (bad) ok = false;
    });
    if (!ok) {
      status.className = "form-status err";
      status.innerHTML = `${icon("alert")}${esc(ui("invalid"))}`;
      return;
    }
    sendBtn.disabled = true;
    sendBtn.textContent = ui("sending");
    status.className = "form-status";
    status.textContent = "";
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(c.email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message,
          language: lang === "fa" ? "Persian" : "English",
          _replyto: data.email,
          _subject: ui("subject")(data.name),
          _template: "table",
          _captcha: "false"
        })
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || json.success === "false" || json.success === false) throw new Error(json.message || "Request failed");
      form.reset();
      status.className = "form-status ok";
      status.innerHTML = `${icon("check")}${esc(ui("sent"))}`;
    } catch (err) {
      status.className = "form-status err";
      status.innerHTML = `${icon("alert")}${esc(ui("failed"))}`;
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = `${icon("send")}${esc(ui("send"))}`;
    }
  });
  form.addEventListener("input", (e) => e.target.parentElement.classList.remove("invalid"));
})();
