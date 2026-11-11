// Chat window for the site's assistant. The conversation itself runs in
// bot/engine.js, entirely in the visitor's browser (no server, no API).
// When a request is complete it's emailed through FormSubmit, like the
// contact form.
(function () {
  const cv = window.CV;
  const cfg = cv.assistant || {};
  const SB = window.SepehrBot;
  if (!cfg.enabled || !SB || !SB.createEngine) return;

  const root = document.documentElement;
  const pageLang = () => (root.lang === "fa" ? "fa" : "en");
  const STORE = "assistant-chat-v2";
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const UI = {
    en: { launcher: "Ask or learn", title: "Assistant & teacher", subtitle: "Online · replies instantly", placeholder: "Type your message…", send: "Send", close: "Close", restart: "Start over", note: "Automated assistant · your details go only to Sepehr", nudge: "Want to learn something, or have a job for Sepehr? I can help 👋", typing: "typing", edit: "Edit" },
    fa: { launcher: "بپرس یا یاد بگیر", title: "دستیار و معلم", subtitle: "آنلاین · پاسخ فوری", placeholder: "پیامتان را بنویسید…", send: "ارسال", close: "بستن", restart: "شروع دوباره", note: "دستیار خودکار · اطلاعات شما فقط برای سپهر ارسال می‌شود", nudge: "می‌خواهی چیزی یاد بگیری یا برای سپهر کاری داری؟ من کمک می‌کنم 👋", typing: "در حال نوشتن", edit: "ویرایش" }
  };
  const t = (k) => UI[pageLang()][k];

  const svg = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true">${d}</svg>`;
  const ICON = {
    chat: svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8M8 13h5"/>'),
    close: svg('<path d="M18 6 6 18M6 6l12 12"/>'),
    send: svg('<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>'),
    restart: svg('<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>'),
    pencil: svg('<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/>')
  };

  // ── Engine + saved session ───────────────────────────────────
  let engine = SB.createEngine({ cv, lang: pageLang(), learn: window.LEARN });
  // Rendered transcript: [{ role: "bot"|"user", text, card?, chips? }]
  let log = [];
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORE) || "null");
    if (saved && saved.engine && Array.isArray(saved.log)) { engine.load(saved.engine); log = saved.log; }
  } catch (e) {}
  const persist = () => { try { sessionStorage.setItem(STORE, JSON.stringify({ engine: engine.save(), log })); } catch (e) {} };

  // ── Build the widget ─────────────────────────────────────────
  const wrap = document.createElement("div");
  wrap.className = "ai";
  wrap.innerHTML = `
    <div class="ai-nudge" hidden><span></span><button type="button" class="ai-nudge-x" aria-label="×">×</button></div>
    <button class="ai-launcher" type="button" aria-expanded="false">
      <span class="ai-launcher-icon">${ICON.chat}</span><span class="ai-launcher-label"></span>
    </button>
    <section class="ai-panel" role="dialog" aria-modal="false" hidden>
      <header class="ai-head">
        <span class="ai-avatar">${cv.photo ? `<img src="${cv.photo}" alt="">` : "SN"}<i></i></span>
        <div><b class="ai-title"></b><small class="ai-subtitle"></small></div>
        <button class="ai-icon-btn ai-restart" type="button">${ICON.restart}</button>
        <button class="ai-icon-btn ai-close" type="button">${ICON.close}</button>
        <span class="ai-progress"><i></i></span>
      </header>
      <div class="ai-body" aria-live="polite"></div>
      <form class="ai-input">
        <textarea rows="1" dir="auto" maxlength="1500"></textarea>
        <button class="ai-send" type="submit">${ICON.send}</button>
      </form>
      <p class="ai-note"></p>
    </section>`;
  document.body.appendChild(wrap);

  const $ = (s) => wrap.querySelector(s);
  const launcher = $(".ai-launcher"), panel = $(".ai-panel"), body = $(".ai-body");
  const form = $(".ai-input"), input = $("textarea"), sendBtn = $(".ai-send"), nudge = $(".ai-nudge");
  let busy = false;

  function paintLabels() {
    $(".ai-launcher-label").textContent = t("launcher");
    launcher.setAttribute("aria-label", t("launcher"));
    $(".ai-title").textContent = t("title");
    $(".ai-subtitle").textContent = t("subtitle");
    $(".ai-close").setAttribute("aria-label", t("close"));
    $(".ai-restart").setAttribute("aria-label", t("restart"));
    $(".ai-restart").title = t("restart");
    input.placeholder = t("placeholder");
    sendBtn.setAttribute("aria-label", t("send"));
    $(".ai-note").textContent = t("note");
    $(".ai-nudge span").textContent = t("nudge");
    panel.setAttribute("aria-label", t("title"));
  }

  function setProgress(p) {
    $(".ai-progress i").style.width = `${Math.round((p || 0) * 100)}%`;
  }

  // ── Rendering ────────────────────────────────────────────────
  // Lines of mixed Persian/English: isolate Latin and number runs so "Security+"
  // or "+98…" don't get scrambled inside right-to-left text
  const LTR_RUN = /([A-Za-z0-9+@#$€][A-Za-z0-9+@#$€._\-\/:'’ ]*[A-Za-z0-9+#%)]|[A-Za-z0-9+])/;
  function fillLine(el, line) {
    line.split(LTR_RUN).forEach((part, i) => {
      if (!part) return;
      if (i % 2) { const b = document.createElement("bdi"); b.textContent = part; el.appendChild(b); }
      else el.appendChild(document.createTextNode(part));
    });
  }
  function renderItem(item) {
    const el = document.createElement("div");
    el.className = `ai-msg ${item.role}`;
    el.dir = /^[^A-Za-z\u0600-\u06FF]*[\u0600-\u06FF]/.test(item.text) ? "rtl" : "auto";
    item.text.split("\n").forEach((line) => {
      const div = document.createElement("div");
      if (!line.trim()) { div.className = "ai-gap"; el.appendChild(div); return; }
      if (el.dir === "rtl") fillLine(div, line); else div.textContent = line;
      el.appendChild(div);
    });
    if (item.code) { const pre = document.createElement("pre"); pre.className = "ai-code"; pre.dir = "ltr"; pre.textContent = item.code; el.appendChild(pre); }
    body.appendChild(el);
    if (item.card) body.appendChild(renderCard(item.card, item));
    return el;
  }

  function renderCard(card, item) {
    const box = document.createElement("div");
    box.className = "ai-card";
    const rows = document.createElement("dl");
    card.rows.forEach((r) => {
      const row = document.createElement("div");
      row.className = "ai-row";
      const dt = document.createElement("dt"); dt.textContent = r.label;
      const dd = document.createElement("dd"); dd.textContent = r.value; dd.dir = "auto";
      row.append(dt, dd);
      if (r.edit && item.live) {
        const b = document.createElement("button");
        b.type = "button"; b.className = "ai-row-edit"; b.innerHTML = ICON.pencil;
        b.setAttribute("aria-label", `${t("edit")}: ${r.label}`);
        b.addEventListener("click", () => send(r.edit, `${t("edit")}: ${r.label}`));
        row.appendChild(b);
      }
      rows.appendChild(row);
    });
    box.appendChild(rows);
    if (item.live && card.actions) {
      const acts = document.createElement("div");
      acts.className = "ai-card-actions";
      card.actions.forEach((a) => {
        const b = document.createElement("button");
        b.type = "button"; b.className = a.primary ? "primary" : ""; b.textContent = a.label;
        b.addEventListener("click", () => send(a.value, a.label));
        acts.appendChild(b);
      });
      box.appendChild(acts);
    }
    return box;
  }

  function renderChips(chips) {
    body.querySelectorAll(".ai-chips").forEach((c) => c.remove());
    if (!chips || !chips.length) return;
    const row = document.createElement("div");
    row.className = "ai-chips";
    chips.forEach((c) => {
      if (c.href) { // a link (WhatsApp / email app), not a reply
        const l = document.createElement("a");
        l.href = c.href; l.textContent = c.label; l.className = "link";
        if (/^https?:/.test(c.href)) { l.target = "_blank"; l.rel = "noopener"; }
        row.appendChild(l);
        return;
      }
      const b = document.createElement("button");
      b.type = "button";
      b.className = c.ghost ? "ghost" : "";
      b.textContent = c.label;
      b.addEventListener("click", () => send(c.value, c.label));
      row.appendChild(b);
    });
    body.appendChild(row);
  }

  function renderAll() {
    body.innerHTML = "";
    log.forEach((item, i) => renderItem(Object.assign({}, item, { live: i === lastCardIndex() })));
    const last = log[log.length - 1];
    renderChips(last && last.role === "bot" ? last.chips : null);
    setProgress(engine.progress());
    scrollDown();
  }
  const lastCardIndex = () => { for (let i = log.length - 1; i >= 0; i--) { if (log[i].role === "user") return -1; if (log[i].card) return i; } return -1; };
  const scrollDown = () => { body.scrollTop = body.scrollHeight; };

  const wait = (ms) => new Promise((r) => setTimeout(r, reduceMotion ? 0 : ms));
  function typingBubble() {
    const el = document.createElement("div");
    el.className = "ai-msg bot ai-typing";
    el.setAttribute("aria-label", t("typing"));
    el.innerHTML = "<i></i><i></i><i></i>";
    body.appendChild(el);
    scrollDown();
    return el;
  }

  // Show the bot's bubbles one by one with a short "typing…" pause
  async function play(result) {
    for (const b of result.bubbles) {
      const dots = typingBubble();
      await wait(Math.min(1500, 380 + (b.text || "").length * 9));
      dots.remove();
      const item = { role: "bot", text: b.text, card: b.card || null, chips: b.chips || null, code: b.code || null };
      log.push(item);
      // Only the newest card keeps working buttons
      body.querySelectorAll(".ai-card-actions, .ai-row-edit").forEach((x) => x.remove());
      renderItem(Object.assign({}, item, { live: !!b.card }));
      scrollDown();
    }
    const last = result.bubbles[result.bubbles.length - 1];
    renderChips(last ? last.chips : null);
    setProgress(result.progress);
    persist();
    scrollDown();
    if (result.lead) await deliver(result.lead);
  }

  // Email the finished request to Sepehr
  async function deliver(lead) {
    let ok = false;
    const email = cv.contact && cv.contact.email;
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(email)}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(SB.emailPayload(lead))
      });
      const json = await res.json().catch(() => ({}));
      ok = res.ok && json.success !== "false" && json.success !== false;
    } catch (e) { ok = false; }
    await play({ bubbles: engine.afterSend(ok, lead), progress: ok ? 1 : engine.progress() });
  }

  async function send(value, label) {
    if (busy) return;
    const isCmd = typeof value === "string" && value.startsWith(engine.CMD);
    const text = isCmd ? label : String(value || "").trim();
    if (!text) return;
    busy = true;
    sendBtn.disabled = true;
    body.querySelectorAll(".ai-chips").forEach((c) => c.remove());
    body.querySelectorAll(".ai-card-actions, .ai-row-edit").forEach((x) => x.remove());
    log.push({ role: "user", text });
    renderItem({ role: "user", text });
    if (!isCmd) { input.value = ""; autosize(); }
    scrollDown();
    try {
      const result = engine.handle(value, isCmd ? label : undefined);
      await play(result);
    } catch (e) {
      console.error(e);
      log.push({ role: "bot", text: pageLang() === "fa" ? "یک خطای غیرمنتظره پیش آمد. لطفاً دوباره امتحان کنید یا از فرم تماس استفاده کنید." : "Something unexpected went wrong. Please try again or use the contact form." });
      renderAll();
    } finally {
      busy = false;
      sendBtn.disabled = false;
      persist();
    }
  }

  async function begin() {
    log = [];
    engine = SB.createEngine({ cv, lang: pageLang(), learn: window.LEARN });
    body.innerHTML = "";
    setProgress(0);
    busy = true;
    await play(engine.start());
    busy = false;
  }

  function open(show) {
    panel.hidden = !show;
    wrap.classList.toggle("open", show);
    launcher.setAttribute("aria-expanded", String(show));
    nudge.hidden = true;
    try { sessionStorage.setItem("assistant-nudged", "1"); } catch (e) {}
    if (show) {
      if (!log.length) begin(); else renderAll();
      setTimeout(() => input.focus(), 60);
    }
  }

  // ── Input & events ───────────────────────────────────────────
  function autosize() {
    input.style.height = "auto";
    input.style.height = Math.min(input.scrollHeight, 120) + "px";
  }
  input.addEventListener("input", autosize);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.isComposing) { e.preventDefault(); send(input.value); }
  });
  form.addEventListener("submit", (e) => { e.preventDefault(); send(input.value); });
  launcher.addEventListener("click", () => open(panel.hidden));
  $(".ai-close").addEventListener("click", () => { open(false); launcher.focus(); });
  $(".ai-restart").addEventListener("click", () => { if (!busy) begin(); });
  $(".ai-nudge-x").addEventListener("click", (e) => { e.stopPropagation(); nudge.hidden = true; try { sessionStorage.setItem("assistant-nudged", "1"); } catch (er) {} });
  nudge.addEventListener("click", () => open(true));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !panel.hidden) { open(false); launcher.focus(); } });
  document.addEventListener("cv:langchange", () => {
    paintLabels();
    const userSpoke = log.some((m) => m.role === "user");
    if (!userSpoke) { if (!panel.hidden) begin(); else log = []; }
    else engine.setLang(pageLang());
  });

  paintLabels();
  setProgress(engine.progress());

  // A gentle hint the first time someone visits
  let nudged = false;
  try { nudged = sessionStorage.getItem("assistant-nudged") === "1"; } catch (e) {}
  if (!nudged && !log.length) setTimeout(() => {
    if (!panel.hidden) return;
    nudge.hidden = false;
    // Don't leave it covering the page: it goes away on scroll or after a while
    const hide = () => {
      nudge.hidden = true;
      window.removeEventListener("scroll", onScroll);
      try { sessionStorage.setItem("assistant-nudged", "1"); } catch (e) {}
    };
    const startY = window.scrollY;
    const onScroll = () => { if (Math.abs(window.scrollY - startY) > 80) hide(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(hide, 9000);
  }, 7000);
})();
