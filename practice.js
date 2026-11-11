// ─────────────────────────────────────────────────────────────
//  Practice lab — everything runs in the visitor's browser.
//  · Linux terminal and Windows command line: simulators with a
//    small virtual disk (nothing touches the real computer)
//  · Python (Pyodide), JavaScript, HTML/CSS and SQL (sql.js): real
//  · A coach gives exercises, checks them, explains each command
//    and the common errors, in Persian or English.
// ─────────────────────────────────────────────────────────────
const BASE = new URL("assets/practice/", import.meta.url).href;
const lang = () => (document.documentElement.lang === "fa" ? "fa" : "en");
const L = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang()] : v);
const fa = (n) => String(n).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const num = (n) => (lang() === "fa" ? fa(n) : String(n));
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const $ = (id) => document.getElementById(id);

const UI = {
  eyebrow: { en: "Lab · Practice", fa: "آزمایشگاه · تمرین" }, title: { en: "Practice lab", fa: "آزمایشگاه تمرین" },
  lead: { en: "Type real commands and code, see what happens, and let the coach guide you — Linux, Windows, Python, JavaScript, HTML and SQL, all in your browser.", fa: "دستور و کد واقعی تایپ کن، نتیجه را ببین و بگذار مربی راهنمایی‌ات کند — لینوکس، ویندوز، پایتون، جاوااسکریپت، HTML و SQL، همه داخل مرورگر." },
  privacy: { en: "A safe sandbox: nothing here can change your real computer, and nothing is uploaded.", fa: "یک محیط امن: هیچ چیز اینجا کامپیوتر واقعی‌ات را تغییر نمی‌دهد و چیزی آپلود نمی‌شود." },
  run: { en: "▶ Run", fa: "▶ اجرا" }, reset: { en: "Reset", fa: "از نو" }, output: { en: "Output", fa: "خروجی" }, preview: { en: "Preview", fa: "پیش‌نمایش" },
  coach: { en: "Coach", fa: "مربی" }, mission: { en: (i, n) => `Exercise ${i} of ${n}`, fa: (i, n) => `تمرین ${i} از ${n}` },
  hint: { en: "💡 Hint", fa: "💡 راهنمایی" }, skip: { en: "Skip", fa: "رد کن" }, again: { en: "Start the exercises again", fa: "شروع دوباره‌ی تمرین‌ها" },
  solved: { en: ["✅ Exactly right!", "✅ Well done!", "✅ Great — that's it."], fa: ["✅ دقیقاً درست!", "✅ آفرین!", "✅ عالی — همین بود."] },
  allDone: { en: "🏆 You finished every exercise here. Keep experimenting freely, or pick another environment above.", fa: "🏆 همه‌ی تمرین‌های این بخش را تمام کردی. آزادانه امتحان کن یا از بالا یک محیط دیگر انتخاب کن." },
  typeHere: { en: "type a command and press Enter", fa: "یک دستور بنویس و Enter بزن" },
  loadingPy: { en: "Loading Python (about 13 MB, first time only)…", fa: "در حال بارگذاری پایتون (حدود ۱۳ مگابایت، فقط بار اول)…" }, loadingSql: { en: "Loading the database engine…", fa: "در حال بارگذاری موتور پایگاه‌داده…" },
  timeout: { en: "⏱ Stopped: the program ran too long (an endless loop?).", fa: "⏱ متوقف شد: برنامه بیش از حد طول کشید (حلقه‌ی بی‌پایان؟)." },
  noOutput: { en: "(no output — use print to show something)", fa: "(خروجی ندارد — برای نمایش از print استفاده کن)" }, rows: { en: (n) => `${n} row(s)`, fa: (n) => `${n} ردیف` }, okSql: { en: "Done.", fa: "انجام شد." },
  tip: { en: "Tip: ↑ brings back your last command.", fa: "نکته: کلید ↑ دستور قبلی را برمی‌گرداند." },
  welcome: { en: "Do the exercise below. I'll check it, explain what each command does and help when something goes wrong.", fa: "تمرین پایین را انجام بده. من بررسی‌اش می‌کنم، توضیح می‌دهم هر دستور چه می‌کند و اگر مشکلی پیش آمد کمک می‌کنم." },
  notThis: { en: "That ran, but it isn't the exercise yet. Read it once more, or tap Hint.", fa: "اجرا شد، ولی هنوز جواب تمرین نیست. یک بار دیگر صورت تمرین را بخوان یا «راهنمایی» را بزن." },
  how1T: { en: "Simulated terminals", fa: "ترمینال‌های شبیه‌سازی‌شده" }, how1D: { en: "The Linux and Windows terminals are simulators with a small pretend disk. The commonest commands work like the real ones, so what you learn carries over.", fa: "ترمینال لینوکس و ویندوز شبیه‌سازند و یک دیسکِ فرضیِ کوچک دارند. رایج‌ترین دستورها مثل نسخه‌ی واقعی کار می‌کنند، پس چیزی که یاد می‌گیری همان‌جا هم به کار می‌آید." },
  how2T: { en: "Real languages", fa: "زبان‌های واقعی" }, how2D: { en: "Python, JavaScript, HTML and SQL are the real thing: Python runs through Pyodide and SQL through SQLite, compiled for the browser.", fa: "پایتون، جاوااسکریپت، HTML و SQL واقعی‌اند: پایتون با Pyodide و SQL با SQLite اجرا می‌شود که برای مرورگر ساخته شده‌اند." },
  how3T: { en: "The coach", fa: "مربی" }, how3D: { en: "The coach is a set of exercises and rules, not a chatbot: it checks your result, explains commands and the usual errors. Languages that need a compiler on a server (C, Java…) aren't here.", fa: "مربی مجموعه‌ای از تمرین و قاعده است، نه یک چت‌بات: نتیجه‌ات را بررسی می‌کند و دستورها و خطاهای رایج را توضیح می‌دهد. زبان‌هایی که به کامپایلر روی سرور نیاز دارند (C، جاوا و …) اینجا نیستند." },
  pageTitle: { en: "Practice lab: Linux, Windows, Python, JS, HTML, SQL — Sepehr Niaz", fa: "آزمایشگاه تمرین: لینوکس، ویندوز، پایتون، JS، HTML، SQL — سپهر نیاز" }
};
const t = (k) => L(UI[k]);

// ── A tiny virtual disk ──────────────────────────────────────
const dir = (c) => ({ d: true, c: c || {} });
const file = (text) => ({ d: false, t: text });
class Disk {
  constructor(tree, ci) { this.root = tree; this.ci = ci; }
  key(node, name) { if (!this.ci) return name in node.c ? name : null; const k = Object.keys(node.c).find((x) => x.toLowerCase() === name.toLowerCase()); return k || null; }
  get(parts) { let n = this.root; for (const p of parts) { if (!n.d) return null; const k = this.key(n, p); if (!k) return null; n = n.c[k]; } return n; }
  parent(parts) { return this.get(parts.slice(0, -1)); }
  set(parts, node) { const p = this.parent(parts); if (!p || !p.d) return false; const k = this.key(p, parts[parts.length - 1]) || parts[parts.length - 1]; p.c[k] = node; return true; }
  del(parts) { const p = this.parent(parts); const k = p && this.key(p, parts[parts.length - 1]); if (!k) return false; delete p.c[k]; return true; }
}
const clone = (n) => JSON.parse(JSON.stringify(n));
function tokenize(line) {
  const out = []; let cur = "", q = null, has = false;
  for (const ch of line) {
    if (q) { if (ch === q) q = null; else cur += ch; continue; }
    if (ch === '"' || ch === "'") { q = ch; has = true; continue; }
    if (/\s/.test(ch)) { if (cur || has) out.push(cur); cur = ""; has = false; continue; }
    cur += ch;
  }
  if (cur || has) out.push(cur);
  return out;
}
const NOW = "Nov 11 10:00";

// ── Linux shell ──────────────────────────────────────────────
function linuxShell() {
  const HOME = ["home", "student"];
  const disk = new Disk(dir({ home: dir({ student: dir({
    notes: dir({ "ports.txt": file("22 ssh\n53 dns\n80 http\n443 https\n3389 rdp\n"), "todo.txt": file("learn linux\npractice every day\nbuild a lab\n") }),
    logs: dir({ "auth.log": file("Nov 10 09:12 Accepted password for student\nNov 10 09:40 Failed password for root\nNov 10 09:41 Failed password for root\nNov 10 10:02 Accepted password for student\nNov 10 11:30 Failed password for admin\n") }),
    "hello.sh": file("#!/bin/bash\necho \"Hello from a script\"\n")
  }) }), etc: dir({ hostname: file("lab\n"), "os-release": file('NAME="Ubuntu"\nVERSION="24.04 LTS"\n') }), tmp: dir() }));
  const st = { cwd: HOME.slice(), history: [] };
  const resolve = (p) => { let parts = !p || p === "~" ? HOME.slice() : p.startsWith("~/") ? HOME.concat(p.slice(2).split("/")) : p.startsWith("/") ? p.split("/") : st.cwd.concat(p.split("/")); const out = []; for (const x of parts) { if (!x || x === ".") continue; if (x === "..") out.pop(); else out.push(x); } return out; };
  const show = (parts) => { const s = "/" + parts.join("/"); const h = "/" + HOME.join("/"); return s === h ? "~" : s.startsWith(h + "/") ? "~" + s.slice(h.length) : s; };
  const E = (m) => { throw new Error(m); };
  const need = (p, cmd) => disk.get(resolve(p)) || E(`${cmd}: ${p}: No such file or directory`);
  const readFile = (p, cmd) => { const n = need(p, cmd); if (n.d) E(`${cmd}: ${p}: Is a directory`); return n.t; };
  const lines = (s) => (s.endsWith("\n") ? s.slice(0, -1) : s).split("\n");
  const flags = (args) => { const f = new Set(), rest = []; for (const a of args) { if (/^-[a-zA-Z]+$/.test(a)) for (const c of a.slice(1)) f.add(c); else rest.push(a); } return [f, rest]; };
  const C = {
    pwd: () => "/" + st.cwd.join("/"),
    whoami: () => "student", hostname: () => "lab", id: () => "uid=1000(student) gid=1000(student) groups=1000(student),27(sudo)",
    date: () => "Wed Nov 11 10:00:00 UTC 2026", uname: (a) => (a.includes("-a") ? "Linux lab 6.8.0-45-generic x86_64 GNU/Linux" : "Linux"),
    echo: (a) => a.join(" "),
    ls: (a) => { const [f, r] = flags(a); const p = r[0] || "."; const n = need(p, "ls"); if (!n.d) return p; let names = Object.keys(n.c).sort(); if (!f.has("a")) names = names.filter((x) => !x.startsWith("."));
      if (!f.has("l")) return names.map((x) => x + (n.c[x].d ? "/" : "")).join("  ");
      return names.map((x) => { const c = n.c[x]; const exe = /\.sh$/.test(x) && c.x; return `${c.d ? "drwxr-xr-x" : exe ? "-rwxr-xr-x" : "-rw-r--r--"} 1 student student ${String(c.d ? 4096 : c.t.length).padStart(5)} ${NOW} ${x}`; }).join("\n"); },
    cd: (a) => { const p = resolve(a[0] || "~"); const n = disk.get(p); if (!n) E(`cd: ${a[0]}: No such file or directory`); if (!n.d) E(`cd: ${a[0]}: Not a directory`); st.cwd = p; return ""; },
    mkdir: (a) => { const [f, r] = flags(a); if (!r.length) E("mkdir: missing operand"); for (const p of r) { const parts = resolve(p); if (f.has("p")) { for (let i = 1; i <= parts.length; i++) if (!disk.get(parts.slice(0, i))) disk.set(parts.slice(0, i), dir()); } else { if (disk.get(parts)) E(`mkdir: cannot create directory '${p}': File exists`); if (!disk.set(parts, dir())) E(`mkdir: cannot create directory '${p}': No such file or directory`); } } return ""; },
    touch: (a) => { if (!a.length) E("touch: missing file operand"); for (const p of a) { const parts = resolve(p); if (!disk.get(parts) && !disk.set(parts, file(""))) E(`touch: cannot touch '${p}': No such file or directory`); } return ""; },
    cat: (a, stdin) => (a.length ? a.map((p) => readFile(p, "cat")).join("") : stdin || "").replace(/\n$/, ""),
    head: (a, stdin) => { const [n, r] = countArg(a); return lines(r.length ? readFile(r[0], "head") : stdin || "").slice(0, n).join("\n"); },
    tail: (a, stdin) => { const [n, r] = countArg(a); return lines(r.length ? readFile(r[0], "tail") : stdin || "").slice(-n).join("\n"); },
    wc: (a, stdin) => { const [f, r] = flags(a); const s = r.length ? readFile(r[0], "wc") : stdin || ""; const l = s ? lines(s).length : 0; return f.has("l") ? String(l) + (r[0] ? " " + r[0] : "") : `${l} ${s.split(/\s+/).filter(Boolean).length} ${s.length}${r[0] ? " " + r[0] : ""}`; },
    grep: (a, stdin) => { const [f, r] = flags(a); if (!r.length) E("usage: grep PATTERN [FILE]"); const s = r[1] ? readFile(r[1], "grep") : stdin || ""; const pat = f.has("i") ? r[0].toLowerCase() : r[0]; const hit = lines(s).filter((x) => (f.has("i") ? x.toLowerCase() : x).includes(pat) !== f.has("v")); return f.has("c") ? String(hit.length) : hit.join("\n"); },
    rm: (a) => { const [f, r] = flags(a); if (!r.length) E("rm: missing operand"); for (const p of r) { const parts = resolve(p), n = disk.get(parts); if (!n) { if (f.has("f")) continue; E(`rm: cannot remove '${p}': No such file or directory`); } if (n.d && !f.has("r")) E(`rm: cannot remove '${p}': Is a directory`); if (!parts.length) E("rm: refusing to remove '/'"); disk.del(parts); } return ""; },
    rmdir: (a) => { for (const p of a) { const n = need(p, "rmdir"); if (!n.d) E(`rmdir: failed to remove '${p}': Not a directory`); if (Object.keys(n.c).length) E(`rmdir: failed to remove '${p}': Directory not empty`); disk.del(resolve(p)); } return ""; },
    cp: (a) => { const [f, r] = flags(a); if (r.length < 2) E("cp: missing destination file operand"); const src = need(r[0], "cp"); if (src.d && !f.has("r")) E(`cp: -r not specified; omitting directory '${r[0]}'`); let dst = resolve(r[1]); const dn = disk.get(dst); if (dn && dn.d) dst = dst.concat(resolve(r[0]).pop()); if (!disk.set(dst, clone(src))) E(`cp: cannot create '${r[1]}': No such file or directory`); return ""; },
    mv: (a) => { if (a.length < 2) E("mv: missing destination file operand"); const sp = resolve(a[0]), src = disk.get(sp) || E(`mv: cannot stat '${a[0]}': No such file or directory`); let dst = resolve(a[1]); const dn = disk.get(dst); if (dn && dn.d) dst = dst.concat(sp[sp.length - 1]); if (!disk.set(dst, src)) E(`mv: cannot move to '${a[1]}': No such file or directory`); if (dst.join("/") !== sp.join("/")) disk.del(sp); return ""; },
    chmod: (a) => { if (a.length < 2) E("chmod: missing operand"); const n = need(a[1], "chmod"); if (/\+x|7/.test(a[0])) n.x = true; return ""; },
    history: () => st.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`).join("\n"),
    ping: (a) => { const h = a.filter((x) => !x.startsWith("-") && isNaN(x))[0] || E("ping: usage: ping HOST"); return `PING ${h}: 56 data bytes\n64 bytes from ${h}: icmp_seq=1 ttl=57 time=21.4 ms\n64 bytes from ${h}: icmp_seq=2 ttl=57 time=20.9 ms\n--- ${h} ping statistics ---\n2 packets transmitted, 2 received, 0% packet loss`; },
    ip: (a) => (a[0] === "route" || a[0] === "r" ? "default via 192.168.1.1 dev eth0\n192.168.1.0/24 dev eth0 scope link src 192.168.1.24" : "1: lo: <LOOPBACK,UP> inet 127.0.0.1/8\n2: eth0: <BROADCAST,UP> inet 192.168.1.24/24 brd 192.168.1.255"),
    df: () => "Filesystem  Size  Used Avail Use% Mounted on\n/dev/sda1    40G   12G   26G  32% /", free: () => "       total   used   free\nMem:   3.8Gi  1.1Gi  2.1Gi", ps: () => "  PID TTY      CMD\n 1201 pts/0    bash\n 1340 pts/0    ps",
    man: (a) => (a[0] ? `${a[0]}: ${cmdInfo(a[0]) || "no manual entry in this lab"}` : "What manual page do you want? e.g. man ls"),
    help: () => "Commands in this lab:\npwd ls cd mkdir touch cat echo cp mv rm rmdir head tail wc grep chmod\nwhoami hostname id date uname history ping ip df free ps man clear\nYou can also use  |  to join commands and  >  or  >>  to write to a file.",
    sudo: (a, s) => (a.length ? run1(a, s) : E("usage: sudo COMMAND")),
    bash: (a) => runScript(a[0] || E("usage: bash FILE")), sh: (a) => runScript(a[0] || E("usage: sh FILE"))
  };
  function countArg(a) { let n = 10; const r = []; for (let i = 0; i < a.length; i++) { if (a[i] === "-n") n = parseInt(a[++i], 10) || 10; else if (/^-\d+$/.test(a[i])) n = parseInt(a[i].slice(1), 10); else r.push(a[i]); } return [n, r]; }
  function runScript(p) { return lines(readFile(p, "bash")).filter((l) => l.trim() && !l.trim().startsWith("#")).map((l) => exec(l, true).out).filter(Boolean).join("\n"); }
  function run1(tokens, stdin) {
    const name = tokens[0];
    if (name.startsWith("./")) { const n = need(name, "bash"); if (!n.x) E(`bash: ${name}: Permission denied`); return runScript(name); }
    if (!C[name]) E(`${name}: command not found`);
    return C[name](tokens.slice(1), stdin);
  }
  function exec(line, quiet) {
    line = line.trim(); if (!line) return { out: "" };
    if (!quiet) st.history.push(line);
    if (line === "clear") return { out: "", clear: true };
    try {
      let stdin = null, out = "";
      for (const seg of line.split("|")) {
        let tokens = tokenize(seg), target = null, append = false;
        const gi = tokens.findIndex((x) => x === ">" || x === ">>");
        if (gi >= 0) { append = tokens[gi] === ">>"; target = tokens[gi + 1]; tokens = tokens.slice(0, gi); if (!target) E("bash: syntax error near unexpected token `newline'"); }
        if (!tokens.length) E("bash: syntax error near unexpected token `|'");
        out = run1(tokens, stdin);
        if (target) { const parts = resolve(target), old = disk.get(parts); if (old && old.d) E(`bash: ${target}: Is a directory`); if (!disk.set(parts, file((append && old ? old.t : "") + out + "\n"))) E(`bash: ${target}: No such file or directory`); out = ""; }
        stdin = out;
      }
      return { out };
    } catch (e) { return { out: e.message, err: true }; }
  }
  return { exec, prompt: () => `student@lab:${show(st.cwd)}$`, disk, st, resolve, first: (line) => tokenize(line.replace(/^sudo\s+/, ""))[0] };
}

// ── Windows command line ─────────────────────────────────────
function windowsShell() {
  const HOME = ["Users", "Student"];
  const disk = new Disk(dir({ Users: dir({ Student: dir({
    Documents: dir({ "ports.txt": file("22 ssh\r\n80 http\r\n443 https\r\n"), "todo.txt": file("learn cmd\r\npractice every day\r\n") }),
    Desktop: dir({ "readme.txt": file("Welcome to the Windows lab.\r\n") }), Downloads: dir()
  }) }), Windows: dir({ System32: dir() }) }), true);
  const st = { cwd: HOME.slice(), history: [] };
  const resolve = (p) => { p = (p || "").replace(/\//g, "\\"); let parts; if (/^[a-zA-Z]:/.test(p)) parts = p.slice(2).split("\\"); else if (p.startsWith("\\")) parts = p.split("\\"); else parts = st.cwd.concat(p.split("\\")); const out = []; for (const x of parts) { if (!x || x === ".") continue; if (x === "..") out.pop(); else out.push(x); } return out; };
  const real = (parts) => { let n = disk.root; const out = []; for (const p of parts) { const k = disk.key(n, p); out.push(k || p); n = k ? n.c[k] : { d: true, c: {} }; } return out; };
  const show = (parts) => "C:\\" + real(parts).join("\\");
  const E = (m) => { throw new Error(m); };
  const NF = "The system cannot find the file specified.", NP = "The system cannot find the path specified.";
  const C = {
    cd: (a) => { if (!a.length) return show(st.cwd); const p = resolve(a.join(" ")); const n = disk.get(p); if (!n || !n.d) E(NP); st.cwd = real(p); return ""; },
    dir: (a) => { const p = resolve(a.filter((x) => !x.startsWith("/")).join(" ")); const n = disk.get(p); if (!n) E("File Not Found"); if (!n.d) return ` ${p[p.length - 1]}`; const names = Object.keys(n.c).sort(); let files = 0, dirs = 0;
      const rows = names.map((x) => { const c = n.c[x]; c.d ? dirs++ : files++; return `11/11/2026  10:00 AM    ${c.d ? "<DIR>         " : String(c.t.length).padStart(14)} ${x}`; });
      return ` Directory of ${show(p)}\n\n${rows.join("\n")}\n${String(files).padStart(16)} File(s)\n${String(dirs).padStart(16)} Dir(s)`; },
    echo: (a) => (a.length ? a.join(" ") : "ECHO is on."),
    type: (a) => { const n = disk.get(resolve(a.join(" "))); if (!a.length) E("The syntax of the command is incorrect."); if (!n) E(NF); if (n.d) E("Access is denied."); return n.t.replace(/\r?\n$/, ""); },
    mkdir: (a) => { if (!a.length) E("The syntax of the command is incorrect."); const p = resolve(a.join(" ")); if (disk.get(p)) E(`A subdirectory or file ${a.join(" ")} already exists.`); for (let i = 1; i <= p.length; i++) if (!disk.get(p.slice(0, i))) disk.set(p.slice(0, i), dir()); return ""; },
    rmdir: (a) => { const r = a.filter((x) => !x.startsWith("/")); const p = resolve(r.join(" ")), n = disk.get(p); if (!n || !n.d) E(NF); if (Object.keys(n.c).length && !a.some((x) => /^\/s$/i.test(x))) E("The directory is not empty."); disk.del(p); return ""; },
    copy: (a) => { if (a.length < 2) E("The syntax of the command is incorrect."); const src = disk.get(resolve(a[0])); if (!src || src.d) E(NF); let dst = resolve(a[1]); const dn = disk.get(dst); if (dn && dn.d) dst = dst.concat(resolve(a[0]).pop()); if (!disk.set(dst, clone(src))) E(NP); return "        1 file(s) copied."; },
    move: (a) => { if (a.length < 2) E("The syntax of the command is incorrect."); const sp = resolve(a[0]), src = disk.get(sp); if (!src) E(NF); let dst = resolve(a[1]); const dn = disk.get(dst); if (dn && dn.d) dst = dst.concat(sp[sp.length - 1]); if (!disk.set(dst, src)) E(NP); disk.del(sp); return "        1 file(s) moved."; },
    del: (a) => { if (!a.length) E("The syntax of the command is incorrect."); const p = resolve(a.join(" ")), n = disk.get(p); if (!n) E(`Could Not Find ${show(p)}`); if (n.d) E("Access is denied."); disk.del(p); return ""; },
    ren: (a) => { if (a.length < 2) E("The syntax of the command is incorrect."); const sp = resolve(a[0]), src = disk.get(sp); if (!src) E(NF); disk.set(sp.slice(0, -1).concat(a[1]), src); disk.del(sp); return ""; },
    tree: () => { const walk = (n, pre) => Object.keys(n.c).sort().filter((x) => n.c[x].d).map((x, i, arr) => `${pre}${i === arr.length - 1 ? "└───" : "├───"}${x}\n${walk(n.c[x], pre + (i === arr.length - 1 ? "    " : "│   "))}`).join(""); return `${show(st.cwd)}\n${walk(disk.get(st.cwd), "")}`.trimEnd(); },
    whoami: () => "lab\\student", hostname: () => "LAB-PC", ver: () => "Microsoft Windows [Version 10.0.22631.4317]", date: () => "The current date is: Wed 11/11/2026", time: () => "The current time is: 10:00:00.00",
    ipconfig: (a) => "Windows IP Configuration\n\nEthernet adapter Ethernet:\n   IPv4 Address. . . . . . . . . . . : 192.168.1.24\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.1.1" + (a.some((x) => /^\/all$/i.test(x)) ? "\n   Physical Address. . . . . . . . . : 00-1A-2B-3C-4D-5E\n   DHCP Enabled. . . . . . . . . . . : Yes\n   DNS Servers . . . . . . . . . . . : 192.168.1.1" : ""),
    ping: (a) => { const h = a.filter((x) => !/^[-/]/.test(x))[0] || E("Usage: ping target_name"); return `Pinging ${h} with 32 bytes of data:\nReply from ${h}: bytes=32 time=21ms TTL=57\nReply from ${h}: bytes=32 time=20ms TTL=57\n\nPing statistics for ${h}:\n    Packets: Sent = 2, Received = 2, Lost = 0 (0% loss)`; },
    tasklist: () => "Image Name                     PID Mem Usage\n========================= ======== ============\nSystem                           4      1,204 K\nexplorer.exe                  4120     98,332 K\ncmd.exe                       7788      4,912 K",
    systeminfo: () => "Host Name:                 LAB-PC\nOS Name:                   Microsoft Windows 11 Pro\nSystem Type:               x64-based PC\nTotal Physical Memory:     8,192 MB",
    help: () => "Commands in this lab:\nDIR CD MKDIR (MD) RMDIR (RD) TYPE ECHO COPY MOVE DEL REN TREE CLS\nWHOAMI HOSTNAME VER DATE TIME IPCONFIG PING TASKLIST SYSTEMINFO\nYou can use  >  or  >>  to write to a file, e.g.  echo hello > note.txt"
  };
  const ALIAS = { md: "mkdir", rd: "rmdir", chdir: "cd", erase: "del", rename: "ren", cls: "cls", "get-childitem": "dir", ls: "dir", "get-content": "type", cat: "type", "set-location": "cd", pwd: "cd", "copy-item": "copy", "remove-item": "del", "move-item": "move", "new-item": "mkdir" };
  function exec(line) {
    line = line.trim(); if (!line) return { out: "" };
    st.history.push(line);
    try {
      let tokens = tokenize(line), target = null, append = false;
      const gi = tokens.findIndex((x) => x === ">" || x === ">>");
      if (gi >= 0) { append = tokens[gi] === ">>"; target = tokens.slice(gi + 1).join(" "); tokens = tokens.slice(0, gi); if (!target) E("The syntax of the command is incorrect."); }
      let name = (tokens[0] || "").toLowerCase(); name = ALIAS[name] || name;
      if (name === "cls") return { out: "", clear: true };
      if (name === "cd.." || name === "cd\\") { tokens = ["cd", name.slice(2)]; name = "cd"; }
      if (!C[name]) E(`'${tokens[0]}' is not recognized as an internal or external command,\noperable program or batch file.`);
      let out = C[name](tokens.slice(1));
      if (target) { const parts = resolve(target), old = disk.get(parts); if (!disk.set(parts, file((append && old && !old.d ? old.t : "") + out + "\r\n"))) E(NP); out = ""; }
      return { out };
    } catch (e) { return { out: e.message, err: true }; }
  }
  return { exec, prompt: () => `${show(st.cwd)}>`, disk, st, resolve, first: (line) => { const n = (tokenize(line)[0] || "").toLowerCase(); return ALIAS[n] || n; } };
}

// ── What each command does (for the coach) ───────────────────
const WIN_INFO = {
  dir: ["lists the files and folders here.", "فایل‌ها و پوشه‌های اینجا را فهرست می‌کند."], cd: ["changes the folder you are in. 'cd ..' goes up one level.", "پوشه‌ای را که در آن هستی عوض می‌کند. «cd ..» یک پله بالا می‌رود."],
  mkdir: ["makes a new folder (short form: md).", "یک پوشه‌ی جدید می‌سازد (شکل کوتاه: md)."], rmdir: ["removes an empty folder.", "یک پوشه‌ی خالی را حذف می‌کند."],
  type: ["shows what is inside a text file.", "محتوای یک فایل متنی را نشان می‌دهد."], echo: ["prints text. With > it writes that text into a file.", "متن چاپ می‌کند. با > همان متن را داخل فایل می‌نویسد."],
  copy: ["copies a file.", "یک فایل را کپی می‌کند."], move: ["moves a file to another place.", "یک فایل را جابه‌جا می‌کند."], del: ["deletes a file for good.", "یک فایل را برای همیشه پاک می‌کند."], ren: ["renames a file.", "اسم یک فایل را عوض می‌کند."],
  tree: ["draws the folders as a tree.", "پوشه‌ها را به شکل درخت نشان می‌دهد."], ipconfig: ["shows this computer's IP address, subnet mask and gateway.", "آدرس IP، ماسک و گیت‌وی این کامپیوتر را نشان می‌دهد."],
  ping: ["checks whether another computer answers.", "بررسی می‌کند کامپیوتر دیگر جواب می‌دهد یا نه."], whoami: ["shows which user you are.", "نشان می‌دهد با کدام کاربر وارد شده‌ای."], hostname: ["shows this computer's name.", "اسم این کامپیوتر را نشان می‌دهد."],
  tasklist: ["lists the running programs.", "برنامه‌های در حال اجرا را فهرست می‌کند."], systeminfo: ["shows details about this computer.", "مشخصات این کامپیوتر را نشان می‌دهد."], ver: ["shows the Windows version.", "نسخه‌ی ویندوز را نشان می‌دهد."]
};
function cmdInfo(name, win) {
  if (win) { const w = WIN_INFO[name]; return w ? w[lang() === "fa" ? 1 : 0] : ""; }
  const data = window.SepehrBot && window.SepehrBot.teacherData;
  const c = data && data.COMMANDS.find((x) => x[0] === name);
  return c ? c[lang() === "fa" ? 3 : 2] : "";
}
const ERRORS = [
  [/command not found|is not recognized/, { en: "That command doesn't exist here. Check the spelling, or type help to see what's available.", fa: "این دستور اینجا وجود ندارد. املایش را چک کن یا help را بزن تا فهرست دستورها را ببینی." }],
  [/No such file or directory|cannot find the (file|path)|Could Not Find|File Not Found/, { en: "There is no file or folder with that name here. List what's here first (ls / dir) and mind capital letters.", fa: "فایلی یا پوشه‌ای با این اسم اینجا نیست. اول ببین چه چیزهایی هست (ls یا dir) و به حروف بزرگ و کوچک دقت کن." }],
  [/Is a directory|Not a directory|Access is denied/, { en: "You used a folder where a file was expected, or the other way round.", fa: "جایی که فایل لازم بود پوشه داده‌ای، یا برعکس." }],
  [/Permission denied/, { en: "The file isn't allowed to run yet. Give it permission with: chmod +x FILE", fa: "فایل هنوز اجازه‌ی اجرا ندارد. با این دستور اجازه بده: chmod +x FILE" }],
  [/missing|syntax of the command|usage:/i, { en: "The command needs more information after it (for example a name).", fa: "این دستور بعد از خودش اطلاعات بیشتری می‌خواهد (مثلاً یک اسم)." }],
  [/SyntaxError.*EOL|unterminated string|Invalid or unexpected token/, { en: "A quote was opened but not closed. Every \" needs a matching \".", fa: "یک علامت نقل‌قول باز شده ولی بسته نشده. هر \" باید یک \" دیگر داشته باشد." }],
  [/IndentationError|expected an indented block/, { en: "Python cares about spaces at the start of a line. The lines inside if / for / def must start with 4 spaces.", fa: "پایتون به فاصله‌ی اول خط حساس است. خط‌های داخل if / for / def باید با ۴ فاصله شروع شوند." }],
  [/NameError|is not defined/, { en: "You used a name that doesn't exist yet. Check the spelling, or define it first.", fa: "از اسمی استفاده کرده‌ای که هنوز تعریف نشده. املایش را چک کن یا اول تعریفش کن." }],
  [/TypeError/, { en: "Two kinds of value were mixed (for example text + number). Convert one of them, e.g. str(5) or int(\"5\").", fa: "دو نوع مقدار با هم قاطی شده‌اند (مثلاً متن + عدد). یکی را تبدیل کن، مثل str(5) یا int(\"5\")." }],
  [/SyntaxError/, { en: "The line isn't written in a way the language understands. Look for a missing : or ( ) or quote.", fa: "این خط طوری نوشته نشده که زبان بفهمد. دنبال : یا پرانتز یا نقل‌قولِ جاافتاده بگرد." }],
  [/ZeroDivisionError/, { en: "You divided by zero.", fa: "تقسیم بر صفر کرده‌ای." }],
  [/no such table|no such column/, { en: "That table or column doesn't exist. The tables here are students and courses.", fa: "این جدول یا ستون وجود ندارد. جدول‌های اینجا students و courses هستند." }],
  [/near ".*": syntax error|incomplete input/, { en: "The SQL isn't complete or has a typo. A SELECT looks like: SELECT columns FROM table WHERE condition;", fa: "دستور SQL ناقص است یا غلط تایپی دارد. شکل SELECT این است: SELECT ستون‌ها FROM جدول WHERE شرط;" }]
];
const explainError = (msg) => { const e = ERRORS.find(([re]) => re.test(msg)); return e ? L(e[1]) : ""; };

// ── Exercises ────────────────────────────────────────────────
const has = (out, s) => String(out).toLowerCase().includes(String(s).toLowerCase());
const M = (en, faText, hintEn, hintFa, check) => ({ text: { en, fa: faText }, hint: { en: hintEn, fa: hintFa }, check });
const ENVS = {
  linux: { kind: "term", label: { en: "Linux terminal", fa: "ترمینال لینوکس" }, missions: [
    M("Find out which folder you are in.", "ببین الان در کدام پوشه هستی.", "Type: pwd", "بنویس: pwd", (c) => c.cmd === "pwd" && !c.err),
    M("List the files and folders here.", "فایل‌ها و پوشه‌های اینجا را فهرست کن.", "Type: ls", "بنویس: ls", (c) => c.cmd === "ls" && !c.err),
    M("Make a new folder called lab.", "یک پوشه‌ی جدید به اسم lab بساز.", "Type: mkdir lab", "بنویس: mkdir lab", (c) => { const n = c.sh.disk.get(["home", "student", "lab"]); return !!(n && n.d); }),
    M("Go into the lab folder.", "وارد پوشه‌ی lab شو.", "Type: cd lab", "بنویس: cd lab", (c) => c.sh.st.cwd.join("/") === "home/student/lab"),
    M("Create a file called note.txt that contains the word hello.", "یک فایل به اسم note.txt بساز که کلمه‌ی hello داخلش باشد.", "Type: echo hello > note.txt", "بنویس: echo hello > note.txt", (c) => { const n = c.sh.disk.get(["home", "student", "lab", "note.txt"]); return !!(n && !n.d && has(n.t, "hello")); }),
    M("Show what is inside note.txt.", "محتوای note.txt را نشان بده.", "Type: cat note.txt", "بنویس: cat note.txt", (c) => c.cmd === "cat" && has(c.out, "hello") && !c.err),
    M("Go back home (cd ~) and find the failed logins: show the lines of logs/auth.log that contain Failed.", "به پوشه‌ی خانه برگرد (cd ~) و ورودهای ناموفق را پیدا کن: خط‌هایی از logs/auth.log که Failed دارند.", "Type: cd ~  then: grep Failed logs/auth.log", "بنویس: cd ~ و بعد: grep Failed logs/auth.log", (c) => c.cmd !== "cd" && has(c.out, "Failed password") && !has(c.out, "Accepted") && !c.err),
    M("Count those failed lines by joining two commands with a pipe.", "با وصل‌کردن دو دستور با پایپ، تعداد همان خط‌های ناموفق را بشمار.", "Type: grep Failed logs/auth.log | wc -l", "بنویس: grep Failed logs/auth.log | wc -l", (c) => c.line.includes("|") && /^3\b/.test(c.out.trim()) && !c.err)
  ] },
  windows: { kind: "term", label: { en: "Windows CMD", fa: "خط فرمان ویندوز" }, missions: [
    M("List the files and folders here.", "فایل‌ها و پوشه‌های اینجا را فهرست کن.", "Type: dir", "بنویس: dir", (c) => c.cmd === "dir" && !c.err),
    M("Go into the Documents folder.", "وارد پوشه‌ی Documents شو.", "Type: cd Documents", "بنویس: cd Documents", (c) => c.sh.st.cwd.join("/").toLowerCase() === "users/student/documents"),
    M("Make a new folder called lab.", "یک پوشه‌ی جدید به اسم lab بساز.", "Type: mkdir lab", "بنویس: mkdir lab", (c) => { const n = c.sh.disk.get(["Users", "Student", "Documents", "lab"]); return !!(n && n.d); }),
    M("Create a file called note.txt that contains the word hello.", "یک فایل به اسم note.txt بساز که کلمه‌ی hello داخلش باشد.", "Type: echo hello > note.txt", "بنویس: echo hello > note.txt", (c) => { const n = c.sh.disk.get(c.sh.st.cwd.concat("note.txt")); return !!(n && !n.d && has(n.t, "hello")); }),
    M("Show what is inside note.txt.", "محتوای note.txt را نشان بده.", "Type: type note.txt", "بنویس: type note.txt", (c) => c.cmd === "type" && has(c.out, "hello") && !c.err),
    M("Make a copy of note.txt called backup.txt.", "از note.txt یک کپی به اسم backup.txt بساز.", "Type: copy note.txt backup.txt", "بنویس: copy note.txt backup.txt", (c) => !!c.sh.disk.get(c.sh.st.cwd.concat("backup.txt"))),
    M("Find this computer's IP address.", "آدرس IP این کامپیوتر را پیدا کن.", "Type: ipconfig", "بنویس: ipconfig", (c) => c.cmd === "ipconfig" && !c.err),
    M("Delete backup.txt.", "فایل backup.txt را پاک کن.", "Type: del backup.txt", "بنویس: del backup.txt", (c) => c.cmd === "del" && !c.err && !c.sh.disk.get(c.sh.st.cwd.concat("backup.txt")))
  ] },
  python: { kind: "code", label: { en: "Python", fa: "پایتون" }, start: 'print("Hello, world!")\n', missions: [
    M("Print the sentence: Hello, world!", "این جمله را چاپ کن: Hello, world!", 'print("Hello, world!")', 'print("Hello, world!")', (c) => !c.err && has(c.out, "hello, world")),
    M("Make a variable called name with your name in it, then print: Hi, <name>", "یک متغیر به اسم name با اسم خودت بساز و چاپ کن: Hi, <name>", 'name = "Sara"\nprint("Hi,", name)', 'name = "Sara"\nprint("Hi,", name)', (c) => !c.err && /\bname\s*=/.test(c.code) && /^Hi,?\s+\S+/m.test(c.out)),
    M("Use a for loop to print the numbers 1 to 5, one per line.", "با یک حلقه‌ی for عددهای ۱ تا ۵ را هر کدام در یک خط چاپ کن.", "for i in range(1, 6):\n    print(i)", "for i in range(1, 6):\n    print(i)", (c) => !c.err && /\bfor\b/.test(c.code) && c.out.trim().split(/\s+/).join(",") === "1,2,3,4,5"),
    M("Make a list ports = [22, 80, 443] and print how many items it has.", "یک لیست ports = [22, 80, 443] بساز و تعداد عضوهایش را چاپ کن.", "ports = [22, 80, 443]\nprint(len(ports))", "ports = [22, 80, 443]\nprint(len(ports))", (c) => !c.err && /len\s*\(/.test(c.code) && c.out.trim() === "3"),
    M("Write a function square(n) that returns n times n, and print square(7).", "تابعی به اسم square(n) بنویس که n ضرب در n را برگرداند و square(7) را چاپ کن.", "def square(n):\n    return n * n\n\nprint(square(7))", "def square(n):\n    return n * n\n\nprint(square(7))", (c) => !c.err && /def\s+square/.test(c.code) && c.out.trim() === "49"),
    M("Set port = 443. If port is 443 print secure, otherwise print not secure.", "port = 443 بگذار. اگر port برابر ۴۴۳ بود secure و وگرنه not secure چاپ کن.", 'port = 443\nif port == 443:\n    print("secure")\nelse:\n    print("not secure")', 'port = 443\nif port == 443:\n    print("secure")\nelse:\n    print("not secure")', (c) => !c.err && /\bif\b/.test(c.code) && /\belse\b/.test(c.code) && c.out.trim() === "secure")
  ] },
  javascript: { kind: "code", label: { en: "JavaScript", fa: "جاوااسکریپت" }, start: 'console.log("Hello, world!");\n', missions: [
    M("Print the sentence: Hello, world!", "این جمله را چاپ کن: Hello, world!", 'console.log("Hello, world!");', 'console.log("Hello, world!");', (c) => !c.err && has(c.out, "hello, world")),
    M("Make a variable called name, then print: Hi, <name>", "یک متغیر به اسم name بساز و چاپ کن: Hi, <name>", 'let name = "Sara";\nconsole.log(`Hi, ${name}`);', 'let name = "Sara";\nconsole.log(`Hi, ${name}`);', (c) => !c.err && /\b(let|const|var)\s+name\b/.test(c.code) && /^Hi,?\s+\S+/m.test(c.out)),
    M("Use a for loop to print the numbers 1 to 5.", "با یک حلقه‌ی for عددهای ۱ تا ۵ را چاپ کن.", "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", (c) => !c.err && /\bfor\b/.test(c.code) && c.out.trim().split(/\s+/).join(",") === "1,2,3,4,5"),
    M("Make an array ports = [22, 80, 443] and print its length.", "یک آرایه ports = [22, 80, 443] بساز و طولش را چاپ کن.", "const ports = [22, 80, 443];\nconsole.log(ports.length);", "const ports = [22, 80, 443];\nconsole.log(ports.length);", (c) => !c.err && /\.length/.test(c.code) && c.out.trim() === "3"),
    M("Write a function square(n) and print square(7).", "تابعی به اسم square(n) بنویس و square(7) را چاپ کن.", "function square(n) {\n  return n * n;\n}\nconsole.log(square(7));", "function square(n) {\n  return n * n;\n}\nconsole.log(square(7));", (c) => !c.err && /square/.test(c.code) && c.out.trim() === "49")
  ] },
  html: { kind: "html", label: { en: "HTML & CSS", fa: "HTML و CSS" }, start: "<!-- write your HTML here, then press Run -->\n", missions: [
    M("Make a big heading with <h1> that says anything you like.", "با <h1> یک تیتر بزرگ با هر متنی که دوست داری بساز.", "<h1>My page</h1>", "<h1>My page</h1>", (c) => !!c.doc.querySelector("h1") && c.doc.querySelector("h1").textContent.trim().length > 0),
    M("Add a paragraph with <p> under the heading.", "زیر تیتر یک پاراگراف با <p> اضافه کن.", "<p>Some text here.</p>", "<p>Some text here.</p>", (c) => !!c.doc.querySelector("h1") && !!c.doc.querySelector("p") && c.doc.querySelector("p").textContent.trim().length > 0),
    M("Add a link to https://sepehrniaz.ir with <a>.", "با <a> یک لینک به https://sepehrniaz.ir اضافه کن.", '<a href="https://sepehrniaz.ir">My site</a>', '<a href="https://sepehrniaz.ir">My site</a>', (c) => [...c.doc.querySelectorAll("a")].some((a) => /sepehrniaz\.ir/.test(a.getAttribute("href") || ""))),
    M("Make a list with <ul> that has three <li> items.", "با <ul> یک فهرست با سه مورد <li> بساز.", "<ul>\n  <li>Linux</li>\n  <li>Python</li>\n  <li>SQL</li>\n</ul>", "<ul>\n  <li>Linux</li>\n  <li>Python</li>\n  <li>SQL</li>\n</ul>", (c) => [...c.doc.querySelectorAll("ul")].some((u) => u.querySelectorAll("li").length >= 3)),
    M("Use a <style> block to change the colour of the heading.", "با یک بلوک <style> رنگ تیتر را عوض کن.", "<style>\n  h1 { color: teal; }\n</style>", "<style>\n  h1 { color: teal; }\n</style>", (c) => /<style[\s\S]*h1[\s\S]*color\s*:/i.test(c.code))
  ] },
  sql: { kind: "sql", label: { en: "SQL", fa: "SQL" }, start: "SELECT * FROM students;\n", missions: [
    M("Show every row of the students table.", "همه‌ی ردیف‌های جدول students را نشان بده.", "SELECT * FROM students;", "SELECT * FROM students;", (c) => !c.err && c.rows >= 6 && /from\s+students/i.test(c.code)),
    M("Show only the students whose city is Shiraz.", "فقط دانش‌آموزهایی را نشان بده که شهرشان Shiraz است.", "SELECT * FROM students WHERE city = 'Shiraz';", "SELECT * FROM students WHERE city = 'Shiraz';", (c) => !c.err && /where/i.test(c.code) && c.rows === 3 && has(c.out, "Shiraz") && !has(c.out, "Tehran")),
    M("Show name and grade, sorted from the highest grade to the lowest.", "ستون‌های name و grade را نشان بده، از بیشترین نمره به کمترین.", "SELECT name, grade FROM students ORDER BY grade DESC;", "SELECT name, grade FROM students ORDER BY grade DESC;", (c) => !c.err && /order\s+by\s+grade\s+desc/i.test(c.code) && c.rows >= 6),
    M("Count how many students there are.", "تعداد دانش‌آموزها را بشمار.", "SELECT COUNT(*) FROM students;", "SELECT COUNT(*) FROM students;", (c) => !c.err && /count\s*\(/i.test(c.code) && c.rows === 1),
    M("Add a new student of your own with INSERT.", "با INSERT یک دانش‌آموز جدید اضافه کن.", "INSERT INTO students (name, city, grade) VALUES ('Sara', 'Shiraz', 19);", "INSERT INTO students (name, city, grade) VALUES ('Sara', 'Shiraz', 19);", (c) => !c.err && /insert\s+into\s+students/i.test(c.code) && c.count >= 7),
    M("Find the average grade in each city.", "میانگین نمره را برای هر شهر پیدا کن.", "SELECT city, AVG(grade) FROM students GROUP BY city;", "SELECT city, AVG(grade) FROM students GROUP BY city;", (c) => !c.err && /group\s+by\s+city/i.test(c.code) && /avg\s*\(/i.test(c.code))
  ] }
};
const ORDER = ["linux", "windows", "python", "javascript", "html", "sql"];

// ── Page state ───────────────────────────────────────────────
const store = { get: (k, d) => { try { const v = localStorage.getItem("practice:" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } }, set: (k, v) => { try { localStorage.setItem("practice:" + k, JSON.stringify(v)); } catch (e) {} } };
let env = ORDER.includes(store.get("env", "linux")) ? store.get("env", "linux") : "linux";
const shells = {}, feeds = {};
const progress = (e) => Math.min(store.get("done:" + e, 0), ENVS[e].missions.length);
const work = $("pr-work"), coachBox = $("pr-coach");

function coachSay(text, kind, cmd) { (feeds[env] = feeds[env] || []).unshift({ text, kind: kind || "info", cmd }); feeds[env] = feeds[env].slice(0, 6); paintCoach(); }
function paintCoach() {
  const E = ENVS[env], i = progress(env), n = E.missions.length, m = E.missions[i];
  const feed = (feeds[env] || []).map((f) => `<p class="pr-say ${f.kind}">${f.cmd ? `<code dir="ltr">${esc(f.cmd)}</code> ` : ""}${esc(f.text)}</p>`).join("");
  coachBox.innerHTML = `<div class="pr-coach-head"><span class="pr-bot" aria-hidden="true">✦</span><b>${esc(t("coach"))}</b><span class="pr-dots">${E.missions.map((_, k) => `<i class="${k < i ? "done" : k === i ? "now" : ""}"></i>`).join("")}</span></div>` +
    (m ? `<div class="pr-mission"><small>${esc(t("mission")(num(i + 1), num(n)))}</small><p>${esc(L(m.text))}</p><div class="pr-mission-btns"><button type="button" class="vis-chip" id="pr-hint">${esc(t("hint"))}</button><button type="button" class="vis-chip" id="pr-skip">${esc(t("skip"))}</button></div></div>`
      : `<div class="pr-mission done"><p>${esc(t("allDone"))}</p><div class="pr-mission-btns"><button type="button" class="vis-chip" id="pr-again">${esc(t("again"))}</button></div></div>`) +
    `<div class="pr-feed" aria-live="polite">${feed || `<p class="pr-say info">${esc(t("welcome"))}</p>`}</div>`;
  const hint = $("pr-hint"), skip = $("pr-skip"), again = $("pr-again");
  if (hint) hint.onclick = () => coachSay("💡 " + L(m.hint), "hint");
  if (skip) skip.onclick = () => { store.set("done:" + env, i + 1); paintCoach(); };
  if (again) again.onclick = () => { store.set("done:" + env, 0); feeds[env] = []; paintCoach(); };
}
// after every run: is the exercise solved? otherwise explain the command or the error
function judge(ctx) {
  const E = ENVS[env], i = progress(env), m = E.missions[i];
  let ok = false;
  try { ok = !!(m && m.check(ctx)); } catch (e) { ok = false; }
  if (ok) {
    store.set("done:" + env, i + 1);
    const praise = L(UI.solved)[i % 3];
    const info = ctx.cmd ? cmdInfo(ctx.cmd, env === "windows") : "";
    coachSay(praise, "ok"); if (info) coachSay(info, "info", ctx.cmd);
    return;
  }
  if (ctx.err) { coachSay("⚠️ " + (explainError(ctx.out) || ctx.out.split("\n").pop()), "warn"); return; }
  const info = ctx.cmd ? cmdInfo(ctx.cmd, env === "windows") : "";
  if (info) coachSay(info, "info", ctx.cmd);
  else if (m && E.kind !== "term") coachSay(t("notThis"), "info");
}

// ── Terminal ─────────────────────────────────────────────────
function mountTerminal() {
  const sh = shells[env] || (shells[env] = env === "linux" ? linuxShell() : windowsShell());
  work.innerHTML = `<div class="pr-term ${env}" dir="ltr"><div class="terminal-bar"><span></span><span></span><span></span><em>${env === "linux" ? "student@lab: ~" : "Command Prompt"}</em><button type="button" class="pr-reset" id="pr-reset">${esc(t("reset"))}</button></div><div class="pr-screen" id="pr-screen"></div><form class="pr-line" id="pr-form"><label for="pr-in" id="pr-prompt"></label><input id="pr-in" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" aria-label="${esc(t("typeHere"))}"></form></div><p class="muted pr-tip">${esc(t("tip"))}</p>`;
  const screen = $("pr-screen"), input = $("pr-in"), prompt = $("pr-prompt");
  let hi = sh.st.history.length;
  const banner = env === "linux" ? "Welcome to the Linux practice lab (simulated Ubuntu 24.04). Type help to see the commands." : "Microsoft Windows [Version 10.0.22631.4317]\n(c) practice lab — simulated. Type help to see the commands.";
  screen.innerHTML = `<div class="o">${esc(banner)}</div>` + (sh.log || "");
  const paintPrompt = () => { prompt.textContent = sh.prompt(); };
  paintPrompt(); screen.scrollTop = screen.scrollHeight;
  $("pr-form").onsubmit = (e) => {
    e.preventDefault();
    const line = input.value; input.value = "";
    const shown = sh.prompt();
    const r = sh.exec(line);
    if (r.clear) { sh.log = ""; screen.innerHTML = ""; }
    else { const html = `<div><span class="p">${esc(shown)}</span> <span class="k">${esc(line)}</span></div>` + (r.out ? `<div class="${r.err ? "e" : "o"}">${esc(r.out)}</div>` : ""); sh.log = ((sh.log || "") + html).slice(-20000); screen.insertAdjacentHTML("beforeend", html); }
    hi = sh.st.history.length; paintPrompt(); screen.scrollTop = screen.scrollHeight;
    if (line.trim()) judge({ sh, line, cmd: sh.first(line), out: r.out || "", err: !!r.err });
  };
  input.onkeydown = (e) => {
    if (e.key === "ArrowUp") { e.preventDefault(); if (hi > 0) input.value = sh.st.history[--hi]; }
    else if (e.key === "ArrowDown") { e.preventDefault(); hi = Math.min(sh.st.history.length, hi + 1); input.value = sh.st.history[hi] || ""; }
  };
  $("pr-reset").onclick = () => { delete shells[env]; mountTerminal(); };
  work.querySelector(".pr-term").onclick = (e) => { if (!window.getSelection().toString() && e.target.id !== "pr-reset") input.focus({ preventScroll: true }); };
}

// ── Code runners ─────────────────────────────────────────────
let pyWorker = null, pyReady = false, sqlDb = null, sqlInit = null;
function runJS(code) {
  return new Promise((resolve) => {
    const src = "self.onmessage=function(e){var out=[];var f=function(){out.push(Array.prototype.map.call(arguments,function(x){try{return typeof x==='object'&&x!==null?JSON.stringify(x):String(x)}catch(_){return String(x)}}).join(' '))};console.log=console.info=console.warn=console.error=f;try{(0,eval)(e.data);self.postMessage({out:out.join('\\n')})}catch(err){self.postMessage({out:out.join('\\n'),err:String(err)})}}";
    const w = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
    const timer = setTimeout(() => { w.terminate(); resolve({ out: "", err: t("timeout") }); }, 4000);
    w.onmessage = (e) => { clearTimeout(timer); w.terminate(); resolve(e.data); };
    w.onerror = (e) => { clearTimeout(timer); w.terminate(); resolve({ out: "", err: String(e.message || e) }); };
    w.postMessage(code);
  });
}
function runPython(code, onStatus) {
  return new Promise((resolve) => {
    if (!pyWorker) { pyWorker = new Worker(BASE + "py-worker.mjs", { type: "module" }); pyReady = false; }
    if (!pyReady) onStatus(t("loadingPy"));
    const id = Math.random();
    let timer = null;
    const arm = () => { timer = setTimeout(() => { pyWorker.terminate(); pyWorker = null; pyReady = false; resolve({ out: "", err: t("timeout") }); }, 12000); };
    if (pyReady) arm();
    pyWorker.onmessage = (e) => {
      if (e.data.ready) { pyReady = true; onStatus(""); arm(); return; }
      if (e.data.id !== id) return;
      clearTimeout(timer);
      let err = e.data.err || "";
      if (err) { const k = err.lastIndexOf('File "<exec>"'); err = (k >= 0 ? err.slice(k) : err).trim(); }
      resolve({ out: e.data.out || "", err });
    };
    pyWorker.onerror = (e) => { clearTimeout(timer); pyWorker = null; pyReady = false; resolve({ out: "", err: String(e.message || "Python could not be loaded") }); };
    pyWorker.postMessage({ id, code });
  });
}
const SEED = "CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, city TEXT, grade INTEGER);INSERT INTO students (name, city, grade) VALUES ('Ali','Shiraz',17),('Sara','Tehran',19),('Reza','Shiraz',14),('Mina','Isfahan',18),('Omid','Tehran',12),('Neda','Shiraz',20);CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, hours INTEGER);INSERT INTO courses (title, hours) VALUES ('Linux basics',20),('Networking',30),('Python',40);";
async function sqlReady(onStatus) {
  if (sqlDb) return sqlDb;
  onStatus(t("loadingSql"));
  if (!sqlInit) sqlInit = new Promise((res, rej) => { const s = document.createElement("script"); s.src = BASE + "sql/sql-wasm.js"; s.onload = () => window.initSqlJs({ locateFile: (f) => BASE + "sql/" + f }).then(res, rej); s.onerror = () => rej(new Error("SQL engine could not be loaded")); document.head.appendChild(s); });
  const SQL = await sqlInit; sqlDb = new SQL.Database(); sqlDb.run(SEED); onStatus("");
  return sqlDb;
}
async function runSQL(code, onStatus) {
  try {
    const db = await sqlReady(onStatus);
    const res = db.exec(code);
    const count = db.exec("SELECT COUNT(*) FROM students")[0].values[0][0];
    if (!res.length) return { out: t("okSql"), rows: 0, count, table: "" };
    const last = res[res.length - 1];
    const table = `<table><tr>${last.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr>${last.values.map((r) => `<tr>${r.map((v) => `<td>${esc(v == null ? "NULL" : typeof v === "number" && !Number.isInteger(v) ? v.toFixed(2) : v)}</td>`).join("")}</tr>`).join("")}</table>`;
    return { out: last.values.map((r) => r.join(" | ")).join("\n"), rows: last.values.length, count, table };
  } catch (e) { return { out: String(e.message || e), err: String(e.message || e), rows: 0, count: 0 }; }
}

function mountEditor() {
  const E = ENVS[env], kind = E.kind;
  work.innerHTML = `<div class="pr-editor"><div class="pr-editor-bar"><b>${esc(L(E.label))}</b><span><button type="button" class="vis-chip" id="pr-reset">${esc(t("reset"))}</button><button type="button" class="btn primary sm" id="pr-run">${esc(t("run"))}</button></span></div><textarea id="pr-code" dir="ltr" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="${esc(L(E.label))}"></textarea></div><div class="pr-out"><div class="pr-out-bar">${esc(kind === "html" ? t("preview") : t("output"))}</div>${kind === "html" ? '<iframe id="pr-frame" sandbox="allow-scripts" title="preview"></iframe>' : '<div class="pr-result" id="pr-result" dir="ltr"></div>'}</div>`;
  const code = $("pr-code"), result = $("pr-result");
  code.value = store.get("code:" + env, E.start);
  const setStatus = (s) => { if (result && s) result.innerHTML = `<p class="pr-status"><span class="vis-spin"></span>${esc(s)}</p>`; };
  let running = false;
  async function run(quiet) {
    if (running) return; running = true; $("pr-run").disabled = true;
    const src = code.value; store.set("code:" + env, src);
    try {
      if (kind === "html") {
        $("pr-frame").srcdoc = `<!doctype html><meta charset="utf-8"><style>body{font:16px system-ui,sans-serif;margin:16px;color:#111;background:#fff}</style>${src}`;
        if (!quiet) judge({ code: src, out: "", doc: new DOMParser().parseFromString(src, "text/html") });
      } else if (kind === "sql") {
        const r = await runSQL(src, setStatus);
        result.innerHTML = r.err ? `<pre class="e">${esc(r.err)}</pre>` : (r.table || `<pre class="o">${esc(r.out)}</pre>`) + (r.table ? `<p class="pr-rows">${esc(t("rows")(num(r.rows)))}</p>` : "");
        judge({ code: src, out: r.out, err: !!r.err, rows: r.rows, count: r.count });
      } else {
        const r = env === "python" ? await runPython(src, setStatus) : await runJS(src);
        result.innerHTML = (r.out ? `<pre class="o">${esc(r.out.replace(/\n$/, ""))}</pre>` : "") + (r.err ? `<pre class="e">${esc(r.err)}</pre>` : "") || `<pre class="o muted">${esc(t("noOutput"))}</pre>`;
        judge({ code: src, out: r.err ? r.err : r.out, err: !!r.err });
      }
    } finally { running = false; const b = $("pr-run"); if (b) b.disabled = false; }
  }
  $("pr-run").onclick = () => run();
  $("pr-reset").onclick = () => { code.value = E.start; store.set("code:" + env, E.start); if (kind === "sql") sqlDb = null; if (result) result.innerHTML = ""; };
  code.onkeydown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") { e.preventDefault(); run(); }
    else if (e.key === "Tab") { e.preventDefault(); const s = code.selectionStart; code.setRangeText(env === "python" ? "    " : "  ", s, code.selectionEnd, "end"); }
  };
  code.oninput = () => store.set("code:" + env, code.value);
  if (kind === "html") run(true);
}

function mount() {
  document.querySelectorAll("#pr-tabs button").forEach((b) => { const on = b.dataset.env === env; b.classList.toggle("on", on); b.setAttribute("aria-selected", on); });
  work.className = "pr-work " + ENVS[env].kind;
  ENVS[env].kind === "term" ? mountTerminal() : mountEditor();
  paintCoach();
}
function paintStatic() {
  document.querySelectorAll("[data-v]").forEach((el) => { if (UI[el.dataset.v]) el.textContent = t(el.dataset.v); });
  $("pr-tabs").innerHTML = ORDER.map((e) => `<button type="button" role="tab" data-env="${e}">${esc(L(ENVS[e].label))}</button>`).join("");
  $("pr-tabs").querySelectorAll("button").forEach((b) => (b.onclick = () => { env = b.dataset.env; store.set("env", env); mount(); }));
  document.title = t("pageTitle");
}
document.addEventListener("cv:langchange", () => { paintStatic(); mount(); });
paintStatic(); mount();

// For automated checks
window.__practice = {
  term: (name, line) => { env = name; mount(); const sh = shells[name]; const r = sh.exec(line); judge({ sh, line, cmd: sh.first(line), out: r.out || "", err: !!r.err }); return { out: r.out, err: !!r.err, done: progress(name), prompt: sh.prompt() }; },
  code: async (name, src) => { env = name; mount(); $("pr-code").value = src; $("pr-run").click(); await new Promise((r) => { const iv = setInterval(() => { if (!$("pr-run") || !$("pr-run").disabled) { clearInterval(iv); r(); } }, 100); }); return { out: ($("pr-result") || { innerText: "" }).innerText, done: progress(name), coach: (feeds[name] || [{}])[0].text }; },
  reset: () => { ORDER.forEach((e) => store.set("done:" + e, 0)); }
};
