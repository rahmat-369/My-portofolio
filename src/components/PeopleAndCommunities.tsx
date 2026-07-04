import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { PEOPLE, COMMUNITIES } from "../data";
import { Person, Community } from "../types";
import { 
  Github, Send, Mail, Instagram, MessageCircle, 
  Phone, Users, X, ArrowUpRight, Zap, HelpCircle, 
  Sparkles, ExternalLink, ShieldCheck, Megaphone, Globe 
} from "lucide-react";

const TiktokIcon = () => (
  <svg 
    className="w-4 h-4 text-[#ff0050] fill-current" 
    viewBox="0 0 24 24"
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.01 1.62 4.14.94 1.08 2.27 1.81 3.69 2.1l-.1 3.52c-1.35-.07-2.68-.53-3.82-1.28-.48-.31-.9-.72-1.27-1.15v5.52c.04 2.82-1.46 5.56-4 6.82-2.17 1.08-4.8 1.02-6.9-.17-2.13-1.2-3.46-3.56-3.41-6.02-.06-2.58 1.34-5.02 3.6-6.26 1.48-.81 3.2-.95 4.77-.42v3.7c-1.07-.4-2.27-.2-3.18.52-.96.76-1.46 1.99-1.29 3.2.14 1.14.93 2.12 1.99 2.52 1.15.43 2.48.11 3.3-.76.57-.61.87-1.43.83-2.27V.02z" />
  </svg>
);

const WhatsappIcon = ({ className }: { className?: string }) => (
  <svg 
    className={className || "w-4 h-4 text-[#25d366] fill-current"} 
    viewBox="0 0 24 24"
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.455 3.418 1.25 4.873l-1.325 4.845 4.962-1.302A9.957 9.957 0 0012.004 22c5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm5.733 13.916c-.25.7-1.42 1.282-1.95 1.372-.482.083-.984.14-3.111-.741-2.723-1.126-4.484-3.896-4.62-4.077-.136-.181-1.1-1.464-1.1-2.793 0-1.329.697-1.984.947-2.254.25-.27.543-.339.72-.339.18 0 .363.003.52.011.168.008.396-.063.618.473.226.546.772 1.884.84 2.019.068.136.113.294.022.475-.09.181-.136.294-.272.453-.136.158-.286.353-.408.475-.136.136-.28.285-.12.56.16.273.708 1.164 1.52 1.886.608.54 1.12.872 1.487 1.056.368.181.589.158.81-.09.22-.249.952-1.109 1.202-1.472.25-.362.498-.305.826-.181.33.124 2.086 1.033 2.176 1.124.09.09.15.136.113.25-.037.113-.158.814-.408 1.514z" />
  </svg>
);

const FacebookIcon = () => (
  <svg 
    className="w-4 h-4 text-blue-500 fill-current" 
    viewBox="0 0 24 24"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";

const getImagePath = (avatar: string | undefined): string => {
  if (!avatar) return "";
  if (avatar.startsWith("http")) return avatar;
  if (avatar.startsWith("/")) return avatar;
  if (avatar.startsWith("gambar/")) return "/" + avatar;
  return "/gambar/" + avatar;
};

export default function PeopleAndCommunities() {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [modalImageError, setModalImageError] = useState(false);
  const [confirmLink, setConfirmLink] = useState<{ url: string; platform: string } | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset modal image error state when selected person changes
  const [modalTriedBackup, setModalTriedBackup] = useState(false);
  useEffect(() => {
    setModalImageError(false);
    setModalTriedBackup(false);
  }, [selectedPerson]);

  // Lock background scroll when modal detail popup is open
  useEffect(() => {
    if (selectedPerson) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPerson]);

  // Render social icon with stable vector references
  const renderSocialIcon = (platform: string) => {
    switch(platform) {
      case "github":
        return <Github className="w-4 h-4 text-white" />;
      case "telegram":
        return <Send className="w-4 h-4 text-[#00f2fe]" />;
      case "tiktok":
        return <TiktokIcon />;
      case "email":
        return <Mail className="w-4 h-4 text-amber-500" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-rose-500" />;
      case "whatsapp-channel":
        return <WhatsappIcon />;
      case "whatsapp":
        return <WhatsappIcon />;
      case "web":
        return <Globe className="w-4 h-4 text-emerald-400" />;
      case "linktree":
        return <Globe className="w-4 h-4 text-emerald-400" />;
      default:
        return <HelpCircle className="w-4 h-4 text-zinc-500" />;
    }
  };

  return (
    <section id="network" className="scroll-mt-24 pt-28 pb-20 px-4 xs:px-6 select-none bg-transparent min-h-screen flex flex-col lg:justify-center border-t border-zinc-950/60 font-sans">
      <div className="max-w-6xl mx-auto w-full space-y-32">
        
        {/* Module 1: People Along The Journey */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-500 bg-amber-950/20 border border-amber-500/10 px-4 py-1.5 rounded-full uppercase">
              [ COGNITIVE NETWORK // KOLABORATUR CLUSTERS ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-widest uppercase">
              PEOPLE ALONG THE JOURNEY
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Jejaring pengembang independen, kontributor terbuka, dan rekan kolaborasi erat R_hmt. Klik profil mereka untuk membuka detail platform komunikasi sosial mereka.
            </p>
          </div>

          {/* Beautiful responsive grid layout adjusting side-by-side on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
            {PEOPLE.map((person, idx) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <InteractivePersonCard 
                  person={person} 
                  index={idx} 
                  onClick={() => setSelectedPerson(person)} 
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Module 2: Communities */}
        <div className="space-y-16">
          <div className="text-center space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f2fe] bg-cyan-950/20 border border-cyan-500/10 px-4 py-1.5 rounded-full uppercase">
              [ ACTIVE OUTPOSTS // PUSAT AFILIASI WA ]
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-widest uppercase">
              COMMUNITIES
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Keterlibatan aktif R_hmt dalam perkumpulan hacker visual, laboratorium automation bots, serta forum diskusi bersama anggota komunitas pilihan.
            </p>
          </div>

          {/* Special Join Channel Card */}
          <div className="max-w-xl mx-auto w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-card-cyan bg-zinc-950/40 border border-cyan-500/20 rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden text-center group"
            >
              {/* Highlight bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent animate-pulse"></div>
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/15 transition-all duration-500"></div>

              <div className="flex flex-col items-center space-y-4">
                {/* Profile pic */}
                <div className="w-24 h-24 rounded-full border-2 border-cyan-500/30 overflow-hidden shadow-[0_0_25px_rgba(0,242,254,0.2)] bg-black flex items-center justify-center relative p-1">
                  <img
                    src="/gambar/pp-dev.png"
                    alt="✧･ﾟ: [𝙍]𝙝𝙢𝙏 | 𝘾𝙤𝙙𝙚⚙️𝘼𝙄 𝙡 :･ﾟ✧"
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase font-bold">[ SALURAN UTAMA // BROADCAST CHANNEL ]</span>
                  <h3 className="text-lg sm:text-xl font-display font-medium text-white tracking-wide glow-text-cyan leading-relaxed">
                    ✧･ﾟ: [𝙍]𝙝𝙢𝙏 | 𝘾𝙤𝙙𝙚⚙️𝘼𝙄 𝙡 :･ﾟ✧
                  </h3>
                </div>
              </div>

              <p className="text-xs text-zinc-450 leading-relaxed max-w-md mx-auto">
                Saluran interaktif R_HMT untuk share code menarik, info perkembangan teknologi AI terbaru, update & share tools web praktis, serta tips & trik dunia digital terhangat untuk semua kalangan.
              </p>

              {/* Big Join Button */}
              <div className="pt-2">
                <a
                  href="https://whatsapp.com/channel/0029VbBjyjlJ93wa6hwSWa0p"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] active:scale-95 transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer select-none font-mono text-xs uppercase font-extrabold tracking-widest rounded-xl"
                >
                  <WhatsappIcon className="w-4 h-4 text-white fill-current" /> GABUNG SALURAN
                </a>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COMMUNITIES.map((c, idx) => (
              <div key={c.name}>
                <InteractiveCommunityCard community={c} idx={idx} />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* People Detail Modal Dialog Popup */}
      {mounted && createPortal(
        <AnimatePresence>
          {selectedPerson && (
            <motion.div
              key="person-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 z-[99999]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#040911] border border-zinc-900 rounded-3xl p-6 sm:p-8 max-w-xs sm:max-w-md w-full relative shadow-[0_30px_70px_rgba(0,0,0,0.9)] overflow-hidden max-h-[92vh] flex flex-col justify-between"
              >
                {/* Scanline overlay */}
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent animate-scan shadow-[0_0_10px_#00f2fe]"></div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header/Identity */}
                <div className="flex flex-col items-center text-center mt-4">
                  <div className="w-20 h-20 rounded-full border-2 border-cyan-500/30 overflow-hidden mb-4 shadow-[0_0_20px_rgba(0,242,254,0.15)] bg-zinc-950 flex items-center justify-center relative">
                    {selectedPerson.avatar && !modalImageError ? (
                      <img
                        src={modalTriedBackup ? getImagePath(selectedPerson.avatar).replace("/gambar/", "/public/gambar/") : getImagePath(selectedPerson.avatar)}
                        onError={() => {
                          if (!modalTriedBackup) {
                            setModalTriedBackup(true);
                          } else {
                            setModalImageError(true);
                          }
                        }}
                        alt={selectedPerson.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center font-display font-bold text-2xl text-[#00f2fe] bg-zinc-950 w-full h-full uppercase select-none">
                        {selectedPerson.name.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xl font-display font-medium text-white tracking-wide glow-text-cyan">
                      {selectedPerson.name}
                    </h3>
                    <span className="text-xs font-mono text-cyan-500">@{selectedPerson.handle}</span>
                  </div>
                </div>

                {/* Action Buttons Link: Spanning structure to fill layout perfectly */}
                {selectedPerson.socials && selectedPerson.socials.length > 0 && (
                  <div className="mt-8 space-y-3">
                    <span className="text-[9px] font-mono text-zinc-500 tracking-widest uppercase block text-center font-bold">
                      SINKRONISASI HUB SOSIAL:
                    </span>
                    
                    {/* Grid Columns layout according to the number of social links */}
                    <div className={`grid gap-2.5 ${
                      selectedPerson.socials.length === 1 
                        ? "grid-cols-1" 
                        : selectedPerson.socials.length === 2 
                          ? "grid-cols-2" 
                          : selectedPerson.socials.length === 3 
                            ? "grid-cols-3" 
                            : "grid-cols-4"
                    }`}>
                      {selectedPerson.socials.map((social) => (
                        <button
                          key={social.platform}
                          onClick={() => setConfirmLink({ url: social.url, platform: social.platform })}
                          className="flex flex-col items-center justify-center gap-1.5 py-2.5 px-1 bg-black/40 hover:bg-[#031525]/80 hover:border-cyan-500/20 border border-zinc-900 rounded-xl text-center group transition-all cursor-pointer w-full"
                        >
                          <div className="p-1.5 bg-[#020509] border border-zinc-900 rounded-lg group-hover:border-cyan-500/20 flex items-center justify-center">
                            {renderSocialIcon(social.platform)}
                          </div>
                          <span className="text-[8px] sm:text-[9px] font-mono text-zinc-400 group-hover:text-white uppercase tracking-wider font-semibold truncate max-w-full">
                            {social.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Secure Seal */}
                <div className="mt-8 pt-4 border-t border-zinc-950 flex items-center justify-center gap-1.5 text-[8px] font-mono text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/40" />
                  <span>SECURE CRYPTO COMMUNICATION ACTIVE</span>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Reusable External Link Confirmation Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {confirmLink && (
            <motion.div
              key="confirm-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 z-[100000]"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-[#02050a] border border-[#00f2fe]/25 rounded-2xl p-6 max-w-xs w-full text-center relative shadow-[0_0_50px_rgba(0,242,254,0.15)] space-y-5"
              >
                <div className="w-12 h-12 rounded-full bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-center mx-auto text-[#00f2fe]">
                  {renderSocialIcon(confirmLink.platform)}
                </div>
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-widest text-[#00f2fe] uppercase font-bold">[ SISTEM KEAMANAN // LINK EKSTERNAL ]</h4>
                  <p className="text-[11px] text-zinc-450 leading-relaxed font-sans">
                    Apakah Anda yakin ingin dialihkan keluar portofolio menuju tautan <span className="text-white font-mono lowercase bg-zinc-950 px-1 border border-zinc-900 rounded">@{confirmLink.platform}</span> ini?
                  </p>
                </div>
                <div className="flex gap-2.5 pt-1">
                  <button
                    onClick={() => setConfirmLink(null)}
                    className="flex-1 py-2 border border-zinc-850 hover:border-zinc-700 bg-transparent text-zinc-400 hover:text-white rounded-xl text-[10px] font-mono uppercase tracking-wider cursor-pointer transition-all active:scale-95 duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      window.open(confirmLink.url, "_blank", "noopener,noreferrer");
                      setConfirmLink(null);
                    }}
                    className="flex-1 py-2 bg-cyan-500 text-black hover:bg-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] font-mono text-[10px] uppercase font-bold tracking-wider rounded-xl cursor-pointer transition-all active:scale-95 duration-200"
                  >
                    Lanjutkan
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
}

// 3D Interactive Card for People (Premium horizontal responsive layout)
function InteractivePersonCard({ person, index, onClick }: { person: Person; index: number; onClick: () => void }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [imageError, setImageError] = useState(false);
  const [triedBackup, setTriedBackup] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) - 0.5;
    const yPercent = (y / height) - 0.5;

    gsap.to(card, {
      rotateY: xPercent * 16,
      rotateX: -yPercent * 16,
      transformPerspective: 850,
      translateY: -4,
      scale: 1.01,
      duration: 0.35,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      translateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className="glow-card-cyan bg-zinc-950/45 rounded-2xl border border-zinc-900 p-6 sm:p-7 flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left relative overflow-hidden select-none cursor-pointer group shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:border-cyan-500/15"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Corner Brackets */}
      <div className="absolute top-3 left-3 text-[8px] font-mono text-zinc-600/60 select-none">NODE_0{index + 1}</div>
      <div className="absolute top-3 right-3 text-[8px] font-mono text-[#00f2fe]/40 select-none flex items-center gap-1">
        <Zap className="w-2 h-2 text-cyan-400 animate-pulse" /> SYNC
      </div>

      {/* Profile Photo Area */}
      <div className="relative shrink-0" style={{ transform: "translateZ(30px)" }}>
        <div className="w-18 h-18 rounded-full bg-[#03080e] border border-zinc-850 flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:border-[#00f2fe]/30 relative">
          {person.avatar && !imageError ? (
            <img
              src={triedBackup ? getImagePath(person.avatar).replace("/gambar/", "/public/gambar/") : getImagePath(person.avatar)}
              onError={() => {
                if (!triedBackup) {
                  setTriedBackup(true);
                } else {
                  setImageError(true);
                }
              }}
              alt={person.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center font-display font-bold text-xl text-cyan-400 bg-zinc-950 w-full h-full uppercase select-none">
              {person.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 flex-1" style={{ transform: "translateZ(15px)" }}>
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 justify-center sm:justify-start">
          <h4 className="text-base font-display font-medium text-white tracking-wide group-hover:text-cyan-300 transition-colors uppercase">
            {person.name}
          </h4>
          <span className="text-[10px] font-mono text-cyan-500/80 font-sans">@{person.handle}</span>
        </div>
        {person.role && (
          <p className="text-xs text-zinc-400 leading-relaxed max-w-md">
            {person.role}
          </p>
        )}
      </div>

      {/* Compact hover button trigger */}
      <div className="absolute bottom-3 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 text-[8px] font-mono text-cyan-400 tracking-widest uppercase hidden sm:block">
        [ OPEN CORE_LINK ]
      </div>
    </div>
  );
}

// 3D Interactive Card for Communities with embedded member list
function InteractiveCommunityCard({ community, idx }: { community: Community; idx: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [iconError, setIconError] = useState(false);
  const [triedBackup, setTriedBackup] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const { left, top, width, height } = card.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    const xPercent = (x / width) - 0.5;
    const yPercent = (y / height) - 0.5;

    gsap.to(card, {
      rotateY: xPercent * 16,
      rotateX: -yPercent * 16,
      transformPerspective: 800,
      translateY: -5,
      scale: 1.01,
      duration: 0.35,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      translateY: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  // Dynamic Image selection helper for WA style / static files
  const getCommunityIcon = () => {
    if (community.name === "HIRASAWA.ID") {
      return (
        <div className="w-12 h-12 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-center justify-center p-1 shadow-[0_0_15px_rgba(16,185,129,0.15)] relative group-hover:border-emerald-400 transition-all">
          <Megaphone className="w-5 h-5 text-emerald-400 animate-pulse" />
        </div>
      );
    }

    if (community.image && !iconError) {
      const imgPath = getImagePath(community.image);
      const finalUrl = triedBackup ? imgPath.replace("/gambar/", "/public/gambar/") : imgPath;
      return (
        <div className="w-12 h-12 rounded-xl border border-zinc-900 bg-[#030305] p-0.5 overflow-hidden flex items-center justify-center shadow-lg relative">
          <img
            src={finalUrl}
            onError={() => {
              if (!triedBackup) {
                setTriedBackup(true);
              } else {
                setIconError(true);
              }
            }}
            alt={community.name}
            className="w-full h-full object-contain opacity-90 group-hover:scale-105 transition-all duration-300"
          />
        </div>
      );
    }

    return (
      <div className="w-12 h-12 rounded-xl border border-zinc-900 bg-[#030305] flex items-center justify-center shadow-lg relative">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-xs font-mono text-zinc-500 w-full h-full">
          G_R_P
        </div>
      </div>
    );
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glow-card-cyan bg-zinc-950/20 border border-zinc-900 p-8 flex flex-col justify-between overflow-hidden relative group select-none rounded-2xl min-h-[350px]"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-950/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

      <div className="space-y-5">
        <div className="flex justify-between items-center">
          <span className="px-2.5 py-1 bg-cyan-950/15 text-[#00f2fe]/80 border border-cyan-500/10 rounded-lg text-[9px] font-mono tracking-widest font-bold uppercase">
            HUB_POINT 0{idx + 1}
          </span>
          <span className={`px-2 py-0.5 text-[8px] font-mono rounded border ${community.status === "Waiting Link" ? "border-amber-500/10 text-amber-500 bg-amber-950/10 animate-pulse" : "border-emerald-500/10 text-emerald-400 bg-emerald-950/10"}`}>
            {community.status}
          </span>
        </div>

        <div className="flex items-center gap-3.5" style={{ transform: "translateZ(25px)" }}>
          {getCommunityIcon()}
          <div>
            <h3 className="text-sm font-display font-medium text-white tracking-wider group-hover:text-accent-cyan transition-colors uppercase leading-tight">
              {community.name}
            </h3>
            <h4 className="text-[10px] text-[#00f2fe]/80 font-mono mt-0.5 uppercase tracking-wide leading-none">{community.title}</h4>
          </div>
        </div>

        <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">{community.tagline}</p>
      </div>

      {/* Embedded members section */}
      <div className="py-2.5 mt-4 space-y-1.5 border-t border-zinc-900/60" style={{ transform: "translateZ(10px)" }}>
        <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">
          COMMUNITY CAPACITY:
        </span>
        <div className="flex items-center gap-1.5 py-0.5">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
          <span className="text-xs font-sans font-semibold text-white tracking-wide uppercase">
            {community.memberCount || "100+ Member"}
          </span>
        </div>
      </div>

      {/* Bottom link hub */}
      <div className="pt-4 border-t border-zinc-950/80 mt-2 flex justify-between items-center text-[9px] font-mono text-zinc-500">
        <span className="uppercase tracking-widest text-[8px] font-sans">HUB_STATUS // GATE_OPEN</span>
        {community.url && community.url !== "#" ? (
          <a
            href={community.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-3 py-1.5 bg-[#031525] border border-cyan-500/20 text-[#00f2fe] hover:bg-[#00f2fe]/10 hover:border-[#00f2fe]/40 rounded-xl transition-all cursor-pointer font-bold select-none duration-300"
          >
            Gabung Grup <AnchorArrow />
          </a>
        ) : (
          <span className="text-zinc-750 select-none font-sans">[ SINKRONISASI CO-WORKER ]</span>
        )}
      </div>
    </div>
  );
}

// Simple link icon
function AnchorArrow() {
  return (
    <ArrowUpRight className="w-3 h-3 text-zinc-650 group-hover:text-accent-cyan group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all inline-block" />
  );
}
