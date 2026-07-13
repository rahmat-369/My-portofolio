export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Semua field (nama, email, subjek, isi) wajib diisi." });
    }

    console.log("=========================================");
    console.log("[CONTACT FORM SUBMISSION RECEIVED ON VERCEL]");
    console.log(`Nama: ${name}`);
    console.log(`Email Pengirim: ${email}`);
    console.log(`Subjek: ${subject}`);
    console.log(`Isi Pesan: ${message}`);
    console.log("=========================================");

    return res.status(200).json({
      success: true,
      message: "Pesan Anda berhasil dikirim secara aman ke R_HMT!"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message || "Gagal memproses pesan." });
  }
}
