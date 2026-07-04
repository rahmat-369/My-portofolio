import React, { useState } from "react";
import { Github, Send, Instagram, Video, MessageCircle, ArrowUp, Compass, Anchor, Cpu, Mail, Sparkles, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const TiktokIcon = () => (
  <svg 
    className="w-4 h-4 text-white fill-current group-hover:text-[#ff0050] transition-colors duration-300" 
    viewBox="0 0 24 24"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.94 1.08 2.27 1.81 3.69 2.1l-.1 3.52c-1.35-.07-2.68-.53-3.82-1.28-.48-.31-.9-.72-1.27-1.15v5.52c.04 2.82-1.46 5.56-4 6.82-2.17 1.08-4.8 1.02-6.9-.17-2.13-1.2-3.46-3.56-3.41-6.02-.06-2.58 1.34-5.02 3.6-6.26 1.48-.81 3.2-.95 4.77-.42v3.7c-1.07-.4-2.27-.2-3.18.52-.96.76-1.46 1.99-1.29 3.2.14 1.14.93 2.12 1.99 2.52 1.15.43 2.48.11 3.3-.76.57-.61.87-1.43.83-2.27V.02z" />
  </svg>
);

const WhatsappIcon = () => (
  <svg 
    className="w-4 h-4 text-white fill-current group-hover:text-[#25d366] transition-colors duration-300" 
    viewBox="0 0 24 24"
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.455 3.418 1.25 4.873l-1.325 4.845 4.962-1.302A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm5.733 13.916c-.25.7-1.42 1.282-1.95 1.372-.482.083-.984.14-3.111-.741-2.723-1.126-4.484-3.896-4.62-4.077-.136-.181-1.1-1.464-1.1-2.793 0-1.329.697-1.984.947-2.254.25-.27.543-.339.72-.339.18 0 .363.003.52.011.168.008.396-.063.618.473.226.546.772 1.884.84 2.019.068.136.113.294.022.475-.09.181-.136.294-.272.453-.136.158-.286.353-.408.475-.136.136-.28.285-.12.56.16.273.708 1.164 1.52 1.886.608.54 1.12.872 1.487 1.056.368.181.589.158.81-.09.22-.249.952-1.109 1.202-1.472.25-.362.498-.305.826-.181.33.124 2.086 1.033 2.176 1.124.09.09.15.136.113.25-.037.113-.158.814-.408 1.514z" />
  </svg>
);

const CURRENTLY_EXPLORING = [
  "Node.js", "Golang", "AI Agents", "Automation", "System Architecture"
];

const DIGITAL_PRESENCE = [
  { name: "GitHub", url: "https://github.com/rahmat-369", icon: <Github className="w-4 h-4 text-white hover:text-[#00f2fe] transition-colors" /> },
  { name: "Telegram", url: "https://t.me/rAi_engine", icon: <Send className="w-4 h-4 text-white hover:text-cyan-400 transition-colors" /> },
  { name: "Instagram", url: "https://www.instagram.com/rahmt_nhw?igsh=MWQwcnB3bTA2ZnVidg==", icon: <Instagram className="w-4 h-4 text-white hover:text-rose-450 transition-colors" /> },
  { name: "TikTok", url: "https://www.tiktok.com/@r_hmtofc?_r=1&_t=ZS-94KRfWQjeUu", icon: <TiktokIcon /> },
  { name: "WhatsApp Channel", url: "https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p", icon: <WhatsappIcon /> },
  { name: "Email", url: "#contact-form", icon: <Mail className="w-4 h-4 text-white hover:text-amber-500 transition-colors" /> }
];

export default function FooterSection() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const mailtoUrl = `mailto:rohmatulloh.3609@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent("Nama: " + formData.name + "\nEmail: " + formData.email + "\n\nMessage:\n" + formData.message)}`;
      window.location.href = mailtoUrl;
      
      setSubmitStatus("success");
      setStatusMessage("Membuka aplikasi email Anda...");
    } catch (err) {
      setSubmitStatus("error");
      setStatusMessage("Gagal membuka aplikasi email. Silakan kirim langsung ke rohmatulloh.3609@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="thinker" className="pt-24 pb-16 px-6 bg-gradient-to-b from-[#0d0d0d] via-[#100e0b] to-[#040404] text-white border-t border-zinc-950 flex flex-col justify-center relative overflow-hidden select-none font-sans">
      
      {/* Background warm deep glow for the Thinker zone */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] bg-amber-500/3 rounded-full blur-[110px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto w-full space-y-20 relative z-10">
        
        {/* Module 1: Philosophy (The central quotes) */}
        <div className="text-center space-y-6 max-w-2xl mx-auto">
          <span className="text-xs font-mono tracking-widest text-amber-500 uppercase">[ LANDASAN FILOSOFI // CORE ETHOS ]</span>
          
          <blockquote className="space-y-4">
            <p className="text-2xl sm:text-3xl font-display font-medium text-zinc-100 tracking-wide leading-relaxed">
              "Saya tidak berusaha menguasai seluruh teknologi yang ada. Saya lebih tertarik memahami bagaimana teknologi saling terhubung, bagaimana sebuah ide dapat diwujudkan, dan bagaimana rasa penasaran bisa berubah menjadi sesuatu yang nyata. Bagi saya, setiap project bukan sekadar hasil akhir, melainkan bagian dari proses eksplorasi yang terus berjalan."
            </p>
            <cite className="text-xs font-mono text-zinc-500 block mt-4 not-italic font-bold font-sans">— R_HMT // TECHNOLOGY EXPLORER</cite>
          </blockquote>
        </div>

        {/* Contact Form Module */}
        <div id="contact-form" className="scroll-mt-24 max-w-2xl mx-auto w-full p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-900 shadow-2xl relative overflow-hidden">
          {/* Top subtle decorative strip */}
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent"></div>
          
          <div className="space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono tracking-widest text-amber-500 uppercase font-bold">[ EMAIL_MESSAGE // HUBUNGI DEV ]</span>
              <h3 className="text-lg font-display font-medium text-white tracking-wide">KIRIM PESAN DIRECT</h3>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Tulis nama, subjek, dan isi pesan Anda di bawah ini untuk mengirim email langsung ke rohmatulloh.3609@gmail.com.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nama Anda..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-900 focus:border-amber-500/30 text-xs font-sans text-zinc-200 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="nama@email.com..."
                    className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-900 focus:border-amber-500/30 text-xs font-sans text-zinc-200 placeholder-zinc-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="subject" className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider">Subjek</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subjek pesan..."
                  className="w-full px-4 py-2.5 rounded-xl bg-zinc-900/40 border border-zinc-900 focus:border-amber-500/30 text-xs font-sans text-zinc-200 placeholder-zinc-600 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="block text-[10px] font-mono text-zinc-450 uppercase tracking-wider">Isi Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Ketik isi pesan Anda di sini secara detail..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-900/40 border border-zinc-900 focus:border-amber-500/30 text-xs font-sans text-zinc-200 placeholder-zinc-600 outline-none transition-all resize-none"
                />
              </div>

              {submitStatus !== "idle" && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3.5 rounded-xl text-xs font-sans flex items-center gap-2 border ${
                    submitStatus === "success" 
                      ? "bg-amber-950/20 border-amber-500/20 text-amber-400" 
                      : "bg-red-950/20 border-red-500/20 text-red-400"
                  }`}
                >
                  {submitStatus === "success" ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-amber-500" />
                  ) : (
                    <Sparkles className="w-4 h-4 shrink-0 text-red-500 animate-pulse" />
                  )}
                  <span>{statusMessage}</span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 hover:from-amber-500/20 hover:to-amber-600/10 border border-amber-500/30 text-[10px] font-mono uppercase tracking-widest text-amber-400 hover:text-white transition-all cursor-pointer select-none active:scale-98 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3 h-3 rounded-full border-2 border-t-transparent border-amber-400 animate-spin"></span>
                    MENGIRIM EMAIL...
                  </>
                ) : (
                  <>
                    <Send className="w-3 h-3" />
                    KIRIM EMAIL DIRECT
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Module 2: Currently Exploring & Digital Presence Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-12 border-t border-zinc-900/60">
          
          {/* Currently Exploring Grid Column */}
          <div className="md:col-span-6 space-y-6">
            <h4 className="text-xs font-mono text-zinc-450 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-amber-500 animate-pulse" /> SEPAK TERJANG // NOW EXPLORING
            </h4>
            <div className="flex flex-wrap gap-2">
              {CURRENTLY_EXPLORING.map((tech) => (
                <div 
                  key={tech} 
                  className="px-3.5 py-2 rounded-xl bg-zinc-950/60 border border-zinc-900 text-xs font-mono text-zinc-305 hover:border-amber-500/20 transition-all select-none"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-500/40 mr-2"></span>
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Digital Presence Grid Column */}
          <div className="md:col-span-6 space-y-6">
            <h4 className="text-xs font-mono text-zinc-455 uppercase tracking-widest flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#00f2fe]" /> HUB SOSIAL // SOCIAL CHANNELS
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {DIGITAL_PRESENCE.map((presence) => (
                <a
                  key={presence.name}
                  href={presence.url}
                  onClick={(e) => {
                    if (presence.name === "Email") {
                      navigator.clipboard.writeText("rohmatulloh.3609@gmail.com");
                      window.dispatchEvent(new CustomEvent("show-toast", { detail: "Email rohmatulloh.3609@gmail.com disalin ke clipboard! 📋" }));
                    }
                    if (presence.url.startsWith("#")) {
                      e.preventDefault();
                      const targetEl = document.querySelector(presence.url);
                      if (targetEl) {
                        targetEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }
                  }}
                  target={presence.url.startsWith("#") ? undefined : "_blank"}
                  rel={presence.url.startsWith("#") ? undefined : "noopener noreferrer"}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-950/60 border border-zinc-900 hover:border-amber-500/30 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
                >
                  {presence.icon}
                  {presence.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright / credit parameters & Scroll trigger */}
        <div className="pt-16 border-t border-zinc-950/80 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-left font-sans">
            <span className="text-xs font-mono text-zinc-650 tracking-wider block">R_HMT // TECHNOLOGY EXPLORER</span>
            <span className="text-[10px] font-mono text-zinc-750 block mt-1">INDEPENDENT PRODUCT BUILDER &copy; {new Date().getFullYear()}</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-zinc-950 border border-zinc-900 text-zinc-500 hover:text-accent-cyan cursor-pointer transition-all active:scale-95 group"
          >
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

      </div>
    </footer>
  );
}
