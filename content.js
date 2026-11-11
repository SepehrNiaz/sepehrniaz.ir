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
      title: { en: "Python in ten minutes", fa: "پایتون در ده دقیقه" },
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

// The deeper sections become part of each lesson
window.LEARN.articles.forEach((a) => { const s = window.LEARN.study[a.id]; if (s && s.more) a.blocks = a.blocks.concat(s.more); });
