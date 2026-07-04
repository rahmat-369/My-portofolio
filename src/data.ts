import { Project, JourneyStep, EcosystemGroup, Person, Community } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "analisis-tanaman",
    name: "Analisis Tanaman",
    category: "AI Tools",
    url: "https://analyze-tanaman.vercel.app/welcome",
    description: "Aplikasi diagnostik pertanian visual interaktif berbasis pengenalan citra kamera untuk mendeteksi penyakit tanaman secara instan.",
    problem: "Mendiagnosis hama tanaman atau penyakit tanaman membutuhkan waktu lama dan ahli agronomi, menyebabkan keterlambatan penanganan di lahan.",
    exploration: "Mengintegrasikan penangkapan kamera ponsel secara langsung ke model multi-modal vision jarak jauh untuk analisis visual instan di lapangan.",
    outcome: "Menghasilkan rekomendasi pertanian yang akurat dalam hitungan detik untuk penanganan patologi tanaman yang cepat bagi petani lokal.",
    ecosystem: ["React", "Tailwind CSS", "Gemini Multi-modal", "Serverless"]
  },
  {
    id: "hd-upscale",
    name: "HD Upscale",
    category: "AI Tools",
    url: "https://hd-upscale-nine.vercel.app/",
    description: "Alat peningkat resolusi gambar berbasis kecerdasan buatan untuk merestorasi pixel mikro dan menghilangkan kompresi visual.",
    problem: "Skala pembesaran gambar konvensional hanya merenggangkan grid pixel, menciptakan kekaburan visual dan noise yang merusak estetika desain grafik.",
    exploration: "Eksplorasi kalkulasi sintetik detail frekuensi tinggi lewat neural-network vision AI ketimbang sekadar interpolasi bilinear.",
    outcome: "Membantu desainer memoles grafis beresolusi rendah menjadi tajam serta layak ditampilkan pada display presisi modern.",
    ecosystem: ["Gemini Vision API", "Cloud Run", "Canvas API", "Tailwind"]
  },
  {
    id: "repo-flow",
    name: "Repo Flow",
    category: "Utilities",
    url: "https://auto-reporistory-githb.vercel.app/",
    description: "Orkestrator otomatisasi Git yang menyederhanakan pipeline pembuatan repositori, inisialisasi berkas template, dan commit sinkronisasi.",
    problem: "Pengembang membuang waktu mengatur boilerplate, repositori terpencil, dan file workflow CI/CD berulang-kali untuk setiap eksperimen mikro.",
    exploration: "Menghubungkan API REST GitHub untuk merancang wizard interaktif pembangun berkas konfigurasi, inisialisasi Git, dan push otomatis.",
    outcome: "Meningkatkan kecepatan pembangunan sandbox eksperimen secara masif dengan menghilangkan pekerjaan repetitif admin repositori.",
    ecosystem: ["GitHub API", "React", "OAuth 2.0", "Tailwind CSS"]
  },
  {
    id: "fake-loby-ml",
    name: "Fake Loby ML",
    category: "Utilities",
    url: "https://fake-loby-ml-nine.vercel.app/",
    description: "Simulator manipulasi antarmuka Mobile Legends interaktif menggunakan visual rendering canvas untuk menciptakan kustomisasi kartu profil virtual.",
    problem: "Membuat visualisasi kartu profil game secara kustom dengan lencana tier dinamis membutuhkan keterampilan desain grafis yang rumit.",
    exploration: "Penerapan rendering canvas 2D untuk mengombinasikan berkas grafis skin, lencana, teks dinamis, dan parameter secara real-time.",
    outcome: "Memberikan ruang bermain fiktif yang menyenangkan bagi komunitas gamer untuk merancang kreasi estetika lobi tanpa keahlian grafis manual.",
    ecosystem: ["HTML5 Canvas", "React", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "tugasku-pro",
    name: "TugasKu Pro",
    category: "Productivity",
    url: "https://tugas-ku4.vercel.app/",
    description: "Sistem ruang kerja kolaborasi premium berskala enterprise untuk manajemen tugas, proyek, dan workflow terstruktur dengan animasi fluid.",
    problem: "Kebanyakan pengatur tugas terlalu kaku atau minim umpan balik visual, membuat pelacakan efisiensi tim terasa membosankan dan lambat.",
    exploration: "Riset interaksi drag-and-drop state boards, workspace dinamis, sistem sub-checklist bersarang, dan indikator produktivitas real-time.",
    outcome: "Menjadi stasiun kerja independen yang solid yang sering digunakan oleh tim pengembang independen di Indonesia.",
    ecosystem: ["Next.js", "React", "Tailwind CSS", "Zustand", "Framer Motion"]
  },
  {
    id: "tugasku-lite",
    name: "TugasKu Lite",
    category: "Productivity",
    url: "https://tugasku3-lite.netlify.app/",
    description: "Versi ringan TugasKu yang sangat cepat, dioptimalkan sepenuhnya untuk masukan tugas instan dengan struktur memori sangat rendah.",
    problem: "Aplikasi pelacak tugas sering kali lamban dan memakan memori berlebih saat dibuka pada jaringan lambat atau terminal smartphone.",
    exploration: "Optimasi berat runtime browser sekecil mungkin dan penyimpanan tumpukan status lokal yang tangguh terhadap fluktuasi sinyal internet.",
    outcome: "Penyelesaian tugas sehari-hari yang instan dan bebas lag yang kompatibel pada layar terbatas atau integrasi iframe.",
    ecosystem: ["React", "Tailwind CSS", "Local Storage", "Vite"]
  },
  {
    id: "screenshot-web",
    name: "Screenshot Web",
    category: "Utilities",
    url: "https://screenshot-web-omega.vercel.app/",
    description: "Alat tangkapan layar web berkualitas tinggi yang menyajikan potret utuh satu halaman web dinamis yang panjang secara lurus.",
    problem: "Ekstensi screenshot biasa sering kali memecah font khusus, merusak posisi elemen CSS absolut, dan gagal menangkap layout gulir penuh.",
    exploration: "Membangun proxy server instansi Chromium tanpa kepala (headless) untuk merender animasi dan mengekstrak snapshot visual akurat.",
    outcome: "Membantu desainer web menangkap bukti rancangan visual secara presisi untuk persetujuan klien yang cepat.",
    ecosystem: ["Puppeteer", "Express", "Node.js", "React", "Vite"]
  },
  {
    id: "cek-kartu",
    name: "Cek Kartu",
    category: "Utilities",
    url: "https://cek-provider-six.vercel.app/",
    description: "Mesin validasi kartu operator telekomunikasi seluler Indonesia untuk sinkronisasi checkout transaksi pembayaran.",
    problem: "Kesalahan pengenalan nomor seluler oleh pengguna saat pengisian pulsa menimbulkan kekacauan sistem pengiriman transaksi lokal.",
    exploration: "Membangun mesin ekspresi reguler (RegEx) berkinerja tinggi terhadap dataset awalan nomor handphone dari seluruh operator lokal.",
    outcome: "Menurunkan kesalahan transaksi loket pembayaran digital lokal untuk kelancaran jalur transaksi di Indonesia.",
    ecosystem: ["React", "Tailwind CSS", "RegEx Engine", "Vite"]
  },
  {
    id: "indosawit-news",
    name: "Indosawit.News v2",
    category: "Productivity",
    url: "https://nexssuspage.vercel.app",
    description: "Portal monitoring harga kelapa sawit dan agregator berita agrikultur terintegrasi untuk petani perkebunan kelapa sawit.",
    problem: "Petani kelapa sawit mandiri kesulitan mendapatkan transparansi riwayat pasar harga harian dan info pencegahan penyakit tanaman perkebunan.",
    exploration: "Agregasi data harian harga minyak sawit mentah (CPO) nasional dalam kemasan grafik kontras tinggi yang mudah dibaca di luar ruangan.",
    outcome: "Menjadi rujukan informasi yang memberdayakan komunitas petani sawit lokal untuk bernegosiasi secara adil.",
    ecosystem: ["React", "Tailwind", "REST APIs", "Vectary 3D"]
  },
  {
    id: "image-to-prompt",
    name: "Image To Prompt",
    category: "AI Tools",
    url: "https://image-to-promt-livid.vercel.app/",
    description: "Sistem deskripsi gambar terstruktur yang merekayasa ulang gambar visual menjadi deskripsi kalimat prompt siap guna untuk AI generator.",
    problem: "Melihat visualisasi yang menawan tetapi kesulitan menemukannya dalam struktur teks deskripsi presisi saat membuat instruksi di Midjourney atau Stable Diffusion.",
    exploration: "Pemurnian pipeline sintaks deskripsi warna, gaya arsitektur, pencahayaan, dan atmosfir estetis gambar menjadi format instruksi deklaratif.",
    outcome: "Menjembatani kreasi visual orisinal dengan mesin pembuat model generatif lewat rekayasa prompt tingkat lanjut.",
    ecosystem: ["Gemini 2.5 Vision", "React", "Tailwind CSS", "Node.js"]
  },
  {
    id: "quickfake",
    name: "QuickFake",
    category: "Archive Experiments",
    url: "#",
    description: "Generator rancangan REST API fiktif instan untuk mempercepat proses visualisasi prototipe halaman frontend pengembang.",
    problem: "Menunggu infrastruktur backend selesai dideploy menghambat kecepatan pengembangan antarmuka pengembang.",
    exploration: "Pemetaan data skema ke memori lokal untuk menyimulasikan transaksi fiktif dengan kecepatan latensi yang dapat dikontrol.",
    outcome: "Membantu melatih koding integrasi logika tanpa membutuhkan database nyata aktif.",
    ecosystem: ["Faker.js", "ZustandKey", "TypeScript"]
  },
  {
    id: "soundify",
    name: "Soundify",
    category: "Archive Experiments",
    url: "#",
    description: "Eksperimen sensoris audio browser interaktif yang mengubah parameter matematika menjadi alunan gelombang suara spasial.",
    problem: "Perangkat lunak pembuat audio terlampau rumit dan mengintimidasi bagi pengguna awam yang ingin mempelajari akustik digital.",
    exploration: "Memanfaatkan antarmuka Web Audio API osilator kustom berpadu dengan lukisan partikel canvas bergerak.",
    outcome: "Menjadikan ruang visualisasi suara yang sederhana sekaligus menenangkan di dalam halaman web.",
    ecosystem: ["Web Audio API", "HTML5 Canvas", "Tailwind CSS"]
  },
  {
    id: "web-anime",
    name: "Web Anime",
    category: "Archive Experiments",
    url: "#",
    description: "Katalog animasi murni berbasis performa GPU untuk menghormati ikon-ikon budaya pop-culture yang disukai secara interaktif.",
    problem: "Banya visual web terasa kaku dan patah-patah karena animasi javascript berat yang tidak mengakses akselerasi perangkat keras.",
    exploration: "Penerapan transformasi koordinat matrix CSS 3D berakselerasi fisik untuk rotasi visual halus.",
    outcome: "Pameran teknik pergerakan interaktif web modern yang sangat responsif dan ringan.",
    ecosystem: ["CSS Transforms", "React", "Framer Motion"]
  }
];

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    phase: "Phase 1 — The Spark",
    title: "Awal dari Sebuah Perjalanan",
    subtitle: "Semua Berawal dari Sebuah Tugas Sekolah",
    description: "Perjalanan ini berawal dari sebuah tugas sekolah dan seseorang yang tanpa sadar menjadi pemicu langkah pertamaku di dunia web development. Awalnya hanya ingin memberikan yang terbaik, namun seiring waktu rasa penasaran itu tumbuh menjadi passion yang terus membentuk siapa diriku hari ini, meski tanpa orang itu.",
    techKeywords: ["First Project", "School Journey", "Curiosity", "New Beginning"]
  },
  {
    phase: "Phase 2 — Self Learning",
    title: "Membangun Fondasi",
    subtitle: "Belajar dengan Cara Sendiri",
    description: "Setelah tugas itu selesai, rasa penasaranku tidak ikut berhenti. Sebagian besar perjalanan ini kulalui hanya menggunakan Oppo A3s, perangkat sederhana yang menjadi teman belajar selama bertahun-tahun. Tanpa laptop dan dengan berbagai keterbatasannya, aku mulai memahami HTML, CSS, JavaScript, hingga perlahan membangun fondasi sebagai seorang web developer melalui proses trial & error yang tak pernah berhenti.",
    techKeywords: ["HTML", "CSS", "JavaScript", "Self Learning"],
    environment: {
      device: "Oppo A3s (Android 8.1 Oreo)",
      laptop: "—",
      learning: "Self-Taught"
    }
  },
  {
    phase: "Phase 3 — AI Collaboration",
    title: "Menemukan Cara Belajar yang Paling Sesuai",
    subtitle: "Berkembang Bersama AI",
    description: "Ketika teknologi AI mulai berkembang pesat, aku menemukan pendekatan belajar yang paling sesuai dengan diriku. Alih-alih berfokus menghafal setiap sintaks, aku lebih memilih membangun proyek nyata bersama AI sebagai partner berpikir dan berkolaborasi. Pendekatan ini membantuku memahami konsep, arsitektur, dan proses membangun solusi dengan lebih efektif sesuai ritme belajarku. Bagiku, web development adalah hobi yang terus berkembang bersama rasa ingin tahu.",
    techKeywords: ["AI Collaboration", "Vibe Coding", "Prompt Engineering", "Problem Solving"]
  },
  {
    phase: "Phase 4 — Exploration",
    title: "Rasa Penasaran yang Tak Pernah Berhenti",
    subtitle: "Bereksperimen Tanpa Takut Gagal",
    description: "Semakin banyak hal yang kupelajari, semakin besar pula rasa ingin tahuku. Aku mulai mengeksplorasi berbagai framework, deployment, API, server, AI Agent, VPS, hingga workflow modern untuk memahami bagaimana semuanya saling terhubung. Bagiku, setiap eksperimen bukan hanya tentang membuat sesuatu bekerja, tetapi juga memahami alasan di balik setiap prosesnya.",
    techKeywords: ["API Integration", "VPS", "AI Agent", "Cloud Deployment"]
  },
  {
    phase: "Phase 5 — Building",
    title: "Mengubah Ide Menjadi Produk",
    subtitle: "Dari Eksperimen Menjadi Karya",
    description: "Berbekal pengalaman dari berbagai eksperimen, aku mulai membangun berbagai website, tools, dan proyek pribadi yang benar-benar dapat digunakan. Setiap proyek menjadi tempat untuk menggabungkan desain, AI, automasi, dan pengalaman pengguna menjadi satu kesatuan yang terus berkembang. Bagiku, membangun sesuatu yang bermanfaat selalu menjadi motivasi terbesar.",
    techKeywords: ["Product Development", "AI Tools", "Automation", "User Experience"]
  },
  {
    phase: "Phase 6 — Beyond The Horizon",
    title: "Perjalanan Ini Belum Berakhir",
    subtitle: "Selalu Ada Hal Baru untuk Dipelajari",
    description: "Aku percaya perjalanan ini masih berada di awal. Tujuanku bukan hanya membangun website, tetapi terus mengeksplorasi bagaimana AI, automasi, dan web development dapat berpadu untuk menciptakan pengalaman digital yang lebih cerdas dan bermanfaat. Setiap proyek yang kubangun bukanlah garis akhir, miripkan langkah menuju ide, tantangan, dan perjalanan berikutnya.\n\nSemua ini berawal dari sebuah tugas sekolah. Dan hingga hari ini, aku masih melanjutkan perjalanan yang dimulai dari langkah kecil itu.",
    techKeywords: ["AI Engineering", "Digital Ecosystem", "Continuous Learning", "Future Vision"]
  }
];

export const ECOSYSTEM: EcosystemGroup[] = [
  {
    category: "AI Tools",
    items: [
      { name: "ChatGPT", description: "Penyelesaian masalah umum & verifikasi model penalaran", iconName: "MessageSquareCode" },
      { name: "Claude", description: "Analisis arsitektur sistem kompleks & rekonstruksi modular", iconName: "Workflow" },
      { name: "Gemini", description: "Analisis modalitas pengelihatan & pipeline penalaran cerdas", iconName: "Sparkles" },
      { name: "DeepSeek", description: "Pengujian fungsional kecepatan tinggi & penalaran logika murni", iconName: "Brain" },
      { name: "Kimi", description: "Ulasan berkas dokumen super panjang & sintesis data luas", iconName: "FileSpreadsheet" },
      { name: "Zhipu AI", description: "Model cerdas dwibahasa mutakhir untuk penalaran teks dan pemrosesan data mendalam", iconName: "Sparkles" }
    ]
  },
  {
    category: "Builders",
    items: [
      { name: "Copilot", description: "Suntikan pelengkapan kode otomatis langsung di editor", iconName: "Terminal" },
      { name: "Codex", description: "Perumusan blok kode sistem pemrograman tingkat dasar", iconName: "Code" },
      { name: "Lovable", description: "Pembuatan prototipe visual antarmuka klien super cepat", iconName: "Layout" },
      { name: "v0", description: "Pembuat rancangan kode komponen antarmuka modular instan", iconName: "Layers" },
      { name: "Google AI Studio", description: "Eksperimen langsung parameter API model-model Google", iconName: "Cpu" },
      { name: "Devin", description: "Simulasi alur logis pengembang AI otonom multi-langkah", iconName: "Binary" }
    ]
  },
  {
    category: "Infrastructure",
    items: [
      { name: "Railway", description: "Penyedia server kontainer cerdas & database andal", iconName: "Cloud" },
      { name: "Supabase", description: "Infrastruktur database PostgreSQL & listener real-time instant", iconName: "Database" },
      { name: "Netlify", description: "Pengiriman CDN tepi berlatensi ultra rendah bagi frontend", iconName: "Globe" },
      { name: "Vercel", description: "Platform deployment optimal terintegrasi dengan pipeline git modern", iconName: "Vercel" }
    ]
  },
  {
    category: "Environment",
    items: [
      { name: "GitHub", description: "Pusat penyimpanan sistem versi kontrol & pipeline otomatisasi", iconName: "Github" },
      { name: "Termux", description: "Akses terminal shell Linux di perangkat mobile yang tangguh", iconName: "Command" },
      { name: "Reqable", description: "Inspeksi jaringan digital proxy penilai respons REST API", iconName: "Activity" }
    ]
  }
];

export const PEOPLE: Person[] = [
  { 
    name: "SHADOWNEX", 
    handle: "shadownex", 
    avatar: "Shadow.png",
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/Shadownex293", label: "GitHub" },
      { platform: "telegram", url: "https://t.me/Shadownex2", label: "Telegram" },
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb8Lge5FHWq3fTan4V0J", label: "Channel WA" }
    ]
  },
  { 
    name: "hmmodzvip", 
    handle: "hmmodzvip", 
    avatar: "Hmmodz.png", 
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/hmmodzvip", label: "GitHub" },
      { platform: "tiktok", url: "https://www.tiktok.com/@hmmodzvip", label: "TikTok" },
      { platform: "email", url: "mailto:serverhmmodz@gmail.com", label: "Email" }
    ]
  },
  { 
    name: "iboyCloud", 
    handle: "iboycloud", 
    avatar: "",
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/iboycloud", label: "GitHub" },
      { platform: "tiktok", url: "https://www.tiktok.com/@xiao_bayu", label: "TikTok" }
    ]
  },
  { 
    name: "reiz_riz", 
    handle: "rixz-dev", 
    avatar: "Reiz.png", 
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/rixz-dev", label: "GitHub" },
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb7w7clK5cD9rAxc6r20", label: "Channel WA" }
    ]
  },
  { 
    name: "Zakrenz", 
    handle: "Zakrenzdev", 
    avatar: "Zakrenz.png", 
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/Zakrenzdev", label: "GitHub" },
      { platform: "tiktok", url: "https://www.tiktok.com/@zakrenzreal", label: "TikTok" }
    ]
  },
  { 
    name: "Ditzzx", 
    handle: "Ditzzx", 
    avatar: "",
    role: "",
    socials: [
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb6GMVNGehERPKx21D20", label: "Channel WA" }
    ]
  },
  { 
    name: "Ramadhan Store", 
    handle: "Ramadhan Store", 
    avatar: "Ramda.jpg",
    role: "",
    socials: [
      { platform: "whatsapp", url: "https://wa.me/62895423189495", label: "WhatsApp" }
    ]
  },
  { 
    name: "Tenkz", 
    handle: "Tenkxzz", 
    avatar: "Tenkz.png", 
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/Tenkxzz", label: "GitHub" },
      { platform: "instagram", url: "https://instagram.com/main.pyc", label: "Instagram" },
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029VbC13UP1CYoODnULpp3E", label: "Channel WA" }
    ]
  },
  { 
    name: "Thxyz404", 
    handle: "thxyzz404", 
    avatar: "Thx.png", 
    role: "",
    socials: [
      { platform: "tiktok", url: "https://www.tiktok.com/@thxyzz404", label: "TikTok" },
      { platform: "telegram", url: "https://t.me/Vnz404", label: "Telegram" },
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb8CC8WKLaHqU9bbrN2Z", label: "Channel WA" }
    ]
  },
  {
    name: "Sheriff",
    handle: "sheriff",
    avatar: "",
    role: "",
    socials: []
  },
  {
    name: "Rosée",
    handle: "Blckrose2",
    avatar: "Rosee.jpg",
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/Blckrose2", label: "GitHub" },
      { platform: "telegram", url: "https://t.me/Blckrose0", label: "Telegram" },
      { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029VbBt4432f3ENa8ULoM1J", label: "Channel WA" },
      { platform: "web", url: "https://api.theresav.eu", label: "Web API" }
    ]
  },
  {
    name: "Kayy Tsoukei",
    handle: "KayyOnly",
    avatar: "kay.jpg",
    role: "",
    socials: [
      { platform: "github", url: "https://github.com/KayyOnly", label: "GitHub" },
      { platform: "telegram", url: "https://t.me/Gbaiks", label: "Telegram" }
    ]
  },
  {
    name: "Ray Mewing",
    handle: "raymewing",
    avatar: "ray.jpg",
    role: "",
    socials: [
      { platform: "linktree", url: "https://linktr.ee/raytampann", label: "Linktree" }
    ]
  },
  {
    name: "Thvnotdev119",
    handle: "Thvnotdev119",
    avatar: "thv.jpg",
    role: "",
    socials: [
      { platform: "tiktok", url: "https://www.tiktok.com/@Thvnotdev119", label: "TikTok" }
    ]
  }
];

export const COMMUNITIES: Community[] = [
  { 
    name: "HIRASAWA.ID", 
    title: "WHATSAPP OFFICIAL COMMUNITY", 
    tagline: "Wadah sentral resmi dalam mengasah logika koding, rekayasa produk, serta berkolaborasi antarsesama peretas digital.", 
    image: "Coding.png",
    url: "https://chat.whatsapp.com/GJrFX9GSOJiBLyJmJNNixi",
    status: "Active Outpost",
    members: ["SHADOWNEX", "hmmodzvip", "reiz_riz", "Zakrenz"],
    memberCount: "500+ Member"
  },
  { 
    name: "BELAJAR CODING & BAHAS ANIME", 
    title: "DISCUS & LEARNING HUB", 
    tagline: "Forum kolaborasi santai belajar struktur kode pemrograman dasar sembari mendiskusikan serial kultur anime populer.", 
    image: "Coding.png",
    url: "https://chat.whatsapp.com/Dfl4xKPiJoAH01YtWTlB97",
    status: "Active Outpost",
    members: ["SHADOWNEX", "reiz_riz", "iboyCloud", "Zakrenz"],
    memberCount: "300+ Member"
  },
  { 
    name: "Scrape Collection", 
    title: "AUTOMATION RESEARCH LAB", 
    tagline: "Kumpulan script otomatisasi penjelajah data (web scraping), repositori pembersihan data, dan bot cerdas.", 
    image: "Scrape.png",
    url: "https://chat.whatsapp.com/BfxkoBVqORL2GIJ3SZh1Lk",
    status: "Active Outpost",
    members: ["hmmodzvip", "Tenkz", "Ditzzx"],
    memberCount: "200 Member"
  },
  { 
    name: "Promosi", 
    title: "COMMERCIAL OUTREACH HUB", 
    tagline: "Tempat promosi perkakas instan, rintisan situs web prototipe, serta sarana perluasan ide produk.", 
    image: "Promosi.png",
    url: "https://chat.whatsapp.com/HxMqke18m0OBh8uQ8Hezth",
    status: "Active Outpost",
    members: ["Ramadhan Store", "Tenkz", "reiz_riz"],
    memberCount: "100 Member"
  },
  { 
    name: "Promosi v2", 
    title: "PROMOSI OUTPOST V2", 
    tagline: "Evolusi ruang distribusi digital berskala mikro untuk pencatatan log promosi produk-produk buatan pengembang independen.", 
    image: "Promosiv2.png",
    url: "https://chat.whatsapp.com/CKBpfDlQICEL6OoDyiHIj3",
    status: "Active Outpost",
    members: ["Ramadhan Store", "Thxyz404", "Ditzzx"],
    memberCount: "200+ Member"
  },
  { 
    name: "Bots Lab", 
    title: "AI & TELECOMMUNICATIONS", 
    tagline: "Laboratorium rekayasa pesan interaktif, simulasi bot cerdas, webhook pemicu, dan server transaksional mikro.", 
    image: "Bots.png",
    url: "https://chat.whatsapp.com/CKBpfDlQICEL6OoDyiHIj3",
    status: "Active Outpost",
    members: ["hmmodzvip", "Tenkz", "Thxyz404"],
    memberCount: "80+ Member"
  }
];
