// ─────────────────────────────────────────────────────────────
//  Teacher mode for the assistant — runs locally like the rest.
//  It explains concepts (glossary), Linux commands, walks through
//  the site's articles step by step, and gives short quizzes, in
//  Persian or English. Add terms, commands and questions below.
// ─────────────────────────────────────────────────────────────
(function (root) {
  "use strict";
  const SB = (root.SepehrBot = root.SepehrBot || {});

  const TRACKS = {
    linux: { fa: "لینوکس", en: "Linux", emoji: "🐧" },
    network: { fa: "شبکه", en: "Networking", emoji: "🌐" },
    security: { fa: "امنیت", en: "Security", emoji: "🛡️" },
    programming: { fa: "برنامه‌نویسی", en: "Programming", emoji: "💻" }
  };

  // [id, track, aliases, English, Persian]
  const TERMS = [
    ["ip", "network", ["ip address", "ip", "آی پی", "آی‌پی", "آیپی", "ادرس ip", "آدرس ip"],
      "An IP address is a device's number on a network, like a house number on a street. IPv4 looks like 192.168.1.10; data is delivered to that address.",
      "آدرس IP شماره‌ی هر دستگاه در شبکه است، مثل پلاک خانه در یک خیابان. نسخه‌ی IPv4 شبیه 192.168.1.10 است و داده‌ها به همین آدرس تحویل داده می‌شوند."],
    ["subnet", "network", ["subnet mask", "subnet", "cidr", "ساب نت", "سابنت", "زیرشبکه", "زیر شبکه"],
      "A subnet is a slice of a network. The mask (or CIDR like /24) says which part of the IP names the network and which part names the device. /24 means 254 usable addresses.",
      "ساب‌نت یک تکه از شبکه است. ماسک (یا CIDR مثل ‎/24) مشخص می‌کند کدام بخشِ IP اسم شبکه است و کدام بخش اسم دستگاه. ‎/24 یعنی ۲۵۴ آدرس قابل استفاده."],
    ["mac", "network", ["mac address", "mac", "مک آدرس", "مک ادرس", "آدرس مک"],
      "A MAC address is the hardware address burned into a network card (like AA:BB:CC:11:22:33). IP addresses can change; the MAC identifies the card itself on the local network.",
      "مک‌آدرس آدرس سخت‌افزاری کارت شبکه است (مثل AA:BB:CC:11:22:33). IP می‌تواند عوض شود، ولی مک خودِ کارت را در شبکه‌ی محلی مشخص می‌کند."],
    ["dns", "network", ["dns", "دی ان اس", "دی‌ان‌اس"],
      "DNS is the internet's phone book: it turns a name like example.com into an IP address your computer can connect to.",
      "DNS دفترچه‌تلفن اینترنت است: اسمی مثل example.com را به آدرس IP تبدیل می‌کند تا کامپیوترت بتواند به آن وصل شود."],
    ["dhcp", "network", ["dhcp", "دی اچ سی پی"],
      "DHCP hands out network settings automatically. When you join Wi-Fi, the DHCP server gives your device an IP address, gateway and DNS.",
      "DHCP تنظیمات شبکه را خودکار پخش می‌کند. وقتی به وای‌فای وصل می‌شوی، سرور DHCP به دستگاهت IP، گیت‌وی و DNS می‌دهد."],
    ["tcp", "network", ["tcp", "تی سی پی"],
      "TCP is the reliable way to send data: it sets up a connection (the three-way handshake), numbers the pieces and resends anything lost. Web pages, email and SSH use it.",
      "TCP روش مطمئنِ فرستادن داده است: اول اتصال برقرار می‌کند (دست‌دادن سه‌مرحله‌ای)، تکه‌ها را شماره می‌زند و هر چه گم شود دوباره می‌فرستد. وب، ایمیل و SSH از آن استفاده می‌کنند."],
    ["udp", "network", ["udp", "یو دی پی"],
      "UDP sends data without setting up a connection or checking delivery. It is faster and lighter than TCP, so it suits video calls, games and DNS.",
      "UDP داده را بدون برقراری اتصال و بدون بررسیِ رسیدن می‌فرستد. از TCP سریع‌تر و سبک‌تر است، پس برای تماس تصویری، بازی و DNS مناسب است."],
    ["port", "network", ["port", "ports", "پورت"],
      "A port is a numbered door on a device. The IP gets data to the right machine; the port gets it to the right program: 80 and 443 for web, 22 for SSH.",
      "پورت یک درِ شماره‌دار روی دستگاه است. IP داده را به دستگاه درست می‌رساند و پورت آن را به برنامه‌ی درست: ۸۰ و ۴۴۳ برای وب، ۲۲ برای SSH."],
    ["router", "network", ["router", "روتر", "مسیریاب"],
      "A router connects networks to each other and chooses the path for each packet. Your home router joins your local network to the internet.",
      "روتر شبکه‌ها را به هم وصل می‌کند و مسیر هر بسته را انتخاب می‌کند. مودم‌روترِ خانه شبکه‌ی داخلی‌ات را به اینترنت وصل می‌کند."],
    ["switch", "network", ["network switch", "switch", "سوییچ", "سوئیچ"],
      "A switch connects devices inside one network and sends each frame only to the port where the destination MAC address lives.",
      "سوییچ دستگاه‌های داخل یک شبکه را به هم وصل می‌کند و هر فریم را فقط به پورتی می‌فرستد که مک‌آدرسِ مقصد پشت آن است."],
    ["gateway", "network", ["default gateway", "gateway", "گیت وی", "گیت‌وی", "دروازه"],
      "The default gateway is the device (usually your router) that your computer hands traffic to when the destination is outside your own network.",
      "گیت‌وی پیش‌فرض دستگاهی است (معمولاً روتر) که کامپیوترت وقتی مقصد بیرون از شبکه‌ی خودش است، ترافیک را به آن می‌سپارد."],
    ["nat", "network", ["nat", "نت"],
      "NAT lets many devices share one public IP address: the router rewrites the private addresses on the way out and remembers who asked for what.",
      "NAT اجازه می‌دهد چند دستگاه با یک IP عمومی به اینترنت بروند: روتر آدرس‌های خصوصی را موقع خروج عوض می‌کند و یادش می‌ماند هر پاسخ مال کدام دستگاه است."],
    ["vpn", "network", ["vpn", "وی پی ان", "وی‌پی‌ان", "فیلترشکن"],
      "A VPN builds an encrypted tunnel between your device and another network, so traffic in between can't be read and you appear to come from that network.",
      "VPN یک تونل رمزشده بین دستگاهت و یک شبکه‌ی دیگر می‌سازد؛ ترافیکِ بین راه خوانده نمی‌شود و انگار از داخل آن شبکه وصل شده‌ای."],
    ["firewall", "security", ["firewall", "فایروال", "دیواره آتش", "دیوار آتش"],
      "A firewall decides which network traffic may pass, using rules about addresses, ports and protocols. A good default is: block everything, then allow only what is needed.",
      "فایروال با قانون‌هایی درباره‌ی آدرس، پورت و پروتکل تصمیم می‌گیرد کدام ترافیک رد شود. پیش‌فرضِ خوب این است: همه چیز بسته، فقط موارد لازم باز."],
    ["http", "network", ["https", "http", "اچ تی تی پی"],
      "HTTP is the language browsers and web servers speak. HTTPS is the same thing inside TLS encryption, so nobody in between can read or change it.",
      "HTTP زبانی است که مرورگر و وب‌سرور با آن حرف می‌زنند. HTTPS همان است داخل رمزنگاری TLS، تا کسی در مسیر نتواند آن را بخواند یا عوض کند."],
    ["osi", "network", ["osi model", "osi", "مدل osi", "هفت لایه", "۷ لایه"],
      "The OSI model splits networking into seven layers, from cables (1) up to applications (7). It helps you say where a problem is: cable, addressing, or the app.",
      "مدل OSI شبکه را به هفت لایه تقسیم می‌کند، از کابل (۱) تا برنامه (۷). کمک می‌کند بگویی مشکل کجاست: کابل، آدرس‌دهی یا خودِ برنامه."],
    ["vlan", "network", ["vlan", "وی لن", "وی‌لن"],
      "A VLAN splits one physical switch into separate logical networks, so for example guests and staff can't see each other's traffic.",
      "VLAN یک سوییچ فیزیکی را به چند شبکه‌ی منطقیِ جدا تقسیم می‌کند؛ مثلاً مهمان‌ها و کارمندها ترافیک هم را نمی‌بینند."],
    ["packet", "network", ["packet", "packets", "پکت", "بسته شبکه", "بسته‌ی شبکه"],
      "A packet is a small piece of data with a header that says where it comes from and where it is going. Big messages are cut into many packets.",
      "پکت یک تکه‌ی کوچک داده است با سرآیندی که می‌گوید از کجا آمده و به کجا می‌رود. پیام‌های بزرگ به بسته‌های زیادی تقسیم می‌شوند."],
    ["ssh", "network", ["ssh", "اس اس اچ"],
      "SSH gives you an encrypted command line on another computer. Use keys instead of passwords where you can, and don't expose it to the internet without need.",
      "SSH یک خط فرمانِ رمزشده روی کامپیوتر دیگر به تو می‌دهد. تا می‌توانی به‌جای رمز از کلید استفاده کن و بی‌دلیل آن را رو به اینترنت باز نگذار."],
    ["cia", "security", ["cia triad", "cia", "مثلث امنیت", "محرمانگی یکپارچگی"],
      "The CIA triad is the three goals of security: Confidentiality (only the right people can read it), Integrity (it isn't changed) and Availability (it's there when needed).",
      "مثلث CIA سه هدف امنیت است: محرمانگی (فقط افراد مجاز بخوانند)، یکپارچگی (تغییر نکند) و دسترس‌پذیری (وقتی لازم است در دسترس باشد)."],
    ["encryption", "security", ["encryption", "encrypt", "رمزنگاری", "رمزگذاری", "رمز نگاری"],
      "Encryption scrambles data so only someone with the key can read it. Symmetric uses one shared key; asymmetric uses a public key to lock and a private key to unlock.",
      "رمزنگاری داده را طوری به‌هم می‌ریزد که فقط دارنده‌ی کلید بتواند بخواند. متقارن یک کلید مشترک دارد؛ نامتقارن با کلید عمومی قفل و با کلید خصوصی باز می‌کند."],
    ["hash", "security", ["hashing", "hash", "هش"],
      "A hash is a fixed-length fingerprint of data. The same input always gives the same hash, and you can't turn it back. Sites store password hashes, not passwords.",
      "هش یک اثرانگشت با طول ثابت از داده است. ورودیِ یکسان همیشه همان هش را می‌دهد و برگشت‌پذیر نیست. سایت‌ها هشِ رمز را نگه می‌دارند، نه خودِ رمز را."],
    ["phishing", "security", ["phishing", "فیشینگ"],
      "Phishing is a fake message or page that tricks you into giving a password or card number. Check the address, don't follow links in urgent messages, and use two-step login.",
      "فیشینگ پیام یا صفحه‌ی جعلی است که تو را فریب می‌دهد تا رمز یا شماره‌ی کارت بدهی. آدرس را چک کن، روی لینکِ پیام‌های عجله‌ای نزن و ورود دومرحله‌ای را روشن کن."],
    ["malware", "security", ["malware", "virus", "بدافزار", "ویروس"],
      "Malware is software written to do harm: viruses, trojans, spyware, ransomware. Keep systems updated, install only from trusted sources and keep backups.",
      "بدافزار نرم‌افزاری است که برای آسیب نوشته شده: ویروس، تروجان، جاسوس‌افزار، باج‌افزار. سیستم را به‌روز نگه دار، فقط از منبع مطمئن نصب کن و پشتیبان داشته باش."],
    ["ransomware", "security", ["ransomware", "باج افزار", "باج‌افزار"],
      "Ransomware encrypts your files and demands money for the key. The real defence is an offline backup you have tested, plus updates and careful email habits.",
      "باج‌افزار فایل‌هایت را رمز می‌کند و برای کلید پول می‌خواهد. دفاع واقعی یک پشتیبانِ آفلاینِ تست‌شده است، به‌علاوه‌ی به‌روزرسانی و دقت در ایمیل."],
    ["mfa", "security", ["two factor", "2fa", "mfa", "دو مرحله ای", "دومرحله‌ای", "دو عاملی", "تایید دو مرحله"],
      "Two-factor login asks for something you know (password) plus something you have (a code or key). A stolen password alone is then not enough.",
      "ورود دومرحله‌ای علاوه بر چیزی که می‌دانی (رمز)، چیزی که داری (کد یا کلید) را هم می‌خواهد. پس رمزِ دزدیده‌شده به‌تنهایی کافی نیست."],
    ["vulnerability", "security", ["vulnerability", "cve", "آسیب پذیری", "آسیب‌پذیری"],
      "A vulnerability is a weakness that could be misused. Known ones get a CVE number and a severity score (CVSS); patching removes them.",
      "آسیب‌پذیری ضعفی است که می‌شود از آن سوءاستفاده کرد. موارد شناخته‌شده شماره‌ی CVE و امتیاز شدت (CVSS) می‌گیرند و با وصله‌کردن برطرف می‌شوند."],
    ["pentest", "security", ["penetration test", "pentest", "ethical hacking", "تست نفوذ", "هک اخلاقی"],
      "A penetration test is an authorised attack on a system to find weaknesses before criminals do. Written permission and a clear scope come first, always.",
      "تست نفوذ یک حمله‌ی مجاز به سیستم است تا ضعف‌ها قبل از مجرمان پیدا شوند. اجازه‌نامه‌ی کتبی و محدوده‌ی مشخص همیشه قدم اول است."],
    ["social", "security", ["social engineering", "مهندسی اجتماعی"],
      "Social engineering attacks people instead of machines: a phone call 'from IT', a tempting USB stick. Verify requests through a second channel before acting.",
      "مهندسی اجتماعی به‌جای دستگاه به آدم‌ها حمله می‌کند: تماسی «از طرف IT» یا یک فلشِ وسوسه‌انگیز. قبل از هر کاری درخواست را از راه دیگری تأیید کن."],
    ["bruteforce", "security", ["brute force", "بروت فورس", "جستجوی فراگیر", "حدس زدن رمز"],
      "Brute force means trying passwords one after another. Long unique passwords, lockouts after failed tries and two-factor login make it useless.",
      "بروت‌فورس یعنی امتحان‌کردنِ پشت‌سرهمِ رمزها. رمز طولانی و یکتا، قفل‌شدن بعد از چند تلاش ناموفق و ورود دومرحله‌ای آن را بی‌اثر می‌کند."],
    ["sqli", "security", ["sql injection", "sqli", "تزریق sql", "اس کیو ال اینجکشن"],
      "SQL injection happens when user input is glued into a database query, so the input can change the query. The fix is parameterised queries, never string concatenation.",
      "تزریق SQL وقتی رخ می‌دهد که ورودی کاربر مستقیم داخل پرس‌وجوی پایگاه‌داده چسبانده شود و بتواند آن را عوض کند. راه‌حل پرس‌وجوی پارامتری است، نه چسباندن رشته‌ها."],
    ["xss", "security", ["cross site scripting", "xss", "ایکس اس اس"],
      "XSS is when a site shows user input without escaping it, so someone else's script runs in visitors' browsers. Escape output and use a Content Security Policy.",
      "XSS وقتی است که سایت ورودی کاربر را بدون پاک‌سازی نشان می‌دهد و اسکریپتِ یک نفر دیگر در مرورگر بازدیدکننده اجرا می‌شود. خروجی را escape کن و CSP بگذار."],
    ["ddos", "security", ["ddos", "dos attack", "دی داس", "دیداس", "منع سرویس"],
      "A DDoS attack floods a service with traffic from many machines until real users can't get in. Defences are filtering upstream, rate limits and spare capacity.",
      "حمله‌ی DDoS یک سرویس را با ترافیکِ دستگاه‌های زیاد غرق می‌کند تا کاربران واقعی نتوانند وارد شوند. دفاع: فیلتر در بالادست، محدودیت نرخ و ظرفیت اضافه."],
    ["backup", "security", ["backup", "بکاپ", "پشتیبان گیری", "پشتیبان‌گیری", "نسخه پشتیبان"],
      "A backup is a second copy kept somewhere else. The 3-2-1 rule: three copies, on two kinds of storage, one off-site. A backup you haven't restored once is only a hope.",
      "پشتیبان یک نسخه‌ی دوم در جای دیگر است. قانون ۳-۲-۱: سه نسخه، روی دو نوع حافظه، یکی بیرون از محل. پشتیبانی که یک بار بازیابی‌اش نکرده‌ای فقط یک امید است."],
    ["leastprivilege", "security", ["least privilege", "کمترین دسترسی", "حداقل دسترسی"],
      "Least privilege means every user and program gets only the access it needs, nothing more. A hacked account can then damage far less.",
      "اصل کمترین دسترسی یعنی هر کاربر و برنامه فقط همان دسترسیِ لازم را داشته باشد، نه بیشتر. این‌طوری حسابِ هک‌شده آسیب خیلی کمتری می‌زند."],
    ["kernel", "linux", ["kernel", "کرنل", "هسته لینوکس", "هسته‌ی لینوکس"],
      "The kernel is the core of the operating system. It talks to the hardware and shares the CPU, memory and disks between programs. 'Linux' is strictly the kernel's name.",
      "کرنل هسته‌ی سیستم‌عامل است. با سخت‌افزار حرف می‌زند و پردازنده، حافظه و دیسک را بین برنامه‌ها تقسیم می‌کند. «لینوکس» در اصل اسم همین هسته است."],
    ["shell", "linux", ["shell", "bash", "terminal", "شل", "بش", "ترمینال", "خط فرمان"],
      "The shell is the program that reads the commands you type and runs them; Bash is the most common one. The terminal is the window you type them in.",
      "شل برنامه‌ای است که دستورهایی را که تایپ می‌کنی می‌خواند و اجرا می‌کند؛ Bash رایج‌ترینش است. ترمینال پنجره‌ای است که در آن تایپ می‌کنی."],
    ["root", "linux", ["root user", "root", "superuser", "روت", "کاربر ریشه"],
      "root is the administrator account on Linux: it can do anything, including break the system. Work as a normal user and use sudo for the single command that needs it.",
      "root حساب مدیر در لینوکس است: هر کاری می‌تواند بکند، حتی خراب‌کردن سیستم. با کاربر عادی کار کن و فقط برای همان دستوری که لازم است sudo بزن."],
    ["permissions", "linux", ["file permissions", "permissions", "permission", "rwx", "مجوز", "مجوزها", "سطح دسترسی", "پرمیشن"],
      "Every file has permissions for three groups: owner, group and others. Each can read (r), write (w) or execute (x). 'rwxr-xr--' means owner all, group read+run, others read only.",
      "هر فایل برای سه گروه مجوز دارد: مالک، گروه و بقیه. هر کدام می‌توانند بخوانند (r)، بنویسند (w) یا اجرا کنند (x). «rwxr-xr--» یعنی مالک همه، گروه خواندن و اجرا، بقیه فقط خواندن."],
    ["distro", "linux", ["distribution", "distro", "ubuntu", "kali", "debian", "توزیع", "اوبونتو", "کالی"],
      "A distribution is the Linux kernel packaged with tools and an installer. Ubuntu is friendly for beginners, Debian is stable for servers, Kali is for security testing.",
      "توزیع یعنی هسته‌ی لینوکس همراه با ابزارها و نصب‌کننده. اوبونتو برای شروع راحت است، دبیان برای سرور پایدار است و کالی برای تست امنیت."],
    ["package", "linux", ["package manager", "package", "repository", "پکیج", "بسته نرم افزار", "مدیر بسته", "مخزن"],
      "A package manager installs and updates software from trusted repositories. On Ubuntu and Debian it is apt: 'sudo apt update' refreshes the list, 'sudo apt install name' installs.",
      "مدیر بسته نرم‌افزار را از مخزن‌های مطمئن نصب و به‌روز می‌کند. در اوبونتو و دبیان apt است: «sudo apt update» فهرست را تازه می‌کند و «sudo apt install name» نصب می‌کند."],
    ["process", "linux", ["process", "pid", "پروسه", "پردازه", "فرایند"],
      "A process is a running program. Each has a number (PID). 'ps aux' lists them, 'top' shows them live and 'kill PID' asks one to stop.",
      "پردازه یک برنامه‌ی در حال اجراست. هر کدام یک شماره (PID) دارد. «ps aux» فهرستشان می‌کند، «top» زنده نشانشان می‌دهد و «kill PID» از یکی می‌خواهد متوقف شود."],
    ["pipe", "linux", ["pipeline", "pipe", "پایپ", "لوله"],
      "A pipe ( | ) sends the output of one command into the next. 'cat log.txt | grep error | wc -l' counts the error lines: small tools joined into one job.",
      "پایپ ( | ) خروجیِ یک دستور را به دستور بعدی می‌دهد. «cat log.txt | grep error | wc -l» خط‌های خطا را می‌شمارد: چند ابزار کوچک برای یک کار."],
    ["variable", "programming", ["variable", "variables", "متغیر"],
      "A variable is a named box that holds a value: age = 23. You can read it, change it and use it in calculations. Good names make code readable.",
      "متغیر یک جعبه‌ی اسم‌دار است که یک مقدار را نگه می‌دارد: age = 23. می‌توانی آن را بخوانی، عوض کنی و در محاسبه به کار ببری. اسمِ خوب کد را خوانا می‌کند."],
    ["function", "programming", ["function", "functions", "تابع", "فانکشن"],
      "A function is a named piece of code you can run again and again. It takes inputs (parameters), does one job and can return a result.",
      "تابع یک تکه کدِ اسم‌دار است که بارها می‌توانی اجرایش کنی. ورودی (پارامتر) می‌گیرد، یک کار انجام می‌دهد و می‌تواند نتیجه برگرداند."],
    ["loop", "programming", ["loop", "loops", "for loop", "while loop", "حلقه"],
      "A loop repeats code. 'for' walks through a list item by item; 'while' repeats as long as a condition is true. Make sure a while loop can end.",
      "حلقه یک کد را تکرار می‌کند. «for» یکی‌یکی روی اعضای یک فهرست می‌رود و «while» تا وقتی شرط درست است تکرار می‌کند. حواست باشد while بتواند تمام شود."],
    ["condition", "programming", ["if statement", "condition", "conditional", "شرط", "دستور if"],
      "A condition lets code choose: if something is true do this, else do that. It is how programs react to different inputs.",
      "شرط به کد قدرت انتخاب می‌دهد: اگر چیزی درست بود این کار، وگرنه آن کار. برنامه‌ها این‌طوری به ورودی‌های مختلف واکنش نشان می‌دهند."],
    ["list", "programming", ["array", "list", "آرایه", "لیست", "فهرست پایتون"],
      "A list (array) keeps several values in order under one name: ports = [22, 80, 443]. You reach items by position, starting at 0.",
      "لیست (آرایه) چند مقدار را به‌ترتیب زیر یک اسم نگه می‌دارد: ports = [22, 80, 443]. با شماره‌ی جایگاه به هر عضو می‌رسی و شمارش از ۰ شروع می‌شود."],
    ["python", "programming", ["python", "پایتون"],
      "Python is a programming language that reads almost like English. It is the usual first choice for automation, data work and security tools.",
      "پایتون یک زبان برنامه‌نویسی است که تقریباً مثل انگلیسی خوانده می‌شود. برای خودکارسازی، کار با داده و ابزارهای امنیتی معمولاً انتخاب اول است."],
    ["javascript", "programming", ["javascript", "js", "جاوااسکریپت", "جاوا اسکریپت"],
      "JavaScript is the language that runs inside web pages and makes them react: buttons, forms, live updates. With Node.js it also runs on servers.",
      "جاوااسکریپت زبانی است که داخل صفحه‌های وب اجرا می‌شود و آن‌ها را زنده می‌کند: دکمه، فرم، به‌روزرسانی زنده. با Node.js روی سرور هم اجرا می‌شود."],
    ["api", "programming", ["api", "ای پی آی", "ای‌پی‌آی"],
      "An API is an agreed way for programs to ask each other for things, like a menu in a restaurant: you order by the menu and don't need to see the kitchen.",
      "API یک قراردادِ مشخص است تا برنامه‌ها از هم چیزی بخواهند، مثل منوی رستوران: از روی منو سفارش می‌دهی و لازم نیست آشپزخانه را ببینی."],
    ["git", "programming", ["git", "github", "گیت", "گیت هاب", "گیت‌هاب"],
      "Git records every version of your files, so you can go back, compare and work with others. GitHub is a website that hosts Git projects.",
      "گیت همه‌ی نسخه‌های فایل‌هایت را ثبت می‌کند تا بتوانی برگردی، مقایسه کنی و با دیگران کار کنی. گیت‌هاب سایتی است که پروژه‌های گیت را نگه می‌دارد."],
    ["bug", "programming", ["debugging", "debug", "bug", "باگ", "دیباگ", "اشکال زدایی"],
      "A bug is a mistake that makes a program behave wrongly. Debugging is finding it: reproduce it, read the error message, change one thing at a time.",
      "باگ اشتباهی است که باعث می‌شود برنامه غلط رفتار کند. دیباگ یعنی پیداکردنش: خطا را تکرار کن، پیام خطا را بخوان و هر بار فقط یک چیز را عوض کن."]
  ];

  // [command, track, English, Persian, example]
  const COMMANDS = [
    ["ls", "linux", "lists the files in a folder. -l shows details, -a shows hidden files.", "فایل‌های یک پوشه را فهرست می‌کند. ‎-l جزئیات و ‎-a فایل‌های مخفی را نشان می‌دهد.", "ls -la"],
    ["cd", "linux", "changes the folder you are in. 'cd ..' goes up one level, 'cd' alone goes home.", "پوشه‌ای را که در آن هستی عوض می‌کند. «cd ..» یک پله بالا می‌رود و «cd» خالی به پوشه‌ی خانه.", "cd /var/log"],
    ["pwd", "linux", "prints the folder you are in right now.", "پوشه‌ای را که الان در آن هستی نشان می‌دهد.", "pwd"],
    ["cat", "linux", "prints a file's contents on the screen.", "محتوای یک فایل را روی صفحه نشان می‌دهد.", "cat /etc/hostname"],
    ["cp", "linux", "copies a file. -r copies a whole folder.", "یک فایل را کپی می‌کند. ‎-r یک پوشه را کامل کپی می‌کند.", "cp notes.txt backup.txt"],
    ["mv", "linux", "moves a file, or renames it.", "یک فایل را جابه‌جا می‌کند یا اسمش را عوض می‌کند.", "mv old.txt new.txt"],
    ["rm", "linux", "deletes a file for good; there is no recycle bin. -r deletes a folder. Read the path twice.", "یک فایل را برای همیشه پاک می‌کند؛ سطل زباله ندارد. ‎-r پوشه را پاک می‌کند. مسیر را دو بار بخوان.", "rm notes.txt"],
    ["mkdir", "linux", "makes a new folder. -p also makes the folders in between.", "یک پوشه‌ی جدید می‌سازد. ‎-p پوشه‌های میانی را هم می‌سازد.", "mkdir -p projects/lab"],
    ["touch", "linux", "makes an empty file, or updates a file's time.", "یک فایل خالی می‌سازد یا زمانِ یک فایل را به‌روز می‌کند.", "touch notes.txt"],
    ["grep", "linux", "finds the lines that contain a word. -i ignores case, -r searches folders.", "خط‌هایی را که یک کلمه در آن‌هاست پیدا می‌کند. ‎-i به بزرگی و کوچکی حروف کاری ندارد و ‎-r داخل پوشه‌ها می‌گردد.", "grep -i error /var/log/syslog"],
    ["find", "linux", "searches for files by name, size or date.", "فایل‌ها را بر اساس اسم، اندازه یا تاریخ پیدا می‌کند.", "find . -name \"*.log\""],
    ["chmod", "linux", "changes a file's permissions. 755 means owner everything, others read and run.", "مجوزهای یک فایل را عوض می‌کند. 755 یعنی مالک همه چیز، بقیه خواندن و اجرا.", "chmod +x script.sh"],
    ["chown", "linux", "changes who owns a file.", "مالکِ یک فایل را عوض می‌کند.", "sudo chown ali:ali file.txt"],
    ["sudo", "linux", "runs one command as the administrator. It asks for your password and logs what you did.", "یک دستور را با دسترسی مدیر اجرا می‌کند. رمزت را می‌پرسد و کاری که کردی ثبت می‌شود.", "sudo apt update"],
    ["apt", "linux", "installs, updates and removes software on Ubuntu and Debian.", "در اوبونتو و دبیان نرم‌افزار نصب، به‌روز و حذف می‌کند.", "sudo apt install htop"],
    ["ps", "linux", "lists running programs.", "برنامه‌های در حال اجرا را فهرست می‌کند.", "ps aux"],
    ["top", "linux", "shows running programs live, with CPU and memory use. Press q to quit.", "برنامه‌های در حال اجرا را زنده نشان می‌دهد، با مصرف پردازنده و حافظه. با q خارج شو.", "top"],
    ["kill", "linux", "asks a program to stop, by its PID. -9 forces it.", "با شماره‌ی PID از یک برنامه می‌خواهد متوقف شود. ‎-9 به‌زور می‌بندد.", "kill 1234"],
    ["ping", "network", "checks whether a host answers and how long the reply takes.", "بررسی می‌کند یک دستگاه جواب می‌دهد یا نه و جواب چقدر طول می‌کشد.", "ping -c 4 8.8.8.8"],
    ["ip", "network", "shows and changes network settings. 'ip a' lists your addresses, 'ip route' the routes.", "تنظیمات شبکه را نشان می‌دهد و عوض می‌کند. «ip a» آدرس‌ها و «ip route» مسیرها را نشان می‌دهد.", "ip a"],
    ["ssh", "network", "opens an encrypted command line on another computer.", "یک خط فرمانِ رمزشده روی کامپیوتر دیگر باز می‌کند.", "ssh user@192.168.1.10"],
    ["scp", "network", "copies files to or from another computer over SSH.", "فایل‌ها را از راه SSH به کامپیوتر دیگر می‌فرستد یا از آن می‌گیرد.", "scp report.pdf user@host:/tmp/"],
    ["curl", "network", "fetches a URL from the command line; handy for testing websites and APIs.", "یک آدرس وب را از خط فرمان می‌گیرد؛ برای تست سایت و API خیلی به‌کار می‌آید.", "curl -I https://example.com"],
    ["wget", "network", "downloads a file from the web.", "یک فایل را از وب دانلود می‌کند.", "wget https://example.com/file.zip"],
    ["tar", "linux", "packs folders into one archive and unpacks them. c = create, x = extract, z = gzip.", "پوشه‌ها را در یک فایل بسته‌بندی و باز می‌کند. c = ساختن، x = بازکردن، z = فشرده‌سازی.", "tar -czf backup.tar.gz myfolder/"],
    ["nano", "linux", "a simple text editor in the terminal. Ctrl+O saves, Ctrl+X exits.", "یک ویرایشگر متن ساده در ترمینال. Ctrl+O ذخیره و Ctrl+X خروج.", "nano notes.txt"],
    ["man", "linux", "opens the manual for a command. Press q to quit.", "راهنمای یک دستور را باز می‌کند. با q خارج شو.", "man ls"],
    ["echo", "linux", "prints text. With > it writes that text into a file.", "متن چاپ می‌کند. با > همان متن را داخل فایل می‌نویسد.", "echo \"hello\" > hi.txt"],
    ["head", "linux", "shows the first lines of a file.", "خط‌های اول یک فایل را نشان می‌دهد.", "head -n 5 file.txt"],
    ["tail", "linux", "shows the last lines of a file. -f keeps following new lines, good for logs.", "خط‌های آخر یک فایل را نشان می‌دهد. ‎-f خط‌های تازه را دنبال می‌کند؛ برای لاگ عالی است.", "tail -f /var/log/syslog"],
    ["df", "linux", "shows how full each disk is.", "نشان می‌دهد هر دیسک چقدر پر است.", "df -h"],
    ["du", "linux", "shows how much space a folder uses.", "نشان می‌دهد یک پوشه چقدر فضا گرفته است.", "du -sh ~/Downloads"],
    ["whoami", "linux", "prints the user you are logged in as.", "نشان می‌دهد با کدام کاربر وارد شده‌ای.", "whoami"],
    ["history", "linux", "lists the commands you ran before.", "دستورهایی را که قبلاً زده‌ای فهرست می‌کند.", "history | tail"],
    ["nmap", "security", "scans a network to see which hosts are up and which ports are open. Only scan networks you own or have written permission to test.", "شبکه را اسکن می‌کند تا ببیند کدام دستگاه‌ها روشن و کدام پورت‌ها بازند. فقط شبکه‌ای را اسکن کن که مال خودت است یا اجازه‌ی کتبی داری.", "nmap -sn 192.168.1.0/24"]
  ];

  // { track, q:{en,fa}, options:{en:[],fa:[]}, answer, why:{en,fa} }
  const QUIZ = [
    { t: "linux", q: { en: "Which command shows the folder you are in?", fa: "کدام دستور پوشه‌ای را که در آن هستی نشان می‌دهد؟" }, o: ["ls", "pwd", "cd", "whoami"], a: 1, w: { en: "pwd means 'print working directory'.", fa: "pwd یعنی «پوشه‌ی کاری را چاپ کن»." } },
    { t: "linux", q: { en: "What does 'chmod +x script.sh' do?", fa: "دستور «chmod +x script.sh» چه می‌کند؟" }, o: { en: ["Deletes the file", "Makes it executable", "Renames it", "Shows its contents"], fa: ["فایل را پاک می‌کند", "آن را اجرایی می‌کند", "اسمش را عوض می‌کند", "محتوایش را نشان می‌دهد"] }, a: 1, w: { en: "+x adds the execute permission.", fa: "‎+x مجوز اجرا را اضافه می‌کند." } },
    { t: "linux", q: { en: "Which command finds lines containing a word in a file?", fa: "کدام دستور خط‌هایی را که یک کلمه در آن‌هاست پیدا می‌کند؟" }, o: ["grep", "find", "cat", "tail"], a: 0, w: { en: "grep searches inside files; find searches for files.", fa: "grep داخل فایل‌ها را می‌گردد؛ find دنبال خودِ فایل‌ها می‌گردد." } },
    { t: "linux", q: { en: "In 'rwxr-xr--', what can 'others' do?", fa: "در «rwxr-xr--»، «بقیه» چه کاری می‌توانند بکنند؟" }, o: { en: ["Everything", "Read and run", "Read only", "Nothing"], fa: ["همه کار", "خواندن و اجرا", "فقط خواندن", "هیچ"] }, a: 2, w: { en: "The last three characters, r--, are for others: read only.", fa: "سه حرف آخر، ‎r--‎، برای بقیه است: فقط خواندن." } },
    { t: "linux", q: { en: "What does the pipe ( | ) do?", fa: "پایپ ( | ) چه کاری می‌کند؟" }, o: { en: ["Runs two commands at once", "Sends one command's output into the next", "Saves output to a file", "Stops a command"], fa: ["دو دستور را هم‌زمان اجرا می‌کند", "خروجی یک دستور را به بعدی می‌دهد", "خروجی را در فایل ذخیره می‌کند", "یک دستور را متوقف می‌کند"] }, a: 1, w: { en: "A pipe connects the output of the left command to the input of the right one.", fa: "پایپ خروجیِ دستور چپ را به ورودیِ دستور راست وصل می‌کند." } },
    { t: "linux", q: { en: "Why should you avoid working as root all day?", fa: "چرا نباید تمام روز با کاربر root کار کنی؟" }, o: { en: ["It is slower", "A single mistake can break the whole system", "root can't use the internet", "It costs money"], fa: ["کندتر است", "یک اشتباه می‌تواند کل سیستم را خراب کند", "root نمی‌تواند به اینترنت وصل شود", "هزینه دارد"] }, a: 1, w: { en: "root has no safety net; use sudo only for the command that needs it.", fa: "root هیچ محافظی ندارد؛ فقط برای دستوری که لازم است sudo بزن." } },
    { t: "network", q: { en: "What does DNS do?", fa: "DNS چه کاری می‌کند؟" }, o: { en: ["Encrypts traffic", "Turns names into IP addresses", "Gives devices IP addresses", "Blocks attacks"], fa: ["ترافیک را رمز می‌کند", "اسم‌ها را به آدرس IP تبدیل می‌کند", "به دستگاه‌ها IP می‌دهد", "حمله‌ها را می‌بندد"] }, a: 1, w: { en: "DNS is the phone book; DHCP is the one that hands out addresses.", fa: "DNS دفترچه‌تلفن است؛ کسی که آدرس پخش می‌کند DHCP است." } },
    { t: "network", q: { en: "Which port does HTTPS use by default?", fa: "HTTPS به‌طور پیش‌فرض از کدام پورت استفاده می‌کند؟" }, o: ["22", "80", "443", "53"], a: 2, w: { en: "443 is HTTPS, 80 is HTTP, 22 is SSH and 53 is DNS.", fa: "۴۴۳ برای HTTPS، ۸۰ برای HTTP، ۲۲ برای SSH و ۵۳ برای DNS است." } },
    { t: "network", q: { en: "How many usable addresses does a /24 network have?", fa: "یک شبکه‌ی ‎/24 چند آدرس قابل استفاده دارد؟" }, o: ["24", "254", "256", "1024"], a: 1, w: { en: "256 addresses minus the network and broadcast addresses = 254.", fa: "۲۵۶ آدرس، منهای آدرس شبکه و آدرس همه‌پخشی = ۲۵۴." } },
    { t: "network", q: { en: "Which protocol resends lost data?", fa: "کدام پروتکل داده‌ی گم‌شده را دوباره می‌فرستد؟" }, o: ["UDP", "TCP", "ICMP", "ARP"], a: 1, w: { en: "TCP is reliable; UDP is fast but does not check delivery.", fa: "TCP مطمئن است؛ UDP سریع است ولی رسیدن را بررسی نمی‌کند." } },
    { t: "network", q: { en: "What is the default gateway?", fa: "گیت‌وی پیش‌فرض چیست؟" }, o: { en: ["The DNS server", "The device traffic is handed to for other networks", "The fastest computer", "A kind of cable"], fa: ["سرور DNS", "دستگاهی که ترافیکِ شبکه‌های دیگر به آن سپرده می‌شود", "سریع‌ترین کامپیوتر", "یک نوع کابل"] }, a: 1, w: { en: "Usually it is your router.", fa: "معمولاً همان روتر است." } },
    { t: "network", q: { en: "What does a switch use to decide where to send a frame?", fa: "سوییچ برای تصمیم‌گیری درباره‌ی مقصد یک فریم از چه چیزی استفاده می‌کند؟" }, o: { en: ["IP address", "MAC address", "Port number", "Domain name"], fa: ["آدرس IP", "مک‌آدرس", "شماره‌ی پورت", "نام دامنه"] }, a: 1, w: { en: "Switches work with MAC addresses; routers work with IP addresses.", fa: "سوییچ با مک‌آدرس کار می‌کند و روتر با آدرس IP." } },
    { t: "security", q: { en: "What are the three goals in the CIA triad?", fa: "سه هدفِ مثلث CIA چیست؟" }, o: { en: ["Control, Inspection, Access", "Confidentiality, Integrity, Availability", "Code, Internet, Antivirus", "Cipher, Identity, Audit"], fa: ["کنترل، بازرسی، دسترسی", "محرمانگی، یکپارچگی، دسترس‌پذیری", "کد، اینترنت، آنتی‌ویروس", "رمز، هویت، ممیزی"] }, a: 1, w: { en: "Every attack hurts at least one of these three.", fa: "هر حمله دست‌کم یکی از این سه را هدف می‌گیرد." } },
    { t: "security", q: { en: "What is the best protection against ransomware?", fa: "بهترین محافظت در برابر باج‌افزار چیست؟" }, o: { en: ["A bigger screen", "A tested offline backup", "Paying quickly", "Turning off Wi-Fi at night"], fa: ["مانیتور بزرگ‌تر", "پشتیبانِ آفلاینِ تست‌شده", "پرداخت سریع", "خاموش‌کردن وای‌فای در شب"] }, a: 1, w: { en: "With a good backup you restore instead of paying.", fa: "با پشتیبانِ خوب به‌جای پرداخت، بازیابی می‌کنی." } },
    { t: "security", q: { en: "What must you have before a penetration test?", fa: "قبل از تست نفوذ چه چیزی باید داشته باشی؟" }, o: { en: ["A fast laptop", "Written permission and a clear scope", "A VPN", "Kali Linux"], fa: ["لپ‌تاپ سریع", "اجازه‌نامه‌ی کتبی و محدوده‌ی مشخص", "VPN", "کالی لینوکس"] }, a: 1, w: { en: "Without permission it is not a test, it is a crime.", fa: "بدون اجازه، تست نیست؛ جرم است." } },
    { t: "security", q: { en: "Why do sites store password hashes instead of passwords?", fa: "چرا سایت‌ها به‌جای رمز، هشِ آن را نگه می‌دارند؟" }, o: { en: ["Hashes are shorter", "A hash can't be turned back into the password", "It is required by browsers", "Hashes load faster"], fa: ["هش کوتاه‌تر است", "هش به رمز برگردانده نمی‌شود", "مرورگرها آن را می‌خواهند", "هش سریع‌تر بارگذاری می‌شود"] }, a: 1, w: { en: "If the database leaks, the passwords themselves are not in it.", fa: "اگر پایگاه‌داده لو برود، خودِ رمزها در آن نیست." } },
    { t: "security", q: { en: "A message says 'your account closes in 1 hour, click here'. What is it most likely?", fa: "پیامی می‌گوید «حسابت تا یک ساعت دیگر بسته می‌شود، اینجا کلیک کن». به احتمال زیاد چیست؟" }, o: { en: ["A system update", "Phishing", "A backup reminder", "A DNS error"], fa: ["به‌روزرسانی سیستم", "فیشینگ", "یادآور پشتیبان‌گیری", "خطای DNS"] }, a: 1, w: { en: "Urgency plus a link is the classic phishing pattern.", fa: "عجله به‌علاوه‌ی لینک، الگوی همیشگیِ فیشینگ است." } },
    { t: "security", q: { en: "What does 'least privilege' mean?", fa: "«کمترین دسترسی» یعنی چه؟" }, o: { en: ["Nobody gets access", "Everyone is an administrator", "Each user gets only the access they need", "Passwords are short"], fa: ["هیچ‌کس دسترسی ندارد", "همه مدیر هستند", "هر کاربر فقط دسترسیِ لازم را دارد", "رمزها کوتاه‌اند"] }, a: 2, w: { en: "Less access means less damage if an account is taken over.", fa: "دسترسی کمتر یعنی آسیب کمتر اگر حسابی به دست دیگران بیفتد." } },
    { t: "programming", q: { en: "In Python, what does len([22, 80, 443]) return?", fa: "در پایتون، len([22, 80, 443])‎ چه چیزی برمی‌گرداند؟" }, o: ["2", "3", "443", "545"], a: 1, w: { en: "len counts the items: three.", fa: "len تعداد اعضا را می‌شمارد: سه." } },
    { t: "programming", q: { en: "What is the position (index) of the first item in a list?", fa: "شماره‌ی جایگاه (index) اولین عضو یک لیست چند است؟" }, o: ["0", "1", "-1", "first"], a: 0, w: { en: "Counting starts at 0 in most languages.", fa: "در بیشتر زبان‌ها شمارش از ۰ شروع می‌شود." } },
    { t: "programming", q: { en: "Which loop is right for 'do this for every item in a list'?", fa: "برای «این کار را برای هر عضو لیست انجام بده» کدام حلقه مناسب است؟" }, o: ["for", "while True", "if", "def"], a: 0, w: { en: "for walks through the items one by one.", fa: "for یکی‌یکی روی اعضا می‌رود." } },
    { t: "programming", q: { en: "What is a function for?", fa: "تابع برای چیست؟" }, o: { en: ["Storing one number", "Reusing a piece of code by name", "Making the screen brighter", "Connecting to Wi-Fi"], fa: ["نگه‌داشتن یک عدد", "استفاده‌ی دوباره از یک تکه کد با اسمش", "روشن‌ترکردن صفحه", "وصل‌شدن به وای‌فای"] }, a: 1, w: { en: "Write it once, call it whenever you need it.", fa: "یک بار می‌نویسی و هر وقت لازم شد صدایش می‌زنی." } },
    { t: "programming", q: { en: "What should the first line of a Bash script be?", fa: "خط اول یک اسکریپت Bash چه باید باشد؟" }, o: ["#!/bin/bash", "import bash", "<script>", "run bash"], a: 0, w: { en: "The shebang tells the system which program runs the file.", fa: "این خط (shebang) به سیستم می‌گوید کدام برنامه فایل را اجرا کند." } },
    { t: "programming", q: { en: "Your program crashes with an error message. What is the best first step?", fa: "برنامه‌ات با یک پیام خطا متوقف می‌شود. بهترین قدم اول چیست؟" }, o: { en: ["Rewrite everything", "Read the error message carefully", "Restart the computer", "Delete the file"], fa: ["همه را از نو بنویس", "پیام خطا را با دقت بخوان", "کامپیوتر را ری‌استارت کن", "فایل را پاک کن"] }, a: 1, w: { en: "The message usually names the line and the reason.", fa: "پیام خطا معمولاً خط و دلیل را می‌گوید." } }
  ];

  const P = {
    menu: { en: "🎓 I can teach you. What would you like to do?", fa: "🎓 می‌توانم به تو آموزش بدهم. چه کاری انجام بدهیم؟" },
    menuHint: { en: "You can also just ask: “what is DNS?”, “what does grep do?”, or “quiz me on Linux”.", fa: "می‌توانی مستقیم هم بپرسی: «DNS چیه؟»، «دستور grep چیکار می‌کنه؟» یا «از لینوکس آزمون بگیر»." },
    lessons: { en: "📚 Step-by-step lesson", fa: "📚 درس گام‌به‌گام" }, quiz: { en: "📝 Quiz me", fa: "📝 آزمون بگیر" },
    terms: { en: "💡 Explain a term", fa: "💡 یک مفهوم را توضیح بده" }, request: { en: "💼 I have a request for Sepehr", fa: "💼 برای سپهر درخواست دارم" },
    pickTrack: { en: "Which topic?", fa: "کدام موضوع؟" }, pickLesson: { en: "Pick a lesson:", fa: "یک درس انتخاب کن:" },
    noLessons: { en: "Lessons for this topic are on the site's Articles section. Meanwhile I can explain terms or quiz you.", fa: "درس‌های این موضوع در بخش مقاله‌های سایت است. فعلاً می‌توانم مفاهیم را توضیح بدهم یا آزمون بگیرم." },
    next: { en: "▶ Continue", fa: "▶ ادامه" }, full: { en: "📖 Open the full article", fa: "📖 بازکردن مقاله‌ی کامل" },
    lessonDone: { en: "✅ That's the end of this lesson. Well done!", fa: "✅ این درس تمام شد. آفرین!" },
    quizOn: { en: "📝 Quiz on this topic", fa: "📝 آزمونِ این موضوع" }, other: { en: "🧭 Another topic", fa: "🧭 موضوع دیگر" },
    step: { en: (i, n) => `Step ${i} of ${n}`, fa: (i, n) => `گام ${i} از ${n}` },
    qNum: { en: (i, n) => `Question ${i} of ${n}`, fa: (i, n) => `سؤال ${i} از ${n}` },
    right: { en: "✅ Correct!", fa: "✅ درست است!" }, wrong: { en: (a) => `❌ Not quite. The answer is: ${a}`, fa: (a) => `❌ نه دقیقاً. جواب درست: ${a}` },
    score: { en: (s, n) => `🏁 You got ${s} out of ${n}.`, fa: (s, n) => `🏁 از ${n} سؤال، ${s} تا را درست جواب دادی.` },
    scoreHi: { en: "Excellent — you know this well.", fa: "عالی — این مبحث را خوب بلدی." }, scoreMid: { en: "Good start. One more read of the lesson will fix the rest.", fa: "شروع خوبی است. با یک بار مرور درس، بقیه هم درست می‌شود." }, scoreLo: { en: "No problem — that's what learning is for. Try the lesson, then the quiz again.", fa: "اشکالی ندارد — یادگیری همین است. درس را ببین و دوباره آزمون بده." },
    again: { en: "🔁 Another quiz", fa: "🔁 یک آزمون دیگر" },
    cmdIs: { en: (c, d) => `The command ${c} ${d}`, fa: (c, d) => `دستور ${c} ${d}` }, example: { en: "Example:", fa: "مثال:" },
    related: { en: "📖 Read the lesson", fa: "📖 خواندن درس" }, quizMe: { en: "📝 Ask me a question", fa: "📝 یک سؤال بپرس" }, more: { en: "💡 Another term", fa: "💡 یک مفهوم دیگر" },
    termList: { en: "Here are some things I can explain. Tap one, or type your own:", fa: "این‌ها نمونه‌ای از چیزهایی است که توضیح می‌دهم. یکی را بزن یا خودت بنویس:" },
    unknown: { en: "I don't have a ready lesson for that yet. Try asking about a term (like “what is a firewall?”) or a command (like “what does chmod do?”), or pick an option:", fa: "هنوز برای این، درسِ آماده ندارم. درباره‌ی یک مفهوم (مثل «فایروال چیه؟») یا یک دستور (مثل «chmod چیکار می‌کنه؟») بپرس، یا یکی از این‌ها را انتخاب کن:" },
    pickAnswer: { en: "Tap one of the answers, or type its number.", fa: "یکی از جواب‌ها را بزن یا شماره‌اش را بنویس." }
  };

  const faDigits = (s) => String(s).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
  const norm = (s) => String(s || "").toLowerCase().replace(/[يى]/g, "ی").replace(/ك/g, "ک").replace(/[ً-ْ]/g, "").replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[؟?!.,،؛:«»"'()]/g, " ").replace(/\s+/g, " ").trim();
  const hasWord = (text, w) => {
    w = norm(w);
    if (/^[a-z0-9 +#.-]+$/.test(w)) return new RegExp("(^|[^a-z0-9])" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^a-z0-9])").test(text);
    return text.includes(w);
  };
  const ASK = /(چیه|چیست|چی هست|یعنی چی|یعنی چه|چیکار|چه کار|چه می ?کن|کارش چیه|توضیح|تعریف|فرق|what is|what's|whats|what are|what does|explain|define|meaning of|tell me about|how does)/;
  const LEARN_RE = /(یاد بده|یادم بده|یاد بگیر|درس بده|آموزش بده|اموزش بده|بهم یاد|درس|teach me|i want to learn|learn about|lesson|tutorial|study)/;
  const QUIZ_RE = /(آزمون|ازمون|کوییز|کوئیز|امتحان بگیر|تست بگیر|سوال بپرس|سؤال بپرس|quiz|test me|ask me)/;
  const HIRE_RE = /(کلاس|دوره خصوصی|خصوصی|هزینه|قیمت|شهریه|مدرس|ثبت نام|کارمند|پرسنل|تیم ما|همکارا|course fee|price|tutor|private|hire|class|staff|employees|our team)/;
  const CMD_RE = /(دستور|کامند|فرمان|command)/;

  function createTeacher(opts) {
    const learn = opts.learn || { tracks: [], articles: [] };
    const L = opts.lang;                       // () => "fa" | "en"
    const st = opts.state;                     // () => the engine's state.teach object
    const cmd = opts.cmd;
    const base = opts.base || "";
    const tr = (v) => (v && typeof v === "object" && !Array.isArray(v) ? (v[L()] != null ? v[L()] : v.en) : v);
    const say = (k) => P[k][L()];
    const num = (n) => (L() === "fa" ? faDigits(n) : String(n));
    const chip = (key, value, extra) => Object.assign({ label: say(key), value: cmd(value) }, extra || {});
    const trackName = (id) => `${TRACKS[id].emoji} ${TRACKS[id][L()]}`;
    const articlesOf = (track) => (learn.articles || []).filter((a) => a.track === track);
    const articleUrl = (id) => `${base}${L()}/${id}/`;

    function findTerm(text) {
      let best = null;
      for (const t of TERMS) for (const a of t[2]) if (hasWord(text, a) && (!best || a.length > best.len)) best = { t, len: a.length };
      return best && best.t;
    }
    function findCommand(text, strict) {
      const words = text.split(" ");
      for (const c of COMMANDS) {
        if (!hasWord(text, c[0])) continue;
        if (strict || CMD_RE.test(text) || ASK.test(text) || words.length <= 2) return c;
      }
      return null;
    }
    function findTrack(text) {
      for (const id of Object.keys(TRACKS)) if (hasWord(text, TRACKS[id].en) || text.includes(norm(TRACKS[id].fa))) return id;
      if (/(network|نتورک)/.test(text)) return "network";
      if (/(cyber|هک|hack)/.test(text)) return "security";
      if (/(کدنویسی|coding|code|کد زدن)/.test(text)) return "programming";
      return null;
    }

    // ── Replies ──────────────────────────────────────────────
    function menu(prefix) {
      st().mode = "menu";
      return [{ text: (prefix ? prefix + "\n" : "") + say("menu") + "\n" + say("menuHint"), chips: [chip("lessons", "t:lessons"), chip("quiz", "t:quiz"), chip("terms", "t:terms"), chip("request", "t:exit", { ghost: true })] }];
    }
    function trackChips(prefix) { return Object.keys(TRACKS).map((id) => ({ label: trackName(id), value: cmd(prefix + id) })); }
    function explainTerm(t) {
      st().mode = "term"; st().last = { track: t[1] };
      const art = articlesOf(t[1])[0];
      const chips = [{ label: say("quizMe"), value: cmd("t:quiz:" + t[1]) }, chip("more", "t:terms")];
      if (art) chips.unshift({ label: say("related"), href: articleUrl(art.id) });
      return [{ text: "💡 " + (L() === "fa" ? t[4] : t[3]), chips }];
    }
    function explainCommand(c) {
      st().mode = "term"; st().last = { track: c[1] };
      return [{ text: "⌨️ " + say("cmdIs")(c[0], L() === "fa" ? c[3] : c[2]) + "\n" + say("example"), code: "$ " + c[4], chips: [{ label: say("quizMe"), value: cmd("t:quiz:" + c[1]) }, chip("more", "t:terms"), chip("lessons", "t:lessons")] }];
    }
    function termList() {
      st().mode = "terms";
      const picks = ["ip", "dns", "firewall", "encryption", "phishing", "permissions", "shell", "variable"];
      return [{ text: say("termList"), chips: picks.map((id) => { const t = TERMS.find((x) => x[0] === id); return { label: t[2][0].toUpperCase() === t[2][0] ? t[2][0] : (L() === "fa" ? t[2][t[2].length - 1] : t[2][0]), value: cmd("t:term:" + id) }; }) }];
    }
    function lessonTracks() { st().mode = "lessons"; return [{ text: say("pickTrack"), chips: trackChips("t:track:") }]; }
    function lessonList(track) {
      const arts = articlesOf(track);
      if (!arts.length) return [{ text: say("noLessons"), chips: [{ label: say("quiz"), value: cmd("t:quiz:" + track) }, chip("terms", "t:terms"), chip("other", "t:lessons")] }];
      st().mode = "lessons";
      return [{ text: `${trackName(track)}\n${say("pickLesson")}`, chips: arts.map((a) => ({ label: tr(a.title), value: cmd("t:lesson:" + a.id) })) }];
    }
    // an article becomes steps: each heading starts one
    function stepsOf(a) {
      const steps = []; let cur = { title: tr(a.title), parts: [tr(a.summary)], code: null };
      for (const b of a.blocks || []) {
        if (b.h) { steps.push(cur); cur = { title: tr(b.h), parts: [], code: null }; continue; }
        if (b.p) cur.parts.push(tr(b.p));
        else if (b.list) cur.parts.push((tr(b.list) || []).map((x) => "• " + x).join("\n"));
        else if (b.note) cur.parts.push((b.kind === "warn" ? "⚠️ " : "💡 ") + tr(b.note));
        else if (b.code || b.term) {
          const code = String(b.code || b.term).split("\n").slice(0, 14).join("\n");
          if (cur.code) { steps.push(cur); cur = { title: cur.title, parts: [], code }; } else cur.code = code;
          if (b.cap) cur.parts.push(tr(b.cap));
        }
      }
      steps.push(cur);
      return steps.filter((s) => s.parts.length || s.code);
    }
    function lessonStep(id, i) {
      const a = (learn.articles || []).find((x) => x.id === id);
      if (!a) return lessonTracks();
      const steps = stepsOf(a); i = Math.max(0, Math.min(i, steps.length - 1));
      st().mode = "lesson"; st().lesson = { id, i }; st().last = { track: a.track };
      const s = steps[i], lastStep = i === steps.length - 1;
      const head = `📘 ${s.title}\n(${say("step")(num(i + 1), num(steps.length))})`;
      const chips = lastStep
        ? [{ label: say("quizOn"), value: cmd("t:quiz:" + a.track) }, { label: say("full"), href: articleUrl(a.id) }, chip("other", "t:lessons")]
        : [chip("next", "t:next"), { label: say("full"), href: articleUrl(a.id) }, chip("other", "t:lessons", { ghost: true })];
      const out = [{ text: head + (s.parts.length ? "\n\n" + s.parts.join("\n\n") : ""), code: s.code || undefined }];
      if (lastStep) out.push({ text: say("lessonDone"), chips }); else out[0].chips = chips;
      return out;
    }
    function quizStart(track) {
      const pool = QUIZ.map((q, i) => i).filter((i) => !track || QUIZ[i].t === track);
      let seed = (st().seed = ((st().seed || 7) * 1103515245 + 12345) & 0x7fffffff);
      const order = pool.slice().sort((a, b) => ((a * 7919 + seed) % 97) - ((b * 7919 + seed) % 97)).slice(0, 5);
      st().mode = "quiz"; st().quiz = { track: track || null, order, i: 0, score: 0 }; st().last = { track: track || null };
      return quizAsk();
    }
    const optsOf = (q) => (Array.isArray(q.o) ? q.o : q.o[L()]);
    function quizAsk(prefix) {
      const z = st().quiz, q = QUIZ[z.order[z.i]], o = optsOf(q);
      return [{ text: (prefix ? prefix + "\n\n" : "") + `📝 ${say("qNum")(num(z.i + 1), num(z.order.length))}\n${tr(q.q)}`, chips: o.map((x, k) => ({ label: `${num(k + 1)}. ${x}`, value: cmd("t:ans:" + k) })) }];
    }
    function quizAnswer(k) {
      const z = st().quiz;
      if (!z || st().mode !== "quiz") return menu();
      const q = QUIZ[z.order[z.i]], o = optsOf(q), ok = k === q.a;
      if (ok) z.score++;
      const fb = (ok ? say("right") : say("wrong")(o[q.a])) + " " + tr(q.w);
      z.i++;
      if (z.i < z.order.length) return quizAsk(fb);
      const n = z.order.length, s = z.score; st().mode = "menu";
      const verdict = s >= n - 1 ? say("scoreHi") : s >= Math.ceil(n / 2) ? say("scoreMid") : say("scoreLo");
      const chips = [{ label: say("again"), value: cmd("t:quiz" + (z.track ? ":" + z.track : "")) }, chip("lessons", "t:lessons"), chip("request", "t:exit", { ghost: true })];
      return [{ text: fb }, { text: say("score")(num(s), num(n)) + " " + verdict, chips }];
    }

    // ── Entry points ─────────────────────────────────────────
    // Is this message a learning request? (used when the visitor is not in teacher mode yet)
    function wants(raw) {
      const text = norm(raw);
      if (!text) return false;
      if (QUIZ_RE.test(text)) return true;
      if (HIRE_RE.test(text)) return false;                      // "private class", "course price" → a request for Sepehr
      if (ASK.test(text) && (findTerm(text) || findCommand(text))) return true;
      if (CMD_RE.test(text) && findCommand(text, true)) return true;
      if (LEARN_RE.test(text) && (findTrack(text) || findTerm(text) || text.split(" ").length <= 4)) return true;
      const words = text.split(" ");
      return words.length <= 2 && !!(findTerm(text) && ASK.test(text + " چیه"));   // a bare "dns?" style question
    }
    function handle(raw) {
      const text = norm(raw), s = st();
      if (s.mode === "quiz" && s.quiz) {
        const n = parseInt(text, 10), q = QUIZ[s.quiz.order[s.quiz.i]], o = optsOf(q);
        if (n >= 1 && n <= o.length && String(n) === text) return quizAnswer(n - 1);
        const hit = o.findIndex((x) => norm(x) === text);
        if (hit >= 0) return quizAnswer(hit);
        if (!ASK.test(text) && !LEARN_RE.test(text)) return [{ text: say("pickAnswer"), chips: o.map((x, k) => ({ label: `${num(k + 1)}. ${x}`, value: cmd("t:ans:" + k) })) }];
      }
      if (s.mode === "lesson" && s.lesson && /^(ادامه|بعدی|بعد|next|continue|go on|ok|باشه|اوکی|بریم|بله|آره|yes)$/.test(text)) return lessonStep(s.lesson.id, s.lesson.i + 1);
      const track = findTrack(text);
      if (QUIZ_RE.test(text)) return quizStart(track || (s.last && s.last.track) || null);
      const c = findCommand(text), t = findTerm(text);
      if (c && (CMD_RE.test(text) || !t || c[0].length >= (t[2][0] || "").length)) return explainCommand(c);
      if (t) return explainTerm(t);
      if (c) return explainCommand(c);
      if (track) return lessonList(track);
      if (LEARN_RE.test(text)) return lessonTracks();
      return [{ text: say("unknown"), chips: [chip("lessons", "t:lessons"), chip("quiz", "t:quiz"), chip("terms", "t:terms"), chip("request", "t:exit", { ghost: true })] }];
    }
    function command(c) {
      if (c === "teach") return menu();
      if (c === "t:lessons") return lessonTracks();
      if (c === "t:terms") return termList();
      if (c === "t:quiz") return [{ text: say("pickTrack"), chips: trackChips("t:quiz:") }];
      if (c === "t:next") { const l = st().lesson; return l ? lessonStep(l.id, l.i + 1) : lessonTracks(); }
      if (c.startsWith("t:track:")) return TRACKS[c.slice(8)] ? lessonList(c.slice(8)) : lessonTracks();
      if (c.startsWith("t:lesson:")) return lessonStep(c.slice(9), 0);
      if (c.startsWith("t:quiz:")) return quizStart(TRACKS[c.slice(7)] ? c.slice(7) : null);
      if (c.startsWith("t:term:")) { const t = TERMS.find((x) => x[0] === c.slice(7)); return t ? explainTerm(t) : termList(); }
      if (c.startsWith("t:ans:")) return quizAnswer(parseInt(c.slice(6), 10) || 0);
      return menu();
    }
    return { wants, handle, command, menu };
  }

  SB.createTeacher = createTeacher;
  SB.teacherData = { TERMS, COMMANDS, QUIZ, TRACKS };
})(typeof window !== "undefined" ? window : globalThis);
