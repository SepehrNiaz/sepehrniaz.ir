// What the assistant knows: request categories with their interview
// questions, the shared contact questions, questions visitors may ask about
// Sepehr (answered from config.js), small talk and chat commands.
//
// Every visible text has a Persian and an English version; arrays are
// alternative phrasings the assistant picks from so it doesn't sound canned.
(function (root) {
  "use strict";

  // ── Request categories and their questions ──────────────────
  // Slot types: choice, text, longtext, money, timeline, count, location, yesno, name, email, phone
  // `chips` are the quick replies; `match` lists extra words that pick that chip from free text.
  const LOCATION_CHIPS = [
    { v: "onsite", fa: "حضوری در شیراز", en: "On-site in Shiraz", match: ["حضوری", "شیراز", "محل", "on site", "onsite", "in person", "shiraz", "office"] },
    { v: "remote", fa: "از راه دور / آنلاین", en: "Remote / online", match: ["دورکاری", "ریموت", "راه دور", "آنلاین", "remote", "online", "anydesk"] },
    { v: "hybrid", fa: "ترکیبی", en: "Hybrid", match: ["ترکیبی", "هیبرید", "هر دو", "hybrid", "both", "mix"] },
    { v: "other_city", fa: "شهر دیگر", en: "Another city", match: ["شهر دیگه", "شهر دیگر", "تهران", "اصفهان", "another city", "other city"] }
  ];
  const TIMELINE_CHIPS = [
    { v: "asap", fa: "هرچه زودتر", en: "As soon as possible" },
    { v: "this_month", fa: "همین ماه", en: "This month" },
    { v: "flexible", fa: "عجله‌ای نیست", en: "No rush" }
  ];
  const BUDGET_CHIPS = [
    { v: "negotiable", fa: "توافقی", en: "Negotiable" },
    { v: "skip", fa: "ترجیح می‌دهم نگویم", en: "Prefer not to say" }
  ];

  const CATEGORIES = [
    {
      id: "job_offer", emoji: "💼",
      label: { fa: "پیشنهاد شغلی", en: "Job offer" },
      chip: { fa: "💼 پیشنهاد کاری دارم", en: "💼 I have a job offer" },
      keywords: [["استخدام", 3], ["پیشنهاد کار", 3], ["پیشنهاد کاری", 3], ["پیشنهاد شغلی", 3], ["فرصت شغلی", 3], ["موقعیت شغلی", 3], ["جذب نیرو", 3], ["نیرو میخوایم", 3], ["دنبال نیرو", 3], ["آگهی استخدام", 3], ["شغل", 2.5], ["مصاحبه", 2], ["حقوق", 1.5], ["رزومه", 1], ["تمام وقت", 1.5], ["پاره وقت", 1.5], ["کارمند", 1], ["استخدامت", 3], ["دنبال یه کارشناس", 3.5], ["دنبال کارشناس", 3.5], ["دنبال یک کارشناس", 3.5], ["دنبال یه نفر", 3], ["نیازمندیم", 3], ["میگردیم", 1.5], ["همکار میخوایم", 3.5], ["looking for a", 1.5], ["we need an engineer", 2.5],
        ["hire", 3], ["hiring", 3], ["job", 3], ["position", 2.5], ["vacancy", 3], ["opening", 2], ["recruit", 3], ["interview", 2], ["salary", 2], ["employ", 2.5], ["career", 2], ["full time", 1.5], ["part time", 1.5], ["job offer", 3], ["work for us", 3], ["join our team", 3]],
      dominant: ["تمام وقت", "پاره وقت", "دنبال یه کارشناس", "دنبال کارشناس", "full time", "full-time", "part time", "استخدام", "استخدامت", "موقعیت شغلی", "فرصت شغلی", "پیشنهاد کاری", "پیشنهاد شغلی", "جذب نیرو", "دنبال نیرو", "hire", "hiring", "vacancy", "job offer", "open position", "join our team", "recruit"],
      examples: ["میخوایم استخدامت کنیم", "یه موقعیت شغلی برای شما داریم", "برای شرکتمون پشتیبان شبکه میخوایم", "We'd like to hire you", "we have an open position for an IT technician"],
      slots: [
        { id: "role", type: "choice", allowOther: true, label: { fa: "سمت", en: "Role" },
          ask: { fa: ["برای چه سمتی دنبال نیرو هستید؟", "این موقعیت شغلی دقیقاً برای چه نقشی است؟"], en: ["What role are you hiring for?", "What's the position, exactly?"] },
          chips: [
            { v: "it_support", fa: "پشتیبان IT / هلپ‌دسک", en: "IT support / helpdesk", match: ["پشتیبان", "پشتیبانی", "هلپ دسک", "helpdesk", "help desk", "support", "technician", "تکنسین"] },
            { v: "network", fa: "کارشناس شبکه", en: "Network engineer", match: ["شبکه", "network", "cisco", "سیسکو", "میکروتیک"] },
            { v: "security", fa: "کارشناس امنیت", en: "Security specialist", match: ["امنیت", "security", "soc", "pentest", "نفوذ"] },
            { v: "sysadmin", fa: "مدیر سیستم / ادمین", en: "System administrator", match: ["ادمین", "مدیر سیستم", "sysadmin", "admin", "server", "سرور"] }
          ] },
        { id: "company", type: "text", optional: true, label: { fa: "شرکت", en: "Company" },
          ask: { fa: ["اسم شرکت یا مجموعه‌تان چیست و در چه زمینه‌ای فعالیت می‌کنید؟", "از طرف کدام شرکت یا مجموعه هستید؟"], en: ["Which company is this for, and what does it do?", "What's the company or organisation?"] } },
        { id: "employment", type: "choice", label: { fa: "نوع همکاری", en: "Employment type" },
          ask: { fa: ["نوع همکاری چطور است؟"], en: ["What type of employment is it?"] },
          chips: [
            { v: "full_time", fa: "تمام‌وقت", en: "Full-time" },
            { v: "part_time", fa: "پاره‌وقت", en: "Part-time" },
            { v: "contract", fa: "پروژه‌ای / قراردادی", en: "Contract / project" },
            { v: "internship", fa: "کارآموزی", en: "Internship" }
          ] },
        { id: "work_mode", type: "location", label: { fa: "محل کار", en: "Work location" },
          ask: { fa: ["کار حضوری است یا دورکاری؟ و در چه شهری؟", "محل کار کجاست؟ حضوری، دورکاری یا ترکیبی؟"], en: ["Is it on-site, remote or hybrid, and in which city?", "Where would the work be — on-site, remote or hybrid?"] },
          chips: LOCATION_CHIPS },
        { id: "salary", type: "money", optional: true, label: { fa: "حقوق", en: "Salary" },
          ask: { fa: ["بازه‌ی حقوق یا پرداختی که در نظر دارید چقدر است؟ (اگر هنوز مشخص نیست، «توافقی» را بزنید)"], en: ["What salary range do you have in mind? (Tap “Negotiable” if it isn't set yet.)"] },
          chips: BUDGET_CHIPS },
        { id: "start", type: "timeline", optional: true, label: { fa: "زمان شروع", en: "Start date" },
          ask: { fa: ["از چه زمانی نیاز دارید همکاری شروع شود؟"], en: ["When would the job start?"] },
          chips: TIMELINE_CHIPS },
        { id: "duties", type: "longtext", optional: true, label: { fa: "شرح وظایف", en: "Duties" },
          ask: { fa: ["اگر توضیح کوتاهی درباره‌ی وظایف یا شرایط کار هست، بفرمایید."], en: ["Anything about the duties or conditions you'd like to add?"] },
          chips: [{ v: "skip", fa: "نه، کافی است", en: "No, that's all" }] }
      ]
    },
    {
      id: "freelance_project", emoji: "🧩",
      label: { fa: "پروژه", en: "Project" },
      chip: { fa: "🧩 یک پروژه دارم", en: "🧩 I have a project" },
      keywords: [["پروژه", 3], ["سفارش", 2], ["فریلنس", 3], ["انجام بدید", 1.5], ["انجام بدی", 1.5], ["برام بسازی", 2.5], ["طراحی سایت", 3], ["سایت", 2], ["وبسایت", 2.5], ["اسکریپت", 2.5], ["پایتون", 1.5], ["برنامه نویسی", 2], ["ربات", 1.5], ["اتوماسیون", 2], ["نصب دوربین", 2.5], ["راه اندازی", 1],
        ["project", 3], ["freelance", 3], ["website", 2.5], ["web site", 2.5], ["script", 2.5], ["automation", 2], ["build me", 2.5], ["develop", 1.5], ["gig", 2], ["contract work", 2.5], ["install cameras", 2.5]],
      examples: ["یه پروژه دارم میخوام برام انجام بدی", "یه سایت برای کسب و کارم میخوام", "I have a small project for you", "can you build a script for us"],
      slots: [
        { id: "project_type", type: "choice", allowOther: true, label: { fa: "نوع پروژه", en: "Project type" },
          ask: { fa: ["پروژه در چه زمینه‌ای است؟"], en: ["What kind of project is it?"] },
          chips: [
            { v: "network", fa: "شبکه و تجهیزات", en: "Network & equipment", match: ["شبکه", "سوییچ", "روتر", "کابل", "network", "router", "switch", "cabling"] },
            { v: "cctv", fa: "دوربین مداربسته", en: "CCTV cameras", match: ["دوربین", "مداربسته", "cctv", "camera", "dvr", "nvr"] },
            { v: "web", fa: "سایت یا اینستاگرام", en: "Website or Instagram", match: ["سایت", "وبسایت", "اینستاگرام", "پیج", "website", "instagram", "web"] },
            { v: "code", fa: "برنامه‌نویسی / اسکریپت پایتون", en: "Programming / Python script", match: ["پایتون", "اسکریپت", "برنامه", "ربات", "اتوماسیون", "python", "script", "bot", "automation", "code"] },
            { v: "security", fa: "امنیت / تست نفوذ", en: "Security / pentest", match: ["امنیت", "نفوذ", "هک", "security", "pentest", "penetration"] }
          ] },
        { id: "description", type: "longtext", label: { fa: "شرح پروژه", en: "Description" },
          ask: { fa: ["در چند جمله بفرمایید دقیقاً چه چیزی باید ساخته یا انجام شود و هدف نهایی چیست؟", "کمی بیشتر توضیح بدهید: دقیقاً چه می‌خواهید و نتیجه‌ی نهایی باید چه باشد؟"], en: ["In a few sentences, what exactly needs to be built or done, and what's the end goal?", "Tell me a bit more: what do you need, and what should the result look like?"] } },
        { id: "scale", type: "count", countKind: ["device", "camera", "user"], optional: true, label: { fa: "مقیاس", en: "Scale" },
          when: (s) => ["network", "cctv"].includes(s.slots.project_type && s.slots.project_type.v),
          ask: { fa: ["تقریباً چند دستگاه یا دوربین درگیر است؟"], en: ["Roughly how many devices or cameras are involved?"] } },
        { id: "work_mode", type: "location", label: { fa: "محل انجام", en: "Location" },
          ask: { fa: ["کار حضوری در محل انجام شود یا از راه دور؟"], en: ["Should this be done on-site or remotely?"] },
          chips: LOCATION_CHIPS },
        { id: "timeline", type: "timeline", label: { fa: "زمان‌بندی", en: "Timeline" },
          ask: { fa: ["تا چه زمانی باید آماده باشد؟", "زمان‌بندی‌تان چطور است؟ چه موقع لازمش دارید؟"], en: ["When do you need it done?", "What's your timeline?"] },
          chips: TIMELINE_CHIPS },
        { id: "budget", type: "money", optional: true, label: { fa: "بودجه", en: "Budget" },
          ask: { fa: ["بودجه‌ی تقریبی‌تان برای این پروژه چقدر است؟"], en: ["Roughly what budget do you have for this?"] },
          chips: BUDGET_CHIPS }
      ]
    },
    {
      id: "it_support", emoji: "🛠️",
      label: { fa: "پشتیبانی IT", en: "IT support" },
      chip: { fa: "🛠️ مشکل فنی دارم", en: "🛠️ I need IT support" },
      keywords: [["پشتیبانی", 2.5], ["مشکل", 2.5], ["خراب", 3], ["کار نمیکنه", 3.5], ["کار نمی کنه", 3.5], ["کار نمیکند", 3.5], ["ایراد", 2.5], ["خطا", 2.5], ["ارور", 2.5], ["تعمیر", 3], ["کند شده", 3], ["کنده", 2], ["هنگ", 2.5], ["ویروس", 2.5], ["پرینتر", 2.5], ["چاپگر", 2.5], ["اسکنر", 2], ["نصب ویندوز", 3], ["ویندوز", 2], ["قطع", 2], ["وصل نمیشه", 3], ["بالا نمیاد", 3], ["روشن نمیشه", 3], ["لپ تاپ", 1.5], ["لپتاپ", 1.5], ["کامپیوترم", 2], ["سیستمم", 2], ["اکانت", 1], ["رمز", 1],
        ["support", 2.5], ["problem", 2.5], ["issue", 2.5], ["broken", 3], ["not working", 3.5], ["doesn't work", 3.5], ["error", 2.5], ["fix", 2.5], ["repair", 3], ["slow", 2], ["crash", 2.5], ["virus", 2.5], ["printer", 2.5], ["troubleshoot", 3], ["helpdesk", 2], ["won't turn on", 3.5], ["wont turn on", 3.5], ["won't start", 3.5], ["not turning on", 3.5], ["doesn't turn on", 3.5], ["can't connect", 3], ["cannot connect", 3], ["isn't working", 3.5], ["stopped working", 3.5], ["keeps crashing", 3.5], ["blue screen", 3.5], ["no internet", 3], ["wifi", 1.5], ["internet", 1.5], ["laptop", 2], ["computer", 1.5], ["pc", 1.5], ["frozen", 2.5], ["password", 1.5], ["hang", 2], ["روشن نمیشه", 3.5], ["بالا نمیاد", 3.5], ["صفحه آبی", 3.5], ["قطع شده", 3], ["نمیتونم وصل", 3], ["رمزمو یادم رفته", 3.5]],
      dominant: ["کار نمیکنه", "کار نمی کنه", "خراب", "خطا میده", "ارور", "روشن نمیشه", "not working", "broken", "won't turn on", "wont turn on", "stopped working", "error"],
      examples: ["پرینترم کار نمیکنه", "کامپیوترم خیلی کند شده", "اینترنت شرکت قطع و وصل میشه", "my laptop won't turn on", "our printer keeps showing an error"],
      slots: [
        { id: "issue_area", type: "choice", allowOther: true, label: { fa: "بخش", en: "Area" },
          ask: { fa: ["مشکل مربوط به کدام بخش است؟"], en: ["Which area is the problem in?"] },
          chips: [
            { v: "computer", fa: "کامپیوتر یا لپ‌تاپ", en: "Computer or laptop", match: ["کامپیوتر", "لپ تاپ", "لپتاپ", "سیستم", "روشن نمیشه", "کند", "هنگ", "computer", "laptop", "pc", "slow", "freeze"] },
            { v: "internet", fa: "اینترنت / وای‌فای / شبکه", en: "Internet / Wi-Fi / network", match: ["اینترنت", "وای فای", "وایفای", "شبکه", "مودم", "قطع", "internet", "wifi", "wi fi", "network", "modem", "router"] },
            { v: "printer", fa: "پرینتر یا اسکنر", en: "Printer or scanner", match: ["پرینتر", "چاپگر", "اسکنر", "فکس", "printer", "scanner", "fax"] },
            { v: "cctv", fa: "دوربین مداربسته", en: "CCTV cameras", match: ["دوربین", "مداربسته", "camera", "cctv", "dvr"] },
            { v: "software", fa: "ویندوز و نرم‌افزار", en: "Windows & software", match: ["ویندوز", "نرم افزار", "برنامه", "آفیس", "اکسل", "ویروس", "windows", "software", "office", "excel", "virus", "install"] },
            { v: "accounts", fa: "ایمیل و حساب‌ها", en: "Email & accounts", match: ["ایمیل", "اکانت", "حساب", "رمز", "پسورد", "email", "account", "password", "login"] }
          ] },
        { id: "problem", type: "longtext", label: { fa: "شرح مشکل", en: "Problem" },
          ask: { fa: ["دقیقاً چه اتفاقی می‌افتد؟ اگر پیغام خطایی می‌بینید، متنش را هم بنویسید.", "مشکل را کمی دقیق‌تر توضیح بدهید: چه می‌بینید و چه انتظاری دارید؟"], en: ["What exactly happens? If there's an error message, please include it.", "Describe the problem a bit more: what do you see, and what should happen instead?"] } },
        { id: "since", type: "text", optional: true, label: { fa: "از چه زمانی", en: "Since" },
          ask: { fa: ["از کی این مشکل شروع شده؟ بعد از اتفاق خاصی بود؟ (مثلاً آپدیت، قطعی برق یا نصب برنامه)"], en: ["When did it start? Did anything happen just before (an update, a power cut, a new program)?"] },
          chips: [{ v: "today", fa: "از امروز", en: "Today" }, { v: "days", fa: "چند روزی است", en: "A few days" }, { v: "long", fa: "خیلی وقت است", en: "A long time" }] },
        { id: "devices", type: "count", countKind: ["device", "user"], optional: true, label: { fa: "تعداد دستگاه", en: "Devices affected" },
          ask: { fa: ["این مشکل روی چند دستگاه هست؟"], en: ["How many devices are affected?"] },
          chips: [{ v: "1", fa: "فقط یکی", en: "Just one" }, { v: "few", fa: "چندتا", en: "A few" }, { v: "all", fa: "همه‌ی سیستم‌ها", en: "All of them" }] },
        { id: "setting", type: "choice", label: { fa: "محیط", en: "Setting" },
          ask: { fa: ["این برای استفاده‌ی شخصی است یا محل کار؟"], en: ["Is this for personal use or a business?"] },
          chips: [
            { v: "personal", fa: "شخصی / خانه", en: "Personal / home", match: ["شخصی", "خونه", "خانه", "خودم", "personal", "home", "my own"] },
            { v: "business", fa: "شرکت / محل کار", en: "Business / office", match: ["شرکت", "اداره", "دفتر", "مغازه", "محل کار", "سر کار", "business", "office", "company", "at work", "shop"] }
          ] },
        { id: "work_mode", type: "location", label: { fa: "نحوه‌ی پشتیبانی", en: "Support type" },
          ask: { fa: ["ترجیح می‌دهید حضوری بررسی شود یا از راه دور (مثلاً با AnyDesk)؟"], en: ["Would you prefer an on-site visit or remote help (e.g. AnyDesk)?"] },
          chips: [LOCATION_CHIPS[0], LOCATION_CHIPS[1], { v: "any", fa: "فرقی نمی‌کند", en: "Either is fine", match: ["فرقی نمیکنه", "فرقی نمی کنه", "هر دو", "either", "any", "doesn't matter"] }] },
        { id: "urgency", type: "timeline", label: { fa: "فوریت", en: "Urgency" },
          ask: { fa: ["چقدر فوری است؟"], en: ["How urgent is it?"] },
          chips: [{ v: "today", fa: "همین امروز", en: "Today" }, { v: "this_week", fa: "همین هفته", en: "This week" }, { v: "flexible", fa: "عجله‌ای نیست", en: "No rush" }] }
      ]
    },
    {
      id: "network_security", emoji: "🛡️",
      label: { fa: "شبکه و امنیت", en: "Network & security" },
      chip: { fa: "🛡️ شبکه یا امنیت", en: "🛡️ Network or security" },
      keywords: [["شبکه", 2.5], ["سوییچ", 2.5], ["سوئیچ", 2.5], ["روتر", 2.5], ["میکروتیک", 3], ["سیسکو", 3], ["فایروال", 3], ["وی پی ان", 2], ["امنیت", 3], ["امنیتی", 3], ["نفوذ", 3], ["تست نفوذ", 4], ["هک", 3], ["هک شدیم", 4], ["هک شده", 4], ["باج افزار", 4], ["پسیو", 3], ["کابل کشی", 3], ["رک", 2], ["سرور", 2], ["اکتیو دایرکتوری", 3], ["دامین", 2], ["زیرساخت", 2.5],
        ["network", 2.5], ["networking", 2.5], ["switch", 2], ["router", 2.5], ["mikrotik", 3], ["cisco", 3], ["firewall", 3], ["vpn", 2], ["security", 3], ["pentest", 4], ["penetration test", 4], ["hacked", 4], ["breach", 4], ["ransomware", 4], ["server", 2], ["cabling", 3], ["vlan", 3], ["infrastructure", 2.5], ["f5", 3], ["active directory", 3]],
      dominant: ["هک شده", "هک شدیم", "باج افزار", "تست نفوذ", "hacked", "ransomware", "breach", "pentest", "penetration test"],
      examples: ["میخوام شبکه شرکتمو راه اندازی کنی", "سرورمون هک شده", "یه تست نفوذ برای سایتمون میخوایم", "we need a firewall configured", "set up a network for our new office"],
      slots: [
        { id: "service", type: "choice", allowOther: true, label: { fa: "خدمت", en: "Service" },
          ask: { fa: ["دقیقاً به کدام خدمت نیاز دارید؟"], en: ["Which service do you need?"] },
          chips: [
            { v: "setup", fa: "راه‌اندازی یا توسعه‌ی شبکه", en: "Network setup or expansion", match: ["راه اندازی", "راه‌اندازی", "توسعه", "کابل کشی", "پسیو", "دفتر جدید", "setup", "set up", "new office", "expand", "cabling", "build"] },
            { v: "config", fa: "پیکربندی روتر / سوییچ / میکروتیک", en: "Router / switch / MikroTik config", match: ["پیکربندی", "کانفیگ", "روتر", "سوییچ", "میکروتیک", "سیسکو", "vlan", "config", "configure", "router", "switch", "mikrotik", "cisco"] },
            { v: "firewall", fa: "فایروال / F5 / VPN", en: "Firewall / F5 / VPN", match: ["فایروال", "وی پی ان", "vpn", "f5", "firewall", "waf"] },
            { v: "pentest", fa: "تست نفوذ و ارزیابی امنیتی", en: "Pentest & security audit", match: ["تست نفوذ", "نفوذ", "ارزیابی", "پن تست", "pentest", "penetration", "audit", "assessment", "vulnerability"] },
            { v: "incident", fa: "هک شدیم / حادثه‌ی امنیتی", en: "We've been hacked / incident", match: ["هک شدیم", "هک شده", "باج افزار", "حمله", "نشت", "hacked", "breach", "ransomware", "attack", "incident", "compromised"] },
            { v: "consulting", fa: "مشاوره و طراحی", en: "Consulting & design", match: ["مشاوره", "طراحی", "consult", "consulting", "design", "advice"] }
          ] },
        { id: "incident_details", type: "longtext", label: { fa: "شرح حادثه", en: "Incident details" },
          when: (s) => s.slots.service && s.slots.service.v === "incident",
          ask: { fa: ["متأسفم که این اتفاق افتاده؛ این مورد را فوری علامت می‌زنم. دقیقاً چه چیزی دیدید و از کی؟ (مثلاً فایل‌ها رمز شده‌اند، پیغام باج، ورود مشکوک)"], en: ["Sorry this happened — I'll flag it as urgent. What exactly did you notice, and since when? (e.g. encrypted files, a ransom note, suspicious logins)"] } },
        { id: "authorization", type: "yesno", label: { fa: "مجوز تست", en: "Authorisation" },
          when: (s) => s.slots.service && s.slots.service.v === "pentest",
          ask: { fa: ["برای تست نفوذ، شما مالک این سیستم‌ها هستید یا مجوز کتبی از مالک دارید؟"], en: ["For a pentest: do you own these systems, or have written permission from the owner?"] },
          chips: [{ v: "yes", fa: "بله", en: "Yes" }, { v: "no", fa: "نه هنوز", en: "Not yet" }] },
        { id: "environment", type: "longtext", optional: true, label: { fa: "وضعیت فعلی", en: "Current setup" },
          ask: { fa: ["محیط فعلی را کمی توضیح بدهید: چه تجهیزاتی دارید (روتر، سوییچ، فایروال، سرور) و الان چه وضعیتی دارد؟"], en: ["Tell me a little about the current setup: what equipment do you have (router, switches, firewall, servers) and how is it now?"] },
          chips: [{ v: "skip", fa: "فعلاً چیزی ندارم / نمی‌دانم", en: "Nothing yet / not sure" }] },
        { id: "size", type: "count", countKind: ["user", "device"], label: { fa: "اندازه‌ی شبکه", en: "Network size" },
          ask: { fa: ["تقریباً چند کاربر یا دستگاه در این شبکه هستند؟"], en: ["Roughly how many users or devices are on this network?"] },
          chips: [{ v: "10", fa: "کمتر از ۱۰", en: "Under 10" }, { v: "50", fa: "۱۰ تا ۵۰", en: "10–50" }, { v: "100", fa: "بیشتر از ۵۰", en: "Over 50" }] },
        { id: "work_mode", type: "location", label: { fa: "محل", en: "Location" },
          ask: { fa: ["محل کار کجاست؟ حضوری در شیراز یا از راه دور؟"], en: ["Where is it — on-site in Shiraz or remote?"] },
          chips: LOCATION_CHIPS },
        { id: "timeline", type: "timeline", label: { fa: "زمان‌بندی", en: "Timeline" },
          when: (s) => !(s.slots.service && s.slots.service.v === "incident"),
          ask: { fa: ["چه زمانی باید انجام شود؟"], en: ["When does this need to happen?"] },
          chips: TIMELINE_CHIPS },
        { id: "budget", type: "money", optional: true, label: { fa: "بودجه", en: "Budget" },
          ask: { fa: ["بودجه‌ی تقریبی در نظر گرفته‌اید؟"], en: ["Do you have a rough budget in mind?"] },
          chips: BUDGET_CHIPS }
      ]
    },
    {
      id: "training", emoji: "🎓",
      label: { fa: "آموزش", en: "Training" },
      chip: { fa: "🎓 آموزش می‌خواهم", en: "🎓 I want training" },
      keywords: [["آموزش", 3], ["دوره", 2.5], ["کلاس", 3], ["تدریس", 3], ["یاد بگیرم", 2.5], ["یادم بدی", 3], ["یاد بدی", 3], ["مدرس", 3], ["استاد", 1.5], ["خصوصی", 1.5], ["کارگاه", 2.5], ["ورکشاپ", 2.5], ["آموزش بدی", 3], ["یاد بگیرن", 3.5], ["یاد بگیرند", 3.5], ["یاد بگیریم", 3.5], ["یادشون بدی", 3.5], ["یادمون بدی", 3.5], ["آموزش ببینن", 3.5], ["آموزش ببینند", 3.5], ["دوره آموزشی", 3.5], ["کلاس خصوصی", 3.5],
        ["training", 3], ["course", 2.5], ["class", 2.5], ["teach", 3], ["tutor", 3], ["lesson", 2.5], ["workshop", 2.5], ["learn", 2], ["mentor", 2.5], ["coaching", 2.5]],
      dominant: ["آموزش", "یاد بگیر", "یاد بگیرم", "یاد بگیرن", "یاد بدی", "یادم بدی", "تدریس", "کلاس", "دوره", "کارگاه", "teach", "training", "train our", "course", "class", "tutor", "learn", "workshop", "lessons"],
      examples: ["میخوام شبکه یاد بگیرم", "برای کارمندامون کلاس امنیت میخوایم", "can you teach me CCNA", "we need security awareness training for staff"],
      slots: [
        { id: "topic", type: "choice", allowOther: true, label: { fa: "موضوع", en: "Topic" },
          ask: { fa: ["آموزش در چه موضوعی مد نظرتان است؟"], en: ["What topic would you like training in?"] },
          chips: [
            { v: "network", fa: "شبکه (Network+ / CCNA)", en: "Networking (Network+ / CCNA)", match: ["شبکه", "سیسکو", "ccna", "network", "میکروتیک"] },
            { v: "security", fa: "امنیت (Security+ / CEH)", en: "Security (Security+ / CEH)", match: ["امنیت", "هک", "نفوذ", "security", "ceh", "hacking"] },
            { v: "linux", fa: "لینوکس", en: "Linux", match: ["لینوکس", "linux", "ubuntu", "kali"] },
            { v: "python", fa: "پایتون", en: "Python", match: ["پایتون", "برنامه نویسی", "python", "programming", "coding"] },
            { v: "office", fa: "کار با کامپیوتر و آفیس", en: "Computer basics & Office", match: ["آفیس", "اکسل", "ورد", "icdl", "کامپیوتر", "office", "excel", "word", "basics"] }
          ] },
        { id: "audience", type: "choice", label: { fa: "مخاطب", en: "Audience" },
          ask: { fa: ["آموزش برای چه کسی است؟"], en: ["Who is the training for?"] },
          chips: [
            { v: "self", fa: "خودم (یک نفر)", en: "Just me", match: ["خودم", "من", "یک نفر", "شخصی", "خصوصی", "me", "myself", "just me", "private", "one person"] },
            { v: "team", fa: "گروه / کارمندان شرکت", en: "A team / company staff", match: ["کارمند", "پرسنل", "تیم", "گروه", "شرکت", "staff", "team", "employees", "group", "company"] },
            { v: "students", fa: "دانشجوها / کلاس", en: "Students / a class", match: ["دانشجو", "دانش آموز", "کلاس", "students", "class", "school", "university"] }
          ] },
        { id: "group_size", type: "count", countKind: ["user"], label: { fa: "تعداد نفرات", en: "Group size" },
          when: (s) => s.slots.audience && s.slots.audience.v !== "self",
          ask: { fa: ["چند نفر در این دوره شرکت می‌کنند؟"], en: ["How many people will attend?"] } },
        { id: "level", type: "choice", label: { fa: "سطح", en: "Level" },
          ask: { fa: ["سطح فعلی شرکت‌کننده‌ها چطور است؟"], en: ["What's the current level?"] },
          chips: [
            { v: "beginner", fa: "مبتدی", en: "Beginner", match: ["مبتدی", "صفر", "تازه کار", "هیچی بلد نیستم", "beginner", "basic", "new", "zero"] },
            { v: "intermediate", fa: "متوسط", en: "Intermediate", match: ["متوسط", "یکم بلدم", "intermediate", "some experience"] },
            { v: "advanced", fa: "پیشرفته", en: "Advanced", match: ["پیشرفته", "حرفه ای", "advanced", "expert", "pro"] }
          ] },
        { id: "format", type: "location", label: { fa: "نحوه‌ی برگزاری", en: "Format" },
          ask: { fa: ["ترجیح می‌دهید حضوری باشد یا آنلاین؟"], en: ["Would you prefer in person or online?"] },
          chips: [LOCATION_CHIPS[0], { v: "remote", fa: "آنلاین", en: "Online", match: ["آنلاین", "انلاین", "مجازی", "اسکایپ", "گوگل میت", "online", "zoom", "virtual"] }] },
        { id: "schedule", type: "timeline", optional: true, label: { fa: "زمان", en: "Schedule" },
          ask: { fa: ["از چه زمانی و با چه برنامه‌ای؟ (مثلاً هفته‌ای دو جلسه از ماه آینده)"], en: ["When would you like to start, and how often? (e.g. twice a week from next month)"] },
          chips: TIMELINE_CHIPS },
        { id: "budget", type: "money", optional: true, label: { fa: "بودجه", en: "Budget" },
          ask: { fa: ["بودجه‌ای برای این دوره در نظر دارید؟"], en: ["Do you have a budget for the training?"] },
          chips: BUDGET_CHIPS }
      ]
    },
    {
      id: "collaboration", emoji: "🤝",
      label: { fa: "همکاری", en: "Collaboration" },
      chip: { fa: "🤝 پیشنهاد همکاری", en: "🤝 Collaboration" },
      keywords: [["همکاری", 2], ["شراکت", 3], ["شریک", 3], ["مشارکت", 2.5], ["پارتنر", 3], ["استارتاپ", 2.5], ["ایده", 2], ["تیم بشیم", 3], ["با هم کار کنیم", 3],
        ["collaboration", 3], ["collaborate", 3], ["partner", 3], ["partnership", 3], ["startup", 2.5], ["idea", 2], ["team up", 3], ["work together", 2.5], ["co founder", 3], ["cofounder", 3]],
      examples: ["یه ایده استارتاپی دارم میخوام با هم کار کنیم", "پیشنهاد همکاری دارم", "I'd like to partner with you on an idea"],
      slots: [
        { id: "kind", type: "longtext", label: { fa: "نوع همکاری", en: "Collaboration" },
          ask: { fa: ["چه نوع همکاری‌ای در ذهن دارید؟ کمی از ایده یا پروژه بگویید."], en: ["What kind of collaboration do you have in mind? Tell me a bit about the idea."] } },
        { id: "organization", type: "text", optional: true, label: { fa: "مجموعه", en: "Organisation" },
          ask: { fa: ["از طرف خودتان هستید یا یک شرکت یا تیم؟ اگر تیمی هست، اسمش چیست؟"], en: ["Is this just you, or a company or team? What's it called?"] },
          chips: [{ v: "self", fa: "خودم هستم", en: "Just me" }] },
        { id: "sepehr_role", type: "longtext", optional: true, label: { fa: "نقش سپهر", en: "Sepehr's role" },
          ask: { fa: ["نقش سپهر در این همکاری چه خواهد بود؟"], en: ["What would Sepehr's role be?"] } },
        { id: "timeline", type: "timeline", optional: true, label: { fa: "زمان‌بندی", en: "Timeline" },
          ask: { fa: ["برای شروع، زمان خاصی در نظر دارید؟"], en: ["Any timeline in mind for getting started?"] },
          chips: TIMELINE_CHIPS }
      ]
    },
    {
      id: "other", emoji: "💬",
      label: { fa: "سایر", en: "Other" },
      chip: { fa: "💬 موضوع دیگری دارم", en: "💬 Something else" },
      keywords: [["موضوع دیگه", 3], ["یه سوال دیگه", 2], ["چیز دیگه", 2.5], ["something else", 3], ["other", 1.5], ["different", 1]],
      examples: [],
      slots: [
        { id: "description", type: "longtext", label: { fa: "موضوع", en: "Topic" },
          ask: { fa: ["بفرمایید؛ در چند جمله موضوع را توضیح بدهید تا دقیق به سپهر برسانم."], en: ["Sure — describe it in a few sentences and I'll pass it on to Sepehr accurately."] } },
        { id: "timeline", type: "timeline", optional: true, label: { fa: "زمان‌بندی", en: "Timeline" },
          ask: { fa: ["زمان خاصی مد نظرتان هست؟"], en: ["Is there any timing I should mention?"] },
          chips: TIMELINE_CHIPS }
      ]
    }
  ];

  // ── Contact questions, asked once the request is clear ──────
  const CONTACT_SLOTS = [
    { id: "name", type: "name", label: { fa: "نام", en: "Name" },
      ask: { fa: ["خیلی خوب، تقریباً تمام است. اسمتان را بفرمایید تا سپهر بداند با چه کسی صحبت می‌کند.", "عالی، فقط چند مورد مانده. لطفاً اسمتان را بنویسید."], en: ["Great, almost done. What's your name, so Sepehr knows who he's talking to?", "Perfect, just a couple more things. What's your name?"] } },
    { id: "contact_method", type: "choice", label: { fa: "راه تماس", en: "Contact method" },
      ask: { fa: ["{name}، سپهر ترجیحاً از چه راهی با شما تماس بگیرد؟", "از چه راهی راحت‌ترید سپهر با شما در ارتباط باشد؟"], en: ["{name}, how would you like Sepehr to get back to you?", "What's the best way for Sepehr to reach you?"] },
      chips: [
        { v: "email", fa: "📧 ایمیل", en: "📧 Email", match: ["ایمیل", "میل", "جیمیل", "email", "e mail", "mail", "gmail"] },
        { v: "phone", fa: "📞 تماس تلفنی", en: "📞 Phone call", match: ["تماس", "تلفن", "زنگ", "موبایل", "شماره", "phone", "call", "mobile", "ring"] },
        { v: "whatsapp", fa: "💬 واتساپ", en: "💬 WhatsApp", match: ["واتساپ", "واتس اپ", "واتس", "whatsapp", "whats app"] },
        { v: "telegram", fa: "✈️ تلگرام", en: "✈️ Telegram", match: ["تلگرام", "telegram"] }
      ] },
    { id: "email", type: "email", label: { fa: "ایمیل", en: "Email" },
      ask: { fa: ["ایمیلتان را بنویسید."], en: ["What's your email address?"] } },
    { id: "phone", type: "phone", label: { fa: "شماره تماس", en: "Phone" },
      ask: { fa: ["شماره‌تان را بنویسید (مثلاً ۰۹۱۲۳۴۵۶۷۸۹)."], en: ["What's your number? (e.g. +98 912 345 6789)"] } },
    { id: "notes", type: "longtext", optional: true, label: { fa: "توضیحات بیشتر", en: "Extra notes" },
      ask: { fa: ["چیز دیگری هست که بخواهید اضافه کنید؟"], en: ["Anything else you'd like to add?"] },
      chips: [{ v: "skip", fa: "نه، همین کافی است", en: "No, that's everything" }] }
  ];

  // ── Questions about Sepehr, small talk and chat commands ────
  // `answer` builds the reply from config.js so it stays up to date.
  const INTENTS = [
    { id: "greet", keywords: [["سلام", 3], ["درود", 3], ["صبح بخیر", 3], ["عصر بخیر", 3], ["شب بخیر", 2], ["وقت بخیر", 3], ["سلام علیکم", 3], ["hi", 3], ["hello", 3], ["hey", 3], ["good morning", 3], ["good evening", 3], ["good afternoon", 3], ["howdy", 3]] },
    { id: "have_question", keywords: [["یه سوال", 3], ["یک سوال", 3], ["سوال داشتم", 3.5], ["سوالی داشتم", 3.5], ["سوال دارم", 3.5], ["میخواستم بپرسم", 3.5], ["a question", 3], ["quick question", 3.5], ["i have a question", 3.5], ["can i ask", 3]] },
    { id: "how_are_you", keywords: [["خوبی", 3], ["چطوری", 3], ["حالت چطوره", 3], ["چه خبر", 2.5], ["how are you", 3], ["how's it going", 3], ["what's up", 2.5], ["sup", 2]] },
    { id: "thanks", keywords: [["ممنون", 3], ["مرسی", 3], ["متشکرم", 3], ["تشکر", 3], ["سپاس", 3], ["دمت گرم", 3], ["لطف کردی", 3], ["thanks", 3], ["thank you", 3], ["thx", 3], ["appreciate", 3], ["cheers", 2]] },
    { id: "bye", keywords: [["خداحافظ", 3], ["خدانگهدار", 3], ["بای", 3], ["فعلا", 1.5], ["bye", 3], ["goodbye", 3], ["see you", 3], ["later", 1]] },
    { id: "about", keywords: [["سپهر کیه", 4], ["سپهر کی هست", 4], ["درباره سپهر", 4], ["درباره خودت", 3], ["معرفی کن", 3], ["خودتو معرفی", 3], ["چیکاره", 3], ["who is sepehr", 4], ["about sepehr", 4], ["tell me about", 3], ["who are you", 2], ["introduce", 2.5]] },
    { id: "skills", keywords: [["مهارت", 3], ["مهارتها", 3], ["تخصص", 3], ["بلدی", 2.5], ["بلده", 2.5], ["چه کارهایی", 2.5], ["چیکار میکنه", 2.5], ["توانایی", 2.5], ["skills", 3], ["skill", 3], ["expertise", 3], ["what can he do", 3], ["good at", 2.5], ["specialty", 3], ["capable", 2]] },
    { id: "certs", keywords: [["مدرک", 3], ["مدارک", 3], ["گواهینامه", 3], ["سرتیفیکیت", 3], ["دوره هایی", 2], ["دوره گذروندی", 3], ["ccna داری", 3], ["certificate", 3], ["certificates", 3], ["certification", 3], ["certified", 3], ["qualifications", 3], ["credentials", 3]] },
    { id: "experience", keywords: [["سابقه", 3], ["تجربه", 3], ["کجا کار", 3], ["کجا کار میکنی", 3.5], ["محل کار", 2.5], ["سابقه کار", 3.5], ["experience", 3], ["work history", 3], ["where does he work", 3.5], ["where do you work", 3.5], ["background", 2.5], ["years", 1]] },
    { id: "education", keywords: [["دانشگاه", 3], ["تحصیلات", 3], ["رشته", 3], ["درس میخونی", 3], ["دانشجو", 2.5], ["education", 3], ["university", 3], ["degree", 3], ["study", 2.5], ["studying", 2.5], ["college", 3], ["student", 2.5]] },
    { id: "location", keywords: [["کجایی", 3], ["کجا هستی", 3], ["کجا زندگی", 3], ["کدوم شهر", 3], ["چه شهری", 3], ["آدرس", 2.5], ["where are you", 3], ["where is he", 3], ["located", 3], ["based", 2.5], ["which city", 3], ["address", 2.5]] },
    { id: "availability", keywords: [["در دسترس", 3], ["وقت آزاد", 3], ["وقت داری", 3], ["سرت شلوغه", 3], ["آماده همکاری", 3], ["میتونی شروع کنی", 3], ["available", 3], ["availability", 3], ["free time", 3], ["open to work", 3], ["busy", 2], ["can you start", 3]] },
    { id: "rates", keywords: [["قیمت", 3], ["هزینه", 3], ["دستمزد", 3], ["چقدر میگیری", 4], ["چقدر میگیره", 4], ["چند میگیری", 4], ["نرخ", 3], ["تعرفه", 3], ["هزینش", 3], ["price", 3], ["cost", 3], ["rate", 2.5], ["rates", 3], ["how much", 3], ["fee", 3], ["charge", 2.5], ["quote", 2.5], ["pricing", 3]],
      negative: ["بودجه", "budget"] },
    { id: "contact_direct", keywords: [["شمارت", 3.5], ["شماره سپهر", 4], ["شماره تماس سپهر", 4], ["ایمیل سپهر", 4], ["ایمیلت", 3], ["واتساپت", 3.5], ["تماس مستقیم", 4], ["چطوری باهاش تماس", 4], ["راه ارتباطی", 3], ["his number", 4], ["his email", 4], ["your number", 3.5], ["your email", 3], ["contact him", 4], ["reach him", 4], ["phone number", 2.5], ["contact directly", 4], ["contact details", 3.5]] },
    { id: "human", keywords: [["با خودش", 3.5], ["با خود سپهر", 4], ["آدم واقعی", 4], ["اپراتور", 3.5], ["انسان", 3], ["خودش جواب بده", 4], ["human", 3.5], ["real person", 4], ["talk to sepehr", 4], ["speak to sepehr", 4], ["operator", 3.5], ["live agent", 4], ["agent", 1.5]] },
    { id: "bot", keywords: [["ربات هستی", 4], ["رباتی", 3.5], ["ربات", 2], ["هوش مصنوعی", 3.5], ["آدمی", 3], ["تو کی هستی", 3.5], ["تو چی هستی", 3.5], ["چت جی پی تی", 3.5], ["are you a bot", 4], ["are you human", 4], ["are you real", 4], ["robot", 3], ["chatgpt", 3.5], ["are you ai", 4], ["artificial intelligence", 3.5], ["what are you", 3]] },
    { id: "help", keywords: [["چیکار میتونی", 4], ["چه کاری میتونی", 4], ["راهنما", 3], ["راهنمایی", 2.5], ["کمکم کن", 2.5], ["چطور کار میکنی", 3.5], ["help", 3], ["what can you do", 4], ["how does this work", 3.5], ["options", 2.5], ["menu", 2.5]] },
    { id: "joke", keywords: [["جوک", 4], ["لطیفه", 4], ["بخندون", 4], ["یه چیز خنده دار", 4], ["joke", 4], ["make me laugh", 4], ["something funny", 4]] },
    { id: "languages", keywords: [["چه زبانی", 3.5], ["زبان انگلیسی", 3], ["انگلیسی بلد", 3.5], ["انگلیسیش", 3], ["دولینگو", 3], ["languages", 3.5], ["speak english", 3.5], ["english level", 3.5], ["duolingo", 3]] },
    { id: "projects", keywords: [["قبلا ساخته", 3.5], ["قبلا انجام داده", 3.5], ["تا حالا ساخته", 3.5], ["has he built", 3.5], ["has he done", 3.5], ["done before", 3], ["نمونه کار", 4], ["پروژه هات", 3.5], ["پروژه های قبلی", 3.5], ["کتاب", 2.5], ["portfolio", 4], ["previous work", 3.5], ["past projects", 3.5], ["samples", 3], ["book", 2]] },
    { id: "restart", keywords: [["از اول", 4], ["شروع دوباره", 4], ["دوباره شروع", 4], ["ریست", 3.5], ["از نو", 3.5], ["restart", 4], ["start over", 4], ["reset", 3.5], ["new chat", 4], ["begin again", 4]] },
    { id: "back", keywords: [["برگرد", 3.5], ["سوال قبلی", 4], ["قبلی", 2.5], ["عقب", 3], ["اشتباه زدم", 3.5], ["go back", 4], ["previous question", 4], ["undo", 4], ["back", 2.5]] },
    { id: "frustration", keywords: [["مسخره", 3.5], ["احمق", 4], ["به درد نخور", 4], ["بدرد نخور", 4], ["خسته شدم", 3.5], ["اذیت", 3], ["چرت", 3.5], ["افتضاح", 3.5], ["خنگ", 4], ["stupid", 4], ["useless", 4], ["annoying", 3.5], ["waste of time", 4], ["dumb", 4], ["ridiculous", 3.5], ["terrible", 3]] },
    { id: "edit", keywords: [["عوض کن", 3], ["عوض کنم", 3], ["تغییر بده", 3], ["تغییر بدم", 3], ["اصلاح کن", 3], ["اصلاح کنم", 3], ["ویرایش", 3], ["درستش کن", 2.5], ["اشتباه گفتم", 3], ["اشتباه نوشتم", 3], ["change my", 3.5], ["change the", 3], ["edit", 3], ["update my", 3.5], ["correct my", 3.5], ["fix my", 3], ["i meant", 2.5], ["typo", 2.5]] }
  ];

  // Which saved field an "edit …" request is about
  const EDIT_FIELDS = [
    ["email", ["ایمیل", "email", "mail"]],
    ["phone", ["شماره", "تلفن", "موبایل", "phone", "number", "mobile"]],
    ["name", ["اسم", "نام", "name"]],
    ["contact_method", ["راه تماس", "contact method", "how to contact"]],
    ["budget", ["بودجه", "budget"]],
    ["salary", ["حقوق", "salary"]],
    ["timeline", ["زمان", "زمانبندی", "تاریخ", "deadline", "timeline", "date"]],
    ["work_mode", ["محل", "حضوری", "دورکاری", "location", "remote", "onsite"]],
    ["company", ["شرکت", "company"]],
    ["category", ["موضوع", "دسته", "category", "topic"]]
  ];

  // ── Reusable phrases ────────────────────────────────────────
  const PHRASES = {
    greetHello: { fa: ["سلام{name}! 👋", "درود{name}! 👋"], en: ["Hi{name}! 👋", "Hello{name}! 👋"] },
    intro: {
      fa: ["من دستیار سپهر هستم. بگویید به چه کمکی نیاز دارید: پیشنهاد کار، یک پروژه، پشتیبانی فنی یا هر چیز دیگر. چند سؤال کوتاه می‌پرسم و همه‌چیز را دسته‌بندی‌شده برای سپهر می‌فرستم."],
      en: ["I'm Sepehr's assistant. Tell me what you need — a job offer, a project, tech support or anything else. I'll ask a few short questions and send everything to Sepehr, neatly organised."]
    },
    askWhat: { fa: ["موضوعتان کدام است؟ می‌توانید بنویسید یا یکی از این‌ها را انتخاب کنید:", "در چه زمینه‌ای می‌توانم کمک کنم؟"], en: ["What's it about? Type it in your own words or pick one:", "What can I help you with?"] },
    unclear: { fa: ["مطمئن نیستم درست متوجه شدم. کمی بیشتر توضیح می‌دهید، یا یکی از این گزینه‌ها را انتخاب کنید؟", "می‌شود کمی واضح‌تر بگویید موضوع چیست؟ یا از گزینه‌های زیر انتخاب کنید:"], en: ["I'm not sure I got that. Could you say a bit more, or pick one of these?", "Could you tell me a little more about what you need? Or choose below:"] },
    gotCategory: { fa: ["متوجه شدم، موضوع «{cat}» است. {ack}", "عالی، پس درباره‌ی «{cat}» است. {ack}"], en: ["Got it — this is about “{cat}”. {ack}", "Great, so it's a “{cat}” request. {ack}"] },
    ack: { fa: ["ممنون.", "عالی 👌", "باشه، یادداشت کردم.", "خیلی خوب.", "روشن شد."], en: ["Thanks.", "Great 👌", "Got it, noted.", "Perfect.", "Understood."] },
    noted: { fa: ["این‌ها را هم یادداشت کردم: {list}.", "از پیامتان این را هم برداشتم: {list}."], en: ["I've also noted: {list}.", "From your message I also picked up: {list}."] },
    resume: { fa: ["خب، برگردیم سر سؤال قبلی:", "حالا ادامه بدهیم:"], en: ["Now, back to my question:", "Let's carry on:"] },
    skipped: { fa: ["مشکلی نیست، رد می‌شویم.", "باشه، این را خالی می‌گذارم."], en: ["No problem, let's skip that.", "Sure, I'll leave that blank."] },
    cantSkip: { fa: ["این یکی برای سپهر مهم است تا بتواند کمک کند؛ حتی یک توضیح کوتاه هم کافی است.", "برای این سؤال یک جواب کوتاه لازم است تا درخواستتان کامل باشد."], en: ["Sepehr needs this one to be able to help — even a short answer is fine.", "I need a short answer to this one so your request is complete."] },
    tooShort: { fa: ["می‌شود کمی بیشتر توضیح بدهید؟ هرچه دقیق‌تر باشد، سپهر سریع‌تر می‌تواند کمک کند."], en: ["Could you add a bit more detail? The more specific, the faster Sepehr can help."] },
    badEmail: { fa: ["به نظر می‌رسد این ایمیل کامل نیست. لطفاً دوباره بنویسید (مثلاً name@gmail.com)."], en: ["That email doesn't look complete. Could you type it again? (e.g. name@gmail.com)"] },
    badPhone: { fa: ["این شماره را نتوانستم بخوانم. لطفاً به شکل ۰۹۱۲۳۴۵۶۷۸۹ یا با کد کشور بنویسید."], en: ["I couldn't read that number. Please write it like 09123456789 or with the country code."] },
    switchMethod: { fa: ["اگر راحت‌ترید، می‌توانید راه تماس دیگری انتخاب کنید."], en: ["If it's easier, you can choose another way to be contacted."] },
    badName: { fa: ["فقط اسمتان را بنویسید (مثلاً علی رضایی)."], en: ["Just your name, please (e.g. Ali Rezaei)."] },
    needNumber: { fa: ["یک عدد تقریبی کافی است (مثلاً ۱۰ یا حدود ۵۰)."], en: ["A rough number is fine (e.g. 10 or about 50)."] },
    pickOne: { fa: ["لطفاً یکی از گزینه‌ها را انتخاب کنید یا با کلمات خودتان بنویسید."], en: ["Please pick one of the options, or describe it in your own words."] },
    summaryIntro: { fa: ["این خلاصه‌ی درخواست شماست. اگر همه‌چیز درست است، «ارسال» را بزنید؛ وگرنه روی هر مورد که باید عوض شود بزنید."], en: ["Here's a summary of your request. If it all looks right, tap “Send”; otherwise tap anything you'd like to change."] },
    confirmPrompt: { fa: ["همه‌چیز درست است؟"], en: ["Does everything look right?"] },
    whichEdit: { fa: ["کدام مورد را می‌خواهید عوض کنید؟"], en: ["Which part would you like to change?"] },
    editAsk: { fa: ["باشه، {field} را دوباره بنویسید:"], en: ["Sure, what should {field} be?"] },
    sending: { fa: ["در حال ارسال برای سپهر…"], en: ["Sending it to Sepehr…"] },
    sent: { fa: ["✅ درخواستتان برای سپهر ارسال شد. معمولاً ظرف ۲۴ ساعت از طریق {method} با شما تماس می‌گیرد. ممنون{name}!"], en: ["✅ Your request has been sent to Sepehr. He usually gets back within 24 hours by {method}. Thank you{name}!"] },
    afterDone: { fa: ["درخواست قبلی‌تان ارسال شده. اگر موضوع دیگری دارید، یک گفتگوی جدید شروع کنیم؟"], en: ["Your last request has already been sent. Want to start a new one?"] },
    restarted: { fa: ["از اول شروع می‌کنیم. 🙂"], en: ["Let's start over. 🙂"] },
    backDone: { fa: ["باشه، برگشتیم یک قدم عقب."], en: ["Okay, going back one step."] },
    nothingBack: { fa: ["هنوز سؤالی جواب نداده‌اید که بخواهیم به آن برگردیم."], en: ["There's nothing to go back to yet."] },
    switchCat: { fa: ["به نظر می‌رسد موضوعتان «{cat}» است. موضوع را به این تغییر بدهم؟"], en: ["It sounds like this is about “{cat}”. Shall I switch to that?"] },
    pentestWarn: { fa: ["نکته: سپهر فقط با مجوز مالک سیستم تست نفوذ انجام می‌دهد. این را در درخواست ذکر می‌کنم تا درباره‌اش صحبت کنید."], en: ["Note: Sepehr only runs pentests with the system owner's permission. I'll mention it in your request so you can discuss it."] },
    incidentTip: { fa: ["تا تماس سپهر، اگر می‌توانید سیستم‌های آلوده را از شبکه جدا کنید، اما خاموششان نکنید و چیزی پاک نکنید."], en: ["Until Sepehr gets in touch: if you can, disconnect affected machines from the network, but don't switch them off or delete anything."] },
    frustration: { fa: ["متأسفم اگر کمکم کافی نبود 🙏 اگر ترجیح می‌دهید، می‌توانید مستقیم با خود سپهر تماس بگیرید:"], en: ["Sorry if I haven't been much help 🙏 If you'd rather, you can reach Sepehr directly:"] },
    guessCategory: { fa: ["فکر کنم موضوعتان یکی از این‌هاست، درست است؟ اگر نه، کمی بیشتر توضیح بدهید."], en: ["I think it's one of these — is that right? If not, tell me a bit more."] },
    whichCategory: { fa: ["منظورتان «{a}» است یا «{b}»؟"], en: ["Is this about “{a}” or “{b}”?"] },
    aboutUnknown: { fa: ["این را سپهر خودش دقیق‌تر جواب می‌دهد؛ سؤالتان را در درخواست می‌نویسم. سوابق و نمونه‌کارهایش هم در همین صفحه هست."], en: ["Sepehr can answer that best himself — I'll include your question in the request. His experience and projects are on this page too."] },
    goAhead: { fa: ["بفرمایید، می‌شنوم:"], en: ["Sure, go ahead:"] },
    fallbackMid: { fa: ["متوجه شدم. "], en: ["I see. "] }
  };

  // Answers about Sepehr, built from config.js
  function answerFor(id, ctx) {
    const { cv, lang, tr, num, faDigits } = ctx;
    const fa = lang === "fa";
    const job = (cv.experience || [])[0];
    const edu = (cv.education || [])[0];
    const certs = (cv.certifications || []).map((c) => tr(c.name));
    const c = cv.contact || {};
    const list = (arr) => (fa ? arr.join("، ") : arr.length > 1 ? arr.slice(0, -1).join(", ") + " and " + arr[arr.length - 1] : arr.join(""));
    switch (id) {
      case "about":
        return fa
          ? `سپهر نیاز ${job ? `${tr(job.role)} در ${tr(job.company)}` : tr(cv.title)} است${edu ? ` و ${tr(edu.degree)} را در ${tr(edu.school)} می‌خواند` : ""}. در شبکه، امنیت و پشتیبانی سیستم‌ها کار می‌کند و ${num(certs.length)} دوره‌ی تخصصی گذرانده است.`
          : `Sepehr Niaz is ${job ? `an ${tr(job.role)} at ${tr(job.company)}` : tr(cv.title)}${edu ? `, studying ${tr(edu.degree)} at ${tr(edu.school)}` : ""}. He works across networking, security and systems support, and has completed ${certs.length} specialist courses.`;
      case "skills": {
        const groups = (cv.skills || []).map((g) => (typeof g === "string" ? g : `${tr(g.group)}: ${(tr(g.items) || []).slice(0, 4).join(fa ? "، " : ", ")}`));
        return (fa ? "مهم‌ترین مهارت‌های سپهر:\n" : "Sepehr's main skills:\n") + groups.map((g) => `• ${g}`).join("\n");
      }
      case "certs":
        return (fa ? "دوره‌ها و گواهینامه‌های سپهر:\n" : "Sepehr's courses and certificates:\n") + certs.map((x) => `• ${x}`).join("\n") + (fa ? "\nفایل همه‌شان در بخش «گواهینامه‌ها» همین صفحه هست." : "\nYou can open each one in the Certificates section of this page.");
      case "experience":
        if (!job) return fa ? "جزئیات سابقه‌ی کار در بخش «سوابق کاری» همین صفحه آمده است." : "His work history is in the Experience section of this page.";
        return fa
          ? `سپهر از ${tr(job.period).split("—")[0].trim()} ${tr(job.role)} ${tr(job.company)} است: پشتیبانی کامپیوترها و شبکه، دوربین‌های مداربسته، VPN و سامانه‌ها، صوت و تصویر همایش‌ها و مدیریت اینستاگرام هتل.`
          : `Since ${tr(job.period).split("—")[0].trim()}, Sepehr has been ${tr(job.role)} at ${tr(job.company)}: computers and network support, CCTV, VPN and hotel systems, event audio/video and the hotel's Instagram.`;
      case "education":
        return edu ? (fa ? `سپهر دانشجوی ${tr(edu.degree)} در ${tr(edu.school)} است (${tr(edu.period)}).` : `Sepehr is studying ${tr(edu.degree)} at ${tr(edu.school)} (${tr(edu.period)}).`) : "";
      case "location":
        return fa ? `سپهر در ${tr(cv.location)} است و هم حضوری در شیراز و هم از راه دور کار می‌کند.` : `Sepehr is based in ${tr(cv.location)} and works both on-site in Shiraz and remotely.`;
      case "availability":
        return fa ? `${tr(cv.available) || "سپهر"} — برای اینکه دقیق بررسی کند، بگویید چه کاری در نظر دارید تا جزئیات را برایش بفرستم.` : `${tr(cv.available) || "Sepehr is available"} — tell me what you have in mind and I'll send him the details so he can check.`;
      case "rates":
        return fa ? "هزینه به نوع و اندازه‌ی کار بستگی دارد، برای همین سپهر بعد از دیدن جزئیات قیمت می‌دهد. اگر بگویید چه کاری لازم دارید، درخواستتان را کامل برایش می‌فرستم." : "It depends on the kind and size of the work, so Sepehr quotes once he's seen the details. Tell me what you need and I'll send him a complete request.";
      case "contact_direct": {
        const parts = [];
        if (c.email) parts.push(`📧 ${c.email}`);
        if (c.phone) parts.push(`📞 ${c.phone}`);
        if (c.phone && c.whatsapp) parts.push(fa ? "💬 واتساپ: همان شماره" : "💬 WhatsApp: same number");
        return (fa ? "راه‌های تماس مستقیم با سپهر:\n" : "You can reach Sepehr directly:\n") + parts.join("\n") + (fa ? "\nیا همین‌جا درخواستتان را بگویید تا مرتب برایش بفرستم." : "\nOr tell me here and I'll send him a tidy summary.");
      }
      case "languages":
        return list((cv.languages || []).map((l) => `${tr(l.name)} (${tr(l.level)})`)) || "";
      case "projects":
        return (fa ? "چند نمونه از کارهای سپهر:\n" : "A few things Sepehr has made:\n") +
          (cv.portfolio || []).concat(cv.projects || []).map((p) => `• ${tr(p.name)}${p.tagline ? ` — ${tr(p.tagline)}` : ""}`).join("\n") +
          ((cv.portfolio || []).length ? (fa ? "\n\nجزئیات و کد هرکدام در بخش «پروژه‌ها» همین صفحه هست." : "\n\nDetails and code for each are in the Projects section of this page.") : "") +
          ((cv.library || []).filter((b) => !b.lang || b.lang === lang).length ? (fa ? `\n\n📚 کتاب: ${(cv.library || []).filter((b) => !b.lang || b.lang === lang).map((b) => `«${tr(b.title)}»`).join("، ")} — رایگان، در بخش «مقالات و کتاب‌ها».` : `\n\n📚 Book: ${(cv.library || []).filter((b) => !b.lang || b.lang === lang).map((b) => `“${tr(b.title)}”`).join(", ")} — free, in the Articles & books section.`) : "");
      default:
        return "";
    }
  }

  const JOKES = {
    fa: ["چرا برنامه‌نویس‌ها طبیعت را دوست ندارند؟ چون باگ زیاد دارد! 🐛", "به روتر گفتم حالت خوبه؟ گفت: پینگ بده تا بگم! 😄", "یک بسته‌ی UDP می‌خواستم برایتان بفرستم، ولی معلوم نیست برسد! 📦"],
    en: ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛", "I'd tell you a UDP joke, but you might not get it. 📦", "There are 10 kinds of people: those who understand binary and those who don't. 😄"]
  };

  root.SepehrBot = root.SepehrBot || {};
  root.SepehrBot.knowledge = { CATEGORIES, CONTACT_SLOTS, INTENTS, EDIT_FIELDS, PHRASES, JOKES, answerFor };
})(typeof window !== "undefined" ? window : globalThis);
