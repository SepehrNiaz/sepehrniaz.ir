// Tests for the site assistant. Run from the repository folder with:  node --test
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(ROOT, "config.js"), "utf8"), sandbox);
const CV = sandbox.window.CV;
require(path.join(ROOT, "bot/nlu.js"));
require(path.join(ROOT, "bot/knowledge.js"));
require(path.join(ROOT, "bot/engine.js"));
const { nlu, knowledge: K, createEngine, emailPayload } = globalThis.SepehrBot;

const MORNING = () => new Date("2026-10-30T10:00:00");
const newBot = (lang = "fa") => {
  const bot = createEngine({ cv: CV, lang, now: MORNING });
  bot.start();
  return bot;
};
const text = (r) => r.bubbles.map((b) => b.text).join("\n");
const chips = (r) => r.bubbles.flatMap((b) => (b.chips || []).map((c) => c.label));
const cmd = (bot, c, label) => bot.handle(bot.CMD + c, label || c);
const card = (r) => r.bubbles.find((b) => b.card);

// ── Language understanding ───────────────────────────────────
test("normalises Persian/Arabic letters and digits", () => {
  assert.equal(nlu.normalize("كيف ۱۲۳ ٤٥"), "کیف 123 45");
  assert.equal(nlu.toFaDigits("2026"), "۲۰۲۶");
});

test("extracts Iranian phone numbers in any format", () => {
  assert.equal(nlu.extractPhone("۰۹۱۷ ۷۸۸ ۶۲۹۱"), "+989177886291");
  assert.equal(nlu.extractPhone("call +98 912 345 6789"), "+989123456789");
  assert.equal(nlu.extractPhone("00989121112233"), "+989121112233");
  assert.equal(nlu.extractPhone("9351112233"), "+989351112233");
  assert.equal(nlu.extractPhone("۰۷۱-۳۲۳۴۵۶۷۸"), "+987132345678");
  assert.equal(nlu.extractPhone("20 computers"), null);
});

test("extracts emails and ignores them when detecting language", () => {
  assert.equal(nlu.extractEmail("ایمیلم Ali.R@Gmail.com هست"), "ali.r@gmail.com");
  assert.equal(nlu.detectLanguage("maryam@gmail.com"), null);
  assert.equal(nlu.detectLanguage("سلام maryam@gmail.com"), "fa");
  assert.equal(nlu.detectLanguage("I need help"), "en");
  assert.equal(nlu.detectLanguage("CCNA"), null);
});

test("understands budgets and salaries", () => {
  const f = (s, l = "fa") => nlu.formatMoney(nlu.extractMoney(s), l);
  assert.equal(f("حدود ۵۰ میلیون"), "حدود ۵۰ میلیون تومان");
  assert.equal(f("بین ۲۰ تا ۳۰ میلیون تومان"), "بین ۲۰ تا ۳۰ میلیون تومان");
  assert.equal(f("حقوق پانزده میلیون"), "حدود ۱۵ میلیون تومان");
  assert.equal(f("between 10 and 15 million toman", "en"), "10 – 15 million toman");
  assert.equal(f("budget $2000", "en"), "about $2K");
  assert.equal(f("۵۰۰ میلیون ریال"), "حدود ۵۰ میلیون تومان");
  assert.equal(f("تا سقف ۱۰ میلیون"), "تا سقف ۱۰ میلیون تومان");
  assert.ok(nlu.extractMoney("توافقی").negotiable);
  assert.equal(nlu.extractMoney("۲۰ تا کامپیوتر"), null);
  assert.equal(nlu.extractMoney("نمیدونم"), null);
});

test("counts devices and people, including spelled-out numbers", () => {
  assert.deepEqual(nlu.extractCounts("۲۰ تا کامپیوتر داریم"), { device: 20 });
  assert.deepEqual(nlu.extractCounts("بیست و پنج نفر کارمند"), { user: 25 });
  assert.deepEqual(nlu.extractCounts("twelve cameras and 40 users"), { camera: 12, user: 40 });
  assert.deepEqual(nlu.extractCounts("نه، درسته"), {});
});

test("reads timelines and urgency", () => {
  assert.equal(nlu.extractTimeline("همین الان").urgency, "high");
  assert.equal(nlu.extractTimeline("تا هفته بعد").fa, "هفته‌ی آینده");
  assert.equal(nlu.extractTimeline("ظرف ۳ روز").urgency, "high");
  assert.equal(nlu.extractTimeline("in 2 months").urgency, "low");
  assert.equal(nlu.extractTimeline("no rush").urgency, "low");
  assert.equal(nlu.extractTimeline("۱۵ آذر").fa, "۱۵ آذر");
  // Month names inside other words are not dates
  assert.equal(nlu.extractTimeline("مریم احمدی"), null);
  assert.equal(nlu.extractTimeline("فرقی نمیکنه"), null);
});

test("finds places and work modes", () => {
  assert.deepEqual(nlu.extractLocation("دفترمون تو شیراز"), { city: "Shiraz" });
  assert.equal(nlu.extractLocation("دورکاری").mode, "remote");
  assert.equal(nlu.extractLocation("onsite in Tehran").city, "Tehran");
});

test("recognises names and rejects non-names", () => {
  assert.equal(nlu.extractName("اسمم علی رضایی است"), "علی رضایی");
  assert.equal(nlu.extractName("من مریم احمدی هستم از شرکت پارس"), "مریم احمدی");
  assert.equal(nlu.extractName("Hi, my name is john smith from Acme"), "John Smith");
  assert.equal(nlu.extractName("I'm looking for a network engineer"), null);
  assert.equal(nlu.extractName("سارا", true), "سارا");
  assert.equal(nlu.extractName("همین امروز اگه بشه", true), null);
  assert.equal(nlu.extractName("آقای کریمی", true), "آقای کریمی");
});

test("yes / no / skip", () => {
  assert.ok(nlu.isYes("آره درسته") && nlu.isYes("yes please") && nlu.isYes("اوکی"));
  assert.ok(nlu.isNo("نه ممنون") && nlu.isNo("nope"));
  assert.ok(nlu.isSkip("نمیدونم والا") && nlu.isSkip("I don't know") && nlu.isSkip("dont know"));
  assert.ok(!nlu.isSkip("پسوردم را عوض کن"));
});

test("sorts requests into the right category", () => {
  const cases = {
    "سلام، میخوام استخدامتون کنیم برای پشتیبانی شبکه": "job_offer",
    "We're hiring an IT technician": "job_offer",
    "پرینترم کار نمیکنه": "it_support",
    "my laptop wont turn on since this morning": "it_support",
    "کامپیوترم خیلی کند شده": "it_support",
    "سرورمون هک شده کمک!": "network_security",
    "need a pentest for our web app": "network_security",
    "میخوام شبکه شرکتمو راه اندازی کنی": "network_security",
    "یه سایت برای فروشگاهم میخوام": "freelance_project",
    "میخوام لینوکس یاد بگیرم": "training",
    "میخوام کارمندامون امنیت یاد بگیرن": "training",
    "یه ایده استارتاپی دارم میخوام با هم کار کنیم": "collaboration"
  };
  for (const [s, want] of Object.entries(cases)) assert.equal(nlu.classify(s, K.CATEGORIES)[0].id, want, s);
});

test("recognises questions about Sepehr and chat commands", () => {
  const cases = { "چقدر میگیری؟": "rates", "سپهر کیه؟": "about", "مدرک ccna داری؟": "certs", "ربات هستی؟": "bot", "از اول": "restart", "مرسی": "thanks", "what are his skills": "skills", "I want to talk to sepehr": "human", "کجا کار میکنی": "experience" };
  for (const [s, want] of Object.entries(cases)) assert.equal(nlu.classify(s, K.INTENTS)[0].id, want, s);
});

// ── Conversations ────────────────────────────────────────────
test("fills several answers from one detailed message", () => {
  const bot = newBot();
  const r = bot.handle("سلام، ۲۰ تا کامپیوتر تو دفترم تو شیراز دارم میخوام شبکه بشن، تا هفته بعد، بودجه حدود ۵۰ میلیون");
  assert.equal(r.category, "network_security");
  const sl = bot.state.slots;
  assert.equal(sl.size.n, 20);
  assert.equal(sl.work_mode.city, "Shiraz");
  assert.equal(sl.timeline.fa, "هفته‌ی آینده");
  assert.equal(sl.budget.money.min, 50e6);
  assert.match(text(r), /صبح بخیر/);
  assert.match(text(r), /کدام خدمت/);
});

test("answers a side question and returns to the same question", () => {
  const bot = newBot();
  bot.handle("پرینترم کار نمیکنه");
  const pending = bot.state.pending;
  const r = bot.handle("سپهر مدرک سیسکو داره؟");
  assert.match(text(r), /CCNA/);
  assert.equal(bot.state.pending, pending);
  assert.equal(bot.state.slots[pending], undefined);
});

test("a full Persian request ends in a categorised, prioritised email", () => {
  const bot = newBot();
  bot.handle("سرورمون هک شده فایلا همه رمز شدن");
  assert.equal(bot.state.slots.service.v, "incident");
  bot.handle("از دیشب پیغام باج اومده و پسوند فایل‌ها عوض شده");
  bot.handle("نمیدونم");
  bot.handle("حدود ۳۰ نفر");
  bot.handle("حضوری");
  bot.handle("توافقی");
  bot.handle("رضا کریمی");
  bot.handle("۰۹۱۷۱۲۳۴۵۶۷");
  bot.handle("نه");
  const summary = bot.handle("نه");
  assert.ok(card(summary) || bot.state.phase === "confirm");
  const done = bot.handle("آره بفرست");
  assert.ok(done.lead);
  assert.equal(done.lead.priority.urgency, "high");
  assert.equal(done.lead.priority.level, "high");
  const mail = emailPayload(done.lead);
  assert.match(mail._subject, /فوری.*شبکه و امنیت.*رضا کریمی/);
  assert.equal(mail["تلفن"], "+989171234567");
  assert.match(mail["متن کامل گفتگو"], /هک شده/);
  const sent = bot.afterSend(true);
  assert.match(sent[0].text, /ارسال شد/);
});

test("English job offer with chips, inline correction and confirmation", () => {
  const bot = newBot("en");
  let r = bot.handle("Hi! We're hiring an IT support technician at Acme Corp, full-time");
  assert.equal(r.category, "job_offer");
  assert.equal(bot.state.slots.company.text, "Acme Corp");
  assert.equal(bot.state.slots.employment.v, "full_time");
  cmd(bot, "opt:onsite", "On-site in Shiraz");
  bot.handle("between 20 and 30 million toman");
  bot.handle("next month");
  cmd(bot, "skip", "No, that's all");
  r = bot.handle("my name is Sara Johnson");
  assert.match(text(r), /Sara/);
  cmd(bot, "opt:email", "Email");
  r = bot.handle("sara@acme");
  assert.match(text(r), /doesn't look complete/);
  bot.handle("sara@acme.com");
  r = bot.handle("no");
  assert.equal(r.phase, "confirm");
  r = bot.handle("change my email to sara.j@acme.com");
  assert.equal(bot.state.slots.email.text, "sara.j@acme.com");
  assert.equal(r.phase, "confirm");
  r = cmd(bot, "confirm", "Send");
  assert.equal(r.lead.contact.email, "sara.j@acme.com");
  assert.equal(r.lead.lang, "en");
});

test("go back, skip and edit from the summary", () => {
  const bot = newBot();
  bot.handle("پرینترم کار نمیکنه");
  bot.handle("هر چی میزنم چاپ نمیکنه و چراغ قرمزش چشمک میزنه");
  bot.handle("از دیروز");
  let r = bot.handle("برگرد");
  assert.equal(bot.state.pending, "since");
  assert.equal(bot.state.slots.since, undefined);
  r = cmd(bot, "skip", "رد شدن");
  assert.ok(bot.state.skipped.since);
  r = bot.handle("فقط یکی");
  assert.equal(bot.state.slots.devices.n, 1);
  r = bot.handle("شرکت");
  assert.equal(bot.state.slots.setting.v, "business");
  r = bot.handle("فرقی نمیکنه");
  r = bot.handle("فرقی نمیکنه");
  assert.equal(bot.state.slots.urgency.urgency, "low");
  bot.handle("مریم کاظمی");
  r = bot.handle("maryam@gmail.com");
  assert.equal(bot.state.lang, "fa", "an email address shouldn't switch the language");
  r = bot.handle("نه ممنون");
  assert.equal(r.phase, "confirm");
  r = cmd(bot, "edit:urgency", "ویرایش");
  assert.equal(bot.state.pending, "urgency");
  r = cmd(bot, "opt:today", "همین امروز");
  assert.equal(r.phase, "confirm");
  assert.equal(bot.state.slots.urgency.urgency, "high");
});

test("pentest without permission gets a warning in the request", () => {
  const bot = newBot("en");
  bot.handle("need a penetration test for our web app");
  const r = bot.handle("no");
  assert.match(text(r), /permission/);
  assert.equal(bot.state.slots.authorization.v, "no");
});

test("asks when two categories are equally likely", () => {
  const bot = newBot("en");
  const r = bot.handle("can you teach our staff network security");
  assert.equal(r.category, null);
  assert.equal(chips(r).length, 2);
  const r2 = cmd(bot, "cat:training", "Training");
  assert.equal(r2.category, "training");
  assert.equal(bot.state.slots.topic && bot.state.slots.topic.v, "security");
});

test("vague messages get suggestions, then fall back to a free-form request", () => {
  const bot = newBot();
  let r = bot.handle("یه سوال داشتم");
  assert.match(text(r), /بپرسید/);
  r = bot.handle("hmm");
  assert.equal(r.category, null);
  r = bot.handle("I forgot my email password and need help getting back in");
  assert.ok(chips(r).length >= 2);
});

test("restart, frustration and messages after sending", () => {
  const bot = newBot();
  bot.handle("پرینترم کار نمیکنه");
  let r = bot.handle("این ربات به درد نخوره");
  assert.match(text(r), /09177886291|9177886291/);
  r = bot.handle("از اول");
  assert.equal(r.category, null);
  assert.match(text(r), /از اول/);
});

test("needs a number for counts but accepts vague amounts", () => {
  const bot = newBot();
  bot.handle("میخوام کارمندامون امنیت یاد بگیرن");
  assert.equal(bot.state.pending, "group_size");
  let r = bot.handle("گروه");
  assert.match(text(r), /عدد/);
  r = bot.handle("بیست و پنج نفر");
  assert.equal(bot.state.slots.group_size.n, 25);
});

test("two bad emails offer another way to be contacted", () => {
  const bot = newBot();
  bot.handle("یه سایت برای فروشگاهم میخوام");
  bot.state.slots = Object.assign(bot.state.slots, { project_type: { v: "web" }, description: { text: "سایت فروشگاهی با درگاه" }, work_mode: { v: "remote" }, timeline: { text: "ماه بعد" }, name: { text: "علی" }, contact_method: { v: "email" } });
  bot.state.skipped.budget = true;
  bot.state.pending = "email";
  bot.handle("ali@");
  const r = bot.handle("aligmail");
  assert.ok(chips(r).some((c) => /راه تماس دیگر/.test(c)));
});

test("a saved chat can be restored and continued", () => {
  const bot = newBot();
  bot.handle("پرینترم کار نمیکنه");
  const saved = JSON.parse(JSON.stringify(bot.save()));
  const again = createEngine({ cv: CV, lang: "fa", now: MORNING });
  again.load(saved);
  assert.equal(again.state.category, "it_support");
  const r = again.handle("هر بار که پرینت میگیرم کاغذ گیر میکنه");
  assert.equal(again.state.slots.problem.text, "هر بار که پرینت میگیرم کاغذ گیر میکنه");
  assert.ok(r.bubbles.length);
});

test("switches language when the visitor does", () => {
  const bot = newBot("fa");
  const r = bot.handle("Hi, my printer is broken");
  assert.equal(r.lang, "en");
  assert.match(text(r), /IT support/);
});

test("never crashes or goes silent on random conversations", () => {
  const corpus = ["سلام", "پرینترم خرابه", "hi", "?", "۱۲۳", "نه", "آره", "نمیدونم", "برگرد", "از اول", "ایمیلم رو عوض کن", "بودجه ۲۰ میلیون", "فردا", "شیراز", "remote", "Ali", "ali@test.com", "09121234567", "سپهر کیه؟", "یه جوک بگو", "!!!", "     ", "x".repeat(2000), "😀", "<script>alert(1)</script>", "DROP TABLE", "تست نفوذ", "استخدام", "teach me python", "هک شدیم", "ok", "skip", "change my phone", "back", "start over", "مرسی", "خداحافظ", "۵ نفر", "خیلی زیاد", "توافقی"];
  let seed = 42;
  const rand = (n) => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed % n; };
  for (let run = 0; run < 300; run++) {
    const bot = newBot(rand(2) ? "fa" : "en");
    let last = null;
    for (let i = 0; i < 25; i++) {
      const lastChips = last ? last.bubbles.flatMap((b) => (b.chips || []).concat(b.card ? b.card.actions : [])) : [];
      let r;
      if (lastChips.length && rand(3) === 0) {
        const c = lastChips[rand(lastChips.length)];
        r = bot.handle(c.value, c.label);
      } else {
        r = bot.handle(corpus[rand(corpus.length)]);
      }
      if (r.lead) { assert.ok(emailPayload(r.lead)._subject); r = { bubbles: bot.afterSend(rand(2) === 0) }; }
      const input = bot.state.history[bot.state.history.length - 1];
      if (input && input.role === "user" && input.text.trim()) assert.ok(r.bubbles.length > 0, `silent after "${input.text.slice(0, 30)}" in phase ${bot.state.phase}`);
      for (const b of r.bubbles) assert.equal(typeof b.text, "string");
      assert.ok(["start", "category", "slots", "confirm", "done"].includes(bot.state.phase));
      last = r;
    }
    JSON.parse(JSON.stringify(bot.save()));
  }
});

test("casual Persian job offer, titles and the visitor's own email", () => {
  const bot = newBot();
  let r = bot.handle("سلام آقای نیاز، ما یه شرکت نرم افزاری هستیم دنبال یه کارشناس شبکه تمام وقت میگردیم");
  assert.equal(r.category, "job_offer");
  assert.equal(bot.state.slots.role.v, "network");
  assert.equal(bot.state.slots.employment.v, "full_time");
  assert.equal(bot.state.slots.company, undefined, "'یه شرکت نرم‌افزاری' is a description, not a name");
  bot.handle("شرکت داده پردازان فارس");
  assert.equal(bot.state.slots.company.text, "شرکت داده پردازان فارس");
  bot.handle("حضوری شیراز");
  bot.handle("حقوقش ۱۵ تومن");
  assert.equal(bot.state.slots.salary.money.min, 15e6);
  bot.handle("هر چه زودتر");
  bot.handle("نه");
  r = bot.handle("خانم احمدی");
  assert.match(text(r), /خوشبختم خانم احمدی/);
  r = bot.handle("ایمیل hr@dpf.ir");
  assert.equal(bot.state.slots.email.text, "hr@dpf.ir");
  assert.doesNotMatch(text(r), /niazsepehr7/, "the visitor's email isn't a request for Sepehr's");
});

test("unanswerable questions about Sepehr are passed on in the email", () => {
  const bot = newBot();
  bot.handle("یه سایت برای فروشگاهم میخوام");
  const r = bot.handle("سپهر وردپرس کار کرده؟");
  assert.match(text(r), /سؤالتان را در درخواست/);
  assert.deepEqual(bot.state.questions, ["سپهر وردپرس کار کرده؟"]);
});
