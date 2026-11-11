// ─────────────────────────────────────────────────────────────
//  Edit this file to update your CV site. Everything on the
//  page is generated from the values below.
//
//  The site is bilingual. Any text can be written as
//    { en: "English text", fa: "متن فارسی" }
//  and lists as { en: [...], fa: [...] }. Plain values are used
//  for both languages.
//
//  Icons you can use: network, shield, terminal, monitor, camera,
//  users, award, book, chart, file, code, languages, globe, briefcase
// ─────────────────────────────────────────────────────────────
window.CV = {
  name: { en: "Sepehr Niaz", fa: "سپهر نیاز" },
  title: { en: "IT Technician · Network & Security", fa: "تکنسین IT · شبکه و امنیت" },
  // Rotating titles typed out in the hero
  roles: {
    en: ["IT Technician", "Network Specialist", "Cyber Security Learner", "Computer Engineering Student"],
    fa: ["تکنسین IT", "متخصص شبکه", "علاقه‌مند به امنیت سایبری", "دانشجوی مهندسی کامپیوتر"]
  },
  location: { en: "Shiraz, Iran", fa: "شیراز، ایران" },
  available: { en: "Open to new opportunities", fa: "آماده‌ی همکاری‌های جدید" }, // leave empty to hide the badge
  photo: "assets/photo.jpg", // leave empty to show initials
  // Little labels floating around the photo
  badges: ["CCNA", "Security+", "F5 LTM", "CEH"],
  summary: {
    en: "IT technician at Rose Grand Hotel in Shiraz, keeping the hotel's computers, network, cameras and systems running across every department. I'm studying computer engineering at Islamic Azad University in Shiraz and have trained in Cisco networking, F5 and cyber security. I'm strongest with networks and computer software, and I write about network security and penetration testing.",
    fa: "تکنسین فناوری اطلاعات در هتل رز شیراز هستم و نگهداری کامپیوترها، شبکه، دوربین‌ها و سامانه‌های هتل را در همه‌ی بخش‌ها بر عهده دارم. دانشجوی مهندسی کامپیوتر دانشگاه آزاد اسلامی واحد شیراز هستم و دوره‌های شبکه‌ی سیسکو، F5 و امنیت سایبری را گذرانده‌ام. بیشترین تسلطم روی شبکه و نرم‌افزارهای کامپیوتری است و درباره‌ی امنیت شبکه و تست نفوذ می‌نویسم."
  },

  contact: {
    email: "niazsepehr7@gmail.com",
    phone: "+989177886291",     // international format, digits only after "+"
    whatsapp: true,             // show a WhatsApp button for the phone number
    linkedin: "",               // e.g. "https://www.linkedin.com/in/your-handle"
    github: "https://github.com/sepehrniaz",
    website: "",
    resumePdf: ""               // e.g. "assets/Sepehr-Niaz-CV.pdf"
  },

  // Chat assistant (bot/ folder). It runs entirely in the visitor's browser:
  // asks what they need, follows up with questions for that kind of request,
  // collects their contact details and emails you a categorised summary.
  assistant: {
    enabled: true
  },

  // Big numbers under the hero (they count up when scrolled into view)
  stats: [
    { value: 179, label: { en: "IT tasks handled in 10 months", fa: "کار IT انجام‌شده در ۱۰ ماه" } },
    { value: 12, label: { en: "Hotel work areas covered", fa: "حوزه‌ی کاری در هتل" } },
    { value: 7, label: { en: "Courses & certificates", fa: "دوره و گواهینامه" } },
    { value: 3, suffix: { en: "M", fa: " میلیون" }, label: { en: "Instagram views in a year", fa: "بازدید اینستاگرام در یک سال" } }
  ],

  experience: [
    {
      role: { en: "IT Technician", fa: "تکنسین IT" },
      company: { en: "Rose Grand Hotel, Shiraz", fa: "هتل رز، شیراز" },
      period: { en: "Dec 2024 — Present", fa: "دی ۱۴۰۳ — اکنون" },
      points: {
        en: [
          "Handled 179 logged tasks across 12 areas in my first 10 months, supporting reception, reservations, finance, HR, kitchen, pool, laundry, warehouse and both restaurants.",
          "Maintain computers, printers, fax and phones; gathered all of the hotel's computer equipment and reconnected and set up every system.",
          "Manage the CCTV system and the switches behind it, and gave four departments their own camera access; maintain TV and antenna systems in guest rooms.",
          "Set up VPN and proxy access, remote desktop on department systems, the SMS platform, and the police-registration and guest systems.",
          "Run sound and video for conferences and seminars, added a virtual tour to the hotel website, and manage the hotel's Instagram (3M views and 737K accounts reached in a year).",
          "Train staff on fax, Excel, VPN, restaurant audio and hotel software."
        ],
        fa: [
          "ثبت و انجام ۱۷۹ کار در ۱۲ حوزه طی ۱۰ ماه نخست، با پشتیبانی از پذیرش، رزرواسیون، مالی، کارگزینی، آشپزخانه، استخر، لاندری، انبار و هر دو رستوران.",
          "نگهداری کامپیوترها، پرینترها، فکس و تلفن‌ها؛ جمع‌آوری همه‌ی تجهیزات کامپیوتری هتل و اتصال و راه‌اندازی دوباره‌ی همه‌ی سیستم‌ها.",
          "مدیریت سیستم دوربین‌های مداربسته و سوییچ‌های آن و ایجاد دسترسی دوربین برای چهار واحد؛ نگهداری تلویزیون‌ها و آنتن اتاق‌ها.",
          "راه‌اندازی VPN و پروکسی، دسترسی از راه دور روی سیستم‌های واحدها، سامانه‌ی پیامک و سامانه‌های پلیس‌فرم و جانا.",
          "اجرای صوت و تصویر همایش‌ها و سمینارها، قرار دادن تور مجازی هتل روی سایت و مدیریت اینستاگرام هتل (۳ میلیون بازدید و دسترسی به ۷۳۷ هزار حساب در یک سال).",
          "آموزش همکاران در زمینه‌ی فکس، اکسل، VPN، صوت رستوران و نرم‌افزارهای هتل."
        ]
      },
      // Shown as a bar chart next to the role (tasks by area, from the 10-month report)
      breakdownTitle: { en: "Tasks by area · first 10 months", fa: "کارها به تفکیک حوزه · ۱۰ ماه نخست" },
      breakdown: [
        { label: { en: "Computers & systems", fa: "کامپیوتر و سیستم‌ها" }, value: 41 },
        { label: { en: "CCTV & surveillance", fa: "دوربین و نظارت تصویری" }, value: 23 },
        { label: { en: "Audio, video & events", fa: "صوت، تصویر و همایش" }, value: 22 },
        { label: { en: "Website & Instagram", fa: "سایت و اینستاگرام" }, value: 22 },
        { label: { en: "Printers & fax", fa: "پرینتر و فکس" }, value: 16 },
        { label: { en: "TV & antenna", fa: "تلویزیون و آنتن" }, value: 14 },
        { label: { en: "Internet & VPN", fa: "اینترنت و VPN" }, value: 12 },
        { label: { en: "Systems & software", fa: "سامانه‌ها و نرم‌افزار" }, value: 12 }
      ]
    }
  ],

  education: [
    {
      degree: { en: "B.Sc. Computer Engineering", fa: "کارشناسی مهندسی کامپیوتر" },
      school: { en: "Islamic Azad University, Shiraz Branch", fa: "دانشگاه آزاد اسلامی واحد شیراز" },
      period: { en: "2023 — Present", fa: "مهر ۱۴۰۲ — اکنون" },
      status: { en: "In progress", fa: "در حال تحصیل" }
    }
  ],

  // percent fills the ring around each language
  languages: [
    { name: { en: "Persian", fa: "فارسی" }, level: { en: "Native", fa: "زبان مادری" }, percent: 100 },
    { name: { en: "English", fa: "انگلیسی" }, level: { en: "Duolingo 135 / 160", fa: "دولینگو ۱۳۵ از ۱۶۰" }, percent: 84 }
  ],

  // image: preview shown on the card; file: the PDF it opens
  certifications: [
    { name: { en: "Cyber Security Pack", fa: "پکیج امنیت سایبری" }, detail: "CEH · SANS SEC504 · PWK · SANS SEC542", issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Apr — Oct 2025", fa: "فروردین — مهر ۱۴۰۴" }, icon: "shield", image: "assets/certificates/previews/cyber-security-pack.jpg", file: "assets/certificates/cyber-security-pack.pdf" },
    { name: { en: "F5 Package", fa: "پکیج F5" }, detail: { en: "Admin & Troubleshooting · LTM · ASM/AWAF", fa: "مدیریت و عیب‌یابی · LTM · ASM/AWAF" }, issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Feb — Aug 2025", fa: "اسفند ۱۴۰۳ — مرداد ۱۴۰۴" }, icon: "network", image: "assets/certificates/previews/f5.jpg", file: "assets/certificates/f5.pdf" },
    { name: "Security+", detail: { en: "Security fundamentals", fa: "مبانی امنیت" }, issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Oct — Nov 2024", fa: "مهر — آذر ۱۴۰۳" }, icon: "shield", image: "assets/certificates/previews/security-plus.jpg", file: "assets/certificates/security-plus.pdf" },
    { name: "Cisco CCNA 200-301", detail: { en: "Routing & switching", fa: "مسیریابی و سوییچینگ" }, issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Feb — Jul 2024", fa: "بهمن ۱۴۰۲ — تیر ۱۴۰۳" }, icon: "network", image: "assets/certificates/previews/ccna.jpg", file: "assets/certificates/ccna.pdf" },
    { name: { en: "Duolingo English Test", fa: "آزمون زبان دولینگو" }, detail: { en: "Overall score 135 / 160", fa: "نمره‌ی کل ۱۳۵ از ۱۶۰" }, issuer: { en: "Duolingo", fa: "دولینگو" }, period: { en: "May 2024", fa: "اردیبهشت ۱۴۰۳" }, icon: "languages", image: "assets/certificates/previews/duolingo-english-test.jpg", file: "assets/certificates/duolingo-english-test.pdf" },
    { name: "Python Foundation MasterClass", detail: { en: "Python programming", fa: "برنامه‌نویسی پایتون" }, issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Oct — Dec 2023", fa: "مهر — آذر ۱۴۰۲" }, icon: "code", image: "assets/certificates/previews/python.jpg", file: "assets/certificates/python.pdf" },
    { name: "Network+", detail: { en: "Networking fundamentals", fa: "مبانی شبکه" }, issuer: { en: "Cando IT Academy", fa: "آموزشگاه کندو" }, period: { en: "Aug — Oct 2023", fa: "مرداد — مهر ۱۴۰۲" }, icon: "network", image: "assets/certificates/previews/network-plus.jpg", file: "assets/certificates/network-plus.pdf" }
  ],


  skills: [
    {
      group: { en: "Networking", fa: "شبکه" }, icon: "network",
      items: { en: ["Computer networking", "Cisco routing & switching", "F5 BIG-IP LTM / ASM", "VPN & remote access"],
               fa: ["شبکه‌های کامپیوتری", "مسیریابی و سوییچینگ سیسکو", "F5 BIG-IP LTM / ASM", "VPN و دسترسی از راه دور"] }
    },
    {
      group: { en: "Security", fa: "امنیت" }, icon: "shield",
      items: { en: ["Network security", "Penetration testing", "Nmap", "Wireshark", "Metasploit", "Burp Suite"],
               fa: ["امنیت شبکه", "تست نفوذ", "Nmap", "Wireshark", "Metasploit", "Burp Suite"] }
    },
    {
      group: { en: "Systems & support", fa: "سیستم و پشتیبانی" }, icon: "monitor",
      items: { en: ["Windows & software troubleshooting", "Linux command line", "Hardware & printers", "CCTV systems", "Python"],
               fa: ["عیب‌یابی ویندوز و نرم‌افزار", "خط فرمان لینوکس", "سخت‌افزار و پرینتر", "دوربین مداربسته", "پایتون"] }
    },
    {
      group: { en: "Media & people", fa: "رسانه و ارتباطات" }, icon: "users",
      items: { en: ["Event audio & video", "Instagram & social media", "Staff training"],
               fa: ["صوت و تصویر مراسم", "اینستاگرام و شبکه‌های اجتماعی", "آموزش همکاران"] }
    }
  ],

  // Portfolio: detailed showcases of tools I've built (code in projects/).
  // category: network | security | support
  // preview: { image: "path.png" } or { cmd: "command", output: "terminal text" }
  portfolio: [
    {
      name: { en: "Network Uptime Monitor", fa: "مانیتورینگ تجهیزات شبکه" },
      category: "network", icon: "monitor",
      tagline: { en: "Know a camera or access point is down before anyone complains.",
                 fa: "قبل از اینکه کسی شکایت کند، بفهمید کدام دوربین یا اکسس‌پوینت قطع است." },
      problem: { en: "In a hotel, the first sign that a device is down is usually a guest or a manager calling. With dozens of switches, access points, cameras and printers, nobody can check them all by hand.",
                 fa: "در هتل معمولاً اولین نشانه‌ی خرابی یک دستگاه، تماس مهمان یا مدیر است. با ده‌ها سوئیچ، اکسس‌پوینت، دوربین و پرینتر، بررسی دستی همه‌ی آن‌ها ممکن نیست." },
      solution: { en: "A Python service that checks every device on a schedule by ping or TCP port, keeps the history in SQLite and writes a status dashboard that can stay open on a screen in the IT room.",
                  fa: "یک سرویس پایتونی که همه‌ی دستگاه‌ها را در فاصله‌های منظم با Ping یا پورت TCP بررسی می‌کند، تاریخچه را در SQLite نگه می‌دارد و داشبوردی می‌سازد که می‌شود روی مانیتور اتاق IT باز گذاشت." },
      features: {
        en: ["Devices listed in a simple CSV file: name, IP, type, port, location", "Ping, or a TCP port check for devices that block ping (RTSP for cameras, 9100 for printers)", "All devices checked in parallel", "Uptime % for 24 hours, 7 days and 30 days, plus “down since” times", "Exit code for cron / Task Scheduler alerts"],
        fa: ["فهرست دستگاه‌ها در یک فایل CSV ساده: نام، IP، نوع، پورت، محل", "بررسی با Ping، یا پورت TCP برای دستگاه‌هایی که Ping را می‌بندند (RTSP دوربین، ۹۱۰۰ پرینتر)", "بررسی همزمان همه‌ی دستگاه‌ها", "درصد Uptime در ۲۴ ساعت، ۷ روز و ۳۰ روز و زمان شروع قطعی", "کد خروج مناسب برای هشدار از طریق cron یا Task Scheduler"]
      },
      tech: ["Python", "SQLite", "ICMP / TCP", "HTML / CSS", "Multithreading"],
      preview: { image: "projects/network-uptime-monitor/docs/dashboard.png" },
      learn: { en: "How ping and a TCP port check differ, how a program does many checks at once (threads), and how to keep history in a small database. Try it yourself: in the practice lab run ping 192.168.1.1 in the Linux terminal, then write a Python loop over a list of IP addresses.",
               fa: "تفاوت Ping با بررسی پورت TCP، اینکه یک برنامه چطور چند بررسی را هم‌زمان انجام می‌دهد (Thread) و چطور تاریخچه را در یک پایگاه‌داده‌ی کوچک نگه می‌دارد. خودت امتحان کن: در آزمایشگاه تمرین در ترمینال لینوکس ping 192.168.1.1 را بزن و بعد در پایتون یک حلقه روی فهرستی از IPها بنویس." },
      code: { file: "monitor.py", steps: [
        { fn: "tcp_check", en: "Is the device answering? This tries to open a TCP connection to one port and measures how long it took. If the connection fails, it returns None, which means 'down'.",
          fa: "دستگاه جواب می‌دهد یا نه؟ این تابع سعی می‌کند به یک پورت اتصال TCP باز کند و زمانش را اندازه می‌گیرد. اگر اتصال برقرار نشود None برمی‌گرداند، یعنی «قطع»." },
        { fn: "ping_check", en: "For devices without a port to test, it runs the system's own ping command once. Windows and Linux use different options (-n / -c), so the code picks the right ones.",
          fa: "برای دستگاه‌هایی که پورتی برای آزمایش ندارند، همان دستور ping سیستم را یک بار اجرا می‌کند. گزینه‌های ویندوز و لینوکس فرق دارند (-n و -c)، پس کد نسخه‌ی درست را انتخاب می‌کند." },
        { fn: "check_all", en: "Checking 50 devices one after another would be slow. A thread pool checks them all at the same time, so a full round takes about one second.",
          fa: "بررسی ۵۰ دستگاه پشت‌سرهم کند است. یک Thread Pool همه را هم‌زمان بررسی می‌کند و یک دور کامل حدود یک ثانیه طول می‌کشد." },
        { fn: "uptime", en: "Every result is saved in SQLite. One SQL query then gives the uptime of each device: the average of the 'up' column (0 or 1) times 100.",
          fa: "هر نتیجه در SQLite ذخیره می‌شود. بعد یک کوئری SQL درصد در دسترس بودن هر دستگاه را می‌دهد: میانگین ستون up (صفر یا یک) ضرب در ۱۰۰." }
      ] },
      build: { need: { en: "Python 3 (nothing else to install). Make a folder, and in it a file monitor.py and a file devices.csv with one line per device: name,host,type,port,location.",
                       fa: "پایتون ۳ (چیز دیگری لازم نیست نصب کنی). یک پوشه بساز و داخلش فایل monitor.py و فایل devices.csv با یک خط برای هر دستگاه: name,host,type,port,location." },
               run: "python3 monitor.py devices.csv\npython3 monitor.py devices.csv --every 60",
               ideas: { en: ["Send yourself a message when a device goes down.", "Add a chart of response time for the last 24 hours.", "Check a web page's HTTP status as a third kind of test."],
                        fa: ["وقتی دستگاهی قطع شد برای خودت پیام بفرست.", "نمودار زمان پاسخ ۲۴ ساعت گذشته را اضافه کن.", "بررسی وضعیت HTTP یک صفحه‌ی وب را به‌عنوان نوع سوم آزمون اضافه کن."] } },
      path: "projects/network-uptime-monitor"
    },
    {
      name: { en: "Cisco Switch Config Generator", fa: "تولیدکننده‌ی کانفیگ سوئیچ سیسکو" },
      category: "network", icon: "network",
      tagline: { en: "Describe a switch once, get a complete hardened IOS config.",
                 fa: "طراحی سوئیچ را یک بار بنویسید و کانفیگ کامل و امن IOS بگیرید." },
      problem: { en: "Configuring many access switches by hand leads to typos, VLAN mistakes and forgotten security settings like BPDU Guard or shutting unused ports.",
                 fa: "کانفیگ دستی چندین سوئیچ باعث اشتباه تایپی، خطای VLAN و فراموش شدن تنظیمات امنیتی مثل BPDU Guard یا خاموش کردن پورت‌های بلااستفاده می‌شود." },
      solution: { en: "A generator that reads a short JSON design (VLANs, port groups, uplinks, management) and writes the full Cisco IOS configuration with security best practices built in. It checks the design first and refuses to produce a config with mistakes.",
                  fa: "ابزاری که یک طراحی کوتاه JSON (VLANها، گروه پورت‌ها، آپلینک، مدیریت) را می‌خواند و کانفیگ کامل IOS سیسکو را با رعایت اصول امنیتی می‌سازد. اول طراحی را بررسی می‌کند و اگر خطا داشته باشد کانفیگ نمی‌سازد." },
      features: {
        en: ["VLANs, access ports with voice VLAN, trunks with an explicit allowed list", "Port security, DHCP snooping, BPDU Guard, storm control", "Unused ports shut down and parked in a black-hole VLAN", "SSH-only access, login rate limiting, management ACL, NTP and syslog", "Finds duplicate ports, undefined VLANs, VLAN-hopping risks and wrong gateways"],
        fa: ["VLAN، پورت‌های Access با Voice VLAN، ترانک با فهرست مشخص VLANهای مجاز", "Port Security، DHCP Snooping، BPDU Guard و Storm Control", "خاموش کردن پورت‌های بلااستفاده و انتقالشان به VLAN جداگانه", "دسترسی فقط با SSH، محدودیت تلاش ورود، ACL مدیریتی، NTP و Syslog", "پیدا کردن پورت تکراری، VLAN تعریف‌نشده، خطر VLAN Hopping و Gateway اشتباه"]
      },
      tech: ["Python", "Cisco IOS", "VLAN / 802.1Q", "Layer 2 security", "JSON"],
      preview: { cmd: "python3 genconfig.py examples/broken.json --check",
        output: "examples/broken.json: 7 problem(s)\n  - VLAN 1003 is reserved or out of range\n  - Gi1/0/4 used by both 'PCs' and 'Printers'\n  - Gi1/0/4-6: access VLAN 50 is not defined\n  - Gi1/0/24: trunk allows undefined VLAN 20\n  - Gi1/0/24: native VLAN carries user traffic (VLAN hopping risk)\n  - management VLAN 99 is not defined\n  - gateway 10.0.1.1 is not in management subnet 10.0.0.0/24" },
      learn: { en: "What VLANs, access ports and trunks are, which Layer 2 protections a switch should always have, and how a program turns a short description (JSON) into a long, error-free text. Read the lesson on VLANs first, then open the code and follow one port from the JSON to the final config.",
               fa: "اینکه VLAN، پورت Access و ترانک چیست، یک سوئیچ همیشه چه محافظت‌های لایه‌ی ۲ باید داشته باشد و یک برنامه چطور یک توضیح کوتاه (JSON) را به متنی بلند و بی‌غلط تبدیل می‌کند. اول درس VLAN را بخوان، بعد کد را باز کن و مسیر یک پورت را از JSON تا کانفیگ نهایی دنبال کن." },
      code: { file: "genconfig.py", steps: [
        { fn: "expand_ports", en: "Turns a short port range like Gi1/0/1-3 into the full list of ports, and stops with a clear message if the range is written wrongly.",
          fa: "یک بازه‌ی کوتاه مثل Gi1/0/1-3 را به فهرست کامل پورت‌ها تبدیل می‌کند و اگر بازه غلط نوشته شده باشد با پیام روشن متوقف می‌شود." },
        { fn: "validate", en: "Before writing any config, the design is checked: are VLAN numbers valid, is a port used twice, does every port point to a VLAN that exists? It collects every problem instead of stopping at the first.",
          fa: "قبل از نوشتن کانفیگ، طراحی بررسی می‌شود: شماره‌ی VLANها معتبر است؟ پورتی دو بار استفاده نشده؟ هر پورت به VLANی اشاره می‌کند که وجود دارد؟ به‌جای توقف در اولین خطا، همه‌ی مشکل‌ها را جمع می‌کند." },
        { fn: "ios_range", en: "Cisco IOS wants ranges written with spaces (Gi1/0/1 - 6). One regular expression rewrites them in that form.",
          fa: "IOS سیسکو بازه‌ها را با فاصله می‌خواهد (Gi1/0/1 - 6). یک عبارت باقاعده (Regex) آن‌ها را به همین شکل بازنویسی می‌کند." }
      ] },
      build: { need: { en: "Python 3 and basic knowledge of VLANs. Make genconfig.py, and a JSON file that describes one switch: hostname, vlans and port groups.",
                       fa: "پایتون ۳ و آشنایی اولیه با VLAN. فایل genconfig.py را بساز و یک فایل JSON که یک سوئیچ را توصیف می‌کند: hostname، VLANها و گروه پورت‌ها." },
               run: "python3 genconfig.py examples/hotel-floor1.json --check\npython3 genconfig.py examples/hotel-floor1.json --out configs",
               ideas: { en: ["Add support for a second vendor's syntax.", "Generate the config for ten switches from one spreadsheet.", "Add a check that every trunk has a native VLAN that carries no users."],
                        fa: ["پشتیبانی از دستورهای یک برند دیگر را اضافه کن.", "کانفیگ ده سوئیچ را از یک جدول اکسل بساز.", "بررسی‌ای اضافه کن که Native VLAN هر ترانک کاربری نداشته باشد."] } },
      path: "projects/cisco-config-generator"
    },
    {
      name: { en: "SSH Log Analyzer", fa: "تحلیل‌گر لاگ SSH" },
      category: "security", icon: "shield",
      tagline: { en: "Find brute-force attacks in Linux logs, and whether anyone got in.",
                 fa: "حملات Brute-force را در لاگ لینوکس پیدا کنید و ببینید کسی وارد شده یا نه." },
      problem: { en: "Any server with SSH open gets thousands of password-guessing attempts. They are buried in the auth log, and the one that matters, a successful login after many failures, is easy to miss.",
                 fa: "هر سروری که SSH آن باز باشد هزاران تلاش برای حدس رمز دریافت می‌کند. این تلاش‌ها در لاگ گم می‌شوند و مهم‌ترینشان، یعنی ورود موفق بعد از چندین شکست، به‌راحتی دیده نمی‌شود." },
      solution: { en: "A log analyzer that groups failed logins by IP, finds bursts with a sliding time window, warns loudly about successful logins after an attack, and prints ready-to-paste rules to block the attackers.",
                  fa: "تحلیل‌گری که ورودهای ناموفق را بر اساس IP دسته‌بندی می‌کند، با پنجره‌ی زمانی لغزان حمله‌های پشت‌سرهم را پیدا می‌کند، درباره‌ی ورود موفق بعد از حمله هشدار جدی می‌دهد و قوانین آماده برای مسدود کردن مهاجم‌ها می‌نویسد." },
      features: {
        en: ["Reads auth.log, secure and journalctl output (IPv4 and IPv6)", "Burst detection with a configurable threshold and time window", "Flags possible compromises: a login after a run of failures", "Lists the usernames attackers guess and the hours they attack", "Block rules for iptables, ufw or a Cisco extended ACL, plus JSON output"],
        fa: ["خواندن auth.log، secure و خروجی journalctl (IPv4 و IPv6)", "تشخیص حمله‌ی پشت‌سرهم با آستانه و بازه‌ی زمانی قابل تنظیم", "هشدار نفوذ احتمالی: ورود موفق بعد از چندین شکست", "نمایش نام‌کاربری‌هایی که مهاجم امتحان کرده و ساعت‌های حمله", "قوانین مسدودسازی برای iptables، ufw یا ACL سیسکو و خروجی JSON"]
      },
      tech: ["Python", "Linux", "Regex", "iptables / ufw", "Cisco ACL"],
      preview: { cmd: "python3 log_analyzer.py sample/auth.log --block cisco",
        output: "Failed logins: 69   Successful logins: 9   Source IPs: 5\nFlagged (5+ failures within 300s, or a login after them): 2\n\nIP                 Fails  Burst  Invalid  Top usernames\n198.51.100.77         18     18        0  admin\n203.0.113.45          46     46        9  ftpuser, pi, guest, ubuntu\n\n!! 198.51.100.77 logged in as 'admin' after 18 failures.\n\n# cisco rules\nip access-list extended BLOCK-SSH-ATTACKERS\n deny tcp host 198.51.100.77 any eq 22\n deny tcp host 203.0.113.45 any eq 22\n permit ip any any" },
      learn: { en: "How to read a Linux auth log, what a brute-force attack looks like, and how to pull facts out of text with patterns (regex). Try it yourself: in the practice lab's Linux terminal run grep Failed logs/auth.log | wc -l — that one line is the heart of this tool.",
               fa: "خواندن لاگ ورود لینوکس، اینکه حمله‌ی Brute-force چه شکلی است و چطور با الگو (Regex) از دل متن اطلاعات بیرون بکشی. خودت امتحان کن: در ترمینال لینوکسِ آزمایشگاه تمرین بزن grep Failed logs/auth.log | wc -l — همین یک خط قلب این ابزار است." },
      code: { file: "log_analyzer.py", steps: [
        { fn: "analyze", en: "Reads the log line by line. Regular expressions pick out three kinds of line: a failed password, an unknown username and a successful login. Everything is grouped by the attacker's IP address.",
          fa: "لاگ را خط‌به‌خط می‌خواند. عبارت‌های باقاعده سه نوع خط را جدا می‌کنند: رمز اشتباه، نام کاربری ناشناخته و ورود موفق. همه‌چیز بر اساس IP مهاجم دسته‌بندی می‌شود." },
        { fn: "max_burst", en: "The sliding window: it finds the largest number of failures that happened within a short time (for example 5 minutes). Many failures close together mean a robot, not a person who forgot a password.",
          fa: "پنجره‌ی لغزان: بیشترین تعداد تلاش ناموفق را که در یک بازه‌ی کوتاه (مثلاً ۵ دقیقه) رخ داده پیدا می‌کند. تلاش‌های زیادِ پشت‌سرهم یعنی ربات، نه کسی که رمزش را فراموش کرده." },
        { fn: "compromised", en: "The most important check: did this IP log in successfully after many failures? That may mean the password was guessed.",
          fa: "مهم‌ترین بررسی: آیا این IP بعد از تعداد زیادی تلاش ناموفق، موفق به ورود شده؟ این می‌تواند یعنی رمز حدس زده شده است." },
        { fn: "block_rules", en: "Writes ready-to-paste firewall rules for the attackers' addresses, for iptables, ufw or a Cisco access list.",
          fa: "برای آدرس مهاجم‌ها قانون آماده‌ی فایروال می‌نویسد: برای iptables، ufw یا Access List سیسکو." }
      ] },
      build: { need: { en: "Python 3 and a log to read: /var/log/auth.log on Ubuntu, or the sample file. Make log_analyzer.py and start with the regular expressions that recognise a failed and a successful login.",
                       fa: "پایتون ۳ و یک لاگ برای خواندن: /var/log/auth.log در اوبونتو یا فایل نمونه. فایل log_analyzer.py را بساز و با عبارت‌های باقاعده‌ای شروع کن که ورود ناموفق و موفق را تشخیص می‌دهند." },
               run: "python3 log_analyzer.py sample/auth.log\npython3 log_analyzer.py sample/auth.log --block ufw",
               ideas: { en: ["Show which country each address belongs to.", "Read the log live and warn the moment an attack starts.", "Do the same analysis for a web server's access log."],
                        fa: ["نشان بده هر آدرس مال کدام کشور است.", "لاگ را زنده بخوان و همان لحظه‌ی شروع حمله هشدار بده.", "همین تحلیل را برای لاگ دسترسی یک وب‌سرور انجام بده."] } },
      path: "projects/ssh-log-analyzer"
    },
    {
      name: { en: "Port Scanner", fa: "اسکنر پورت" },
      category: "security", icon: "terminal",
      tagline: { en: "See which services every device exposes, and which ones shouldn't be open.",
                 fa: "ببینید هر دستگاه چه سرویس‌هایی را باز گذاشته و کدام‌ها نباید باز باشند." },
      problem: { en: "Old devices on internal networks often run services that should be off: Telnet on a switch, RDP on a PC, a DVR's management port reachable from the guest network.",
                 fa: "دستگاه‌های قدیمی شبکه‌ی داخلی معمولاً سرویس‌هایی دارند که باید خاموش باشند: Telnet روی سوئیچ، RDP روی کامپیوتر، یا پورت مدیریتی DVR که از شبکه‌ی مهمان در دسترس است." },
      solution: { en: "A multi-threaded TCP scanner for authorised audits. It checks a host or a whole subnet, reads service banners, and explains why each risky open port is a problem and what to do about it.",
                  fa: "اسکنر چندنخی TCP برای ممیزی‌های مجاز. یک دستگاه یا کل زیرشبکه را بررسی می‌کند، بنر سرویس‌ها را می‌خواند و برای هر پورت پرخطر توضیح می‌دهد چرا مشکل است و چه باید کرد." },
      features: {
        en: ["Single host, hostname or CIDR range", "Port lists and ranges, 200 parallel connections by default", "Banner grabbing: SSH versions, HTTP Server headers", "Built-in warnings for Telnet, FTP, SMB, RDP, VNC, SNMP and DVR ports", "JSON export for reports"],
        fa: ["یک IP، نام دامنه یا یک بازه‌ی CIDR", "فهرست و بازه‌ی پورت، با ۲۰۰ اتصال همزمان به‌صورت پیش‌فرض", "خواندن بنر سرویس‌ها: نسخه‌ی SSH و هدر Server وب", "هشدار داخلی برای Telnet، FTP، SMB، RDP، VNC، SNMP و پورت DVR", "خروجی JSON برای گزارش"]
      },
      tech: ["Python", "TCP/IP", "Sockets", "Threading", "Security audit"],
      preview: { cmd: "python3 portscan.py 192.168.1.0/28 --banner",
        output: "Scanning 14 host(s), 26 port(s)...\n\n192.168.1.1\n     22/tcp  open  ssh          SSH-2.0-Cisco-1.25\n     80/tcp  open  http         Server: lighttpd\n\n192.168.1.8\n     23/tcp  open  telnet\n         ! Telnet sends passwords in clear text, use SSH\n  37777/tcp  open  dahua-dvr\n         ! DVR/NVR management port: never expose it to the guest or public network\n\nDone in 1.4s: 2 host(s) with open ports." },
      learn: { en: "What a port is, how a TCP connection opens, which services are risky to leave open (Telnet, RDP, SMB) and why. Only scan networks you own or have written permission to test.",
               fa: "اینکه پورت چیست، اتصال TCP چطور باز می‌شود و باز ماندن کدام سرویس‌ها خطرناک است (Telnet، RDP، SMB) و چرا. فقط شبکه‌ای را اسکن کن که مال خودت است یا اجازه‌ی کتبی برای آزمایشش داری." },
      code: { file: "portscan.py", steps: [
        { fn: "parse_ports", en: "Turns text like 22,80,8000-8010 into a clean, sorted list of port numbers and rejects anything outside 1–65535.",
          fa: "متنی مثل 22,80,8000-8010 را به فهرست مرتب شماره‌ی پورت‌ها تبدیل می‌کند و هر چیزی خارج از ۱ تا ۶۵۵۳۵ را رد می‌کند." },
        { fn: "expand_targets", en: "Accepts one address, a hostname or a whole range like 192.168.1.0/28. It refuses ranges larger than 1024 addresses, as a safety limit.",
          fa: "یک آدرس، یک نام یا یک بازه‌ی کامل مثل 192.168.1.0/28 را می‌پذیرد. برای ایمنی، بازه‌های بزرگ‌تر از ۱۰۲۴ آدرس را قبول نمی‌کند." },
        { fn: "scan_port", en: "The heart of the scanner: try to connect. If the connection opens, the port is open; if it fails, the port is closed or filtered.",
          fa: "قلب اسکنر: تلاش برای اتصال. اگر اتصال باز شود پورت باز است و اگر نشود پورت بسته یا فیلتر شده است." },
        { fn: "grab_banner", en: "Many services introduce themselves when you connect. This reads the first line (for example the SSH version), which tells you what is running there.",
          fa: "خیلی از سرویس‌ها موقع اتصال خودشان را معرفی می‌کنند. این تابع خط اول را می‌خواند (مثلاً نسخه‌ی SSH) تا معلوم شود چه چیزی آنجا اجرا می‌شود." }
      ] },
      build: { need: { en: "Python 3, and a network that is yours or that you have written permission to test. Make portscan.py; everything it needs (socket, ipaddress, threads) ships with Python.",
                       fa: "پایتون ۳ و شبکه‌ای که مال خودت است یا اجازه‌ی کتبی برای آزمایشش داری. فایل portscan.py را بساز؛ هر چه لازم دارد (socket، ipaddress و Thread) همراه پایتون هست." },
               run: "python3 portscan.py 127.0.0.1\npython3 portscan.py 192.168.1.0/28 --banner",
               ideas: { en: ["Save the result as a CSV or HTML report.", "Compare today's scan with last week's and show only what changed.", "Add a UDP check for DNS and SNMP."],
                        fa: ["نتیجه را به شکل گزارش CSV یا HTML ذخیره کن.", "اسکن امروز را با هفته‌ی پیش مقایسه کن و فقط تغییرها را نشان بده.", "بررسی UDP برای DNS و SNMP اضافه کن."] } },
      path: "projects/port-scanner"
    },
    {
      name: { en: "Subnet & VLSM Calculator", fa: "ماشین‌حساب زیرشبکه و VLSM" },
      category: "network", icon: "code",
      tagline: { en: "Plan IP addressing for every department without wasting addresses.",
                 fa: "آدرس‌دهی IP همه‌ی بخش‌ها را بدون هدر رفتن آدرس طراحی کنید." },
      problem: { en: "Splitting one address block between departments of different sizes by hand is slow and error-prone, and one overlapping subnet can break routing.",
                 fa: "تقسیم دستی یک بلوک آدرس بین بخش‌هایی با اندازه‌های مختلف کند و پرخطاست و یک زیرشبکه‌ی هم‌پوشان می‌تواند مسیریابی را خراب کند." },
      solution: { en: "A command-line calculator: give it a block and how many hosts each department needs, and it packs the smallest fitting subnet for each, largest first, with no gaps.",
                  fa: "یک ماشین‌حساب خط فرمان: بلوک آدرس و تعداد دستگاه‌های هر بخش را می‌گیرد و برای هر بخش کوچک‌ترین زیرشبکه‌ی مناسب را، از بزرگ به کوچک و بدون فاصله، تخصیص می‌دهد." },
      features: {
        en: ["Netmask, wildcard mask (for ACLs and OSPF), broadcast and host range", "Split a network into equal subnets", "VLSM planning by department", "Handles /31 point-to-point links and /32 host routes"],
        fa: ["ماسک، Wildcard (برای ACL و OSPF)، آدرس Broadcast و بازه‌ی میزبان‌ها", "تقسیم شبکه به زیرشبکه‌های مساوی", "طراحی VLSM بر اساس بخش‌ها", "پشتیبانی از لینک‌های /31 و مسیرهای /32"]
      },
      tech: ["Python", "IPv4", "VLSM / CIDR", "CCNA"],
      preview: { cmd: "python3 subnet_calc.py vlsm 172.16.0.0/22 Reception=120 Rooms=300 Cameras=60 Office=25",
        output: "Name       Need  Subnet           Mask             Fits\n--------------------------------------------------------\nRooms      300   172.16.0.0/23    255.255.254.0    510\nReception  120   172.16.2.0/25    255.255.255.128  126\nCameras    60    172.16.2.128/26  255.255.255.192  62\nOffice     25    172.16.2.192/27  255.255.255.224  30" },
      learn: { en: "How an IP address splits into network and host parts, what /24 or /26 means, and how to size a subnet for a number of devices. Work one example by hand first (how many hosts fit in a /26?), then check your answer with the tool.",
               fa: "اینکه آدرس IP چطور به بخش شبکه و میزبان تقسیم می‌شود، /24 یا /26 یعنی چه و برای تعداد مشخصی دستگاه چه اندازه زیرشبکه‌ای لازم است. اول یک مثال را دستی حل کن (در یک /26 چند دستگاه جا می‌شود؟) و بعد جوابت را با ابزار مقایسه کن." },
      code: { file: "subnet_calc.py", steps: [
        { fn: "prefix_for_hosts", en: "How big must a subnet be for N devices? Two addresses are reserved (network and broadcast), so it finds the smallest power of two that holds N + 2.",
          fa: "برای N دستگاه زیرشبکه چقدر باید بزرگ باشد؟ دو آدرس رزرو است (شبکه و Broadcast)، پس کوچک‌ترین توان ۲ را که N + 2 در آن جا شود پیدا می‌کند." },
        { fn: "vlsm", en: "Sorts the departments from largest to smallest and hands each one the next free block. Starting with the largest keeps the blocks aligned, so no addresses are wasted between them.",
          fa: "بخش‌ها را از بزرگ به کوچک مرتب می‌کند و به هر کدام بلوک آزاد بعدی را می‌دهد. شروع از بزرگ‌ترین باعث می‌شود بلوک‌ها هم‌تراز بمانند و آدرسی بینشان هدر نرود." },
        { fn: "split", en: "Cuts one network into equal smaller subnets, using Python's built-in ipaddress module.",
          fa: "یک شبکه را با ماژول آماده‌ی ipaddress پایتون به زیرشبکه‌های مساوی کوچک‌تر تقسیم می‌کند." }
      ] },
      build: { need: { en: "Python 3 and the lesson on IP addresses. Make subnet_calc.py and import the built-in ipaddress and math modules. Work one example on paper first, so you can check the program against it.",
                       fa: "پایتون ۳ و درس آدرس IP. فایل subnet_calc.py را بساز و ماژول‌های آماده‌ی ipaddress و math را وارد کن. اول یک مثال را روی کاغذ حل کن تا بتوانی جواب برنامه را با آن بسنجی." },
               run: "python3 subnet_calc.py info 192.168.10.0/26\npython3 subnet_calc.py vlsm 172.16.0.0/22 Rooms=300 Reception=120 Cameras=60",
               ideas: { en: ["Add IPv6.", "Draw the plan as a coloured bar showing used and free space.", "Export the plan as a table you can paste into documentation."],
                        fa: ["IPv6 را اضافه کن.", "طرح را به شکل نواری رنگی بکش که فضای استفاده‌شده و آزاد را نشان بدهد.", "طرح را به شکل جدولی خروجی بده که در مستندات قابل استفاده باشد."] } },
      path: "projects/subnet-calculator"
    },
    {
      name: { en: "IT Helpdesk Tracker", fa: "سامانه‌ی ثبت درخواست‌های IT" },
      category: "support", icon: "file",
      tagline: { en: "Log every IT job and show management where the time goes.",
                 fa: "همه‌ی کارهای IT را ثبت کنید و به مدیریت نشان دهید وقت کجا صرف می‌شود." },
      problem: { en: "When you're the only IT person, requests come by phone, in the corridor and on WhatsApp. At the end of the month nobody can say how much was done or which department needs the most help.",
                 fa: "وقتی تنها نیروی IT هستید، درخواست‌ها تلفنی، حضوری و در واتساپ می‌رسند و آخر ماه هیچ‌کس نمی‌داند چه مقدار کار انجام شده یا کدام بخش بیشترین نیاز را دارد." },
      solution: { en: "A lightweight ticket tracker that logs each job by department, area and priority, measures resolution time against targets, and builds monthly reports for management.",
                  fa: "یک سامانه‌ی سبک تیکت که هر کار را بر اساس بخش، حوزه و اولویت ثبت می‌کند، زمان رسیدگی را با هدف مقایسه می‌کند و گزارش ماهانه برای مدیریت می‌سازد." },
      features: {
        en: ["Open, list and close tickets with a resolution note", "12 hotel IT areas (network, Wi-Fi, PCs, printers, cameras, PMS, POS…) and 4 priorities", "Resolution targets per priority and the % met", "Reports by area, department and month, as text or an HTML page", "CSV export for Excel, everything in one SQLite file"],
        fa: ["ثبت، فهرست و بستن تیکت با توضیح راه‌حل", "۱۲ حوزه‌ی IT هتل (شبکه، وای‌فای، کامپیوتر، پرینتر، دوربین، PMS، POS…) و ۴ سطح اولویت", "زمان هدف برای هر اولویت و درصد رسیدن به آن", "گزارش بر اساس حوزه، بخش و ماه، به‌صورت متنی یا صفحه‌ی HTML", "خروجی CSV برای اکسل، همه در یک فایل SQLite"]
      },
      tech: ["Python", "SQLite", "CLI", "HTML reports", "CSV"],
      preview: { image: "projects/helpdesk-tracker/docs/report.png" },
      learn: { en: "How to design simple tables for real work, and how to turn rows into a report with SQL (COUNT, GROUP BY, averages). Try it yourself: the SQL tab of the practice lab has exercises with exactly these commands.",
               fa: "طراحی جدول‌های ساده برای کار واقعی و ساختن گزارش از ردیف‌ها با SQL (COUNT، GROUP BY و میانگین). خودت امتحان کن: زبانه‌ی SQL در آزمایشگاه تمرین دقیقاً با همین دستورها تمرین دارد." },
      code: { file: "helpdesk.py", steps: [
        { fn: "add", en: "Opening a ticket is one INSERT into the database. The area and priority are checked first, so reports stay clean.",
          fa: "ثبت یک تیکت یعنی یک INSERT در پایگاه‌داده. حوزه و اولویت اول بررسی می‌شوند تا گزارش‌ها تمیز بمانند." },
        { fn: "close", en: "Closing a ticket is an UPDATE that stores the time and what fixed it. The condition 'closed IS NULL' stops a ticket being closed twice.",
          fa: "بستن تیکت یک UPDATE است که زمان و راه‌حل را ذخیره می‌کند. شرط closed IS NULL جلوی دوبار بسته‌شدن را می‌گیرد." },
        { fn: "summarize", en: "Builds the monthly report: how many tickets, the average hours to fix, the percentage finished within the target time, and counts per area and department.",
          fa: "گزارش ماهانه را می‌سازد: تعداد تیکت‌ها، میانگین ساعت رسیدگی، درصدی که در زمان هدف تمام شده و شمارش بر اساس حوزه و بخش." }
      ] },
      build: { need: { en: "Python 3; SQLite is already inside it. Make helpdesk.py and begin with the table: one row per ticket, with title, department, area, priority, opened, closed and resolution.",
                       fa: "پایتون ۳؛ SQLite از قبل داخلش هست. فایل helpdesk.py را بساز و با جدول شروع کن: هر تیکت یک ردیف، با عنوان، بخش، حوزه، اولویت، زمان ثبت، زمان بستن و راه‌حل." },
               run: "python3 helpdesk.py add \"Printer offline\" --dept Reception --area printers --priority high\npython3 helpdesk.py list\npython3 helpdesk.py report",
               ideas: { en: ["Add a small web page for opening tickets from a phone.", "Warn when an urgent ticket has been open for more than its target time.", "Chart the busiest hours of the day."],
                        fa: ["یک صفحه‌ی وب کوچک برای ثبت تیکت با گوشی اضافه کن.", "وقتی یک تیکت فوری بیش از زمان هدف باز مانده هشدار بده.", "شلوغ‌ترین ساعت‌های روز را روی نمودار نشان بده."] } },
      path: "projects/helpdesk-tracker"
    }
  ],

  // Articles & books. Only the cover and title show on the home page; the
  // book page and the reader open when someone clicks. `page` in chapters
  // is the PDF page number (not the number printed on the page).
  library: [
    {
      id: "hack-network-security",
      type: "book",
      lang: "fa",
      direction: "rtl", // pages turn right-to-left, like a Persian paper book
      title: { en: "Hacking & Network Security", fa: "هک و امنیت شبکه" },
      subtitle: { en: "The complete practical handbook — from the Linux command line to penetration testing",
                  fa: "کتاب جامع عملی — از خط فرمان لینوکس تا تست نفوذ" },
      description: {
        en: "A command-driven, hands-on guide in Persian: every concept comes with real commands and tool output, from Linux basics and networking to reconnaissance, Nmap, vulnerability assessment, web and wireless security, password attacks and defence. Each chapter ends with a summary, exercises and a cheat sheet. Free to read online.",
        fa: "یک مرجع عملی و فرمان‌محور به فارسی: هر مفهوم با دستورهای واقعی و خروجی ابزارها همراه است؛ از مبانی لینوکس و شبکه تا شناسایی، Nmap، ارزیابی آسیب‌پذیری، امنیت وب و بی‌سیم، حملات پسورد و دفاع. هر فصل با خلاصه، تمرین و چیت‌شیت تمام می‌شود. مطالعه‌ی آنلاین آن رایگان است."
      },
      author: { en: "Sepehr Niaz", fa: "سپهر نیاز" },
      edition: { en: "First edition, 2025", fa: "ویرایش نخست، ۱۴۰۴" },
      language: { en: "Persian", fa: "فارسی" },
      pages: 157,
      cover: "assets/library/hack-network-security-cover.jpg",
      file: "assets/library/hack-network-security.pdf",
      chapters: [
        { title: { en: "Preface & how to use this book", fa: "پیشگفتار و راهنما" }, page: 5 },
        { n: 1, title: { en: "Foundations & ethical hacking", fa: "مبانی و هک اخلاقی" }, page: 9 },
        { n: 2, title: { en: "Linux & the command line", fa: "لینوکس و خط فرمان" }, page: 19 },
        { n: 3, title: { en: "Networks & protocols", fa: "شبکه و پروتکل‌ها" }, page: 34 },
        { n: 4, title: { en: "Reconnaissance", fa: "شناسایی و جمع‌آوری اطلاعات" }, page: 42 },
        { n: 5, title: { en: "Network scanning with Nmap", fa: "اسکن شبکه با Nmap" }, page: 50 },
        { n: 6, title: { en: "Service enumeration", fa: "شمارش سرویس‌ها" }, page: 65 },
        { n: 7, title: { en: "Vulnerability discovery & assessment", fa: "کشف و ارزیابی آسیب‌پذیری" }, page: 74 },
        { n: 8, title: { en: "Sniffing & traffic analysis", fa: "شنود و تحلیل ترافیک" }, page: 81 },
        { n: 9, title: { en: "Exploitation & post-exploitation", fa: "اکسپلویت و پسابهره‌برداری" }, page: 88 },
        { n: 10, title: { en: "Web application security", fa: "امنیت برنامه‌های وب" }, page: 97 },
        { n: 11, title: { en: "Password attacks & hash cracking", fa: "حملات پسورد و کرک هش" }, page: 107 },
        { n: 12, title: { en: "Wireless security", fa: "امنیت شبکه‌ی بی‌سیم" }, page: 114 },
        { n: 13, title: { en: "Scripting for security", fa: "اسکریپت‌نویسی برای امنیت" }, page: 120 },
        { n: 14, title: { en: "Defence, hardening & monitoring", fa: "دفاع، سخت‌سازی و پایش" }, page: 126 },
        { n: 15, title: { en: "Lab, reporting & career path", fa: "آزمایشگاه، گزارش و مسیر شغلی" }, page: 133 },
        { title: { en: "Appendix, glossary & resources", fa: "پیوست، واژه‌نامه و منابع" }, page: 139 },
        { title: { en: "About the author", fa: "درباره‌ی نویسنده" }, page: 150 }
      ]
    },
    {
      id: "hacking-network-security-en",
      type: "book",
      lang: "en",
      direction: "ltr",
      title: { en: "Hacking & Network Security", fa: "هک و امنیت شبکه (انگلیسی)" },
      subtitle: { en: "The complete practical handbook — from the Linux command line to penetration testing",
                  fa: "نسخه‌ی انگلیسی کتاب — از خط فرمان لینوکس تا تست نفوذ" },
      description: {
        en: "The English edition of the handbook: a command-driven, hands-on guide where every concept comes with real commands and tool output, from Linux basics and networking to reconnaissance, Nmap, vulnerability assessment, web and wireless security, password attacks and defence. Each chapter ends with a summary, exercises and a cheat sheet. Free to read online.",
        fa: "نسخه‌ی انگلیسی همین کتاب: یک مرجع عملی و فرمان‌محور که هر مفهوم در آن با دستورهای واقعی و خروجی ابزارها همراه است؛ از مبانی لینوکس و شبکه تا شناسایی، Nmap، ارزیابی آسیب‌پذیری، امنیت وب و بی‌سیم، حملات پسورد و دفاع. مطالعه‌ی آنلاین آن رایگان است."
      },
      author: { en: "Sepehr Niaz", fa: "سپهر نیاز" },
      edition: { en: "First edition, 2025", fa: "ویرایش نخست، ۱۴۰۴" },
      language: { en: "English", fa: "انگلیسی" },
      pages: 152,
      cover: "assets/library/hacking-network-security-en-cover.jpg",
      file: "assets/library/hacking-network-security-en.pdf",
      chapters: [
        { title: { en: "Preface & how to use this book", fa: "پیشگفتار و راهنما" }, page: 4 },
        { n: 1, title: { en: "Foundations & ethical hacking", fa: "مبانی و هک اخلاقی" }, page: 9 },
        { n: 2, title: { en: "Linux & the command line", fa: "لینوکس و خط فرمان" }, page: 19 },
        { n: 3, title: { en: "Networking & protocols", fa: "شبکه و پروتکل‌ها" }, page: 33 },
        { n: 4, title: { en: "Reconnaissance & information gathering", fa: "شناسایی و جمع‌آوری اطلاعات" }, page: 42 },
        { n: 5, title: { en: "Network scanning with Nmap", fa: "اسکن شبکه با Nmap" }, page: 50 },
        { n: 6, title: { en: "Service enumeration", fa: "شمارش سرویس‌ها" }, page: 62 },
        { n: 7, title: { en: "Vulnerability discovery & assessment", fa: "کشف و ارزیابی آسیب‌پذیری" }, page: 71 },
        { n: 8, title: { en: "Sniffing & traffic analysis", fa: "شنود و تحلیل ترافیک" }, page: 77 },
        { n: 9, title: { en: "Exploitation & post-exploitation", fa: "اکسپلویت و پسابهره‌برداری" }, page: 83 },
        { n: 10, title: { en: "Web application security", fa: "امنیت برنامه‌های وب" }, page: 91 },
        { n: 11, title: { en: "Password attacks & hash cracking", fa: "حملات پسورد و کرک هش" }, page: 101 },
        { n: 12, title: { en: "Wireless network security", fa: "امنیت شبکه‌ی بی‌سیم" }, page: 108 },
        { n: 13, title: { en: "Scripting for security", fa: "اسکریپت‌نویسی برای امنیت" }, page: 114 },
        { n: 14, title: { en: "Defense, hardening & monitoring", fa: "دفاع، سخت‌سازی و پایش" }, page: 120 },
        { n: 15, title: { en: "Lab, reporting & career path", fa: "آزمایشگاه، گزارش و مسیر شغلی" }, page: 127 },
        { title: { en: "Appendix, glossary & resources", fa: "پیوست، واژه‌نامه و منابع" }, page: 134 },
        { title: { en: "About the author", fa: "درباره‌ی نویسنده" }, page: 145 }
      ]
    }
  ],

  projects: [
    {
      name: { en: "Rose Hotel Instagram analysis", fa: "تحلیل اینستاگرام هتل رز" },
      description: { en: "A year-long report on the hotel's Instagram views, reach and engagement, with recommendations to turn views into bookings.",
                     fa: "گزارش یک‌ساله از بازدید، دسترسی و تعامل صفحه‌ی اینستاگرام هتل، با پیشنهادهایی برای تبدیل بازدید به رزرو." },
      icon: "chart", link: ""
    },
    {
      name: { en: "IT work report, Rose Hotel", fa: "گزارش کار IT هتل رز" },
      description: { en: "A 10-month report breaking down 179 IT tasks by month and area across the hotel.",
                     fa: "گزارش ده‌ماهه با تفکیک ۱۷۹ کار IT بر اساس ماه و حوزه در سراسر هتل." },
      icon: "file", link: ""
    }
  ]
};
