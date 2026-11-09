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
