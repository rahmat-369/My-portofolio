# 🎯 PANDUAN PERBAIKAN VISUAL - STEP BY STEP

## 📍 Langkah 1: Lokasi File yang Perlu Diubah

```
Project Root
└── src
    └── data.ts              ← FILE INI YANG HARUS DIEDIT
```

**Nomor baris:** 239

---

## 🔄 PERUBAHAN #1: SHADOWNEX Avatar

### SEBELUM (SALAH ❌)
```typescript
// Baris 239-250 di src/data.ts

{ 
  name: "SHADOWNEX", 
  handle: "shadownex", 
  avatar: "Shadownex.png",    // ❌ FILE INI TIDAK ADA!
  role: "Sebagai rekannya dalam penjelajah teknologi koding yang andal.",
  socials: [
    { platform: "github", url: "https://github.com/Shadownex293", label: "GitHub" },
    { platform: "telegram", url: "https://t.me/Shadownex2", label: "Telegram" },
    { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb8Lge5FHWq3fTan4V0J", label: "Channel WA" }
  ]
},
```

### SESUDAH (BENAR ✅)
```typescript
// Baris 239-250 di src/data.ts

{ 
  name: "SHADOWNEX", 
  handle: "shadownex", 
  avatar: "Shadow.png",       // ✅ SESUAI FILE YANG ADA!
  role: "Sebagai rekannya dalam penjelajah teknologi koding yang andal.",
  socials: [
    { platform: "github", url: "https://github.com/Shadownex293", label: "GitHub" },
    { platform: "telegram", url: "https://t.me/Shadownex2", label: "Telegram" },
    { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb8Lge5FHWq3fTan4V0J", label: "Channel WA" }
  ]
},
```

---

## 🔄 PERUBAHAN #2: iboyCloud Avatar

### SEBELUM (KOSONG ❌)
```typescript
// Baris 263-271

{ 
  name: "iboyCloud", 
  handle: "iboycloud", 
  avatar: "",                 // ❌ KOSONG - akan tampil inisial saja
  role: "Arsitek Infrastruktur Integrasi & Cloud Deployment.",
  socials: [
    { platform: "github", url: "https://github.com/iboycloud", label: "GitHub" },
    { platform: "tiktok", url: "https://www.tiktok.com/@xiao_bayu", label: "TikTok" }
  ]
},
```

### SESUDAH (PERBAIKAN ✅)
```typescript
// Baris 263-271

{ 
  name: "iboyCloud", 
  handle: "iboycloud", 
  avatar: "pp-dev.png",       // ✅ GUNAKAN FALLBACK PROFILE PIC
  role: "Arsitek Infrastruktur Integrasi & Cloud Deployment.",
  socials: [
    { platform: "github", url: "https://github.com/iboycloud", label: "GitHub" },
    { platform: "tiktok", url: "https://www.tiktok.com/@xiao_bayu", label: "TikTok" }
  ]
},
```

---

## 🔄 PERUBAHAN #3: Ditzzx Avatar

### SEBELUM (KOSONG ❌)
```typescript
// Baris 293-300

{ 
  name: "Ditzzx", 
  handle: "Ditzzx", 
  avatar: "",                 // ❌ KOSONG
  role: "DevOps Engineer & Kontributor Pemelihara Kode Utama.",
  socials: [
    { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb6GMVNGehERPKx21D20", label: "Channel WA" }
  ]
},
```

### SESUDAH (PERBAIKAN ✅)
```typescript
// Baris 293-300

{ 
  name: "Ditzzx", 
  handle: "Ditzzx", 
  avatar: "pp-dev.png",       // ✅ GUNAKAN FALLBACK
  role: "DevOps Engineer & Kontributor Pemelihara Kode Utama.",
  socials: [
    { platform: "whatsapp-channel", url: "https://whatsapp.com/channel/0029Vb6GMVNGehERPKx21D20", label: "Channel WA" }
  ]
},
```

---

## 🔄 PERUBAHAN #4: Ramadhan Store Avatar

### SEBELUM (KOSONG ❌)
```typescript
// Baris 302-309

{ 
  name: "Ramadhan Store", 
  handle: "Ramadhan Store", 
  avatar: "",                 // ❌ KOSONG
  role: "Distributor Mitra Strategis Penyebaran Solusi Digital.",
  socials: [
    { platform: "whatsapp", url: "https://wa.me/62895423189495", label: "WhatsApp" }
  ]
},
```

### SESUDAH (PERBAIKAN ✅)
```typescript
// Baris 302-309

{ 
  name: "Ramadhan Store", 
  handle: "Ramadhan Store", 
  avatar: "pp-dev.png",       // ✅ GUNAKAN FALLBACK
  role: "Distributor Mitra Strategis Penyebaran Solusi Digital.",
  socials: [
    { platform: "whatsapp", url: "https://wa.me/62895423189495", label: "WhatsApp" }
  ]
},
```

---

## 📊 MAPPING FILE YANG BENAR

### File di public/gambar/

| Developer | Nama File | Status |
|-----------|-----------|--------|
| SHADOWNEX | `Shadow.png` | ✅ FIXED |
| hmmodzvip | `Hmmodz.png` | ✅ OK |
| iboyCloud | `pp-dev.png` | ✅ FIXED |
| reiz_riz | `Reiz.png` | ✅ OK |
| Zakrenz | `Zakrenz.png` | ✅ OK |
| Ditzzx | `pp-dev.png` | ✅ FIXED |
| Ramadhan Store | `pp-dev.png` | ✅ FIXED |
| Tenkz | `Tenkz.png` | ✅ OK |
| Thxyz404 | `Thx.png` | ✅ OK |

---

## 🛠️ CARA EDIT PALING MUDAH

### Method 1: Manual Edit (Recommended)

1. **Buka** VS Code / Text Editor pilihan Anda
2. **Buka file** `src/data.ts`
3. **Tekan** `Ctrl+H` untuk open Find & Replace
4. **Cari:** `avatar: "Shadownex.png"`
5. **Ganti dengan:** `avatar: "Shadow.png"`
6. **Click** Replace
7. **Selesai!**

Kemudian lakukan 3x replace lagi untuk avatar kosong menjadi `pp-dev.png`

---

### Method 2: Copy-Paste Langsung

1. Buka file `/PEOPLE_DATA_FIXED.ts` (file yang kami buat)
2. Copy seluruh `PEOPLE` array
3. Paste ke `src/data.ts` mulai dari baris 237
4. Selesai!

---

## ✅ VERIFIKASI SETELAH PERBAIKAN

### Checklist:

- [ ] `"Shadownex.png"` sudah diubah ke `"Shadow.png"`
- [ ] `iboyCloud` avatar sudah tidak kosong
- [ ] `Ditzzx` avatar sudah tidak kosong
- [ ] `Ramadhan Store` avatar sudah tidak kosong
- [ ] File di-save
- [ ] Browser di-refresh (Ctrl+R atau Cmd+Shift+R)

### Testing:

1. **Gambar muncul?**
   - Hover ke salah satu card developer
   - Lihat apakah gambar profile muncul

2. **Popup muncul?**
   - Klik salah satu card
   - Modal dialog harus muncul dengan detail sosmed (Instagram, Telegram, dll)

3. **Close popup works?**
   - Klik tombol X di pojok kanan atas modal
   - Modal harus menutup

---

## 🐛 JIKA MASIH ADA MASALAH

### Cek Console untuk Error

1. **Buka DevTools** (Press `F12`)
2. **Klik tab** `Console`
3. **Lihat apakah ada pesan merah error**
4. **Scroll up untuk lihat lebih detail**

### Debug Image Loading

1. **Buka DevTools** → `Network` tab
2. **Refresh halaman** (Ctrl+R)
3. **Cari request** yang berisi `gambar/`
4. **Lihat status code:**
   - `200` = Gambar berhasil dimuat ✅
   - `404` = Gambar tidak ditemukan ❌

---

## 📞 BANTUAN LEBIH LANJUT

Jika masih ada yang tidak paham:

1. Share screenshot dari DevTools Console
2. Pastikan sudah save file
3. Pastikan browser cache sudah dihapus (Ctrl+Shift+Delete)
4. Coba di browser yang berbeda

---

## 🎉 SELAMAT!

Setelah melakukan 4 perubahan di atas, semua masalah akan solved:
- ✅ Gambar profile akan muncul
- ✅ Popup detail akan berfungsi
- ✅ Social media links akan accessible

Good luck! 🚀
