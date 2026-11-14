// ─────────────────────────────────────────────────────────────
//  Learning content for the site. Everything here is original,
//  written for sepehrniaz.ir. Add new tracks and articles by
//  editing this file — the site renders them automatically.
//
//  Text is bilingual: { en: "…", fa: "…" }.
//  Article blocks (in order):
//    { h:  {en,fa} }                       heading inside the article
//    { p:  {en,fa} }                       paragraph
//    { list: { en:[…], fa:[…] } }          bullet list
//    { code: "…", lang: "python", cap:{en,fa} }   code you can copy
//    { term: "…", cmd: "…", cap:{en,fa} }  a real terminal session
//    { img: "assets/learn/x.png", cap:{en,fa}, alt:"" }   an image
//    { note: {en,fa}, kind: "tip" | "warn" }   a highlighted callout
// ─────────────────────────────────────────────────────────────
window.LEARN = {
  tracks: [
    {
      id: "linux", icon: "terminal", accent: "c1",
      title: { en: "Linux", fa: "لینوکس" },
      desc: { en: "The command line, step by step — on a real Linux system.", fa: "خط فرمان، گام‌به‌گام — روی یک سیستم واقعی لینوکس." }
    },
    {
      id: "programming", icon: "code", accent: "c2",
      title: { en: "Programming", fa: "برنامه‌نویسی" },
      desc: { en: "Friendly first steps in the languages that matter.", fa: "شروعی ساده با زبان‌هایی که به کارت می‌آیند." }
    },
    {
      id: "network", icon: "network", accent: "c1",
      title: { en: "Networking", fa: "شبکه" },
      desc: { en: "How networks really work, from IP to the tools.", fa: "شبکه واقعاً چطور کار می‌کند، از IP تا ابزارها." }
    },
    {
      id: "security", icon: "shield", accent: "c3",
      title: { en: "Security", fa: "امنیت" },
      desc: { en: "Defend first. Understand attacks to stop them.", fa: "اول دفاع. حمله را بشناس تا جلویش را بگیری." }
    }
  ],

  articles: [
    // ───────────────────────── LINUX ─────────────────────────
    {
      id: "linux-first-steps", track: "linux", icon: "terminal",
      level: "beginner", minutes: 8, updated: "2026-11",
      cover: "assets/learn/linux-terminal.png",
      title: { en: "Your first steps in the Linux terminal", fa: "اولین قدم‌ها در ترمینال لینوکس" },
      summary: {
        en: "Open a terminal, find out where you are, and run your first real commands — with the exact output from a live Ubuntu system.",
        fa: "ترمینال را باز کن، بفهم کجا هستی، و اولین دستورهای واقعی‌ات را اجرا کن — با خروجی دقیق از یک سیستم واقعی اوبونتو."
      },
      blocks: [
        { p: {
          en: "The terminal is a text window where you type a command and the computer does exactly what you asked. It looks intimidating at first, but it is just a conversation: you type a line, press Enter, and read the answer. Everything below was run on a real Ubuntu 24.04 machine — the output you see is the real thing, not a drawing.",
          fa: "ترمینال یک پنجره‌ی متنی است که در آن یک دستور تایپ می‌کنی و کامپیوتر دقیقاً همان کاری را که خواستی انجام می‌دهد. اولش ترسناک به نظر می‌رسد، اما در واقع یک گفتگوست: یک خط تایپ می‌کنی، Enter می‌زنی، و جواب را می‌خوانی. همه‌ی چیزهای زیر روی یک سیستم واقعی اوبونتو ۲۴.۰۴ اجرا شده‌اند — خروجی که می‌بینی واقعی است، نه نقاشی."
        } },
        { img: "assets/learn/linux-terminal.png", cap: { en: "A real terminal on Ubuntu 24.04 — this is what you'll be typing into.", fa: "یک ترمینال واقعی روی اوبونتو ۲۴.۰۴ — همین جایی است که در آن تایپ می‌کنی." }, alt: "Ubuntu terminal showing whoami, pwd, ls and uptime commands" },
        { h: { en: "Who am I, and where am I?", fa: "من کی‌ام و کجا هستم؟" } },
        { p: {
          en: "Two commands answer the first questions every beginner has. whoami prints your username, and pwd (print working directory) shows the folder you are standing in right now.",
          fa: "دو دستور به اولین سؤال‌های هر تازه‌کار جواب می‌دهند. دستور whoami نام کاربری‌ات را چاپ می‌کند، و pwd (مخفف print working directory) پوشه‌ای را که همین الان داخلش هستی نشان می‌دهد."
        } },
        { term: "$ whoami\nroot\n$ pwd\n/tmp", cap: { en: "You are the user “root”, standing in the /tmp folder.", fa: "تو کاربر «root» هستی، و داخل پوشه‌ی /tmp ایستاده‌ای." } },
        { note: { en: "The $ at the start of the line is the prompt — the terminal waiting for you. You don't type it; you type what comes after it.", fa: "علامت $ ابتدای خط، همان «پرامپت» است — یعنی ترمینال منتظر توست. آن را تایپ نمی‌کنی؛ فقط چیزی را که بعد از آن می‌آید تایپ می‌کنی." }, kind: "tip" },
        { h: { en: "What is this machine?", fa: "این دستگاه چیست؟" } },
        { p: {
          en: "uname -a describes the system itself: the kernel name, the version, and the processor type. It's the first thing a technician runs on an unfamiliar machine.",
          fa: "دستور uname -a خودِ سیستم را توصیف می‌کند: نام هسته، نسخه، و نوع پردازنده. این اولین چیزی است که یک تکنسین روی یک دستگاه ناآشنا اجرا می‌کند."
        } },
        { term: "$ uname -a\nLinux vm 6.18.44 #1 SMP x86_64 GNU/Linux\n$ cat /etc/os-release | head -1\nPRETTY_NAME=\"Ubuntu 24.04.5 LTS\"", cap: { en: "A 64-bit Linux machine running Ubuntu 24.04.", fa: "یک دستگاه لینوکس ۶۴ بیتی که اوبونتو ۲۴.۰۴ روی آن اجرا می‌شود." } },
        { h: { en: "Is the machine healthy?", fa: "دستگاه سالم است؟" } },
        { p: {
          en: "Three quick commands tell you how a server is doing: uptime (how long it has been running), df -h (disk space), and free -h (memory). As an IT technician these are the first things you check when someone says “it's slow”.",
          fa: "سه دستور سریع می‌گویند حال یک سرور چطور است: uptime (چه مدت روشن بوده)، df -h (فضای دیسک)، و free -h (حافظه). به‌عنوان تکنسین IT، وقتی کسی می‌گوید «کند شده»، اولین چیزهایی که چک می‌کنی همین‌ها هستند."
        } },
        { term: "$ uptime -p\nup 13 minutes\n$ df -h /\n/dev/vda  252G  8.8G  30G  23% /\n$ free -h\n        total   used   free\nMem:     15Gi  553Mi   15Gi", cap: { en: "Up 13 minutes, disk 23% full, plenty of free memory.", fa: "۱۳ دقیقه روشن، دیسک ۲۳٪ پر، و حافظه‌ی آزاد فراوان." } },
        { h: { en: "What to remember", fa: "چه چیزی را به خاطر بسپاری" } },
        { list: {
          en: ["whoami — your username", "pwd — the folder you are in", "uname -a — the system and kernel", "uptime, df -h, free -h — the machine's health"],
          fa: ["whoami — نام کاربری‌ات", "pwd — پوشه‌ای که داخلش هستی", "uname -a — سیستم و هسته", "uptime و df -h و free -h — سلامت دستگاه"]
        } },
        { note: { en: "Nothing here changes anything on the computer — these commands only look and report. They are completely safe to run.", fa: "هیچ‌کدام از این‌ها چیزی را روی کامپیوتر تغییر نمی‌دهند — این دستورها فقط نگاه می‌کنند و گزارش می‌دهند. اجرای‌شان کاملاً بی‌خطر است." }, kind: "tip" }
      ]
    },

    {
      id: "linux-files", track: "linux", icon: "folder",
      level: "beginner", minutes: 9, updated: "2026-11",
      title: { en: "Files and folders on the command line", fa: "فایل‌ها و پوشه‌ها در خط فرمان" },
      summary: {
        en: "List, create, move and delete files without a mouse — the handful of commands you'll use every single day.",
        fa: "فهرست‌گرفتن، ساختن، جابه‌جا کردن و حذف فایل‌ها بدون ماوس — همان چند دستوری که هر روز استفاده می‌کنی."
      },
      blocks: [
        { p: {
          en: "Everything in Linux is a file, and you spend most of your time moving between folders and looking at what's inside them. Six commands cover almost all of it: ls, cd, mkdir, touch, cp, mv and rm. Let's build a small workspace and use each one.",
          fa: "در لینوکس همه‌چیز یک فایل است، و بیشتر وقتت را صرف جابه‌جا شدن بین پوشه‌ها و دیدن محتوای آن‌ها می‌کنی. شش دستور تقریباً همه‌ی کار را پوشش می‌دهند: ls و cd و mkdir و touch و cp و mv و rm. بیا یک فضای کاری کوچک بسازیم و هرکدام را به کار ببریم."
        } },
        { h: { en: "Looking: ls", fa: "نگاه کردن: ls" } },
        { p: {
          en: "ls lists what's in the current folder. Add -l for a detailed list (permissions, owner, size, date) and you see the real shape of each item — a dash means a file, a d means a directory.",
          fa: "دستور ls محتوای پوشه‌ی فعلی را فهرست می‌کند. با افزودن -l یک فهرست کامل می‌گیری (مجوزها، مالک، اندازه، تاریخ) و شکل واقعی هر مورد را می‌بینی — خط تیره یعنی فایل، و d یعنی پوشه (directory)."
        } },
        { term: "$ ls -l\ntotal 4\n-rw-r--r-- 1 root root    0 Nov  2 11:56 notes.txt\ndrwxr-xr-x 2 root root 4096 Nov  2 11:56 projects\n-rw-r--r-- 1 root root    0 Nov  2 11:56 report.pdf", cap: { en: "Two files and one folder (projects, marked with d).", fa: "دو فایل و یک پوشه (projects که با d مشخص شده)." } },
        { h: { en: "Making things: mkdir and touch", fa: "ساختن: mkdir و touch" } },
        { p: {
          en: "mkdir makes a new directory; touch creates an empty file (or updates its timestamp). cd moves you into a folder, and cd .. moves you back up one level.",
          fa: "دستور mkdir یک پوشه‌ی جدید می‌سازد؛ touch یک فایل خالی می‌سازد (یا زمان آخرین تغییرش را به‌روز می‌کند). دستور cd تو را وارد یک پوشه می‌کند، و cd .. یک سطح به بالا برمی‌گرداند."
        } },
        { code: "mkdir projects\ncd projects\ntouch app.py readme.md\ncd ..", lang: "bash", cap: { en: "Make a folder, go in, create two files, come back out.", fa: "یک پوشه بساز، برو داخلش، دو فایل بساز، و برگرد بیرون." } },
        { h: { en: "Copy, move, rename, delete", fa: "کپی، انتقال، تغییر نام، حذف" } },
        { list: {
          en: ["cp a.txt b.txt — copy a file", "mv a.txt docs/ — move it into another folder", "mv old.txt new.txt — rename (move onto a new name)", "rm file.txt — delete a file", "rm -r folder — delete a folder and everything in it"],
          fa: ["cp a.txt b.txt — کپی یک فایل", "mv a.txt docs/ — انتقال آن به پوشه‌ای دیگر", "mv old.txt new.txt — تغییر نام (انتقال روی یک نام جدید)", "rm file.txt — حذف یک فایل", "rm -r folder — حذف یک پوشه و هر چیزی که داخلش است"]
        } },
        { note: { en: "rm deletes permanently — there is no Recycle Bin on the command line. Read the line twice before you press Enter, especially with rm -r.", fa: "دستور rm برای همیشه حذف می‌کند — در خط فرمان سطل بازیافت وجود ندارد. قبل از زدن Enter خط را دو بار بخوان، مخصوصاً با rm -r." }, kind: "warn" },
        { h: { en: "A trick that saves your fingers", fa: "ترفندی که انگشت‌هایت را نجات می‌دهد" } },
        { p: {
          en: "Start typing a file or folder name and press Tab. The shell completes it for you. Press Tab twice to see all the matching options. You'll use this thousands of times.",
          fa: "شروع کن به تایپ نام یک فایل یا پوشه و بعد Tab را بزن. شل (پوسته) خودش آن را کامل می‌کند. دو بار Tab بزن تا همه‌ی گزینه‌های هم‌خوان را ببینی. این را هزاران بار استفاده خواهی کرد."
        } }
      ]
    },

    {
      id: "linux-permissions", track: "linux", icon: "shield",
      level: "intermediate", minutes: 10, updated: "2026-11",
      title: { en: "Understanding file permissions", fa: "درک مجوزهای فایل" } ,
      summary: {
        en: "That rwxr-xr-x string next to every file isn't noise — it's who can read, write and run it. Learn to read and change it.",
        fa: "آن رشته‌ی rwxr-xr-x کنار هر فایل بی‌معنی نیست — یعنی چه کسی می‌تواند آن را بخواند، بنویسد و اجرا کند. خواندن و تغییرش را یاد بگیر."
      },
      blocks: [
        { p: {
          en: "Linux was built from day one to be used by many people at once, so every file carries permissions: who is allowed to read it, change it, or run it. Getting this right is the difference between a secure server and one that anyone can tamper with.",
          fa: "لینوکس از همان روز اول برای استفاده‌ی هم‌زمان چند نفر ساخته شد، بنابراین هر فایل مجوزهایی را با خود دارد: چه کسی اجازه دارد آن را بخواند، تغییر دهد، یا اجرا کند. درست انجام دادن این کار، تفاوت بین یک سرور امن و سروری است که هرکسی می‌تواند دستکاری‌اش کند."
        } },
        { h: { en: "Reading the ten characters", fa: "خواندن آن ده کاراکتر" } },
        { p: {
          en: "In ls -l, the first column looks like -rw-r--r--. The first character is the type (- file, d folder). The next nine are three groups of three: the owner, the group, and everyone else. In each group, r = read, w = write, x = execute, and a dash means “not allowed”.",
          fa: "در خروجی ls -l، ستون اول چیزی شبیه -rw-r--r-- است. کاراکتر اول نوع است (- فایل، d پوشه). نُه کاراکتر بعدی سه گروهِ سه‌تایی‌اند: مالک، گروه، و بقیه‌ی کاربران. در هر گروه، r یعنی خواندن، w یعنی نوشتن، x یعنی اجرا، و خط تیره یعنی «مجاز نیست»."
        } },
        { term: "$ ls -l app.py\n-rwxr-xr-x 1 root root 128 Nov 2 12:01 app.py\n  │└┬┘└┬┘└┬┘\n  │ │  │  └ others: read + execute\n  │ │  └──── group: read + execute\n  │ └─────── owner: read + write + execute\n  └───────── type: regular file", cap: { en: "The owner can change this file; everyone else can only read and run it.", fa: "مالک می‌تواند این فایل را تغییر دهد؛ بقیه فقط می‌توانند بخوانند و اجرایش کنند." } },
        { h: { en: "Changing permissions: chmod", fa: "تغییر مجوزها: chmod" } },
        { p: {
          en: "chmod changes permissions. The friendly form adds (+) or removes (-) a permission for the owner (u), group (g), others (o) or all (a). For example, make a script runnable:",
          fa: "دستور chmod مجوزها را تغییر می‌دهد. شکل ساده‌اش یک مجوز را برای مالک (u)، گروه (g)، بقیه (o) یا همه (a) اضافه (+) یا حذف (-) می‌کند. مثلاً یک اسکریپت را قابل‌اجرا کن:"
        } },
        { code: "chmod +x app.py      # anyone can now run it\nchmod go-w notes.txt # group & others cannot write\nchmod u+rw,go-rwx key # owner read/write, nobody else anything", lang: "bash" },
        { h: { en: "The number shortcut", fa: "میان‌بُر عددی" } },
        { p: {
          en: "You'll often see chmod 755 or chmod 644. Each digit is one group (owner, group, others), where read=4, write=2, execute=1 are added up. So 7 = rwx, 6 = rw-, 5 = r-x, 4 = r--. 755 means the owner can do everything and others can read and run — the standard for a program.",
          fa: "اغلب chmod 755 یا chmod 644 را می‌بینی. هر رقم یک گروه است (مالک، گروه، بقیه)، و در آن خواندن=۴، نوشتن=۲، اجرا=۱ با هم جمع می‌شوند. پس ۷ یعنی rwx، ۶ یعنی -rw، ۵ یعنی r-x، ۴ یعنی --r. عددِ ۷۵۵ یعنی مالک همه‌کاری می‌تواند بکند و بقیه فقط می‌خوانند و اجرا می‌کنند — استاندارد یک برنامه."
        } },
        { note: { en: "A private key or password file should be 600 (owner read/write, nobody else anything). If SSH refuses your key, wrong permissions are almost always the reason.", fa: "یک کلید خصوصی یا فایل رمز باید 600 باشد (مالک بخواند/بنویسد، بقیه هیچ). اگر SSH کلیدت را نپذیرفت، تقریباً همیشه دلیلش مجوز اشتباه است." }, kind: "tip" }
      ]
    },

    // ─────────────────────── PROGRAMMING ─────────────────────
    {
      id: "python-10-minutes", track: "programming", icon: "code",
      level: "beginner", minutes: 10, updated: "2026-11",
      title: { en: "Python: your first real programs", fa: "پایتون: اولین برنامه‌های واقعی" },
      summary: {
        en: "Variables, text, decisions and loops — the core of Python, with tiny examples you can run as you read.",
        fa: "متغیرها، متن، تصمیم‌ها و حلقه‌ها — هسته‌ی پایتون، با مثال‌های کوچکی که همان‌طور که می‌خوانی می‌توانی اجرا کنی."
      },
      blocks: [
        { p: {
          en: "Python is a great first language: it reads almost like English and runs everywhere. If you have Linux or a Mac it's already installed; type python3 in a terminal. This is enough to be genuinely useful.",
          fa: "پایتون یک زبان اول عالی است: تقریباً مثل انگلیسی خوانده می‌شود و همه‌جا اجرا می‌شود. اگر لینوکس یا مک داری، از قبل نصب است؛ در ترمینال python3 را تایپ کن. همین مقدار برای مفید بودنِ واقعی کافی است."
        } },
        { h: { en: "Values and variables", fa: "مقدارها و متغیرها" } },
        { p: {
          en: "A variable is a name for a value. You don't declare a type — Python figures it out. print() shows something on the screen.",
          fa: "یک متغیر، نامی برای یک مقدار است. نوعش را اعلام نمی‌کنی — پایتون خودش تشخیص می‌دهد. دستور print() چیزی را روی صفحه نشان می‌دهد."
        } },
        { code: "name = \"Sepehr\"\nage = 23\nprint(\"Hello,\", name)\nprint(name, \"is\", age, \"years old\")", lang: "python", cap: { en: "Output: Hello, Sepehr  /  Sepehr is 23 years old", fa: "خروجی: Hello, Sepehr  /  Sepehr is 23 years old" } },
        { h: { en: "Making decisions", fa: "گرفتن تصمیم" } },
        { p: {
          en: "if / elif / else run different code depending on a condition. Indentation (the spaces at the start of a line) is how Python knows which lines belong together — it isn't decoration.",
          fa: "دستورهای if / elif / else بسته به یک شرط، کدهای مختلفی را اجرا می‌کنند. تورفتگی (فاصله‌های ابتدای خط) همان چیزی است که با آن پایتون می‌فهمد کدام خط‌ها به هم مربوط‌اند — تزئینی نیست."
        } },
        { code: "temp = 36\nif temp < 20:\n    print(\"cold\")\nelif temp < 30:\n    print(\"mild\")\nelse:\n    print(\"warm\")", lang: "python", cap: { en: "Prints “warm”, because 36 is not under 20 or 30.", fa: "«warm» را چاپ می‌کند، چون ۳۶ نه زیر ۲۰ است نه زیر ۳۰." } },
        { h: { en: "Repeating with loops", fa: "تکرار با حلقه‌ها" } },
        { p: {
          en: "A for loop repeats once for each item in a list. A list holds many values in order, written in square brackets.",
          fa: "یک حلقه‌ی for به‌ازای هر عضو یک فهرست، یک بار تکرار می‌شود. فهرست چند مقدار را به‌ترتیب نگه می‌دارد و داخل کروشه نوشته می‌شود."
        } },
        { code: "devices = [\"router\", \"switch\", \"camera\"]\nfor d in devices:\n    print(\"checking\", d)\nprint(\"done —\", len(devices), \"devices\")", lang: "python", cap: { en: "Loops over three devices, then prints how many there were.", fa: "روی سه دستگاه حلقه می‌زند، بعد تعدادشان را چاپ می‌کند." } },
        { h: { en: "Where to go next", fa: "قدم بعدی کجاست" } },
        { p: {
          en: "With variables, conditions and loops you can already automate small jobs. Next, look at functions (def) to reuse code, and dictionaries to store named data. Our tools section has real Python programs you can read line by line.",
          fa: "با متغیرها، شرط‌ها و حلقه‌ها همین حالا می‌توانی کارهای کوچک را خودکار کنی. بعد، سراغ توابع (def) برای استفاده‌ی دوباره از کد، و دیکشنری‌ها برای ذخیره‌ی داده‌ی نام‌دار برو. بخش ابزارهای سایت برنامه‌های واقعی پایتون دارد که می‌توانی خط‌به‌خط بخوانی‌شان."
        } }
      ]
    },

    {
      id: "javascript-basics", track: "programming", icon: "code",
      level: "beginner", minutes: 9, updated: "2026-11",
      title: { en: "JavaScript basics for the web", fa: "مبانی جاوااسکریپت برای وب" },
      summary: {
        en: "The language that runs in every browser — including this site. Variables, functions, and making a page react.",
        fa: "زبانی که در هر مرورگری اجرا می‌شود — از جمله همین سایت. متغیرها، توابع، و واکنش‌دادن یک صفحه."
      },
      blocks: [
        { p: {
          en: "JavaScript is the only programming language that runs natively in web browsers, which makes it the language of interactive websites. Everything that moves on this very page is JavaScript. You can try it right now: open your browser's developer tools (F12) and type into the Console.",
          fa: "جاوااسکریپت تنها زبان برنامه‌نویسی است که به‌صورت بومی در مرورگرها اجرا می‌شود، و همین آن را به زبان وب‌سایت‌های تعاملی تبدیل کرده. هر چیزی که در همین صفحه حرکت می‌کند جاوااسکریپت است. همین الان می‌توانی امتحانش کنی: ابزار توسعه‌دهنده‌ی مرورگر را باز کن (F12) و در Console تایپ کن."
        } },
        { h: { en: "Variables and text", fa: "متغیرها و متن" } },
        { p: {
          en: "Use let for a value that can change and const for one that can't. Text (a “string”) goes in quotes, and backticks let you drop values straight into text with ${…}.",
          fa: "برای مقداری که تغییر می‌کند از let و برای مقدار ثابت از const استفاده کن. متن (یک «رشته») داخل گیومه می‌آید، و بک‌تیک (`) اجازه می‌دهد مقدارها را مستقیم با ${…} داخل متن بگذاری."
        } },
        { code: "const name = \"Sepehr\";\nlet visits = 3;\nvisits = visits + 1;\nconsole.log(`${name} visited ${visits} times`);", lang: "javascript", cap: { en: "Logs: Sepehr visited 4 times", fa: "چاپ می‌کند: Sepehr visited 4 times" } },
        { h: { en: "Functions", fa: "توابع" } },
        { p: {
          en: "A function is a named block of code that takes inputs and gives back a result. It lets you write something once and use it many times.",
          fa: "یک تابع، بلوکی نام‌دار از کد است که ورودی می‌گیرد و یک نتیجه برمی‌گرداند. به تو اجازه می‌دهد چیزی را یک بار بنویسی و بارها استفاده کنی."
        } },
        { code: "function area(width, height) {\n  return width * height;\n}\nconsole.log(area(4, 5)); // 20", lang: "javascript" },
        { h: { en: "Making the page react", fa: "واکنش‌دادن صفحه" } },
        { p: {
          en: "JavaScript's real job in a browser is to respond to the user. You find an element on the page and tell it what to do when something happens — here, when a button is clicked.",
          fa: "کار اصلی جاوااسکریپت در مرورگر، پاسخ‌دادن به کاربر است. یک عنصر را در صفحه پیدا می‌کنی و به آن می‌گویی وقتی اتفاقی افتاد چه کند — اینجا، وقتی روی یک دکمه کلیک شد."
        } },
        { code: "const button = document.querySelector(\"#hello\");\nbutton.addEventListener(\"click\", () => {\n  alert(\"You clicked me!\");\n});", lang: "javascript", cap: { en: "When #hello is clicked, a message pops up.", fa: "وقتی روی #hello کلیک شود، یک پیام ظاهر می‌شود." } },
        { note: { en: "Everything on this website — the page turning in the book, the chat assistant, the language switch — is plain JavaScript, no framework. View the source to see it.", fa: "هر چیزی در این وب‌سایت — ورق‌خوردن کتاب، دستیار گفتگو، تعویض زبان — جاوااسکریپت ساده است، بدون هیچ فریم‌ورکی. سورس صفحه را ببین تا بخوانی‌اش." }, kind: "tip" }
      ]
    },

    {
      id: "bash-scripting", track: "programming", icon: "terminal",
      level: "intermediate", minutes: 9, updated: "2026-11",
      title: { en: "Automate with Bash scripts", fa: "خودکارسازی با اسکریپت‌های Bash" },
      summary: {
        en: "Turn a sequence of commands you type every day into one script you run with a single word.",
        fa: "دنباله‌ای از دستورها را که هر روز تایپ می‌کنی به یک اسکریپت تبدیل کن که با یک کلمه اجرا می‌شود."
      },
      blocks: [
        { p: {
          en: "A Bash script is just a text file full of the same commands you'd type by hand, run top to bottom. If you do something more than twice, it's worth scripting. Create a file ending in .sh and start it with a special first line.",
          fa: "یک اسکریپت Bash فقط یک فایل متنی پر از همان دستورهایی است که با دست تایپ می‌کنی، که از بالا به پایین اجرا می‌شوند. اگر کاری را بیش از دو بار انجام می‌دهی، ارزش اسکریپت‌کردن دارد. یک فایل با پسوند .sh بساز و با یک خط اول خاص شروعش کن."
        } },
        { h: { en: "Your first script", fa: "اولین اسکریپتت" } },
        { p: {
          en: "The first line, called the shebang, tells the system which program should run the file. Then you add commands and comments (lines starting with #).",
          fa: "خط اول، که «شیبنگ» نام دارد، به سیستم می‌گوید کدام برنامه باید فایل را اجرا کند. بعد دستورها و توضیح‌ها (خط‌هایی که با # شروع می‌شوند) را اضافه می‌کنی."
        } },
        { code: "#!/bin/bash\n# backup.sh — copy today's logs into a dated folder\ntoday=$(date +%Y-%m-%d)\nmkdir -p \"backups/$today\"\ncp *.log \"backups/$today/\"\necho \"Backed up logs into backups/$today\"", lang: "bash", cap: { en: "Saves the date in a variable, makes a folder, copies logs in.", fa: "تاریخ را در یک متغیر ذخیره می‌کند، یک پوشه می‌سازد، و لاگ‌ها را داخلش کپی می‌کند." } },
        { h: { en: "Run it", fa: "اجرایش کن" } },
        { p: {
          en: "Make the file executable once with chmod, then run it. $(…) runs a command and drops its output into your line — here, today's date.",
          fa: "یک بار با chmod فایل را قابل‌اجرا کن، بعد اجرایش کن. علامت $(…) یک دستور را اجرا می‌کند و خروجی‌اش را داخل خط تو می‌گذارد — اینجا، تاریخ امروز."
        } },
        { term: "$ chmod +x backup.sh\n$ ./backup.sh\nBacked up logs into backups/2026-11-02", cap: { en: "The script runs and reports where it saved the files.", fa: "اسکریپت اجرا می‌شود و می‌گوید فایل‌ها را کجا ذخیره کرد." } },
        { h: { en: "Variables and conditions", fa: "متغیرها و شرط‌ها" } },
        { code: "#!/bin/bash\nhost=\"8.8.8.8\"\nif ping -c 1 \"$host\" > /dev/null; then\n  echo \"$host is reachable\"\nelse\n  echo \"$host is DOWN\"\nfi", lang: "bash", cap: { en: "Pings a host once and reports up or down — a tiny monitor.", fa: "یک بار به یک میزبان پینگ می‌زند و وضعیتش را می‌گوید — یک مانیتور کوچک." } },
        { note: { en: "Always put variables in double quotes (\"$host\", not $host). It saves you from strange bugs when a value contains a space.", fa: "همیشه متغیرها را در گیومه‌ی دوتایی بگذار (\"$host\" نه $host). این تو را از باگ‌های عجیب وقتی یک مقدار فاصله دارد نجات می‌دهد." }, kind: "tip" }
      ]
    },

    // ──────────────────── NETWORK & SECURITY ─────────────────
    {
      id: "what-is-ip", track: "network", icon: "network",
      level: "beginner", minutes: 7, updated: "2026-11",
      title: { en: "What is an IP address?", fa: "آدرس IP چیست؟" },
      summary: {
        en: "Every device on a network has a number so others can find it. Here's how those numbers work, in plain language.",
        fa: "هر دستگاه روی یک شبکه یک شماره دارد تا بقیه بتوانند پیدایش کنند. اینجا به زبان ساده می‌بینی آن شماره‌ها چطور کار می‌کنند."
      },
      blocks: [
        { p: {
          en: "When your laptop talks to a website, both need an address — just like sending a letter. On a network that address is the IP address. The common kind, IPv4, is four numbers from 0 to 255 separated by dots, like 192.168.1.10.",
          fa: "وقتی لپ‌تاپت با یک وب‌سایت صحبت می‌کند، هر دو به یک آدرس نیاز دارند — درست مثل فرستادن یک نامه. روی یک شبکه، آن آدرس همان آدرس IP است. نوع رایج آن، IPv4، چهار عدد از ۰ تا ۲۵۵ است که با نقطه از هم جدا شده‌اند، مثل 192.168.1.10."
        } },
        { h: { en: "Private and public", fa: "خصوصی و عمومی" } },
        { p: {
          en: "Addresses that start with 192.168, 10., or 172.16–31 are private: they only work inside your home or office. Your router has one public address that the whole world sees, and it shares it among all your devices. That's why every phone in a house can show the same “public IP”.",
          fa: "آدرس‌هایی که با 192.168 یا .10 یا 172.16 تا 31 شروع می‌شوند خصوصی‌اند: فقط داخل خانه یا دفترت کار می‌کنند. روتر تو یک آدرس عمومی دارد که کل دنیا می‌بیند، و آن را بین همه‌ی دستگاه‌هایت تقسیم می‌کند. برای همین همه‌ی گوشی‌های یک خانه می‌توانند یک «IP عمومی» یکسان نشان دهند."
        } },
        { h: { en: "See your own", fa: "مال خودت را ببین" } },
        { p: {
          en: "On Linux, ip a shows your device's addresses. The one next to inet is your private IPv4 on the local network.",
          fa: "در لینوکس، دستور ip a آدرس‌های دستگاهت را نشان می‌دهد. آدرسی که کنار inet است، IPv4 خصوصیِ تو روی شبکه‌ی محلی است."
        } },
        { term: "$ ip -4 addr show | grep inet\n    inet 127.0.0.1/8 scope host lo\n    inet 192.168.1.42/24 scope global eth0", cap: { en: "127.0.0.1 is “this machine itself”; 192.168.1.42 is its address on the LAN.", fa: "127.0.0.1 یعنی «خودِ همین دستگاه»؛ و 192.168.1.42 آدرس آن روی شبکه‌ی محلی است." } },
        { h: { en: "The /24 at the end", fa: "آن /24 در انتها" } },
        { p: {
          en: "192.168.1.42/24 means the first 24 bits (192.168.1) identify the network and the last part (42) identifies the device. Everything from 192.168.1.1 to 192.168.1.254 is on the same network and can talk directly. This idea — the subnet — is the foundation of all networking, and our subnet calculator tool does the math for you.",
          fa: "عبارت 192.168.1.42/24 یعنی ۲۴ بیت اول (192.168.1) شبکه را مشخص می‌کند و بخش آخر (42) دستگاه را. هر چیزی از 192.168.1.1 تا 192.168.1.254 روی یک شبکه است و می‌تواند مستقیم صحبت کند. این ایده — «زیرشبکه» — پایه‌ی کل شبکه است، و ابزار ماشین‌حساب زیرشبکه‌ی ما محاسبه‌اش را برایت انجام می‌دهد."
        } }
      ]
    },

    {
      id: "security-mindset", track: "security", icon: "shield",
      level: "beginner", minutes: 7, updated: "2026-11",
      title: { en: "The security mindset", fa: "طرز فکر امنیتی" },
      summary: {
        en: "Before any tool, security is a way of thinking. The few habits that stop the vast majority of real attacks.",
        fa: "قبل از هر ابزاری، امنیت یک طرز فکر است. همان چند عادتی که جلوی اکثر قریب‌به‌اتفاق حملات واقعی را می‌گیرد."
      },
      blocks: [
        { p: {
          en: "People imagine hacking as clever code breaking through firewalls. In reality, most breaches come from something ordinary: a reused password, an unpatched program, or someone clicking a link. Security is less about tools and more about habits. Here are the ones that matter most.",
          fa: "مردم هک را کدی هوشمند تصور می‌کنند که از فایروال‌ها عبور می‌کند. در واقعیت، بیشتر نفوذها از چیزی معمولی می‌آیند: یک رمز تکراری، یک برنامه‌ی به‌روزرسانی‌نشده، یا کسی که روی یک لینک کلیک می‌کند. امنیت کمتر درباره‌ی ابزارهاست و بیشتر درباره‌ی عادت‌ها. مهم‌ترین‌هایشان این‌ها هستند."
        } },
        { h: { en: "Four habits that stop most attacks", fa: "چهار عادتی که جلوی بیشتر حملات را می‌گیرد" } },
        { list: {
          en: [
            "A long, unique password for every account — a password manager remembers them so you don't have to.",
            "Turn on two-factor authentication everywhere it's offered. A stolen password alone then isn't enough.",
            "Keep software updated. Most attacks use holes that were already fixed months ago.",
            "Think before you click. Check the real sender and the real link before trusting a message."
          ],
          fa: [
            "یک رمز بلند و یکتا برای هر حساب — یک مدیر رمز آن‌ها را به‌جای تو به خاطر می‌سپارد.",
            "هرجا ورود دومرحله‌ای ارائه می‌شود روشنش کن. آن‌وقت رمزِ دزدیده‌شده به‌تنهایی کافی نیست.",
            "نرم‌افزارها را به‌روز نگه دار. بیشتر حملات از حفره‌هایی استفاده می‌کنند که ماه‌ها قبل وصله شده‌اند.",
            "قبل از کلیک فکر کن. فرستنده‌ی واقعی و لینک واقعی را قبل از اعتماد به یک پیام بررسی کن."
          ]
        } },
        { h: { en: "Defender first", fa: "اول مدافع" } },
        { p: {
          en: "Everything you learn about attacks has one honest purpose: to defend better. You study how a lock is picked so you can fit a better lock. Learn these techniques only on systems you own or have written permission to test — that line is both the law and the ethic of this field.",
          fa: "هر چیزی که درباره‌ی حملات یاد می‌گیری یک هدف صادقانه دارد: دفاع بهتر. یاد می‌گیری یک قفل چطور باز می‌شود تا قفل بهتری بگذاری. این تکنیک‌ها را فقط روی سیستم‌هایی یاد بگیر که مالکشان هستی یا مجوز کتبی آزمونشان را داری — این مرز، هم قانون و هم اخلاقِ این حوزه است."
        } },
        { note: { en: "Want to go deeper? The free book in the Library section walks from the Linux command line all the way to penetration testing and defence.", fa: "می‌خواهی عمیق‌تر بروی؟ کتاب رایگان در بخش کتابخانه، از خط فرمان لینوکس تا تست نفوذ و دفاع را قدم‌به‌قدم طی می‌کند." }, kind: "tip" }
      ]
    }
  ]
};

// ─────────────────────────────────────────────────────────────
//  Study guide. Every lesson gets: what you will be able to do,
//  a deeper section, common mistakes, exercises with answers and
//  a recap. `roadmap` is the order to learn each track in, from
//  the first step to a professional level (lesson: null = not
//  written yet). Edit freely — the site renders it automatically.
// ─────────────────────────────────────────────────────────────
window.LEARN.method = {
  en: ["Read one lesson slowly, start to finish.", "Type every command yourself in the practice lab — don't just read it.", "Do the exercises at the end before you open the answers.", "Ask the guide for a quiz on the topic the next day.", "Finish each stage by building something small of your own."],
  fa: ["یک درس را آرام و از اول تا آخر بخوان.", "هر دستور را خودت در آزمایشگاه تمرین تایپ کن — فقط نخوان.", "قبل از دیدن جواب‌ها، تمرین‌های آخر درس را حل کن.", "روز بعد از راهنما بخواه از همان مبحث آزمون بگیرد.", "هر مرحله را با ساختن یک چیز کوچک از خودت تمام کن."]
};

window.LEARN.roadmap = {
  linux: [
    { t: { en: "Meet the terminal", fa: "آشنایی با ترمینال" }, d: { en: "Run commands, read their output, find out where you are.", fa: "اجرای دستور، خواندن خروجی و فهمیدن اینکه کجا هستی." }, lesson: "linux-first-steps" },
    { t: { en: "Files and folders", fa: "فایل‌ها و پوشه‌ها" }, d: { en: "Create, copy, move and delete without a mouse.", fa: "ساختن، کپی، جابه‌جایی و حذف بدون ماوس." }, lesson: "linux-files" },
    { t: { en: "Permissions and users", fa: "مجوزها و کاربران" }, d: { en: "Who may read, change or run each file.", fa: "چه کسی اجازه‌ی خواندن، تغییر یا اجرای هر فایل را دارد." }, lesson: "linux-permissions" },
    { t: { en: "Text tools and pipes", fa: "ابزارهای متن و پایپ" }, d: { en: "grep, sort, wc and joining commands with | to answer questions from logs.", fa: "grep، sort، wc و وصل‌کردن دستورها با | برای جواب‌گرفتن از لاگ‌ها." }, lesson: null },
    { t: { en: "Automation with scripts", fa: "خودکارسازی با اسکریپت" }, d: { en: "Turn the commands you repeat into one script.", fa: "تبدیل دستورهای تکراری به یک اسکریپت." }, lesson: "bash-scripting" },
    { t: { en: "Running a server", fa: "اداره‌ی سرور" }, d: { en: "Packages, services (systemctl), SSH, logs and backups — the daily work of an administrator.", fa: "بسته‌ها، سرویس‌ها (systemctl)، SSH، لاگ و پشتیبان‌گیری — کار روزانه‌ی یک مدیر سیستم." }, lesson: null }
  ],
  programming: [
    { t: { en: "First programs in Python", fa: "اولین برنامه‌ها با پایتون" }, d: { en: "Variables, decisions and loops.", fa: "متغیر، تصمیم‌گیری و حلقه." }, lesson: "python-10-minutes" },
    { t: { en: "Functions and lists", fa: "تابع و لیست" }, d: { en: "Name a piece of work once and reuse it; keep many values together.", fa: "یک کار را یک بار نام‌گذاری کن و دوباره استفاده کن؛ چند مقدار را کنار هم نگه دار." }, lesson: null },
    { t: { en: "JavaScript and the web page", fa: "جاوااسکریپت و صفحه‌ی وب" }, d: { en: "Make a page react to the person using it.", fa: "صفحه را به کارهای کاربر واکنش‌پذیر کن." }, lesson: "javascript-basics" },
    { t: { en: "Shell scripts", fa: "اسکریپت‌های شل" }, d: { en: "Glue system commands together with Bash.", fa: "دستورهای سیستم را با Bash به هم وصل کن." }, lesson: "bash-scripting" },
    { t: { en: "Files, errors and data", fa: "فایل، خطا و داده" }, d: { en: "Read and write files, handle errors, store data with SQL.", fa: "خواندن و نوشتن فایل، مدیریت خطا و ذخیره‌ی داده با SQL." }, lesson: null },
    { t: { en: "A real project", fa: "یک پروژه‌ی واقعی" }, d: { en: "Build one of the tools in the Tools section step by step, then add a feature of your own.", fa: "یکی از ابزارهای بخش «ابزارها» را قدم‌به‌قدم بساز و بعد یک قابلیت از خودت اضافه کن." }, lesson: null }
  ],
  network: [
    { t: { en: "IP addresses", fa: "آدرس IP" }, d: { en: "What an address is, private and public, and what /24 means.", fa: "آدرس چیست، خصوصی و عمومی، و /24 یعنی چه." }, lesson: "what-is-ip" },
    { t: { en: "Subnetting", fa: "زیرشبکه‌بندی" }, d: { en: "Split a network into the right-sized pieces by hand.", fa: "یک شبکه را دستی به تکه‌هایی با اندازه‌ی درست تقسیم کن." }, lesson: null },
    { t: { en: "How data travels", fa: "داده چطور سفر می‌کند" }, d: { en: "Switch, router, gateway, DNS and DHCP — what each one does.", fa: "سوئیچ، روتر، گیت‌وی، DNS و DHCP — هر کدام چه می‌کنند." }, lesson: null },
    { t: { en: "Ports and protocols", fa: "پورت‌ها و پروتکل‌ها" }, d: { en: "TCP and UDP, and the services behind common ports.", fa: "TCP و UDP و سرویس‌های پشت پورت‌های رایج." }, lesson: null },
    { t: { en: "Troubleshooting", fa: "عیب‌یابی" }, d: { en: "A fixed order: cable, IP, gateway, DNS, service — with ping, traceroute and nslookup.", fa: "یک ترتیب ثابت: کابل، IP، گیت‌وی، DNS، سرویس — با ping، traceroute و nslookup." }, lesson: null },
    { t: { en: "Switching and VLANs", fa: "سوئیچینگ و VLAN" }, d: { en: "Separate departments on the same switches; the level of CCNA.", fa: "جداکردن بخش‌ها روی همان سوئیچ‌ها؛ هم‌سطح CCNA." }, lesson: null }
  ],
  security: [
    { t: { en: "Think like a defender", fa: "مثل یک مدافع فکر کن" }, d: { en: "The habits that stop most attacks.", fa: "عادت‌هایی که جلوی بیشتر حمله‌ها را می‌گیرند." }, lesson: "security-mindset" },
    { t: { en: "Lock down your own system", fa: "سیستم خودت را امن کن" }, d: { en: "Permissions, updates, strong passwords and two-step login.", fa: "مجوزها، به‌روزرسانی، رمز قوی و ورود دومرحله‌ای." }, lesson: "linux-permissions" },
    { t: { en: "Know the network", fa: "شبکه را بشناس" }, d: { en: "You can't protect what you don't understand: IP, ports, services.", fa: "چیزی را که نمی‌شناسی نمی‌توانی محافظت کنی: IP، پورت، سرویس." }, lesson: "what-is-ip" },
    { t: { en: "Read the logs", fa: "لاگ‌ها را بخوان" }, d: { en: "Find failed logins and attacks in real log files.", fa: "ورودهای ناموفق و حمله‌ها را در لاگ واقعی پیدا کن." }, lesson: null },
    { t: { en: "Firewalls and hardening", fa: "فایروال و مقاوم‌سازی" }, d: { en: "Close what isn't needed; allow only what is.", fa: "هر چه لازم نیست ببند؛ فقط چیزهای لازم را باز بگذار." }, lesson: null },
    { t: { en: "Authorised testing", fa: "آزمون مجاز" }, d: { en: "Test your own systems the way an attacker would — with written permission only. The free book covers this.", fa: "سیستم‌های خودت را مثل یک مهاجم بیازما — فقط با اجازه‌ی کتبی. کتاب رایگان سایت این بخش را پوشش می‌دهد." }, lesson: null }
  ]
};

window.LEARN.study = {
  "linux-first-steps": {
    goals: { en: ["Open a terminal and run a command without fear", "Find out who you are and which folder you are in", "Check the health of a machine: uptime, disk and memory"],
             fa: ["بدون ترس ترمینال را باز کنی و دستور اجرا کنی", "بفهمی با کدام کاربر و در کدام پوشه هستی", "سلامت یک سیستم را بررسی کنی: مدت روشن‌بودن، دیسک و حافظه"] },
    more: [
      { h: { en: "How every command is built", fa: "ساختار هر دستور" } },
      { p: { en: "Almost every command has the same three parts: the name, the options and the thing to work on. In  ls -l /etc  the name is ls, the option -l asks for details, and /etc is the folder to list. Once you see this pattern, new commands stop looking strange.",
             fa: "تقریباً هر دستور همین سه بخش را دارد: اسم، گزینه‌ها و چیزی که رویش کار می‌کند. در  ls -l /etc  اسم دستور ls است، گزینه‌ی -l جزئیات می‌خواهد و /etc پوشه‌ای است که فهرست می‌شود. وقتی این الگو را ببینی، دستورهای جدید دیگر عجیب نیستند." } },
      { list: { en: ["Help is built in: add --help to a command, or read its manual with  man ls  (press q to leave).", "The Tab key completes names for you; the ↑ key brings back earlier commands.", "Ctrl+C stops a command that is stuck. Ctrl+L or clear cleans the screen.", "Linux cares about capital letters: Notes.txt and notes.txt are two different files."],
                fa: ["راهنما همیشه همراهت است: به آخر دستور --help اضافه کن یا با  man ls  راهنمایش را بخوان (با q خارج شو).", "کلید Tab اسم‌ها را کامل می‌کند و کلید ↑ دستورهای قبلی را برمی‌گرداند.", "Ctrl+C دستوری را که گیر کرده متوقف می‌کند. Ctrl+L یا clear صفحه را پاک می‌کند.", "لینوکس به حروف بزرگ و کوچک حساس است: Notes.txt و notes.txt دو فایل جدا هستند."] } }
    ],
    mistakes: { en: ["Typing the $ sign — it is the prompt, not part of the command.", "Forgetting the space between the command and its option (ls-l instead of ls -l).", "Panicking at an error. Read the last line: it nearly always says what is wrong."],
                fa: ["تایپ‌کردن علامت $ — این فقط نشانه‌ی آماده‌بودن ترمینال است، نه بخشی از دستور.", "جاانداختن فاصله بین دستور و گزینه (ls-l به‌جای ls -l).", "ترسیدن از خطا. خط آخر را بخوان: تقریباً همیشه می‌گوید مشکل چیست."] },
    practice: [
      { q: { en: "Which command shows the folder you are in?", fa: "کدام دستور پوشه‌ای را که در آن هستی نشان می‌دهد؟" }, a: { en: "pwd", fa: "pwd" } },
      { q: { en: "How do you see how full the disk is, in units that are easy to read?", fa: "چطور می‌بینی دیسک چقدر پر است، با واحدهای خوانا؟" }, a: { en: "df -h   (-h means human-readable: G and M instead of raw blocks)", fa: "df -h   (گزینه‌ی -h یعنی خوانا برای انسان: G و M به‌جای عدد خام)" } },
      { q: { en: "A command has been running for a minute and nothing happens. What do you press?", fa: "یک دستور یک دقیقه است اجرا می‌شود و اتفاقی نمی‌افتد. چه کلیدی می‌زنی؟" }, a: { en: "Ctrl+C", fa: "Ctrl+C" } },
      { q: { en: "You don't remember what the -a option of uname does. How do you find out without the internet?", fa: "یادت نیست گزینه‌ی -a در uname چه می‌کند. بدون اینترنت چطور می‌فهمی؟" }, a: { en: "uname --help   or   man uname", fa: "uname --help   یا   man uname" } }
    ],
    recap: { en: ["A command = name + options + target.", "whoami, pwd, uname, uptime, df and free only look — they are always safe.", "Stuck? --help, man, Tab and Ctrl+C."],
             fa: ["دستور = اسم + گزینه‌ها + هدف.", "whoami، pwd، uname، uptime، df و free فقط نگاه می‌کنند — همیشه بی‌خطرند.", "گیر کردی؟ --help، man، Tab و Ctrl+C."] }
  },
  "linux-files": {
    goals: { en: ["Move around the folder tree with cd and ls", "Create, copy, rename and delete files and folders", "Tell a relative path from an absolute one"],
             fa: ["با cd و ls در درخت پوشه‌ها حرکت کنی", "فایل و پوشه بسازی، کپی کنی، تغییر نام بدهی و حذف کنی", "مسیر نسبی را از مسیر مطلق تشخیص بدهی"] },
    more: [
      { h: { en: "Paths: the address of a file", fa: "مسیر: آدرس یک فایل" } },
      { p: { en: "An absolute path starts with / and works from anywhere, like /home/student/notes/todo.txt. A relative path starts from where you are now, like notes/todo.txt. Three shortcuts are worth memorising: a single dot is this folder, two dots is the folder above, and ~ is your home.",
             fa: "مسیر مطلق با / شروع می‌شود و از هر جایی کار می‌کند، مثل /home/student/notes/todo.txt. مسیر نسبی از جایی که الان هستی شروع می‌شود، مثل notes/todo.txt. سه میانبر را حفظ کن: یک نقطه یعنی همین پوشه، دو نقطه یعنی پوشه‌ی بالاتر و ~ یعنی پوشه‌ی خانه‌ات." } },
      { list: { en: ["cd ..  goes up one level;  cd ~  goes home;  cd -  returns to the previous folder.", "ls -la  also shows hidden files — the ones whose names start with a dot.", "mkdir -p a/b/c  creates the whole chain of folders in one go.", "cp -r  copies a folder with everything inside;  rm -r  deletes one the same way.", "A star matches many names:  ls *.txt  lists every file ending in .txt."],
                fa: ["cd ..  یک پله بالا می‌رود؛  cd ~  به خانه می‌رود؛  cd -  به پوشه‌ی قبلی برمی‌گردد.", "ls -la  فایل‌های مخفی را هم نشان می‌دهد — آن‌هایی که اسمشان با نقطه شروع می‌شود.", "mkdir -p a/b/c  کل زنجیره‌ی پوشه‌ها را یک‌جا می‌سازد.", "cp -r  یک پوشه را با همه‌ی محتوایش کپی می‌کند؛  rm -r  همان‌طور حذفش می‌کند.", "ستاره با چند اسم جور می‌شود:  ls *.txt  همه‌ی فایل‌های با پسوند .txt را فهرست می‌کند."] } }
    ],
    mistakes: { en: ["Running rm without checking where you are. Run pwd and ls first.", "Names with spaces: write \"my file.txt\" in quotes, or the shell sees two names.", "Using mv onto an existing name — it replaces that file without asking."],
                fa: ["اجرای rm بدون اینکه بدانی کجا هستی. اول pwd و ls را بزن.", "اسم‌های فاصله‌دار: \"my file.txt\" را داخل نقل‌قول بنویس، وگرنه شل دو اسم می‌بیند.", "استفاده از mv روی اسمی که وجود دارد — بدون پرسیدن آن فایل را جایگزین می‌کند."] },
    practice: [
      { q: { en: "Create a folder called lab and, inside it, an empty file called notes.txt.", fa: "یک پوشه به اسم lab بساز و داخلش یک فایل خالی به اسم notes.txt." }, a: { en: "mkdir lab\ncd lab\ntouch notes.txt", fa: "mkdir lab\ncd lab\ntouch notes.txt" } },
      { q: { en: "Rename notes.txt to todo.txt.", fa: "اسم notes.txt را به todo.txt تغییر بده." }, a: { en: "mv notes.txt todo.txt", fa: "mv notes.txt todo.txt" } },
      { q: { en: "You are in /home/student/lab. Which folder does  cd ../..  take you to?", fa: "در /home/student/lab هستی. دستور  cd ../..  تو را به کدام پوشه می‌برد؟" }, a: { en: "/home  (up two levels)", fa: "/home  (دو پله بالاتر)" } },
      { q: { en: "Make a backup copy of the whole lab folder called lab-backup.", fa: "از کل پوشه‌ی lab یک نسخه‌ی پشتیبان به اسم lab-backup بساز." }, a: { en: "cp -r lab lab-backup", fa: "cp -r lab lab-backup" } }
    ],
    recap: { en: ["ls looks, cd moves, mkdir and touch create.", "cp copies, mv moves or renames, rm deletes for good.", "/ starts an absolute path; .. is up; ~ is home."],
             fa: ["ls نگاه می‌کند، cd جابه‌جا می‌شود، mkdir و touch می‌سازند.", "cp کپی می‌کند، mv جابه‌جا یا تغییر نام می‌دهد، rm برای همیشه حذف می‌کند.", "/ شروع مسیر مطلق است؛ .. یعنی بالا؛ ~ یعنی خانه."] }
  },
  "linux-permissions": {
    goals: { en: ["Read the ten permission characters of ls -l", "Change permissions with chmod, with letters and with numbers", "Choose safe permissions for private files and scripts"],
             fa: ["ده نویسه‌ی مجوز در خروجی ls -l را بخوانی", "با chmod مجوزها را تغییر بدهی، هم با حرف و هم با عدد", "برای فایل‌های خصوصی و اسکریپت‌ها مجوز امن انتخاب کنی"] },
    more: [
      { h: { en: "Working out the numbers yourself", fa: "عددها را خودت حساب کن" } },
      { p: { en: "Each permission has a value: read is 4, write is 2 and execute is 1. Add them up for each of the three groups — owner, group, others. So rwx is 4+2+1 = 7, r-x is 4+1 = 5 and r-- is 4. That is why 754 means: the owner can do everything, the group can read and run, everyone else can only read.",
             fa: "هر مجوز یک مقدار دارد: خواندن ۴، نوشتن ۲ و اجرا ۱. برای هر یک از سه گروه — مالک، گروه، دیگران — این‌ها را جمع کن. پس rwx یعنی ۴+۲+۱ = ۷، r-x یعنی ۴+۱ = ۵ و r-- یعنی ۴. به همین دلیل 754 یعنی: مالک همه‌کار می‌تواند بکند، گروه می‌تواند بخواند و اجرا کند و بقیه فقط می‌توانند بخوانند." } },
      { list: { en: ["644 — a normal file: you edit it, others read it.", "755 — a script or program: you edit it, everyone may run it.", "600 — a private file such as an SSH key: only you.", "700 — a private folder: only you can enter it.", "On a folder, x means 'may enter' and w means 'may create and delete files inside'.", "chown changes the owner of a file; it normally needs sudo."],
                fa: ["644 — فایل معمولی: تو ویرایش می‌کنی و بقیه می‌خوانند.", "755 — اسکریپت یا برنامه: تو ویرایش می‌کنی و همه می‌توانند اجرا کنند.", "600 — فایل خصوصی مثل کلید SSH: فقط خودت.", "700 — پوشه‌ی خصوصی: فقط خودت می‌توانی واردش شوی.", "روی پوشه، x یعنی «اجازه‌ی ورود» و w یعنی «اجازه‌ی ساختن و حذف فایل داخلش».", "chown مالک فایل را عوض می‌کند و معمولاً sudo می‌خواهد."] } }
    ],
    mistakes: { en: ["chmod 777 to 'make it work'. It lets everyone change the file — find the real cause instead.", "Forgetting chmod +x on a new script, then wondering about 'Permission denied'.", "Using sudo for everything. Use it only when a task really needs the administrator."],
                fa: ["زدن chmod 777 برای اینکه «فقط کار کند». این به همه اجازه‌ی تغییر می‌دهد — دلیل واقعی را پیدا کن.", "فراموش‌کردن chmod +x روی اسکریپت جدید و بعد تعجب از «Permission denied».", "استفاده از sudo برای همه‌چیز. فقط وقتی کار واقعاً به مدیر سیستم نیاز دارد."] },
    practice: [
      { q: { en: "What does  -rw-r-----  allow?", fa: "مجوز  -rw-r-----  چه اجازه‌هایی می‌دهد؟" }, a: { en: "Owner: read and write. Group: read. Others: nothing. As a number: 640.", fa: "مالک: خواندن و نوشتن. گروه: خواندن. دیگران: هیچ. به عدد: 640." } },
      { q: { en: "Write the number for rwxr-xr-x.", fa: "عدد معادل rwxr-xr-x را بنویس." }, a: { en: "755", fa: "755" } },
      { q: { en: "Make backup.sh runnable, then run it.", fa: "فایل backup.sh را قابل اجرا کن و اجرایش کن." }, a: { en: "chmod +x backup.sh\n./backup.sh", fa: "chmod +x backup.sh\n./backup.sh" } },
      { q: { en: "SSH says your private key is 'too open'. Which command fixes it?", fa: "SSH می‌گوید کلید خصوصی‌ات «بیش از حد باز» است. کدام دستور درستش می‌کند؟" }, a: { en: "chmod 600 ~/.ssh/id_ed25519   (use the name of your own key file)", fa: "chmod 600 ~/.ssh/id_ed25519   (اسم فایل کلید خودت را بگذار)" } }
    ],
    recap: { en: ["Three groups (owner, group, others) × three rights (read, write, execute).", "r=4, w=2, x=1 — add them per group.", "Give the least permission that still works."],
             fa: ["سه گروه (مالک، گروه، دیگران) × سه حق (خواندن، نوشتن، اجرا).", "r=4، w=2، x=1 — برای هر گروه جمع کن.", "کمترین مجوزی را بده که کار با آن انجام می‌شود."] }
  },
  "python-10-minutes": {
    goals: { en: ["Store values in variables and print them", "Make decisions with if, elif and else", "Repeat work with a for loop over a list"],
             fa: ["مقدارها را در متغیر نگه داری و چاپ کنی", "با if، elif و else تصمیم بگیری", "با حلقه‌ی for روی یک لیست کار تکراری انجام بدهی"] },
    more: [
      { h: { en: "Kinds of value, and your first function", fa: "انواع مقدار و اولین تابع" } },
      { p: { en: "Every value has a type. Text is a string (str) and goes in quotes; whole numbers are int; numbers with a decimal point are float; True and False are bool. Python will not mix them silently: \"5\" + 5 is an error, because one is text and the other a number. Convert with int(\"5\") or str(5).",
             fa: "هر مقدار یک نوع دارد. متن رشته (str) است و داخل نقل‌قول می‌آید؛ عدد صحیح int است؛ عدد اعشاری float است؛ True و False از نوع bool هستند. پایتون این‌ها را بی‌صدا قاطی نمی‌کند: \"5\" + 5 خطاست، چون یکی متن و دیگری عدد است. با int(\"5\") یا str(5) تبدیل کن." } },
      { code: "def is_open(port, open_ports):\n    \"\"\"Return True if the port is in the list.\"\"\"\n    return port in open_ports\n\nports = [22, 80, 443]\nfor p in [22, 23, 443]:\n    if is_open(p, ports):\n        print(p, \"open\")\n    else:\n        print(p, \"closed\")", lang: "python",
        cap: { en: "A function gives a piece of work a name. Define it once with def, then call it as often as you like.", fa: "تابع به یک تکه کار اسم می‌دهد. یک بار با def تعریفش کن و هر چند بار خواستی صدایش بزن." } },
      { list: { en: ["Indentation is part of the language: the lines inside if, for and def start with four spaces.", "= stores a value; == compares two values.", "len(x) counts the items of a list or the letters of a string.", "range(1, 6) gives 1, 2, 3, 4, 5 — the end is not included.", "Read errors from the bottom up: the last line names the problem, the line above shows where."],
                fa: ["تورفتگی بخشی از زبان است: خط‌های داخل if، for و def با چهار فاصله شروع می‌شوند.", "= مقدار را ذخیره می‌کند؛ == دو مقدار را مقایسه می‌کند.", "len(x) تعداد عضوهای لیست یا حرف‌های یک رشته را می‌شمارد.", "range(1, 6) عددهای ۱ تا ۵ را می‌دهد — عدد آخر حساب نمی‌شود.", "خطا را از پایین به بالا بخوان: خط آخر مشکل را می‌گوید و خط بالاترش جای آن را."] } }
    ],
    mistakes: { en: ["Forgetting the colon at the end of if, for or def.", "Mixing tabs and spaces, or indenting unevenly.", "Using = where you meant == inside an if."],
                fa: ["جاانداختن دونقطه در آخر if، for یا def.", "قاطی‌کردن Tab و فاصله، یا تورفتگی نامنظم.", "نوشتن = به‌جای == داخل if."] },
    practice: [
      { q: { en: "Print the numbers 1 to 5, one per line.", fa: "عددهای ۱ تا ۵ را هر کدام در یک خط چاپ کن." }, a: { en: "for i in range(1, 6):\n    print(i)", fa: "for i in range(1, 6):\n    print(i)" } },
      { q: { en: "Given  devices = [\"router\", \"switch\", \"camera\"] , print how many there are.", fa: "با داشتن  devices = [\"router\", \"switch\", \"camera\"]  تعدادشان را چاپ کن." }, a: { en: "print(len(devices))", fa: "print(len(devices))" } },
      { q: { en: "Write a function double(n) that returns n times 2, and print double(21).", fa: "تابعی به اسم double(n) بنویس که n ضرب در ۲ را برگرداند و double(21) را چاپ کن." }, a: { en: "def double(n):\n    return n * 2\n\nprint(double(21))", fa: "def double(n):\n    return n * 2\n\nprint(double(21))" } },
      { q: { en: "Why does  print(\"Age: \" + 23)  fail, and how do you fix it?", fa: "چرا  print(\"Age: \" + 23)  خطا می‌دهد و چطور درست می‌شود؟" }, a: { en: "Text and a number can't be joined with +. Use print(\"Age:\", 23) or print(\"Age: \" + str(23)).", fa: "متن و عدد با + به هم نمی‌چسبند. از print(\"Age:\", 23) یا print(\"Age: \" + str(23)) استفاده کن." } }
    ],
    recap: { en: ["Variables hold values; every value has a type.", "if decides, for repeats, def names a piece of work.", "Indentation and the colon are not optional."],
             fa: ["متغیر مقدار را نگه می‌دارد و هر مقدار یک نوع دارد.", "if تصمیم می‌گیرد، for تکرار می‌کند و def به یک کار اسم می‌دهد.", "تورفتگی و دونقطه اختیاری نیستند."] }
  },
  "javascript-basics": {
    goals: { en: ["Declare values with const and let", "Write and call a function", "Make a page element react to a click"],
             fa: ["با const و let مقدار تعریف کنی", "تابع بنویسی و صدایش بزنی", "کاری کنی یک عنصر صفحه به کلیک واکنش نشان بدهد"] },
    more: [
      { h: { en: "Arrays, objects and the page", fa: "آرایه، شیء و صفحه" } },
      { p: { en: "Two containers do most of the work in JavaScript. An array is an ordered list: [22, 80, 443]. An object groups named values: { name: \"router\", ip: \"192.168.1.1\" }. Real programs are mostly arrays of objects, and loops that walk through them.",
             fa: "در جاوااسکریپت دو ظرف بیشتر کارها را انجام می‌دهند. آرایه یک فهرست مرتب است: [22, 80, 443]. شیء چند مقدار اسم‌دار را کنار هم می‌گذارد: { name: \"router\", ip: \"192.168.1.1\" }. برنامه‌های واقعی بیشتر آرایه‌ای از شیءها هستند و حلقه‌هایی که رویشان حرکت می‌کنند." } },
      { code: "const devices = [\n  { name: \"router\", up: true },\n  { name: \"camera\", up: false }\n];\n\nfor (const d of devices) {\n  console.log(d.name, d.up ? \"online\" : \"OFFLINE\");\n}\n\nconst down = devices.filter((d) => !d.up);\nconsole.log(down.length, \"device(s) down\");", lang: "javascript",
        cap: { en: "An array of objects, a loop over it, and filter to keep only the items you want.", fa: "آرایه‌ای از شیءها، یک حلقه روی آن و filter برای نگه‌داشتن فقط موردهایی که می‌خواهی." } },
      { list: { en: ["Use const by default; use let only when the value must change.", "=== compares strictly. Avoid ==, which quietly converts types.", "Press F12 in your own pages to open the console — errors appear there in red.", "document.querySelector finds an element; .textContent changes its text.", "A script must run after the element exists: put the script tag at the end of the page."],
                fa: ["به‌طور پیش‌فرض const بنویس و فقط وقتی مقدار باید عوض شود let.", "=== دقیق مقایسه می‌کند. از == دوری کن که بی‌صدا نوع را تبدیل می‌کند.", "در صفحه‌های خودت F12 را بزن تا کنسول باز شود — خطاها آنجا با رنگ قرمز دیده می‌شوند.", "document.querySelector یک عنصر را پیدا می‌کند و .textContent متنش را عوض می‌کند.", "اسکریپت باید بعد از ساخته‌شدن عنصر اجرا شود: تگ script را آخر صفحه بگذار."] } }
    ],
    mistakes: { en: ["Changing a const and getting 'Assignment to constant variable'.", "querySelector returns null because the id is misspelt or the script ran too early.", "Forgetting return — the function then gives back undefined."],
                fa: ["تغییردادن یک const و گرفتن خطای «Assignment to constant variable».", "querySelector مقدار null می‌دهد چون id غلط نوشته شده یا اسکریپت زود اجرا شده.", "فراموش‌کردن return — آن‌وقت تابع undefined برمی‌گرداند."] },
    practice: [
      { q: { en: "Write a function square(n) and log square(7).", fa: "تابعی به اسم square(n) بنویس و square(7) را چاپ کن." }, a: { en: "function square(n) {\n  return n * n;\n}\nconsole.log(square(7));", fa: "function square(n) {\n  return n * n;\n}\nconsole.log(square(7));" } },
      { q: { en: "Log how many items are in  const ports = [22, 80, 443];", fa: "تعداد عضوهای  const ports = [22, 80, 443];  را چاپ کن." }, a: { en: "console.log(ports.length);", fa: "console.log(ports.length);" } },
      { q: { en: "Log every number from 1 to 5 with a for loop.", fa: "با حلقه‌ی for عددهای ۱ تا ۵ را چاپ کن." }, a: { en: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}", fa: "for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}" } },
      { q: { en: "What is wrong here?   const count = 0; count = count + 1;", fa: "ایراد این کد چیست؟   const count = 0; count = count + 1;" }, a: { en: "A const can't be reassigned. Declare it with let.", fa: "مقدار const را نمی‌شود عوض کرد. با let تعریفش کن." } }
    ],
    recap: { en: ["const and let hold values; functions name a piece of work.", "Arrays are lists, objects are named values.", "The page reacts through events such as click."],
             fa: ["const و let مقدار نگه می‌دارند و تابع به یک کار اسم می‌دهد.", "آرایه فهرست است و شیء مقدارهای اسم‌دار.", "صفحه از راه رویدادهایی مثل click واکنش نشان می‌دهد."] }
  },
  "bash-scripting": {
    goals: { en: ["Write a script, make it runnable and run it", "Use variables, command output and if in a script", "Repeat a task for many items with a loop"],
             fa: ["یک اسکریپت بنویسی، قابل اجرایش کنی و اجرا کنی", "در اسکریپت از متغیر، خروجی دستورها و if استفاده کنی", "با حلقه یک کار را برای چندین مورد تکرار کنی"] },
    more: [
      { h: { en: "Loops, arguments and exit codes", fa: "حلقه، آرگومان و کد خروج" } },
      { p: { en: "Every command finishes with an exit code: 0 means success, anything else means failure. That is what if really tests. Scripts also receive the words typed after their name: $1 is the first, $2 the second, and $# is how many there were.",
             fa: "هر دستور با یک کد خروج تمام می‌شود: صفر یعنی موفق و هر عدد دیگری یعنی ناموفق. if در واقع همین را بررسی می‌کند. اسکریپت کلمه‌هایی را که بعد از اسمش تایپ می‌شود هم می‌گیرد: $1 اولی، $2 دومی و $# تعدادشان است." } },
      { code: "#!/bin/bash\n# check.sh — ping every address given on the command line\nif [ $# -eq 0 ]; then\n  echo \"usage: ./check.sh HOST...\"\n  exit 1\nfi\n\nfor host in \"$@\"; do\n  if ping -c 1 -W 1 \"$host\" > /dev/null; then\n    echo \"$host up\"\n  else\n    echo \"$host DOWN\"\n  fi\ndone", lang: "bash",
        cap: { en: "Run it as  ./check.sh 192.168.1.1 8.8.8.8  — the loop handles as many addresses as you give it.", fa: "این‌طور اجرایش کن:  ./check.sh 192.168.1.1 8.8.8.8  — حلقه هر چند آدرس که بدهی بررسی می‌کند." } },
      { list: { en: ["No spaces around = when you set a variable: name=\"lab\", not name = \"lab\".", "$(command) puts a command's output into a variable.", "Start serious scripts with  set -e  so they stop at the first error.", "bash -x script.sh  prints every line as it runs — the easiest way to find a bug.", "To run a script every night, add a line with  crontab -e ."],
                fa: ["هنگام مقداردهی دور = فاصله نگذار: name=\"lab\" درست است، نه name = \"lab\".", "$(command) خروجی یک دستور را در متغیر می‌گذارد.", "اسکریپت‌های جدی را با  set -e  شروع کن تا با اولین خطا متوقف شوند.", "bash -x script.sh  هر خط را موقع اجرا چاپ می‌کند — ساده‌ترین راه پیداکردن باگ.", "برای اجرای هرشبه‌ی یک اسکریپت، با  crontab -e  یک خط اضافه کن."] } }
    ],
    mistakes: { en: ["Spaces around the = sign.", "Leaving out the spaces inside [ ] — it must be [ \"$a\" = \"$b\" ].", "Forgetting the quotes around variables, which breaks on names with spaces."],
                fa: ["گذاشتن فاصله دور علامت =.", "جاانداختن فاصله‌های داخل [ ] — باید [ \"$a\" = \"$b\" ] باشد.", "فراموش‌کردن نقل‌قول دور متغیرها که با اسم‌های فاصله‌دار خراب می‌شود."] },
    practice: [
      { q: { en: "What must the first line of a Bash script be?", fa: "خط اول یک اسکریپت Bash باید چه باشد؟" }, a: { en: "#!/bin/bash", fa: "#!/bin/bash" } },
      { q: { en: "Store today's date (YYYY-MM-DD) in a variable called today.", fa: "تاریخ امروز را (به شکل YYYY-MM-DD) در متغیری به اسم today بگذار." }, a: { en: "today=$(date +%Y-%m-%d)", fa: "today=$(date +%Y-%m-%d)" } },
      { q: { en: "Write a loop that prints the name of every .log file in this folder.", fa: "حلقه‌ای بنویس که اسم همه‌ی فایل‌های .log این پوشه را چاپ کند." }, a: { en: "for f in *.log; do\n  echo \"$f\"\ndone", fa: "for f in *.log; do\n  echo \"$f\"\ndone" } },
      { q: { en: "Your script says 'Permission denied' when you run ./backup.sh. Why?", fa: "موقع اجرای ./backup.sh پیام «Permission denied» می‌گیری. چرا؟" }, a: { en: "It is not executable yet: chmod +x backup.sh", fa: "هنوز قابل اجرا نیست: chmod +x backup.sh" } }
    ],
    recap: { en: ["A script is the commands you already know, saved in a file.", "Exit code 0 means success; if tests exactly that.", "Quote your variables, and test with bash -x."],
             fa: ["اسکریپت همان دستورهایی است که بلدی، ذخیره‌شده در یک فایل.", "کد خروج صفر یعنی موفق و if دقیقاً همین را بررسی می‌کند.", "متغیرها را داخل نقل‌قول بگذار و با bash -x آزمایش کن."] }
  },
  "what-is-ip": {
    goals: { en: ["Explain what an IP address is and why every device needs one", "Tell private addresses from public ones", "Work out how many devices fit in a /24 and find your own address"],
             fa: ["توضیح بدهی آدرس IP چیست و چرا هر دستگاه یکی لازم دارد", "آدرس خصوصی را از عمومی تشخیص بدهی", "حساب کنی در یک /24 چند دستگاه جا می‌شود و آدرس خودت را پیدا کنی"] },
    more: [
      { h: { en: "Inside the address", fa: "درون آدرس" } },
      { p: { en: "An IPv4 address is four numbers from 0 to 255, which is 32 bits. The number after the slash says how many of those bits name the network; the rest name the device. In 192.168.1.24/24 the first 24 bits (192.168.1) are the network and the last 8 bits (24) are the device. Eight bits give 256 addresses; two are reserved — the first for the network itself and the last for broadcast — so 254 devices fit.",
             fa: "آدرس IPv4 چهار عدد از ۰ تا ۲۵۵ است، یعنی ۳۲ بیت. عدد بعد از اسلش می‌گوید چند بیت از این‌ها اسم شبکه است و بقیه اسم دستگاه. در 192.168.1.24/24 بیست‌وچهار بیت اول (192.168.1) شبکه است و ۸ بیت آخر (24) دستگاه. هشت بیت یعنی ۲۵۶ آدرس؛ دوتا رزرو است — اولی برای خود شبکه و آخری برای Broadcast — پس ۲۵۴ دستگاه جا می‌شود." } },
      { list: { en: ["Private ranges: 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16. They work only inside a network.", "The gateway is the router's address — the door to other networks. Usually .1.", "DHCP hands out addresses automatically; a static address is typed in by hand (use it for servers, printers and cameras).", "DNS turns names into addresses. If ping 8.8.8.8 works but websites don't open, suspect DNS.", "127.0.0.1 always means 'this computer'.", "On Windows use ipconfig; on Linux use ip addr."],
                fa: ["بازه‌های خصوصی: 10.0.0.0/8، 172.16.0.0/12 و 192.168.0.0/16. فقط داخل شبکه کار می‌کنند.", "گیت‌وی آدرس روتر است — درِ خروج به شبکه‌های دیگر. معمولاً ‎.1 است.", "DHCP آدرس‌ها را خودکار می‌دهد؛ آدرس ثابت دستی وارد می‌شود (برای سرور، پرینتر و دوربین).", "DNS اسم را به آدرس تبدیل می‌کند. اگر ping 8.8.8.8 کار می‌کند ولی سایت‌ها باز نمی‌شوند، به DNS شک کن.", "127.0.0.1 همیشه یعنی «همین کامپیوتر».", "در ویندوز ipconfig و در لینوکس ip addr."] } }
    ],
    mistakes: { en: ["Giving two devices the same address — both start dropping off the network.", "Setting a static address inside the range DHCP hands out.", "A wrong subnet mask: the device then can't see neighbours that are really on its own network."],
                fa: ["دادن یک آدرس به دو دستگاه — هر دو مدام از شبکه قطع می‌شوند.", "تنظیم آدرس ثابت داخل بازه‌ای که DHCP پخش می‌کند.", "ماسک اشتباه: دستگاه همسایه‌هایی را که واقعاً در شبکه‌ی خودش هستند نمی‌بیند."] },
    practice: [
      { q: { en: "Is 172.20.5.9 private or public?", fa: "آدرس 172.20.5.9 خصوصی است یا عمومی؟" }, a: { en: "Private — it is inside 172.16.0.0 to 172.31.255.255.", fa: "خصوصی — داخل بازه‌ی 172.16.0.0 تا 172.31.255.255 است." } },
      { q: { en: "How many devices fit in a /26?", fa: "در یک /26 چند دستگاه جا می‌شود؟" }, a: { en: "32 − 26 = 6 bits → 64 addresses → 62 usable.", fa: "۳۲ − ۲۶ = ۶ بیت ← ۶۴ آدرس ← ۶۲ آدرس قابل استفاده." } },
      { q: { en: "For 192.168.10.0/24, what are the network address, the broadcast address and the usual gateway?", fa: "برای 192.168.10.0/24 آدرس شبکه، آدرس Broadcast و گیت‌وی معمول چیست؟" }, a: { en: "Network 192.168.10.0, broadcast 192.168.10.255, gateway usually 192.168.10.1.", fa: "شبکه 192.168.10.0، Broadcast برابر 192.168.10.255 و گیت‌وی معمولاً 192.168.10.1." } },
      { q: { en: "ping 192.168.1.1 works, ping 8.8.8.8 works, but google.com won't open. Where is the fault?", fa: "ping 192.168.1.1 کار می‌کند، ping 8.8.8.8 هم کار می‌کند، ولی google.com باز نمی‌شود. مشکل کجاست؟" }, a: { en: "DNS — the network path is fine, names are not being turned into addresses.", fa: "DNS — مسیر شبکه سالم است ولی اسم‌ها به آدرس تبدیل نمی‌شوند." } }
    ],
    recap: { en: ["An address = network part + device part; the /number splits them.", "Usable devices = 2^(32 − prefix) − 2.", "Address, mask, gateway, DNS: the four settings every device needs."],
             fa: ["آدرس = بخش شبکه + بخش دستگاه؛ عدد بعد از / مرزشان را مشخص می‌کند.", "تعداد دستگاه قابل استفاده = ۲ به توان (۳۲ − پیشوند) منهای ۲.", "آدرس، ماسک، گیت‌وی و DNS: چهار تنظیمی که هر دستگاه لازم دارد."] }
  },
  "security-mindset": {
    goals: { en: ["Name the habits that stop most everyday attacks", "Recognise a phishing message", "Explain why defenders must understand attacks — and where the legal line is"],
             fa: ["عادت‌هایی را که جلوی بیشتر حمله‌های روزمره را می‌گیرند نام ببری", "یک پیام فیشینگ را تشخیص بدهی", "توضیح بدهی چرا مدافع باید حمله را بشناسد — و مرز قانونی کجاست"] },
    more: [
      { h: { en: "Three questions for every system", fa: "سه سؤال برای هر سیستم" } },
      { p: { en: "Professionals judge security with three words. Confidentiality: can only the right people read it? Integrity: can only the right people change it? Availability: is it there when it is needed? A stolen password breaks the first, an altered invoice the second, and ransomware the third. Asking these three questions about any system tells you what to protect first.",
             fa: "حرفه‌ای‌ها امنیت را با سه کلمه می‌سنجند. محرمانگی: فقط افراد درست می‌توانند آن را بخوانند؟ یکپارچگی: فقط افراد درست می‌توانند تغییرش بدهند؟ دسترس‌پذیری: وقتی لازم است در دسترس هست؟ رمز دزدیده‌شده اولی را می‌شکند، فاکتور دست‌کاری‌شده دومی را و باج‌افزار سومی را. پرسیدن این سه سؤال درباره‌ی هر سیستم نشان می‌دهد اول از چه چیزی باید محافظت کنی." } },
      { list: { en: ["Least privilege: give each person and program only the access it needs.", "Layers: a firewall, updates, backups and training together — never rely on one.", "Backups 3-2-1: three copies, on two kinds of storage, one of them somewhere else. Test that you can restore.", "A long passphrase beats a short complicated password. Use a password manager and two-step login.", "Phishing signs: urgency, a strange sender address, a link that goes somewhere other than it says.", "Never test a system you don't own without written permission. That line separates a professional from a criminal."],
                fa: ["کمترین دسترسی: به هر فرد و برنامه فقط همان دسترسی لازم را بده.", "لایه‌لایه: فایروال، به‌روزرسانی، پشتیبان و آموزش با هم — هیچ‌وقت به یکی تکیه نکن.", "پشتیبان ۳-۲-۱: سه نسخه، روی دو نوع حافظه، یکی در جای دیگر. بازگردانی را هم آزمایش کن.", "یک عبارت بلند از رمز کوتاهِ پیچیده بهتر است. از مدیر رمز و ورود دومرحله‌ای استفاده کن.", "نشانه‌های فیشینگ: عجله‌انداختن، آدرس فرستنده‌ی عجیب، لینکی که به جای دیگری می‌رود.", "هیچ‌وقت سیستمی را که مال تو نیست بدون اجازه‌ی کتبی آزمایش نکن. همین مرز، حرفه‌ای را از مجرم جدا می‌کند."] } }
    ],
    mistakes: { en: ["Using one password everywhere — one leak opens every account.", "Postponing updates for months.", "Having backups but never testing that they restore."],
                fa: ["استفاده از یک رمز برای همه‌جا — یک نشت همه‌ی حساب‌ها را باز می‌کند.", "عقب‌انداختن به‌روزرسانی برای ماه‌ها.", "داشتن پشتیبان ولی هیچ‌وقت آزمایش‌نکردن بازگردانی آن."] },
    practice: [
      { q: { en: "An email says your account will be closed in one hour unless you click a link. Name two warning signs.", fa: "ایمیلی می‌گوید اگر روی لینک نزنی حسابت تا یک ساعت دیگر بسته می‌شود. دو نشانه‌ی هشدار را نام ببر." }, a: { en: "Urgency, and a link you didn't ask for. Check the real sender address and open the site yourself instead of clicking.", fa: "عجله‌انداختن و لینکی که خودت نخواسته بودی. آدرس واقعی فرستنده را بررسی کن و به‌جای کلیک، خودت سایت را باز کن." } },
      { q: { en: "Ransomware encrypts a company's files. Which of the three — confidentiality, integrity, availability — is hit first?", fa: "باج‌افزار فایل‌های یک شرکت را رمز می‌کند. کدام‌یک از سه مورد — محرمانگی، یکپارچگی، دسترس‌پذیری — اول آسیب می‌بیند؟" }, a: { en: "Availability. A tested backup is the defence.", fa: "دسترس‌پذیری. دفاعش یک پشتیبانِ آزمایش‌شده است." } },
      { q: { en: "What does the 3-2-1 backup rule mean?", fa: "قانون پشتیبان ۳-۲-۱ یعنی چه؟" }, a: { en: "Three copies, on two different kinds of storage, with one copy kept in another place.", fa: "سه نسخه، روی دو نوع حافظه‌ی مختلف، و یک نسخه در مکانی دیگر." } },
      { q: { en: "A friend asks you to 'test' the Wi-Fi of a café. What do you answer?", fa: "دوستی از تو می‌خواهد وای‌فای یک کافه را «تست» کنی. چه جوابی می‌دهی؟" }, a: { en: "No — not without the owner's written permission. Practise on your own lab instead.", fa: "نه — بدون اجازه‌ی کتبی صاحبش نه. به‌جایش روی آزمایشگاه خودت تمرین کن." } }
    ],
    recap: { en: ["Confidentiality, integrity, availability.", "Updates, strong unique passwords, two-step login and backups stop most attacks.", "Learn attacks to defend — and only test with permission."],
             fa: ["محرمانگی، یکپارچگی، دسترس‌پذیری.", "به‌روزرسانی، رمز قوی و یکتا، ورود دومرحله‌ای و پشتیبان جلوی بیشتر حمله‌ها را می‌گیرند.", "حمله را یاد بگیر تا دفاع کنی — و فقط با اجازه آزمایش کن."] }
  }
};

// ─────────────────────────────────────────────────────────────
//  The long form of each lesson. These blocks are added after the
//  short introduction above, so every lesson goes from the first
//  step to real, daily use. All terminal output is from a real
//  Ubuntu 24.04 system.
//  One more block type is used here:
//    { table: { head: {en:[…], fa:[…]}, rows: [[cell, cell, {en,fa}], …] } }
// ─────────────────────────────────────────────────────────────
window.LEARN.extra = {
  "linux-first-steps": [
    { h: { en: "Where do I get a terminal?", fa: "ترمینال را از کجا بیاورم؟" } },
    { p: { en: "You do not need to install Linux on your whole computer to start. There are four easy ways, from the quickest to the most complete.",
           fa: "برای شروع لازم نیست لینوکس را روی کل کامپیوترت نصب کنی. چهار راه ساده هست، از سریع‌ترین تا کامل‌ترین." } },
    { list: { en: ["The practice lab on this site: a simulated terminal in your browser. Nothing to install, and nothing can break.", "Windows 10 or 11: open PowerShell as administrator, run  wsl --install , restart, and you have a real Ubuntu inside Windows.", "macOS: the Terminal app is already there. Most commands in these lessons work the same way.", "A virtual machine (VirtualBox) or an old laptop with Ubuntu: the full experience, and the best choice once you are serious."],
              fa: ["آزمایشگاه تمرین همین سایت: یک ترمینال شبیه‌سازی‌شده در مرورگر. چیزی نصب نمی‌شود و چیزی خراب نمی‌شود.", "ویندوز ۱۰ یا ۱۱: PowerShell را با دسترسی مدیر باز کن، دستور  wsl --install  را بزن، سیستم را دوباره راه‌اندازی کن و یک اوبونتوی واقعی داخل ویندوز داری.", "مک: برنامه‌ی Terminal از قبل نصب است. بیشتر دستورهای این درس‌ها همان‌طور کار می‌کنند.", "ماشین مجازی (VirtualBox) یا یک لپ‌تاپ قدیمی با اوبونتو: تجربه‌ی کامل، و بهترین انتخاب وقتی جدی شدی."] } },
    { h: { en: "Reading the prompt", fa: "خواندن خط آماده‌به‌کار" } },
    { p: { en: "Before you type anything, the terminal shows a short line called the prompt, for example  sara@laptop:~/notes$ . It is not decoration; it answers three questions. sara is the user, laptop is the name of the machine, and ~/notes is the folder you are in (~ means your home folder). The last character matters most: $ means a normal user, and # means root, the administrator who is allowed to change everything. When you see #, slow down.",
           fa: "قبل از اینکه چیزی تایپ کنی، ترمینال یک خط کوتاه نشان می‌دهد، مثلاً  sara@laptop:~/notes$ . این تزئین نیست و به سه سؤال جواب می‌دهد. sara کاربر است، laptop اسم دستگاه است و ~/notes پوشه‌ای است که در آن هستی (~ یعنی پوشه‌ی خانه). نویسه‌ی آخر از همه مهم‌تر است: $ یعنی کاربر معمولی و # یعنی root، مدیری که اجازه دارد همه‌چیز را تغییر بدهد. وقتی # دیدی آهسته‌تر کار کن." } },
    { h: { en: "A few more questions you can ask", fa: "چند سؤال دیگر که می‌توانی بپرسی" } },
    { term: "$ date\nWed Nov 11 13:26:02 UTC 2026\n$ hostname\nvm\n$ id\nuid=0(root) gid=0(root) groups=0(root)\n$ echo $SHELL\n/bin/bash",
      cap: { en: "date gives the time, hostname the machine's name, id your user number and groups, and $SHELL the program that reads your commands.", fa: "date زمان را می‌دهد، hostname اسم دستگاه را، id شماره‌ی کاربر و گروه‌هایت را و $SHELL برنامه‌ای را که دستورهایت را می‌خواند." } },
    { p: { en: "The program that reads what you type is called the shell; on most systems it is Bash. The terminal is only the window. This is why people say 'a Bash command': the window shows text, the shell understands it.",
           fa: "برنامه‌ای که نوشته‌هایت را می‌خواند «شل» نام دارد و در بیشتر سیستم‌ها Bash است. ترمینال فقط پنجره است. برای همین می‌گویند «دستور Bash»: پنجره متن را نشان می‌دهد و شل آن را می‌فهمد." } },
    { h: { en: "Getting help without the internet", fa: "کمک‌گرفتن بدون اینترنت" } },
    { p: { en: "Nobody remembers every option. Professionals remember how to look things up quickly. Three tools are always installed.",
           fa: "هیچ‌کس همه‌ی گزینه‌ها را حفظ نیست. حرفه‌ای‌ها فقط بلدند سریع پیدا کنند. سه ابزار همیشه نصب است." } },
    { term: "$ ls --help | head -3\nUsage: ls [OPTION]... [FILE]...\nList information about the FILEs (the current directory by default).\nSort entries alphabetically if none of -cftuvSUX nor --sort is specified.\n$ which python3\n/usr/bin/python3\n$ type cd\ncd is a shell builtin",
      cap: { en: "--help prints a short guide, which shows where a program lives, and type tells you what kind of command a name is.", fa: "--help یک راهنمای کوتاه چاپ می‌کند، which نشان می‌دهد برنامه کجاست و type می‌گوید یک اسم چه نوع دستوری است." } },
    { list: { en: ["man ls  opens the full manual. Move with the arrow keys, search with /word, leave with q.", "In a 'Usage' line, square brackets mean optional and three dots mean 'you may give several'.", "apropos network  lists commands whose description mentions a word — useful when you don't know the name."],
              fa: ["man ls  راهنمای کامل را باز می‌کند. با کلیدهای جهت حرکت کن، با /word جست‌وجو کن و با q خارج شو.", "در خط Usage، کروشه یعنی اختیاری و سه‌نقطه یعنی «می‌توانی چندتا بدهی».", "apropos network  دستورهایی را فهرست می‌کند که در توضیحشان این کلمه هست — وقتی اسم دستور را نمی‌دانی."] } },
    { h: { en: "Keys that make you fast", fa: "کلیدهایی که سریعت می‌کنند" } },
    { table: { head: { en: ["Key", "What it does"], fa: ["کلید", "چه می‌کند"] }, rows: [
      ["Tab", { en: "Completes a command or file name. Press twice to see every choice.", fa: "اسم دستور یا فایل را کامل می‌کند. دو بار بزن تا همه‌ی انتخاب‌ها را ببینی." }],
      ["↑  ↓", { en: "Walk through the commands you ran before.", fa: "بین دستورهای قبلی حرکت می‌کند." }],
      ["Ctrl + R", { en: "Search your history: type a few letters of an old command.", fa: "جست‌وجو در تاریخچه: چند حرف از یک دستور قدیمی را تایپ کن." }],
      ["Ctrl + C", { en: "Stop the running command.", fa: "دستور در حال اجرا را متوقف می‌کند." }],
      ["Ctrl + L", { en: "Clear the screen (same as clear).", fa: "صفحه را پاک می‌کند (مثل clear)." }],
      ["Ctrl + A / Ctrl + E", { en: "Jump to the start / end of the line.", fa: "پرش به اول / آخر خط." }],
      ["Ctrl + D", { en: "Close the terminal session (same as exit).", fa: "نشست ترمینال را می‌بندد (مثل exit)." }]
    ] } },
    { p: { en: "history prints the list of commands you have typed, each with a number. !! repeats the last command, which is handy with sudo: if a command fails because you are not the administrator, type  sudo !! .",
           fa: "دستور history فهرست دستورهایی را که تایپ کرده‌ای با شماره چاپ می‌کند. !! آخرین دستور را تکرار می‌کند و با sudo خیلی به کار می‌آید: اگر دستوری چون مدیر نیستی خطا داد، بنویس  sudo !! ." } },
    { h: { en: "What is running right now?", fa: "الان چه چیزی در حال اجراست؟" } },
    { p: { en: "Every running program is a process with a number, the PID. ps shows the processes of your own terminal, and  ps aux  shows all of them. top is a live table that refreshes every few seconds, sorted by how much processor each process uses; press q to leave it. If a program hangs, find its PID and stop it with  kill PID . Only when that fails use  kill -9 PID , which gives the program no chance to save its work.",
           fa: "هر برنامه‌ی در حال اجرا یک «پردازه» با یک شماره است که به آن PID می‌گویند. ps پردازه‌های ترمینال خودت را نشان می‌دهد و  ps aux  همه را. top یک جدول زنده است که هر چند ثانیه تازه می‌شود و بر اساس مصرف پردازنده مرتب است؛ با q از آن خارج شو. اگر برنامه‌ای قفل کرد، PID آن را پیدا کن و با  kill PID  متوقفش کن. فقط اگر جواب نداد از  kill -9 PID  استفاده کن که به برنامه فرصت ذخیره‌ی کارش را نمی‌دهد." } },
    { h: { en: "sudo: borrowing the administrator's power", fa: "sudo: قرض‌گرفتن قدرت مدیر" } },
    { p: { en: "Some tasks — installing software, editing system settings, reading other people's files — need the administrator. Instead of logging in as root, you put sudo in front of one command and type your own password. The power lasts for that command only.",
           fa: "بعضی کارها — نصب نرم‌افزار، تغییر تنظیمات سیستم، خواندن فایل دیگران — به مدیر سیستم نیاز دارند. به‌جای ورود با root، جلوی همان یک دستور sudo می‌گذاری و رمز خودت را وارد می‌کنی. این قدرت فقط برای همان دستور است." } },
    { code: "sudo apt update          # refresh the list of available software\nsudo apt install htop    # install a program\nsudo apt upgrade         # install the waiting updates", lang: "bash",
      cap: { en: "On Ubuntu and Debian, apt installs and updates software. You will use these three lines every week.", fa: "در اوبونتو و دبیان، apt نرم‌افزار را نصب و به‌روز می‌کند. این سه خط را هر هفته استفاده خواهی کرد." } },
    { note: { en: "The password does not appear while you type it — not even as stars. That is normal. Type it and press Enter. And never run a command with sudo that you copied from the internet without understanding every word of it.", fa: "رمز موقع تایپ نشان داده نمی‌شود — حتی به شکل ستاره. این طبیعی است؛ تایپ کن و Enter بزن. و هیچ‌وقت دستوری را که از اینترنت کپی کرده‌ای و همه‌ی کلمه‌هایش را نمی‌فهمی با sudo اجرا نکن." }, kind: "warn" },
    { h: { en: "A five-minute health check", fa: "یک بررسی سلامت پنج‌دقیقه‌ای" } },
    { p: { en: "Put the commands together and you have the routine an administrator runs when a server 'feels slow'. Run them in this order and read the answers.",
           fa: "این دستورها را کنار هم بگذار تا همان کاری را داشته باشی که یک مدیر سیستم وقتی سرور «کند شده» انجام می‌دهد. به همین ترتیب اجرا کن و جواب‌ها را بخوان." } },
    { list: { en: ["uptime — how long it has been on, and the load: three numbers for the last 1, 5 and 15 minutes. A load above the number of processor cores means work is queuing.", "free -h — is memory nearly all used? Look at the 'available' column, not 'free'.", "df -h — is any disk above 90%? A full disk causes strange errors everywhere.", "top — which process is using the processor or memory?", "who — who else is logged in right now?"],
              fa: ["uptime — چه مدت روشن است، و بار سیستم: سه عدد برای ۱، ۵ و ۱۵ دقیقه‌ی اخیر. بار بیشتر از تعداد هسته‌های پردازنده یعنی کارها در صف مانده‌اند.", "free -h — حافظه تقریباً پر است؟ به ستون available نگاه کن، نه free.", "df -h — دیسکی بالای ۹۰٪ هست؟ دیسک پر همه‌جا خطاهای عجیب می‌سازد.", "top — کدام پردازه پردازنده یا حافظه را مصرف می‌کند؟", "who — الان چه کس دیگری وارد سیستم شده؟"] } }
  ],

  "linux-files": [
    { h: { en: "The map of a Linux system", fa: "نقشه‌ی یک سیستم لینوکس" } },
    { p: { en: "Windows has drives such as C: and D:. Linux has a single tree that starts at one point called the root, written as a lone slash: / . Every disk, USB stick and folder hangs somewhere under it. A few folders exist on every Linux system, and knowing them tells you where to look.",
           fa: "ویندوز درایوهایی مثل C: و D: دارد. لینوکس یک درخت واحد دارد که از یک نقطه به اسم «ریشه» شروع می‌شود و با یک اسلش تنها نوشته می‌شود: / . هر دیسک، فلش و پوشه جایی زیر آن قرار می‌گیرد. چند پوشه در هر لینوکسی هست و شناختنشان می‌گوید کجا را بگردی." } },
    { table: { head: { en: ["Folder", "What lives there"], fa: ["پوشه", "چه چیزی آنجاست"] }, rows: [
      ["/home", { en: "One folder per user: your documents and settings.", fa: "برای هر کاربر یک پوشه: سندها و تنظیمات تو." }],
      ["/etc", { en: "Settings of the system and of installed programs, as text files.", fa: "تنظیمات سیستم و برنامه‌های نصب‌شده، به شکل فایل متنی." }],
      ["/var/log", { en: "Log files: the diary of the system. The first place to look when something breaks.", fa: "فایل‌های لاگ: دفتر خاطرات سیستم. اولین جایی که وقتی چیزی خراب شد باید ببینی." }],
      ["/tmp", { en: "Temporary files. Emptied when the machine restarts.", fa: "فایل‌های موقت. با راه‌اندازی دوباره خالی می‌شود." }],
      ["/usr/bin", { en: "The programs you run, such as ls and python3.", fa: "برنامه‌هایی که اجرا می‌کنی، مثل ls و python3." }],
      ["/root", { en: "The home folder of the administrator.", fa: "پوشه‌ی خانه‌ی مدیر سیستم." }],
      ["/dev, /proc", { en: "Not real files: windows onto devices and running processes.", fa: "فایل واقعی نیستند: پنجره‌ای رو به دستگاه‌ها و پردازه‌های در حال اجرا." }]
    ] } },
    { h: { en: "Reading what is inside a file", fa: "خواندن محتوای یک فایل" } },
    { p: { en: "Most things on Linux are plain text, so reading files is half of the job. Pick the tool by the size of the file.",
           fa: "بیشتر چیزها در لینوکس متن ساده‌اند، پس خواندن فایل نیمی از کار است. ابزار را بر اساس اندازه‌ی فایل انتخاب کن." } },
    { term: "$ cat notes/todo.txt\nbuy a switch\ncheck the camera on floor 2\nrenew the domain\ncall the ISP\nupdate the firewall\nbackup the server\n$ head -n 2 notes/todo.txt\nbuy a switch\ncheck the camera on floor 2\n$ tail -n 2 notes/todo.txt\nupdate the firewall\nbackup the server\n$ wc -l notes/todo.txt\n6 notes/todo.txt",
      cap: { en: "cat prints the whole file, head the first lines, tail the last lines, and wc -l counts the lines.", fa: "cat کل فایل را چاپ می‌کند، head خط‌های اول، tail خط‌های آخر و wc -l تعداد خط‌ها را می‌شمارد." } },
    { list: { en: ["less file  opens a long file one screen at a time: Space for the next page, /word to search, q to quit.", "tail -f /var/log/syslog  keeps the file open and shows new lines as they arrive. This is how you watch a log live; stop with Ctrl+C.", "Never cat a huge file or a program file — use less, or head first to see what it is."],
              fa: ["less file  یک فایل بلند را صفحه‌به‌صفحه باز می‌کند: Space برای صفحه‌ی بعد، /word برای جست‌وجو و q برای خروج.", "tail -f /var/log/syslog  فایل را باز نگه می‌دارد و خط‌های جدید را همان لحظه نشان می‌دهد. لاگ را این‌طور زنده تماشا می‌کنند؛ با Ctrl+C متوقفش کن.", "هیچ‌وقت یک فایل خیلی بزرگ یا فایل برنامه را cat نکن — از less استفاده کن یا اول با head ببین چیست."] } },
    { h: { en: "Writing into files", fa: "نوشتن داخل فایل" } },
    { p: { en: "The > sign sends what a command prints into a file instead of the screen. One > replaces the file; two >> add to its end. Mixing them up is one of the classic ways to lose data, so read the line before you press Enter.",
           fa: "علامت > خروجی یک دستور را به‌جای صفحه داخل فایل می‌فرستد. یک > فایل را جایگزین می‌کند و دوتا >> به انتهایش اضافه می‌کند. اشتباه‌گرفتن این دو از راه‌های معروف ازدست‌دادن داده است، پس قبل از Enter خط را بخوان." } },
    { term: "$ echo \"order new cables\" >> notes/todo.txt\n$ tail -n 1 notes/todo.txt\norder new cables",
      cap: { en: ">> added one line to the end and kept the rest.", fa: ">> یک خط به انتها اضافه کرد و بقیه را نگه داشت." } },
    { p: { en: "To edit a file properly, use an editor. nano is the friendliest:  nano notes/todo.txt  opens the file, you type as usual, Ctrl+O then Enter saves, and Ctrl+X leaves. The other common editor, vim, is powerful but has its own rules; if you open it by accident, press Esc, type  :q!  and press Enter to get out.",
           fa: "برای ویرایش درست یک فایل از ویرایشگر استفاده کن. nano ساده‌ترین است:  nano notes/todo.txt  فایل را باز می‌کند، مثل همیشه تایپ می‌کنی، Ctrl+O و بعد Enter ذخیره می‌کند و Ctrl+X خارج می‌شود. ویرایشگر رایج دیگر، vim، قدرتمند است ولی قواعد خودش را دارد؛ اگر اشتباهی بازش کردی، Esc را بزن، بنویس  :q!  و Enter بزن تا خارج شوی." } },
    { h: { en: "Finding files and finding text", fa: "پیداکردن فایل و پیداکردن متن" } },
    { p: { en: "Two different questions need two different tools. find looks for files by name, type, size or age. grep looks inside files for a piece of text.",
           fa: "دو سؤال متفاوت دو ابزار متفاوت می‌خواهد. find فایل‌ها را بر اساس اسم، نوع، اندازه یا عمر پیدا می‌کند. grep داخل فایل‌ها دنبال یک تکه متن می‌گردد." } },
    { term: "$ find . -name \"*.log\"\n./logs/auth.log\n$ grep Failed logs/auth.log\nNov 10 09:40:13 srv sshd[902]: Failed password for root from 203.0.113.45\nNov 10 09:40:15 srv sshd[902]: Failed password for root from 203.0.113.45\nNov 10 11:30:09 srv sshd[990]: Failed password for admin from 198.51.100.77\n$ grep -c Failed logs/auth.log\n3\n$ grep -r \"camera\" .\n./notes/todo.txt:check the camera on floor 2",
      cap: { en: "find by name; grep for the lines that contain a word; -c counts them; -r searches every file under a folder.", fa: "find بر اساس اسم؛ grep برای خط‌هایی که یک کلمه را دارند؛ -c می‌شمارد؛ -r همه‌ی فایل‌های زیر یک پوشه را می‌گردد." } },
    { list: { en: ["grep -i  ignores capital letters;  grep -n  shows line numbers;  grep -v  shows the lines that do NOT match.", "find /var/log -mtime -1  lists files changed in the last day.", "find . -size +100M  finds the big files that are filling your disk.", "Join commands with a pipe:  grep Failed logs/auth.log | wc -l  counts the failed logins. The | sign hands the output of the left command to the right one."],
              fa: ["grep -i  حروف بزرگ و کوچک را نادیده می‌گیرد؛  grep -n  شماره‌ی خط را نشان می‌دهد؛  grep -v  خط‌هایی را نشان می‌دهد که جور نیستند.", "find /var/log -mtime -1  فایل‌هایی را که در یک روز اخیر تغییر کرده‌اند فهرست می‌کند.", "find . -size +100M  فایل‌های بزرگی را که دیسک را پر کرده‌اند پیدا می‌کند.", "دستورها را با پایپ وصل کن:  grep Failed logs/auth.log | wc -l  ورودهای ناموفق را می‌شمارد. علامت | خروجی دستور سمت چپ را به دستور سمت راست می‌دهد."] } },
    { h: { en: "Many files at once: wildcards", fa: "چند فایل با هم: الگوها" } },
    { p: { en: "The shell can fill in file names for you. A star stands for any number of characters and a question mark for exactly one. So *.txt is every text file, report-202?.pdf matches report-2025.pdf and report-2026.pdf, and backup* is everything that starts with backup. The shell expands the pattern before the command runs, which means  rm *  really does mean 'delete everything here'. Test a pattern with ls first, then reuse it with rm.",
           fa: "شل می‌تواند اسم فایل‌ها را خودش کامل کند. ستاره به‌جای هر تعداد نویسه و علامت سؤال به‌جای دقیقاً یک نویسه می‌نشیند. پس *.txt یعنی همه‌ی فایل‌های متنی، report-202?.pdf با report-2025.pdf و report-2026.pdf جور است و backup* یعنی هر چیزی که با backup شروع شود. شل الگو را قبل از اجرای دستور باز می‌کند، یعنی  rm *  واقعاً یعنی «همه‌چیزِ اینجا را پاک کن». الگو را اول با ls امتحان کن و بعد با rm استفاده کن." } },
    { h: { en: "How big is it?", fa: "چقدر جا گرفته؟" } },
    { term: "$ du -sh notes logs\n8.0K\tnotes\n8.0K\tlogs\n$ ls -lh notes-backup.tar.gz\n-rw-r--r-- 1 root root 243 Nov 11 13:26 notes-backup.tar.gz",
      cap: { en: "du -sh gives the total size of a folder; ls -lh shows file sizes in K, M and G.", fa: "du -sh حجم کل یک پوشه را می‌دهد و ls -lh اندازه‌ی فایل‌ها را با K، M و G نشان می‌دهد." } },
    { p: { en: "When a disk fills up, the hunt is always the same: df -h to see which disk, then  du -sh /var/* | sort -h  to see which folder is the biggest, then go one level deeper and repeat.",
           fa: "وقتی دیسک پر می‌شود، روش همیشه یکی است: df -h تا ببینی کدام دیسک، بعد  du -sh /var/* | sort -h  تا ببینی کدام پوشه بزرگ‌تر است، بعد یک سطح پایین‌تر برو و تکرار کن." } },
    { h: { en: "Packing folders: tar", fa: "بسته‌بندی پوشه‌ها: tar" } },
    { term: "$ tar -czf notes-backup.tar.gz notes\n$ tar -tzf notes-backup.tar.gz\nnotes/\nnotes/todo.txt",
      cap: { en: "c creates, z compresses, f names the file. t lists what is inside without unpacking.", fa: "c می‌سازد، z فشرده می‌کند و f اسم فایل را می‌گیرد. t محتوا را بدون بازکردن فهرست می‌کند." } },
    { p: { en: "To unpack, swap c for x:  tar -xzf notes-backup.tar.gz . Add  -C /some/folder  to unpack somewhere else. This one command is how most backups and software downloads on Linux are packed.",
           fa: "برای بازکردن، c را با x عوض کن:  tar -xzf notes-backup.tar.gz . با  -C /some/folder  جای دیگری باز می‌شود. بیشتر پشتیبان‌ها و نرم‌افزارهای لینوکس با همین یک دستور بسته‌بندی می‌شوند." } },
    { h: { en: "Shortcuts to files: links", fa: "میانبر به فایل‌ها: لینک" } },
    { term: "$ ln -s notes/todo.txt todo\n$ ls -l todo\nlrwxrwxrwx 1 root root 14 Nov 11 13:26 todo -> notes/todo.txt",
      cap: { en: "A symbolic link is a pointer to another file. The l at the start and the arrow show where it leads.", fa: "لینک نمادین اشاره‌گری به یک فایل دیگر است. حرف l در ابتدا و فلش نشان می‌دهند به کجا می‌رود." } },
    { h: { en: "Put it together: tidy a messy folder", fa: "همه را کنار هم بگذار: مرتب‌کردن یک پوشه‌ی شلوغ" } },
    { code: "mkdir -p archive/2026 reports\nls *.pdf                       # look before you move\nmv *.pdf reports/\nfind . -name \"*.tmp\" -delete   # remove leftovers\ntar -czf archive/2026/reports.tar.gz reports\ndu -sh archive", lang: "bash",
      cap: { en: "A real five-line job: sort the PDFs, delete temporary files, and keep a compressed copy.", fa: "یک کار واقعی پنج‌خطی: PDFها را مرتب کن، فایل‌های موقت را پاک کن و یک نسخه‌ی فشرده نگه دار." } }
  ],

  "linux-permissions": [
    { h: { en: "Why permissions exist", fa: "چرا مجوز وجود دارد" } },
    { p: { en: "Linux was built for machines that many people share. Permissions answer one question for every file: who is allowed to do what? They are the first wall of defence on any server. A website that is hacked can only damage what its own user may touch; a private key that everyone can read is no longer private. Most real break-ins are not clever — they walk through a permission that was left too open.",
           fa: "لینوکس برای دستگاه‌هایی ساخته شد که چند نفر با هم از آن استفاده می‌کنند. مجوزها برای هر فایل به یک سؤال جواب می‌دهند: چه کسی اجازه‌ی چه کاری را دارد؟ این اولین دیوار دفاعی هر سرور است. وب‌سایتی که هک شود فقط به چیزهایی آسیب می‌زند که کاربر خودش اجازه‌ی دست‌زدن به آن‌ها را دارد؛ کلید خصوصی‌ای که همه بتوانند بخوانند دیگر خصوصی نیست. بیشتر نفوذهای واقعی هوشمندانه نیستند — از مجوزی رد می‌شوند که زیادی باز مانده بود." } },
    { h: { en: "Users and groups", fa: "کاربران و گروه‌ها" } },
    { p: { en: "Every file has one owner and one group. Every user has a number (the UID), belongs to one or more groups, and has a line in the file /etc/passwd. The administrator, root, is always UID 0.",
           fa: "هر فایل یک مالک و یک گروه دارد. هر کاربر یک شماره (UID) دارد، عضو یک یا چند گروه است و یک خط در فایل /etc/passwd دارد. مدیر سیستم، یعنی root، همیشه UID صفر است." } },
    { term: "$ id\nuid=0(root) gid=0(root) groups=0(root)\n$ head -n 3 /etc/passwd\nroot:x:0:0:root:/root:/bin/bash\ndaemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin\nbin:x:2:2:bin:/bin:/usr/sbin/nologin",
      cap: { en: "Each line of /etc/passwd is: name, password marker, UID, group number, description, home folder, shell. 'nologin' means nobody can log in as that user.", fa: "هر خط /etc/passwd این است: نام، نشانه‌ی رمز، UID، شماره‌ی گروه، توضیح، پوشه‌ی خانه و شل. «nologin» یعنی کسی نمی‌تواند با آن کاربر وارد شود." } },
    { code: "sudo adduser sara              # create a user\nsudo groupadd support          # create a group\nsudo usermod -aG support sara  # add sara to it (-a = add, don't replace)\ngroups sara                    # check", lang: "bash",
      cap: { en: "The four commands for managing people on a server. Forgetting -a in usermod removes the user from every other group.", fa: "چهار دستور برای مدیریت افراد روی سرور. جاانداختن -a در usermod کاربر را از همه‌ی گروه‌های دیگر حذف می‌کند." } },
    { h: { en: "Seeing and setting permissions as numbers", fa: "دیدن و تنظیم مجوزها با عدد" } },
    { term: "$ ls -l report.txt\n-rw-r--r-- 1 root root 0 Nov 11 13:26 report.txt\n$ chmod 640 report.txt\n$ ls -l report.txt\n-rw-r----- 1 root root 0 Nov 11 13:26 report.txt\n$ stat -c \"%a %A %U:%G %n\" report.txt\n640 -rw-r----- root:root report.txt",
      cap: { en: "640: the owner reads and writes, the group reads, everyone else gets nothing. stat prints the number and the letters side by side.", fa: "640: مالک می‌خواند و می‌نویسد، گروه می‌خواند و بقیه هیچ. stat عدد و حروف را کنار هم چاپ می‌کند." } },
    { table: { head: { en: ["Number", "Letters", "Typical use"], fa: ["عدد", "حروف", "کاربرد معمول"] }, rows: [
      ["644", "rw-r--r--", { en: "Ordinary files and web pages", fa: "فایل‌های معمولی و صفحه‌های وب" }],
      ["640", "rw-r-----", { en: "Settings that contain passwords", fa: "تنظیماتی که رمز دارند" }],
      ["600", "rw-------", { en: "SSH private keys, personal secrets", fa: "کلید خصوصی SSH و رازهای شخصی" }],
      ["755", "rwxr-xr-x", { en: "Programs, scripts and normal folders", fa: "برنامه‌ها، اسکریپت‌ها و پوشه‌های معمولی" }],
      ["750", "rwxr-x---", { en: "A folder for one team", fa: "پوشه‌ی یک تیم" }],
      ["700", "rwx------", { en: "A private folder such as ~/.ssh", fa: "پوشه‌ی خصوصی مثل ~/.ssh" }]
    ] } },
    { h: { en: "Folders are different", fa: "پوشه‌ها فرق دارند" } },
    { p: { en: "The three letters mean something else on a folder. r lets you list the names inside. w lets you create, rename and delete files inside — even files that belong to someone else. x lets you enter the folder and reach what is in it. A folder with r but without x is almost useless: you can see the names but open nothing. This is why folders are normally 755 or 750, never 644.",
           fa: "این سه حرف روی پوشه معنای دیگری دارند. r اجازه می‌دهد اسم‌های داخلش را فهرست کنی. w اجازه می‌دهد داخلش فایل بسازی، تغییر نام بدهی و حذف کنی — حتی فایل‌هایی که مال دیگری است. x اجازه می‌دهد وارد پوشه شوی و به محتوایش برسی. پوشه‌ای که r دارد ولی x ندارد تقریباً بی‌فایده است: اسم‌ها را می‌بینی ولی چیزی را باز نمی‌کنی. برای همین پوشه‌ها معمولاً 755 یا 750 هستند و هیچ‌وقت 644 نه." } },
    { term: "$ chmod 750 shared\n$ ls -ld shared\ndrwxr-x--- 2 root root 4096 Nov 11 13:26 shared",
      cap: { en: "ls -ld shows the folder itself instead of what is inside it. The d at the start means directory.", fa: "ls -ld خود پوشه را نشان می‌دهد، نه محتوایش را. حرف d در ابتدا یعنی پوشه." } },
    { h: { en: "Changing the owner: chown", fa: "تغییر مالک: chown" } },
    { code: "sudo chown sara report.txt             # new owner\nsudo chown sara:support report.txt     # owner and group\nsudo chown -R www-data:www-data /var/www/site   # a whole folder tree", lang: "bash",
      cap: { en: "-R applies the change to everything inside. Check the path twice before you run a recursive command with sudo.", fa: "-R تغییر را روی همه‌ی محتوای داخل اعمال می‌کند. قبل از اجرای دستور بازگشتی با sudo مسیر را دو بار بررسی کن." } },
    { h: { en: "Where default permissions come from: umask", fa: "مجوز پیش‌فرض از کجا می‌آید: umask" } },
    { p: { en: "New files do not get random permissions. The system starts from 666 for files and 777 for folders and removes whatever the umask says. With the usual umask of 022, files become 644 and folders 755. On a server that holds private data, a umask of 027 is safer: new files become 640 and folders 750, so 'others' get nothing by default.",
           fa: "فایل‌های جدید مجوز تصادفی نمی‌گیرند. سیستم از 666 برای فایل و 777 برای پوشه شروع می‌کند و هر چه umask بگوید کم می‌کند. با umask معمولِ 022، فایل‌ها 644 و پوشه‌ها 755 می‌شوند. روی سروری که داده‌ی خصوصی دارد umask برابر 027 امن‌تر است: فایل جدید 640 و پوشه 750 می‌شود و «دیگران» به‌طور پیش‌فرض هیچ دسترسی‌ای نمی‌گیرند." } },
    { term: "$ umask\n0022", cap: { en: "The current umask of this system.", fa: "umask فعلی این سیستم." } },
    { h: { en: "Three special marks", fa: "سه علامت ویژه" } },
    { term: "$ ls -ld /tmp\ndrwxrwxrwt 13 root root 12288 Nov 11 13:26 /tmp\n$ ls -l /usr/bin/passwd\n-rwsr-xr-x 1 root root 64152 May 30  2024 /usr/bin/passwd",
      cap: { en: "The t at the end of /tmp is the sticky bit; the s in passwd is setuid.", fa: "حرف t در انتهای مجوز /tmp همان Sticky bit است و حرف s در passwd همان setuid." } },
    { list: { en: ["Sticky bit (t) on a folder: everyone may create files, but each person can delete only their own. That is why /tmp is safe to share.", "setuid (s on the owner): the program runs with the power of its owner. passwd needs it to change your password in a file only root may write.", "setgid (s on the group) on a folder: new files inherit the folder's group — ideal for a team folder.", "Because setuid programs run as root, attackers look for them. List them with  find / -perm -4000 -type f 2>/dev/null  and question every one you do not recognise."],
              fa: ["Sticky bit (حرف t) روی پوشه: همه می‌توانند فایل بسازند ولی هر کس فقط فایل خودش را می‌تواند حذف کند. برای همین /tmp برای استفاده‌ی مشترک امن است.", "setuid (حرف s روی مالک): برنامه با قدرت مالکش اجرا می‌شود. passwd به آن نیاز دارد تا رمزت را در فایلی عوض کند که فقط root اجازه‌ی نوشتنش را دارد.", "setgid (حرف s روی گروه) روی پوشه: فایل‌های جدید گروه پوشه را به ارث می‌برند — عالی برای پوشه‌ی تیمی.", "چون برنامه‌های setuid با دسترسی root اجرا می‌شوند، مهاجم‌ها دنبالشان می‌گردند. با  find / -perm -4000 -type f 2>/dev/null  فهرستشان کن و درباره‌ی هر کدام که نمی‌شناسی سؤال کن."] } },
    { h: { en: "A worked example: a shared team folder", fa: "یک مثال کامل: پوشه‌ی مشترک تیم" } },
    { p: { en: "The support team needs one folder where every member can read and write, new files belong to the team automatically, and nobody outside the team can look in.",
           fa: "تیم پشتیبانی پوشه‌ای می‌خواهد که همه‌ی اعضا در آن بخوانند و بنویسند، فایل‌های جدید خودکار مال تیم باشند و کسی بیرون از تیم نتواند داخلش را ببیند." } },
    { code: "sudo groupadd support\nsudo usermod -aG support sara\nsudo usermod -aG support ali\nsudo mkdir /srv/support\nsudo chown root:support /srv/support\nsudo chmod 2770 /srv/support     # 2 = setgid, 770 = owner and group only\nls -ld /srv/support              # drwxrws--- root support", lang: "bash",
      cap: { en: "Seven lines that an administrator types on the first day of every new team.", fa: "هفت خطی که یک مدیر سیستم در اولین روز هر تیم جدید تایپ می‌کند." } },
    { h: { en: "When 'Permission denied' appears", fa: "وقتی «Permission denied» می‌بینی" } },
    { list: { en: ["Who am I? Run whoami and id.", "What does the file allow? Run ls -l on the file.", "Can I reach it? Run ls -ld on every folder in the path — one folder without x blocks everything below it.", "Fix the smallest thing: add the user to the right group, or give the group the one right that is missing.", "Only then consider sudo — and never answer the problem with chmod 777."],
              fa: ["من کی‌ام؟ whoami و id را بزن.", "فایل چه اجازه‌ای می‌دهد؟ روی فایل ls -l بزن.", "می‌توانم به آن برسم؟ روی هر پوشه‌ی مسیر ls -ld بزن — یک پوشه بدون x همه‌ی زیرمجموعه‌اش را می‌بندد.", "کوچک‌ترین چیز را درست کن: کاربر را به گروه درست اضافه کن یا همان یک حقِ کم را به گروه بده.", "فقط بعد از این‌ها به sudo فکر کن — و هیچ‌وقت جواب مشکل را با chmod 777 نده."] } }
  ]
};

Object.assign(window.LEARN.extra, {
  "python-10-minutes": [
    { h: { en: "Setting up and running a program", fa: "آماده‌سازی و اجرای برنامه" } },
    { p: { en: "Python is already installed on Linux and macOS; on Windows download it from python.org and tick 'Add Python to PATH' during the installation. There are two ways to use it. Typing python3 alone opens an interactive prompt (>>>) where each line runs at once — good for experiments. For real work you write the lines into a file that ends in .py and run the file.",
           fa: "پایتون روی لینوکس و مک از قبل نصب است؛ در ویندوز از python.org دانلودش کن و موقع نصب تیک «Add Python to PATH» را بزن. دو راه برای استفاده هست. نوشتن python3 به‌تنهایی یک خط فرمان تعاملی (>>>) باز می‌کند که هر خط همان لحظه اجرا می‌شود — برای آزمایش خوب است. برای کار واقعی خط‌ها را در فایلی با پسوند .py می‌نویسی و فایل را اجرا می‌کنی." } },
    { code: "python3 --version        # check that it is installed\npython3                  # interactive mode; leave with exit()\npython3 hello.py         # run a file", lang: "bash",
      cap: { en: "No computer nearby? The Python tab of the practice lab runs real Python in your browser.", fa: "کامپیوتر دم دستت نیست؟ زبانه‌ی پایتون در آزمایشگاه تمرین، پایتون واقعی را در مرورگر اجرا می‌کند." } },
    { h: { en: "Numbers and text in depth", fa: "عدد و متن با جزئیات" } },
    { code: "price = 250000\ncount = 3\ntotal = price * count\nprint(f\"Total: {total:,} toman\")\nprint(10 / 4, 10 // 4, 10 % 4, 2 ** 10)\n\nname = \"sepehr niaz\"\nprint(name.title(), len(name), name.upper())\nprint(name.split(), \"niaz\" in name)", lang: "python" },
    { term: "$ python3 p1.py\nTotal: 750,000 toman\n2.5 2 2 1024\nSepehr Niaz 11 SEPEHR NIAZ\n['sepehr', 'niaz'] True",
      cap: { en: "The real output of the program above.", fa: "خروجی واقعی برنامه‌ی بالا." } },
    { list: { en: ["/ always gives a decimal result; // drops the fraction; % gives the remainder; ** is 'to the power of'.", "An f-string — a string with f in front — puts values straight into text: f\"{name} is {age}\". The :, adds thousands separators.", "Strings have built-in tools: .upper(), .lower(), .strip() (remove spaces at the ends), .replace(a, b), .split() and .startswith().", "in asks 'is this inside that?' and answers True or False."],
              fa: ["/ همیشه جواب اعشاری می‌دهد؛ // بخش اعشار را دور می‌ریزد؛ % باقی‌مانده را می‌دهد؛ ** یعنی «به توان».", "رشته‌ی f — رشته‌ای که جلویش f آمده — مقدارها را مستقیم داخل متن می‌گذارد: f\"{name} is {age}\". علامت :, جداکننده‌ی هزارگان اضافه می‌کند.", "رشته‌ها ابزار آماده دارند: .upper()، .lower()، .strip() (حذف فاصله‌های دو سر)، .replace(a, b)، .split() و .startswith().", "in می‌پرسد «این داخل آن هست؟» و True یا False جواب می‌دهد."] } },
    { h: { en: "Lists and dictionaries", fa: "لیست و دیکشنری" } },
    { p: { en: "A list keeps values in order and you reach them by position, counting from zero. A dictionary keeps values under names (keys), like a form with labelled fields. Together they can describe almost anything: a network is a list of devices, and each device is a dictionary.",
           fa: "لیست مقدارها را به ترتیب نگه می‌دارد و با شماره‌ی جایگاه (از صفر) به آن‌ها می‌رسی. دیکشنری مقدارها را زیر یک اسم (کلید) نگه می‌دارد، مثل فرمی با خانه‌های برچسب‌دار. این دو با هم تقریباً هر چیزی را توصیف می‌کنند: شبکه فهرستی از دستگاه‌هاست و هر دستگاه یک دیکشنری." } },
    { code: "ports = [22, 80, 443]\nports.append(3389)\nprint(ports, ports[0], ports[-1], ports[1:3])\n\ndevice = {\"name\": \"core-switch\", \"ip\": \"192.168.1.2\", \"up\": True}\ndevice[\"location\"] = \"server room\"\nfor key, value in device.items():\n    print(key, \"=\", value)", lang: "python" },
    { term: "$ python3 p2.py\n[22, 80, 443, 3389] 22 3389 [80, 443]\nname = core-switch\nip = 192.168.1.2\nup = True\nlocation = server room",
      cap: { en: "[0] is the first item, [-1] the last, and [1:3] a slice from position 1 up to (not including) 3.", fa: "[0] اولین عضو است، [-1] آخرین، و [1:3] برشی از جایگاه ۱ تا قبل از ۳." } },
    { h: { en: "while loops and functions with defaults", fa: "حلقه‌ی while و تابع با مقدار پیش‌فرض" } },
    { p: { en: "for repeats once for each item. while repeats as long as a condition stays true, so something inside the loop must eventually make it false — otherwise it never ends. A function can give its parameters default values, which are used when the caller leaves them out.",
           fa: "for برای هر عضو یک بار تکرار می‌کند. while تا وقتی شرط درست است تکرار می‌کند، پس چیزی داخل حلقه باید بالاخره شرط را نادرست کند — وگرنه هیچ‌وقت تمام نمی‌شود. تابع می‌تواند به پارامترهایش مقدار پیش‌فرض بدهد که وقتی صدازننده چیزی ندهد استفاده می‌شود." } },
    { code: "n = 3\nwhile n > 0:\n    print(\"retry in\", n)\n    n -= 1\nprint(\"go\")\n\ndef usable_hosts(prefix=24):\n    return 2 ** (32 - prefix) - 2\n\nprint(usable_hosts(), usable_hosts(26), usable_hosts(30))", lang: "python" },
    { term: "$ python3 p5.py\nretry in 3\nretry in 2\nretry in 1\ngo\n254 62 2", cap: { en: "The same formula from the IP lesson, now as a reusable function.", fa: "همان فرمول درس IP، حالا به شکل یک تابع قابل استفاده‌ی دوباره." } },
    { list: { en: ["break leaves a loop early; continue jumps to the next round.", "return hands a value back to the caller. A function without return gives back None.", "Variables created inside a function exist only inside it.", "Give functions verb names that say what they do: count_failed, is_open, send_report."],
              fa: ["break زودتر از حلقه خارج می‌شود و continue به دور بعد می‌پرد.", "return یک مقدار را به صدازننده برمی‌گرداند. تابع بدون return مقدار None می‌دهد.", "متغیری که داخل تابع ساخته می‌شود فقط همان‌جا وجود دارد.", "اسم تابع را فعلی بگذار که بگوید چه می‌کند: count_failed، is_open، send_report."] } },
    { h: { en: "When things go wrong: errors", fa: "وقتی کار خراب می‌شود: خطاها" } },
    { p: { en: "An error is not a failure; it is Python telling you exactly where it stopped. Read the last line first — it names the kind of error. If a problem is expected, such as a file that may not exist, catch it with try and except so the program can answer politely instead of crashing.",
           fa: "خطا شکست نیست؛ پایتون دارد دقیق می‌گوید کجا ایستاده. اول خط آخر را بخوان — نوع خطا را می‌گوید. اگر مشکلی قابل انتظار است، مثل فایلی که شاید نباشد، با try و except بگیرش تا برنامه به‌جای ازکارافتادن مؤدبانه جواب بدهد." } },
    { code: "try:\n    with open(\"missing.txt\") as f:\n        print(f.read())\nexcept FileNotFoundError:\n    print(\"That file does not exist — check the name.\")", lang: "python" },
    { table: { head: { en: ["Error", "What it means"], fa: ["خطا", "یعنی چه"] }, rows: [
      ["SyntaxError", { en: "The line is not valid Python: a missing colon, bracket or quote.", fa: "خط، پایتونِ درست نیست: دونقطه، پرانتز یا نقل‌قول جا افتاده." }],
      ["IndentationError", { en: "The spaces at the start of a line are wrong.", fa: "فاصله‌های اول خط اشتباه است." }],
      ["NameError", { en: "You used a name that was never defined — often a typing mistake.", fa: "از اسمی استفاده کرده‌ای که تعریف نشده — معمولاً غلط تایپی." }],
      ["TypeError", { en: "Two kinds of value were mixed, such as text + number.", fa: "دو نوع مقدار قاطی شده، مثل متن + عدد." }],
      ["IndexError / KeyError", { en: "You asked a list for a position, or a dictionary for a key, that is not there.", fa: "از لیست جایگاهی یا از دیکشنری کلیدی خواسته‌ای که وجود ندارد." }],
      ["FileNotFoundError", { en: "The path is wrong, or you are in a different folder than you think.", fa: "مسیر اشتباه است یا در پوشه‌ای غیر از آنچه فکر می‌کنی هستی." }]
    ] } },
    { h: { en: "Files and ready-made modules", fa: "فایل‌ها و ماژول‌های آماده" } },
    { p: { en: "with open(...) opens a file and closes it for you when the block ends. Mode \"r\" reads, \"w\" replaces the file and \"a\" adds to its end. Python also ships with hundreds of modules; you bring one in with import. Useful ones early on: math, random, datetime, os, json, csv and ipaddress.",
           fa: "with open(...) یک فایل را باز می‌کند و با تمام‌شدن بلوک خودش آن را می‌بندد. حالت \"r\" می‌خواند، \"w\" فایل را جایگزین می‌کند و \"a\" به انتهایش اضافه می‌کند. پایتون صدها ماژول آماده هم دارد که با import وارد می‌شوند. ماژول‌های مفید برای شروع: math، random، datetime، os، json، csv و ipaddress." } },
    { h: { en: "A small real project: who is attacking my server?", fa: "یک پروژه‌ی کوچک واقعی: چه کسی به سرورم حمله می‌کند؟" } },
    { p: { en: "Twelve lines are enough for something useful. This program reads a login log, keeps the lines with a failed password, takes the address at the end of each line and counts how often each address appears.",
           fa: "دوازده خط برای یک کار مفید کافی است. این برنامه یک لاگ ورود را می‌خواند، خط‌های رمز اشتباه را نگه می‌دارد، آدرسِ آخر هر خط را برمی‌دارد و می‌شمارد هر آدرس چند بار آمده." } },
    { code: "from collections import Counter\n\nfailed = Counter()\nwith open(\"logs/auth.log\") as f:\n    for line in f:\n        if \"Failed password\" in line:\n            ip = line.split()[-1]\n            failed[ip] += 1\n\nfor ip, n in failed.most_common():\n    print(f\"{ip:15} {n} failed login(s)\")", lang: "python" },
    { term: "$ python3 p3.py\n203.0.113.45    2 failed login(s)\n198.51.100.77   1 failed login(s)",
      cap: { en: "This is the idea behind the SSH Log Analyzer in the Tools section. Open its build tutorial to see how it grows into a full tool.", fa: "این همان ایده‌ی «تحلیل‌گر لاگ SSH» در بخش ابزارهاست. آموزش ساختش را باز کن تا ببینی چطور به یک ابزار کامل تبدیل می‌شود." } },
    { h: { en: "How to keep improving", fa: "چطور پیشرفت را ادامه بدهی" } },
    { list: { en: ["Type every example yourself; change one thing and predict the result before you run it.", "Solve a small problem of your own each week: rename files, read a CSV, check a list of addresses.", "When you are stuck, print the value you are unsure about — most bugs are a wrong guess about what a variable holds.", "Read other people's code: the six tools on this site are short and explained line by line."],
              fa: ["هر مثال را خودت تایپ کن؛ یک چیز را عوض کن و قبل از اجرا نتیجه را حدس بزن.", "هر هفته یک مسئله‌ی کوچک از خودت حل کن: تغییر نام فایل‌ها، خواندن یک CSV، بررسی فهرستی از آدرس‌ها.", "وقتی گیر کردی، مقداری را که مطمئن نیستی چاپ کن — بیشتر باگ‌ها حدس اشتباه درباره‌ی محتوای یک متغیرند.", "کد دیگران را بخوان: شش ابزار این سایت کوتاه‌اند و خط‌به‌خط توضیح داده شده‌اند."] } }
  ],

  "javascript-basics": [
    { h: { en: "Where JavaScript runs", fa: "جاوااسکریپت کجا اجرا می‌شود" } },
    { p: { en: "JavaScript is the only programming language every web browser understands, so it runs on the visitor's own device, not on the server. A page is made of three layers: HTML is the content, CSS is the look, and JavaScript is the behaviour. You attach a script to a page with a script tag, and you see its messages and errors in the browser console.",
           fa: "جاوااسکریپت تنها زبان برنامه‌نویسی است که همه‌ی مرورگرها می‌فهمند، پس روی دستگاه خود بازدیدکننده اجرا می‌شود، نه روی سرور. هر صفحه سه لایه دارد: HTML محتواست، CSS ظاهر است و جاوااسکریپت رفتار. اسکریپت را با تگ script به صفحه وصل می‌کنی و پیام‌ها و خطاهایش را در کنسول مرورگر می‌بینی." } },
    { code: "<!doctype html>\n<html>\n  <body>\n    <h1 id=\"title\">Hello</h1>\n    <button id=\"hello\">Click me</button>\n\n    <script src=\"app.js\"></script>   <!-- last, so the elements already exist -->\n  </body>\n</html>", lang: "html",
      cap: { en: "Save this as index.html, put your code in app.js next to it, and open the file in a browser. Or use the JavaScript and HTML tabs of the practice lab.", fa: "این را با نام index.html ذخیره کن، کدت را در app.js کنار آن بگذار و فایل را در مرورگر باز کن. یا از زبانه‌های جاوااسکریپت و HTML آزمایشگاه تمرین استفاده کن." } },
    { h: { en: "Types, and the traps between them", fa: "انواع مقدار و تله‌های بینشان" } },
    { code: "console.log(typeof \"hi\", typeof 42, typeof true, typeof undefined, typeof [1, 2], typeof null);\nconsole.log(\"5\" + 5, \"5\" * 5, Number(\"42\") + 1, 5 === \"5\", 5 == \"5\");", lang: "javascript" },
    { term: "$ node j1.js\nstring number boolean undefined object object\n55 25 43 false true",
      cap: { en: "\"5\" + 5 glues text together and gives \"55\", but \"5\" * 5 does arithmetic and gives 25.", fa: "\"5\" + 5 متن‌ها را به هم می‌چسباند و \"55\" می‌دهد، ولی \"5\" * 5 حساب می‌کند و ۲۵ می‌دهد." } },
    { list: { en: ["Everything typed into a form arrives as text. Convert it with Number(value) before you calculate.", "=== compares the value and the type. == converts first, which is how 5 == \"5\" becomes true. Use === always.", "undefined means 'no value was given'; null means 'deliberately empty'.", "Template strings use backticks and ${ }:  `Hello ${name}` ."],
              fa: ["هر چیزی که در فرم تایپ شود به شکل متن می‌رسد. قبل از حساب‌کردن با Number(value) تبدیلش کن.", "=== مقدار و نوع را مقایسه می‌کند. == اول تبدیل می‌کند و برای همین 5 == \"5\" درست می‌شود. همیشه === بنویس.", "undefined یعنی «مقداری داده نشده» و null یعنی «عمداً خالی».", "رشته‌ی قالبی با بک‌تیک و ${ } نوشته می‌شود:  `Hello ${name}` ."] } },
    { h: { en: "Decisions and loops", fa: "تصمیم و حلقه" } },
    { code: "const port = 443;\nif (port === 443) {\n  console.log(\"secure web\");\n} else if (port === 80) {\n  console.log(\"plain web\");\n} else {\n  console.log(\"something else\");\n}\n\nconst up = true, hasBackup = false;\nif (up && !hasBackup) console.log(\"working, but make a backup!\");\n\nfor (let i = 1; i <= 3; i++) console.log(\"round\", i);", lang: "javascript",
      cap: { en: "&& means and, || means or, ! means not.", fa: "&& یعنی «و»، || یعنی «یا» و ! یعنی «نه»." } },
    { h: { en: "Arrays: the tools you will use every day", fa: "آرایه: ابزارهایی که هر روز استفاده می‌کنی" } },
    { code: "const ports = [22, 80, 443, 3389];\nconsole.log(ports.map((p) => p + 1));\nconsole.log(ports.filter((p) => p < 1024));\nconsole.log(ports.find((p) => p > 100), ports.includes(80), ports.join(\" · \"));", lang: "javascript" },
    { term: "$ node j1.js\n[ 23, 81, 444, 3390 ]\n[ 22, 80, 443 ]\n443 true 22 · 80 · 443 · 3389",
      cap: { en: "map changes every item, filter keeps some, find returns the first match.", fa: "map همه‌ی عضوها را تغییر می‌دهد، filter بعضی را نگه می‌دارد و find اولین مورد جور را برمی‌گرداند." } },
    { p: { en: "The short form  (p) => p + 1  is an arrow function: it takes p and gives back p + 1. It is the same as writing function (p) { return p + 1; }. Other everyday tools: push adds to the end, pop removes the last item, length counts, sort orders, and forEach runs something for each item.",
           fa: "شکل کوتاه  (p) => p + 1  یک «تابع پیکانی» است: p را می‌گیرد و p + 1 را برمی‌گرداند. همان function (p) { return p + 1; } است. ابزارهای روزمره‌ی دیگر: push به انتها اضافه می‌کند، pop آخری را برمی‌دارد، length می‌شمارد، sort مرتب می‌کند و forEach برای هر عضو کاری انجام می‌دهد." } },
    { h: { en: "Objects and JSON", fa: "شیء و JSON" } },
    { code: "const device = { name: \"router\", ip: \"192.168.1.1\" };\ndevice.up = true;\nconsole.log(device.name, Object.keys(device));\nconsole.log(JSON.stringify(device));", lang: "javascript" },
    { term: "$ node j1.js\nrouter [ 'name', 'ip', 'up' ]\n{\"name\":\"router\",\"ip\":\"192.168.1.1\",\"up\":true}",
      cap: { en: "JSON is an object written as text. It is how programs and servers send data to each other.", fa: "JSON همان شیء است که به شکل متن نوشته شده. برنامه‌ها و سرورها داده را این‌طور برای هم می‌فرستند." } },
    { p: { en: "JSON.stringify turns an object into text and JSON.parse turns the text back into an object. With these two you can save data in the browser:  localStorage.setItem(\"device\", JSON.stringify(device))  keeps it even after the page is closed, and  JSON.parse(localStorage.getItem(\"device\"))  brings it back.",
           fa: "JSON.stringify شیء را به متن و JSON.parse متن را دوباره به شیء تبدیل می‌کند. با همین دو می‌توانی داده را در مرورگر ذخیره کنی:  localStorage.setItem(\"device\", JSON.stringify(device))  حتی بعد از بستن صفحه نگهش می‌دارد و  JSON.parse(localStorage.getItem(\"device\"))  آن را برمی‌گرداند." } },
    { h: { en: "Changing the page: the DOM", fa: "تغییر صفحه: DOM" } },
    { p: { en: "When the browser reads HTML it builds a tree of objects called the DOM. JavaScript can find any element in that tree and change it; the page updates at once.",
           fa: "مرورگر وقتی HTML را می‌خواند درختی از شیءها به اسم DOM می‌سازد. جاوااسکریپت می‌تواند هر عنصر این درخت را پیدا کند و تغییر بدهد و صفحه همان لحظه به‌روز می‌شود." } },
    { code: "const title = document.querySelector(\"#title\");   // by id\ntitle.textContent = \"Network status\";              // change the text\ntitle.classList.add(\"online\");                     // add a CSS class\ntitle.style.color = \"teal\";                        // or style it directly\n\nconst item = document.createElement(\"li\");         // make a new element\nitem.textContent = \"router — online\";\ndocument.querySelector(\"#list\").appendChild(item);\n\ndocument.querySelectorAll(\"li\").forEach((li) => console.log(li.textContent));", lang: "javascript",
      cap: { en: "querySelector uses the same selectors as CSS: #id, .class and tag.", fa: "querySelector همان انتخاب‌گرهای CSS را می‌گیرد: #id، .class و نام تگ." } },
    { note: { en: "Use textContent for anything a visitor typed. innerHTML treats text as HTML, so a visitor could type a script into your page — the attack called XSS.", fa: "برای هر چیزی که بازدیدکننده تایپ کرده از textContent استفاده کن. innerHTML متن را HTML حساب می‌کند و بازدیدکننده می‌تواند اسکریپت وارد صفحه‌ات کند — حمله‌ای که XSS نام دارد." }, kind: "warn" },
    { h: { en: "Events and forms", fa: "رویدادها و فرم‌ها" } },
    { code: "const form = document.querySelector(\"#add-form\");\nconst input = document.querySelector(\"#device-name\");\n\nform.addEventListener(\"submit\", (event) => {\n  event.preventDefault();              // don't reload the page\n  const name = input.value.trim();\n  if (name === \"\") return;             // ignore empty input\n  console.log(\"adding\", name);\n  input.value = \"\";\n});", lang: "javascript",
      cap: { en: "The common events: click, submit, input (every key press), change and keydown.", fa: "رویدادهای رایج: click، submit، input (هر بار فشردن کلید)، change و keydown." } },
    { h: { en: "A complete mini project: a device list", fa: "یک پروژه‌ی کوچک کامل: فهرست دستگاه‌ها" } },
    { p: { en: "This single file brings everything together: an array of objects, a function that draws the page from that array, a form that adds to it, a click that changes an item, and localStorage so the list is still there tomorrow. Paste it into the HTML tab of the practice lab and try it.",
           fa: "این یک فایل همه‌چیز را کنار هم می‌گذارد: آرایه‌ای از شیءها، تابعی که صفحه را از روی آن آرایه می‌کشد، فرمی که به آن اضافه می‌کند، کلیکی که یک مورد را تغییر می‌دهد و localStorage تا فهرست فردا هم سر جایش باشد. در زبانه‌ی HTML آزمایشگاه تمرین بچسبان و امتحانش کن." } },
    { code: "<form id=\"f\"><input id=\"n\" placeholder=\"Device name\"><button>Add</button></form>\n<ul id=\"list\"></ul>\n<p id=\"sum\"></p>\n\n<script>\n  let devices = JSON.parse(localStorage.getItem(\"devices\") || \"[]\");\n\n  function draw() {\n    const list = document.querySelector(\"#list\");\n    list.textContent = \"\";\n    devices.forEach((d, i) => {\n      const li = document.createElement(\"li\");\n      li.textContent = d.name + (d.up ? \" — online\" : \" — OFFLINE\");\n      li.style.color = d.up ? \"green\" : \"crimson\";\n      li.addEventListener(\"click\", () => { devices[i].up = !d.up; save(); });\n      list.appendChild(li);\n    });\n    const down = devices.filter((d) => !d.up).length;\n    document.querySelector(\"#sum\").textContent = devices.length + \" devices, \" + down + \" down\";\n  }\n  function save() {\n    localStorage.setItem(\"devices\", JSON.stringify(devices));\n    draw();\n  }\n  document.querySelector(\"#f\").addEventListener(\"submit\", (e) => {\n    e.preventDefault();\n    const name = document.querySelector(\"#n\").value.trim();\n    if (!name) return;\n    devices.push({ name: name, up: true });\n    document.querySelector(\"#n\").value = \"\";\n    save();\n  });\n  draw();\n</script>", lang: "html",
      cap: { en: "Click a device to switch it between online and offline. The pattern — keep the data in one array, redraw the page from it — is how large web applications work too.", fa: "روی هر دستگاه کلیک کن تا بین آنلاین و آفلاین جابه‌جا شود. این الگو — داده را در یک آرایه نگه دار و صفحه را از روی آن دوباره بکش — روش کار برنامه‌های بزرگ وب هم هست." } },
    { h: { en: "Finding your own bugs", fa: "پیداکردن باگ‌های خودت" } },
    { list: { en: ["Open the console (F12) first. A red line names the file and line number of the problem.", "console.log the value you are unsure about, just before the line that fails.", "'Cannot read properties of null' means querySelector found nothing: check the id and where the script tag is.", "'x is not defined' is nearly always a spelling mistake or a variable used outside the block it was made in.", "Change one thing at a time, and reload."],
              fa: ["اول کنسول را باز کن (F12). خط قرمز اسم فایل و شماره‌ی خطِ مشکل را می‌گوید.", "مقداری را که مطمئن نیستی، درست قبل از خطی که خطا می‌دهد console.log کن.", "«Cannot read properties of null» یعنی querySelector چیزی پیدا نکرده: id و جای تگ script را بررسی کن.", "«x is not defined» تقریباً همیشه غلط املایی است یا متغیری که بیرون از بلوک خودش استفاده شده.", "هر بار فقط یک چیز را عوض کن و صفحه را تازه کن."] } }
  ],

  "bash-scripting": [
    { h: { en: "When is a script worth writing?", fa: "چه وقت نوشتن اسکریپت می‌ارزد؟" } },
    { p: { en: "A simple rule: the third time you type the same group of commands, put them in a file. A script does the job the same way every time, at three in the morning, without forgetting a step. Typical first scripts are backups, clean-ups, health checks and installing the same software on several machines. For heavy text processing or anything longer than about a hundred lines, Python is usually the better tool.",
           fa: "یک قاعده‌ی ساده: بار سومی که همان مجموعه دستور را تایپ می‌کنی، آن را در یک فایل بگذار. اسکریپت کار را هر بار یک‌جور انجام می‌دهد، ساعت سه صبح، بدون جاانداختن یک قدم. اولین اسکریپت‌ها معمولاً پشتیبان‌گیری، پاک‌سازی، بررسی سلامت و نصب یک نرم‌افزار روی چند دستگاه است. برای پردازش سنگین متن یا هر چیزی بلندتر از حدود صد خط، پایتون معمولاً ابزار بهتری است." } },
    { h: { en: "Arguments and questions", fa: "آرگومان و پرسش" } },
    { p: { en: "A script becomes reusable when it takes its values from outside. The words typed after the script's name arrive as $1, $2 and so on; $# is how many there are, $@ is all of them, and $0 is the script's own name. read asks the person a question while the script runs.",
           fa: "اسکریپت وقتی قابل استفاده‌ی دوباره می‌شود که مقدارهایش را از بیرون بگیرد. کلمه‌هایی که بعد از اسم اسکریپت تایپ می‌شوند به شکل $1، $2 و … می‌رسند؛ $# تعدادشان است، $@ همه‌ی آن‌هاست و $0 اسم خود اسکریپت. read موقع اجرا از کاربر سؤال می‌پرسد." } },
    { code: "#!/bin/bash\ngreet() {\n  echo \"Hello, $1! You gave me $# name(s).\"\n}\nif [ $# -eq 0 ]; then\n  echo \"usage: ./greet.sh NAME\"\n  exit 1\nfi\ngreet \"$@\"", lang: "bash" },
    { term: "$ ./greet.sh\nusage: ./greet.sh NAME\n$ ./greet.sh Sara\nHello, Sara! You gave me 1 name(s).",
      cap: { en: "Run without a name, the script explains how to use it and stops with exit code 1. Inside a function, $1 is the function's own first argument.", fa: "بدون اسم که اجرا شود، اسکریپت روش استفاده را می‌گوید و با کد خروج ۱ می‌ایستد. داخل تابع، $1 اولین آرگومان خود تابع است." } },
    { code: "read -p \"Which folder should I back up? \" folder\nread -s -p \"Password: \" pass     # -s hides what is typed\necho\necho \"Backing up $folder ...\"", lang: "bash" },
    { h: { en: "Tests: asking yes-or-no questions", fa: "آزمون: پرسیدن سؤال بله یا نه" } },
    { p: { en: "The square brackets are a command that answers yes or no. They need a space after [ and before ], and they have their own words for comparing.",
           fa: "کروشه‌ها خودشان یک دستورند که بله یا نه جواب می‌دهد. بعد از [ و قبل از ] فاصله لازم دارند و برای مقایسه کلمه‌های مخصوص خودشان را دارند." } },
    { table: { head: { en: ["Test", "True when"], fa: ["آزمون", "چه وقت درست است"] }, rows: [
      ["[ -f file ]", { en: "the file exists", fa: "فایل وجود دارد" }],
      ["[ -d dir ]", { en: "the folder exists", fa: "پوشه وجود دارد" }],
      ["[ -s file ]", { en: "the file exists and is not empty", fa: "فایل وجود دارد و خالی نیست" }],
      ["[ -z \"$a\" ]", { en: "the text is empty", fa: "متن خالی است" }],
      ["[ \"$a\" = \"$b\" ]", { en: "two texts are the same", fa: "دو متن یکی هستند" }],
      ["[ \"$n\" -eq 5 ]", { en: "numbers are equal (-ne not equal)", fa: "دو عدد برابرند (-ne نابرابر)" }],
      ["[ \"$n\" -gt 5 ]", { en: "greater than (-ge at least, -lt less than, -le at most)", fa: "بزرگ‌تر (-ge حداقل، -lt کوچک‌تر، -le حداکثر)" }],
      ["[ ! -f file ]", { en: "! turns any test around", fa: "علامت ! هر آزمون را برعکس می‌کند" }]
    ] } },
    { term: "$ [ -f notes/todo.txt ] && echo \"file exists\"\nfile exists\n$ [ -d backups ] || echo \"no backups folder yet\"\nno backups folder yet",
      cap: { en: "&& runs the second command only if the first succeeded; || runs it only if the first failed.", fa: "&& دستور دوم را فقط وقتی اجرا می‌کند که اولی موفق باشد و || فقط وقتی که اولی ناموفق باشد." } },
    { h: { en: "Exit codes: how commands report success", fa: "کد خروج: دستورها چطور نتیجه را گزارش می‌کنند" } },
    { p: { en: "Every command ends with a number that you do not normally see. Zero means it worked; anything else means it did not. The special variable $? holds the code of the last command: after  ls notes  it is 0, and after  ls nofile  it is 2. if does not look at what a command printed — it looks at this number. Your own scripts should follow the same rule: exit 0 when all went well and exit 1 (or another number) when something failed, so other scripts and schedulers can tell.",
           fa: "هر دستور با عددی تمام می‌شود که معمولاً نمی‌بینی. صفر یعنی کار انجام شد و هر عدد دیگر یعنی نشد. متغیر ویژه‌ی $? کد آخرین دستور را دارد: بعد از  ls notes  صفر است و بعد از  ls nofile  برابر ۲. دستور if به چیزی که چاپ شده نگاه نمی‌کند — به همین عدد نگاه می‌کند. اسکریپت‌های خودت هم باید همین قاعده را رعایت کنند: اگر همه‌چیز خوب بود exit 0 و اگر چیزی خراب شد exit 1 (یا عدد دیگر)، تا اسکریپت‌ها و زمان‌بندهای دیگر بفهمند." } },
    { h: { en: "Loops over files and over lines", fa: "حلقه روی فایل‌ها و روی خط‌ها" } },
    { term: "$ for f in notes/*.txt logs/*.log; do echo \"$f has $(wc -l < \"$f\") lines\"; done\nnotes/todo.txt has 7 lines\nlogs/auth.log has 5 lines",
      cap: { en: "for walks through a list of files. $( ) runs a command and puts its answer into the sentence.", fa: "for روی فهرستی از فایل‌ها حرکت می‌کند. $( ) یک دستور را اجرا می‌کند و جوابش را داخل جمله می‌گذارد." } },
    { code: "#!/bin/bash\n# count.sh — how many failed logins came from each address\nwhile read -r line; do\n  case \"$line\" in\n    *\"Failed password\"*) echo \"${line##* from }\" ;;\n  esac\ndone < logs/auth.log | sort | uniq -c | sort -rn", lang: "bash" },
    { term: "$ ./count.sh\n      2 203.0.113.45\n      1 198.51.100.77",
      cap: { en: "while read takes a file one line at a time. ${line##* from } cuts everything up to the word 'from', leaving the address. sort | uniq -c counts repeated lines.", fa: "while read فایل را خط‌به‌خط می‌خواند. ${line##* from } همه‌چیز تا کلمه‌ی from را می‌بُرد و آدرس را باقی می‌گذارد. sort | uniq -c خط‌های تکراری را می‌شمارد." } },
    { h: { en: "Scripts that fail safely", fa: "اسکریپتی که ایمن خطا می‌دهد" } },
    { p: { en: "By default Bash carries on after an error, which can be dangerous: if cd fails, the next rm runs in the wrong folder. Three settings at the top of a script change that.",
           fa: "Bash به‌طور پیش‌فرض بعد از خطا ادامه می‌دهد و این می‌تواند خطرناک باشد: اگر cd خطا بدهد، rm بعدی در پوشه‌ی اشتباه اجرا می‌شود. سه تنظیم در ابتدای اسکریپت این را عوض می‌کند." } },
    { code: "#!/bin/bash\nset -euo pipefail\n# -e          stop at the first command that fails\n# -u          stop if a variable was never set (catches typing mistakes)\n# -o pipefail a pipe fails if any command in it fails\n\nsrc=\"/var/www/site\"\ndest=\"/backup/$(date +%F)\"\n\ncd \"$src\"                      # if this fails, the script stops here\nmkdir -p \"$dest\"\ntar -czf \"$dest/site.tar.gz\" .\necho \"$(date '+%F %T') backup OK\" >> /var/log/backup.log", lang: "bash",
      cap: { en: "The last line writes one line to a log each time, with the date. Scripts that run unattended should always leave a trace.", fa: "خط آخر هر بار یک خط با تاریخ در لاگ می‌نویسد. اسکریپتی که بدون نظارت اجرا می‌شود باید همیشه ردی از خودش بگذارد." } },
    { term: "$ bash -x greet.sh Ali 2>&1 | head -4\n+ '[' 1 -eq 0 ']'\n+ greet Ali\n+ echo 'Hello, Ali! You gave me 1 name(s).'\nHello, Ali! You gave me 1 name(s).",
      cap: { en: "bash -x prints each line, with its values filled in, just before running it. It is the fastest way to see where a script goes wrong.", fa: "bash -x هر خط را با مقدارهای واقعی‌اش درست قبل از اجرا چاپ می‌کند. سریع‌ترین راه برای دیدن اینکه اسکریپت کجا اشتباه می‌رود." } },
    { h: { en: "Running a script on a schedule: cron", fa: "اجرای زمان‌بندی‌شده: cron" } },
    { p: { en: "cron runs commands at fixed times. Type  crontab -e  and add one line per job. The line starts with five fields — minute, hour, day of the month, month, day of the week — and a star means 'every'.",
           fa: "cron دستورها را در زمان‌های مشخص اجرا می‌کند. بنویس  crontab -e  و برای هر کار یک خط اضافه کن. خط با پنج بخش شروع می‌شود — دقیقه، ساعت، روز ماه، ماه، روز هفته — و ستاره یعنی «هر»." } },
    { code: "# m   h   dom mon dow   command\n  0   2   *   *   *     /home/sara/backup.sh          # every night at 02:00\n  */5 *   *   *   *     /home/sara/check.sh           # every 5 minutes\n  30  8   *   *   6     /home/sara/weekly-report.sh   # Saturdays at 08:30", lang: "bash",
      cap: { en: "Always use full paths inside cron: it does not start in your home folder and knows very little about your settings.", fa: "در cron همیشه مسیر کامل بنویس: از پوشه‌ی خانه‌ات شروع نمی‌کند و از تنظیمات تو تقریباً چیزی نمی‌داند." } },
    { h: { en: "A complete script: warn me before the disk fills", fa: "یک اسکریپت کامل: قبل از پرشدن دیسک خبرم کن" } },
    { code: "#!/bin/bash\n# check.sh — report folders that are getting full\nlimit=80\ndf -h --output=pcent,target | tail -n +2 | while read used mount; do\n  n=${used%\\%}\n  if [ \"$n\" -ge \"$limit\" ]; then\n    echo \"WARNING: $mount is $used full\"\n  fi\ndone\necho \"checked at $(date +%H:%M)\"", lang: "bash",
      cap: { en: "df prints the used percentage and the mount point of every disk; tail drops the header line; ${used%\\%} removes the % sign so the number can be compared. Run it every five minutes with cron and send the output to yourself.", fa: "df درصد استفاده و محل اتصال هر دیسک را چاپ می‌کند؛ tail خط عنوان را برمی‌دارد؛ ${used%\\%} علامت ٪ را حذف می‌کند تا عدد قابل مقایسه شود. با cron هر پنج دقیقه اجرایش کن و خروجی را برای خودت بفرست." } },
    { h: { en: "A checklist for every script", fa: "فهرست بررسی برای هر اسکریپت" } },
    { list: { en: ["First line #!/bin/bash, second line a comment that says what the script does.", "set -euo pipefail near the top.", "Every variable in double quotes.", "Check the arguments and print a usage line when they are missing.", "Test with harmless values first — echo the rm command before you let it run.", "Log what was done, with the date.", "Never write a password inside a script; read it from a protected file (chmod 600)."],
              fa: ["خط اول #!/bin/bash و خط دوم توضیحی که بگوید اسکریپت چه می‌کند.", "نزدیک ابتدای فایل set -euo pipefail.", "همه‌ی متغیرها داخل نقل‌قول دوتایی.", "آرگومان‌ها را بررسی کن و اگر نبودند یک خط راهنما چاپ کن.", "اول با مقدارهای بی‌خطر آزمایش کن — قبل از اجرای واقعی rm، آن را با echo چاپ کن.", "هر کاری را که انجام شد با تاریخ در لاگ بنویس.", "هیچ‌وقت رمز را داخل اسکریپت ننویس؛ از یک فایل محافظت‌شده (chmod 600) بخوانش."] } }
  ]
});

Object.assign(window.LEARN.extra, {
  "what-is-ip": [
    { h: { en: "Two addresses on every device", fa: "دو آدرس روی هر دستگاه" } },
    { p: { en: "Every network card has two addresses, and beginners often mix them up. The MAC address is burned in at the factory, looks like 00:1A:2B:3C:4D:5E and only matters inside the local network — it is how a switch delivers a frame to the right socket. The IP address is given by the network you join, changes when you move to another network, and is what lets data travel between networks across the world. A useful picture: the MAC address is your name, the IP address is your postal address. Your name stays the same; your address changes when you move.",
           fa: "هر کارت شبکه دو آدرس دارد و تازه‌کارها اغلب این دو را قاطی می‌کنند. آدرس MAC در کارخانه روی کارت ثبت می‌شود، شکلی مثل 00:1A:2B:3C:4D:5E دارد و فقط داخل شبکه‌ی محلی مهم است — سوئیچ با آن فریم را به پورت درست می‌رساند. آدرس IP را شبکه‌ای که به آن وصل می‌شوی می‌دهد، با رفتن به شبکه‌ی دیگر عوض می‌شود و همان چیزی است که اجازه می‌دهد داده بین شبکه‌ها در سراسر دنیا سفر کند. یک تصویر مفید: آدرس MAC اسم توست و آدرس IP نشانی پستی‌ات. اسمت ثابت می‌ماند؛ نشانی‌ات با اسباب‌کشی عوض می‌شود." } },
    { h: { en: "The address in binary", fa: "آدرس به زبان صفر و یک" } },
    { p: { en: "To a computer an IPv4 address is 32 switches, each on or off. We write it as four numbers only because that is easier to read. Each of the four parts (called octets) is 8 bits, and the bits are worth 128, 64, 32, 16, 8, 4, 2 and 1. To turn a number into bits, subtract these values from left to right: 192 is 128 + 64, so it is 11000000.",
           fa: "برای کامپیوتر، آدرس IPv4 یعنی ۳۲ کلید که هر کدام روشن یا خاموش است. ما آن را چهار عدد می‌نویسیم چون خواندنش ساده‌تر است. هر یک از چهار بخش (اکتت) ۸ بیت است و ارزش بیت‌ها ۱۲۸، ۶۴، ۳۲، ۱۶، ۸، ۴، ۲ و ۱ است. برای تبدیل یک عدد به بیت، این مقدارها را از چپ به راست کم کن: ۱۹۲ یعنی ۱۲۸ + ۶۴، پس می‌شود 11000000." } },
    { term: "$ python3 -c \"print('.'.join(f'{int(x):08b}' for x in '192.168.1.24'.split('.')))\"\n11000000.10101000.00000001.00011000",
      cap: { en: "192.168.1.24 as the computer sees it.", fa: "192.168.1.24 آن‌طور که کامپیوتر می‌بیند." } },
    { h: { en: "The subnet mask", fa: "ماسک زیرشبکه" } },
    { p: { en: "The mask marks the border between the network part and the device part. It is a row of ones followed by zeros: /24 means 24 ones, which written as four numbers is 255.255.255.0. Two devices are on the same network when their addresses are identical in every position where the mask has a one. That single comparison decides whether a device talks to its neighbour directly or hands the data to the gateway.",
           fa: "ماسک مرز بین بخش شبکه و بخش دستگاه را مشخص می‌کند. ردیفی از یک‌هاست که بعدش صفر می‌آید: /24 یعنی ۲۴ تا یک، که به شکل چهار عدد می‌شود 255.255.255.0. دو دستگاه وقتی در یک شبکه‌اند که آدرسشان در همه‌ی جایگاه‌هایی که ماسک «یک» دارد یکسان باشد. همین یک مقایسه تعیین می‌کند دستگاه مستقیم با همسایه‌اش حرف بزند یا داده را به گیت‌وی بدهد." } },
    { table: { head: { en: ["Prefix", "Mask", "Usable devices", "Good for"], fa: ["پیشوند", "ماسک", "دستگاه قابل استفاده", "مناسب برای"] }, rows: [
      ["/24", "255.255.255.0", "254", { en: "A home or one office floor", fa: "خانه یا یک طبقه‌ی اداری" }],
      ["/25", "255.255.255.128", "126", { en: "Half of a /24", fa: "نصف یک /24" }],
      ["/26", "255.255.255.192", "62", { en: "A department", fa: "یک بخش" }],
      ["/27", "255.255.255.224", "30", { en: "A small team or the cameras", fa: "یک تیم کوچک یا دوربین‌ها" }],
      ["/28", "255.255.255.240", "14", { en: "Servers", fa: "سرورها" }],
      ["/29", "255.255.255.248", "6", { en: "A handful of devices", fa: "چند دستگاه" }],
      ["/30", "255.255.255.252", "2", { en: "A link between two routers", fa: "اتصال بین دو روتر" }]
    ] } },
    { h: { en: "Subnetting, worked by hand", fa: "زیرشبکه‌بندی، حل دستی" } },
    { p: { en: "Question: for 192.168.10.0/26, find the mask, the size, the network address, the first and last usable address and the broadcast address. The method never changes.",
           fa: "سؤال: برای 192.168.10.0/26 ماسک، اندازه، آدرس شبکه، اولین و آخرین آدرس قابل استفاده و آدرس Broadcast را پیدا کن. روش همیشه یکی است." } },
    { list: { en: ["Device bits: 32 − 26 = 6.", "Block size: 2⁶ = 64 addresses. The blocks therefore start at .0, .64, .128 and .192.", "Mask: 256 − 64 = 192, so 255.255.255.192.", "Network address: the first address of the block — 192.168.10.0.", "Broadcast: the last address of the block — 192.168.10.63.", "Usable: everything between them — 192.168.10.1 to 192.168.10.62, which is 62 devices.", "Where does 192.168.10.100 belong? It falls in the block that starts at .64, so its network is 192.168.10.64/26 and its broadcast is .127."],
              fa: ["بیت‌های دستگاه: ۳۲ − ۲۶ = ۶.", "اندازه‌ی بلوک: ۲ به توان ۶ = ۶۴ آدرس. پس بلوک‌ها از ‎.0، ‎.64، ‎.128 و ‎.192 شروع می‌شوند.", "ماسک: ۲۵۶ − ۶۴ = ۱۹۲، یعنی 255.255.255.192.", "آدرس شبکه: اولین آدرس بلوک — 192.168.10.0.", "Broadcast: آخرین آدرس بلوک — 192.168.10.63.", "قابل استفاده: هر چه بین این دو است — 192.168.10.1 تا 192.168.10.62، یعنی ۶۲ دستگاه.", "آدرس 192.168.10.100 مال کجاست؟ در بلوکی می‌افتد که از ‎.64 شروع می‌شود، پس شبکه‌اش 192.168.10.64/26 و Broadcast آن ‎.127 است."] } },
    { term: "$ python3 -c \"import ipaddress as i; n=i.ip_network('192.168.10.0/26'); print(n.netmask, n.network_address, n.broadcast_address, n.num_addresses-2)\"\n255.255.255.192 192.168.10.0 192.168.10.63 62",
      cap: { en: "Check your hand calculation with Python's ipaddress module — or with the Subnet Calculator in the Tools section.", fa: "حساب دستی‌ات را با ماژول ipaddress پایتون — یا با «ماشین‌حساب زیرشبکه» در بخش ابزارها — بسنج." } },
    { h: { en: "How an address is handed out: DHCP", fa: "آدرس چطور داده می‌شود: DHCP" } },
    { p: { en: "When your phone joins a Wi-Fi network it has no address, so it shouts to everyone: 'is there a DHCP server?' The exchange has four steps, remembered as DORA: Discover (the device asks), Offer (the server proposes an address), Request (the device accepts it) and Acknowledge (the server confirms). Along with the address the server sends the mask, the gateway, the DNS servers and a lease time, after which the address must be renewed. If a Windows computer shows an address that starts with 169.254, DHCP did not answer — check the cable, the Wi-Fi and the router.",
           fa: "وقتی گوشی‌ات به یک وای‌فای وصل می‌شود آدرسی ندارد، پس خطاب به همه فریاد می‌زند: «سرور DHCP اینجا هست؟» این گفتگو چهار قدم دارد که با DORA به خاطر سپرده می‌شود: Discover (دستگاه می‌پرسد)، Offer (سرور یک آدرس پیشنهاد می‌دهد)، Request (دستگاه قبول می‌کند) و Acknowledge (سرور تأیید می‌کند). سرور همراه آدرس، ماسک، گیت‌وی، سرورهای DNS و یک مدت اجاره هم می‌فرستد که بعد از آن آدرس باید تمدید شود. اگر کامپیوتر ویندوزی آدرسی نشان داد که با 169.254 شروع می‌شود، DHCP جواب نداده — کابل، وای‌فای و روتر را بررسی کن." } },
    { h: { en: "One address for the whole house: NAT", fa: "یک آدرس برای کل خانه: NAT" } },
    { p: { en: "There are not enough IPv4 addresses for every device on earth, so homes and offices use private addresses inside and share one public address outside. The router does the translation, called NAT: when your laptop (192.168.1.24) asks for a web page, the router replaces the private address with its own public one, remembers who asked, and passes the answer back. This is also why nobody on the internet can start a connection to your laptop unless you deliberately open a port on the router (port forwarding).",
           fa: "آدرس IPv4 به تعداد همه‌ی دستگاه‌های دنیا وجود ندارد، پس خانه‌ها و اداره‌ها داخل شبکه از آدرس خصوصی استفاده می‌کنند و بیرون یک آدرس عمومی را شریک می‌شوند. روتر این ترجمه را انجام می‌دهد که NAT نام دارد: وقتی لپ‌تاپت (192.168.1.24) صفحه‌ای را می‌خواهد، روتر آدرس خصوصی را با آدرس عمومی خودش عوض می‌کند، یادش می‌ماند چه کسی پرسیده و جواب را برمی‌گرداند. به همین دلیل هم کسی از اینترنت نمی‌تواند به لپ‌تاپ تو وصل شود، مگر اینکه خودت عمداً یک پورت را روی روتر باز کنی (Port Forwarding)." } },
    { h: { en: "What happens when you open a website", fa: "وقتی یک سایت را باز می‌کنی چه می‌شود" } },
    { list: { en: ["You type a name. The computer asks its DNS server: what is the address of this name?", "It compares the answer with its own address and mask. The site is on another network, so the data must go to the gateway.", "It finds the gateway's MAC address (with a protocol called ARP) and sends the packet to the router.", "The router replaces the private source address with its public one (NAT) and passes the packet to the internet provider.", "Routers across the internet pass it on, hop by hop, each choosing the best next step.", "The server answers, and the reply travels back the same way to your browser."],
              fa: ["یک اسم تایپ می‌کنی. کامپیوتر از سرور DNS می‌پرسد: آدرس این اسم چیست؟", "جواب را با آدرس و ماسک خودش مقایسه می‌کند. سایت در شبکه‌ی دیگری است، پس داده باید به گیت‌وی برود.", "آدرس MAC گیت‌وی را (با پروتکلی به اسم ARP) پیدا می‌کند و بسته را به روتر می‌فرستد.", "روتر آدرس خصوصی مبدأ را با آدرس عمومی خودش عوض می‌کند (NAT) و بسته را به شرکت اینترنت می‌دهد.", "روترهای اینترنت بسته را قدم‌به‌قدم جلو می‌برند و هر کدام بهترین قدم بعدی را انتخاب می‌کند.", "سرور جواب می‌دهد و پاسخ از همان مسیر به مرورگرت برمی‌گردد."] } },
    { h: { en: "Ports: which program is the data for?", fa: "پورت: داده برای کدام برنامه است؟" } },
    { p: { en: "The IP address brings data to the right machine; the port number brings it to the right program on that machine. One server can run a website, email and remote access at the same time because each listens on its own port.",
           fa: "آدرس IP داده را به دستگاه درست می‌رساند و شماره‌ی پورت آن را به برنامه‌ی درست روی آن دستگاه. یک سرور می‌تواند هم‌زمان وب‌سایت، ایمیل و دسترسی از راه دور داشته باشد چون هر کدام روی پورت خودش گوش می‌دهد." } },
    { table: { head: { en: ["Port", "Service", "Note"], fa: ["پورت", "سرویس", "نکته"] }, rows: [
      ["22", "SSH", { en: "Secure remote terminal", fa: "ترمینال امن از راه دور" }],
      ["23", "Telnet", { en: "Old and unencrypted — turn it off", fa: "قدیمی و بدون رمزنگاری — خاموشش کن" }],
      ["53", "DNS", { en: "Names to addresses", fa: "تبدیل اسم به آدرس" }],
      ["67 / 68", "DHCP", { en: "Automatic addresses", fa: "آدرس‌دهی خودکار" }],
      ["80", "HTTP", { en: "Web without encryption", fa: "وب بدون رمزنگاری" }],
      ["443", "HTTPS", { en: "Encrypted web", fa: "وب رمزنگاری‌شده" }],
      ["3389", "RDP", { en: "Windows remote desktop — never open it to the internet", fa: "ریموت دسکتاپ ویندوز — هیچ‌وقت رو به اینترنت بازش نکن" }]
    ] } },
    { h: { en: "A short word on IPv6", fa: "چند کلمه درباره‌ی IPv6" } },
    { p: { en: "IPv6 was designed because IPv4 addresses ran out. An IPv6 address has 128 bits and is written in hexadecimal, such as 2001:db8:85a3::8a2e:370:7334; two colons in a row stand for a run of zeros. There are enough addresses for every device to have a public one, so NAT is not needed. The ideas you learned here — network part, device part, prefix, gateway, DNS — are exactly the same.",
           fa: "IPv6 به این دلیل طراحی شد که آدرس‌های IPv4 تمام شدند. آدرس IPv6 یکصد و بیست‌وهشت بیت است و به شکل هگزادسیمال نوشته می‌شود، مثل 2001:db8:85a3::8a2e:370:7334؛ دو تا دونقطه‌ی پشت‌سرهم به‌جای ردیفی از صفرها می‌آید. آن‌قدر آدرس هست که هر دستگاه یک آدرس عمومی داشته باشد، پس NAT لازم نیست. مفاهیمی که اینجا یاد گرفتی — بخش شبکه، بخش دستگاه، پیشوند، گیت‌وی و DNS — دقیقاً همان است." } },
    { h: { en: "Troubleshooting in a fixed order", fa: "عیب‌یابی با ترتیب ثابت" } },
    { p: { en: "When 'the internet is down', do not guess. Test from near to far, and the first test that fails tells you where the fault is.",
           fa: "وقتی «اینترنت قطع است»، حدس نزن. از نزدیک به دور آزمایش کن؛ اولین آزمونی که خطا بدهد جای مشکل را نشان می‌دهد." } },
    { table: { head: { en: ["Step", "Command", "If it fails"], fa: ["قدم", "دستور", "اگر خطا داد"] }, rows: [
      ["1", "ip addr  /  ipconfig", { en: "No address or 169.254.x.x: cable, Wi-Fi or DHCP.", fa: "آدرس ندارد یا 169.254.x.x است: کابل، وای‌فای یا DHCP." }],
      ["2", "ping 127.0.0.1", { en: "The network software of this computer is broken.", fa: "نرم‌افزار شبکه‌ی همین کامپیوتر خراب است." }],
      ["3", "ping 192.168.1.1", { en: "The gateway can't be reached: local network, switch or router.", fa: "گیت‌وی در دسترس نیست: شبکه‌ی محلی، سوئیچ یا روتر." }],
      ["4", "ping 8.8.8.8", { en: "The local network is fine; the fault is the router or the provider.", fa: "شبکه‌ی محلی سالم است؛ مشکل از روتر یا شرکت اینترنت است." }],
      ["5", "nslookup google.com", { en: "Addresses work but names don't: DNS.", fa: "آدرس کار می‌کند ولی اسم نه: DNS." }],
      ["6", "traceroute / tracert", { en: "Shows at which hop the path stops.", fa: "نشان می‌دهد مسیر در کدام قدم می‌ایستد." }]
    ] } },
    { note: { en: "Write down the result of each step. 'Gateway answers, 8.8.8.8 does not' is a sentence an internet provider's support line can act on at once.", fa: "نتیجه‌ی هر قدم را یادداشت کن. «گیت‌وی جواب می‌دهد ولی 8.8.8.8 نه» جمله‌ای است که پشتیبانی شرکت اینترنت می‌تواند فوراً رویش کار کند." }, kind: "tip" }
  ],

  "security-mindset": [
    { h: { en: "Start with a threat model", fa: "با مدل تهدید شروع کن" } },
    { p: { en: "Security without a plan becomes a pile of products. Before buying or installing anything, answer four questions on one sheet of paper. What do I have that is worth protecting — customer data, money, the ability to keep working? Who might want it — a random robot scanning the internet, a competitor, an unhappy employee? How could they get in — a weak password, an old program, a convincing email? And what would it cost me if they succeeded? The answers tell you where to spend your effort first. A small office and a bank need different answers, but the same four questions.",
           fa: "امنیتِ بدون برنامه تبدیل به تلّی از محصول می‌شود. قبل از خریدن یا نصب هر چیزی، روی یک برگه به چهار سؤال جواب بده. چه چیزی دارم که ارزش محافظت دارد — اطلاعات مشتری، پول، توانِ ادامه‌ی کار؟ چه کسی ممکن است آن را بخواهد — یک ربات که اینترنت را اسکن می‌کند، یک رقیب، یک کارمند ناراضی؟ چطور می‌تواند وارد شود — رمز ضعیف، برنامه‌ی قدیمی، یک ایمیل فریبنده؟ و اگر موفق شود چه هزینه‌ای برایم دارد؟ جواب‌ها می‌گویند اول کجا باید وقت بگذاری. یک دفتر کوچک و یک بانک جواب‌های متفاوتی دارند ولی همین چهار سؤال را." } },
    { h: { en: "The attacks you will really meet", fa: "حمله‌هایی که واقعاً می‌بینی" } },
    { table: { head: { en: ["Attack", "How it works", "Main defence"], fa: ["حمله", "چطور کار می‌کند", "دفاع اصلی"] }, rows: [
      [{ en: "Phishing", fa: "فیشینگ" }, { en: "A message pretends to be your bank or boss and asks you to log in or pay.", fa: "پیامی خودش را بانک یا رئیس جا می‌زند و می‌خواهد وارد شوی یا پول بدهی." }, { en: "Check the sender, open the site yourself, two-step login.", fa: "بررسی فرستنده، بازکردن سایت توسط خودت، ورود دومرحله‌ای." }],
      [{ en: "Password guessing", fa: "حدس رمز" }, { en: "Robots try thousands of common or leaked passwords.", fa: "ربات‌ها هزاران رمز رایج یا نشت‌کرده را امتحان می‌کنند." }, { en: "Long unique passwords, lock after failures, two-step login.", fa: "رمز بلند و یکتا، قفل بعد از چند تلاش ناموفق، ورود دومرحله‌ای." }],
      [{ en: "Ransomware", fa: "باج‌افزار" }, { en: "A program encrypts your files and demands money.", fa: "برنامه‌ای فایل‌هایت را رمز می‌کند و پول می‌خواهد." }, { en: "Offline backups that you have tested.", fa: "پشتیبان آفلاین که آزمایشش کرده‌ای." }],
      [{ en: "Unpatched software", fa: "نرم‌افزار به‌روزنشده" }, { en: "A known hole in an old program is used automatically.", fa: "از حفره‌ی شناخته‌شده‌ی یک برنامه‌ی قدیمی به‌طور خودکار استفاده می‌شود." }, { en: "Install updates quickly; remove what you don't use.", fa: "نصب سریع به‌روزرسانی؛ حذف چیزهایی که استفاده نمی‌کنی." }],
      [{ en: "Social engineering", fa: "مهندسی اجتماعی" }, { en: "Someone phones and talks an employee into giving access.", fa: "کسی تلفن می‌زند و کارمندی را راضی می‌کند دسترسی بدهد." }, { en: "A rule: verify identity through a second channel.", fa: "یک قانون: هویت را از یک راه دوم تأیید کن." }],
      [{ en: "Open Wi-Fi snooping", fa: "شنود وای‌فای عمومی" }, { en: "On a shared network, others can watch unencrypted traffic.", fa: "در شبکه‌ی مشترک، دیگران ترافیک رمزنشده را می‌بینند." }, { en: "HTTPS everywhere, a VPN, no banking on public Wi-Fi.", fa: "HTTPS همه‌جا، VPN، و کار بانکی نکردن روی وای‌فای عمومی." }]
    ] } },
    { p: { en: "Notice what is missing from this table: brilliant hackers typing fast in the dark. Almost every real incident starts with one of these six ordinary things, which is good news — ordinary care stops them.",
           fa: "به چیزی که در این جدول نیست دقت کن: هکرهای نابغه‌ای که در تاریکی تند تایپ می‌کنند. تقریباً هر رخداد واقعی با یکی از همین شش چیز معمولی شروع می‌شود و این خبر خوبی است — مراقبتِ معمولی جلویشان را می‌گیرد." } },
    { h: { en: "Passwords and two-step login, properly", fa: "رمز و ورود دومرحله‌ای، به شکل درست" } },
    { list: { en: ["Length beats cleverness. Four random words — 'paper tunnel orange seventeen' — are far harder to guess than P@ssw0rd!, and easier to remember.", "One password per account. When a website is breached, attackers try the same email and password everywhere else.", "A password manager makes the two rules above possible: it invents and remembers a different long password for every site, and you remember only one.", "Turn on two-step login wherever it exists, starting with email — whoever controls your email can reset everything else.", "An authenticator app is stronger than codes by SMS; a hardware key is stronger still.", "No real organisation will ever ask for your code. Anyone who asks for it is the attacker."],
              fa: ["طول از زرنگی مهم‌تر است. چهار کلمه‌ی تصادفی — «کاغذ تونل نارنجی هفده» — خیلی سخت‌تر از P@ssw0rd! حدس زده می‌شود و راحت‌تر به خاطر می‌ماند.", "برای هر حساب یک رمز. وقتی سایتی نشت می‌کند، مهاجم‌ها همان ایمیل و رمز را همه‌جای دیگر امتحان می‌کنند.", "مدیر رمز دو قاعده‌ی بالا را شدنی می‌کند: برای هر سایت یک رمز بلند متفاوت می‌سازد و نگه می‌دارد و تو فقط یکی را حفظ می‌کنی.", "هر جا ورود دومرحله‌ای هست روشنش کن و از ایمیل شروع کن — هر کس ایمیلت را داشته باشد بقیه را می‌تواند بازنشانی کند.", "برنامه‌ی احراز هویت از کد پیامکی قوی‌تر است و کلید سخت‌افزاری از آن هم قوی‌تر.", "هیچ سازمان واقعی کد تو را نمی‌خواهد. هر کس آن را بخواهد خودِ مهاجم است."] } },
    { h: { en: "Updates: the dull habit that wins", fa: "به‌روزرسانی: عادتِ کسل‌کننده‌ای که برنده است" } },
    { p: { en: "When a security hole is announced, a fix usually arrives the same day — and attackers start scanning for machines without the fix within hours. The window between 'fix released' and 'fix installed' is where most break-ins happen. Turn on automatic updates for the operating system, the browser and phones. For servers and network devices, set a fixed day each month, and do not forget the forgotten ones: routers, cameras, printers and the firmware of switches. Anything that no longer receives updates should be replaced or cut off from the internet.",
           fa: "وقتی یک حفره‌ی امنیتی اعلام می‌شود، معمولاً همان روز اصلاحیه‌اش می‌آید — و مهاجم‌ها ظرف چند ساعت شروع به اسکن دستگاه‌های اصلاح‌نشده می‌کنند. بیشتر نفوذها در فاصله‌ی «اصلاحیه منتشر شد» تا «اصلاحیه نصب شد» رخ می‌دهد. به‌روزرسانی خودکار را برای سیستم‌عامل، مرورگر و گوشی‌ها روشن کن. برای سرورها و تجهیزات شبکه یک روز ثابت در ماه بگذار و فراموش‌شده‌ها را فراموش نکن: روتر، دوربین، پرینتر و Firmware سوئیچ‌ها. هر چیزی که دیگر به‌روزرسانی نمی‌گیرد باید عوض شود یا از اینترنت جدا شود." } },
    { h: { en: "Making a network harder to attack", fa: "سخت‌ترکردن حمله به یک شبکه" } },
    { list: { en: ["Change every default password — routers, cameras and printers are shipped with passwords anyone can look up.", "Close what you do not use. Every open port is a door; scan your own network and ask about each one.", "Never expose remote desktop (3389), Telnet (23) or a device's admin page to the internet. Reach them through a VPN.", "Separate guests from staff. A visitor's phone should never be on the same network as the accounting computer — that is what VLANs and guest Wi-Fi are for.", "Use WPA2 or WPA3 on Wi-Fi with a long password, and turn off WPS.", "Give each person their own account and only the access their job needs. Remove accounts the day someone leaves.", "Put a firewall between the internet and everything else, with one rule to start from: deny everything, then allow what is needed."],
              fa: ["همه‌ی رمزهای پیش‌فرض را عوض کن — روتر، دوربین و پرینتر با رمزهایی فروخته می‌شوند که هر کسی می‌تواند پیدا کند.", "هر چه استفاده نمی‌کنی ببند. هر پورت باز یک در است؛ شبکه‌ی خودت را اسکن کن و درباره‌ی هر کدام سؤال کن.", "هیچ‌وقت ریموت دسکتاپ (3389)، Telnet (23) یا صفحه‌ی مدیریت یک دستگاه را رو به اینترنت نگذار. از طریق VPN به آن‌ها برس.", "مهمان را از کارمند جدا کن. گوشی یک بازدیدکننده نباید در همان شبکه‌ی کامپیوتر حسابداری باشد — VLAN و وای‌فای مهمان برای همین است.", "روی وای‌فای از WPA2 یا WPA3 با رمز بلند استفاده کن و WPS را خاموش کن.", "به هر نفر حساب خودش را بده و فقط دسترسی‌ای که کارش لازم دارد. همان روزی که کسی می‌رود حسابش را حذف کن.", "بین اینترنت و بقیه‌ی شبکه فایروال بگذار، با یک قاعده برای شروع: همه‌چیز ممنوع، بعد فقط چیزهای لازم مجاز."] } },
    { h: { en: "Backups you can actually restore", fa: "پشتیبانی که واقعاً بشود بازگرداند" } },
    { p: { en: "A backup is the only defence that still works after everything else has failed — against ransomware, fire, theft and plain mistakes. Follow the 3-2-1 rule, and add two more points that people learn the hard way. First, at least one copy must be offline or unchangeable, because ransomware encrypts every disk it can reach, including the backup drive that is always plugged in. Second, a backup you have never restored is only a hope. Once a month, pick a file at random and bring it back; twice a year, restore a whole system.",
           fa: "پشتیبان تنها دفاعی است که بعد از شکست بقیه هنوز کار می‌کند — در برابر باج‌افزار، آتش، دزدی و اشتباه ساده. قانون ۳-۲-۱ را رعایت کن و دو نکته‌ی دیگر را که مردم با تجربه‌ی تلخ یاد می‌گیرند اضافه کن. اول، دست‌کم یک نسخه باید آفلاین یا تغییرناپذیر باشد، چون باج‌افزار هر دیسکی را که به آن برسد رمز می‌کند، از جمله هارد پشتیبانی که همیشه وصل است. دوم، پشتیبانی که هیچ‌وقت بازگردانده نشده فقط یک امید است. ماهی یک بار یک فایل را تصادفی انتخاب کن و برگردانش؛ سالی دو بار یک سیستم کامل را بازگردان." } },
    { h: { en: "Noticing an attack: logs", fa: "فهمیدن حمله: لاگ‌ها" } },
    { p: { en: "Most victims discover a break-in weeks later, from someone else. Logs are how you find out yourself. On Linux, logins are recorded in /var/log/auth.log; on Windows, in the Security log of Event Viewer. Look for three patterns: many failed logins from one address, a successful login at an unusual hour or from an unusual place, and a new account or scheduled task that nobody remembers creating. The SSH Log Analyzer in the Tools section does the first of these automatically — read its build tutorial to see how.",
           fa: "بیشتر قربانی‌ها هفته‌ها بعد و از زبان دیگران می‌فهمند نفوذ شده. لاگ راهی است که خودت بفهمی. در لینوکس ورودها در /var/log/auth.log ثبت می‌شود و در ویندوز در لاگ Security برنامه‌ی Event Viewer. دنبال سه الگو باش: تعداد زیاد ورود ناموفق از یک آدرس، ورود موفق در ساعت یا از جای غیرعادی، و حساب یا کار زمان‌بندی‌شده‌ی جدیدی که کسی یادش نیست ساخته باشد. «تحلیل‌گر لاگ SSH» در بخش ابزارها مورد اول را خودکار انجام می‌دهد — آموزش ساختش را بخوان تا ببینی چطور." } },
    { term: "$ grep -c \"Failed password\" logs/auth.log\n3\n$ ./count.sh\n      2 203.0.113.45\n      1 198.51.100.77",
      cap: { en: "Two commands that answer 'is someone guessing passwords, and from where?'", fa: "دو دستور که جواب می‌دهند «کسی دارد رمز حدس می‌زند؟ از کجا؟»" } },
    { h: { en: "If it happens anyway: the first hour", fa: "اگر با همه‌ی این‌ها رخ داد: ساعت اول" } },
    { list: { en: ["Stay calm and write down the time and what you see. Notes taken now are worth more than memories later.", "Disconnect the affected machine from the network — pull the cable or turn off Wi-Fi — but do not switch it off: memory holds evidence.", "From a clean device, change the passwords of the affected accounts, starting with email and administrator accounts.", "Tell the people who need to know: your manager, the IT team, the bank if money is involved.", "Do not pay a ransom in a hurry and do not delete things to 'clean up'. Keep the evidence.", "Restore from a backup made before the attack, and install every update before reconnecting.", "Afterwards, find out how they got in and close that door. An incident you learn nothing from will happen again."],
              fa: ["آرام بمان و زمان و چیزهایی را که می‌بینی یادداشت کن. یادداشت الان از خاطره‌ی بعداً باارزش‌تر است.", "دستگاه آلوده را از شبکه جدا کن — کابل را بکش یا وای‌فای را خاموش کن — ولی خاموشش نکن: حافظه مدرک دارد.", "از یک دستگاه سالم، رمز حساب‌های آسیب‌دیده را عوض کن؛ از ایمیل و حساب‌های مدیر شروع کن.", "به کسانی که باید بدانند خبر بده: مدیرت، تیم IT و اگر پای پول در میان است بانک.", "با عجله باج نده و برای «پاک‌سازی» چیزی را حذف نکن. مدرک‌ها را نگه دار.", "از پشتیبانی که قبل از حمله گرفته شده بازگردان و قبل از وصل‌شدن دوباره همه‌ی به‌روزرسانی‌ها را نصب کن.", "بعدش بفهم از کجا وارد شدند و همان در را ببند. رخدادی که از آن چیزی یاد نگیری دوباره تکرار می‌شود."] } },
    { h: { en: "The legal line, and how to practise safely", fa: "مرز قانونی و تمرین امن" } },
    { p: { en: "The tools that defenders and attackers use are the same; the difference is permission. Scanning, testing or logging into a system you do not own, without written permission from its owner, is a crime in almost every country — 'I was only curious' is not a defence. Build your own lab instead: two virtual machines on your laptop, an old router, deliberately vulnerable practice systems made for learning, and capture-the-flag competitions. Everything in the free book on this site is meant to be tried there.",
           fa: "ابزار مدافع و مهاجم یکی است؛ تفاوت در «اجازه» است. اسکن، آزمایش یا ورود به سیستمی که مال تو نیست، بدون اجازه‌ی کتبی صاحبش، تقریباً در همه‌ی کشورها جرم است — «فقط کنجکاو بودم» دفاع حساب نمی‌شود. به‌جایش آزمایشگاه خودت را بساز: دو ماشین مجازی روی لپ‌تاپ، یک روتر قدیمی، سیستم‌های تمرینیِ عمداً آسیب‌پذیر که برای یادگیری ساخته شده‌اند و مسابقه‌های CTF. همه‌ی مطالب کتاب رایگان این سایت برای امتحان در همان‌جاست." } },
    { h: { en: "A checklist you can use today", fa: "فهرستی که همین امروز می‌توانی استفاده کنی" } },
    { table: { head: { en: ["At home", "In a small office"], fa: ["در خانه", "در یک دفتر کوچک"] }, rows: [
      [{ en: "Password manager and two-step login on email", fa: "مدیر رمز و ورود دومرحله‌ای روی ایمیل" }, { en: "Every person has their own account; no shared passwords", fa: "هر نفر حساب خودش را دارد؛ رمز مشترک ممنوع" }],
      [{ en: "Automatic updates on every device", fa: "به‌روزرسانی خودکار روی همه‌ی دستگاه‌ها" }, { en: "A monthly update day for servers, switches, cameras", fa: "یک روز به‌روزرسانی ماهانه برای سرور، سوئیچ و دوربین" }],
      [{ en: "Router: new admin password, WPS off, firmware updated", fa: "روتر: رمز مدیریت جدید، WPS خاموش، Firmware به‌روز" }, { en: "Guest Wi-Fi and cameras on separate VLANs", fa: "وای‌فای مهمان و دوربین‌ها روی VLAN جدا" }],
      [{ en: "Photos and documents backed up to a second place", fa: "عکس‌ها و سندها در جای دوم پشتیبان‌گیری شده" }, { en: "3-2-1 backups with one offline copy, restore tested", fa: "پشتیبان ۳-۲-۱ با یک نسخه‌ی آفلاین و بازگردانیِ آزمایش‌شده" }],
      [{ en: "Screen lock on phone and laptop", fa: "قفل صفحه روی گوشی و لپ‌تاپ" }, { en: "No remote desktop or admin pages open to the internet", fa: "ریموت دسکتاپ و صفحه‌ی مدیریت رو به اینترنت باز نباشد" }],
      [{ en: "Think before clicking a link you did not ask for", fa: "قبل از کلیک روی لینکی که نخواسته بودی فکر کن" }, { en: "A written plan: who to call and what to do in the first hour", fa: "یک برنامه‌ی مکتوب: به چه کسی زنگ بزنیم و ساعت اول چه کنیم" }]
    ] } },
    { h: { en: "Where this leads", fa: "این مسیر به کجا می‌رسد" } },
    { p: { en: "Security is not one job but many: the administrator who hardens systems, the analyst who watches logs and investigates alerts, the tester who is paid to break in with permission, and the engineer who designs networks that fail safely. All of them stand on the same base — Linux, networking and a little programming, which is exactly what the other tracks on this site teach. A common order for certificates is Network+ or CCNA for networks, then Security+ for the security basics, and only after that the specialised ones.",
           fa: "امنیت یک شغل نیست، چند شغل است: مدیر سیستمی که سیستم‌ها را مقاوم می‌کند، تحلیل‌گری که لاگ‌ها را زیر نظر دارد و هشدارها را بررسی می‌کند، آزمون‌گری که با اجازه پول می‌گیرد تا نفوذ کند، و مهندسی که شبکه‌ای طراحی می‌کند که ایمن خراب شود. همه روی یک پایه ایستاده‌اند — لینوکس، شبکه و کمی برنامه‌نویسی، یعنی دقیقاً همان چیزی که مسیرهای دیگر این سایت آموزش می‌دهند. ترتیب رایج گواهینامه‌ها این است: Network+ یا CCNA برای شبکه، بعد Security+ برای پایه‌ی امنیت و فقط بعد از آن گواهینامه‌های تخصصی." } }
  ]
});

// Reading time grows with the lesson
Object.assign(window.LEARN, { minutes: { "linux-first-steps": 22, "linux-files": 25, "linux-permissions": 24, "python-10-minutes": 28, "javascript-basics": 30, "bash-scripting": 27, "what-is-ip": 28, "security-mindset": 26 } });

// ─────────────────────────────────────────────────────────────
//  More lessons. Each one is complete in itself and assumes the
//  reader has never written a line of code.
// ─────────────────────────────────────────────────────────────
window.LEARN.articles.push({
  id: "python-from-zero", track: "programming", icon: "code", level: "beginner", minutes: 35, updated: "2026-11",
  title: { en: "Python from absolute zero", fa: "پایتون از صفرِ مطلق" },
  summary: { en: "For someone who has never programmed: what a program is, how Python reads your lines, and why the spaces at the start of a line matter — explained one small step at a time.",
             fa: "برای کسی که تا حالا برنامه ننوشته: برنامه چیست، پایتون خط‌هایت را چطور می‌خواند و چرا فاصله‌ی اول خط مهم است — قدم‌به‌قدم و دانه‌دانه." },
  blocks: [
    { h: { en: "What is a program?", fa: "برنامه چیست؟" } },
    { p: { en: "A program is a list of instructions written in a text file. The computer reads the file from the top, one line at a time, and does exactly what each line says — nothing more, and nothing it was not told. It does not guess what you meant. That sounds strict, and it is, but it is also good news: when something goes wrong, the reason is always written on the screen in front of you.",
           fa: "برنامه فهرستی از دستورالعمل‌هاست که در یک فایل متنی نوشته شده. کامپیوتر فایل را از بالا، خط‌به‌خط می‌خواند و دقیقاً همان کاری را می‌کند که هر خط می‌گوید — نه بیشتر و نه چیزی که به او نگفته‌ای. حدس نمی‌زند منظورت چه بوده. سخت‌گیرانه به نظر می‌رسد و هست، ولی خبر خوبی هم هست: وقتی چیزی خراب می‌شود، دلیلش همیشه روی صفحه جلوی چشمت نوشته شده." } },
    { p: { en: "Python is one of the languages you can write those instructions in. It was designed to be read easily, which is why schools, scientists, network engineers and security teams all use it. You do not need to be good at mathematics. You need patience, and the habit of typing the examples yourself.",
           fa: "پایتون یکی از زبان‌هایی است که می‌توانی این دستورها را با آن بنویسی. طوری طراحی شده که راحت خوانده شود و برای همین مدرسه‌ها، دانشمندان، مهندس‌های شبکه و تیم‌های امنیت همه از آن استفاده می‌کنند. لازم نیست ریاضی‌ات قوی باشد. صبر لازم داری و عادتِ اینکه مثال‌ها را خودت تایپ کنی." } },
    { note: { en: "Open the Python tab of the practice lab in another window and type every example in this lesson. Reading teaches you about ten per cent; typing teaches the rest.", fa: "زبانه‌ی پایتون آزمایشگاه تمرین را در پنجره‌ی دیگری باز کن و هر مثال این درس را تایپ کن. خواندن حدود ده درصد یاد می‌دهد؛ بقیه را تایپ‌کردن یاد می‌دهد." }, kind: "tip" },

    { h: { en: "Your first line: print", fa: "اولین خط: print" } },
    { code: "print(\"Hello, world!\")\nprint(\"My name is\", \"Sara\")\nprint(2 + 3)\nprint(\"2 + 3\")", lang: "python" },
    { term: "$ python3 hello.py\nHello, world!\nMy name is Sara\n5\n2 + 3", cap: { en: "Four lines in, four lines out.", fa: "چهار خط نوشتیم و چهار خط گرفتیم." } },
    { p: { en: "Look at each piece, because every later line is built from the same pieces. print is the name of a command (Python calls it a function) that shows something on the screen. The round brackets ( ) hold what you hand to the command; they must open and close. The quotation marks \" \" tell Python 'this is text, show it exactly as written'. Without quotation marks Python tries to work the thing out — which is why print(2 + 3) shows 5, but print(\"2 + 3\") shows the characters 2 + 3. A comma between two things prints both with a space between them.",
           fa: "به هر تکه دقت کن، چون همه‌ی خط‌های بعدی از همین تکه‌ها ساخته می‌شوند. print اسم یک دستور است (پایتون به آن «تابع» می‌گوید) که چیزی را روی صفحه نشان می‌دهد. پرانتزها ( ) چیزی را که به دستور می‌دهی نگه می‌دارند و باید باز و بسته شوند. علامت‌های نقل‌قول \" \" به پایتون می‌گویند «این متن است، دقیقاً همان‌طور که نوشته شده نشانش بده». بدون نقل‌قول پایتون سعی می‌کند حسابش کند — برای همین print(2 + 3) عدد ۵ را نشان می‌دهد ولی print(\"2 + 3\") خودِ نویسه‌های 2 + 3 را. کاما بین دو چیز، هر دو را با یک فاصله بینشان چاپ می‌کند." } },
    { list: { en: ["Capital letters matter: Print and PRINT do not exist; only print does.", "Every ( needs a ) and every \" needs a second \".", "One instruction per line. You do not put a full stop or a semicolon at the end.", "A line that starts with # is a comment: a note for people. Python skips it."],
              fa: ["حروف بزرگ و کوچک مهم‌اند: Print و PRINT وجود ندارند؛ فقط print هست.", "هر ( یک ) می‌خواهد و هر \" یک \" دوم.", "هر خط یک دستور. آخر خط نقطه یا نقطه‌ویرگول نمی‌گذاری.", "خطی که با # شروع شود «توضیح» است: یادداشتی برای آدم‌ها. پایتون از رویش رد می‌شود."] } },

    { h: { en: "Variables: giving a value a name", fa: "متغیر: اسم‌گذاشتن روی یک مقدار" } },
    { p: { en: "A variable is a name that points to a value, like a label on a box. You create it with a single equals sign: the name goes on the left, the value on the right. Read  age = 17  as 'let age be 17', not as 'age equals 17'. That is why the second line below is not nonsense: it means 'take the current age, add one, and store the result under the same name'.",
           fa: "متغیر اسمی است که به یک مقدار اشاره می‌کند، مثل برچسب روی یک جعبه. با یک علامت مساوی ساخته می‌شود: اسم سمت چپ و مقدار سمت راست. خط  age = 17  را «بگذار age برابر ۱۷ باشد» بخوان، نه «age مساوی ۱۷ است». برای همین خط دوم پایین بی‌معنی نیست: یعنی «مقدار فعلی age را بردار، یکی اضافه کن و نتیجه را زیر همان اسم ذخیره کن»." } },
    { code: "age = 17\nage = age + 1\nname = \"Sara\"\nprint(name, \"is\", age)\nprint(type(age), type(name), type(3.5), type(True))", lang: "python" },
    { term: "$ python3 vars.py\nSara is 18\n<class 'int'> <class 'str'> <class 'float'> <class 'bool'>", cap: { en: "type() tells you what kind of value a name holds.", fa: "type() می‌گوید یک اسم چه نوع مقداری دارد." } },
    { table: { head: { en: ["Type", "Example", "What it is"], fa: ["نوع", "مثال", "چیست"] }, rows: [
      ["int", "17", { en: "A whole number", fa: "عدد صحیح" }],
      ["float", "3.5", { en: "A number with a decimal point", fa: "عدد اعشاری" }],
      ["str", "\"Sara\"", { en: "Text (a string of characters), always inside quotation marks", fa: "متن (رشته‌ای از نویسه‌ها)، همیشه داخل نقل‌قول" }],
      ["bool", "True", { en: "Yes or no: only True or False, with a capital first letter", fa: "بله یا نه: فقط True یا False، با حرف اول بزرگ" }]
    ] } },
    { list: { en: ["Names may contain letters, digits and the underscore _, but cannot start with a digit and cannot contain spaces.", "Choose names that explain themselves: student_count is better than sc or x.", "name and Name are two different variables.", "A few words belong to Python and cannot be used as names: if, for, def, True, class and about thirty others."],
              fa: ["اسم می‌تواند حرف، رقم و خط زیر _ داشته باشد، ولی با رقم شروع نمی‌شود و فاصله ندارد.", "اسمی انتخاب کن که خودش را توضیح بدهد: student_count بهتر از sc یا x است.", "name و Name دو متغیر جدا هستند.", "چند کلمه مال خودِ پایتون است و نمی‌شود اسم متغیر باشد: if، for، def، True، class و حدود سی کلمه‌ی دیگر."] } },

    { h: { en: "Text and numbers are different things", fa: "متن و عدد دو چیز متفاوت‌اند" } },
    { p: { en: "\"42\" in quotation marks is two characters of text; 42 without them is a number you can calculate with. Python never mixes them silently, and that protects you from a whole family of mistakes. When you need to cross from one to the other, you convert on purpose: int() makes a whole number, float() a decimal number and str() text.",
           fa: "\"42\" داخل نقل‌قول دو نویسه‌ی متن است؛ 42 بدون نقل‌قول عددی است که می‌شود با آن حساب کرد. پایتون هیچ‌وقت این دو را بی‌صدا قاطی نمی‌کند و همین تو را از یک خانواده‌ی کامل از اشتباه‌ها حفظ می‌کند. وقتی لازم است از یکی به دیگری بروی، عمداً تبدیل می‌کنی: int() عدد صحیح می‌سازد، float() عدد اعشاری و str() متن." } },
    { code: "text = \"42\"\nnumber = int(text)\nprint(number + 1)\nprint(text + \"1\")\nprint(float(\"3.5\") * 2, str(7) + \" days\")", lang: "python" },
    { term: "$ python3 conv.py\n43\n421\n7.0 7 days", cap: { en: "With numbers + adds; with text + glues the pieces together.", fa: "با عدد، + جمع می‌کند؛ با متن، + تکه‌ها را به هم می‌چسباند." } },

    { h: { en: "Asking yes-or-no questions", fa: "پرسیدن سؤال بله یا نه" } },
    { p: { en: "Programs become useful when they can decide. A decision starts with a question whose answer is True or False. Notice the double equals sign: one = stores a value, two == ask 'are these the same?'. Mixing them up is the most common beginner mistake of all.",
           fa: "برنامه وقتی مفید می‌شود که بتواند تصمیم بگیرد. تصمیم با سؤالی شروع می‌شود که جوابش True یا False است. به مساویِ دوتایی دقت کن: یک = مقدار را ذخیره می‌کند و دوتا == می‌پرسد «این دو یکی هستند؟». قاطی‌کردن این دو رایج‌ترین اشتباه تازه‌کارهاست." } },
    { table: { head: { en: ["Sign", "Question", "Example", "Answer"], fa: ["علامت", "سؤال", "مثال", "جواب"] }, rows: [
      ["==", { en: "equal to?", fa: "برابر است؟" }, "10 == 3", "False"],
      ["!=", { en: "not equal to?", fa: "نابرابر است؟" }, "10 != 3", "True"],
      [">", { en: "greater than?", fa: "بزرگ‌تر است؟" }, "10 > 3", "True"],
      ["<", { en: "less than?", fa: "کوچک‌تر است؟" }, "10 < 3", "False"],
      [">=", { en: "greater than or equal to?", fa: "بزرگ‌تر یا مساوی؟" }, "18 >= 18", "True"],
      ["and", { en: "are both true?", fa: "هر دو درست‌اند؟" }, "True and False", "False"],
      ["or", { en: "is at least one true?", fa: "دست‌کم یکی درست است؟" }, "True or False", "True"],
      ["not", { en: "the opposite", fa: "برعکس" }, "not True", "False"]
    ] } },

    { h: { en: "if — and why the next line must start with spaces", fa: "if — و چرا خط بعدی باید با فاصله شروع شود" } },
    { p: { en: "This is the part that confuses nearly everyone at first, so we will go slowly. An if statement has two parts. The first line asks the question and ends with a colon. The colon means 'what follows belongs to me'. The lines after it that are pushed to the right — indented, by four spaces — are the lines that run only when the answer is True. Together they are called a block.",
           fa: "این همان بخشی است که تقریباً همه را اولش گیج می‌کند، پس آرام پیش می‌رویم. دستور if دو بخش دارد. خط اول سؤال را می‌پرسد و با دونقطه تمام می‌شود. دونقطه یعنی «هر چه بعد از من می‌آید مال من است». خط‌های بعدی که به سمت راست هل داده شده‌اند — با چهار فاصله تورفته‌اند — خط‌هایی هستند که فقط وقتی جواب True باشد اجرا می‌شوند. به مجموعه‌ی این خط‌ها «بلوک» می‌گویند." } },
    { code: "age = 15\nif age >= 18:\n    print(\"You can vote.\")\n    print(\"You can drive.\")\nprint(\"Thanks for coming.\")", lang: "python" },
    { term: "$ python3 block.py\nThanks for coming.", cap: { en: "age is 15, so the two indented lines are skipped. The last line is not indented, so it is outside the if and always runs.", fa: "age برابر ۱۵ است، پس دو خط تورفته رد می‌شوند. خط آخر تورفته نیست، پس بیرون از if است و همیشه اجرا می‌شود." } },
    { p: { en: "Why spaces? Python needs some way to know where the 'only if true' part begins and ends. Many other languages use curly brackets { } for this and treat the spaces as decoration. Python's designer chose the spaces themselves as the rule, because good programmers indent their code anyway — so in Python, the way the code looks is the way it works. The spaces are not style. They are grammar. Move a line four spaces to the left and you have changed what the program does.",
           fa: "چرا فاصله؟ پایتون باید راهی داشته باشد که بفهمد بخشِ «فقط اگر درست بود» از کجا شروع و کجا تمام می‌شود. خیلی از زبان‌های دیگر برای این کار از آکولاد { } استفاده می‌کنند و فاصله‌ها را تزئین حساب می‌کنند. طراح پایتون خودِ فاصله‌ها را قانون قرار داد، چون برنامه‌نویس‌های خوب در هر حال کدشان را تورفته می‌نویسند — پس در پایتون، ظاهر کد همان رفتار کد است. این فاصله‌ها سلیقه نیستند؛ دستور زبان‌اند. اگر خطی را چهار فاصله به چپ ببری، کار برنامه را عوض کرده‌ای." } },
    { p: { en: "Here is what Python says when you forget — first the spaces, then the colon. Read both messages: they tell you the line number and exactly what was expected.",
           fa: "این چیزی است که پایتون وقتی فراموش کنی می‌گوید — اول فاصله‌ها و بعد دونقطه. هر دو پیام را بخوان: شماره‌ی خط و دقیقاً چیزی را که انتظار می‌رفت می‌گویند." } },
    { term: "$ python3 bad_indent.py\n  File \"bad_indent.py\", line 3\n    print(\"adult\")\n    ^^^^^\nIndentationError: expected an indented block after 'if' statement on line 2\n$ python3 no_colon.py\n  File \"no_colon.py\", line 2\n    if age >= 18\n                ^\nSyntaxError: expected ':'",
      cap: { en: "'Expected an indented block' means: after a line that ends with a colon, the next line must be pushed to the right.", fa: "«expected an indented block» یعنی: بعد از خطی که با دونقطه تمام می‌شود، خط بعدی باید به راست هل داده شود." } },
    { list: { en: ["The rule in one sentence: a line that ends with a colon is always followed by an indented block.", "This holds for every such line: if, elif, else, for, while, def, class, try, except and with.", "Use four spaces for each level. Every line of the same block must have exactly the same number.", "Do not mix the Tab key and spaces in one file. Good editors — and the practice lab — type four spaces when you press Tab.", "The block ends at the first line that goes back to the left. There is no 'end' word."],
              fa: ["قانون در یک جمله: بعد از خطی که با دونقطه تمام می‌شود همیشه یک بلوک تورفته می‌آید.", "این برای همه‌ی این خط‌ها درست است: if، elif، else، for، while، def، class، try، except و with.", "برای هر سطح چهار فاصله بگذار. همه‌ی خط‌های یک بلوک باید دقیقاً به یک اندازه تورفته باشند.", "در یک فایل کلید Tab و فاصله را قاطی نکن. ویرایشگرهای خوب — و آزمایشگاه تمرین — با زدن Tab چهار فاصله تایپ می‌کنند.", "بلوک با اولین خطی که به چپ برمی‌گردد تمام می‌شود. کلمه‌ای مثل «پایان» وجود ندارد."] } },

    { h: { en: "else, elif and blocks inside blocks", fa: "else، elif و بلوک داخل بلوک" } },
    { p: { en: "else is the 'otherwise' branch: it runs when the question was False. elif (short for 'else if') asks another question when the first one failed. A block can contain another if, and then that inner block is indented by four more spaces — eight in total. You can always tell which if a line belongs to by looking straight up from its first character.",
           fa: "else شاخه‌ی «وگرنه» است: وقتی جواب سؤال False بود اجرا می‌شود. elif (کوتاه‌شده‌ی else if) وقتی سؤال اول رد شد سؤال دیگری می‌پرسد. یک بلوک می‌تواند if دیگری داخل خودش داشته باشد و آن‌وقت بلوک درونی چهار فاصله‌ی دیگر تورفته می‌شود — در مجموع هشت‌تا. همیشه می‌توانی با نگاه مستقیم به بالای اولین نویسه‌ی یک خط بفهمی آن خط مال کدام if است." } },
    { code: "temperature = 35\nraining = False\n\nif temperature > 30:\n    print(\"It is hot.\")\n    if raining:\n        print(\"Take an umbrella anyway.\")\n    else:\n        print(\"Take water.\")\nelse:\n    print(\"It is not hot.\")\nprint(\"Have a good day.\")", lang: "python" },
    { term: "$ python3 nested.py\nIt is hot.\nTake water.\nHave a good day.", cap: { en: "The inner else lines up with the inner if; the outer else lines up with the outer if.", fa: "else درونی زیر if درونی قرار دارد و else بیرونی زیر if بیرونی." } },

    { h: { en: "Repeating: for and while", fa: "تکرار: for و while" } },
    { p: { en: "A loop runs the same block several times. for takes the items of a collection one by one; range(1, 4) produces the numbers 1, 2 and 3 — the last number is not included. The loop line ends with a colon, so the lines that repeat are indented, exactly as with if.",
           fa: "حلقه یک بلوک را چند بار اجرا می‌کند. for عضوهای یک مجموعه را یکی‌یکی برمی‌دارد؛ range(1, 4) عددهای ۱ و ۲ و ۳ را می‌سازد — عدد آخر حساب نمی‌شود. خط حلقه با دونقطه تمام می‌شود، پس خط‌هایی که تکرار می‌شوند تورفته‌اند، دقیقاً مثل if." } },
    { code: "for n in range(1, 4):\n    square = n * n\n    print(n, \"squared is\", square)\nprint(\"done\")", lang: "python" },
    { term: "$ python3 mixed.py\n1 squared is 1\n2 squared is 4\n3 squared is 9\ndone", cap: { en: "The two indented lines ran three times; 'done' is outside the loop and ran once.", fa: "دو خط تورفته سه بار اجرا شدند؛ done بیرون حلقه است و یک بار اجرا شد." } },
    { code: "count = 1\nwhile count <= 3:\n    print(\"count is\", count)\n    count = count + 1\nprint(\"finished\")", lang: "python",
      cap: { en: "while repeats as long as its question stays True. The line count = count + 1 is what eventually makes it False; without it the loop would never stop (Ctrl+C stops a runaway program).", fa: "while تا وقتی جواب سؤالش True است تکرار می‌کند. خط count = count + 1 همان چیزی است که بالاخره آن را False می‌کند؛ بدون آن حلقه هیچ‌وقت نمی‌ایستد (Ctrl+C برنامه‌ی ازکنترل‌خارج‌شده را متوقف می‌کند)." } },

    { h: { en: "Lists: many values under one name", fa: "لیست: چند مقدار زیر یک اسم" } },
    { code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[0])\nprint(len(fruits))\nfruits.append(\"date\")\nfor fruit in fruits:\n    print(\"I like\", fruit)\nprint(fruits[10])", lang: "python" },
    { term: "$ python3 listz.py\napple\n3\nI like apple\nI like banana\nI like cherry\nI like date\nTraceback (most recent call last):\n  File \"listz.py\", line 7, in <module>\n    print(fruits[10])\n          ~~~~~~^^^^\nIndexError: list index out of range",
      cap: { en: "Square brackets make a list. Counting starts at 0, so fruits[0] is the first item. Asking for position 10 in a list of four gives an IndexError.", fa: "کروشه لیست می‌سازد. شمارش از صفر شروع می‌شود، پس fruits[0] اولین عضو است. خواستن جایگاه ۱۰ از لیستی چهارتایی خطای IndexError می‌دهد." } },

    { h: { en: "Functions: def, and the same rule about spaces", fa: "تابع: def، و همان قانون فاصله" } },
    { p: { en: "A function is a block of code with a name, so that you can use it again without writing it again. You define it with def. Look at the first line piece by piece: def says 'I am defining a function', greet is the name you chose, name inside the brackets is a parameter — a variable that receives whatever is handed in — and the colon at the end, as always, announces a block. So the lines of the function are indented by four spaces. Everything indented under def is the function; the first line that returns to the left margin is outside it.",
           fa: "تابع بلوکی از کد با یک اسم است، تا بتوانی بدون دوباره‌نویسی دوباره از آن استفاده کنی. با def تعریفش می‌کنی. خط اول را تکه‌تکه نگاه کن: def می‌گوید «دارم یک تابع تعریف می‌کنم»، greet اسمی است که خودت انتخاب کرده‌ای، name داخل پرانتز «پارامتر» است — متغیری که هر چه به تابع داده شود می‌گیرد — و دونقطه‌ی آخر، مثل همیشه، خبر از یک بلوک می‌دهد. پس خط‌های تابع چهار فاصله تورفته‌اند. هر چه زیر def تورفته باشد خودِ تابع است و اولین خطی که به لبه‌ی چپ برگردد بیرون از آن است." } },
    { code: "def greet(name):\n    message = \"Hello, \" + name + \"!\"\n    return message\n\nprint(greet(\"Ali\"))\nprint(greet(\"Sara\"))\n\ndef add(a, b):\n    return a + b\n\ntotal = add(2, 3)\nprint(total)", lang: "python" },
    { term: "$ python3 func.py\nHello, Ali!\nHello, Sara!\n5", cap: { en: "Defining a function does nothing visible. It runs only when you call it by writing its name with brackets.", fa: "تعریف تابع کار قابل‌دیدنی انجام نمی‌دهد. فقط وقتی اجرا می‌شود که با نوشتن اسمش و پرانتز «صدایش بزنی»." } },
    { p: { en: "return hands a result back to the place that called the function, so you can store it or print it. print only shows something on the screen. They are not the same, and a function that calculates but forgets return gives back the special value None:",
           fa: "return نتیجه را به جایی که تابع را صدا زده برمی‌گرداند تا بتوانی ذخیره یا چاپش کنی. print فقط چیزی را روی صفحه نشان می‌دهد. این دو یکی نیستند و تابعی که حساب می‌کند ولی return را فراموش کرده مقدار ویژه‌ی None را برمی‌گرداند:" } },
    { code: "def add(a, b):\n    a + b          # calculated, then thrown away\n\nprint(add(2, 3))   # None", lang: "python" },

    { h: { en: "Reading an error message", fa: "خواندن پیام خطا" } },
    { term: "$ python3 name_err.py\nTraceback (most recent call last):\n  File \"name_err.py\", line 2, in <module>\n    print(totl)\n          ^^^^\nNameError: name 'totl' is not defined. Did you mean: 'total'?",
      cap: { en: "Read from the bottom: the kind of error and a plain sentence; above it the exact line, with marks under the problem.", fa: "از پایین بخوان: نوع خطا و یک جمله‌ی ساده؛ بالایش خطِ دقیق، با علامت زیر محل مشکل." } },
    { p: { en: "Errors are the normal state of programming, not a sign that you are bad at it. Professionals see dozens every day. The difference is only that they read the message calmly: which line, what kind of error, what was expected. Python often even suggests the fix, as it did here.",
           fa: "خطا وضعیت عادی برنامه‌نویسی است، نه نشانه‌ی اینکه در آن بد هستی. حرفه‌ای‌ها هر روز ده‌ها خطا می‌بینند. تفاوت فقط این است که پیام را با آرامش می‌خوانند: کدام خط، چه نوع خطایی، چه چیزی انتظار می‌رفت. پایتون اغلب راه‌حل را هم پیشنهاد می‌دهد، همان‌طور که اینجا داد." } },

    { h: { en: "Putting it all together", fa: "همه را کنار هم بگذاریم" } },
    { code: "# grades.py — tell each student whether they passed\ndef result(grade):\n    if grade >= 10:\n        return \"passed\"\n    else:\n        return \"failed\"\n\ngrades = [17, 8, 12, 19, 9]\npassed = 0\n\nfor grade in grades:\n    answer = result(grade)\n    print(grade, answer)\n    if answer == \"passed\":\n        passed = passed + 1\n\nprint(passed, \"of\", len(grades), \"students passed\")", lang: "python",
      cap: { en: "Every idea of this lesson in seventeen lines: a comment, a function, if and else, a list, a loop, a block inside a block, and three levels of indentation. Type it, run it, then change the pass mark to 12.", fa: "همه‌ی ایده‌های این درس در هفده خط: توضیح، تابع، if و else، لیست، حلقه، بلوک داخل بلوک و سه سطح تورفتگی. تایپش کن، اجرایش کن و بعد نمره‌ی قبولی را ۱۲ کن." } }
  ]
});
window.LEARN.study["python-from-zero"] = {
  goals: { en: ["Explain what a program is and how Python reads it", "Write print, variables, if / elif / else, for, while and def without help", "Say exactly why and where a line must be indented, and fix an IndentationError"],
           fa: ["توضیح بدهی برنامه چیست و پایتون چطور آن را می‌خواند", "بدون کمک print، متغیر، if / elif / else، for، while و def بنویسی", "دقیق بگویی چرا و کجا یک خط باید تورفته باشد و خطای IndentationError را رفع کنی"] },
  mistakes: { en: ["Forgetting the colon at the end of if, else, for, while or def.", "Not indenting the line after a colon — or indenting some lines of a block by 4 spaces and others by 3.", "Writing = when asking a question. if age = 18 is an error; it must be if age == 18.", "Forgetting the quotation marks, so Python looks for a variable called Sara.", "Using print inside a function when you meant return."],
              fa: ["جاانداختن دونقطه در آخر if، else، for، while یا def.", "تورفته‌نکردن خط بعد از دونقطه — یا تورفتگی ۴ فاصله برای بعضی خط‌های یک بلوک و ۳ فاصله برای بقیه.", "نوشتن = هنگام پرسیدن سؤال. if age = 18 خطاست؛ باید if age == 18 باشد.", "جاانداختن نقل‌قول، که باعث می‌شود پایتون دنبال متغیری به اسم Sara بگردد.", "استفاده از print داخل تابع وقتی منظورت return بوده."] },
  practice: [
    { q: { en: "What does this print, and why?\n\nx = 5\nif x > 10:\n    print(\"big\")\nprint(\"end\")", fa: "این چه چیزی چاپ می‌کند و چرا؟\n\nx = 5\nif x > 10:\n    print(\"big\")\nprint(\"end\")" }, a: { en: "Only: end\nx > 10 is False, so the indented line is skipped. print(\"end\") is not indented, so it is outside the if.", fa: "فقط: end\nx > 10 نادرست است، پس خط تورفته رد می‌شود. print(\"end\") تورفته نیست، پس بیرون از if است." } },
    { q: { en: "Find the two mistakes:\n\ndef double(n)\nreturn n * 2", fa: "دو اشتباه را پیدا کن:\n\ndef double(n)\nreturn n * 2" }, a: { en: "The colon after def double(n) is missing, and return must be indented by four spaces:\n\ndef double(n):\n    return n * 2", fa: "دونقطه بعد از def double(n) جا افتاده و return باید چهار فاصله تورفته باشد:\n\ndef double(n):\n    return n * 2" } },
    { q: { en: "Write a program that prints the numbers 1 to 10 and, next to each, the word even or odd. (Hint: n % 2 is 0 for even numbers.)", fa: "برنامه‌ای بنویس که عددهای ۱ تا ۱۰ را چاپ کند و کنار هر کدام even (زوج) یا odd (فرد) بنویسد. (راهنما: n % 2 برای عددهای زوج صفر است.)" }, a: { en: "for n in range(1, 11):\n    if n % 2 == 0:\n        print(n, \"even\")\n    else:\n        print(n, \"odd\")", fa: "for n in range(1, 11):\n    if n % 2 == 0:\n        print(n, \"even\")\n    else:\n        print(n, \"odd\")" } },
    { q: { en: "Write a function biggest(a, b) that returns the larger of two numbers, and print biggest(7, 12).", fa: "تابعی به اسم biggest(a, b) بنویس که بزرگ‌ترِ دو عدد را برگرداند و biggest(7, 12) را چاپ کن." }, a: { en: "def biggest(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(biggest(7, 12))", fa: "def biggest(a, b):\n    if a > b:\n        return a\n    else:\n        return b\n\nprint(biggest(7, 12))" } },
    { q: { en: "Why does print(\"10\" + 5) fail, and what are two ways to fix it?", fa: "چرا print(\"10\" + 5) خطا می‌دهد و دو راه رفعش چیست؟" }, a: { en: "\"10\" is text and 5 is a number. Either make both numbers — print(int(\"10\") + 5) gives 15 — or both text — print(\"10\" + str(5)) gives 105.", fa: "\"10\" متن است و 5 عدد. یا هر دو را عدد کن — print(int(\"10\") + 5) جواب ۱۵ می‌دهد — یا هر دو را متن — print(\"10\" + str(5)) جواب 105 می‌دهد." } }
  ],
  recap: { en: ["Python reads top to bottom, one instruction per line.", "A colon at the end of a line promises a block; the block is the lines indented by four spaces under it.", "= stores, == asks. Text lives in quotation marks.", "def makes a function, return gives its answer back.", "Read errors from the bottom line up."],
           fa: ["پایتون از بالا به پایین می‌خواند، هر خط یک دستور.", "دونقطه‌ی آخر خط وعده‌ی یک بلوک است؛ بلوک همان خط‌هایی است که زیرش چهار فاصله تورفته‌اند.", "= ذخیره می‌کند و == می‌پرسد. متن داخل نقل‌قول است.", "def تابع می‌سازد و return جوابش را برمی‌گرداند.", "خطا را از خط آخر به بالا بخوان."] }
};

window.LEARN.articles.push({
  id: "sql-from-zero", track: "programming", icon: "file", level: "beginner", minutes: 30, updated: "2026-11",
  title: { en: "SQL from zero: asking questions of data", fa: "SQL از صفر: سؤال‌پرسیدن از داده" },
  summary: { en: "What a database and a table are, and how to read, filter, sort, count, change and join data with SQL — every command explained word by word, with real output.",
             fa: "پایگاه‌داده و جدول چیست و چطور با SQL داده را بخوانی، فیلتر کنی، مرتب کنی، بشماری، تغییر بدهی و به هم وصل کنی — هر دستور کلمه‌به‌کلمه، با خروجی واقعی." },
  blocks: [
    { h: { en: "What is a database?", fa: "پایگاه‌داده چیست؟" } },
    { p: { en: "A database is an organised place to keep information so that it can be found again quickly. Think of a spreadsheet: a table has columns (name, city, grade) and rows (one row for each student). A database is a collection of such tables, kept by a program that can search millions of rows in a moment and let many people use them at once. Almost every app you use — a shop, a bank, a messaging service — keeps its information this way.",
           fa: "پایگاه‌داده جایی منظم برای نگه‌داشتن اطلاعات است تا بشود سریع دوباره پیدایش کرد. یک صفحه‌ی اکسل را تصور کن: جدول ستون دارد (نام، شهر، نمره) و ردیف (برای هر دانش‌آموز یک ردیف). پایگاه‌داده مجموعه‌ای از همین جدول‌هاست که برنامه‌ای نگهش می‌دارد؛ برنامه‌ای که میلیون‌ها ردیف را در یک لحظه جست‌وجو می‌کند و اجازه می‌دهد چند نفر هم‌زمان استفاده کنند. تقریباً هر برنامه‌ای که استفاده می‌کنی — فروشگاه، بانک، پیام‌رسان — اطلاعاتش را همین‌طور نگه می‌دارد." } },
    { p: { en: "SQL (say 'sequel' or 'S-Q-L') is the language for talking to that program. It is not a general programming language like Python: it does one thing — describe the data you want — and it reads almost like English. The same SQL works, with small differences, in SQLite, MySQL, PostgreSQL and Microsoft SQL Server. This lesson uses SQLite, which is also what the SQL tab of the practice lab runs.",
           fa: "SQL (بخوان «سی‌کوئل» یا «اس‌کیو‌ال») زبانِ حرف‌زدن با آن برنامه است. مثل پایتون یک زبان برنامه‌نویسی همه‌کاره نیست: یک کار می‌کند — توصیف داده‌ای که می‌خواهی — و تقریباً مثل انگلیسی خوانده می‌شود. همین SQL با تفاوت‌های کوچک در SQLite، MySQL، PostgreSQL و Microsoft SQL Server کار می‌کند. این درس از SQLite استفاده می‌کند؛ همان چیزی که زبانه‌ی SQL آزمایشگاه تمرین اجرا می‌کند." } },
    { list: { en: ["SQL words such as SELECT can be written in capitals or small letters. Capitals are a habit that makes them stand out.", "Every statement ends with a semicolon ;", "Text values go inside single quotation marks: 'Shiraz'. Numbers have no quotation marks.", "Spaces and line breaks do not matter; break long statements over several lines to make them readable."],
              fa: ["کلمه‌های SQL مثل SELECT را می‌شود با حروف بزرگ یا کوچک نوشت. حروف بزرگ فقط عادتی است که آن‌ها را مشخص‌تر می‌کند.", "هر دستور با نقطه‌ویرگول ; تمام می‌شود.", "مقدار متنی داخل نقل‌قول تکی می‌آید: 'Shiraz'. عدد نقل‌قول ندارد.", "فاصله و شکستن خط مهم نیست؛ دستورهای بلند را برای خوانایی در چند خط بنویس."] } },

    { h: { en: "Making a table: CREATE TABLE", fa: "ساختن جدول: CREATE TABLE" } },
    { code: "CREATE TABLE students (\n  id    INTEGER PRIMARY KEY,\n  name  TEXT NOT NULL,\n  city  TEXT,\n  grade INTEGER\n);", lang: "sql" },
    { p: { en: "Read it piece by piece. CREATE TABLE students makes a new, empty table called students. Inside the brackets is one line per column: its name, then the type of value it holds. INTEGER is a whole number and TEXT is text. PRIMARY KEY marks the column that identifies each row uniquely — the database fills in 1, 2, 3 by itself. NOT NULL means 'this column may not be left empty'.",
           fa: "تکه‌تکه بخوانش. CREATE TABLE students یک جدول جدید و خالی به اسم students می‌سازد. داخل پرانتز برای هر ستون یک خط هست: اسم ستون و بعد نوع مقداری که نگه می‌دارد. INTEGER عدد صحیح است و TEXT متن. PRIMARY KEY ستونی را مشخص می‌کند که هر ردیف را یکتا می‌شناسد — پایگاه‌داده خودش ۱، ۲، ۳ را پر می‌کند. NOT NULL یعنی «این ستون نباید خالی بماند»." } },

    { h: { en: "Adding rows: INSERT", fa: "اضافه‌کردن ردیف: INSERT" } },
    { code: "INSERT INTO students (name, city, grade) VALUES ('Ali', 'Shiraz', 17);\n\nINSERT INTO students (name, city, grade) VALUES\n  ('Sara', 'Tehran', 19),\n  ('Reza', 'Shiraz', 14),\n  ('Mina', 'Isfahan', 18),\n  ('Omid', 'Tehran', 12),\n  ('Neda', 'Shiraz', 20);", lang: "sql",
      cap: { en: "After INTO comes the table and the list of columns; after VALUES come the values in the same order. Several rows can be added at once, separated by commas.", fa: "بعد از INTO اسم جدول و فهرست ستون‌ها می‌آید و بعد از VALUES مقدارها به همان ترتیب. چند ردیف را می‌شود یک‌جا و با کاما اضافه کرد." } },

    { h: { en: "Reading: SELECT", fa: "خواندن: SELECT" } },
    { p: { en: "SELECT is the command you will use ninety per cent of the time. Its shape is: SELECT which columns FROM which table. A star means 'all columns'.",
           fa: "SELECT دستوری است که نود درصد وقت‌ها استفاده می‌کنی. شکلش این است: SELECT کدام ستون‌ها FROM کدام جدول. ستاره یعنی «همه‌ی ستون‌ها»." } },
    { term: "sqlite> SELECT * FROM students;\nid|name|city|grade\n1|Ali|Shiraz|17\n2|Sara|Tehran|19\n3|Reza|Shiraz|14\n4|Mina|Isfahan|18\n5|Omid|Tehran|12\n6|Neda|Shiraz|20",
      cap: { en: "Six rows, four columns. The id column was filled in automatically.", fa: "شش ردیف و چهار ستون. ستون id خودکار پر شده است." } },

    { h: { en: "Filtering: WHERE", fa: "فیلترکردن: WHERE" } },
    { p: { en: "WHERE keeps only the rows for which a condition is true. Note that SQL uses a single = to compare — unlike Python's ==.",
           fa: "WHERE فقط ردیف‌هایی را نگه می‌دارد که شرط برایشان درست باشد. دقت کن که SQL برای مقایسه یک = تکی دارد — برخلاف == در پایتون." } },
    { term: "sqlite> SELECT name, grade FROM students WHERE grade >= 18;\nname|grade\nSara|19\nMina|18\nNeda|20\nsqlite> SELECT name, city FROM students WHERE city = 'Shiraz' AND grade > 15;\nname|city\nAli|Shiraz\nNeda|Shiraz\nsqlite> SELECT name FROM students WHERE name LIKE 'S%';\nname\nSara",
      cap: { en: "AND needs both conditions. LIKE compares against a pattern, where % stands for 'anything'.", fa: "AND هر دو شرط را لازم دارد. LIKE با یک الگو مقایسه می‌کند و % یعنی «هر چیزی»." } },
    { table: { head: { en: ["Condition", "Meaning"], fa: ["شرط", "معنی"] }, rows: [
      ["grade = 20", { en: "exactly 20", fa: "دقیقاً ۲۰" }],
      ["grade <> 20", { en: "not 20 (also written !=)", fa: "غیر از ۲۰ (به شکل != هم نوشته می‌شود)" }],
      ["grade BETWEEN 10 AND 15", { en: "from 10 to 15, both included", fa: "از ۱۰ تا ۱۵، هر دو شامل" }],
      ["city IN ('Shiraz', 'Tehran')", { en: "any value in the list", fa: "هر مقداری از فهرست" }],
      ["name LIKE '%a'", { en: "ends with a", fa: "با a تمام می‌شود" }],
      ["city IS NULL", { en: "the column is empty (never write = NULL)", fa: "ستون خالی است (هیچ‌وقت = NULL ننویس)" }],
      ["NOT, AND, OR", { en: "combine conditions; use brackets when you mix AND with OR", fa: "ترکیب شرط‌ها؛ وقتی AND و OR را با هم می‌آوری پرانتز بگذار" }]
    ] } },

    { h: { en: "Sorting and limiting: ORDER BY, LIMIT", fa: "مرتب‌کردن و محدودکردن: ORDER BY و LIMIT" } },
    { term: "sqlite> SELECT name, grade FROM students ORDER BY grade DESC LIMIT 3;\nname|grade\nNeda|20\nSara|19\nMina|18",
      cap: { en: "ORDER BY sorts; DESC means largest first (ASC, the default, means smallest first). LIMIT 3 keeps the first three rows — together: the top three.", fa: "ORDER BY مرتب می‌کند؛ DESC یعنی اول بزرگ‌ترین (ASC که پیش‌فرض است یعنی اول کوچک‌ترین). LIMIT 3 سه ردیف اول را نگه می‌دارد — با هم: سه نفر برتر." } },
    { note: { en: "A table has no fixed order of its own. If the order matters, always say ORDER BY.", fa: "جدول از خودش ترتیب ثابتی ندارد. اگر ترتیب مهم است همیشه ORDER BY بنویس." }, kind: "tip" },

    { h: { en: "Counting and averaging", fa: "شمردن و میانگین‌گرفتن" } },
    { term: "sqlite> SELECT COUNT(*), AVG(grade), MAX(grade), MIN(grade) FROM students;\nCOUNT(*)|AVG(grade)|MAX(grade)|MIN(grade)\n6|16.666666666666668|20|12",
      cap: { en: "These functions squeeze many rows into one answer: how many, the average, the largest, the smallest. SUM adds them up.", fa: "این تابع‌ها چندین ردیف را به یک جواب تبدیل می‌کنند: تعداد، میانگین، بزرگ‌ترین، کوچک‌ترین. SUM جمعشان را می‌دهد." } },

    { h: { en: "One answer per group: GROUP BY", fa: "برای هر گروه یک جواب: GROUP BY" } },
    { p: { en: "GROUP BY city sorts the rows into piles, one pile per city, and then the counting functions give one answer for each pile. This single idea produces most of the reports in the world: sales per month, tickets per department, failed logins per address.",
           fa: "GROUP BY city ردیف‌ها را دسته‌دسته می‌کند، برای هر شهر یک دسته، و بعد تابع‌های شمارش برای هر دسته یک جواب می‌دهند. همین یک ایده بیشتر گزارش‌های دنیا را می‌سازد: فروش در هر ماه، تیکت در هر بخش، ورود ناموفق از هر آدرس." } },
    { term: "sqlite> SELECT city, COUNT(*) AS students, AVG(grade) AS average\n   ...> FROM students GROUP BY city ORDER BY average DESC;\ncity|students|average\nIsfahan|1|18.0\nShiraz|3|17.0\nTehran|2|15.5\nsqlite> SELECT city, COUNT(*) AS n FROM students GROUP BY city HAVING COUNT(*) >= 2;\ncity|n\nShiraz|3\nTehran|2",
      cap: { en: "AS gives a column a readable name. HAVING filters the groups after counting — WHERE filters rows before it.", fa: "AS به ستون یک اسم خوانا می‌دهد. HAVING گروه‌ها را بعد از شمارش فیلتر می‌کند — WHERE ردیف‌ها را قبل از آن." } },

    { h: { en: "Changing and deleting: UPDATE, DELETE", fa: "تغییر و حذف: UPDATE و DELETE" } },
    { term: "sqlite> UPDATE students SET grade = 15 WHERE name = 'Reza';\nsqlite> SELECT name, grade FROM students WHERE name = 'Reza';\nname|grade\nReza|15\nsqlite> DELETE FROM students WHERE grade < 13;\nsqlite> SELECT COUNT(*) FROM students;\nCOUNT(*)\n5",
      cap: { en: "UPDATE changes values in the rows that match; DELETE removes the rows that match.", fa: "UPDATE مقدارها را در ردیف‌های جور عوض می‌کند و DELETE ردیف‌های جور را حذف می‌کند." } },
    { note: { en: "UPDATE and DELETE without WHERE act on every row in the table, and there is no undo. Write the WHERE first; better still, run the same condition as a SELECT first to see which rows will be touched.", fa: "UPDATE و DELETE بدون WHERE روی همه‌ی ردیف‌های جدول اثر می‌گذارند و برگشتی ندارد. اول WHERE را بنویس؛ بهتر از آن، همان شرط را اول با SELECT اجرا کن تا ببینی کدام ردیف‌ها تغییر می‌کنند." }, kind: "warn" },

    { h: { en: "Connecting tables: JOIN", fa: "وصل‌کردن جدول‌ها: JOIN" } },
    { p: { en: "Real databases split information over several tables so that nothing is written twice. Here a second table, courses, stores which student takes which course by keeping the student's id — not the name. A JOIN puts the two tables side by side wherever the ids match.",
           fa: "پایگاه‌داده‌های واقعی اطلاعات را بین چند جدول تقسیم می‌کنند تا هیچ‌چیز دو بار نوشته نشود. اینجا جدول دومی به اسم courses با نگه‌داشتن id دانش‌آموز — نه اسمش — ثبت می‌کند هر دانش‌آموز چه درسی دارد. JOIN دو جدول را هر جا id‌ها یکی باشند کنار هم می‌گذارد." } },
    { code: "CREATE TABLE courses (id INTEGER PRIMARY KEY, title TEXT, student_id INTEGER);\nINSERT INTO courses (title, student_id) VALUES\n  ('Linux', 1), ('Python', 1), ('Networking', 2), ('Python', 6);", lang: "sql" },
    { term: "sqlite> SELECT students.name, courses.title\n   ...> FROM courses JOIN students ON students.id = courses.student_id\n   ...> ORDER BY students.name;\nname|title\nAli|Linux\nAli|Python\nNeda|Python\nSara|Networking\nsqlite> SELECT students.name, COUNT(courses.id) AS courses\n   ...> FROM students LEFT JOIN courses ON students.id = courses.student_id\n   ...> GROUP BY students.id ORDER BY courses DESC;\nname|courses\nAli|2\nSara|1\nNeda|1\nReza|0\nMina|0",
      cap: { en: "JOIN shows only students who have a course. LEFT JOIN keeps every student and shows 0 for those without one.", fa: "JOIN فقط دانش‌آموزهایی را نشان می‌دهد که درس دارند. LEFT JOIN همه‌ی دانش‌آموزها را نگه می‌دارد و برای بی‌درس‌ها صفر نشان می‌دهد." } },
    { p: { en: "The ON part is the rule for matching: 'a course belongs to the student whose id equals the course's student_id'. Writing table.column (students.name) says which table a column comes from, which is required when both tables have a column with the same name, such as id.",
           fa: "بخش ON قانونِ جورکردن است: «هر درس مال دانش‌آموزی است که id او برابر student_id آن درس باشد». نوشتن table.column (مثل students.name) می‌گوید ستون از کدام جدول است و وقتی هر دو جدول ستونی هم‌نام مثل id دارند لازم است." } },

    { h: { en: "The order SQL thinks in", fa: "ترتیبی که SQL با آن فکر می‌کند" } },
    { p: { en: "You write SELECT first, but the database does not start there. Knowing the real order explains most confusing errors — for example, why you cannot use a name made with AS inside WHERE.",
           fa: "تو اول SELECT را می‌نویسی ولی پایگاه‌داده از آنجا شروع نمی‌کند. دانستن ترتیب واقعی بیشتر خطاهای گیج‌کننده را توضیح می‌دهد — مثلاً اینکه چرا نمی‌شود اسمی را که با AS ساخته‌ای داخل WHERE استفاده کرد." } },
    { table: { head: { en: ["Step", "Clause", "What happens"], fa: ["قدم", "بخش", "چه می‌شود"] }, rows: [
      ["1", "FROM / JOIN", { en: "Choose and connect the tables", fa: "انتخاب و وصل‌کردن جدول‌ها" }],
      ["2", "WHERE", { en: "Throw away rows that don't match", fa: "دورریختن ردیف‌هایی که جور نیستند" }],
      ["3", "GROUP BY", { en: "Sort the remaining rows into groups", fa: "دسته‌بندی ردیف‌های باقی‌مانده" }],
      ["4", "HAVING", { en: "Throw away groups that don't match", fa: "دورریختن گروه‌هایی که جور نیستند" }],
      ["5", "SELECT", { en: "Pick the columns and calculate", fa: "انتخاب ستون‌ها و محاسبه" }],
      ["6", "ORDER BY", { en: "Sort the result", fa: "مرتب‌کردن نتیجه" }],
      ["7", "LIMIT", { en: "Keep the first rows", fa: "نگه‌داشتن ردیف‌های اول" }]
    ] } },

    { h: { en: "Reading SQL errors", fa: "خواندن خطاهای SQL" } },
    { term: "sqlite> SELECT * FROM student;\nError: no such table: student\nsqlite> SELECT name FROM students WHERE grade > ;\nError: near \";\": syntax error\nsqlite> INSERT INTO students (city) VALUES ('Yazd');\nError: NOT NULL constraint failed: students.name",
      cap: { en: "A misspelt table name; an unfinished condition ('near' points at the place where SQL got lost); and a rule of the table being broken.", fa: "اسم جدول با غلط املایی؛ شرط ناتمام (کلمه‌ی near جایی را نشان می‌دهد که SQL گم شده)؛ و شکستن یکی از قانون‌های جدول." } },

    { h: { en: "For professionals: keeping data safe and fast", fa: "برای حرفه‌ای‌ها: داده‌ی امن و سریع" } },
    { list: { en: ["Never build SQL by gluing in text that a user typed. That is how SQL injection — one of the most common attacks on websites — works. Use placeholders instead: in Python,  db.execute(\"SELECT * FROM students WHERE name = ?\", (name,)) .", "An index is like the index at the back of a book: CREATE INDEX idx_city ON students(city); makes searches on that column fast, at the cost of slightly slower inserts.", "A transaction groups several changes so that either all happen or none: BEGIN; … COMMIT; (or ROLLBACK; to cancel). Banks depend on it.", "A foreign key tells the database that courses.student_id must point to a real student, so it refuses orphaned rows.", "Back up the database before every risky change. For SQLite the whole database is one file you can copy."],
              fa: ["هیچ‌وقت SQL را با چسباندن متنی که کاربر تایپ کرده نساز. «تزریق SQL» — یکی از رایج‌ترین حمله‌ها به وب‌سایت‌ها — همین‌طور کار می‌کند. به‌جایش از جای‌نگه‌دار استفاده کن: در پایتون،  db.execute(\"SELECT * FROM students WHERE name = ?\", (name,)) .", "ایندکس مثل نمایه‌ی آخر کتاب است: CREATE INDEX idx_city ON students(city); جست‌وجو روی آن ستون را سریع می‌کند، به قیمت کمی کندترشدن INSERT.", "تراکنش چند تغییر را یکی می‌کند تا یا همه انجام شوند یا هیچ‌کدام: BEGIN; … COMMIT; (یا ROLLBACK; برای لغو). بانک‌ها به آن وابسته‌اند.", "کلید خارجی به پایگاه‌داده می‌گوید courses.student_id باید به یک دانش‌آموز واقعی اشاره کند، پس ردیف بی‌صاحب را قبول نمی‌کند.", "قبل از هر تغییر پرخطر از پایگاه‌داده پشتیبان بگیر. در SQLite کل پایگاه‌داده یک فایل است که می‌شود کپی‌اش کرد."] } },
    { p: { en: "The Helpdesk Tracker in the Tools section is built on exactly these commands: INSERT to open a ticket, UPDATE to close it, and GROUP BY for the monthly report. Open its build tutorial after this lesson and you will be able to read every query in it.",
           fa: "«سامانه‌ی ثبت درخواست‌های IT» در بخش ابزارها دقیقاً روی همین دستورها ساخته شده: INSERT برای ثبت تیکت، UPDATE برای بستنش و GROUP BY برای گزارش ماهانه. بعد از این درس آموزش ساختش را باز کن؛ همه‌ی کوئری‌هایش را می‌توانی بخوانی." } }
  ]
});
window.LEARN.study["sql-from-zero"] = {
  goals: { en: ["Explain what a table, a row, a column and a primary key are", "Read data with SELECT, WHERE, ORDER BY and LIMIT", "Summarise with COUNT, AVG and GROUP BY, and connect two tables with JOIN", "Change data safely with INSERT, UPDATE and DELETE"],
           fa: ["توضیح بدهی جدول، ردیف، ستون و کلید اصلی چیست", "با SELECT، WHERE، ORDER BY و LIMIT داده بخوانی", "با COUNT، AVG و GROUP BY خلاصه بسازی و با JOIN دو جدول را وصل کنی", "با INSERT، UPDATE و DELETE داده را ایمن تغییر بدهی"] },
  mistakes: { en: ["Forgetting the semicolon, so the database waits for more.", "Double quotation marks or no quotation marks around text: write 'Shiraz'.", "DELETE or UPDATE without WHERE.", "Writing = NULL instead of IS NULL.", "Selecting a column that is neither in GROUP BY nor inside a function such as COUNT."],
              fa: ["جاانداختن نقطه‌ویرگول، که باعث می‌شود پایگاه‌داده منتظر ادامه بماند.", "نقل‌قول دوتایی یا بدون نقل‌قول دور متن: بنویس 'Shiraz'.", "DELETE یا UPDATE بدون WHERE.", "نوشتن = NULL به‌جای IS NULL.", "انتخاب ستونی که نه در GROUP BY آمده و نه داخل تابعی مثل COUNT است."] },
  practice: [
    { q: { en: "Show the name and city of every student, sorted by name.", fa: "نام و شهر همه‌ی دانش‌آموزها را به ترتیب نام نشان بده." }, a: { en: "SELECT name, city FROM students ORDER BY name;", fa: "SELECT name, city FROM students ORDER BY name;" } },
    { q: { en: "Show the students from Tehran or Isfahan whose grade is at least 15.", fa: "دانش‌آموزهای تهران یا اصفهان را که نمره‌شان دست‌کم ۱۵ است نشان بده." }, a: { en: "SELECT * FROM students\nWHERE city IN ('Tehran', 'Isfahan') AND grade >= 15;", fa: "SELECT * FROM students\nWHERE city IN ('Tehran', 'Isfahan') AND grade >= 15;" } },
    { q: { en: "Which city has the highest average grade? Show only that one row.", fa: "کدام شهر بالاترین میانگین نمره را دارد؟ فقط همان یک ردیف را نشان بده." }, a: { en: "SELECT city, AVG(grade) AS average FROM students\nGROUP BY city ORDER BY average DESC LIMIT 1;", fa: "SELECT city, AVG(grade) AS average FROM students\nGROUP BY city ORDER BY average DESC LIMIT 1;" } },
    { q: { en: "Add one point to the grade of every student in Shiraz.", fa: "به نمره‌ی همه‌ی دانش‌آموزهای شیراز یک نمره اضافه کن." }, a: { en: "UPDATE students SET grade = grade + 1 WHERE city = 'Shiraz';", fa: "UPDATE students SET grade = grade + 1 WHERE city = 'Shiraz';" } },
    { q: { en: "List each course title with the number of students taking it.", fa: "عنوان هر درس را با تعداد دانش‌آموزهایش فهرست کن." }, a: { en: "SELECT title, COUNT(*) AS students FROM courses GROUP BY title;", fa: "SELECT title, COUNT(*) AS students FROM courses GROUP BY title;" } }
  ],
  recap: { en: ["A table is rows and columns; SQL describes the rows you want.", "SELECT columns FROM table WHERE condition ORDER BY column LIMIT n;", "GROUP BY makes one row per group; JOIN … ON connects tables through ids.", "No WHERE on UPDATE or DELETE means every row.", "Never glue user input into SQL — use placeholders."],
           fa: ["جدول یعنی ردیف و ستون؛ SQL ردیف‌هایی را که می‌خواهی توصیف می‌کند.", "SELECT ستون‌ها FROM جدول WHERE شرط ORDER BY ستون LIMIT تعداد;", "GROUP BY برای هر گروه یک ردیف می‌سازد و JOIN … ON جدول‌ها را از راه id وصل می‌کند.", "UPDATE یا DELETE بدون WHERE یعنی همه‌ی ردیف‌ها.", "ورودی کاربر را هیچ‌وقت به SQL نچسبان — از جای‌نگه‌دار استفاده کن."] }
};

window.LEARN.articles.push({
  id: "linux-text-tools", track: "linux", icon: "terminal", level: "intermediate", minutes: 26, updated: "2026-11",
  title: { en: "Text tools and pipes: answers from any file", fa: "ابزارهای متن و پایپ: جواب‌گرفتن از هر فایل" },
  summary: { en: "grep, cut, sort, uniq, wc, tr, sed and awk — and the pipe that joins them. Learn to turn a raw log into an answer with one line.",
             fa: "grep، cut، sort، uniq، wc، tr، sed و awk — و پایپی که آن‌ها را به هم وصل می‌کند. یاد بگیر یک لاگ خام را با یک خط به جواب تبدیل کنی." },
  blocks: [
    { h: { en: "The idea: small tools, joined together", fa: "ایده: ابزارهای کوچک، وصل به هم" } },
    { p: { en: "Linux does not have one giant program for analysing text. It has many small ones, each doing a single job well: one finds lines, one cuts columns, one sorts, one counts. The power comes from joining them. Each tool reads text, changes it a little and passes it on, like workers on a production line. Once you know eight of these tools, you can answer questions about any log, list or export file without opening a spreadsheet.",
           fa: "لینوکس برای تحلیل متن یک برنامه‌ی غول‌پیکر ندارد. چندین برنامه‌ی کوچک دارد که هر کدام یک کار را خوب انجام می‌دهد: یکی خط پیدا می‌کند، یکی ستون می‌بُرد، یکی مرتب می‌کند و یکی می‌شمارد. قدرت از وصل‌کردنشان می‌آید. هر ابزار متن را می‌خواند، کمی تغییرش می‌دهد و به بعدی می‌دهد، مثل کارگرهای یک خط تولید. وقتی هشت‌تا از این ابزارها را بلد باشی، بدون بازکردن اکسل درباره‌ی هر لاگ، فهرست یا فایل خروجی می‌توانی جواب بگیری." } },
    { p: { en: "All the examples use two small files. auth.log is a login log with one event per line, and staff.csv is a list with commas between the fields.",
           fa: "همه‌ی مثال‌ها از دو فایل کوچک استفاده می‌کنند. auth.log یک لاگ ورود است که هر خطش یک رویداد است و staff.csv فهرستی است که بین خانه‌هایش کاما دارد." } },
    { code: "Nov 10 09:12:01 srv sshd[811]: Accepted password for sara from 192.168.1.20\nNov 10 09:40:13 srv sshd[902]: Failed password for root from 203.0.113.45\nNov 10 09:40:15 srv sshd[902]: Failed password for root from 203.0.113.45\nNov 10 09:40:18 srv sshd[902]: Failed password for admin from 203.0.113.45\nNov 10 10:02:44 srv sshd[955]: Accepted password for ali from 192.168.1.31\nNov 10 11:30:09 srv sshd[990]: Failed password for admin from 198.51.100.77\nNov 10 11:31:10 srv sshd[991]: Failed password for root from 198.51.100.77\nNov 10 12:05:00 srv sshd[1002]: Accepted password for sara from 192.168.1.20", lang: "auth.log" },

    { h: { en: "The pipe: |", fa: "پایپ: |" } },
    { p: { en: "The vertical bar is called a pipe. It takes everything the command on its left prints and feeds it to the command on its right, instead of showing it on the screen. Read it as 'and then'.",
           fa: "خط عمودی «پایپ» نام دارد. هر چه دستور سمت چپش چاپ می‌کند را به‌جای نمایش روی صفحه به دستور سمت راستش می‌دهد. آن را «و بعد» بخوان." } },
    { term: "$ wc -l auth.log\n8 auth.log\n$ grep Failed auth.log | wc -l\n5",
      cap: { en: "Find the lines with 'Failed', and then count them: 5 of the 8 logins failed.", fa: "خط‌هایی را که Failed دارند پیدا کن و بعد بشمار: از ۸ ورود، ۵تا ناموفق بوده." } },

    { h: { en: "grep: keep the lines that match", fa: "grep: خط‌های جور را نگه دار" } },
    { table: { head: { en: ["Option", "Effect"], fa: ["گزینه", "اثر"] }, rows: [
      ["grep word file", { en: "lines that contain the word", fa: "خط‌هایی که کلمه را دارند" }],
      ["-i", { en: "ignore capital and small letters", fa: "نادیده‌گرفتن بزرگی و کوچکی حروف" }],
      ["-v", { en: "lines that do NOT contain it", fa: "خط‌هایی که آن را ندارند" }],
      ["-c", { en: "only count the matching lines", fa: "فقط شمردن خط‌های جور" }],
      ["-n", { en: "show line numbers", fa: "نمایش شماره‌ی خط" }],
      ["-r", { en: "search every file under a folder", fa: "جست‌وجو در همه‌ی فایل‌های زیر یک پوشه" }],
      ["-E \"a|b\"", { en: "this OR that", fa: "این یا آن" }],
      ["-A 2 / -B 2", { en: "also show 2 lines after / before each match", fa: "دو خط بعد / قبل از هر مورد را هم نشان بده" }]
    ] } },
    { term: "$ grep -E \"root|admin\" auth.log | wc -l\n5\n$ grep -n \"ali\" auth.log\n5:Nov 10 10:02:44 srv sshd[955]: Accepted password for ali from 192.168.1.31",
      cap: { en: "Five attempts used the names root or admin; ali logged in on line 5.", fa: "پنج تلاش با نام‌های root یا admin بوده؛ ali در خط ۵ وارد شده." } },

    { h: { en: "cut and awk: take one column", fa: "cut و awk: برداشتن یک ستون" } },
    { p: { en: "cut splits each line at a separator and keeps the fields you ask for: -d sets the separator and -f the field numbers. It is perfect for tidy files such as CSV.",
           fa: "cut هر خط را از محل یک جداکننده می‌شکند و خانه‌هایی را که می‌خواهی نگه می‌دارد: -d جداکننده را تعیین می‌کند و -f شماره‌ی خانه‌ها را. برای فایل‌های مرتب مثل CSV عالی است." } },
    { term: "$ cut -d, -f1,2 staff.csv\nname,dept\nSara,Reception\nAli,IT\nMina,Accounting\nReza,IT\nNeda,Reception",
      cap: { en: "Fields 1 and 2, split at the comma.", fa: "خانه‌های ۱ و ۲، با جداکننده‌ی کاما." } },
    { p: { en: "Log lines are separated by a varying number of spaces, where cut struggles. awk handles them: it splits every line into words automatically and names them $1, $2, $3 …; $NF is always the last word. awk can also test a condition before printing.",
           fa: "خط‌های لاگ با تعداد متغیری فاصله جدا شده‌اند و cut با آن‌ها مشکل دارد. awk از پسشان برمی‌آید: هر خط را خودکار به کلمه‌ها می‌شکند و اسمشان را $1، $2، $3 و … می‌گذارد؛ $NF همیشه آخرین کلمه است. awk می‌تواند قبل از چاپ شرط هم بررسی کند." } },
    { term: "$ grep Failed auth.log | awk '{print $NF}'\n203.0.113.45\n203.0.113.45\n203.0.113.45\n198.51.100.77\n198.51.100.77\n$ awk -F, '$2 == \"IT\" {print $1, $3}' staff.csv\nAli 102\nReza 104",
      cap: { en: "The last word of each failed line is the attacker's address. In the second command -F, sets the separator, and only rows whose second field is IT are printed.", fa: "آخرین کلمه‌ی هر خط ناموفق آدرس مهاجم است. در دستور دوم -F, جداکننده را تعیین می‌کند و فقط ردیف‌هایی چاپ می‌شوند که خانه‌ی دومشان IT است." } },

    { h: { en: "sort and uniq: order and count", fa: "sort و uniq: ترتیب و شمارش" } },
    { p: { en: "sort puts lines in order. uniq removes repeated lines — but only when they are next to each other, which is why it nearly always follows sort. With -c, uniq writes how many times each line appeared. A final sort -rn puts the biggest number first. This four-part chain is the most useful sentence in all of log analysis.",
           fa: "sort خط‌ها را مرتب می‌کند. uniq خط‌های تکراری را حذف می‌کند — ولی فقط وقتی کنار هم باشند، برای همین تقریباً همیشه بعد از sort می‌آید. uniq با -c می‌نویسد هر خط چند بار آمده. یک sort -rn در آخر بزرگ‌ترین عدد را اول می‌گذارد. این زنجیره‌ی چهارتکه مفیدترین جمله در کل تحلیل لاگ است." } },
    { term: "$ grep Failed auth.log | awk '{print $NF}' | sort | uniq -c | sort -rn\n      3 203.0.113.45\n      2 198.51.100.77\n$ cut -d, -f2 staff.csv | tail -n +2 | sort | uniq -c\n      1 Accounting\n      2 IT\n      2 Reception",
      cap: { en: "Who attacked most often, and how many people work in each department. tail -n +2 skips the header line.", fa: "چه کسی بیشتر حمله کرده و در هر بخش چند نفر کار می‌کنند. tail -n +2 از خط عنوان رد می‌شود." } },
    { list: { en: ["sort -n  sorts as numbers (so 9 comes before 10);  -r  reverses;  -u  removes duplicates.", "sort -t, -k2  sorts a CSV by its second field.", "sort | uniq -c | sort -rn | head -5  gives a 'top five' of anything."],
              fa: ["sort -n  به شکل عدد مرتب می‌کند (تا ۹ قبل از ۱۰ بیاید)؛  -r  برعکس می‌کند؛  -u  تکراری‌ها را حذف می‌کند.", "sort -t, -k2  یک CSV را بر اساس خانه‌ی دوم مرتب می‌کند.", "sort | uniq -c | sort -rn | head -5  از هر چیزی «پنج‌تای برتر» می‌دهد."] } },

    { h: { en: "tr and sed: change the text", fa: "tr و sed: تغییر متن" } },
    { term: "$ echo \"hello\" | tr a-z A-Z\nHELLO\n$ echo \"one two three\" | tr \" \" \"\\n\"\none\ntwo\nthree\n$ sed \"s/Failed/FAILED/\" auth.log | head -3\nNov 10 09:12:01 srv sshd[811]: Accepted password for sara from 192.168.1.20\nNov 10 09:40:13 srv sshd[902]: FAILED password for root from 203.0.113.45\nNov 10 09:40:15 srv sshd[902]: FAILED password for root from 203.0.113.45",
      cap: { en: "tr swaps single characters. sed's s/old/new/ replaces text on every line.", fa: "tr نویسه‌های تکی را عوض می‌کند. s/old/new/ در sed متن را در هر خط جایگزین می‌کند." } },
    { list: { en: ["s/old/new/g  replaces every occurrence on a line, not only the first.", "sed -n '5,10p' file  prints only lines 5 to 10.", "sed -i 's/old/new/g' file  changes the file itself. Make a copy first — there is no undo."],
              fa: ["s/old/new/g  همه‌ی موردهای یک خط را جایگزین می‌کند، نه فقط اولی را.", "sed -n '5,10p' file  فقط خط‌های ۵ تا ۱۰ را چاپ می‌کند.", "sed -i 's/old/new/g' file  خود فایل را تغییر می‌دهد. اول یک کپی بگیر — برگشتی ندارد."] } },

    { h: { en: "Sending output to a file: redirection", fa: "فرستادن خروجی به فایل: تغییر مسیر" } },
    { p: { en: "Every command has two output channels: normal results, and error messages. > sends the normal results to a file, >> adds to a file, and 2> sends the errors. This lets you keep a clean result while collecting the errors somewhere else — or throw them away by sending them to /dev/null, the system's bottomless bin.",
           fa: "هر دستور دو کانال خروجی دارد: نتیجه‌ی عادی و پیام خطا. > نتیجه‌ی عادی را به فایل می‌فرستد، >> به فایل اضافه می‌کند و 2> خطاها را می‌فرستد. این‌طور می‌توانی نتیجه‌ی تمیز را نگه داری و خطاها را جای دیگری جمع کنی — یا با فرستادن به /dev/null، سطل بی‌انتهای سیستم، دورشان بریزی." } },
    { term: "$ grep Failed auth.log > failed.txt; wc -l < failed.txt\n5\n$ ls nofile 2> errors.txt; cat errors.txt\nls: cannot access 'nofile': No such file or directory",
      cap: { en: "> saved the result; 2> saved the error message instead of showing it.", fa: "> نتیجه را ذخیره کرد و 2> پیام خطا را به‌جای نمایش ذخیره کرد." } },

    { h: { en: "Building a pipeline step by step", fa: "ساختن یک زنجیره، قدم‌به‌قدم" } },
    { p: { en: "Nobody writes a long pipeline in one go. You add one tool, look at the output, then add the next. Question: at which hours of the day do logins happen?",
           fa: "هیچ‌کس یک زنجیره‌ی بلند را یک‌جا نمی‌نویسد. یک ابزار اضافه می‌کنی، خروجی را می‌بینی و بعد ابزار بعدی را. سؤال: ورودها در چه ساعت‌هایی از روز رخ می‌دهد؟" } },
    { list: { en: ["cat auth.log — look at the data. The time is the third word.", "… | awk '{print $3}' — keep only the time: 09:12:01.", "… | cut -d: -f1 — keep only the hour, the part before the first colon.", "… | sort | uniq -c — count each hour."],
              fa: ["cat auth.log — داده را ببین. زمان کلمه‌ی سوم است.", "… | awk '{print $3}' — فقط زمان را نگه دار: 09:12:01.", "… | cut -d: -f1 — فقط ساعت را نگه دار، یعنی بخش قبل از اولین دونقطه.", "… | sort | uniq -c — هر ساعت را بشمار."] } },
    { term: "$ cat auth.log | awk '{print $3}' | cut -d: -f1 | sort | uniq -c\n      4 09\n      1 10\n      2 11\n      1 12",
      cap: { en: "Four events at nine o'clock — worth a closer look.", fa: "چهار رویداد در ساعت نه — ارزش نگاه دقیق‌تر را دارد." } },

    { h: { en: "For professionals", fa: "برای حرفه‌ای‌ها" } },
    { list: { en: ["journalctl -u ssh --since \"1 hour ago\"  reads the system journal on modern Linux; pipe it into the same tools.", "tail -f file | grep --line-buffered Failed  watches a log live and shows only what matters.", "xargs turns lines into arguments:  find . -name \"*.tmp\" | xargs rm .", "tee writes to a file and to the screen at once:  command | tee result.txt .", "For JSON logs use jq; for anything larger than a few gigabytes, look at ripgrep (rg), which is much faster than grep.", "When a pipeline grows past one line, move it into a script — the next lesson on the path."],
              fa: ["journalctl -u ssh --since \"1 hour ago\"  در لینوکس‌های جدید ژورنال سیستم را می‌خواند؛ خروجی‌اش را به همین ابزارها بده.", "tail -f file | grep --line-buffered Failed  لاگ را زنده تماشا می‌کند و فقط چیزهای مهم را نشان می‌دهد.", "xargs خط‌ها را به آرگومان تبدیل می‌کند:  find . -name \"*.tmp\" | xargs rm .", "tee هم‌زمان در فایل و روی صفحه می‌نویسد:  command | tee result.txt .", "برای لاگ JSON از jq استفاده کن؛ برای فایل‌های بزرگ‌تر از چند گیگابایت ripgrep (rg) را ببین که خیلی سریع‌تر از grep است.", "وقتی زنجیره از یک خط بلندتر شد، آن را به اسکریپت منتقل کن — درس بعدیِ همین مسیر."] } }
  ]
});
window.LEARN.study["linux-text-tools"] = {
  goals: { en: ["Join commands with a pipe and read the result of each step", "Pick lines with grep, columns with cut and awk, and count with sort | uniq -c", "Save results and errors to files with >, >> and 2>"],
           fa: ["دستورها را با پایپ وصل کنی و نتیجه‌ی هر قدم را بخوانی", "با grep خط، با cut و awk ستون انتخاب کنی و با sort | uniq -c بشماری", "نتیجه و خطا را با >، >> و 2> در فایل ذخیره کنی"] },
  mistakes: { en: ["Using uniq without sort first — repeated lines that are not neighbours are not merged.", "Sorting numbers without -n, so 10 comes before 9.", "Using > when you meant >>, and wiping the file.", "Writing awk programs in double quotes, so the shell replaces $1 before awk sees it. Use single quotes."],
              fa: ["استفاده از uniq بدون sort قبلش — خط‌های تکراری که کنار هم نیستند یکی نمی‌شوند.", "مرتب‌کردن عدد بدون -n، که باعث می‌شود ۱۰ قبل از ۹ بیاید.", "نوشتن > وقتی منظور >> بوده و پاک‌شدن فایل.", "نوشتن برنامه‌ی awk داخل نقل‌قول دوتایی، که باعث می‌شود شل قبل از awk مقدار $1 را جایگزین کند. نقل‌قول تکی بگذار."] },
  practice: [
    { q: { en: "How many successful logins are in auth.log?", fa: "چند ورود موفق در auth.log هست؟" }, a: { en: "grep -c Accepted auth.log", fa: "grep -c Accepted auth.log" } },
    { q: { en: "List the user names that logged in successfully, each once. (The name is the 9th word.)", fa: "نام کاربرهایی را که موفق وارد شده‌اند، هر کدام یک بار، فهرست کن. (نام کلمه‌ی نهم است.)" }, a: { en: "grep Accepted auth.log | awk '{print $9}' | sort -u", fa: "grep Accepted auth.log | awk '{print $9}' | sort -u" } },
    { q: { en: "Which user name was attacked most often?", fa: "کدام نام کاربری بیشتر هدف حمله بوده؟" }, a: { en: "grep Failed auth.log | awk '{print $9}' | sort | uniq -c | sort -rn | head -1", fa: "grep Failed auth.log | awk '{print $9}' | sort | uniq -c | sort -rn | head -1" } },
    { q: { en: "Save the names and extensions of the Reception staff into reception.txt.", fa: "نام و داخلی کارمندهای Reception را در reception.txt ذخیره کن." }, a: { en: "awk -F, '$2 == \"Reception\" {print $1, $3}' staff.csv > reception.txt", fa: "awk -F, '$2 == \"Reception\" {print $1, $3}' staff.csv > reception.txt" } }
  ],
  recap: { en: ["| means 'and then'.", "grep picks lines, cut and awk pick columns, sort orders, uniq -c counts.", "sort | uniq -c | sort -rn is the top-N pattern.", "> replaces, >> adds, 2> catches errors."],
           fa: ["| یعنی «و بعد».", "grep خط انتخاب می‌کند، cut و awk ستون، sort مرتب می‌کند و uniq -c می‌شمارد.", "sort | uniq -c | sort -rn الگوی «برترین‌ها» است.", "> جایگزین می‌کند، >> اضافه می‌کند و 2> خطاها را می‌گیرد."] }
};

window.LEARN.articles.push({
  id: "linux-server", track: "linux", icon: "monitor", level: "intermediate", minutes: 28, updated: "2026-11",
  title: { en: "Running a Linux server", fa: "اداره‌ی یک سرور لینوکس" },
  summary: { en: "The daily work of an administrator: connecting with SSH, installing and updating software, starting services, reading logs, the firewall and backups.",
             fa: "کار روزانه‌ی یک مدیر سیستم: اتصال با SSH، نصب و به‌روزرسانی نرم‌افزار، راه‌اندازی سرویس‌ها، خواندن لاگ، فایروال و پشتیبان‌گیری." },
  blocks: [
    { h: { en: "What makes a computer a server?", fa: "چه چیزی یک کامپیوتر را سرور می‌کند؟" } },
    { p: { en: "A server is not a special kind of machine. It is any computer whose job is to answer requests from other computers: to hand out web pages, store files, keep a database or record camera footage. It usually has no screen or keyboard, runs day and night, and is managed from somewhere else through a terminal. So everything you learned on the path so far — moving around, files, permissions, text tools — is exactly what you use here. This lesson adds the five things that are new: remote access, software, services, logs and protection.",
           fa: "سرور نوع خاصی از دستگاه نیست. هر کامپیوتری است که کارش جواب‌دادن به درخواست کامپیوترهای دیگر است: دادن صفحه‌ی وب، نگه‌داشتن فایل، نگهداری پایگاه‌داده یا ضبط تصویر دوربین‌ها. معمولاً نمایشگر و صفحه‌کلید ندارد، شب و روز روشن است و از جای دیگری با ترمینال مدیریت می‌شود. پس هر چه تا اینجای مسیر یاد گرفتی — حرکت بین پوشه‌ها، فایل، مجوز، ابزارهای متن — دقیقاً همان چیزی است که اینجا استفاده می‌کنی. این درس پنج چیز جدید را اضافه می‌کند: دسترسی از راه دور، نرم‌افزار، سرویس، لاگ و محافظت." } },

    { h: { en: "Connecting from far away: SSH", fa: "اتصال از راه دور: SSH" } },
    { p: { en: "SSH (secure shell) opens a terminal on another machine over an encrypted connection. You give a user name and the server's address; after you log in, every command you type runs there, not on your own computer.",
           fa: "SSH (شل امن) روی یک دستگاه دیگر، از طریق اتصالی رمزنگاری‌شده، ترمینال باز می‌کند. یک نام کاربری و آدرس سرور را می‌دهی؛ بعد از ورود، هر دستوری که تایپ کنی آنجا اجرا می‌شود، نه روی کامپیوتر خودت." } },
    { code: "ssh sara@192.168.1.50          # log in as sara\nssh -p 2222 sara@server.example  # a different port\nexit                             # come back to your own machine\n\nscp report.pdf sara@192.168.1.50:/home/sara/   # copy a file to the server\nscp sara@192.168.1.50:/var/log/syslog .        # copy a file from it", lang: "bash" },
    { p: { en: "Passwords can be guessed, so professionals log in with a key pair instead. You create two files: a private key that never leaves your computer, and a public key that you place on the server. The server lets in whoever proves they hold the private key.",
           fa: "رمز را می‌شود حدس زد، پس حرفه‌ای‌ها به‌جایش با یک جفت کلید وارد می‌شوند. دو فایل می‌سازی: کلید خصوصی که هیچ‌وقت از کامپیوترت بیرون نمی‌رود و کلید عمومی که روی سرور می‌گذاری. سرور هر کس را که ثابت کند کلید خصوصی را دارد راه می‌دهد." } },
    { code: "ssh-keygen -t ed25519              # create the pair (press Enter for the default place)\nssh-copy-id sara@192.168.1.50      # put the public key on the server\nssh sara@192.168.1.50              # now logs in without the account password", lang: "bash",
      cap: { en: "Protect the private key with a passphrase when ssh-keygen asks for one.", fa: "وقتی ssh-keygen پرسید، برای کلید خصوصی یک عبارت عبور بگذار." } },

    { h: { en: "Software: the package manager", fa: "نرم‌افزار: مدیر بسته" } },
    { p: { en: "On Linux you do not download installers from websites. The system has a catalogue of tested software called a repository, and a package manager that installs from it and keeps everything up to date. On Ubuntu and Debian the tool is apt; on Red Hat, Rocky and Fedora it is dnf, with the same ideas.",
           fa: "در لینوکس نصب‌کننده را از سایت‌ها دانلود نمی‌کنی. سیستم فهرستی از نرم‌افزارهای آزموده به اسم «مخزن» دارد و یک «مدیر بسته» که از آن نصب می‌کند و همه‌چیز را به‌روز نگه می‌دارد. در اوبونتو و دبیان این ابزار apt است و در Red Hat، Rocky و Fedora ابزار dnf با همان مفاهیم." } },
    { table: { head: { en: ["Command", "What it does"], fa: ["دستور", "چه می‌کند"] }, rows: [
      ["sudo apt update", { en: "Refresh the catalogue (installs nothing)", fa: "تازه‌کردن فهرست (چیزی نصب نمی‌کند)" }],
      ["sudo apt upgrade", { en: "Install the waiting updates", fa: "نصب به‌روزرسانی‌های در انتظار" }],
      ["sudo apt install nginx", { en: "Install a program", fa: "نصب یک برنامه" }],
      ["sudo apt remove nginx", { en: "Remove it", fa: "حذف آن" }],
      ["apt search keyword", { en: "Look for a program", fa: "جست‌وجوی یک برنامه" }],
      ["apt show nginx", { en: "Read about it before installing", fa: "خواندن توضیحش قبل از نصب" }]
    ] } },

    { h: { en: "Services: programs that run in the background", fa: "سرویس: برنامه‌ای که در پس‌زمینه اجرا می‌شود" } },
    { p: { en: "A web server or a database does not run in your terminal; it runs in the background as a service, started and watched by a system called systemd. You control services with one command, systemctl. The two ideas to keep apart are start (run it now) and enable (run it automatically after every restart). A service that was started but not enabled will be gone after the next reboot — a classic cause of 'it worked yesterday'.",
           fa: "وب‌سرور یا پایگاه‌داده در ترمینال تو اجرا نمی‌شود؛ در پس‌زمینه به شکل «سرویس» اجرا می‌شود و سیستمی به اسم systemd آن را راه می‌اندازد و زیر نظر دارد. سرویس‌ها را با یک دستور کنترل می‌کنی: systemctl. دو مفهوم را باید جدا نگه داری: start (همین الان اجرا کن) و enable (بعد از هر راه‌اندازی دوباره خودکار اجرا کن). سرویسی که start شده ولی enable نشده بعد از راه‌اندازی بعدی دیگر نیست — دلیل معروفِ «دیروز کار می‌کرد»." } },
    { code: "sudo systemctl status nginx     # is it running? the last log lines are shown too\nsudo systemctl start nginx      # run it now\nsudo systemctl stop nginx       # stop it\nsudo systemctl restart nginx    # stop and start (after changing its settings)\nsudo systemctl enable nginx     # start automatically at boot\nsystemctl --failed              # list services that crashed", lang: "bash" },

    { h: { en: "Logs: finding out what happened", fa: "لاگ: فهمیدن اینکه چه شد" } },
    { p: { en: "When a service will not start, do not guess — it has already written down why. Modern systems collect all logs in the journal, read with journalctl; many programs also write plain files under /var/log, which you read with the text tools of the previous lesson.",
           fa: "وقتی سرویسی اجرا نمی‌شود حدس نزن — خودش قبلاً نوشته چرا. سیستم‌های جدید همه‌ی لاگ‌ها را در «ژورنال» جمع می‌کنند که با journalctl خوانده می‌شود؛ خیلی از برنامه‌ها هم فایل ساده زیر /var/log می‌نویسند که با ابزارهای متنِ درس قبل می‌خوانی‌شان." } },
    { code: "journalctl -u nginx -n 50          # the last 50 lines of one service\njournalctl -u nginx -f             # follow it live\njournalctl --since \"1 hour ago\" -p err   # every error of the last hour\nsudo tail -f /var/log/auth.log     # watch logins as they happen", lang: "bash" },

    { h: { en: "Who is listening? Ports", fa: "چه کسی گوش می‌دهد؟ پورت‌ها" } },
    { p: { en: "Each service waits for requests on a numbered port. Listing the listening ports shows what your server offers to the network — and anything in the list that you do not recognise deserves a question.",
           fa: "هر سرویس روی یک پورت شماره‌دار منتظر درخواست است. فهرست پورت‌های در حال گوش‌دادن نشان می‌دهد سرورت چه چیزی به شبکه ارائه می‌کند — و هر چیزی در این فهرست که نمی‌شناسی جای سؤال دارد." } },
    { code: "sudo ss -tlnp        # t = TCP, l = listening, n = numbers, p = which program", lang: "bash",
      cap: { en: "0.0.0.0:22 means 'port 22, reachable from anywhere'; 127.0.0.1:5432 means 'only from this machine'.", fa: "0.0.0.0:22 یعنی «پورت ۲۲، قابل دسترسی از همه‌جا» و 127.0.0.1:5432 یعنی «فقط از همین دستگاه»." } },

    { h: { en: "The firewall", fa: "فایروال" } },
    { p: { en: "A firewall decides which of those ports the outside world may reach. On Ubuntu the simple front end is ufw. The safe order matters: allow SSH first, then switch the firewall on — the other way round, you lock yourself out of your own server.",
           fa: "فایروال تعیین می‌کند دنیای بیرون به کدام‌یک از آن پورت‌ها می‌تواند برسد. در اوبونتو رابط ساده‌اش ufw است. ترتیبِ ایمن مهم است: اول SSH را مجاز کن و بعد فایروال را روشن کن — اگر برعکس انجام بدهی، خودت را از سرور خودت بیرون می‌اندازی." } },
    { code: "sudo ufw allow 22/tcp      # keep SSH reachable\nsudo ufw allow 443/tcp     # the website\nsudo ufw enable            # everything else is now blocked\nsudo ufw status verbose", lang: "bash" },

    { h: { en: "The first hour on a new server", fa: "ساعت اول روی یک سرور جدید" } },
    { list: { en: ["Update everything: sudo apt update && sudo apt upgrade.", "Create your own user and add it to the sudo group; stop using root directly.", "Install your SSH key, check that it works, then turn off password login and root login in /etc/ssh/sshd_config (PasswordAuthentication no, PermitRootLogin no) and restart ssh.", "Turn on the firewall, allowing only what you need.", "Set the correct time zone: sudo timedatectl set-timezone Asia/Tehran — logs with the wrong time are useless.", "Turn on automatic security updates: sudo apt install unattended-upgrades.", "Set up a backup before you put anything valuable on the machine."],
              fa: ["همه‌چیز را به‌روز کن: sudo apt update && sudo apt upgrade.", "کاربر خودت را بساز و به گروه sudo اضافه کن؛ دیگر مستقیم با root کار نکن.", "کلید SSH را نصب کن، مطمئن شو کار می‌کند و بعد ورود با رمز و ورود root را در /etc/ssh/sshd_config خاموش کن (PasswordAuthentication no و PermitRootLogin no) و ssh را دوباره راه بینداز.", "فایروال را روشن کن و فقط چیزهای لازم را مجاز کن.", "منطقه‌ی زمانی درست را تنظیم کن: sudo timedatectl set-timezone Asia/Tehran — لاگ با ساعت اشتباه بی‌فایده است.", "به‌روزرسانی امنیتی خودکار را روشن کن: sudo apt install unattended-upgrades.", "قبل از گذاشتن هر چیز باارزش روی دستگاه، پشتیبان‌گیری را راه بینداز."] } },

    { h: { en: "Backups with rsync", fa: "پشتیبان‌گیری با rsync" } },
    { code: "rsync -a --delete /var/www/ /backup/www/                 # a local copy\nrsync -a /var/www/ sara@192.168.1.60:/backup/www/        # to another machine, over SSH\n\n# every night at 02:00, from crontab -e:\n0 2 * * * rsync -a /var/www/ sara@192.168.1.60:/backup/www/ >> /var/log/backup.log 2>&1", lang: "bash",
      cap: { en: "rsync copies only what changed, so the second run takes seconds. -a keeps permissions and dates; --delete also removes files that were deleted at the source.", fa: "rsync فقط چیزهای تغییرکرده را کپی می‌کند، پس اجرای دوم چند ثانیه طول می‌کشد. -a مجوزها و تاریخ‌ها را نگه می‌دارد و --delete فایل‌هایی را که در مبدأ حذف شده‌اند هم حذف می‌کند." } },

    { h: { en: "When the server is slow or broken", fa: "وقتی سرور کند یا خراب است" } },
    { table: { head: { en: ["Question", "Command"], fa: ["سؤال", "دستور"] }, rows: [
      [{ en: "Is the processor overloaded?", fa: "پردازنده زیر فشار است؟" }, "uptime ; top"],
      [{ en: "Is memory exhausted?", fa: "حافظه تمام شده؟" }, "free -h"],
      [{ en: "Is a disk full?", fa: "دیسکی پر شده؟" }, "df -h ; du -sh /var/*"],
      [{ en: "Did a service crash?", fa: "سرویسی از کار افتاده؟" }, "systemctl --failed"],
      [{ en: "What did it say before it died?", fa: "قبل از توقف چه گفته؟" }, "journalctl -u NAME -n 50"],
      [{ en: "Is the port open?", fa: "پورت باز است؟" }, "ss -tlnp"],
      [{ en: "Is the network reachable?", fa: "شبکه در دسترس است؟" }, "ping ; ip addr ; ip route"]
    ] } }
  ]
});
window.LEARN.study["linux-server"] = {
  goals: { en: ["Log in to a server with SSH and a key pair", "Install software and control services with apt and systemctl", "Find the cause of a problem in the logs", "Protect a new server in its first hour"],
           fa: ["با SSH و جفت کلید به سرور وارد شوی", "با apt و systemctl نرم‌افزار نصب و سرویس‌ها را کنترل کنی", "دلیل یک مشکل را در لاگ‌ها پیدا کنی", "یک سرور جدید را در ساعت اولش ایمن کنی"] },
  mistakes: { en: ["Enabling the firewall before allowing SSH.", "Starting a service but forgetting to enable it.", "Turning off password login before checking that the key works — keep one session open while you test in another.", "Working as root all day.", "Having backups on the same disk as the data."],
              fa: ["روشن‌کردن فایروال قبل از مجازکردن SSH.", "start کردن سرویس و فراموش‌کردن enable.", "خاموش‌کردن ورود با رمز قبل از اطمینان از کارکردن کلید — یک نشست را باز نگه دار و در نشست دیگر آزمایش کن.", "کارکردن تمام‌روز با root.", "نگه‌داشتن پشتیبان روی همان دیسکی که داده روی آن است."] },
  practice: [
    { q: { en: "You installed nginx and it works, but after a reboot the website is down. What happened and what is the fix?", fa: "nginx را نصب کرده‌ای و کار می‌کند، ولی بعد از راه‌اندازی دوباره سایت قطع است. چه شده و راه‌حل چیست؟" }, a: { en: "The service was started but not enabled.\nsudo systemctl enable --now nginx", fa: "سرویس start شده ولی enable نشده.\nsudo systemctl enable --now nginx" } },
    { q: { en: "Show the last 30 log lines of the ssh service.", fa: "۳۰ خط آخر لاگ سرویس ssh را نشان بده." }, a: { en: "journalctl -u ssh -n 30", fa: "journalctl -u ssh -n 30" } },
    { q: { en: "Allow web traffic (80 and 443) through ufw and check the result.", fa: "ترافیک وب (۸۰ و ۴۴۳) را در ufw مجاز کن و نتیجه را بررسی کن." }, a: { en: "sudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw status", fa: "sudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw status" } },
    { q: { en: "Copy the folder /etc/nginx from the server 192.168.1.50 to your own machine as user sara.", fa: "پوشه‌ی /etc/nginx را از سرور 192.168.1.50 با کاربر sara روی دستگاه خودت کپی کن." }, a: { en: "scp -r sara@192.168.1.50:/etc/nginx .", fa: "scp -r sara@192.168.1.50:/etc/nginx ." } }
  ],
  recap: { en: ["SSH with keys is the door; guard it.", "apt installs, systemctl runs, journalctl explains.", "start is for now, enable is for every boot.", "Allow SSH, then enable the firewall.", "Update, back up, and test the restore."],
           fa: ["SSH با کلید درِ ورود است؛ از آن محافظت کن.", "apt نصب می‌کند، systemctl اجرا می‌کند و journalctl توضیح می‌دهد.", "start برای الان است و enable برای هر بار روشن‌شدن.", "اول SSH را مجاز کن، بعد فایروال را روشن کن.", "به‌روز کن، پشتیبان بگیر و بازگردانی را آزمایش کن."] }
};

window.LEARN.articles.push({
  id: "subnetting", track: "network", icon: "network", level: "intermediate", minutes: 26, updated: "2026-11",
  title: { en: "Subnetting step by step", fa: "زیرشبکه‌بندی قدم‌به‌قدم" },
  summary: { en: "Why networks are split, the one method that solves every subnetting question by hand, and how to plan addresses for a whole building.",
             fa: "چرا شبکه‌ها تقسیم می‌شوند، تنها روشی که هر سؤال زیرشبکه را دستی حل می‌کند و چطور برای یک ساختمان کامل آدرس طراحی کنی." },
  blocks: [
    { h: { en: "Why split a network at all?", fa: "اصلاً چرا شبکه را تقسیم کنیم؟" } },
    { p: { en: "Imagine a hotel where the reception computers, two hundred guest phones, sixty cameras and the accounting server all share one network. Three problems appear. Every device hears every other device's broadcast messages, so the network gets noisy and slow. A guest's infected laptop can reach the accounting server directly. And when something breaks, you have one huge group of addresses to search. Subnetting cuts one large network into several smaller ones, each with its own range of addresses, so that traffic between them must pass through a router or firewall where you can control it.",
           fa: "هتلی را تصور کن که کامپیوترهای پذیرش، دویست گوشی مهمان، شصت دوربین و سرور حسابداری همه در یک شبکه‌اند. سه مشکل پیش می‌آید. هر دستگاه پیام‌های Broadcast همه‌ی دستگاه‌های دیگر را می‌شنود، پس شبکه شلوغ و کند می‌شود. لپ‌تاپ آلوده‌ی یک مهمان مستقیم به سرور حسابداری می‌رسد. و وقتی چیزی خراب شود، باید در یک دسته‌ی عظیم آدرس بگردی. زیرشبکه‌بندی یک شبکه‌ی بزرگ را به چند شبکه‌ی کوچک‌تر می‌بُرد که هر کدام بازه‌ی آدرس خودش را دارد، تا ترافیک بینشان مجبور باشد از روتر یا فایروالی بگذرد که می‌توانی کنترلش کنی." } },
    { note: { en: "This lesson builds on 'What is an IP address?'. If the words prefix, mask and broadcast are new to you, read that lesson first.", fa: "این درس روی «آدرس IP چیست؟» ساخته شده. اگر کلمه‌های پیشوند، ماسک و Broadcast برایت تازه‌اند، اول آن درس را بخوان." }, kind: "tip" },

    { h: { en: "The only numbers you need to memorise", fa: "تنها عددهایی که باید حفظ کنی" } },
    { p: { en: "Everything in subnetting comes from the powers of two. Learn this one table and you will never need a calculator.",
           fa: "همه‌چیز در زیرشبکه‌بندی از توان‌های دو می‌آید. همین یک جدول را یاد بگیر و دیگر به ماشین‌حساب نیاز نداری." } },
    { table: { head: { en: ["Device bits", "Block size", "Usable devices", "Prefix", "Last number of the mask"], fa: ["بیت دستگاه", "اندازه‌ی بلوک", "دستگاه قابل استفاده", "پیشوند", "عدد آخر ماسک"] }, rows: [
      ["8", "256", "254", "/24", "0"], ["7", "128", "126", "/25", "128"], ["6", "64", "62", "/26", "192"], ["5", "32", "30", "/27", "224"],
      ["4", "16", "14", "/28", "240"], ["3", "8", "6", "/29", "248"], ["2", "4", "2", "/30", "252"]
    ] } },
    { list: { en: ["Device bits = 32 − prefix.", "Block size = 2 to the power of the device bits.", "Usable devices = block size − 2 (the first address names the network, the last is the broadcast).", "Last number of the mask = 256 − block size."],
              fa: ["بیت دستگاه = ۳۲ − پیشوند.", "اندازه‌ی بلوک = ۲ به توان بیت‌های دستگاه.", "دستگاه قابل استفاده = اندازه‌ی بلوک − ۲ (آدرس اول اسم شبکه است و آخری Broadcast).", "عدد آخر ماسک = ۲۵۶ − اندازه‌ی بلوک."] } },

    { h: { en: "The method: find the block", fa: "روش: بلوک را پیدا کن" } },
    { p: { en: "Every subnetting question — 'what is the network of this address?', 'what is its broadcast?', 'are these two on the same network?' — is solved the same way. Work out the block size, list where the blocks start (multiples of the block size), and see which block the address falls into.",
           fa: "هر سؤال زیرشبکه — «شبکه‌ی این آدرس چیست؟»، «Broadcast آن چیست؟»، «این دو در یک شبکه‌اند؟» — یک‌جور حل می‌شود. اندازه‌ی بلوک را حساب کن، بنویس بلوک‌ها از کجا شروع می‌شوند (مضرب‌های اندازه‌ی بلوک) و ببین آدرس در کدام بلوک می‌افتد." } },
    { p: { en: "Example: 192.168.1.130/26. The prefix is 26, so there are 6 device bits and the block size is 64. Blocks start at 0, 64, 128 and 192. The number 130 lies between 128 and 191, so the network is 192.168.1.128, the broadcast is 192.168.1.191 (one below the next block), and the usable addresses run from .129 to .190.",
           fa: "مثال: 192.168.1.130/26. پیشوند ۲۶ است، پس ۶ بیت دستگاه داریم و اندازه‌ی بلوک ۶۴ است. بلوک‌ها از ۰، ۶۴، ۱۲۸ و ۱۹۲ شروع می‌شوند. عدد ۱۳۰ بین ۱۲۸ و ۱۹۱ است، پس شبکه 192.168.1.128، آدرس Broadcast برابر 192.168.1.191 (یکی قبل از بلوک بعدی) و آدرس‌های قابل استفاده از ‎.129 تا ‎.190 است." } },
    { term: "$ python3 -c \"import ipaddress as i\nfor n in i.ip_network('192.168.1.0/24').subnets(new_prefix=26): print(n, n[1], '-', n[-2], 'broadcast', n.broadcast_address)\"\n192.168.1.0/26 192.168.1.1 - 192.168.1.62 broadcast 192.168.1.63\n192.168.1.64/26 192.168.1.65 - 192.168.1.126 broadcast 192.168.1.127\n192.168.1.128/26 192.168.1.129 - 192.168.1.190 broadcast 192.168.1.191\n192.168.1.192/26 192.168.1.193 - 192.168.1.254 broadcast 192.168.1.255",
      cap: { en: "The four /26 networks inside 192.168.1.0/24, checked with Python.", fa: "چهار شبکه‌ی /26 داخل 192.168.1.0/24، بررسی‌شده با پایتون." } },

    { h: { en: "Three more worked examples", fa: "سه مثال حل‌شده‌ی دیگر" } },
    { table: { head: { en: ["Address", "Block", "Network", "Broadcast", "Usable"], fa: ["آدرس", "بلوک", "شبکه", "Broadcast", "قابل استفاده"] }, rows: [
      ["10.0.5.77/27", "32", "10.0.5.64", "10.0.5.95", "10.0.5.65 – .94"],
      ["172.16.8.200/28", "16", "172.16.8.192", "172.16.8.207", "172.16.8.193 – .206"],
      ["192.168.0.9/30", "4", "192.168.0.8", "192.168.0.11", "192.168.0.9 – .10"]
    ] } },
    { p: { en: "Check the first one yourself: /27 leaves 5 device bits, so blocks of 32 start at 0, 32, 64, 96 …; 77 falls in the block that starts at 64 and ends at 95.",
           fa: "اولی را خودت بررسی کن: /27 یعنی ۵ بیت دستگاه، پس بلوک‌های ۳۲تایی از ۰، ۳۲، ۶۴، ۹۶ و … شروع می‌شوند؛ ۷۷ در بلوکی می‌افتد که از ۶۴ شروع و به ۹۵ ختم می‌شود." } },

    { h: { en: "Are two devices on the same network?", fa: "دو دستگاه در یک شبکه‌اند؟" } },
    { p: { en: "Find the network of each. If they match, the devices talk directly; if not, they need a router. With a /26 mask, 192.168.1.60 is in the block starting at 0 and 192.168.1.70 is in the block starting at 64 — different networks, although the numbers look close. This is the calculation every device does before sending a single packet, and a wrong mask on one device is a classic reason for 'I can ping some machines but not others'.",
           fa: "شبکه‌ی هر کدام را پیدا کن. اگر یکی بود، دستگاه‌ها مستقیم حرف می‌زنند و اگر نه، روتر لازم دارند. با ماسک /26، آدرس 192.168.1.60 در بلوکی است که از ۰ شروع می‌شود و 192.168.1.70 در بلوکی که از ۶۴ — شبکه‌های متفاوت، هرچند عددها نزدیک به نظر می‌رسند. این همان حسابی است که هر دستگاه قبل از فرستادن حتی یک بسته انجام می‌دهد و ماسک اشتباه روی یک دستگاه دلیل معروفِ «بعضی دستگاه‌ها را ping می‌کنم و بعضی را نه» است." } },

    { h: { en: "Different sizes for different needs: VLSM", fa: "اندازه‌های مختلف برای نیازهای مختلف: VLSM" } },
    { p: { en: "Departments are never the same size, and giving each one a /24 wastes addresses. VLSM (variable-length subnet masks) means choosing a different prefix for each. The rule that keeps it tidy: start with the largest need and work down, placing each block directly after the previous one.",
           fa: "بخش‌ها هیچ‌وقت هم‌اندازه نیستند و دادن یک /24 به هر کدام آدرس هدر می‌دهد. VLSM (ماسک با طول متغیر) یعنی برای هر کدام پیشوند متفاوتی انتخاب کنی. قاعده‌ای که کار را مرتب نگه می‌دارد: از بزرگ‌ترین نیاز شروع کن و پایین بیا و هر بلوک را درست بعد از قبلی بگذار." } },
    { p: { en: "Task: from 192.168.10.0/24, plan Rooms (100 devices), Reception (50), Cameras (25) and a link between two routers (2).",
           fa: "مسئله: از 192.168.10.0/24 برای اتاق‌ها (۱۰۰ دستگاه)، پذیرش (۵۰)، دوربین‌ها (۲۵) و اتصال بین دو روتر (۲) آدرس طراحی کن." } },
    { table: { head: { en: ["Need", "Smallest block that fits", "Subnet", "Usable range"], fa: ["نیاز", "کوچک‌ترین بلوک مناسب", "زیرشبکه", "بازه‌ی قابل استفاده"] }, rows: [
      [{ en: "Rooms — 100", fa: "اتاق‌ها — ۱۰۰" }, "128 → /25", "192.168.10.0/25", ".1 – .126"],
      [{ en: "Reception — 50", fa: "پذیرش — ۵۰" }, "64 → /26", "192.168.10.128/26", ".129 – .190"],
      [{ en: "Cameras — 25", fa: "دوربین‌ها — ۲۵" }, "32 → /27", "192.168.10.192/27", ".193 – .222"],
      [{ en: "Router link — 2", fa: "اتصال روترها — ۲" }, "4 → /30", "192.168.10.224/30", ".225 – .226"]
    ] } },
    { p: { en: "Addresses from .228 to .255 are still free for the future. The Subnet Calculator in the Tools section does exactly this planning; do it by hand first, then check yourself with the tool.",
           fa: "آدرس‌های ‎.228 تا ‎.255 هنوز برای آینده آزادند. «ماشین‌حساب زیرشبکه» در بخش ابزارها دقیقاً همین طراحی را انجام می‌دهد؛ اول دستی حل کن و بعد با ابزار خودت را بسنج." } },

    { h: { en: "When the block is bigger than 256", fa: "وقتی بلوک بزرگ‌تر از ۲۵۶ است" } },
    { p: { en: "For prefixes shorter than /24 the same method moves one number to the left. In /22 there are 10 device bits: 2 of them are in the third number, so the third number moves in blocks of 4, and the fourth number is free from 0 to 255. So 172.16.5.9/22 belongs to the network 172.16.4.0, its broadcast is 172.16.7.255, and it holds 1022 devices.",
           fa: "برای پیشوندهای کوتاه‌تر از /24 همین روش یک عدد به چپ می‌رود. در /22 ده بیت دستگاه داریم: ۲تای آن در عدد سوم است، پس عدد سوم با بلوک‌های ۴تایی حرکت می‌کند و عدد چهارم از ۰ تا ۲۵۵ آزاد است. پس 172.16.5.9/22 مال شبکه‌ی 172.16.4.0 است، Broadcast آن 172.16.7.255 است و ۱۰۲۲ دستگاه جا دارد." } },

    { h: { en: "For professionals", fa: "برای حرفه‌ای‌ها" } },
    { list: { en: ["Summarisation is subnetting backwards: 192.168.0.0/24 to 192.168.3.0/24 can be advertised as one route, 192.168.0.0/22, which keeps routing tables small.", "The wildcard mask used in Cisco ACLs and OSPF is the mask turned inside out: 255.255.255.192 becomes 0.0.0.63.", "A /31 has no network or broadcast address and is allowed on point-to-point links (RFC 3021); a /32 names a single host.", "Leave room to grow: plan each subnet for about twice the devices it has today.", "Write the plan down — subnet, VLAN number, gateway, purpose — before you configure anything."],
              fa: ["خلاصه‌سازی همان زیرشبکه‌بندیِ برعکس است: 192.168.0.0/24 تا 192.168.3.0/24 را می‌شود به شکل یک مسیر 192.168.0.0/22 اعلام کرد تا جدول مسیریابی کوچک بماند.", "ماسک Wildcard که در ACL سیسکو و OSPF استفاده می‌شود همان ماسک برعکس‌شده است: 255.255.255.192 می‌شود 0.0.0.63.", "یک /31 آدرس شبکه و Broadcast ندارد و روی اتصال‌های نقطه‌به‌نقطه مجاز است (RFC 3021)؛ یک /32 فقط یک میزبان را مشخص می‌کند.", "جا برای رشد بگذار: هر زیرشبکه را برای حدود دو برابر دستگاه‌های امروزش طراحی کن.", "طرح را بنویس — زیرشبکه، شماره‌ی VLAN، گیت‌وی و کاربرد — قبل از اینکه چیزی را کانفیگ کنی."] } }
  ]
});
window.LEARN.study["subnetting"] = {
  goals: { en: ["Find the network, broadcast and usable range of any address by hand", "Decide whether two addresses are on the same network", "Plan subnets of different sizes for several departments"],
           fa: ["شبکه، Broadcast و بازه‌ی قابل استفاده‌ی هر آدرس را دستی پیدا کنی", "تشخیص بدهی دو آدرس در یک شبکه‌اند یا نه", "برای چند بخش زیرشبکه‌هایی با اندازه‌های مختلف طراحی کنی"] },
  mistakes: { en: ["Forgetting to subtract 2 for the network and broadcast addresses.", "Giving a device the network address or the broadcast address.", "Starting a block at a number that is not a multiple of its size.", "Planning the small subnets first, which leaves gaps."],
              fa: ["فراموش‌کردن کم‌کردن ۲ برای آدرس شبکه و Broadcast.", "دادن آدرس شبکه یا آدرس Broadcast به یک دستگاه.", "شروع بلوک از عددی که مضرب اندازه‌اش نیست.", "طراحی زیرشبکه‌های کوچک در ابتدا، که جای خالی باقی می‌گذارد."] },
  practice: [
    { q: { en: "Find the network and broadcast of 192.168.5.100/27.", fa: "شبکه و Broadcast آدرس 192.168.5.100/27 را پیدا کن." }, a: { en: "Block size 32 → blocks at 0, 32, 64, 96, 128. 100 is in the block starting at 96.\nNetwork 192.168.5.96, broadcast 192.168.5.127, usable .97 – .126.", fa: "اندازه‌ی بلوک ۳۲ ← بلوک‌ها از ۰، ۳۲، ۶۴، ۹۶، ۱۲۸. عدد ۱۰۰ در بلوکی است که از ۹۶ شروع می‌شود.\nشبکه 192.168.5.96، Broadcast برابر 192.168.5.127 و قابل استفاده ‎.97 تا ‎.126." } },
    { q: { en: "You need a subnet for 40 devices. Which prefix?", fa: "برای ۴۰ دستگاه زیرشبکه می‌خواهی. کدام پیشوند؟" }, a: { en: "/26 — 62 usable addresses. A /27 has only 30.", fa: "/26 — با ۶۲ آدرس قابل استفاده. /27 فقط ۳۰تا دارد." } },
    { q: { en: "With mask 255.255.255.240, are 10.1.1.17 and 10.1.1.30 on the same network?", fa: "با ماسک 255.255.255.240، آدرس‌های 10.1.1.17 و 10.1.1.30 در یک شبکه‌اند؟" }, a: { en: "Yes. The block size is 16; both fall in the block 16–31 (network 10.1.1.16).", fa: "بله. اندازه‌ی بلوک ۱۶ است و هر دو در بلوک ۱۶ تا ۳۱ می‌افتند (شبکه‌ی 10.1.1.16)." } },
    { q: { en: "From 10.0.0.0/24, plan subnets for 60, 28 and 10 devices.", fa: "از 10.0.0.0/24 برای ۶۰، ۲۸ و ۱۰ دستگاه زیرشبکه طراحی کن." }, a: { en: "60 → 10.0.0.0/26 (.1 – .62)\n28 → 10.0.0.64/27 (.65 – .94)\n10 → 10.0.0.96/28 (.97 – .110)", fa: "۶۰ ← 10.0.0.0/26 (‎.1 تا ‎.62)\n۲۸ ← 10.0.0.64/27 (‎.65 تا ‎.94)\n۱۰ ← 10.0.0.96/28 (‎.97 تا ‎.110)" } }
  ],
  recap: { en: ["Block size = 2^(32 − prefix); blocks start at its multiples.", "Network = start of the block; broadcast = one below the next block.", "Usable = block size − 2.", "Plan largest first."],
           fa: ["اندازه‌ی بلوک = ۲ به توان (۳۲ − پیشوند)؛ بلوک‌ها از مضرب‌های آن شروع می‌شوند.", "شبکه = ابتدای بلوک؛ Broadcast = یکی قبل از بلوک بعدی.", "قابل استفاده = اندازه‌ی بلوک − ۲.", "اول بزرگ‌ترین را طراحی کن."] }
};

window.LEARN.articles.push({
  id: "how-data-travels", track: "network", icon: "network", level: "beginner", minutes: 24, updated: "2026-11",
  title: { en: "How data travels: switch, router, DNS and DHCP", fa: "داده چطور سفر می‌کند: سوئیچ، روتر، DNS و DHCP" },
  summary: { en: "What each box in a network really does, the layers that data is wrapped in, and the full journey of one request from your browser to a server and back.",
             fa: "هر جعبه در شبکه واقعاً چه می‌کند، داده در چه لایه‌هایی بسته‌بندی می‌شود و سفر کامل یک درخواست از مرورگر تو تا سرور و برگشت." },
  blocks: [
    { h: { en: "A letter in an envelope in a van", fa: "نامه‌ای در پاکت، در یک وانت" } },
    { p: { en: "Data does not travel as one piece. It is cut into small packets, and each packet is wrapped several times, like a letter put into an envelope, the envelope put into a postbag, and the bag loaded onto a van. Each wrapping has its own job and its own address. Networking is organised into these layers so that each part can change without the others noticing: you can swap Wi-Fi for a cable, and your browser never knows.",
           fa: "داده یک‌تکه سفر نمی‌کند. به بسته‌های کوچک بریده می‌شود و هر بسته چند بار بسته‌بندی می‌شود، مثل نامه‌ای که در پاکت می‌رود، پاکتی که در کیسه‌ی پست می‌رود و کیسه‌ای که بار وانت می‌شود. هر بسته‌بندی کار و آدرس خودش را دارد. شبکه به همین لایه‌ها تقسیم شده تا هر بخش بتواند بدون اینکه بقیه بفهمند عوض شود: می‌توانی وای‌فای را با کابل عوض کنی و مرورگرت هیچ‌وقت نمی‌فهمد." } },
    { table: { head: { en: ["Layer", "Its job", "Its address", "Examples"], fa: ["لایه", "کارش", "آدرسش", "نمونه"] }, rows: [
      [{ en: "Application", fa: "کاربرد" }, { en: "What the programs say to each other", fa: "حرفی که برنامه‌ها به هم می‌زنند" }, { en: "names (example.com)", fa: "اسم (example.com)" }, "HTTP, DNS, SSH"],
      [{ en: "Transport", fa: "انتقال" }, { en: "Deliver to the right program, in order", fa: "رساندن به برنامه‌ی درست، به ترتیب" }, { en: "port number", fa: "شماره‌ی پورت" }, "TCP, UDP"],
      [{ en: "Network", fa: "شبکه" }, { en: "Find a path between networks", fa: "پیداکردن مسیر بین شبکه‌ها" }, { en: "IP address", fa: "آدرس IP" }, "IP, ICMP"],
      [{ en: "Link", fa: "پیوند" }, { en: "Carry it to the next device on this network", fa: "رساندن به دستگاه بعدی در همین شبکه" }, { en: "MAC address", fa: "آدرس MAC" }, "Ethernet, Wi-Fi"]
    ] } },
    { p: { en: "You will also hear of the seven-layer OSI model. It describes the same thing in more detail: its layers 1 and 2 are the link, layer 3 is the network, layer 4 the transport and layers 5 to 7 the application. When an engineer says 'a layer 2 problem' they mean switches and MAC addresses; 'layer 3' means IP addresses and routing.",
           fa: "اسم مدل هفت‌لایه‌ی OSI را هم می‌شنوی. همین را با جزئیات بیشتر توصیف می‌کند: لایه‌های ۱ و ۲ آن پیوند است، لایه‌ی ۳ شبکه، لایه‌ی ۴ انتقال و لایه‌های ۵ تا ۷ کاربرد. وقتی مهندسی می‌گوید «مشکل لایه‌ی ۲» منظورش سوئیچ و آدرس MAC است و «لایه‌ی ۳» یعنی آدرس IP و مسیریابی." } },

    { h: { en: "The switch: delivering inside one network", fa: "سوئیچ: رساندن داخل یک شبکه" } },
    { p: { en: "A switch connects the devices of one network. It works with MAC addresses only. When a frame arrives on a port, the switch notes 'this MAC address lives on this port' in a table. To deliver a frame it looks up the destination MAC and sends the frame out of that one port. If it does not know the address yet, it sends the frame out of every port and learns from the reply. This learning is automatic — which is why a simple switch works the moment you plug it in.",
           fa: "سوئیچ دستگاه‌های یک شبکه را به هم وصل می‌کند و فقط با آدرس MAC کار می‌کند. وقتی فریمی روی یک پورت می‌رسد، سوئیچ در جدولی یادداشت می‌کند «این آدرس MAC روی این پورت است». برای رساندن فریم، MAC مقصد را در جدول پیدا می‌کند و فریم را فقط از همان پورت بیرون می‌فرستد. اگر هنوز آدرس را نشناسد، فریم را از همه‌ی پورت‌ها می‌فرستد و از جواب یاد می‌گیرد. این یادگیری خودکار است — برای همین یک سوئیچ ساده همان لحظه‌ای که وصلش می‌کنی کار می‌کند." } },
    { h: { en: "ARP: from IP address to MAC address", fa: "ARP: از آدرس IP به آدرس MAC" } },
    { p: { en: "Your computer knows the IP address it wants to reach, but the switch needs a MAC address. So the computer shouts to the whole network: 'who has 192.168.1.1? Tell 192.168.1.24.' The owner answers with its MAC address, and the computer remembers the pair for a few minutes. That question is ARP. You can see what your computer has learned with  arp -a  on Windows or  ip neigh  on Linux.",
           fa: "کامپیوترت آدرس IP مقصد را می‌داند ولی سوئیچ آدرس MAC می‌خواهد. پس کامپیوتر خطاب به کل شبکه فریاد می‌زند: «چه کسی 192.168.1.1 را دارد؟ به 192.168.1.24 بگوید.» صاحبش با آدرس MAC خودش جواب می‌دهد و کامپیوتر این جفت را چند دقیقه به خاطر می‌سپارد. این پرسش همان ARP است. چیزهایی را که کامپیوترت یاد گرفته با  arp -a  در ویندوز یا  ip neigh  در لینوکس می‌بینی." } },

    { h: { en: "The router: moving between networks", fa: "روتر: حرکت بین شبکه‌ها" } },
    { p: { en: "A router connects different networks and works with IP addresses. It has one foot in each network and a routing table that says, for each destination network, which way to send the packet. For everything it has no specific rule for, it uses the default route — 'send it to my own upstream router'. Your home router's table is tiny: the home network on one side, and 'everything else' towards the internet provider.",
           fa: "روتر شبکه‌های مختلف را به هم وصل می‌کند و با آدرس IP کار می‌کند. در هر شبکه یک پا دارد و جدول مسیریابی‌ای که می‌گوید برای هر شبکه‌ی مقصد بسته را از کدام طرف بفرستد. برای هر چیزی که قاعده‌ی مشخصی ندارد از «مسیر پیش‌فرض» استفاده می‌کند — «بفرستش به روتر بالادستی خودم». جدول روتر خانه‌ات خیلی کوچک است: شبکه‌ی خانه از یک طرف و «بقیه‌ی دنیا» به سمت شرکت اینترنت." } },
    { code: "$ ip route\ndefault via 192.168.1.1 dev eth0\n192.168.1.0/24 dev eth0 scope link src 192.168.1.24", lang: "bash",
      cap: { en: "A computer's own routing table has the same two lines: my own network is reached directly; everything else goes to the gateway 192.168.1.1.", fa: "جدول مسیریابی خودِ کامپیوتر هم همین دو خط را دارد: به شبکه‌ی خودم مستقیم می‌رسم و بقیه به گیت‌وی 192.168.1.1 می‌رود." } },
    { table: { head: { en: ["", "Switch", "Router"], fa: ["", "سوئیچ", "روتر"] }, rows: [
      [{ en: "Connects", fa: "وصل می‌کند" }, { en: "devices in one network", fa: "دستگاه‌های یک شبکه را" }, { en: "networks to each other", fa: "شبکه‌ها را به هم" }],
      [{ en: "Reads", fa: "می‌خواند" }, { en: "MAC addresses", fa: "آدرس MAC" }, { en: "IP addresses", fa: "آدرس IP" }],
      [{ en: "Table", fa: "جدول" }, { en: "MAC address → port", fa: "آدرس MAC ← پورت" }, { en: "network → next hop", fa: "شبکه ← قدم بعدی" }],
      [{ en: "Broadcasts", fa: "Broadcast" }, { en: "passes them on", fa: "عبور می‌دهد" }, { en: "stops them", fa: "متوقف می‌کند" }]
    ] } },

    { h: { en: "DNS: the phone book", fa: "DNS: دفترچه‌ی تلفن" } },
    { p: { en: "People remember names; networks need numbers. DNS turns sepehrniaz.ir into an IP address. Your computer asks the DNS server it was given (often the router, which asks your provider's server). If that server does not know, it asks its way down a chain: the root servers know who handles .ir, the .ir servers know who handles sepehrniaz.ir, and that last server gives the answer. The result is kept (cached) for a while, so the next visit is instant.",
           fa: "آدم‌ها اسم را به خاطر می‌سپارند و شبکه‌ها عدد می‌خواهند. DNS اسم sepehrniaz.ir را به آدرس IP تبدیل می‌کند. کامپیوترت از سرور DNSی که به او داده شده می‌پرسد (اغلب روتر، که از سرور شرکت اینترنت می‌پرسد). اگر آن سرور نداند، زنجیره‌ای را پایین می‌رود: سرورهای ریشه می‌دانند چه کسی مسئول .ir است، سرورهای .ir می‌دانند چه کسی مسئول sepehrniaz.ir است و آن سرور آخر جواب را می‌دهد. نتیجه مدتی نگه داشته می‌شود (Cache)، پس بازدید بعدی فوری است." } },
    { table: { head: { en: ["Record", "Holds"], fa: ["رکورد", "چه چیزی دارد"] }, rows: [
      ["A", { en: "the IPv4 address of a name", fa: "آدرس IPv4 یک اسم" }],
      ["AAAA", { en: "its IPv6 address", fa: "آدرس IPv6 آن" }],
      ["CNAME", { en: "another name that this name points to", fa: "اسم دیگری که این اسم به آن اشاره می‌کند" }],
      ["MX", { en: "the mail server of a domain", fa: "سرور ایمیل یک دامنه" }],
      ["NS", { en: "the DNS servers responsible for a domain", fa: "سرورهای DNS مسئول یک دامنه" }],
      ["TXT", { en: "free text, used to prove you own a domain", fa: "متن آزاد، برای اثبات مالکیت دامنه" }]
    ] } },
    { code: "nslookup sepehrniaz.ir          # works on Windows and Linux\ndig sepehrniaz.ir +short        # shorter, on Linux and macOS\ndig MX gmail.com +short         # ask for one kind of record", lang: "bash" },

    { h: { en: "DHCP: getting set up automatically", fa: "DHCP: تنظیم خودکار" } },
    { p: { en: "A device needs four settings to use a network: an IP address, a mask, a gateway and a DNS server. Typing them into every phone would be impossible, so a DHCP server — usually the router — hands them out. The device asks, the server offers an address from its pool, the device accepts and the server confirms. The address is lent for a limited time (the lease) and renewed in the background. Devices that others must always find at the same address — servers, printers, cameras — should get a fixed address outside the pool, or a reservation tied to their MAC address.",
           fa: "دستگاه برای استفاده از شبکه چهار تنظیم لازم دارد: آدرس IP، ماسک، گیت‌وی و سرور DNS. تایپ‌کردن این‌ها در هر گوشی ناممکن است، پس یک سرور DHCP — معمولاً روتر — آن‌ها را پخش می‌کند. دستگاه می‌پرسد، سرور از مخزنش آدرسی پیشنهاد می‌دهد، دستگاه قبول می‌کند و سرور تأیید می‌کند. آدرس برای مدت محدودی قرض داده می‌شود (Lease) و در پس‌زمینه تمدید می‌شود. دستگاه‌هایی که بقیه باید همیشه با همان آدرس پیدایشان کنند — سرور، پرینتر، دوربین — باید آدرس ثابت بیرون از مخزن یا رزروی وابسته به آدرس MAC بگیرند." } },

    { h: { en: "The whole journey, step by step", fa: "کل سفر، قدم‌به‌قدم" } },
    { list: { en: ["You type sepehrniaz.ir. The browser asks DNS and receives an IP address.", "The computer compares that address with its own network. It is elsewhere, so the packet must go to the gateway.", "ARP finds the gateway's MAC address. The packet is wrapped in a frame addressed to that MAC.", "The switch reads the MAC address and passes the frame to the router's port.", "The router unwraps the frame, reads the IP address, replaces your private address with its public one (NAT), wraps the packet in a new frame and sends it to the provider.", "Router after router repeats this: new frame at every hop, same IP packet inside.", "The server receives the packet; TCP hands it to the web server program on port 443.", "The answer returns the same way, and the router's NAT table sends it to your computer."],
              fa: ["sepehrniaz.ir را تایپ می‌کنی. مرورگر از DNS می‌پرسد و یک آدرس IP می‌گیرد.", "کامپیوتر آن آدرس را با شبکه‌ی خودش مقایسه می‌کند. جای دیگری است، پس بسته باید به گیت‌وی برود.", "ARP آدرس MAC گیت‌وی را پیدا می‌کند. بسته در فریمی با مقصدِ همان MAC بسته‌بندی می‌شود.", "سوئیچ آدرس MAC را می‌خواند و فریم را به پورت روتر می‌دهد.", "روتر فریم را باز می‌کند، آدرس IP را می‌خواند، آدرس خصوصی تو را با آدرس عمومی خودش عوض می‌کند (NAT)، بسته را در فریم جدیدی می‌گذارد و به شرکت اینترنت می‌فرستد.", "روتر پشت روتر همین را تکرار می‌کند: در هر قدم فریم جدید، با همان بسته‌ی IP درونش.", "سرور بسته را می‌گیرد و TCP آن را به برنامه‌ی وب‌سرور روی پورت ۴۴۳ می‌دهد.", "جواب از همان مسیر برمی‌گردد و جدول NAT روتر آن را به کامپیوتر تو می‌رساند."] } },
    { p: { en: "Notice the pattern: the IP addresses stay the same for the whole journey (apart from NAT), while the MAC addresses change at every hop. That one sentence is the heart of networking.",
           fa: "به الگو دقت کن: آدرس‌های IP در کل سفر ثابت می‌مانند (به‌جز NAT)، ولی آدرس‌های MAC در هر قدم عوض می‌شوند. همین یک جمله قلب شبکه است." } },
    { code: "traceroute sepehrniaz.ir     # Linux / macOS\ntracert sepehrniaz.ir        # Windows", lang: "bash",
      cap: { en: "These commands list every router on the way and how long each took to answer.", fa: "این دستورها همه‌ی روترهای مسیر و زمان پاسخ هر کدام را فهرست می‌کنند." } }
  ]
});
window.LEARN.study["how-data-travels"] = {
  goals: { en: ["Explain the difference between a switch and a router", "Describe what ARP, DNS and DHCP each do", "Follow one request from the browser to the server, naming each step"],
           fa: ["تفاوت سوئیچ و روتر را توضیح بدهی", "بگویی ARP، DNS و DHCP هر کدام چه می‌کنند", "یک درخواست را از مرورگر تا سرور دنبال کنی و هر قدم را نام ببری"] },
  mistakes: { en: ["Thinking a switch and a router are the same box with different prices.", "Blaming 'the internet' when only DNS is failing.", "Giving a printer an address from the DHCP pool by hand — later the server gives the same address to a phone.", "Plugging a second home router's LAN port into the network: its DHCP server starts handing out wrong settings."],
              fa: ["اینکه فکر کنی سوئیچ و روتر یک جعبه‌اند با قیمت متفاوت.", "تقصیر را گردن «اینترنت» انداختن وقتی فقط DNS خراب است.", "دادن دستی یک آدرس از مخزن DHCP به پرینتر — بعداً سرور همان آدرس را به یک گوشی می‌دهد.", "وصل‌کردن پورت LAN یک روتر خانگی دوم به شبکه: سرور DHCP آن شروع به پخش تنظیمات اشتباه می‌کند."] },
  practice: [
    { q: { en: "Two computers are on the same switch with addresses 192.168.1.10/24 and 192.168.2.10/24. Can they talk without a router? Why?", fa: "دو کامپیوتر روی یک سوئیچ‌اند با آدرس‌های 192.168.1.10/24 و 192.168.2.10/24. بدون روتر می‌توانند حرف بزنند؟ چرا؟" }, a: { en: "No. They are in different IP networks, so each sends its packets to its gateway. Without a router between the two networks nothing arrives.", fa: "نه. در دو شبکه‌ی IP مختلف‌اند، پس هر کدام بسته‌هایش را به گیت‌وی خودش می‌فرستد. بدون روتر بین دو شبکه چیزی نمی‌رسد." } },
    { q: { en: "Which address changes at every hop, and which stays the same?", fa: "کدام آدرس در هر قدم عوض می‌شود و کدام ثابت می‌ماند؟" }, a: { en: "The MAC addresses change at every hop; the IP addresses stay the same from end to end (except where NAT rewrites them).", fa: "آدرس‌های MAC در هر قدم عوض می‌شوند و آدرس‌های IP از ابتدا تا انتها ثابت می‌مانند (به‌جز جایی که NAT بازنویسی‌شان می‌کند)." } },
    { q: { en: "A user can open 142.250.74.14 in the browser but not google.com. What is broken?", fa: "کاربری 142.250.74.14 را در مرورگر باز می‌کند ولی google.com را نه. چه چیزی خراب است؟" }, a: { en: "DNS. The path works; names are not being resolved. Check the DNS server setting.", fa: "DNS. مسیر سالم است ولی اسم‌ها تبدیل نمی‌شوند. تنظیم سرور DNS را بررسی کن." } },
    { q: { en: "Which four settings does DHCP give a device?", fa: "DHCP کدام چهار تنظیم را به دستگاه می‌دهد؟" }, a: { en: "IP address, subnet mask, default gateway and DNS server (plus the lease time).", fa: "آدرس IP، ماسک زیرشبکه، گیت‌وی پیش‌فرض و سرور DNS (به‌علاوه‌ی مدت اجاره)." } }
  ],
  recap: { en: ["Switch: one network, MAC addresses. Router: between networks, IP addresses.", "ARP finds a MAC for an IP; DNS finds an IP for a name; DHCP gives the settings.", "IP addresses stay, MAC addresses change at every hop."],
           fa: ["سوئیچ: یک شبکه، آدرس MAC. روتر: بین شبکه‌ها، آدرس IP.", "ARP برای یک IP آدرس MAC پیدا می‌کند؛ DNS برای یک اسم آدرس IP؛ DHCP تنظیمات را می‌دهد.", "آدرس IP می‌ماند و آدرس MAC در هر قدم عوض می‌شود."] }
};

window.LEARN.articles.push({
  id: "ports-and-protocols", track: "network", icon: "network", level: "beginner", minutes: 22, updated: "2026-11",
  title: { en: "Ports and protocols: TCP, UDP and the services behind them", fa: "پورت‌ها و پروتکل‌ها: TCP، UDP و سرویس‌های پشتشان" },
  summary: { en: "What a port is, how TCP and UDP differ, the port numbers worth knowing by heart, and how to see which ports are open on a machine.",
             fa: "پورت چیست، TCP و UDP چه فرقی دارند، شماره‌پورت‌هایی که ارزش حفظ‌کردن دارند و چطور ببینی کدام پورت‌ها روی یک دستگاه بازند." },
  blocks: [
    { h: { en: "One address, many programs", fa: "یک آدرس، چند برنامه" } },
    { p: { en: "An IP address brings data to a computer. But one computer runs many programs that use the network at the same time: a browser, a mail app, a game. How does the computer know which program an arriving packet is for? Each program is given a number between 0 and 65535, called a port. If the IP address is the address of a building, the port is the number of the flat. A connection is always described by both: 192.168.1.50:443 means 'port 443 on the machine 192.168.1.50'.",
           fa: "آدرس IP داده را به یک کامپیوتر می‌رساند. ولی روی یک کامپیوتر هم‌زمان چند برنامه از شبکه استفاده می‌کنند: مرورگر، برنامه‌ی ایمیل، بازی. کامپیوتر از کجا بفهمد بسته‌ای که رسیده مال کدام برنامه است؟ به هر برنامه عددی بین ۰ تا ۶۵۵۳۵ داده می‌شود که «پورت» نام دارد. اگر آدرس IP نشانی یک ساختمان باشد، پورت شماره‌ی واحد است. هر اتصال همیشه با هر دو توصیف می‌شود: 192.168.1.50:443 یعنی «پورت ۴۴۳ روی دستگاه 192.168.1.50»." } },
    { p: { en: "A program that waits for others to connect is called a server, and it listens on a fixed, well-known port so that everyone knows where to knock: web servers on 443, SSH on 22. The program that starts the conversation is the client; the operating system lends it a random high port (somewhere above 49152) just for that conversation. So a visit to a website might be a conversation between your port 51734 and the server's port 443.",
           fa: "برنامه‌ای که منتظر اتصال دیگران می‌ماند «سرور» است و روی یک پورت ثابت و شناخته‌شده گوش می‌دهد تا همه بدانند کجا را بزنند: وب‌سرور روی ۴۴۳ و SSH روی ۲۲. برنامه‌ای که گفتگو را شروع می‌کند «کلاینت» است و سیستم‌عامل فقط برای همان گفتگو یک پورت تصادفیِ بالا (بالاتر از ۴۹۱۵۲) به او قرض می‌دهد. پس بازدید از یک سایت می‌تواند گفتگویی بین پورت ۵۱۷۳۴ تو و پورت ۴۴۳ سرور باشد." } },

    { h: { en: "TCP: careful and in order", fa: "TCP: دقیق و به‌ترتیب" } },
    { p: { en: "TCP is like a phone call. Before any data is sent, the two sides agree to talk with three short messages — the three-way handshake. The client says SYN ('may I talk to you?'), the server answers SYN-ACK ('yes, and may I talk to you?'), and the client replies ACK ('yes'). After that, every piece of data is numbered and confirmed; anything that gets lost is sent again, and the pieces are put back in the right order. This makes TCP reliable, at the cost of a little speed. Web pages, email, file transfers and SSH all use it, because a missing piece would ruin them.",
           fa: "TCP مثل تماس تلفنی است. قبل از فرستادن هر داده‌ای، دو طرف با سه پیام کوتاه توافق می‌کنند که حرف بزنند — «دست‌دادن سه‌مرحله‌ای». کلاینت می‌گوید SYN («می‌توانم با تو حرف بزنم؟»)، سرور جواب می‌دهد SYN-ACK («بله، من هم می‌توانم با تو حرف بزنم؟») و کلاینت می‌گوید ACK («بله»). بعد از آن هر تکه‌ی داده شماره می‌خورد و تأیید می‌شود؛ هر چه گم شود دوباره فرستاده می‌شود و تکه‌ها به ترتیب درست کنار هم قرار می‌گیرند. این TCP را مطمئن می‌کند، به قیمت کمی سرعت. صفحه‌ی وب، ایمیل، انتقال فایل و SSH همه از آن استفاده می‌کنند، چون یک تکه‌ی گم‌شده خرابشان می‌کند." } },
    { h: { en: "UDP: fast and without promises", fa: "UDP: سریع و بدون قول" } },
    { p: { en: "UDP is like posting a card: you send it and hope. There is no handshake, no confirmation and no resending. That sounds worse, but it is exactly right when speed matters more than perfection, or when the question and answer are tiny. In a video call a lost fraction of a second is better skipped than delivered late. A DNS question fits in one packet, so a handshake would only waste time.",
           fa: "UDP مثل انداختن کارت‌پستال در صندوق است: می‌فرستی و امیدواری برسد. نه دست‌دادن دارد، نه تأیید و نه ارسال دوباره. بدتر به نظر می‌رسد، ولی وقتی سرعت از بی‌نقصی مهم‌تر است یا سؤال و جواب خیلی کوچک است دقیقاً درست است. در تماس تصویری، کسری از ثانیه که گم شده بهتر است رد شود تا دیر برسد. یک سؤال DNS در یک بسته جا می‌شود، پس دست‌دادن فقط وقت تلف می‌کند." } },
    { table: { head: { en: ["", "TCP", "UDP"], fa: ["", "TCP", "UDP"] }, rows: [
      [{ en: "Connection first?", fa: "اول اتصال؟" }, { en: "yes — handshake", fa: "بله — دست‌دادن" }, { en: "no", fa: "نه" }],
      [{ en: "Lost data", fa: "داده‌ی گم‌شده" }, { en: "sent again", fa: "دوباره فرستاده می‌شود" }, { en: "gone", fa: "از دست می‌رود" }],
      [{ en: "Order", fa: "ترتیب" }, { en: "kept", fa: "حفظ می‌شود" }, { en: "not guaranteed", fa: "تضمینی نیست" }],
      [{ en: "Speed", fa: "سرعت" }, { en: "slower", fa: "کندتر" }, { en: "faster", fa: "سریع‌تر" }],
      [{ en: "Used by", fa: "استفاده در" }, "HTTP, HTTPS, SSH, SMTP, RDP", "DNS, DHCP, VoIP, video, games, SNMP"]
    ] } },

    { h: { en: "The ports worth knowing by heart", fa: "پورت‌هایی که ارزش حفظ‌کردن دارند" } },
    { table: { head: { en: ["Port", "Protocol", "What it is for"], fa: ["پورت", "پروتکل", "برای چه کاری"] }, rows: [
      ["20, 21 TCP", "FTP", { en: "Old file transfer; passwords travel unencrypted", fa: "انتقال فایل قدیمی؛ رمز بدون رمزنگاری می‌رود" }],
      ["22 TCP", "SSH / SFTP", { en: "Secure terminal and file transfer", fa: "ترمینال و انتقال فایل امن" }],
      ["23 TCP", "Telnet", { en: "Unencrypted terminal — should be off everywhere", fa: "ترمینال بدون رمزنگاری — همه‌جا باید خاموش باشد" }],
      ["25, 587 TCP", "SMTP", { en: "Sending email", fa: "فرستادن ایمیل" }],
      ["53 UDP/TCP", "DNS", { en: "Names to addresses", fa: "تبدیل اسم به آدرس" }],
      ["67, 68 UDP", "DHCP", { en: "Automatic network settings", fa: "تنظیم خودکار شبکه" }],
      ["80 TCP", "HTTP", { en: "Web, unencrypted", fa: "وب بدون رمزنگاری" }],
      ["123 UDP", "NTP", { en: "Keeping clocks in step", fa: "هماهنگ نگه‌داشتن ساعت‌ها" }],
      ["143, 993 TCP", "IMAP", { en: "Reading email (993 is the encrypted one)", fa: "خواندن ایمیل (۹۹۳ نسخه‌ی رمزنگاری‌شده است)" }],
      ["161 UDP", "SNMP", { en: "Monitoring network devices", fa: "پایش تجهیزات شبکه" }],
      ["443 TCP", "HTTPS", { en: "Encrypted web", fa: "وب رمزنگاری‌شده" }],
      ["445 TCP", "SMB", { en: "Windows file sharing — never open to the internet", fa: "اشتراک فایل ویندوز — هیچ‌وقت رو به اینترنت باز نشود" }],
      ["3306 TCP", "MySQL", { en: "Database", fa: "پایگاه‌داده" }],
      ["3389 TCP", "RDP", { en: "Windows remote desktop", fa: "ریموت دسکتاپ ویندوز" }],
      ["554 TCP", "RTSP", { en: "Video streams from IP cameras", fa: "پخش تصویر دوربین‌های IP" }]
    ] } },
    { p: { en: "Ports 0 to 1023 are the 'well-known' ports, reserved for standard services; on Linux only the administrator may listen on them. 1024 to 49151 are registered for particular applications, and the rest are lent to clients.",
           fa: "پورت‌های ۰ تا ۱۰۲۳ «شناخته‌شده»‌اند و برای سرویس‌های استاندارد رزرو شده‌اند؛ در لینوکس فقط مدیر سیستم می‌تواند رویشان گوش بدهد. ۱۰۲۴ تا ۴۹۱۵۱ برای برنامه‌های مشخص ثبت شده‌اند و بقیه به کلاینت‌ها قرض داده می‌شوند." } },

    { h: { en: "Open, closed and filtered", fa: "باز، بسته و فیلترشده" } },
    { p: { en: "When you knock on a port, one of three things happens. If a program is listening, it answers and the port is open. If nothing is listening, the machine itself answers 'nobody here' at once — the port is closed. If a firewall is in the way, your knock is silently thrown away and you wait until you give up — the port is filtered. This difference is a useful clue: an instant refusal means the machine is alive but the service is not running; a long silence means a firewall, or no machine at all.",
           fa: "وقتی به یک پورت می‌زنی یکی از سه اتفاق می‌افتد. اگر برنامه‌ای گوش بدهد، جواب می‌دهد و پورت «باز» است. اگر چیزی گوش ندهد، خود دستگاه فوری جواب می‌دهد «کسی اینجا نیست» — پورت «بسته» است. اگر فایروالی سر راه باشد، درخواستت بی‌صدا دور ریخته می‌شود و آن‌قدر منتظر می‌مانی تا منصرف شوی — پورت «فیلترشده» است. این تفاوت سرنخ خوبی است: ردِ فوری یعنی دستگاه روشن است ولی سرویس اجرا نمی‌شود؛ سکوت طولانی یعنی فایروال، یا اصلاً دستگاهی نیست." } },

    { h: { en: "Looking at ports yourself", fa: "خودت پورت‌ها را ببین" } },
    { code: "# What is listening on this machine?\nsudo ss -tulnp                 # Linux: t=TCP u=UDP l=listening n=numbers p=program\nnetstat -ano | findstr LISTENING   # Windows\n\n# Can I reach a port on another machine?\nnc -vz 192.168.1.50 22         # Linux / macOS\nTest-NetConnection 192.168.1.50 -Port 3389   # Windows PowerShell\ncurl -I https://sepehrniaz.ir  # talk to a web server and show its reply headers", lang: "bash",
      cap: { en: "Listening ports on your own machine, and a single-port test against another.", fa: "پورت‌های در حال گوش‌دادن روی دستگاه خودت و آزمایش یک پورت روی دستگاه دیگر." } },
    { p: { en: "To check many ports on many machines you use a port scanner. The Port Scanner in the Tools section is a small one written in Python — its build tutorial shows that scanning is nothing more than trying to open a TCP connection to each port and noting which ones answer. Scan only networks that are yours or that you have written permission to test.",
           fa: "برای بررسی پورت‌های زیاد روی دستگاه‌های زیاد از «اسکنر پورت» استفاده می‌کنی. «اسکنر پورت» در بخش ابزارها نمونه‌ی کوچکی به زبان پایتون است — آموزش ساختش نشان می‌دهد اسکن چیزی جز تلاش برای بازکردن اتصال TCP به هر پورت و یادداشت‌کردن جواب‌ها نیست. فقط شبکه‌ای را اسکن کن که مال خودت است یا اجازه‌ی کتبی برای آزمایشش داری." } },

    { h: { en: "Ports and security", fa: "پورت و امنیت" } },
    { list: { en: ["Every open port is a door. The fewer doors, the less there is to defend.", "The question is never only 'is it open?' but 'open to whom?'. A database port open to the web server is normal; open to the whole internet is an incident waiting to happen.", "Moving a service to an unusual port (SSH on 2222) reduces noise from robots but is not protection; they scan all 65535.", "Prefer the encrypted member of each pair: HTTPS over HTTP, SSH over Telnet, SFTP over FTP, IMAPS over IMAP.", "A firewall rule has four parts — source, destination, port and action. Learn to read a rule aloud: 'allow TCP from the office network to the server on port 443'."],
              fa: ["هر پورت باز یک در است. هر چه در کمتر، چیز کمتری برای دفاع.", "سؤال هیچ‌وقت فقط «باز است؟» نیست، بلکه «برای چه کسی باز است؟». پورت پایگاه‌داده که برای وب‌سرور باز باشد عادی است؛ برای کل اینترنت باز باشد یعنی حادثه‌ای در راه.", "بردن یک سرویس به پورت غیرمعمول (SSH روی ۲۲۲۲) سروصدای ربات‌ها را کم می‌کند ولی محافظت نیست؛ آن‌ها هر ۶۵۵۳۵ را اسکن می‌کنند.", "از هر جفت، عضو رمزنگاری‌شده را انتخاب کن: HTTPS به‌جای HTTP، SSH به‌جای Telnet، SFTP به‌جای FTP و IMAPS به‌جای IMAP.", "یک قانون فایروال چهار بخش دارد — مبدأ، مقصد، پورت و عمل. یاد بگیر قانون را بلند بخوانی: «TCP از شبکه‌ی اداره به سرور روی پورت ۴۴۳ مجاز»."] } }
  ]
});
window.LEARN.study["ports-and-protocols"] = {
  goals: { en: ["Explain what a port is and why a connection needs one", "Choose between TCP and UDP for a given job", "Name the common ports and check which are open"],
           fa: ["توضیح بدهی پورت چیست و چرا اتصال به آن نیاز دارد", "برای یک کار مشخص بین TCP و UDP انتخاب کنی", "پورت‌های رایج را نام ببری و بررسی کنی کدام‌ها بازند"] },
  mistakes: { en: ["Opening a port on the router 'just to test' and forgetting it.", "Confusing closed (instant refusal) with filtered (silence).", "Testing a UDP service with a TCP tool and concluding it is down.", "Believing a changed port number hides a service."],
              fa: ["بازکردن یک پورت روی روتر «فقط برای آزمایش» و فراموش‌کردنش.", "اشتباه‌گرفتن بسته (ردِ فوری) با فیلترشده (سکوت).", "آزمایش یک سرویس UDP با ابزار TCP و نتیجه‌گیری اینکه خاموش است.", "باور به اینکه عوض‌کردن شماره‌ی پورت سرویس را پنهان می‌کند."] },
  practice: [
    { q: { en: "Which transport protocol and port does a normal DNS question use, and why?", fa: "یک سؤال معمولی DNS از کدام پروتکل انتقال و پورت استفاده می‌کند و چرا؟" }, a: { en: "UDP port 53. The question and answer each fit in one packet, so a handshake would only add delay.", fa: "UDP پورت ۵۳. سؤال و جواب هر کدام در یک بسته جا می‌شوند، پس دست‌دادن فقط تأخیر اضافه می‌کند." } },
    { q: { en: "Put the three messages of the TCP handshake in order.", fa: "سه پیام دست‌دادن TCP را به ترتیب بنویس." }, a: { en: "SYN → SYN-ACK → ACK", fa: "SYN ← SYN-ACK ← ACK" } },
    { q: { en: "A scan of a switch shows port 23 open. What is it, and what do you do?", fa: "اسکن یک سوئیچ نشان می‌دهد پورت ۲۳ باز است. چیست و چه می‌کنی؟" }, a: { en: "Telnet — an unencrypted terminal. Turn it off and manage the switch over SSH (port 22) instead.", fa: "Telnet — ترمینال بدون رمزنگاری. خاموشش کن و سوئیچ را به‌جایش با SSH (پورت ۲۲) مدیریت کن." } },
    { q: { en: "nc to a server's port 443 fails at once with 'connection refused'. What does that tell you?", fa: "nc به پورت ۴۴۳ یک سرور فوراً با «connection refused» خطا می‌دهد. این چه می‌گوید؟" }, a: { en: "The machine is reachable, but no program is listening on 443: the web server is stopped or listening elsewhere. It is not a firewall — a firewall would give silence.", fa: "دستگاه در دسترس است ولی برنامه‌ای روی ۴۴۳ گوش نمی‌دهد: وب‌سرور متوقف است یا جای دیگری گوش می‌دهد. فایروال نیست — فایروال سکوت می‌کرد." } }
  ],
  recap: { en: ["IP address = the machine; port = the program.", "TCP: handshake, reliable, ordered. UDP: no promises, fast.", "22 SSH, 53 DNS, 80/443 web, 3389 RDP.", "Open, closed and filtered give three different answers."],
           fa: ["آدرس IP = دستگاه؛ پورت = برنامه.", "TCP: دست‌دادن، مطمئن، به‌ترتیب. UDP: بدون قول، سریع.", "۲۲ برای SSH، ۵۳ برای DNS، ۸۰ و ۴۴۳ برای وب، ۳۳۸۹ برای RDP.", "باز، بسته و فیلترشده سه جواب متفاوت می‌دهند."] }
};

window.LEARN.articles.push({
  id: "network-troubleshooting", track: "network", icon: "network", level: "intermediate", minutes: 24, updated: "2026-11",
  title: { en: "Network troubleshooting: a method that always works", fa: "عیب‌یابی شبکه: روشی که همیشه جواب می‌دهد" },
  summary: { en: "Stop guessing. A fixed order of tests, the tools for each one on Windows and Linux, and seven real faults with their causes.",
             fa: "حدس‌زدن را کنار بگذار. ترتیبی ثابت از آزمون‌ها، ابزار هر کدام در ویندوز و لینوکس و هفت خرابی واقعی با دلیلشان." },
  blocks: [
    { h: { en: "Why a method beats experience", fa: "چرا روش از تجربه بهتر است" } },
    { p: { en: "When a user says 'the internet doesn't work', there are dozens of possible causes, from a loose cable to a fault at the provider. The beginner tries things at random: restarts the router, changes the DNS, reinstalls the driver. Sometimes it works, and nothing is learned. The professional asks a few questions, then tests in a fixed order from the nearest thing to the farthest. Each test cuts the remaining possibilities in half, and the first test that fails points at the fault. You do not need to be clever; you need to be orderly.",
           fa: "وقتی کاربری می‌گوید «اینترنت کار نمی‌کند»، ده‌ها دلیل ممکن وجود دارد، از کابل شل تا خرابی شرکت اینترنت. تازه‌کار تصادفی چیزهایی را امتحان می‌کند: روتر را خاموش و روشن می‌کند، DNS را عوض می‌کند، درایور را دوباره نصب می‌کند. گاهی جواب می‌دهد و چیزی هم یاد گرفته نمی‌شود. حرفه‌ای چند سؤال می‌پرسد و بعد به ترتیبی ثابت، از نزدیک‌ترین چیز به دورترین، آزمایش می‌کند. هر آزمون احتمال‌های باقی‌مانده را نصف می‌کند و اولین آزمونی که خطا بدهد خرابی را نشان می‌دهد. لازم نیست باهوش باشی؛ لازم است منظم باشی." } },

    { h: { en: "First, three questions", fa: "اول، سه سؤال" } },
    { list: { en: ["What exactly does not work? 'No website opens' and 'one website is slow' are different faults.", "Who is affected? One device means the problem is in that device or its cable. A whole room points to a switch. Everyone points to the router or the provider.", "What changed? A new device, an update, a moved cable. Most faults begin with a change."],
              fa: ["دقیقاً چه چیزی کار نمی‌کند؟ «هیچ سایتی باز نمی‌شود» و «یک سایت کند است» دو خرابی متفاوت‌اند.", "چه کسانی درگیرند؟ یک دستگاه یعنی مشکل در همان دستگاه یا کابلش است. یک اتاق کامل به سوئیچ اشاره می‌کند. همه یعنی روتر یا شرکت اینترنت.", "چه چیزی عوض شده؟ دستگاه جدید، به‌روزرسانی، کابل جابه‌جاشده. بیشتر خرابی‌ها با یک تغییر شروع می‌شوند."] } },

    { h: { en: "The ladder: seven tests from near to far", fa: "نردبان: هفت آزمون از نزدیک به دور" } },
    { table: { head: { en: ["#", "Question", "Windows", "Linux"], fa: ["#", "سؤال", "ویندوز", "لینوکس"] }, rows: [
      ["1", { en: "Is the link up? (lights, Wi-Fi bars)", fa: "اتصال برقرار است؟ (چراغ‌ها، آنتن وای‌فای)" }, "ipconfig /all", "ip link"],
      ["2", { en: "Do I have an address?", fa: "آدرس دارم؟" }, "ipconfig", "ip addr"],
      ["3", { en: "Does my own network stack work?", fa: "نرم‌افزار شبکه‌ی خودم کار می‌کند؟" }, "ping 127.0.0.1", "ping -c 3 127.0.0.1"],
      ["4", { en: "Can I reach the gateway?", fa: "به گیت‌وی می‌رسم؟" }, "ping 192.168.1.1", "ping -c 3 192.168.1.1"],
      ["5", { en: "Can I reach the internet by address?", fa: "با آدرس به اینترنت می‌رسم؟" }, "ping 8.8.8.8", "ping -c 3 8.8.8.8"],
      ["6", { en: "Do names work?", fa: "اسم‌ها کار می‌کنند؟" }, "nslookup google.com", "dig google.com +short"],
      ["7", { en: "Does the service itself answer?", fa: "خود سرویس جواب می‌دهد؟" }, "Test-NetConnection host -Port 443", "nc -vz host 443"]
    ] } },
    { p: { en: "Stop at the first step that fails; everything before it is proven to work, and everything after it cannot be judged yet.",
           fa: "در اولین قدمی که خطا می‌دهد بایست؛ هر چه قبل از آن بود ثابت شده کار می‌کند و درباره‌ی هر چه بعد از آن است هنوز نمی‌شود قضاوت کرد." } },

    { h: { en: "What each failure means", fa: "هر خطا یعنی چه" } },
    { table: { head: { en: ["Fails at", "Look here"], fa: ["خطا در قدم", "اینجا را ببین"] }, rows: [
      ["1", { en: "Cable, wall socket, switch port, Wi-Fi password, a disabled adapter. Try another cable and another port.", fa: "کابل، پریز دیواری، پورت سوئیچ، رمز وای‌فای، کارت شبکه‌ی غیرفعال. کابل و پورت دیگری را امتحان کن." }],
      ["2", { en: "An address starting with 169.254 means DHCP did not answer: DHCP server down, pool empty, or the port is in the wrong VLAN.", fa: "آدرسی که با 169.254 شروع شود یعنی DHCP جواب نداده: سرور DHCP خاموش است، مخزن خالی شده یا پورت در VLAN اشتباه است." }],
      ["3", { en: "Rare: the network software of the computer is damaged. Reset it or reinstall the driver.", fa: "کم پیش می‌آید: نرم‌افزار شبکه‌ی کامپیوتر آسیب دیده. بازنشانی‌اش کن یا درایور را دوباره نصب کن." }],
      ["4", { en: "Wrong address, mask or gateway; an address conflict; a faulty switch; the router is off.", fa: "آدرس، ماسک یا گیت‌وی اشتباه؛ تداخل آدرس؛ سوئیچ خراب؛ روتر خاموش." }],
      ["5", { en: "The local network is fine. The fault is the router's internet side or the provider. Check the router's WAN light and status page.", fa: "شبکه‌ی محلی سالم است. خرابی از سمت اینترنتِ روتر یا شرکت اینترنت است. چراغ WAN و صفحه‌ی وضعیت روتر را ببین." }],
      ["6", { en: "DNS. Try another DNS server; clear the cache with ipconfig /flushdns.", fa: "DNS. سرور DNS دیگری را امتحان کن؛ با ipconfig /flushdns کش را پاک کن." }],
      ["7", { en: "The network is fine; the service is down, or a firewall blocks that port.", fa: "شبکه سالم است؛ سرویس خاموش است یا فایروال آن پورت را می‌بندد." }]
    ] } },

    { h: { en: "Reading ping properly", fa: "خواندن درست ping" } },
    { code: "$ ping -c 4 192.168.1.1\n64 bytes from 192.168.1.1: icmp_seq=1 ttl=64 time=1.21 ms\n64 bytes from 192.168.1.1: icmp_seq=2 ttl=64 time=0.98 ms\n64 bytes from 192.168.1.1: icmp_seq=3 ttl=64 time=45.3 ms\n64 bytes from 192.168.1.1: icmp_seq=4 ttl=64 time=1.05 ms\n\n4 packets transmitted, 4 received, 0% packet loss\nrtt min/avg/max = 0.98/12.1/45.3 ms", lang: "bash",
      cap: { en: "An example of what ping prints. Three numbers matter: the loss, the average time and how much the time jumps around.", fa: "نمونه‌ای از خروجی ping. سه عدد مهم است: درصد گم‌شدن، میانگین زمان و اینکه زمان چقدر بالا و پایین می‌پرد." } },
    { list: { en: ["time: under 5 ms inside a building, 20–80 ms to a server in the same region. Large jumps mean a busy or poor link.", "packet loss: anything above 1% on a cable is a fault — usually a bad cable, a damaged port or interference on Wi-Fi.", "'Request timed out' — nothing came back: the target is off, or a firewall drops ping.", "'Destination host unreachable' — your own computer or a router says it has no way to get there: check the address and gateway.", "A device that does not answer ping is not always down; many firewalls block ping. Test the real port instead."],
              fa: ["time: داخل ساختمان زیر ۵ میلی‌ثانیه و تا سروری در همان منطقه ۲۰ تا ۸۰ میلی‌ثانیه. پرش‌های بزرگ یعنی اتصال شلوغ یا ضعیف.", "packet loss: هر چیزی بالای ۱٪ روی کابل خرابی است — معمولاً کابل بد، پورت آسیب‌دیده یا تداخل در وای‌فای.", "«Request timed out» — چیزی برنگشته: مقصد خاموش است یا فایروال ping را دور می‌ریزد.", "«Destination host unreachable» — کامپیوتر خودت یا یک روتر می‌گوید راهی به آنجا ندارد: آدرس و گیت‌وی را بررسی کن.", "دستگاهی که به ping جواب نمی‌دهد همیشه خاموش نیست؛ خیلی از فایروال‌ها ping را می‌بندند. به‌جایش پورت واقعی را آزمایش کن."] } },

    { h: { en: "Where does the path stop? traceroute", fa: "مسیر کجا می‌ایستد؟ traceroute" } },
    { p: { en: "traceroute (tracert on Windows) lists every router between you and the destination. If the list stops at your own router, the problem is local. If it stops inside the provider's network, call them and read out the last address that answered. Stars in the middle of a list that later continues are normal — some routers simply do not reply.",
           fa: "traceroute (در ویندوز tracert) همه‌ی روترهای بین تو و مقصد را فهرست می‌کند. اگر فهرست در روتر خودت بایستد، مشکل محلی است. اگر داخل شبکه‌ی شرکت اینترنت بایستد، با آن‌ها تماس بگیر و آخرین آدرسی را که جواب داده بخوان. ستاره در میانه‌ی فهرستی که بعدش ادامه پیدا می‌کند عادی است — بعضی روترها اصلاً جواب نمی‌دهند." } },

    { h: { en: "Seven real faults", fa: "هفت خرابی واقعی" } },
    { table: { head: { en: ["Symptom", "Cause", "Fix"], fa: ["نشانه", "دلیل", "راه‌حل"] }, rows: [
      [{ en: "Two devices drop off in turn", fa: "دو دستگاه به‌نوبت قطع می‌شوند" }, { en: "The same IP address on both", fa: "یک آدرس IP روی هر دو" }, { en: "Fixed addresses outside the DHCP pool, or reservations", fa: "آدرس ثابت بیرون از مخزن DHCP یا رزرو" }],
      [{ en: "New devices get 169.254.x.x", fa: "دستگاه‌های جدید 169.254.x.x می‌گیرند" }, { en: "DHCP pool is full", fa: "مخزن DHCP پر شده" }, { en: "Larger pool, shorter lease time", fa: "مخزن بزرگ‌تر، مدت اجاره‌ی کوتاه‌تر" }],
      [{ en: "Some devices get strange addresses and no internet", fa: "بعضی دستگاه‌ها آدرس عجیب می‌گیرند و اینترنت ندارند" }, { en: "A second DHCP server — someone plugged in a home router", fa: "سرور DHCP دوم — کسی یک روتر خانگی وصل کرده" }, { en: "Find and remove it; enable DHCP snooping on switches", fa: "پیدا و حذفش کن؛ DHCP Snooping را روی سوئیچ‌ها فعال کن" }],
      [{ en: "The whole network freezes, switch lights blink madly", fa: "کل شبکه قفل می‌شود و چراغ سوئیچ‌ها دیوانه‌وار چشمک می‌زنند" }, { en: "A loop: a cable joins two ports of the same network", fa: "حلقه: کابلی دو پورت همان شبکه را به هم وصل کرده" }, { en: "Remove the cable; keep spanning tree on", fa: "کابل را بردار؛ Spanning Tree را روشن نگه دار" }],
      [{ en: "Pages open by address but not by name", fa: "صفحه‌ها با آدرس باز می‌شوند ولی با اسم نه" }, { en: "DNS server unreachable or wrong", fa: "سرور DNS در دسترس نیست یا اشتباه است" }, { en: "Correct the DNS setting in DHCP", fa: "تنظیم DNS را در DHCP درست کن" }],
      [{ en: "Slow only in the evening", fa: "فقط عصرها کند است" }, { en: "The line is full: backups, updates or streaming", fa: "خط پر است: پشتیبان‌گیری، به‌روزرسانی یا پخش ویدیو" }, { en: "Move heavy jobs to night; limit guest speed", fa: "کارهای سنگین را به شب ببر؛ سرعت مهمان را محدود کن" }],
      [{ en: "One PC is slow, with packet loss", fa: "یک کامپیوتر کند است و بسته گم می‌کند" }, { en: "A damaged cable negotiating 10 or 100 Mbit", fa: "کابل آسیب‌دیده که روی ۱۰ یا ۱۰۰ مگابیت توافق کرده" }, { en: "Replace the cable; check the link speed", fa: "کابل را عوض کن؛ سرعت اتصال را بررسی کن" }]
    ] } },

    { h: { en: "Habits of a good troubleshooter", fa: "عادت‌های یک عیب‌یاب خوب" } },
    { list: { en: ["Change one thing at a time, and undo it if it did not help.", "Write down what you tested and what you saw. Your notes are the report, and the answer to 'what did you do?'.", "Keep a simple map of the network: which switch feeds which room, which address belongs to what.", "Know what normal looks like — the usual ping time, the usual load — so that abnormal stands out.", "After the fix, ask why it happened and what would stop it happening again.", "The Network Uptime Monitor in the Tools section runs steps 4 and 7 of the ladder for every device, all day, so that you hear about a fault before the users do."],
              fa: ["هر بار فقط یک چیز را عوض کن و اگر کمکی نکرد برش گردان.", "آنچه آزمایش کردی و دیدی را بنویس. یادداشت‌هایت همان گزارش است و جوابِ «چه‌کار کردی؟».", "یک نقشه‌ی ساده از شبکه نگه دار: کدام سوئیچ کدام اتاق را تغذیه می‌کند و هر آدرس مال چیست.", "بدان حالت عادی چه شکلی است — زمان ping معمول، بار معمول — تا غیرعادی به چشم بیاید.", "بعد از رفع مشکل بپرس چرا پیش آمد و چه چیزی جلوی تکرارش را می‌گیرد.", "«مانیتورینگ تجهیزات شبکه» در بخش ابزارها قدم‌های ۴ و ۷ نردبان را برای همه‌ی دستگاه‌ها، تمام روز، اجرا می‌کند تا قبل از کاربرها از خرابی باخبر شوی."] } }
  ]
});
window.LEARN.study["network-troubleshooting"] = {
  goals: { en: ["Ask the three questions that narrow a fault down", "Test in a fixed order and stop at the first failure", "Read ping and traceroute output and recognise common faults"],
           fa: ["سه سؤالی را بپرسی که دامنه‌ی خرابی را کوچک می‌کند", "به ترتیب ثابت آزمایش کنی و در اولین خطا بایستی", "خروجی ping و traceroute را بخوانی و خرابی‌های رایج را بشناسی"] },
  mistakes: { en: ["Restarting everything before looking — the evidence disappears.", "Changing several settings at once.", "Assuming 'no ping reply' means 'device is off'.", "Fixing the symptom and never finding the cause."],
              fa: ["خاموش و روشن‌کردن همه‌چیز قبل از نگاه‌کردن — مدرک‌ها از بین می‌روند.", "عوض‌کردن چند تنظیم با هم.", "فرض اینکه «جواب ping نیامد» یعنی «دستگاه خاموش است».", "رفع نشانه و هیچ‌وقت پیدانکردن دلیل."] },
  practice: [
    { q: { en: "A laptop shows the address 169.254.17.3. Which step of the ladder failed and what do you check?", fa: "لپ‌تاپی آدرس 169.254.17.3 را نشان می‌دهد. کدام قدم نردبان خطا داده و چه چیزی را بررسی می‌کنی؟" }, a: { en: "Step 2: DHCP did not answer. Check the cable or Wi-Fi, then whether the DHCP server is running and has free addresses.", fa: "قدم ۲: DHCP جواب نداده. کابل یا وای‌فای را بررسی کن و بعد اینکه سرور DHCP روشن است و آدرس آزاد دارد." } },
    { q: { en: "ping 192.168.1.1 works; ping 8.8.8.8 does not. Where is the fault?", fa: "ping 192.168.1.1 کار می‌کند و ping 8.8.8.8 نه. خرابی کجاست؟" }, a: { en: "Beyond the gateway: the router's internet connection or the provider. The local network is fine.", fa: "بعد از گیت‌وی: اتصال اینترنت روتر یا شرکت اینترنت. شبکه‌ی محلی سالم است." } },
    { q: { en: "Only one user in a room of ten has no network. Name the three most likely places to look.", fa: "از ده نفرِ یک اتاق فقط یک کاربر شبکه ندارد. سه جایی را که باید ببینی نام ببر." }, a: { en: "That user's cable, the wall socket or switch port it uses, and the network settings of that computer.", fa: "کابل همان کاربر، پریز دیواری یا پورت سوئیچش و تنظیمات شبکه‌ی همان کامپیوتر." } },
    { q: { en: "Ping to a server shows 12% packet loss on a cabled link. Is that acceptable?", fa: "ping به یک سرور روی اتصال کابلی ۱۲٪ گم‌شدن بسته نشان می‌دهد. قابل قبول است؟" }, a: { en: "No. A healthy cable shows 0%. Replace the cable and test another switch port.", fa: "نه. کابل سالم ۰٪ نشان می‌دهد. کابل را عوض کن و پورت دیگری از سوئیچ را امتحان کن." } }
  ],
  recap: { en: ["Ask: what, who, what changed.", "Link → address → self → gateway → internet → names → service.", "The first failing test points at the fault.", "One change at a time, and write it down."],
           fa: ["بپرس: چه چیزی، چه کسانی، چه تغییری.", "اتصال ← آدرس ← خودم ← گیت‌وی ← اینترنت ← اسم‌ها ← سرویس.", "اولین آزمونی که خطا بدهد خرابی را نشان می‌دهد.", "هر بار یک تغییر، و یادداشتش کن."] }
};

window.LEARN.articles.push({
  id: "switching-vlans", track: "network", icon: "network", level: "intermediate", minutes: 26, updated: "2026-11",
  title: { en: "Switching and VLANs", fa: "سوئیچینگ و VLAN" },
  summary: { en: "How to split one set of switches into several separate networks, what access and trunk ports are, and the security settings every switch should have — with Cisco commands.",
             fa: "چطور یک مجموعه سوئیچ را به چند شبکه‌ی جدا تقسیم کنی، پورت Access و Trunk چیست و هر سوئیچ چه تنظیمات امنیتی‌ای باید داشته باشد — با دستورهای سیسکو." },
  blocks: [
    { h: { en: "The problem VLANs solve", fa: "مشکلی که VLAN حل می‌کند" } },
    { p: { en: "A hotel wants guests, staff computers and cameras on separate networks, so that a guest can never reach the accounting server. The obvious way would be three sets of switches and three sets of cables — three times the cost. A VLAN (virtual LAN) does the same with one set: you tell the switch 'ports 1 to 12 are network 10, ports 13 to 20 are network 20', and it treats them as if they were different switches. A device in VLAN 10 cannot even see a device in VLAN 20; traffic between them must go through a router or firewall, where you decide what is allowed.",
           fa: "یک هتل می‌خواهد مهمان‌ها، کامپیوترهای کارمندان و دوربین‌ها در شبکه‌های جدا باشند تا مهمان هیچ‌وقت به سرور حسابداری نرسد. راه ساده سه دسته سوئیچ و سه دسته کابل است — سه برابر هزینه. VLAN (شبکه‌ی محلی مجازی) همین کار را با یک دسته انجام می‌دهد: به سوئیچ می‌گویی «پورت‌های ۱ تا ۱۲ شبکه‌ی ۱۰ هستند و پورت‌های ۱۳ تا ۲۰ شبکه‌ی ۲۰» و سوئیچ با آن‌ها طوری رفتار می‌کند که انگار سوئیچ‌های جدا هستند. دستگاهی در VLAN 10 حتی دستگاه VLAN 20 را نمی‌بیند؛ ترافیک بینشان باید از روتر یا فایروالی بگذرد که تو تعیین می‌کنی چه چیزی مجاز است." } },
    { list: { en: ["Security: groups that should not reach each other are separated.", "Less noise: broadcasts stay inside their own VLAN.", "Flexibility: moving a person to another department is a setting, not a new cable.", "Each VLAN is its own IP network, with its own subnet and gateway — VLAN 10 might be 192.168.10.0/24 and VLAN 20 192.168.20.0/24."],
              fa: ["امنیت: گروه‌هایی که نباید به هم برسند جدا می‌شوند.", "سروصدای کمتر: Broadcast داخل VLAN خودش می‌ماند.", "انعطاف: جابه‌جاکردن یک نفر به بخش دیگر یک تنظیم است، نه کابل جدید.", "هر VLAN شبکه‌ی IP خودش است، با زیرشبکه و گیت‌وی خودش — مثلاً VLAN 10 می‌تواند 192.168.10.0/24 باشد و VLAN 20 برابر 192.168.20.0/24."] } },

    { h: { en: "Access ports and trunk ports", fa: "پورت Access و پورت Trunk" } },
    { p: { en: "A switch port is one of two kinds. An access port belongs to exactly one VLAN and is where an ordinary device plugs in — a PC, a printer, a camera. The device knows nothing about VLANs. A trunk port carries many VLANs at once and connects switches to each other, or a switch to a router. To keep the VLANs apart on that shared cable, the switch adds a small label to every frame saying which VLAN it belongs to. The standard for that label is called 802.1Q, and the label is called a tag.",
           fa: "پورت سوئیچ یکی از این دو نوع است. پورت Access دقیقاً مال یک VLAN است و جایی است که یک دستگاه معمولی وصل می‌شود — کامپیوتر، پرینتر، دوربین. خود دستگاه از VLAN چیزی نمی‌داند. پورت Trunk چند VLAN را هم‌زمان حمل می‌کند و سوئیچ‌ها را به هم یا سوئیچ را به روتر وصل می‌کند. برای جدا نگه‌داشتن VLANها روی آن کابل مشترک، سوئیچ به هر فریم برچسب کوچکی اضافه می‌کند که می‌گوید مال کدام VLAN است. استاندارد این برچسب 802.1Q نام دارد و به خود برچسب «تگ» می‌گویند." } },
    { table: { head: { en: ["", "Access port", "Trunk port"], fa: ["", "پورت Access", "پورت Trunk"] }, rows: [
      [{ en: "Carries", fa: "حمل می‌کند" }, { en: "one VLAN", fa: "یک VLAN" }, { en: "many VLANs", fa: "چند VLAN" }],
      [{ en: "Frames are", fa: "فریم‌ها" }, { en: "untagged", fa: "بدون تگ" }, { en: "tagged (802.1Q)", fa: "تگ‌دار (802.1Q)" }],
      [{ en: "Connects to", fa: "وصل می‌شود به" }, { en: "PCs, printers, cameras", fa: "کامپیوتر، پرینتر، دوربین" }, { en: "switches, routers, access points", fa: "سوئیچ، روتر، اکسس‌پوینت" }]
    ] } },

    { h: { en: "Configuring it on a Cisco switch", fa: "تنظیم آن روی سوئیچ سیسکو" } },
    { p: { en: "Cisco's command line has levels. You start in user mode (the prompt ends with >). enable takes you to privileged mode (#), where you can look at everything. configure terminal takes you to configuration mode, where you change things. Commands can be shortened as long as they stay unique, and a question mark shows what you may type next.",
           fa: "خط فرمان سیسکو سطح دارد. در حالت کاربر شروع می‌کنی (خط فرمان با > تمام می‌شود). enable تو را به حالت ممتاز (#) می‌برد که همه‌چیز را می‌توانی ببینی. configure terminal تو را به حالت پیکربندی می‌برد که آنجا تغییر می‌دهی. دستورها را می‌شود کوتاه نوشت به شرطی که یکتا بمانند و علامت سؤال نشان می‌دهد بعدش چه می‌توانی تایپ کنی." } },
    { code: "Switch> enable\nSwitch# configure terminal\n\n! 1. create the VLANs and name them\nSwitch(config)# vlan 10\nSwitch(config-vlan)# name STAFF\nSwitch(config-vlan)# vlan 20\nSwitch(config-vlan)# name GUESTS\nSwitch(config-vlan)# exit\n\n! 2. put ports 1-12 in VLAN 10 as access ports\nSwitch(config)# interface range GigabitEthernet1/0/1 - 12\nSwitch(config-if-range)# switchport mode access\nSwitch(config-if-range)# switchport access vlan 10\nSwitch(config-if-range)# exit\n\n! 3. make port 24 a trunk to the next switch\nSwitch(config)# interface GigabitEthernet1/0/24\nSwitch(config-if)# switchport mode trunk\nSwitch(config-if)# switchport trunk allowed vlan 10,20\nSwitch(config-if)# end\n\n! 4. look, then save\nSwitch# show vlan brief\nSwitch# show interfaces trunk\nSwitch# copy running-config startup-config", lang: "cisco",
      cap: { en: "Lines starting with ! are comments. The last command saves the configuration; without it everything is lost when the switch restarts.", fa: "خط‌هایی که با ! شروع می‌شوند توضیح‌اند. دستور آخر پیکربندی را ذخیره می‌کند؛ بدون آن با راه‌اندازی دوباره‌ی سوئیچ همه‌چیز از بین می‌رود." } },

    { h: { en: "Letting VLANs talk: inter-VLAN routing", fa: "ارتباط بین VLANها: مسیریابی بین VLAN" } },
    { p: { en: "Separate VLANs are separate networks, so only a router can pass traffic between them. There are two common designs. In 'router on a stick', one trunk cable runs to a router that has a virtual interface for each VLAN. In a layer 3 switch, the switch itself has an address in each VLAN and routes between them, which is faster and is what most offices use today. Either way, that address becomes the default gateway of the devices in that VLAN — and the place where you put rules such as 'guests may reach the internet but not the staff network'.",
           fa: "VLANهای جدا شبکه‌های جدا هستند، پس فقط روتر می‌تواند ترافیک را بینشان عبور بدهد. دو طراحی رایج هست. در «Router on a Stick» یک کابل Trunk به روتری می‌رود که برای هر VLAN یک رابط مجازی دارد. در سوئیچ لایه‌ی ۳ خودِ سوئیچ در هر VLAN آدرس دارد و بینشان مسیریابی می‌کند که سریع‌تر است و امروز بیشتر اداره‌ها از آن استفاده می‌کنند. در هر دو حالت، همان آدرس گیت‌وی پیش‌فرض دستگاه‌های آن VLAN می‌شود — و جایی که قانون‌هایی مثل «مهمان به اینترنت برسد ولی به شبکه‌ی کارمندان نه» را می‌گذاری." } },
    { code: "! on a layer 3 switch\nSwitch(config)# ip routing\nSwitch(config)# interface vlan 10\nSwitch(config-if)# ip address 192.168.10.1 255.255.255.0\nSwitch(config-if)# no shutdown\nSwitch(config)# interface vlan 20\nSwitch(config-if)# ip address 192.168.20.1 255.255.255.0\nSwitch(config-if)# no shutdown", lang: "cisco" },

    { h: { en: "Loops and the spanning tree", fa: "حلقه و Spanning Tree" } },
    { p: { en: "Networks often have spare cables between switches so that one broken link does not cut off a floor. But two paths between the same switches form a loop, and a broadcast frame would circle it forever, multiplying until the network stops within seconds — a broadcast storm. The Spanning Tree Protocol (STP) prevents this automatically: the switches talk to each other, find the loops and block the spare links, opening them again only if the main link fails. It is on by default. Leave it on.",
           fa: "شبکه‌ها اغلب بین سوئیچ‌ها کابل یدکی دارند تا یک اتصال خراب یک طبقه را قطع نکند. ولی دو مسیر بین همان سوئیچ‌ها یک حلقه می‌سازد و فریم Broadcast تا ابد در آن می‌چرخد و آن‌قدر زیاد می‌شود که شبکه در چند ثانیه می‌ایستد — «طوفان Broadcast». پروتکل Spanning Tree (STP) خودکار جلوی این را می‌گیرد: سوئیچ‌ها با هم حرف می‌زنند، حلقه‌ها را پیدا می‌کنند و اتصال‌های یدکی را می‌بندند و فقط وقتی اتصال اصلی خراب شود دوباره بازشان می‌کنند. به‌طور پیش‌فرض روشن است. روشن بگذارش." } },

    { h: { en: "Security settings every switch should have", fa: "تنظیمات امنیتی که هر سوئیچ باید داشته باشد" } },
    { table: { head: { en: ["Setting", "What it stops"], fa: ["تنظیم", "جلوی چه چیزی را می‌گیرد"] }, rows: [
      ["Port security", { en: "Someone unplugging a PC and connecting their own device or a small switch", fa: "اینکه کسی کامپیوتر را بکشد و دستگاه خودش یا یک سوئیچ کوچک وصل کند" }],
      ["BPDU Guard", { en: "A switch plugged into an access port and disturbing the spanning tree", fa: "وصل‌شدن سوئیچ به پورت Access و به‌هم‌ریختن Spanning Tree" }],
      ["DHCP snooping", { en: "A fake DHCP server handing out wrong settings", fa: "سرور DHCP جعلی که تنظیمات اشتباه پخش می‌کند" }],
      ["Storm control", { en: "A broadcast storm taking the whole network down", fa: "طوفان Broadcast که کل شبکه را از کار می‌اندازد" }],
      [{ en: "Unused ports shut down", fa: "خاموشی پورت‌های بلااستفاده" }, { en: "A visitor plugging into an empty wall socket", fa: "وصل‌شدن یک بازدیدکننده به پریز خالی دیوار" }],
      [{ en: "SSH instead of Telnet", fa: "SSH به‌جای Telnet" }, { en: "The admin password being read off the network", fa: "خوانده‌شدن رمز مدیر از روی شبکه" }],
      [{ en: "A native VLAN nobody uses", fa: "Native VLAN بدون کاربر" }, { en: "VLAN hopping attacks through the trunk", fa: "حمله‌ی VLAN Hopping از راه Trunk" }]
    ] } },
    { code: "Switch(config)# interface range GigabitEthernet1/0/1 - 12\nSwitch(config-if-range)# switchport port-security\nSwitch(config-if-range)# switchport port-security maximum 2\nSwitch(config-if-range)# switchport port-security violation restrict\nSwitch(config-if-range)# spanning-tree portfast\nSwitch(config-if-range)# spanning-tree bpduguard enable\nSwitch(config-if-range)# storm-control broadcast level 5.00\n\nSwitch(config)# interface range GigabitEthernet1/0/21 - 23\nSwitch(config-if-range)# shutdown", lang: "cisco",
      cap: { en: "Typing this for every switch by hand is slow and error-prone. The Cisco Config Generator in the Tools section writes the whole file from a short description — its build tutorial shows how.", fa: "تایپ دستی این‌ها برای هر سوئیچ کند و پرخطاست. «تولیدکننده‌ی کانفیگ سوئیچ سیسکو» در بخش ابزارها کل فایل را از یک توصیف کوتاه می‌نویسد — آموزش ساختش نشان می‌دهد چطور." } },

    { h: { en: "A plan before the first command", fa: "طرح، قبل از اولین دستور" } },
    { table: { head: { en: ["VLAN", "Name", "Subnet", "Gateway", "Who"], fa: ["VLAN", "نام", "زیرشبکه", "گیت‌وی", "چه کسانی"] }, rows: [
      ["10", "STAFF", "192.168.10.0/24", "192.168.10.1", { en: "Office computers", fa: "کامپیوترهای اداری" }],
      ["20", "GUESTS", "192.168.20.0/23", "192.168.20.1", { en: "Guest Wi-Fi, internet only", fa: "وای‌فای مهمان، فقط اینترنت" }],
      ["30", "CAMERAS", "192.168.30.0/26", "192.168.30.1", { en: "Cameras and the recorder", fa: "دوربین‌ها و دستگاه ضبط" }],
      ["40", "VOICE", "192.168.40.0/24", "192.168.40.1", { en: "IP phones", fa: "تلفن‌های IP" }],
      ["99", "MGMT", "192.168.99.0/27", "192.168.99.1", { en: "Switch and router management", fa: "مدیریت سوئیچ‌ها و روترها" }]
    ] } },
    { p: { en: "This table is the real work; the commands only write it down. It is also the level of the CCNA exam: if you can design this table, configure it and explain why each line is there, you are working as a network technician.",
           fa: "کار اصلی همین جدول است و دستورها فقط آن را پیاده می‌کنند. سطح آزمون CCNA هم همین است: اگر بتوانی این جدول را طراحی کنی، پیاده‌اش کنی و توضیح بدهی هر خط چرا آنجاست، داری به‌عنوان تکنسین شبکه کار می‌کنی." } }
  ]
});
window.LEARN.study["switching-vlans"] = {
  goals: { en: ["Explain what a VLAN is and why it is used", "Tell an access port from a trunk port and configure both", "Describe how VLANs reach each other and list the basic security settings of a switch"],
           fa: ["توضیح بدهی VLAN چیست و چرا استفاده می‌شود", "پورت Access را از Trunk تشخیص بدهی و هر دو را تنظیم کنی", "بگویی VLANها چطور به هم می‌رسند و تنظیمات امنیتی پایه‌ی سوئیچ را فهرست کنی"] },
  mistakes: { en: ["Forgetting to save: copy running-config startup-config.", "A VLAN that exists on one switch but is not allowed on the trunk between them.", "Leaving users in VLAN 1, the default that every port starts in.", "Turning spanning tree off 'to speed things up'.", "Putting two VLANs in the same IP subnet."],
              fa: ["فراموش‌کردن ذخیره: copy running-config startup-config.", "VLANی که روی یک سوئیچ هست ولی روی Trunk بینشان مجاز نشده.", "جاگذاشتن کاربران در VLAN 1، پیش‌فرضی که همه‌ی پورت‌ها از آن شروع می‌کنند.", "خاموش‌کردن Spanning Tree «برای سریع‌ترشدن».", "گذاشتن دو VLAN در یک زیرشبکه‌ی IP."] },
  practice: [
    { q: { en: "A PC in VLAN 10 cannot ping a PC in VLAN 20 on the same switch. Is that a fault?", fa: "کامپیوتری در VLAN 10 نمی‌تواند کامپیوتری در VLAN 20 روی همان سوئیچ را ping کند. خرابی است؟" }, a: { en: "No — it is the purpose of VLANs. They can only talk through a router or a layer 3 switch.", fa: "نه — هدف VLAN همین است. فقط از راه روتر یا سوئیچ لایه‌ی ۳ می‌توانند حرف بزنند." } },
    { q: { en: "Write the commands that put port Gi1/0/5 in VLAN 30 as an access port.", fa: "دستورهایی را بنویس که پورت Gi1/0/5 را به‌عنوان Access در VLAN 30 قرار می‌دهد." }, a: { en: "interface GigabitEthernet1/0/5\n switchport mode access\n switchport access vlan 30", fa: "interface GigabitEthernet1/0/5\n switchport mode access\n switchport access vlan 30" } },
    { q: { en: "Which kind of port connects two switches, and what does it add to each frame?", fa: "چه نوع پورتی دو سوئیچ را وصل می‌کند و به هر فریم چه چیزی اضافه می‌کند؟" }, a: { en: "A trunk port. It adds an 802.1Q tag with the VLAN number.", fa: "پورت Trunk. یک تگ 802.1Q با شماره‌ی VLAN اضافه می‌کند." } },
    { q: { en: "Someone plugs a home router into a wall socket and people start getting wrong addresses. Which switch feature prevents this?", fa: "کسی یک روتر خانگی را به پریز دیوار وصل می‌کند و افراد آدرس اشتباه می‌گیرند. کدام قابلیت سوئیچ جلوی این را می‌گیرد؟" }, a: { en: "DHCP snooping: only ports marked as trusted may send DHCP offers.", fa: "DHCP Snooping: فقط پورت‌هایی که «مورد اعتماد» علامت خورده‌اند می‌توانند پیشنهاد DHCP بفرستند." } }
  ],
  recap: { en: ["A VLAN is a separate network on shared switches.", "Access port: one VLAN, for devices. Trunk port: many VLANs, tagged, between switches.", "VLANs meet only at a router or layer 3 switch.", "Keep spanning tree on, shut unused ports, save the configuration."],
           fa: ["VLAN یک شبکه‌ی جدا روی سوئیچ‌های مشترک است.", "پورت Access: یک VLAN، برای دستگاه‌ها. پورت Trunk: چند VLAN، تگ‌دار، بین سوئیچ‌ها.", "VLANها فقط در روتر یا سوئیچ لایه‌ی ۳ به هم می‌رسند.", "Spanning Tree را روشن نگه دار، پورت‌های بلااستفاده را خاموش کن و پیکربندی را ذخیره کن."] }
};

window.LEARN.articles.push({
  id: "reading-logs", track: "security", icon: "shield", level: "intermediate", minutes: 22, updated: "2026-11",
  title: { en: "Reading logs: finding an attack in the noise", fa: "خواندن لاگ‌ها: پیداکردن حمله در میان شلوغی" },
  summary: { en: "Where systems write down what happens, how to read one log line, and the patterns that separate a forgotten password from an attack.",
             fa: "سیستم‌ها اتفاق‌ها را کجا ثبت می‌کنند، یک خط لاگ را چطور بخوانی و الگوهایی که رمزِ فراموش‌شده را از حمله جدا می‌کند." },
  blocks: [
    { h: { en: "What a log is, and why it matters", fa: "لاگ چیست و چرا مهم است" } },
    { p: { en: "A log is a diary that a program keeps by itself. Every time something worth noting happens — someone logs in, a service starts, a request is refused — it adds one line with the time and what happened. Nobody reads logs when all is well. But when something goes wrong, the log is the only witness: it tells you what happened, when, and from where. An attacker who gets in will have left traces in it; the question is only whether anyone looks.",
           fa: "لاگ دفتر خاطراتی است که برنامه خودش می‌نویسد. هر بار اتفاقی قابل‌توجه می‌افتد — کسی وارد می‌شود، سرویسی راه می‌افتد، درخواستی رد می‌شود — یک خط با زمان و شرح اتفاق اضافه می‌کند. وقتی همه‌چیز خوب است کسی لاگ نمی‌خواند. ولی وقتی چیزی خراب می‌شود، لاگ تنها شاهد است: می‌گوید چه شد، کی و از کجا. مهاجمی که وارد شود ردش را در آن جا گذاشته؛ سؤال فقط این است که کسی نگاه می‌کند یا نه." } },
    { table: { head: { en: ["System", "Where", "What is in it"], fa: ["سیستم", "کجا", "چه چیزی در آن است"] }, rows: [
      ["Linux", "/var/log/auth.log", { en: "Logins, sudo, SSH (on Red Hat: /var/log/secure)", fa: "ورودها، sudo و SSH (در Red Hat: ‎/var/log/secure)" }],
      ["Linux", "/var/log/syslog", { en: "General system messages", fa: "پیام‌های عمومی سیستم" }],
      ["Linux", "journalctl", { en: "Everything, searchable by service and time", fa: "همه‌چیز، قابل جست‌وجو بر اساس سرویس و زمان" }],
      [{ en: "Web server", fa: "وب‌سرور" }, "/var/log/nginx/access.log", { en: "Every request: who, what page, what answer", fa: "هر درخواست: چه کسی، چه صفحه‌ای، چه جوابی" }],
      ["Windows", "Event Viewer → Security", { en: "Logins (4624 success, 4625 failure), new accounts (4720)", fa: "ورودها (۴۶۲۴ موفق، ۴۶۲۵ ناموفق) و حساب جدید (۴۷۲۰)" }],
      [{ en: "Router / firewall", fa: "روتر / فایروال" }, { en: "its web page or a syslog server", fa: "صفحه‌ی وبش یا سرور Syslog" }, { en: "Blocked and allowed connections", fa: "اتصال‌های ردشده و مجاز" }]
    ] } },

    { h: { en: "Reading one line", fa: "خواندن یک خط" } },
    { code: "Nov 10 09:40:13 srv sshd[902]: Failed password for root from 203.0.113.45 port 51122 ssh2", lang: "auth.log" },
    { table: { head: { en: ["Part", "Meaning"], fa: ["بخش", "معنی"] }, rows: [
      ["Nov 10 09:40:13", { en: "When it happened", fa: "چه زمانی رخ داده" }],
      ["srv", { en: "Which machine wrote it", fa: "کدام دستگاه نوشته" }],
      ["sshd[902]", { en: "Which program, and its process number", fa: "کدام برنامه و شماره‌ی پردازه‌اش" }],
      ["Failed password", { en: "What happened", fa: "چه اتفاقی افتاده" }],
      ["for root", { en: "Which account was tried", fa: "کدام حساب امتحان شده" }],
      ["from 203.0.113.45", { en: "Where the attempt came from", fa: "تلاش از کجا آمده" }]
    ] } },
    { p: { en: "Almost every log line in the world answers the same five questions: when, where, which program, what, and who or from where. Once you look for those five, an unfamiliar log stops being a wall of text.",
           fa: "تقریباً هر خط لاگی در دنیا به همین پنج سؤال جواب می‌دهد: کی، کجا، کدام برنامه، چه چیزی و چه کسی یا از کجا. وقتی دنبال همین پنج‌تا بگردی، یک لاگ ناآشنا دیگر دیواری از متن نیست." } },

    { h: { en: "From thousands of lines to one answer", fa: "از هزاران خط به یک جواب" } },
    { p: { en: "A busy server writes thousands of lines a day, so you never read a log from top to bottom. You ask it questions with the text tools from the Linux track.",
           fa: "یک سرور شلوغ روزی هزاران خط می‌نویسد، پس هیچ‌وقت لاگ را از بالا تا پایین نمی‌خوانی. با ابزارهای متنِ مسیر لینوکس از آن سؤال می‌پرسی." } },
    { term: "$ grep -c Failed auth.log\n5\n$ grep Failed auth.log | awk '{print $NF}' | sort | uniq -c | sort -rn\n      3 203.0.113.45\n      2 198.51.100.77\n$ grep -E \"root|admin\" auth.log | wc -l\n5\n$ cat auth.log | awk '{print $3}' | cut -d: -f1 | sort | uniq -c\n      4 09\n      1 10\n      2 11\n      1 12",
      cap: { en: "How many failures, from which addresses, against which accounts, and at what hours.", fa: "چند تلاش ناموفق، از کدام آدرس‌ها، علیه کدام حساب‌ها و در چه ساعت‌هایی." } },

    { h: { en: "Patterns that mean trouble", fa: "الگوهایی که یعنی دردسر" } },
    { table: { head: { en: ["Pattern", "Probably", "Do"], fa: ["الگو", "احتمالاً", "اقدام"] }, rows: [
      [{ en: "Two or three failures, then success, from a known address", fa: "دو یا سه ناموفق و بعد موفق، از آدرس آشنا" }, { en: "Someone mistyped their password", fa: "کسی رمزش را اشتباه تایپ کرده" }, { en: "Nothing", fa: "هیچ" }],
      [{ en: "Hundreds of failures for root, admin, test from one address", fa: "صدها ناموفق برای root، admin و test از یک آدرس" }, { en: "A robot guessing passwords", fa: "رباتی که رمز حدس می‌زند" }, { en: "Block it; use keys and fail2ban", fa: "مسدودش کن؛ از کلید و fail2ban استفاده کن" }],
      [{ en: "Many failures, then a success, from an unknown address", fa: "تعداد زیادی ناموفق و بعد موفق، از آدرس ناشناس" }, { en: "A password was guessed", fa: "یک رمز حدس زده شده" }, { en: "Treat as a break-in, now", fa: "همین حالا مثل نفوذ با آن برخورد کن" }],
      [{ en: "One failure each for many different accounts", fa: "برای چندین حساب مختلف هر کدام یک ناموفق" }, { en: "Password spraying: one common password tried on everyone", fa: "Password Spraying: یک رمز رایج روی همه امتحان می‌شود" }, { en: "Force strong passwords and two-step login", fa: "رمز قوی و ورود دومرحله‌ای را اجباری کن" }],
      [{ en: "A login at 3 a.m., or from another country", fa: "ورود در ساعت ۳ بامداد یا از کشوری دیگر" }, { en: "A stolen account", fa: "حساب دزدیده‌شده" }, { en: "Ask the owner; reset the password", fa: "از صاحبش بپرس؛ رمز را بازنشانی کن" }],
      [{ en: "A new user or a new sudo right nobody asked for", fa: "کاربر جدید یا دسترسی sudo جدیدی که کسی نخواسته" }, { en: "An intruder making a way back in", fa: "مهاجمی که راه برگشت می‌سازد" }, { en: "Investigate at once", fa: "فوراً بررسی کن" }],
      [{ en: "Gaps: hours with no lines at all", fa: "جای خالی: ساعت‌هایی بدون هیچ خطی" }, { en: "Logging stopped, or the log was cleaned", fa: "ثبت لاگ متوقف شده یا لاگ پاک شده" }, { en: "Find out why", fa: "بفهم چرا" }]
    ] } },
    { p: { en: "The third row is the one that matters most, and the one people miss: failures are noise, but a success after failures is a signal. The SSH Log Analyzer in the Tools section looks for exactly that and prints it at the top.",
           fa: "ردیف سوم از همه مهم‌تر است و همانی است که مردم نمی‌بینند: تلاش ناموفق سروصداست، ولی موفقیت بعد از ناموفق‌ها نشانه است. «تحلیل‌گر لاگ SSH» در بخش ابزارها دقیقاً دنبال همین می‌گردد و آن را بالای خروجی چاپ می‌کند." } },

    { h: { en: "Web server logs", fa: "لاگ وب‌سرور" } },
    { code: "203.0.113.45 - - [10/Nov/2026:09:41:02 +0000] \"GET /wp-login.php HTTP/1.1\" 404 162 \"-\" \"Mozilla/5.0\"", lang: "access.log",
      cap: { en: "Address, time, the request, the answer code (404 = not found), the size, and the browser's name.", fa: "آدرس، زمان، درخواست، کد جواب (۴۰۴ = پیدا نشد)، اندازه و نام مرورگر." } },
    { list: { en: ["Answer codes: 200 worked, 301/302 moved, 403 forbidden, 404 not found, 500 the server failed.", "Many 404s from one address for pages you do not have (/wp-login.php, /.env, /admin) is a scanner looking for known weaknesses.", "Requests containing ../ or ' OR 1=1 or <script> are attempts at attacks.", "A burst of 500 errors after such a request means the attempt reached something — look closely.", "awk '{print $1}' access.log | sort | uniq -c | sort -rn | head  shows the ten busiest visitors."],
              fa: ["کدهای جواب: ۲۰۰ موفق، ۳۰۱ و ۳۰۲ منتقل شده، ۴۰۳ ممنوع، ۴۰۴ پیدا نشد و ۵۰۰ خطای سرور.", "تعداد زیاد ۴۰۴ از یک آدرس برای صفحه‌هایی که نداری (/wp-login.php، ‎/.env، ‎/admin) یعنی اسکنری دنبال ضعف‌های شناخته‌شده می‌گردد.", "درخواست‌هایی که ../ یا ' OR 1=1 یا <script> دارند تلاش برای حمله‌اند.", "موجی از خطای ۵۰۰ بعد از چنین درخواستی یعنی تلاش به چیزی رسیده — دقیق نگاه کن.", "awk '{print $1}' access.log | sort | uniq -c | sort -rn | head  ده بازدیدکننده‌ی پرکار را نشان می‌دهد."] } },

    { h: { en: "Making logs trustworthy", fa: "قابل‌اعتمادکردن لاگ‌ها" } },
    { list: { en: ["Correct time everywhere. Without synchronised clocks (NTP) you cannot put events from two machines in order.", "Send copies to another machine. An intruder with administrator rights can edit the logs on the machine they broke into, but not the copies on a separate log server.", "Keep them long enough — at least three months. Break-ins are often discovered weeks later.", "Protect them: logs contain user names and addresses, and only administrators should read them.", "Decide what deserves an alert. A daily email with 'failed logins: 12, new users: 0' that takes ten seconds to read is worth more than a dashboard nobody opens."],
              fa: ["ساعت درست در همه‌جا. بدون ساعت‌های هماهنگ (NTP) نمی‌توانی رویدادهای دو دستگاه را به ترتیب بچینی.", "نسخه‌ای به دستگاه دیگری بفرست. مهاجمی که دسترسی مدیر دارد می‌تواند لاگ همان دستگاه را دست‌کاری کند، ولی نسخه‌های روی سرور لاگ جدا را نه.", "به اندازه‌ی کافی نگهشان دار — دست‌کم سه ماه. نفوذها اغلب هفته‌ها بعد کشف می‌شوند.", "از آن‌ها محافظت کن: لاگ نام کاربری و آدرس دارد و فقط مدیرها باید بخوانندش.", "تعیین کن چه چیزی ارزش هشدار دارد. یک ایمیل روزانه با «ورود ناموفق: ۱۲، کاربر جدید: ۰» که خواندنش ده ثانیه طول می‌کشد از داشبوردی که کسی بازش نمی‌کند باارزش‌تر است."] } }
  ]
});
window.LEARN.study["reading-logs"] = {
  goals: { en: ["Find the login, system and web logs on Linux and Windows", "Read any log line by asking when, where, which program, what and who", "Tell ordinary noise from the patterns of an attack"],
           fa: ["لاگ ورود، سیستم و وب را در لینوکس و ویندوز پیدا کنی", "هر خط لاگ را با پرسیدنِ کی، کجا، کدام برنامه، چه چیزی و چه کسی بخوانی", "سروصدای عادی را از الگوهای حمله تشخیص بدهی"] },
  mistakes: { en: ["Looking only at failures and never at the success that follows them.", "Keeping logs only on the machine that may be attacked.", "Wrong clocks, so events cannot be lined up.", "Collecting everything and reviewing nothing."],
              fa: ["نگاه‌کردن فقط به ناموفق‌ها و ندیدن موفقیتی که بعدشان می‌آید.", "نگه‌داشتن لاگ فقط روی دستگاهی که ممکن است هدف حمله باشد.", "ساعت اشتباه، که نمی‌گذارد رویدادها کنار هم چیده شوند.", "جمع‌کردن همه‌چیز و مرورنکردن هیچ‌چیز."] },
  practice: [
    { q: { en: "Which command lists the addresses with failed SSH logins, most active first?", fa: "کدام دستور آدرس‌هایی را که ورود ناموفق SSH داشته‌اند، به ترتیب از فعال‌ترین، فهرست می‌کند؟" }, a: { en: "grep \"Failed password\" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn\n(In a real line the address is the 4th word from the end, before 'port 51122 ssh2'.)", fa: "grep \"Failed password\" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -rn\n(در خط واقعی آدرس چهارمین کلمه از آخر است، قبل از «port 51122 ssh2».)" } },
    { q: { en: "The log shows 400 failed logins for root from one address and then 'Accepted password for root' from the same address. What do you conclude and do first?", fa: "لاگ ۴۰۰ ورود ناموفق برای root از یک آدرس و بعد «Accepted password for root» از همان آدرس را نشان می‌دهد. چه نتیجه‌ای می‌گیری و اول چه می‌کنی؟" }, a: { en: "The root password was guessed: the server is compromised. Disconnect it from the network, keep the evidence, change passwords from a clean machine and rebuild from a backup.", fa: "رمز root حدس زده شده و سرور در اختیار مهاجم است. از شبکه جدایش کن، مدرک‌ها را نگه دار، از یک دستگاه سالم رمزها را عوض کن و از پشتیبان دوباره بسازش." } },
    { q: { en: "Your web log has hundreds of 404 answers for /wp-admin, /.git/config and /phpmyadmin from one address. What is it?", fa: "لاگ وب تو صدها جواب ۴۰۴ برای ‎/wp-admin، ‎/.git/config و ‎/phpmyadmin از یک آدرس دارد. این چیست؟" }, a: { en: "An automated scanner looking for well-known weak spots. Because they all returned 404 nothing was found, but make sure those paths really do not exist and consider blocking the address.", fa: "یک اسکنر خودکار که دنبال نقطه‌ضعف‌های معروف می‌گردد. چون همه ۴۰۴ برگشته‌اند چیزی پیدا نشده، ولی مطمئن شو آن مسیرها واقعاً وجود ندارند و مسدودکردن آدرس را در نظر بگیر." } },
    { q: { en: "Why should a copy of the logs be sent to a different machine?", fa: "چرا باید نسخه‌ای از لاگ‌ها به دستگاه دیگری فرستاده شود؟" }, a: { en: "An intruder with administrator rights can delete or edit the logs on the machine they control. A separate log server keeps a copy they cannot reach.", fa: "مهاجمی که دسترسی مدیر دارد می‌تواند لاگ دستگاهِ تحت کنترلش را پاک یا دست‌کاری کند. سرور لاگ جدا نسخه‌ای نگه می‌دارد که دستش به آن نمی‌رسد." } }
  ],
  recap: { en: ["Every line: when, where, which program, what, who.", "Failures are noise; success after failures is the signal.", "Count and group with grep, awk, sort and uniq.", "Right clocks, off-machine copies, regular review."],
           fa: ["هر خط: کی، کجا، کدام برنامه، چه چیزی، چه کسی.", "ناموفق‌ها سروصدا هستند؛ موفقیت بعد از ناموفق‌ها نشانه است.", "با grep، awk، sort و uniq بشمار و دسته‌بندی کن.", "ساعت درست، نسخه روی دستگاه دیگر و مرور منظم."] }
};

window.LEARN.articles.push({
  id: "firewalls-hardening", track: "security", icon: "shield", level: "intermediate", minutes: 24, updated: "2026-11",
  title: { en: "Firewalls and hardening", fa: "فایروال و مقاوم‌سازی" },
  summary: { en: "How a firewall decides, how to write rules that mean what you intend, and a practical checklist for making a server, a Windows PC and a network harder to attack.",
             fa: "فایروال چطور تصمیم می‌گیرد، چطور قانونی بنویسی که همان منظور تو را برساند و فهرستی عملی برای سخت‌ترکردن حمله به سرور، کامپیوتر ویندوزی و شبکه." },
  blocks: [
    { h: { en: "What a firewall does", fa: "فایروال چه می‌کند" } },
    { p: { en: "A firewall is a guard at a door. Every packet that wants to pass is compared with a list of rules, from the first rule down, and the first rule that matches decides: let it through, or throw it away. A rule looks at a few facts about the packet — where it comes from, where it is going, which protocol and which port. That is all. A firewall does not understand whether the content is good or bad; it only knows who may talk to whom, on which door.",
           fa: "فایروال نگهبانی دمِ در است. هر بسته‌ای که می‌خواهد رد شود با فهرستی از قانون‌ها، از اولین قانون به پایین، مقایسه می‌شود و اولین قانونی که جور باشد تصمیم می‌گیرد: ردش کن یا دورش بینداز. قانون به چند واقعیت درباره‌ی بسته نگاه می‌کند — از کجا می‌آید، به کجا می‌رود، کدام پروتکل و کدام پورت. همین. فایروال نمی‌فهمد محتوا خوب است یا بد؛ فقط می‌داند چه کسی با چه کسی، از کدام در، می‌تواند حرف بزند." } },
    { table: { head: { en: ["#", "Source", "Destination", "Port", "Action"], fa: ["#", "مبدأ", "مقصد", "پورت", "عمل"] }, rows: [
      ["1", { en: "anywhere", fa: "همه‌جا" }, { en: "web server", fa: "وب‌سرور" }, "443 TCP", { en: "allow", fa: "مجاز" }],
      ["2", { en: "office network", fa: "شبکه‌ی اداره" }, { en: "web server", fa: "وب‌سرور" }, "22 TCP", { en: "allow", fa: "مجاز" }],
      ["3", { en: "web server", fa: "وب‌سرور" }, { en: "database", fa: "پایگاه‌داده" }, "3306 TCP", { en: "allow", fa: "مجاز" }],
      ["4", { en: "anywhere", fa: "همه‌جا" }, { en: "anywhere", fa: "همه‌جا" }, { en: "any", fa: "همه" }, { en: "deny", fa: "ممنوع" }]
    ] } },
    { p: { en: "Read the table aloud: the world may reach the website; only the office may reach SSH; only the web server may reach the database; and everything else is refused. The last line is the most important idea in this lesson — default deny. You do not list what is forbidden, because you can never think of everything. You list the few things that are needed and forbid the rest.",
           fa: "جدول را بلند بخوان: همه‌ی دنیا به سایت می‌رسند؛ فقط اداره به SSH می‌رسد؛ فقط وب‌سرور به پایگاه‌داده می‌رسد؛ و بقیه رد می‌شود. خط آخر مهم‌ترین ایده‌ی این درس است — «ممنوعِ پیش‌فرض». چیزهای ممنوع را فهرست نمی‌کنی، چون هیچ‌وقت همه به ذهنت نمی‌رسد. همان چند چیزِ لازم را فهرست می‌کنی و بقیه را ممنوع می‌کنی." } },
    { list: { en: ["Order matters: a broad 'allow' above a narrow 'deny' makes the deny useless.", "Stateful firewalls remember conversations. If your computer started a connection, the answers are let back in automatically — you only write rules for who may start.", "Inbound means arriving at the machine; outbound means leaving it. Most rule sets control inbound strictly; controlling outbound as well stops malware from calling home.", "A host firewall protects one machine (ufw, Windows Firewall); a network firewall protects everything behind it. Use both."],
              fa: ["ترتیب مهم است: یک «مجاز» کلی بالای یک «ممنوع» دقیق، آن ممنوع را بی‌اثر می‌کند.", "فایروال‌های Stateful گفتگوها را به خاطر می‌سپارند. اگر کامپیوتر تو اتصال را شروع کرده باشد، جواب‌ها خودکار راه داده می‌شوند — فقط برای اینکه چه کسی شروع کند قانون می‌نویسی.", "ورودی یعنی رسیدن به دستگاه و خروجی یعنی خارج‌شدن از آن. بیشتر قانون‌ها ورودی را سخت کنترل می‌کنند؛ کنترل خروجی هم جلوی تماس بدافزار با بیرون را می‌گیرد.", "فایروال میزبان یک دستگاه را محافظت می‌کند (ufw، فایروال ویندوز) و فایروال شبکه هر چه پشتش است را. از هر دو استفاده کن."] } },

    { h: { en: "A firewall on Linux in five lines", fa: "فایروال لینوکس در پنج خط" } },
    { code: "sudo ufw default deny incoming       # refuse everything arriving …\nsudo ufw default allow outgoing      # … but let this machine reach out\nsudo ufw allow from 192.168.1.0/24 to any port 22 proto tcp   # SSH from the office only\nsudo ufw allow 443/tcp               # the website, for everyone\nsudo ufw enable\n\nsudo ufw status numbered             # read the rules back\nsudo ufw delete 3                    # remove rule number 3", lang: "bash",
      cap: { en: "Always add the SSH rule before 'enable', and keep your current session open while you test a new one.", fa: "همیشه قانون SSH را قبل از enable اضافه کن و تا وقتی نشست جدید را آزمایش می‌کنی نشست فعلی را باز نگه دار." } },
    { p: { en: "ufw is a friendly layer over the kernel's own firewall (nftables, formerly iptables). On Windows the same ideas live in 'Windows Defender Firewall with Advanced Security', with separate lists for inbound and outbound rules and three profiles — domain, private and public. A laptop on café Wi-Fi should be on the public profile, which hides it from its neighbours.",
           fa: "ufw لایه‌ای ساده روی فایروال خودِ هسته (nftables و قبلاً iptables) است. در ویندوز همین مفاهیم در «Windows Defender Firewall with Advanced Security» هست، با فهرست‌های جدا برای قانون ورودی و خروجی و سه پروفایل — Domain، Private و Public. لپ‌تاپی که به وای‌فای کافه وصل است باید روی پروفایل Public باشد که آن را از همسایه‌هایش پنهان می‌کند." } },

    { h: { en: "Hardening: removing what an attacker could use", fa: "مقاوم‌سازی: برداشتن هر چه مهاجم می‌تواند استفاده کند" } },
    { p: { en: "Systems are delivered to be easy, not safe: services you will never use are switched on, default passwords are set, and everything is allowed. Hardening is the unglamorous work of switching off what is not needed and tightening what is. The idea behind every item below is the same — a smaller target. A service that is not running cannot be attacked; an account that does not exist cannot be stolen.",
           fa: "سیستم‌ها طوری تحویل داده می‌شوند که راحت باشند، نه امن: سرویس‌هایی که هرگز استفاده نمی‌کنی روشن‌اند، رمزهای پیش‌فرض تنظیم شده و همه‌چیز مجاز است. مقاوم‌سازی کارِ بی‌زرق‌وبرقِ خاموش‌کردن چیزهای غیرلازم و سفت‌کردن بقیه است. ایده‌ی پشت همه‌ی موردهای پایین یکی است — هدف کوچک‌تر. به سرویسی که اجرا نمی‌شود نمی‌شود حمله کرد و حسابی که وجود ندارد دزدیده نمی‌شود." } },
    { table: { head: { en: ["Linux server", "Why"], fa: ["سرور لینوکس", "چرا"] }, rows: [
      [{ en: "Updates installed; automatic security updates on", fa: "به‌روزرسانی‌ها نصب و به‌روزرسانی امنیتی خودکار روشن" }, { en: "Known holes are the first thing robots try", fa: "حفره‌های شناخته‌شده اولین چیزی است که ربات‌ها امتحان می‌کنند" }],
      [{ en: "SSH: keys only, no root login", fa: "SSH: فقط با کلید و بدون ورود root" }, { en: "Password guessing becomes pointless", fa: "حدس‌زدن رمز بی‌فایده می‌شود" }],
      [{ en: "fail2ban installed", fa: "نصب fail2ban" }, { en: "Addresses that keep failing are blocked automatically", fa: "آدرس‌هایی که مدام خطا می‌دهند خودکار مسدود می‌شوند" }],
      [{ en: "Unneeded services removed (ss -tlnp to find them)", fa: "حذف سرویس‌های غیرلازم (با ss -tlnp پیدایشان کن)" }, { en: "Every listening port is a door", fa: "هر پورتِ در حال گوش‌دادن یک در است" }],
      [{ en: "Each service runs as its own unprivileged user", fa: "هر سرویس با کاربرِ کم‌دسترسیِ خودش اجرا شود" }, { en: "A hacked website cannot touch the rest", fa: "وب‌سایت هک‌شده به بقیه دست نمی‌زند" }],
      [{ en: "Tight file permissions; no 777", fa: "مجوز فایل سخت‌گیرانه؛ بدون 777" }, { en: "Limits what a stolen account can change", fa: "چیزی را که یک حساب دزدیده می‌تواند تغییر بدهد محدود می‌کند" }],
      [{ en: "Logs sent to another machine; tested backups", fa: "ارسال لاگ به دستگاه دیگر؛ پشتیبان آزمایش‌شده" }, { en: "You can investigate and recover", fa: "می‌توانی بررسی و بازیابی کنی" }]
    ] } },
    { code: "sudo apt install fail2ban unattended-upgrades\n\n# /etc/ssh/sshd_config\nPermitRootLogin no\nPasswordAuthentication no\nMaxAuthTries 3\n\nsudo systemctl restart ssh\nsudo ss -tlnp                # what is still listening?", lang: "bash" },
    { table: { head: { en: ["Windows PC", "Network devices"], fa: ["کامپیوتر ویندوزی", "تجهیزات شبکه"] }, rows: [
      [{ en: "Automatic updates on; supported Windows version", fa: "به‌روزرسانی خودکار روشن؛ نسخه‌ی پشتیبانی‌شده‌ی ویندوز" }, { en: "Firmware updated; default passwords changed", fa: "Firmware به‌روز؛ رمزهای پیش‌فرض عوض شده" }],
      [{ en: "Daily work with a standard user, not an administrator", fa: "کار روزانه با کاربر عادی، نه مدیر" }, { en: "Management only over SSH/HTTPS, from a management VLAN", fa: "مدیریت فقط با SSH/HTTPS و از VLAN مدیریت" }],
      [{ en: "Firewall on, in all three profiles", fa: "فایروال روشن، در هر سه پروفایل" }, { en: "Telnet, HTTP admin, UPnP and WPS off", fa: "Telnet، مدیریت HTTP، UPnP و WPS خاموش" }],
      [{ en: "Disk encryption (BitLocker) on laptops", fa: "رمزنگاری دیسک (BitLocker) روی لپ‌تاپ‌ها" }, { en: "Unused switch ports shut down", fa: "پورت‌های بلااستفاده‌ی سوئیچ خاموش" }],
      [{ en: "Remote Desktop off, or reachable only through a VPN", fa: "ریموت دسکتاپ خاموش، یا فقط از راه VPN" }, { en: "Guest Wi-Fi isolated from the internal network", fa: "وای‌فای مهمان جدا از شبکه‌ی داخلی" }],
      [{ en: "Screen lock after a few minutes", fa: "قفل صفحه بعد از چند دقیقه" }, { en: "Configuration backed up after every change", fa: "پشتیبان از پیکربندی بعد از هر تغییر" }]
    ] } },

    { h: { en: "Layers: no single wall", fa: "لایه‌ها: نه فقط یک دیوار" } },
    { p: { en: "No defence is perfect, so professionals never rely on one. They stack them, so that an attacker who passes one meets the next: a firewall at the edge, separate VLANs inside, a firewall on each machine, strong logins, least privilege, updates, logs that someone reads, and backups for when everything else has failed. This is called defence in depth. When you review a system, ask of every layer: 'if this one failed tomorrow, what would stop the attacker next?'. If the answer is 'nothing', you have found your next job.",
           fa: "هیچ دفاعی کامل نیست، پس حرفه‌ای‌ها هیچ‌وقت به یکی تکیه نمی‌کنند. آن‌ها را روی هم می‌چینند تا مهاجمی که از یکی رد شد به بعدی بخورد: فایروال در لبه‌ی شبکه، VLANهای جدا در داخل، فایروال روی هر دستگاه، ورود قوی، کمترین دسترسی، به‌روزرسانی، لاگی که کسی می‌خواندش و پشتیبان برای وقتی که بقیه شکست خورده‌اند. به این «دفاع در عمق» می‌گویند. وقتی سیستمی را مرور می‌کنی درباره‌ی هر لایه بپرس: «اگر همین فردا شکست بخورد، چه چیزی بعدش جلوی مهاجم را می‌گیرد؟». اگر جواب «هیچ» بود، کار بعدی‌ات را پیدا کرده‌ای." } },

    { h: { en: "Check your own work", fa: "کار خودت را بسنج" } },
    { list: { en: ["From outside your network, scan your own public address and compare the open ports with the list you intended. The Port Scanner in the Tools section is enough for this.", "From the guest Wi-Fi, try to reach a staff computer and the router's admin page. Both should fail.", "Read the firewall's log of blocked packets once a week; it shows who is knocking.", "Repeat after every change — a firewall rule added 'for a moment' is the most common hole there is."],
              fa: ["از بیرونِ شبکه، آدرس عمومی خودت را اسکن کن و پورت‌های باز را با فهرستی که می‌خواستی مقایسه کن. «اسکنر پورت» بخش ابزارها برای این کار کافی است.", "از وای‌فای مهمان سعی کن به یک کامپیوتر کارمندان و صفحه‌ی مدیریت روتر برسی. هر دو باید ناموفق باشند.", "هفته‌ای یک بار لاگ بسته‌های مسدودشده‌ی فایروال را بخوان؛ نشان می‌دهد چه کسی در می‌زند.", "بعد از هر تغییر تکرار کن — قانونی که «فقط یک لحظه» اضافه شده رایج‌ترین حفره‌ی دنیاست."] } }
  ]
});
window.LEARN.study["firewalls-hardening"] = {
  goals: { en: ["Explain how a firewall matches a packet against its rules", "Write a default-deny rule set for a server", "Harden a Linux server, a Windows PC and network devices with a checklist"],
           fa: ["توضیح بدهی فایروال چطور بسته را با قانون‌هایش مقایسه می‌کند", "برای یک سرور مجموعه‌قانونِ «ممنوعِ پیش‌فرض» بنویسی", "سرور لینوکس، کامپیوتر ویندوزی و تجهیزات شبکه را با فهرست بررسی مقاوم کنی"] },
  mistakes: { en: ["An 'allow everything' rule left in from testing.", "Rules in the wrong order.", "Trusting the network firewall alone and leaving host firewalls off.", "Hardening once and never checking again."],
              fa: ["قانون «همه‌چیز مجاز» که از زمان آزمایش جا مانده.", "قانون‌ها با ترتیب اشتباه.", "اعتماد فقط به فایروال شبکه و خاموش‌گذاشتن فایروال دستگاه‌ها.", "یک بار مقاوم‌سازی و دیگر هیچ‌وقت بررسی‌نکردن."] },
  practice: [
    { q: { en: "Write ufw rules for a server that should offer only a website (443) to everyone and SSH to the address 192.168.1.10.", fa: "برای سروری که باید فقط سایت (۴۴۳) را به همه و SSH را به آدرس 192.168.1.10 بدهد قانون ufw بنویس." }, a: { en: "sudo ufw default deny incoming\nsudo ufw allow from 192.168.1.10 to any port 22 proto tcp\nsudo ufw allow 443/tcp\nsudo ufw enable", fa: "sudo ufw default deny incoming\nsudo ufw allow from 192.168.1.10 to any port 22 proto tcp\nsudo ufw allow 443/tcp\nsudo ufw enable" } },
    { q: { en: "Rule 1 says 'allow anywhere to anywhere, any port'. Rule 2 says 'deny port 23'. Is Telnet blocked?", fa: "قانون ۱ می‌گوید «از همه‌جا به همه‌جا، همه‌ی پورت‌ها مجاز». قانون ۲ می‌گوید «پورت ۲۳ ممنوع». Telnet مسدود است؟" }, a: { en: "No. The first matching rule decides, and rule 1 matches everything. Rule 2 is never reached.", fa: "نه. اولین قانونِ جور تصمیم می‌گیرد و قانون ۱ با همه‌چیز جور است. به قانون ۲ هیچ‌وقت نمی‌رسد." } },
    { q: { en: "Name three things you would switch off on a new router.", fa: "سه چیزی را نام ببر که روی یک روتر جدید خاموش می‌کنی." }, a: { en: "WPS, UPnP, remote administration from the internet (and Telnet, if it has it) — and change the default admin password.", fa: "WPS، UPnP و مدیریت از راه دور از اینترنت (و Telnet اگر دارد) — و رمز پیش‌فرض مدیر را عوض کن." } },
    { q: { en: "What does 'defence in depth' mean, in one sentence?", fa: "«دفاع در عمق» در یک جمله یعنی چه؟" }, a: { en: "Several independent layers of protection, so that the failure of one does not expose the system.", fa: "چند لایه‌ی مستقلِ محافظت، تا شکست یکی سیستم را بی‌دفاع نکند." } }
  ],
  recap: { en: ["First matching rule wins; end with deny everything.", "Allow what is needed, not block what is bad.", "Hardening = switch off, tighten, update.", "Many layers, and check from the outside."],
           fa: ["اولین قانونِ جور برنده است؛ با «همه ممنوع» تمام کن.", "چیزهای لازم را مجاز کن، نه اینکه چیزهای بد را ببندی.", "مقاوم‌سازی = خاموش کن، سفت کن، به‌روز کن.", "چند لایه، و از بیرون بررسی کن."] }
};

window.LEARN.articles.push({
  id: "authorised-testing", track: "security", icon: "shield", level: "intermediate", minutes: 22, updated: "2026-11",
  title: { en: "Authorised security testing: thinking like an attacker, legally", fa: "آزمون امنیتی مجاز: مثل مهاجم فکر کن، ولی قانونی" },
  summary: { en: "What a penetration test is, the permission you must have in writing, the five phases of an honest test, and how to build a lab where you can practise without breaking the law.",
             fa: "تست نفوذ چیست، چه اجازه‌ای باید مکتوب داشته باشی، پنج مرحله‌ی یک آزمون درست و چطور آزمایشگاهی بسازی که بدون شکستن قانون در آن تمرین کنی." },
  blocks: [
    { h: { en: "Why defenders test their own systems", fa: "چرا مدافع‌ها سیستم خودشان را می‌آزمایند" } },
    { p: { en: "A checklist tells you what should be true; a test tells you what is true. A firewall rule that everyone believes exists, a patch that was 'definitely installed', a password policy that 'everybody follows' — these beliefs are wrong more often than anyone likes. A penetration test is a controlled attempt to break into a system, by someone the owner has asked to do it, in order to find the weaknesses before a criminal does and to report them so they can be fixed. The goal is the report, not the break-in.",
           fa: "فهرست بررسی می‌گوید چه چیزی باید درست باشد و آزمون می‌گوید چه چیزی واقعاً درست است. قانون فایروالی که همه باور دارند وجود دارد، اصلاحیه‌ای که «حتماً نصب شده»، سیاست رمزی که «همه رعایت می‌کنند» — این باورها بیشتر از آنچه کسی دوست دارد غلط‌اند. تست نفوذ تلاشی کنترل‌شده برای نفوذ به یک سیستم است، توسط کسی که صاحب سیستم از او خواسته، تا ضعف‌ها قبل از یک مجرم پیدا و برای رفع گزارش شوند. هدف، گزارش است، نه نفوذ." } },

    { h: { en: "The line: written permission", fa: "مرز: اجازه‌ی مکتوب" } },
    { p: { en: "The tools and techniques of a tester and a criminal are the same. Exactly one thing separates them: permission from the owner, in writing, before anything starts. Without it, scanning a network or trying a password on someone else's system is a crime in almost every country, whatever your intentions were, and 'I wanted to help' has never worked as a defence. A friend's verbal 'sure, go ahead' is not enough either — they may not be the owner, and memories change when something breaks.",
           fa: "ابزار و روش آزمون‌گر و مجرم یکی است. دقیقاً یک چیز جدایشان می‌کند: اجازه‌ی صاحب سیستم، به شکل مکتوب، قبل از شروع هر کاری. بدون آن، اسکن یک شبکه یا امتحان‌کردن رمز روی سیستم دیگران تقریباً در همه‌ی کشورها جرم است، نیتت هر چه بوده باشد، و «می‌خواستم کمک کنم» هیچ‌وقت دفاع قابل‌قبولی نبوده. «باشه، انجام بده»ی شفاهی یک دوست هم کافی نیست — شاید او صاحب سیستم نباشد و وقتی چیزی خراب شود حافظه‌ها عوض می‌شوند." } },
    { table: { head: { en: ["The agreement must say", "Example"], fa: ["توافق‌نامه باید بگوید", "نمونه"] }, rows: [
      [{ en: "Who gives permission, and that they have the right to", fa: "چه کسی اجازه می‌دهد و اینکه حق این کار را دارد" }, { en: "The owner or the IT manager, signed", fa: "صاحب یا مدیر IT، با امضا" }],
      [{ en: "Scope: exactly what may be tested", fa: "دامنه: دقیقاً چه چیزی آزمایش شود" }, { en: "192.168.10.0/24 and the website; not the accounting server", fa: "192.168.10.0/24 و وب‌سایت؛ نه سرور حسابداری" }],
      [{ en: "What is forbidden", fa: "چه چیزی ممنوع است" }, { en: "No denial of service, no deleting data, no tricking staff", fa: "بدون ازکارانداختن سرویس، بدون حذف داده، بدون فریب کارمندان" }],
      [{ en: "When", fa: "چه زمانی" }, { en: "Friday night, 22:00 to 06:00", fa: "جمعه‌شب، از ۲۲ تا ۶ صبح" }],
      [{ en: "Who to call if something breaks", fa: "اگر چیزی خراب شد با چه کسی تماس بگیریم" }, { en: "A name and a phone number that answers at night", fa: "یک نام و شماره‌ای که شب هم جواب بدهد" }],
      [{ en: "What happens to the findings", fa: "یافته‌ها چه می‌شوند" }, { en: "Confidential report to the owner only", fa: "گزارش محرمانه فقط برای صاحب سیستم" }]
    ] } },

    { h: { en: "The five phases of a test", fa: "پنج مرحله‌ی یک آزمون" } },
    { table: { head: { en: ["Phase", "Question it answers", "A defender learns"], fa: ["مرحله", "به چه سؤالی جواب می‌دهد", "مدافع چه یاد می‌گیرد"] }, rows: [
      [{ en: "1. Reconnaissance", fa: "۱. شناسایی" }, { en: "What can anyone find out about us?", fa: "هر کسی چه چیزی درباره‌ی ما می‌تواند بفهمد؟" }, { en: "What we publish without noticing", fa: "چه چیزهایی را ناخواسته منتشر می‌کنیم" }],
      [{ en: "2. Scanning", fa: "۲. اسکن" }, { en: "Which machines and ports answer?", fa: "کدام دستگاه‌ها و پورت‌ها جواب می‌دهند؟" }, { en: "Whether the real network matches the plan", fa: "اینکه شبکه‌ی واقعی با طرح می‌خواند یا نه" }],
      [{ en: "3. Finding weaknesses", fa: "۳. یافتن ضعف" }, { en: "Which of them are old, misconfigured or default?", fa: "کدام‌ها قدیمی، بدتنظیم یا پیش‌فرض‌اند؟" }, { en: "What to patch first", fa: "اول چه چیزی را اصلاح کنیم" }],
      [{ en: "4. Proving", fa: "۴. اثبات" }, { en: "Can the weakness really be used, and how far does it lead?", fa: "ضعف واقعاً قابل استفاده است و تا کجا می‌رسد؟" }, { en: "The real risk, not the theoretical one", fa: "خطر واقعی، نه نظری" }],
      [{ en: "5. Reporting", fa: "۵. گزارش" }, { en: "What was found, how serious, how to fix it?", fa: "چه پیدا شد، چقدر جدی است و چطور رفع می‌شود؟" }, { en: "A list of work, in order of importance", fa: "فهرستی از کارها به ترتیب اهمیت" }]
    ] } },
    { p: { en: "Notice that three of the five phases involve no attacking at all, and that the last one is the reason for all the others. A tester who breaks in brilliantly and writes a poor report has wasted the client's money.",
           fa: "دقت کن که سه مرحله از پنج مرحله اصلاً حمله‌ای ندارد و مرحله‌ی آخر دلیل وجود بقیه است. آزمون‌گری که درخشان نفوذ کند و گزارش ضعیفی بنویسد پول مشتری را هدر داده." } },

    { h: { en: "What testers actually find", fa: "آزمون‌گرها واقعاً چه پیدا می‌کنند" } },
    { p: { en: "Films suggest secret techniques. Real reports are dull, and the same ten lines appear in almost all of them — every one a lesson from this site.",
           fa: "فیلم‌ها از روش‌های مخفی حرف می‌زنند. گزارش‌های واقعی کسل‌کننده‌اند و تقریباً در همه‌شان همان ده خط تکرار می‌شود — هر کدام درسی از همین سایت." } },
    { list: { en: ["Default or reused passwords on routers, cameras, printers and admin pages.", "Software that has not been updated for years.", "Services open to the internet that should be internal: remote desktop, databases, admin panels.", "One flat network, so that reaching one PC means reaching everything.", "Files and shares that 'everyone' can read, containing passwords.", "Staff accounts with administrator rights they do not need.", "No two-step login on email and VPN.", "Old accounts of people who left.", "Backups reachable — and deletable — from the same network.", "Nobody looking at the logs, so the test itself went unnoticed."],
              fa: ["رمزهای پیش‌فرض یا تکراری روی روتر، دوربین، پرینتر و صفحه‌های مدیریت.", "نرم‌افزاری که سال‌هاست به‌روز نشده.", "سرویس‌هایی که باید داخلی باشند ولی رو به اینترنت بازند: ریموت دسکتاپ، پایگاه‌داده، پنل مدیریت.", "شبکه‌ی یک‌تکه، که رسیدن به یک کامپیوتر یعنی رسیدن به همه‌چیز.", "فایل‌ها و پوشه‌های اشتراکی که «همه» می‌توانند بخوانند و رمز در آن‌هاست.", "حساب کارمندان با دسترسی مدیری که لازم ندارند.", "نبودِ ورود دومرحله‌ای روی ایمیل و VPN.", "حساب‌های قدیمیِ افرادی که رفته‌اند.", "پشتیبانی که از همان شبکه قابل دسترسی — و قابل حذف — است.", "اینکه کسی لاگ‌ها را نگاه نمی‌کند، پس خودِ آزمون هم دیده نشد."] } },

    { h: { en: "A lab of your own", fa: "آزمایشگاه خودت" } },
    { p: { en: "You learn this craft by doing, and the only place you may do it freely is on systems that are yours. A complete lab costs nothing but disk space.",
           fa: "این حرفه را با انجام‌دادن یاد می‌گیری و تنها جایی که آزادانه اجازه داری، سیستم‌های خودت است. یک آزمایشگاه کامل جز فضای دیسک هزینه‌ای ندارد." } },
    { list: { en: ["Install VirtualBox (free) and create two virtual machines: one to work from, one to practise on.", "Set their network to 'host-only' or 'internal', so that the practice machine is cut off from your home network and the internet.", "As the target, use a system built to be attacked for learning — deliberately vulnerable practice machines and web applications are published free for exactly this.", "Take a snapshot of the target before each session, and restore it afterwards.", "Keep a notebook: what you tried, what you saw, what you learned. That notebook becomes your portfolio.", "When you are comfortable, join capture-the-flag (CTF) competitions and legal practice platforms, where the targets are provided and the rules are clear."],
              fa: ["VirtualBox (رایگان) را نصب کن و دو ماشین مجازی بساز: یکی برای کارکردن و یکی برای تمرین‌کردن روی آن.", "شبکه‌شان را روی «host-only» یا «internal» بگذار تا ماشین تمرین از شبکه‌ی خانه و اینترنت جدا باشد.", "به‌عنوان هدف از سیستمی استفاده کن که برای یادگیری و حمله ساخته شده — ماشین‌ها و برنامه‌های وبِ عمداً آسیب‌پذیر دقیقاً برای همین رایگان منتشر می‌شوند.", "قبل از هر جلسه از هدف Snapshot بگیر و بعدش برش گردان.", "دفترچه داشته باش: چه چیزی را امتحان کردی، چه دیدی و چه یاد گرفتی. همین دفترچه نمونه‌کارت می‌شود.", "وقتی راحت شدی در مسابقه‌های CTF و پلتفرم‌های تمرینِ قانونی شرکت کن که هدف‌ها را خودشان می‌دهند و قانون‌ها روشن است."] } },

    { h: { en: "Writing a finding", fa: "نوشتن یک یافته" } },
    { table: { head: { en: ["Part", "Example"], fa: ["بخش", "نمونه"] }, rows: [
      [{ en: "Title", fa: "عنوان" }, { en: "Camera recorder uses the factory password", fa: "دستگاه ضبط دوربین‌ها رمز کارخانه را دارد" }],
      [{ en: "Where", fa: "کجا" }, "192.168.30.5, port 80"],
      [{ en: "Severity", fa: "شدت" }, { en: "High — anyone on the guest Wi-Fi can watch and delete recordings", fa: "زیاد — هر کس در وای‌فای مهمان می‌تواند تصاویر را ببیند و حذف کند" }],
      [{ en: "Evidence", fa: "مدرک" }, { en: "Screenshot of the login with the default account, time and date", fa: "تصویر ورود با حساب پیش‌فرض، با ساعت و تاریخ" }],
      [{ en: "Fix", fa: "راه‌حل" }, { en: "Change the password; move cameras to their own VLAN; block it from the guest network", fa: "رمز را عوض کن؛ دوربین‌ها را به VLAN خودشان ببر؛ دسترسی از شبکه‌ی مهمان را ببند" }]
    ] } },
    { p: { en: "Write for the person who has to fix it, not to show how clever the finding was. Put the most serious findings first, say plainly what could happen, and give a fix they can carry out.",
           fa: "برای کسی بنویس که باید رفعش کند، نه برای نشان‌دادن اینکه یافته چقدر هوشمندانه بود. جدی‌ترین یافته‌ها را اول بگذار، ساده بگو چه اتفاقی ممکن است بیفتد و راه‌حلی بده که بتواند انجامش بدهد." } },

    { h: { en: "Rules that keep you out of trouble", fa: "قانون‌هایی که از دردسر دورت نگه می‌دارند" } },
    { list: { en: ["No written permission, no test. Not even 'just a quick scan'.", "Stay inside the scope. If you stumble on something outside it, stop and tell the owner.", "Do no harm: no deleting, no changing data, no taking a service down.", "If you see real personal data, do not copy it. Note that you could reach it, and move on.", "If you find a weakness in someone else's system by accident, report it privately to the owner and do not test further.", "Everything you learn about a client stays confidential, for ever."],
              fa: ["بدون اجازه‌ی مکتوب، آزمونی در کار نیست. حتی «فقط یک اسکن کوچک».", "داخل دامنه بمان. اگر به چیزی بیرون از آن برخوردی، بایست و به صاحبش بگو.", "آسیب نزن: نه حذف، نه تغییر داده، نه ازکارانداختن سرویس.", "اگر داده‌ی شخصی واقعی دیدی کپی‌اش نکن. فقط یادداشت کن که به آن می‌شد رسید و رد شو.", "اگر اتفاقی ضعفی در سیستم دیگران پیدا کردی، خصوصی به صاحبش گزارش بده و بیشتر آزمایش نکن.", "هر چه درباره‌ی یک مشتری می‌فهمی برای همیشه محرمانه می‌ماند."] } },
    { p: { en: "The free book in the Library — 'Hacking and Network Security' — continues from here, with the tools and exercises for each phase, all meant for your own lab. Start it once the other lessons on this path feel familiar.",
           fa: "کتاب رایگان کتابخانه — «هک و امنیت شبکه» — از همین‌جا ادامه می‌دهد، با ابزارها و تمرین‌های هر مرحله که همه برای آزمایشگاه خودت هستند. وقتی درس‌های دیگر این مسیر برایت آشنا شد شروعش کن." } }
  ]
});
window.LEARN.study["authorised-testing"] = {
  goals: { en: ["Explain what a penetration test is for", "List what written permission must contain", "Describe the five phases and set up a safe lab"],
           fa: ["توضیح بدهی تست نفوذ برای چیست", "بگویی اجازه‌ی مکتوب باید چه چیزهایی داشته باشد", "پنج مرحله را توصیف کنی و یک آزمایشگاه امن بسازی"] },
  mistakes: { en: ["Testing first and asking afterwards.", "Drifting outside the agreed scope because something looked interesting.", "A lab that is connected to the home network or the internet.", "A report that lists tools and screenshots but not what to fix."],
              fa: ["اول آزمایش‌کردن و بعد اجازه‌گرفتن.", "بیرون‌رفتن از دامنه‌ی توافق‌شده چون چیزی جالب به نظر رسید.", "آزمایشگاهی که به شبکه‌ی خانه یا اینترنت وصل است.", "گزارشی که ابزار و تصویر فهرست می‌کند ولی نمی‌گوید چه چیزی باید رفع شود."] },
  practice: [
    { q: { en: "A café owner you know says 'check if my Wi-Fi is safe'. What do you need before you start?", fa: "صاحب کافه‌ای که می‌شناسی می‌گوید «ببین وای‌فایم امن است یا نه». قبل از شروع چه لازم داری؟" }, a: { en: "A short written agreement, signed by the owner: what you may test, what you may not, when, and who to call. And confirmation that the equipment is really theirs, not the provider's.", fa: "یک توافق‌نامه‌ی کوتاه مکتوب با امضای صاحب: چه چیزی را آزمایش کنی، چه چیزی را نه، چه زمانی و با چه کسی تماس بگیری. و اطمینان از اینکه تجهیزات واقعاً مال خودش است، نه شرکت اینترنت." } },
    { q: { en: "Put the phases in order: reporting, scanning, proving, reconnaissance, finding weaknesses.", fa: "مرحله‌ها را مرتب کن: گزارش، اسکن، اثبات، شناسایی، یافتن ضعف." }, a: { en: "Reconnaissance → scanning → finding weaknesses → proving → reporting.", fa: "شناسایی ← اسکن ← یافتن ضعف ← اثبات ← گزارش." } },
    { q: { en: "During a test you find an address outside your scope that looks badly protected. What do you do?", fa: "وسط آزمون به آدرسی بیرون از دامنه برمی‌خوری که بد محافظت شده به نظر می‌رسد. چه می‌کنی؟" }, a: { en: "Do not touch it. Tell the client what you noticed and let them decide whether to extend the scope, in writing.", fa: "دست نزن. به مشتری بگو چه دیده‌ای و بگذار خودش تصمیم بگیرد دامنه را، به شکل مکتوب، گسترش بدهد یا نه." } },
    { q: { en: "Why should a practice lab use a host-only or internal network?", fa: "چرا آزمایشگاه تمرین باید از شبکه‌ی host-only یا internal استفاده کند؟" }, a: { en: "So that the deliberately weak machine cannot be reached from the internet, and your practice traffic cannot reach anything that is not yours.", fa: "تا ماشینِ عمداً ضعیف از اینترنت در دسترس نباشد و ترافیک تمرین تو به چیزی که مال تو نیست نرسد." } }
  ],
  recap: { en: ["Permission in writing is the whole difference.", "Recon, scan, find, prove, report — and the report is the product.", "Most findings are ordinary: defaults, old software, flat networks.", "Practise only in your own isolated lab."],
           fa: ["اجازه‌ی مکتوب کل تفاوت است.", "شناسایی، اسکن، یافتن، اثبات، گزارش — و محصول نهایی همان گزارش است.", "بیشتر یافته‌ها معمولی‌اند: پیش‌فرض‌ها، نرم‌افزار قدیمی، شبکه‌ی یک‌تکه.", "فقط در آزمایشگاه جداافتاده‌ی خودت تمرین کن."] }
};

window.LEARN.articles.push({
  id: "build-a-tool", track: "programming", icon: "code", level: "intermediate", minutes: 24, updated: "2026-11",
  title: { en: "A real project: build a tool from start to finish", fa: "یک پروژه‌ی واقعی: ساختن یک ابزار از اول تا آخر" },
  summary: { en: "How a programmer turns a problem into a finished tool: describing it, cutting it into small functions, testing each one, handling mistakes and adding a command line.",
             fa: "برنامه‌نویس چطور یک مسئله را به ابزاری کامل تبدیل می‌کند: توصیف مسئله، تقسیم به تابع‌های کوچک، آزمایش هر کدام، مدیریت خطا و افزودن خط فرمان." },
  blocks: [
    { h: { en: "From exercises to a real program", fa: "از تمرین تا برنامه‌ی واقعی" } },
    { p: { en: "Exercises teach you the words of a language. A project teaches you how to think: where to begin when the page is empty, how to keep a growing program under control, and how to know it works. The method below is the one behind all six tools in the Tools section. We will use it to build a small but genuinely useful one — a script that checks which devices on a list are reachable — and you can then repeat it for any idea of your own.",
           fa: "تمرین‌ها کلمه‌های یک زبان را یاد می‌دهند. پروژه فکرکردن را یاد می‌دهد: وقتی صفحه خالی است از کجا شروع کنی، برنامه‌ای را که بزرگ می‌شود چطور مهار کنی و از کجا بدانی کار می‌کند. روش پایین همان روشی است که پشت هر شش ابزار بخش «ابزارها» است. با آن یک ابزار کوچک ولی واقعاً مفید می‌سازیم — اسکریپتی که بررسی می‌کند کدام دستگاه‌های یک فهرست در دسترس‌اند — و بعد می‌توانی برای هر ایده‌ی خودت تکرارش کنی." } },

    { h: { en: "Step 1 — Write the problem in one paragraph", fa: "قدم ۱ — مسئله را در یک پاراگراف بنویس" } },
    { p: { en: "Before any code, write what the tool does in plain words, including what goes in and what comes out. If you cannot write that paragraph, you are not ready to write the program.",
           fa: "قبل از هر کدی، با کلمه‌های ساده بنویس ابزار چه می‌کند، از جمله اینکه چه چیزی وارد و چه چیزی خارج می‌شود. اگر نمی‌توانی این پاراگراف را بنویسی، هنوز آماده‌ی نوشتن برنامه نیستی." } },
    { note: { en: "\"The tool reads a text file with one device per line (name and address). It tries to connect to each device on a given port. It prints one line per device — UP with the response time, or DOWN — and a summary at the end. It exits with code 1 if anything is down, so that other scripts can react.\"", fa: "«ابزار یک فایل متنی را می‌خواند که هر خطش یک دستگاه است (نام و آدرس). سعی می‌کند روی یک پورت مشخص به هر دستگاه وصل شود. برای هر دستگاه یک خط چاپ می‌کند — UP با زمان پاسخ، یا DOWN — و در آخر یک خلاصه. اگر چیزی قطع بود با کد ۱ خارج می‌شود تا اسکریپت‌های دیگر بتوانند واکنش نشان بدهند.»" }, kind: "tip" },

    { h: { en: "Step 2 — Cut it into small jobs", fa: "قدم ۲ — به کارهای کوچک تقسیمش کن" } },
    { p: { en: "Read the paragraph again and underline the verbs: reads, tries to connect, prints, summarises. Each verb becomes a function with one clear job, clear inputs and a clear result. A good function fits on one screen and can be explained in one sentence.",
           fa: "پاراگراف را دوباره بخوان و زیر فعل‌ها خط بکش: می‌خواند، سعی می‌کند وصل شود، چاپ می‌کند، خلاصه می‌کند. هر فعل تابعی می‌شود با یک کار مشخص، ورودی مشخص و نتیجه‌ی مشخص. تابع خوب در یک صفحه جا می‌شود و در یک جمله توضیح داده می‌شود." } },
    { table: { head: { en: ["Function", "Takes", "Gives back"], fa: ["تابع", "می‌گیرد", "برمی‌گرداند"] }, rows: [
      ["load_devices(path)", { en: "a file name", fa: "نام فایل" }, { en: "a list of (name, address) pairs", fa: "لیستی از جفت‌های (نام، آدرس)" }],
      ["check(address, port)", { en: "an address and a port", fa: "یک آدرس و یک پورت" }, { en: "the response time, or None if down", fa: "زمان پاسخ، یا None اگر قطع بود" }],
      ["report(results)", { en: "the list of results", fa: "لیست نتیجه‌ها" }, { en: "prints the table and returns how many are down", fa: "جدول را چاپ می‌کند و تعداد قطعی‌ها را برمی‌گرداند" }],
      ["main()", { en: "the command-line arguments", fa: "آرگومان‌های خط فرمان" }, { en: "calls the others in order", fa: "بقیه را به ترتیب صدا می‌زند" }]
    ] } },

    { h: { en: "Step 3 — Build one function, and try it at once", fa: "قدم ۳ — یک تابع بساز و همان لحظه امتحانش کن" } },
    { p: { en: "Never write the whole program and then run it for the first time: you will get twenty errors and no idea where to start. Write one function, call it with a simple value, look at the result, and only then go on.",
           fa: "هیچ‌وقت کل برنامه را ننویس که بعد برای اولین بار اجرایش کنی: بیست خطا می‌گیری و نمی‌دانی از کجا شروع کنی. یک تابع بنویس، با یک مقدار ساده صدایش بزن، نتیجه را ببین و فقط بعدش ادامه بده." } },
    { code: "import socket\nimport time\n\ndef check(address, port, timeout=1.0):\n    \"\"\"Return the response time in milliseconds, or None if unreachable.\"\"\"\n    start = time.perf_counter()\n    try:\n        with socket.create_connection((address, port), timeout=timeout):\n            return (time.perf_counter() - start) * 1000\n    except OSError:\n        return None\n\n# try it straight away\nprint(check(\"127.0.0.1\", 22))\nprint(check(\"192.0.2.1\", 22))      # an address that never answers", lang: "python",
      cap: { en: "The text in triple quotes is a docstring: one sentence that says what the function does. The try / except turns 'connection failed' into an ordinary answer instead of a crash.", fa: "متن داخل سه نقل‌قول «Docstring» است: یک جمله که می‌گوید تابع چه می‌کند. try / except «اتصال برقرار نشد» را به‌جای ازکارافتادن برنامه به یک جواب معمولی تبدیل می‌کند." } },
    { code: "def load_devices(path):\n    \"\"\"Read 'name address' lines; skip blank lines and # comments.\"\"\"\n    devices = []\n    with open(path) as f:\n        for line in f:\n            line = line.strip()\n            if not line or line.startswith(\"#\"):\n                continue\n            name, address = line.split()\n            devices.append((name, address))\n    return devices", lang: "python" },

    { h: { en: "Step 4 — Join the pieces", fa: "قدم ۴ — تکه‌ها را وصل کن" } },
    { code: "def report(results):\n    down = 0\n    for name, address, ms in results:\n        if ms is None:\n            print(f\"{name:15} {address:15} DOWN\")\n            down += 1\n        else:\n            print(f\"{name:15} {address:15} UP   {ms:6.1f} ms\")\n    print(f\"{len(results) - down} up, {down} down\")\n    return down\n\ndef main():\n    devices = load_devices(\"devices.txt\")\n    results = [(name, address, check(address, 80)) for name, address in devices]\n    down = report(results)\n    raise SystemExit(1 if down else 0)\n\nif __name__ == \"__main__\":\n    main()", lang: "python",
      cap: { en: "The last two lines mean 'run main() only when this file is started directly'. They let another program import your functions without setting the whole tool off.", fa: "دو خط آخر یعنی «main() را فقط وقتی اجرا کن که همین فایل مستقیم اجرا شده». این اجازه می‌دهد برنامه‌ی دیگری تابع‌هایت را import کند بدون اینکه کل ابزار راه بیفتد." } },

    { h: { en: "Step 5 — Expect things to go wrong", fa: "قدم ۵ — انتظار خرابی را داشته باش" } },
    { p: { en: "A program that works with perfect input is half finished. Ask of every input: what if it is missing, empty or wrong? Then decide what the program should say. A good error message names the problem and tells the person what to do next.",
           fa: "برنامه‌ای که با ورودی بی‌نقص کار می‌کند نیمه‌تمام است. درباره‌ی هر ورودی بپرس: اگر نباشد، خالی باشد یا اشتباه باشد چه؟ بعد تصمیم بگیر برنامه چه بگوید. پیام خطای خوب مشکل را نام می‌برد و می‌گوید قدم بعدی چیست." } },
    { table: { head: { en: ["What if …", "The tool should"], fa: ["اگر …", "ابزار باید"] }, rows: [
      [{ en: "the file does not exist?", fa: "فایل وجود نداشته باشد؟" }, { en: "say \"devices.txt not found\" and exit with code 2", fa: "بگوید «devices.txt not found» و با کد ۲ خارج شود" }],
      [{ en: "a line has three words, or one?", fa: "خطی سه کلمه یا یک کلمه داشته باشد؟" }, { en: "name the line number and skip it", fa: "شماره‌ی خط را بگوید و از آن رد شود" }],
      [{ en: "the list is empty?", fa: "فهرست خالی باشد؟" }, { en: "say so, instead of printing '0 up, 0 down'", fa: "همین را بگوید، به‌جای چاپ «0 up, 0 down»" }],
      [{ en: "a device takes a minute to refuse?", fa: "دستگاهی یک دقیقه طول بکشد تا رد کند؟" }, { en: "give up after the timeout", fa: "بعد از مهلت تعیین‌شده منصرف شود" }]
    ] } },

    { h: { en: "Step 6 — A proper command line", fa: "قدم ۶ — یک خط فرمان درست" } },
    { p: { en: "The file name and the port are written inside the program, so changing them means editing the code. The argparse module turns them into options, checks them, and writes the --help text for you.",
           fa: "نام فایل و پورت داخل برنامه نوشته شده‌اند، پس عوض‌کردنشان یعنی ویرایش کد. ماژول argparse آن‌ها را به گزینه تبدیل می‌کند، بررسی‌شان می‌کند و متن --help را خودش می‌نویسد." } },
    { code: "import argparse\n\ndef main():\n    ap = argparse.ArgumentParser(description=\"Check which devices are reachable.\")\n    ap.add_argument(\"file\", help=\"text file with 'name address' on each line\")\n    ap.add_argument(\"-p\", \"--port\", type=int, default=80)\n    ap.add_argument(\"-t\", \"--timeout\", type=float, default=1.0)\n    args = ap.parse_args()\n\n    devices = load_devices(args.file)\n    results = [(n, a, check(a, args.port, args.timeout)) for n, a in devices]\n    raise SystemExit(1 if report(results) else 0)", lang: "python" },
    { code: "python3 check.py devices.txt\npython3 check.py devices.txt --port 22 --timeout 0.5\npython3 check.py --help", lang: "bash" },

    { h: { en: "Step 7 — Tests that check your work for you", fa: "قدم ۷ — آزمون‌هایی که کارت را برایت بررسی می‌کنند" } },
    { p: { en: "Each time you change the program, something that used to work may break. A test is a tiny program that calls one of your functions and compares the answer with the one you expect. Once written, a hundred tests run in a second, every time, and never get bored.",
           fa: "هر بار برنامه را تغییر می‌دهی ممکن است چیزی که قبلاً کار می‌کرد خراب شود. آزمون برنامه‌ی کوچکی است که یکی از تابع‌هایت را صدا می‌زند و جواب را با چیزی که انتظار داری مقایسه می‌کند. وقتی نوشته شد، صد آزمون هر بار در یک ثانیه اجرا می‌شوند و هیچ‌وقت خسته نمی‌شوند." } },
    { code: "# test_check.py — install once:  pip install pytest   then run:  python3 -m pytest\nfrom check import load_devices\n\ndef test_skips_comments_and_blank_lines(tmp_path):\n    f = tmp_path / \"d.txt\"\n    f.write_text(\"# my devices\\n\\nrouter 192.168.1.1\\nprinter 192.168.1.9\\n\")\n    assert load_devices(f) == [(\"router\", \"192.168.1.1\"), (\"printer\", \"192.168.1.9\")]", lang: "python",
      cap: { en: "assert means 'this must be true'. If it is not, the test fails and tells you which line. Every tool on this site ships with tests like this in its tests folder.", fa: "assert یعنی «این باید درست باشد». اگر نبود، آزمون رد می‌شود و می‌گوید کدام خط. هر ابزار این سایت با آزمون‌هایی مثل این در پوشه‌ی tests خودش همراه است." } },

    { h: { en: "Step 8 — Make it usable by someone else", fa: "قدم ۸ — قابل استفاده برای دیگران" } },
    { list: { en: ["A README of ten lines: what it does, how to run it, one example with its output.", "Names that explain themselves, and a docstring on every function.", "No passwords, addresses of real customers or personal paths in the code.", "Keep versions with git, even when you work alone: git init, then git commit after every step that works. It is an undo button for the whole project.", "Then improve it in small steps: check the devices in parallel, write the result as HTML, send a message when something goes down. That is how the Network Uptime Monitor in the Tools section grew out of exactly this script."],
              fa: ["یک README ده‌خطی: چه می‌کند، چطور اجرا می‌شود و یک مثال با خروجی‌اش.", "اسم‌هایی که خودشان را توضیح بدهند و برای هر تابع یک Docstring.", "بدون رمز، آدرس مشتری واقعی یا مسیر شخصی در کد.", "حتی وقتی تنها کار می‌کنی نسخه‌ها را با git نگه دار: git init و بعد از هر قدمی که کار کرد git commit. این دکمه‌ی «برگرد» برای کل پروژه است.", "بعد قدم‌به‌قدم بهترش کن: دستگاه‌ها را هم‌زمان بررسی کن، نتیجه را HTML بنویس، وقتی چیزی قطع شد پیام بفرست. «مانیتورینگ تجهیزات شبکه» در بخش ابزارها دقیقاً از همین اسکریپت رشد کرده."] } },

    { h: { en: "Ideas for your own first project", fa: "ایده برای اولین پروژه‌ی خودت" } },
    { list: { en: ["Rename the photos in a folder by the date they were taken.", "Read a CSV of expenses and print the total for each month.", "Check a list of websites every hour and note which ones are slow.", "Count the words in a book and show the twenty most common.", "Turn a list of names and extensions into a printable phone directory in HTML.", "Pick the one closest to a problem you actually have. A tool you use is a tool you will finish."],
              fa: ["عکس‌های یک پوشه را بر اساس تاریخ گرفتنشان تغییر نام بده.", "یک CSV از هزینه‌ها را بخوان و جمع هر ماه را چاپ کن.", "هر ساعت فهرستی از سایت‌ها را بررسی کن و بنویس کدام‌ها کندند.", "کلمه‌های یک کتاب را بشمار و بیست کلمه‌ی پرتکرار را نشان بده.", "فهرستی از نام‌ها و داخلی‌ها را به یک دفترچه‌ی تلفنِ قابل چاپ در HTML تبدیل کن.", "آن یکی را انتخاب کن که به مشکلی که واقعاً داری نزدیک‌تر است. ابزاری که استفاده‌اش می‌کنی ابزاری است که تمامش می‌کنی."] } }
  ]
});
window.LEARN.study["build-a-tool"] = {
  goals: { en: ["Describe a tool in one paragraph before writing code", "Cut a problem into small functions and test each as you go", "Handle wrong input, add command-line options and write a first test"],
           fa: ["قبل از کدنویسی ابزار را در یک پاراگراف توصیف کنی", "مسئله را به تابع‌های کوچک تقسیم کنی و هر کدام را همان‌جا آزمایش کنی", "ورودی اشتباه را مدیریت کنی، گزینه‌ی خط فرمان اضافه کنی و اولین آزمون را بنویسی"] },
  mistakes: { en: ["Writing two hundred lines before running anything.", "One giant function that reads, calculates and prints.", "Testing only with perfect input.", "Values such as file names buried in the code.", "No copy of the version that worked yesterday."],
              fa: ["نوشتن دویست خط قبل از اجرای هر چیزی.", "یک تابع غول‌پیکر که می‌خواند، حساب می‌کند و چاپ می‌کند.", "آزمایش فقط با ورودی بی‌نقص.", "مقدارهایی مثل نام فایل که در دل کد دفن شده‌اند.", "نداشتن نسخه‌ای از چیزی که دیروز کار می‌کرد."] },
  practice: [
    { q: { en: "Write the one-paragraph description of a tool that counts how many times each word appears in a text file.", fa: "توصیف یک‌پاراگرافیِ ابزاری را بنویس که می‌شمارد هر کلمه چند بار در یک فایل متنی آمده." }, a: { en: "\"The tool takes the name of a text file. It reads the file, turns everything to small letters, splits it into words and counts each word. It prints the twenty most frequent words with their counts, most frequent first. If the file does not exist it says so and exits with code 2.\"", fa: "«ابزار نام یک فایل متنی را می‌گیرد. فایل را می‌خواند، همه را به حروف کوچک تبدیل می‌کند، به کلمه‌ها می‌شکند و هر کلمه را می‌شمارد. بیست کلمه‌ی پرتکرار را با تعدادشان، از بیشترین، چاپ می‌کند. اگر فایل وجود نداشته باشد همین را می‌گوید و با کد ۲ خارج می‌شود.»" } },
    { q: { en: "Which functions would you cut that tool into?", fa: "آن ابزار را به کدام تابع‌ها تقسیم می‌کنی؟" }, a: { en: "read_text(path) → text; count_words(text) → dictionary of counts; top(counts, n) → the n largest; main() → reads the arguments and prints.", fa: "read_text(path) ← متن؛ count_words(text) ← دیکشنری شمارش‌ها؛ top(counts, n) ← n مورد بزرگ‌تر؛ main() ← آرگومان‌ها را می‌خواند و چاپ می‌کند." } },
    { q: { en: "load_devices crashes with 'ValueError: not enough values to unpack' on a line that contains only a name. Make it skip such lines with a warning.", fa: "load_devices روی خطی که فقط نام دارد با «ValueError: not enough values to unpack» از کار می‌افتد. کاری کن از چنین خط‌هایی با یک هشدار رد شود." }, a: { en: "parts = line.split()\nif len(parts) != 2:\n    print(\"skipping line:\", line)\n    continue\nname, address = parts", fa: "parts = line.split()\nif len(parts) != 2:\n    print(\"skipping line:\", line)\n    continue\nname, address = parts" } },
    { q: { en: "What do the lines  if __name__ == \"__main__\": main()  do?", fa: "خط‌های  if __name__ == \"__main__\": main()  چه می‌کنند؟" }, a: { en: "They run main() only when the file is started directly, not when another file imports it — so tests can import the functions without running the tool.", fa: "main() را فقط وقتی اجرا می‌کنند که فایل مستقیم اجرا شده باشد، نه وقتی فایل دیگری آن را import می‌کند — تا آزمون‌ها بتوانند تابع‌ها را بدون اجرای ابزار وارد کنند." } }
  ],
  recap: { en: ["Describe, divide, build one piece, try it, repeat.", "One function, one job.", "Plan for missing and wrong input.", "Tests and git let you change code without fear."],
           fa: ["توصیف کن، تقسیم کن، یک تکه بساز، امتحانش کن، تکرار کن.", "هر تابع یک کار.", "برای ورودیِ نبوده و اشتباه برنامه داشته باش.", "آزمون و git اجازه می‌دهند بدون ترس کد را عوض کنی."] }
};

// ─────────────────────────────────────────────────────────────
//  Putting everything together (keep this block last).
// ─────────────────────────────────────────────────────────────
(function () {
  const L = window.LEARN;
  // The first eight lessons: introduction, long form (before a closing
  // "what to remember / where next" section when there is one), deeper notes.
  L.articles.forEach((a) => {
    const extra = L.extra[a.id] || [], more = (L.study[a.id] || {}).more || [];
    if (!extra.length && !more.length) return;
    let at = a.blocks.length;
    for (let i = a.blocks.length - 1; i >= 0; i--) {
      if (a.blocks[i].h) { if (/remember|next/i.test(a.blocks[i].h.en)) at = i; break; }
    }
    a.blocks = a.blocks.slice(0, at).concat(extra, more, a.blocks.slice(at));
    if (L.minutes[a.id]) a.minutes = L.minutes[a.id];
  });

  // Programming starts from zero now
  L.roadmap.programming[0] = { t: { en: "Python from absolute zero", fa: "پایتون از صفرِ مطلق" }, d: { en: "What a program is, variables, if, loops, functions — and why indentation matters.", fa: "برنامه چیست، متغیر، if، حلقه، تابع — و چرا تورفتگی مهم است." }, lesson: "python-from-zero" };
  L.roadmap.programming[1] = { t: { en: "Your first real programs", fa: "اولین برنامه‌های واقعی" }, d: { en: "Lists and dictionaries, files, errors, modules and a small project.", fa: "لیست و دیکشنری، فایل، خطا، ماژول و یک پروژه‌ی کوچک." }, lesson: "python-10-minutes" };
  L.roadmap.programming[4] = { t: { en: "Data with SQL", fa: "داده با SQL" }, d: { en: "Tables, SELECT, WHERE, GROUP BY and JOIN — from the first query.", fa: "جدول، SELECT، WHERE، GROUP BY و JOIN — از اولین کوئری." }, lesson: null };

  // Stages whose lesson has been written
  const links = {
    linux: { 3: "linux-text-tools", 5: "linux-server" },
    programming: { 4: "sql-from-zero", 5: "build-a-tool" },
    network: { 1: "subnetting", 2: "how-data-travels", 3: "ports-and-protocols", 4: "network-troubleshooting", 5: "switching-vlans" },
    security: { 3: "reading-logs", 4: "firewalls-hardening", 5: "authorised-testing" }
  };
  const has = (id) => L.articles.some((a) => a.id === id);
  Object.keys(links).forEach((track) => Object.keys(links[track]).forEach((i) => { if (has(links[track][i])) L.roadmap[track][i].lesson = links[track][i]; }));

  // Lessons appear in the order of their track's path
  const tracks = L.tracks.map((t) => t.id);
  const place = (a) => { const i = (L.roadmap[a.track] || []).findIndex((s) => s.lesson === a.id); return tracks.indexOf(a.track) * 100 + (i < 0 ? 50 : i); };
  L.articles = L.articles.map((a, i) => [a, i]).sort((x, y) => place(x[0]) - place(y[0]) || x[1] - y[1]).map((x) => x[0]);

  // Real logos for the technology each lesson and track is about (credits in assets/learn/logos/NOTICE.txt)
  L.logos = {
    tracks: { linux: "linux", programming: "python", network: "network", security: "security" },
    lessons: { "python-10-minutes": "python", "python-from-zero": "python", "javascript-basics": "javascript", "bash-scripting": "bash", "sql-from-zero": "sqlite" }
  };
  L.logoOf = (a) => "assets/learn/logos/" + (L.logos.lessons[a.id] || L.logos.tracks[a.track] || "network") + ".svg";
})();
