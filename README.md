# CV website

A one-page CV site with a contact form. It's plain HTML, CSS and JavaScript, so there's no build step.

## Edit your content

The site is bilingual (English and Persian). Visitors switch with the **فا / EN** button. Persian is laid out right-to-left, and you can link straight to it with `?lang=fa`. Phones set to Persian open it in Persian automatically.

Everything on the page comes from **`config.js`**. Write text as `{ en: "...", fa: "..." }` to give each language its own version. Labels like buttons and section titles are in the `UI` table at the top of `script.js`.

All the content lives in **`config.js`**: your name, title, summary, experience, education, skills, projects and contact details. Edit that file and the site updates.

- **Photo:** put an image in `assets/` and set `photo: "assets/photo.jpg"`.
- **PDF CV:** put it in `assets/` and set `resumePdf` to show a "Download CV" button.
- **Phone:** set `phone` in international format (e.g. `+447700900123`). This turns on the Call, Text and WhatsApp buttons. Set `whatsapp: false` to hide WhatsApp.
- **Hero:** `roles` are the job titles typed out one after another, `badges` are the labels floating around your photo, and `available` is the green status badge (leave it empty to hide it).
- **Stats:** `stats` are the big numbers under the hero. They count up when someone scrolls to them.
- **Charts:** `breakdown` on a job draws the bar chart beside it, and each language's `percent` fills its ring.
- **Icons:** certificates, skill groups and projects take an `icon` name. The list of names is at the top of `config.js`.
- Leave any list empty (`[]`) to hide that section.

The site has a dark and a light theme. It follows the visitor's system setting, and the sun/moon button switches between them.

## How the contact form works

Visitors fill in their name, email, optional phone number and a message. The form sends it to the `email` in `config.js` through [FormSubmit](https://formsubmit.co), a free service that needs no backend or account.

**One-time activation:** the first time someone submits the form, FormSubmit emails you an activation link. Click it, and every message after that arrives in your inbox. To test it, send yourself a message once the site is live. Hitting **Reply** on a message replies to the visitor.

To get notes on your phone, turn on notifications for your email app (e.g. Gmail).

## Chat assistant

A chat bubble in the corner lets visitors talk to an assistant instead of filling in a form. It runs **entirely in the visitor's browser**: no server, no API key, no cost, and it works on any static hosting, including GitHub Pages.

What it does:

- **Understands free text in Persian and English**, including casual writing and typos. From a single message like «۲۰ تا کامپیوتر تو دفترم تو شیراز دارم، تا هفته بعد، بودجه حدود ۵۰ میلیون» it picks out the device count, city, timeline and budget, and doesn't ask for them again.
- **Sorts the request** into job offer, project, IT support, network & security, training, collaboration or other. When two categories are equally likely, it asks which one instead of guessing.
- **Asks follow-up questions for that kind of request.** For example: for a printer problem, what happens, since when, how many devices and how urgent; for a hack, what was noticed (and it marks the request urgent); for a pentest, whether the visitor has permission.
- **Handles real conversations.** It answers side questions about you (skills, certificates, experience, rates, contact) and goes back to where it was. Visitors can type «برگرد» / "back", «رد کن» / "skip", «از اول» / "start over", or «ایمیلم رو عوض کن به …».
- **Collects name and contact details** and checks emails and Iranian phone numbers.
- **Shows a summary card to confirm**, with an edit button on every line, then **emails you the request**. The subject carries a priority (🔴 فوری / 🟠 مهم / 🟢 عادی) and the category, and the body has a Persian summary, every detail, the contact info, any questions it couldn't answer, and the full chat.

Files:

- `bot/nlu.js`: language understanding (normalisation, typo-tolerant matching, money/dates/phones/names…)
- `bot/knowledge.js`: the categories, their questions and quick-reply buttons, and answers about you. **Edit this file to change what the assistant asks.**
- `bot/engine.js`: the conversation logic, priority scoring and email layout
- `assistant.js`: the chat window

Answers about you come from `config.js`, so they stay in sync with the CV. Set `assistant.enabled` to `false` in `config.js` to hide the bubble.

Tests: `node --test` (from the repository folder) runs 27 checks, including a stress test of 300 random conversations.

## Portfolio section

The **Portfolio** section on the site («نمونه کارها») presents each tool in `projects/` in detail: the problem it solves, what was built, its features, the tech used, and a preview (a screenshot, or real terminal output). Visitors can filter by Networking, Security or IT support, and each card links to its code.

The content comes from `portfolio` in `config.js`. Each item has `name`, `category` (`network`, `security` or `support`), `tagline`, `problem`, `solution`, `features`, `tech`, `preview` (`{ image }` or `{ cmd, output }`) and `path` (the folder in the repo, added to `portfolioRepo`). The smaller `projects` list below it is for other work such as the book and reports.

`projects/` holds the code: six small Python tools, each with its own README and tests (see [`projects/README.md`](projects/README.md)). `.github/workflows/projects-tests.yml` runs their tests on every push.

## Articles and search engines

Articles live in `content.js`. Every article also gets its own page with the
full text in the HTML (`fa/<id>/` and `en/<id>/`), and the text of the home
page is written straight into `index.html`, so search engines can read it.
After adding or editing an article, rebuild those pages and the sitemap:

```bash
npm i -D playwright && npx playwright install chromium   # once
node tools/build.cjs
```

Then commit the changed `index.html`, `sitemap.xml`, `fa/` and `en/` folders.

## Publish it on sepehrniaz.ir

The site is set up for **https://sepehrniaz.ir**: canonical address, `sitemap.xml`, `robots.txt`, a link-preview image (`assets/og-card.jpg`) and a `CNAME` file. Pick one host:

**Option A: GitHub Pages** (free; the repository must be public)
1. Repository **Settings → General → Change visibility → Public**.
2. **Settings → Pages → Source: GitHub Actions**. Under **Custom domain**, enter `sepehrniaz.ir` and save. Once the certificate is ready, tick **Enforce HTTPS**.
3. In the Iranic DNS panel for `sepehrniaz.ir`, add:

| Type | Name | Value |
|------|------|-------|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | sepehrniaz.github.io |

**Option B: Netlify** (free; the repository can stay private)
1. Sign in at netlify.com with GitHub → **Add new site → Import from GitHub → CV** → Deploy. No build command; publish directory `.`.
2. **Domain management → Add domain** → `sepehrniaz.ir`.
3. In the Iranic DNS panel add `A @ 75.2.60.5` and `CNAME www <your-site>.netlify.app`. Netlify turns on HTTPS by itself.

DNS changes can take from a few minutes to 24 hours. After the site loads on the domain, add it to **Google Search Console** (https://search.google.com/search-console), verify it with a DNS TXT record in the Iranic panel, and submit `https://sepehrniaz.ir/sitemap.xml`.

## Preview locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.
