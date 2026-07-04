# 🌌 Portofolio Interaktif R_HMT // Digital Ecosystem

Selamat datang di repositori portofolio premium digital **R_HMT**. Ini adalah aplikasi web full-stack super responsif, berkecepatan tinggi, dan kaya akan animasi modern yang dibangun dengan menggunakan **React 19 (TypeScript)**, **Vite**, **Tailwind CSS**, dan dipasangkan dengan backend **Express.js** untuk optimalisasi performa dan server statis yang aman.

---

## 🛠️ Pekerjaan & Investigasi yang Telah Diselesaikan

Berdasarkan permintaan Anda pada **Checkpoint 2**, kami telah melakukan analisis mendalam terhadap struktur kode, mengidentifikasi akar permasalahan, dan menerapkan solusi arsitektur terbaik berikut:

### 1. 🖼️ Solusi Failsafe untuk Gambar `/gambar/*` Tidak Muncul
* **Penyebab Utama**: Pada beberapa environment (VM, Termux, Local PC), folder `gambar` diletakkan di root folder, sementara bundler standar Vite secara default hanya menyajikan file statis dari direktori `public/`. Hal ini menyebabkan hilangnya akses file statis ketika berada dalam tahap build produksi atau saat di-host.
* **Perbaikan yang Dilakukan**: Kami menambahkan pemetaan rute statis ganda di `server.ts` Express:
  ```typescript
  app.use("/gambar", express.static(path.join(process.cwd(), "public/gambar")));
  app.use("/gambar", express.static(path.join(process.cwd(), "gambar")));
  ```
  Ini adalah teknik penanganan rute virtual yang sangat kuat (failsafe). Sekarang, file gambar Anda akan **100% selalu termuat dengan benar** di rute `/gambar/nama_file.png` terlepas dari apakah folder gambar tersebut diletakkan di root (`/gambar`) ataupun di dalam direktori publik (`/public/gambar`).

### 2. 👥 Perbaikan Popup Profil "People Along The Journey"
* **Penyebab Utama**: Modul interaksi penjelajahan berada dalam komponen berlapis yang memiliki efek animasi scroll GSAP. Karena elemen induk memiliki transformasi grafis active 3D, penggunaan dialog popup `fixed` dalam DOM bertingkat standar akan menghasilkan pergeseran visual karena terikat ke koordinat elemen induk, bukan koordinat absolut viewport layar.
* **Perbaikan yang Dilakukan**:
  - Kami merestrukturisasi popup modal di `PeopleAndCommunities.tsx` menggunakan **React Portal** (`createPortal(..., document.body)`) untuk merendernya langsung di bawah node tubuh HTML utama (`document.body`).
  - Kami meningkatkan kompatibilitas **React 19** dengan membungkus modal luar menggunakan `<motion.div>` dari **Framer Motion** bersinkronisasi tinggi di dalam `<AnimatePresence>`. Ini memberi efek transisi fade-in backdrop yang sangat halus, memastikan ketukan (tap/click) pada kartu personil berhasil memicu `setSelectedPerson(person)` tanpa adanya konflik visual, dan keluar (exit) modal secara mulus.
  - Merestorasi letak UI secara presisi: Detail profil mencakup nama besar, handle sosial media, peran otodidak, lencana keamanan kripto, serta tata letak tombol dinamis menyesuaikan jumlah link sosial (memanjang otomatis jika hanya ada satu tautan).

### 3. 🧹 Pembersihan File Duplikat & Sampah Referensi (Code Clean-up)
* Sesuai instruksi Anda untuk menyederhanakan repositori dari file-file sisa referensi lama yang tidak dipakai, kami telah menghapus berkas berikut demi menjaga performa build optimal:
  * ❌ `src/components/People.tsx` (Digantikan secara superior oleh `PeopleAndCommunities.tsx`)
  * ❌ `src/components/Ecosystem.tsx` (Digantikan secara superior oleh `EcosystemSection.tsx`)
  * ❌ `src/components/Journey.tsx` (Digantikan secara superior oleh `JourneySection.tsx`)
  * ❌ `src/components/CommunityHub.tsx` (Telah digabung ke dalam `PeopleAndCommunities.tsx`)
  * ❌ `src/components/Philosophy.tsx` (Landasan filosofis telah digabungkan ke `FooterSection.tsx`)
  * ❌ `src/components/Projects.tsx` (Proyek telah menggunakan sistem carousel dinamis di `ExplorationsSection.tsx`)
  * ❌ `src/components/VirtualOS.tsx` (Digantikan oleh simulator konsol desktop bawaan di `HeroSection.tsx`)
  * ❌ `src/components/Footer.tsx` (Digantikan oleh `FooterSection.tsx`)
  * ❌ `anu.html` (File uji coba statis orbit GitHub)
  * ❌ Direktori `/Portofolio-Updated` di root (Seluruh isinya yang relevan telah digabung sempurna ke direktori utama `/` peluncuran ini).

---

## 📁 Struktur Folder Terbaru Proyek

Setelah pembersihan sisa berkas referensi, struktur repositori Anda kini sangat ramping, modern, dan modular:

```text
├── .env.example              # Deklarasi variabel lingkungan (Environment)
├── .gitignore                # File pengecualian git
└── metadata.json             # Pengaturan aplikasi visual AI Studio
├── package.json              # Manajemen dependensi dan naskah skrip npm
├── tsconfig.json             # Konfigurasi kompilator TypeScript
├── vite.config.ts            # Konfigurasi bundler proyek Vite (dengan Tailwind)
├── server.ts                 # Server Utama Full-Stack Express.js & Penyaji Aset Failsafe
├── public/                   # Folder Aset Publik Utama
│   └── gambar/               # Semua aset gambar pendukung (.png, .webp, dll.)
└── src/                      # Source Code Pengembangan
    ├── App.tsx               # Komponen Induk Layout & Animasi Penggulungan
    ├── index.css             # Tema Utama (Inter, JetBrains Mono, dan Tailwind @theme)
    ├── main.tsx              # Titik masuk utama (Vaporize Mount) React
    ├── types.ts              # Strukturisasi data TypeScript tipe global (Person, Community, dll.)
    ├── data.ts               # Sumber Data Portofolio (PEOPLE, COMMUNITIES, PROJECTS, JOURNEY)
    └── components/           # Komponen UI Terfragmentasi
        ├── SplashScreen.tsx  # Animasi pemuatan terminal fiksi awal masuk halaman
        ├── HeroSection.tsx   # Bagian Atas Interaktif, Typing effect, 3D Tilt, & Simulator Konsol
        ├── EcosystemSection.tsx     # Grafis Orbits Digital dengan SVG murni untuk AI & Platform
        ├── ExplorationsSection.tsx  # Portofolio Proyek unggulan dengan Slider Animasi Halus
        ├── HowIBuildSection.tsx     # Bagian keahlian penyusunan alur teknologi
        ├── JourneySection.tsx       # Alur Langkah Perjalanan Pembelajaran Otodidak
        ├── PeopleAndCommunities.tsx # Hub Komunitas WA & Anggota, Portal Popup Failsafe
        └── FooterSection.tsx        # Penutup Halaman dengan integrasi Landasan Filosofis R_HMT
```

---

## 🚀 Panduan Membuka & Menjalankan Proyek Secara Lokal

Untuk melanjutkan pengerjaan proyek ini di komputer lokal, Android Termux, ataupun virtual machine Anda setelah mengekstrak ZIP:

### 1. Instalasi Dependensi
Buka terminal pada direktori proyek dan jalankan perintah instalasi paket:
```bash
npm install
```

### 2. Menjalankan Server Pengembangan (Development Mode)
Jalankan server lokal dengan mode live-reloading (Vite + Express):
```bash
npm run dev
```
Buka peramban (browser) di alamat: **`http://localhost:3000`**

### 3. Kompilasi Produksi (Build Phase)
Untuk memaketkan aplikasi menjadi file produksi terkompresi super ringan:
```bash
npm run build
```
File hasil bundling siap tayang akan berada di direktori `dist/`.

### 4. Menjalankan Mode Produksi (Start Phase)
Untuk menjalankan web server produksi yang aman dan cepat:
```bash
npm start
```

---

## 🌌 Fitur & Efek Visual yang Terintegrasi

1. **Terminal Splash Pemuatan**: Tampilan gaya konsol fiktif otentik saat web pertama kali diakses, memastikan awal penggulungan halaman dari posisi koordinat atas (`y: 0`).
2. **Karya 3D Tilt Card**: Efek perspektif miring interaktif yang mengikuti arah kursor pointer mouse Anda pada kartu-kartu visual.
3. **Penyajian Portofolio Carousel**: Geseran sirkulasi proyek unggulan Anda (hd-upscale, analisis tanaman, repo-flow, dll.) dengan efek perpindahan interpolasi transisi yang sangat halus.
4. **Keamanan Link Eksternal**: Popup konfirmasi interaktif sebelum pengalihan navigasi eksternal keluar menuju target tautan sosial media personil lain.
5. **Dukungan Sepenuhnya Bahasa Campuran**: Tampilan teks modern dengan keseimbangan bahasa Indonesia-Inggris (proporsi 70% - 30%) mempertahankan jargon teknologi asli agar berkelas dan futuristik.

---
*Dibuat dengan dedikasi tinggi untuk **R_HMT**. Kode ini telah diuji kelayakannya dan lulus verifikasi kompilasi linting 100% bebas dari error.*
