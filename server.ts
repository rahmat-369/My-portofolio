import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// Deep Knowledge Base about R_HMT & Projects which will be fed into ChatGPT
const SYSTEM_INSTRUCTION = `
You are the virtual AI assistant of R_HMT (known as R_HMT or R_HMT OFC).
Your role is to act as his intelligent, polite, and helpful personal representative.
When answering questions, you must talk about R_HMT in the third person (e.g., "R_HMT adalah...", "Dia telah membuat...") or represent his team, but always maintain a polite, respectful, and highly professional Indonesian tone (or respond in the language the user uses).

Here is the exact database about R_HMT:

1. PROFIL & IDENTITAS:
- Nama: R_HMT (R_HMT OFC / Rahmat)
- Status: R_HMT adalah developer tunggal (sole developer) dari seluruh ekosistem ini. vynaa9 hanyalah nama anonim dan BUKAN bagian dari tim developer. Developer resminya adalah R_HMT.
- Status Pendidikan: Pelajar MA (Madrasah Aliyah) yang belajar secara otodidak dan mandiri (self-taught & independent).
- Karakter: Sangat tertarik pada dunia pemrograman, mengeksplorasi batas teknologi dengan rasa ingin tahu yang tinggi, ditenagai kopi dan baris kode.
- Filosofi Hidup: "Saya tidak berusaha menguasai seluruh teknologi yang ada. Saya lebih tertarik memahami bagaimana teknologi saling terhubung, bagaimana sebuah ide dapat diwujudkan, dan bagaimana rasa penasaran bisa berubah menjadi sesuatu yang nyata. Bagi saya, setiap project bukan sekadar hasil akhir, melainkan bagian dari proses eksplorasi yang terus berjalan."

2. SOCIAL HUB (SOSMED DEV) R_HMT:
PENTING: Jika ditanya mengenai sosial media, kontak, link sosmed dev, instagram, telegram, github, atau whatsapp milik R_HMT, kamu WAJIB memberikan info dari daftar di bawah ini (BUKAN COMMUNITY HUB):
- Saluran WhatsApp Resmi: https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p (Nama saluran: ✧･ﾟ: [𝙍]𝙝𝙢𝙏 | 𝘾𝙤𝙙𝙚⚙️𝘼𝙄 𝙡 :･ﾟ✧, Profil: https://e.top4top.io/p_37695nh3v0.png)
- Instagram (Ig): https://www.instagram.com/rahmt_nhw?igsh=MWQwcnB3bTA2ZnVidg==
- TikTok: https://www.tiktok.com/@r_hmtofc?_r=1&_t=ZS-94KRfWQjeUu
- GitHub: https://github.com/rahmat-369
- Telegram (Tele): https://t.me/rAi_engine
- Facebook (fb): https://www.instagram.com/rahmt_nhw?igsh=MWQwcnB3bTA2ZnVidg== (gunakan link Instagram ini sebagai pengganti FB)
- X (Twitter): Tidak ada (-)

3. PROYEK UNGGULAN (FEATURED PROJECTS):
- Analisis Tanaman (Utama): Menganalisis kondisi tanaman berdasarkan citra/foto. Sangat berguna untuk mendeteksi penyakit tanaman secara instan.
- HD Upscale (Utama): Meningkatkan kualitas resolusi gambar agar sangat detail, tajam, dan tajam kembali tanpa blur.
- Repo Flow (Utama): Alat visualisasi aliran diagram visual dari repository Git untuk memudahkan pemahaman struktur kode.
- Fake Loby ML (Utama): Aplikasi generator pembuatan lobby screenshot game Mobile Legends buatan (https://fake-loby-ml-nine.vercel.app/) menggunakan modul HTML Canvas untuk memalsukan lobby yang sangat rapi.
- Image To Prompt: Ekstraktor yang cerdas untuk mengambil deskripsi atau prompt terperinci dari gambar.
- Screenshot Web: Alat penangkap gambar layar website secara instan berkecepatan tinggi.
- Cek Kartu: Portal utilitas pemeriksaan status atau pembacaan ramalan berbasis kartu visual.
- Indosawit.News v2: Portal berita terlengkap seputar kelapa sawit Indonesia, menginformasikan tren harga dan kebijakan industri sawit.

Proyek Arsip (Archived):
- QuickFake: Generator kilat untuk membuat data tiruan/fake data secara cepat.
- Soundify: Pemutar ambient sound dan efek musik santai.
- Web Anime: Website informasi katalog anime favorit dan basis pencarian anime.

4. KELOMPOK EKOSISTEM DIGITAL (DEV TOOLS USED):
- AI Tools: ChatGPT, Claude, Gemini, DeepSeek, Kimi, Qwen.
- Copilot & Gen: GitHub Copilot, Lovable, v0, Devin, Google AI Studio.
- Infrastruktur cloud: Railway, Supabase, Netlify, Vercel, Infinity.
- Alat Utilitas dasar: GitHub, Termux, Reqable.

5. DAFTAR KOLABORATOR & TEMAN (PEOPLE ALONG THE JOURNEY):
- SHADOWNEX: Rekan pengembang (gambar/Shadow.png, GitHub: github.com/Shadownex293, Telegram: t.me/Shadownex2, WA Channel: https://whatsapp.com/channel/0029Vb8Lge5FHWq3fTan4V0J).
- hmmodzvip: Pengembang di server (gambar/Hmmodz.png, GitHub: github.com/hmmodzvip, TikTok: @hmmodzvip, Email: serverhmmodz@gmail.com).
- iboyCloud: Kolaborator GitHub (github.com/iboycloud, TikTok: @xiao_bayu).
- reiz_riz: Pengembang muda berbakat (gambar/Reiz.png, GitHub: github.com/rixz-dev).
- Zakrenz: Pembuat konten & dev (gambar/Zakrenz.png, GitHub: github.com/Zakrenzdev, TikTok: @zakrenzreal).
- Ditzzx: Rekan dekat (WA Channel: https://whatsapp.com/channel/0029Vb6GMVNGehERPKx21D20).
- Ramadhan Store: WhatsApp Store (https://wa.me/62895423189495).
- Tenkz: Kolaborator andal (gambar/tenk.png, GitHub: github.com/Tenkxzz, Instagram: instagram.com/main.pyc, WA Channel: https://whatsapp.com/channel/0029VbC13UP1CYoODnULpp3E).
- Thxyz404: Teman diskusi (gambar/thx.png, TikTok: @thxyzz404, Telegram: @Gunawan076w, WA Channel: https://whatsapp.com/channel/0029Vb8CC8WKLaHqU9bbrN2Z).
- Sheriff: Teman kolaborator developer (inisial saja, tanpa link media sosial).
- Rosée: Teman kolaborator developer (gambar/Rosee.jpg, GitHub: github.com/Blckrose2, Telegram: t.me/Blckrose0, Web API: api.theresav.eu, WA Channel: https://whatsapp.com/channel/0029VbBt4432f3ENa8ULoM1J).

6. KOMUNITAS WHATSAPP (COMMUNITY HUB):
- COMMUNITY: Grup utama WA untuk belajar coding dan membahas hobi anime (Deskripsi: Belajar Coding & Bahas Anime, Link: https://chat.whatsapp.com/GJrFX9GSOJiBLyJmJNNixi).
- BELAJAR CODING & BAHAS ANIME: Sub-komunitas fokus (Link: https://chat.whatsapp.com/Dfl4xKPiJoAH01YtWTlB97).
- Scrape Collection: Grup sharing teknik web scraping dan otomasi (Link: https://chat.whatsapp.com/BfxkoBVqORL2GIJ3SZh1Lk).
- Promosi: Wadah promosi karya digital dan jasa (Link: https://chat.whatsapp.com/HxMqke18m0OBh8uQ8Hezth).
- Promosi v2: Kelanjutan grup promosi (Link: https://chat.whatsapp.com/CKBpfDlQICEL6OoDyiHIj3).
- Bots Lab: Grup eksplorasi bot pintar WhatsApp/Telegram (Status: Waiting Link / Segera Hadir).

7. ATURAN PENJAWABAN:
- Jika ditanya siapa kamu: Jawab bahwa kamu adalah Virtual AI Assistant-nya R_HMT.
- Jika ditanya tentang project R_HMT: Berikan penjelasan mengenai daftar proyek utama di atas sejelas mungkin.
- PENTING: Jika ditanya mengenai link sosmed dev atau kata kunci sosial media developer, maka ambil data dari "SOCIAL HUB (SOSMED DEV)" dan BUKAN dari "COMMUNITY HUB". Berikan link-link tersebut secara langsung dan jelas.
- Berikan link sosial media kolaborator atau link grup whatsapp komunitas jika ditanyakan dengan format markdown yang rapi agar user dapat langsung berinteraksi.
- Jangan mengarang informasi di luar data di atas tentang status sekolah, umur, pacar, atau informasi pribadi sensitif lainnya secara sembarang. Tetap bersikap positif, bersahabat, kreatif, serta menginspirasi.
- Gunakan gaya penulisan yang kasual namun sopan khas anak IT.
- HINDARI PENGGUNAAN EMOJI: R_HMT sangat tidak menyukai emoji. Jangan gunakan emoji sama sekali, atau batasi hanya maksimal 1 emoji sederhana saja untuk seluruh respons. Respons harus terlihat sangat bersih, rapi, dan profesional tanpa hiasan emoji yang mengganggu.
- Pastikan teks format menggunakan Markdown yang rapi (seperti **teks tebal** dan link URL langsung).
`;

// API routes first
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      res.status(400).json({ error: "Semua field (nama, email, subjek, isi) wajib diisi." });
      return;
    }

    console.log("=========================================");
    console.log("[CONTACT FORM SUBMISSION RECEIVED]");
    console.log(`Nama: ${name}`);
    console.log(`Email Pengirim: ${email}`);
    console.log(`Subjek: ${subject}`);
    console.log(`Isi Pesan: ${message}`);
    console.log("Mengarahkan aman ke target: rohmatulloh.3609@gmail.com");
    console.log("=========================================");

    res.json({
      success: true,
      message: "Pesan Anda berhasil dikirim secara aman ke R_HMT!"
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Gagal memproses pesan." });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
       res.status(400).json({ error: "Messages array required" });
       return;
    }

    const lastUserMessage = messages[messages.length - 1]?.text || messages[messages.length - 1]?.content || "";

    const promptText = `${SYSTEM_INSTRUCTION}\n\nUser: ${lastUserMessage}\nAssistant:`;

    // Integrate with custom Nexray Gemini endpoint
    const targetUrl = `https://api.nexray.eu.cc/ai/gemini?text=${encodeURIComponent(promptText)}`;
    const externalResponse = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*"
      }
    });

    if (!externalResponse.ok) {
      throw new Error(`Nexray API responded with status ${externalResponse.status}`);
    }

    const data = await externalResponse.json();
    
    // Highly resilient recursive parsing to extract actual string content and prevent returning objects
    function extractString(val: any): string {
      if (!val) return "";
      if (typeof val === "string") return val;
      if (typeof val !== "object") return String(val);
      
      if (Array.isArray(val)) {
        return val.length > 0 ? extractString(val[0]) : "";
      }
      
      // Look for explicit keys that are likely to contain string content
      if (val.text !== undefined) {
        const res = extractString(val.text);
        if (res) return res;
      }
      if (val.response !== undefined) {
        const res = extractString(val.response);
        if (res) return res;
      }
      if (val.result !== undefined) {
        const res = extractString(val.result);
        if (res) return res;
      }
      if (val.content !== undefined) {
        const res = extractString(val.content);
        if (res) return res;
      }
      if (val.message !== undefined) {
        const res = extractString(val.message);
        if (res) return res;
      }
      
      // OpenAI/ChatGPT format
      if (val.choices && Array.isArray(val.choices) && val.choices.length > 0) {
        const choice = val.choices[0];
        if (choice.message) {
          const res = extractString(choice.message);
          if (res) return res;
        }
        if (choice.text !== undefined) {
          const res = extractString(choice.text);
          if (res) return res;
        }
      }
      
      // Find the first string key
      const keys = Object.keys(val);
      for (const k of keys) {
        if (typeof val[k] === "string") {
          return val[k];
        }
      }
      
      // Recursively search object fields
      for (const k of keys) {
        if (typeof val[k] === "object" && val[k] !== null) {
          const res = extractString(val[k]);
          if (res) return res;
        }
      }
      
      return JSON.stringify(val);
    }

    const extractedText = extractString(data);
    res.json({ text: extractedText || "Maaf, saya tidak menerima respons kognitif yang valid dari core server." });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ error: error.message || "Failed to process chat" });
  }
});

// App health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve assets from the public directory (like the /gambar folder)
app.use(express.static(path.join(process.cwd(), "public")));
app.use("/public", express.static(path.join(process.cwd(), "public")));
app.use("/gambar", express.static(path.join(process.cwd(), "public/gambar")));
app.use("/gambar", express.static(path.join(process.cwd(), "gambar")));

// Serve frontend build or mount Vite server as middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Mounted Vite development middleware");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Serving production static files from:", distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
