#!/usr/bin/env node
// ─────────────────────────────────────────────────────────────
//  Static build for search engines. Run after editing content.js
//  or config.js:
//
//      node tools/build.cjs
//
//  It does three things:
//   1. writes one real HTML page per article and language:
//        fa/<id>/index.html   en/<id>/index.html
//   2. writes the visible text of index.html and the article
//      pages straight into the HTML (the same text the scripts
//      would draw), so search engines and visitors without
//      JavaScript see the full content
//   3. regenerates sitemap.xml with every page
//
//  Needs Playwright (npm i -D playwright, npx playwright install chromium).
// ─────────────────────────────────────────────────────────────
const fs = require("fs");
const path = require("path");
const http = require("http");
const { chromium } = require("playwright");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://sepehrniaz.ir";
const LANGS = ["fa", "en"];
// pages are loaded through a tiny local web server (module scripts and fetch() need http)
let ORIGIN = "";
const fileUrl = (rel) => ORIGIN + "/" + rel.replace(/index\.html$/, "");
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json", ".wasm": "application/wasm", ".pdf": "application/pdf" };
function serve() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      let p = decodeURIComponent(new URL(req.url, "http://x").pathname);
      if (p.endsWith("/")) p += "index.html";
      const f = path.join(ROOT, p);
      if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
      res.writeHead(200, { "content-type": TYPES[path.extname(f)] || "application/octet-stream" });
      fs.createReadStream(f).pipe(res);
    });
    srv.listen(0, "127.0.0.1", () => { ORIGIN = `http://127.0.0.1:${srv.address().port}`; resolve(srv); });
  });
}
const esc = (s) => String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function articlePage(L, a, alt) {
  const fa = L === "fa";
  const url = `${SITE}/${L}/${a.id}/`;
  const author = fa ? "سپهر نیاز" : "Sepehr Niaz";
  const date = a.updated ? `${a.updated}-01` : undefined;
  const ld = [
    {
      "@context": "https://schema.org", "@type": "TechArticle",
      headline: a.title, description: a.summary, inLanguage: L, url,
      mainEntityOfPage: url, image: `${SITE}/assets/og-card.jpg`,
      author: { "@type": "Person", name: "Sepehr Niaz", alternateName: "سپهر نیاز", url: `${SITE}/resume` },
      publisher: { "@type": "Person", name: "Sepehr Niaz", url: SITE + "/" },
      ...(date ? { datePublished: date, dateModified: date } : {}),
      timeRequired: `PT${a.minutes}M`
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: a.labels.learn, item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: a.trackTitle, item: `${SITE}/#articles` },
        { "@type": "ListItem", position: 3, name: a.title, item: url }
      ]
    }
  ];
  const navBtn = (x, cls, label) => x
    ? `<a class="adoc-navbtn ${cls}" href="${L}/${esc(x.id)}/">${a.icons.back}<span><small>${esc(label)}</small><b>${esc(x.title)}</b></span></a>`
    : "<span></span>";

  return `<!doctype html>
<html lang="${L}" dir="${fa ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <base href="../../">
  <title>${esc(a.title)} — ${esc(author)}</title>
  <meta name="description" content="${esc(a.summary)}">
  <meta name="author" content="Sepehr Niaz">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <link rel="alternate" hreflang="${L}" href="${url}">
  <link rel="alternate" hreflang="${alt}" href="${SITE}/${alt}/${a.id}/">
  <link rel="alternate" hreflang="x-default" href="${SITE}/en/${a.id}/">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="assets/photo.jpg">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${url}">
  <meta property="og:site_name" content="Sepehr Niaz">
  <meta property="og:locale" content="${fa ? "fa_IR" : "en_US"}">
  <meta property="og:title" content="${esc(a.title)}">
  <meta property="og:description" content="${esc(a.summary)}">
  <meta property="og:image" content="${SITE}/assets/og-card.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#070b14">
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script>
    (function () {
      var d = document.documentElement;
      try { var t = localStorage.getItem("theme"); if (t) d.dataset.theme = t; localStorage.setItem("lang", d.lang); } catch (e) {}
    })();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&family=Vazirmatn:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="styles.css">
  <noscript><style>.reveal{opacity:1!important;transform:none!important}</style></noscript>
</head>
<body data-page="article" data-article="${esc(a.id)}">
  <div class="bg-glow" aria-hidden="true"></div>

  <nav class="nav" id="nav">
    <div class="wrap nav-inner">
      <a href="index.html" class="logo" id="logo"></a>
      <div class="nav-links">
        <a href="index.html#tracks" data-i18n="navTracks"></a>
        <a href="index.html#articles" data-i18n="navArticles"></a>
        <a href="index.html#lab" data-i18n="navLab"></a>
        <a href="index.html#library" data-i18n="navBooks"></a>
        <a href="index.html#portfolio" data-i18n="navTools"></a>
      </div>
      <div class="nav-actions">
        <button class="icon-btn lang-btn" id="lang-toggle"></button>
        <button class="icon-btn" id="theme-toggle"></button>
        <a href="resume.html" class="btn primary sm" data-i18n="navResume"></a>
      </div>
    </div>
  </nav>

  <main class="article-main">
    <article class="wrap adoc-body adoc-page">
      <nav class="crumbs" aria-label="breadcrumb">
        <a href="index.html">${esc(a.labels.learn)}</a><span aria-hidden="true">/</span>
        <a href="index.html#topic/${esc(a.track)}">${esc(a.trackTitle)}</a>
      </nav>
      <p class="adoc-kick">${esc(a.kicker)}</p>
      <h1>${esc(a.title)}</h1>
      <p class="adoc-summary">${esc(a.summary)}</p>
      <div class="adoc-content">${a.body}</div>
      <nav class="adoc-nav">
        ${navBtn(a.prev, "prev", a.labels.prev)}
        ${navBtn(a.next, "next", a.labels.next)}
      </nav>
      <a class="btn adoc-back" href="index.html#articles">${a.icons.back}<span>${esc(a.labels.back)}</span></a>
    </article>
  </main>

  <footer class="site-footer" id="site-footer"></footer>

  <script src="config.js"></script>
  <script src="content.js"></script>
  <script src="script.js"></script>
  <script src="bot/nlu.js"></script>
  <script src="bot/knowledge.js"></script>
  <script src="bot/teacher.js"></script>
  <script src="bot/engine.js"></script>
  <script src="assistant.js"></script>
</body>
</html>
`;
}

// Load a page with scripts on, then copy what the scripts drew into the
// HTML file itself (only into elements that already exist in the file).
async function prerender(browser, rel, query) {
  const live = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  live.on("pageerror", (e) => errors.push(e.message));
  await live.goto(fileUrl(rel) + (query || ""));
  await live.waitForTimeout(600);
  const drawn = await live.evaluate(() => {
    document.querySelectorAll(".reveal.in").forEach((e) => e.classList.remove("in"));
    const ids = {};
    document.querySelectorAll("body [id]").forEach((e) => {
      if (!e.querySelector("[id]") && e.tagName !== "CANVAS") ids[e.id] = e.innerHTML;
    });
    return {
      ids,
      text: [...document.querySelectorAll("[data-i18n]")].map((e) => e.textContent),
      labels: [...document.querySelectorAll("[data-i18n-label]")].map((e) => e.getAttribute("aria-label"))
    };
  });
  await live.close();
  if (errors.length) throw new Error(`${rel}: ${errors.join(" | ")}`);

  const ctx = await browser.newContext({ javaScriptEnabled: false });
  const raw = await ctx.newPage();
  await raw.setContent(fs.readFileSync(path.join(ROOT, rel), "utf8"));
  const html = await raw.evaluate((d) => {
    // only fill elements the source file already has
    document.querySelectorAll("body [id]").forEach((e) => {
      if (!e.querySelector("[id]") && e.tagName !== "CANVAS" && d.ids[e.id] != null) e.innerHTML = d.ids[e.id];
    });
    document.querySelectorAll("[data-i18n]").forEach((e, i) => { if (d.text[i] != null) e.textContent = d.text[i]; });
    document.querySelectorAll("[data-i18n-label]").forEach((e, i) => { if (d.labels[i] != null) e.setAttribute("aria-label", d.labels[i]); });
    // the parser moves text after </html> into <body>: keep exactly one newline there
    const b = document.body;
    while (b.lastChild && b.lastChild.nodeType === 3 && !b.lastChild.textContent.trim()) b.lastChild.remove();
    b.appendChild(document.createTextNode("\n"));
    return "<!doctype html>\n" + document.documentElement.outerHTML + "\n";
  }, drawn);
  await ctx.close();
  fs.writeFileSync(path.join(ROOT, rel), html);
}

function sitemap(articles) {
  const today = new Date().toISOString().slice(0, 10);
  const alt = (pairs) => pairs.map(([l, u]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${u}"/>`).join("\n");
  const entry = (loc, alts, lastmod, freq, prio) =>
    `  <url>\n    <loc>${loc}</loc>\n${alts ? alt(alts) + "\n" : ""}    <lastmod>${lastmod}</lastmod>\n    <changefreq>${freq}</changefreq>\n    <priority>${prio}</priority>\n  </url>`;
  const hubAlts = [["en", `${SITE}/?lang=en`], ["fa", `${SITE}/?lang=fa`], ["x-default", `${SITE}/`]];
  const out = [
    entry(`${SITE}/`, hubAlts, today, "weekly", "1.0"),
    entry(`${SITE}/?lang=fa`, hubAlts, today, "weekly", "0.9"),
    ...["vision", "objects", "voice", "game"].map((p) => entry(`${SITE}/${p}/`, null, today, "monthly", "0.9")),
    entry(`${SITE}/resume.html`, null, today, "monthly", "0.7")
  ];
  for (const a of articles) {
    const alts = [["fa", `${SITE}/fa/${a.id}/`], ["en", `${SITE}/en/${a.id}/`], ["x-default", `${SITE}/en/${a.id}/`]];
    const mod = a.updated ? `${a.updated}-01` : today;
    for (const L of LANGS) out.push(entry(`${SITE}/${L}/${a.id}/`, alts, mod, "monthly", "0.8"));
  }
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${out.join("\n")}\n</urlset>\n`;
}

(async () => {
  const server = await serve();
  const browser = await chromium.launch();
  const ids = await (async () => {
    const p = await browser.newPage();
    await p.goto(fileUrl("index.html"));
    const list = await p.evaluate(() => window.LEARN.articles.map((a) => ({ id: a.id, updated: a.updated || "" })));
    await p.close();
    return list;
  })();

  // 1. article pages
  const written = [];
  for (const L of LANGS) {
    const p = await browser.newPage();
    await p.goto(fileUrl("index.html") + `?lang=${L}`);
    for (const { id } of ids) {
      const a = await p.evaluate((x) => window.__buildArticle(x), id);
      const rel = `${L}/${id}/index.html`;
      fs.mkdirSync(path.join(ROOT, L, id), { recursive: true });
      fs.writeFileSync(path.join(ROOT, rel), articlePage(L, a, L === "fa" ? "en" : "fa"));
      written.push(rel);
    }
    await p.close();
  }
  // remove pages of articles that no longer exist
  for (const L of LANGS) {
    const dir = path.join(ROOT, L);
    for (const d of fs.existsSync(dir) ? fs.readdirSync(dir) : []) {
      if (!ids.some((a) => a.id === d)) fs.rmSync(path.join(dir, d), { recursive: true, force: true });
    }
  }

  // 2. put the drawn text into the HTML
  await prerender(browser, "index.html", "?lang=en");
  for (const p of ["vision", "objects", "voice", "game"]) await prerender(browser, `${p}/index.html`, "?lang=en");
  for (const rel of written) await prerender(browser, rel);

  // 3. sitemap
  fs.writeFileSync(path.join(ROOT, "sitemap.xml"), sitemap(ids));

  await browser.close();
  server.close();
  console.log(`built ${written.length} article pages, index.html, the 4 lab pages and sitemap.xml (${ids.length * 2 + 7} URLs)`);
})().catch((e) => { console.error(e); process.exit(1); });
