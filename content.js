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

// Put each lesson together: the introduction, the long form (before a closing
// "what to remember / where next" section when there is one), then the deeper notes.
window.LEARN.articles.forEach((a) => {
  const L = window.LEARN, extra = L.extra[a.id] || [], more = (L.study[a.id] || {}).more || [];
  let at = a.blocks.length;
  for (let i = a.blocks.length - 1; i >= 0; i--) {
    if (a.blocks[i].h) { if (/remember|next/i.test(a.blocks[i].h.en)) at = i; break; }
  }
  a.blocks = a.blocks.slice(0, at).concat(extra, more, a.blocks.slice(at));
  if (L.minutes[a.id]) a.minutes = L.minutes[a.id];
});
