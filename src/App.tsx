import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import HeroSection from "./components/HeroSection";
import JourneySection from "./components/JourneySection";
import EcosystemSection from "./components/EcosystemSection";
import ExplorationsSection from "./components/ExplorationsSection";
import AiSandbox from "./components/AiSandbox";
import PeopleAndCommunities from "./components/PeopleAndCommunities";
import FooterSection from "./components/FooterSection";
import { Sparkles, Command, Menu, X, ArrowUp, ArrowUpRight, Cpu, HelpCircle, Layers, Workflow, Compass, Network } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [scrollZone, setScrollZone] = useState<"explorer" | "builder" | "thinker">("explorer");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  // Premium UI Suggestions State Configuration (except #3)
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({ message: "", show: false });

  // Custom Toast Notification System
  const triggerToast = (message: string) => {
    setToast({ message, show: true });
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Dynamic Browser Tab Title listener (Visibility API)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Hei, kembali ke lab! 🧪";
      } else {
        document.title = "R_HMT Portfolio | Share Code, AI Tech & Web Tools";
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Catch custom toast show events from sub-components
  useEffect(() => {
    const handleShowToast = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        triggerToast(customEvent.detail);
      }
    };
    window.addEventListener("show-toast", handleShowToast);
    return () => window.removeEventListener("show-toast", handleShowToast);
  }, []);

  // Back to top scroll and progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(progress);
      }
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic GSAP scroll and active navigation tracking
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });

    // Lightweight Entrance triggers for all main sections to maximize scroll responsiveness
    const sections = document.querySelectorAll(".scroll-anim-section");
    sections.forEach((section) => {
      gsap.fromTo(section,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true, // Auto-kills trigger on completion to reclaim browser paint memory
          }
        }
      );

      // Parallax shifts on decorative items
      const floaters = section.querySelectorAll(".gsap-parallax");
      floaters.forEach((el) => {
        gsap.to(el, {
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          }
        });
      });
    });

    // Color transition of canvas element synchronized with ScrollTrigger
    const mainContainer = document.querySelector(".canvas-global");
    if (mainContainer) {
      // Zone 1: Explorer Cyan hue
      gsap.to(mainContainer, {
        backgroundColor: "#03080e", // Glacier Dark Blue
        scrollTrigger: {
          trigger: "#journey",
          start: "top 60%",
          end: "bottom 30%",
          scrub: true,
          onEnter: () => setScrollZone("explorer"),
          onEnterBack: () => setScrollZone("explorer")
        }
      });

      // Zone 2: Builder Cobalt hue
      gsap.to(mainContainer, {
        backgroundColor: "#050d18", // Cold Deep Metallic
        scrollTrigger: {
          trigger: "#ecosystem",
          start: "top 60%",
          end: "bottom 30%",
          scrub: true,
          onEnter: () => setScrollZone("builder"),
          onEnterBack: () => setScrollZone("builder")
        }
      });

      // Zone 3: Thinker Slate dark hue
      gsap.to(mainContainer, {
        backgroundColor: "#020408", // Space Void Grey
        scrollTrigger: {
          trigger: "#network",
          start: "top 60%",
          end: "bottom 20%",
          scrub: true,
          onEnter: () => setScrollZone("thinker"),
          onEnterBack: () => setScrollZone("thinker")
        }
      });
    }

    // Scroll progress bar indicator mapping
    gsap.to(".scroll-progress-indicator", {
      scaleX: 1,
      ease: "none",
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -100;
        const y = el.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>

      <div className="canvas-global min-h-screen text-white font-sans bg-black overflow-x-hidden relative">
      
      {/* Scroll Progress Neon indicator tracker */}
      <div className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-cyan-400 via-[#00f2fe] to-blue-500 scale-x-0 scroll-progress-indicator z-50"></div>

      {/* Floating Spatial Navigation Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl z-45 bg-black/60 backdrop-blur-2xl border border-zinc-900/80 px-6 py-4 rounded-full flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)]">
        
        {/* Core Identity Brand Signature */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2.5 cursor-pointer group animate-[fadeIn_0.5s_ease_out]"
        >
          <div className="w-8 h-8 rounded-full bg-[#03080e] border border-zinc-805 flex items-center justify-center overflow-hidden group-hover:border-accent-cyan transition-all relative shadow-[0_0_15px_rgba(0,242,254,0.1)]">
            <img 
              src="/gambar/pp-dev.png" 
              alt="Profil R_HMT" 
              className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="absolute font-display font-medium text-xs tracking-widest text-[#00f2fe] glow-text-cyan z-[-1]">R</span>
          </div>
          <span className="text-xs font-mono tracking-widest font-bold uppercase text-zinc-300 group-hover:text-white transition-colors">R_HMT OFC</span>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-[11px] font-mono text-zinc-500 uppercase tracking-widest">
          <button onClick={() => scrollToSection("journey")} className={`hover:text-accent-cyan cursor-pointer transition-colors ${scrollZone === "explorer" ? "text-cyan-300 font-bold" : ""}`}>KRONOLOGI</button>
          <button onClick={() => scrollToSection("ecosystem")} className={`hover:text-accent-cyan cursor-pointer transition-colors ${scrollZone === "builder" ? "text-cyan-300 font-bold" : ""}`}>EKOSISTEM</button>
          <button onClick={() => scrollToSection("explorations")} className="hover:text-accent-cyan cursor-pointer transition-colors">PROYEK</button>
          <button onClick={() => scrollToSection("ai-sandbox")} className="hover:text-accent-cyan cursor-pointer transition-colors text-[#00f2fe] font-bold">MUTASI_LAB</button>
          <button onClick={() => scrollToSection("network")} className={`hover:text-accent-cyan cursor-pointer transition-colors ${scrollZone === "thinker" ? "text-cyan-300 font-bold" : ""}`}>KOLABORATUR</button>
          <button onClick={() => scrollToSection("thinker")} className="hover:text-accent-cyan cursor-pointer transition-colors">ETHOS</button>
        </nav>

        {/* Action Button: Lab Quick Launch */}
        <div className="hidden md:block">
          <button
            onClick={() => scrollToSection("ai-sandbox")}
            className="px-4 py-2 border border-cyan-500/20 bg-accent-cyan/10 text-accent-cyan hover:bg-accent-cyan hover:text-black font-mono text-[10px] rounded-full uppercase tracking-widest cursor-pointer transition-all active:scale-95 duration-350 shadow-[0_0_15px_rgba(0,242,254,0.1)]"
          >
            MUTASI_LAB_ACTIVE
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-900 cursor-pointer"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

      </header>

      {/* Mobile Menu Panel Expansion */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 z-40 pt-32 px-10 flex flex-col space-y-6 text-lg font-display tracking-widest uppercase border-b border-zinc-900"
          >
            <button onClick={() => scrollToSection("journey")} className="text-left text-zinc-400 hover:text-white py-2">01 Kronologi</button>
            <button onClick={() => scrollToSection("ecosystem")} className="text-left text-zinc-400 hover:text-white py-2">02 Ekosistem</button>
            <button onClick={() => scrollToSection("explorations")} className="text-left text-zinc-400 hover:text-white py-2">03 Proyek</button>
            <button onClick={() => scrollToSection("ai-sandbox")} className="text-left text-[#00f2fe] glow-text-cyan py-2">04 Mutasi Lab</button>
            <button onClick={() => scrollToSection("network")} className="text-left text-zinc-400 hover:text-white py-2">05 Kolaboratur</button>
            <button onClick={() => scrollToSection("thinker")} className="text-left text-zinc-400 hover:text-white py-2">06 Ethos</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pages Content Sections */}
      <main>
        
        {/* HERO */}
        <HeroSection 
          onExploreJourney={() => scrollToSection("journey")} 
          onViewExplorations={() => scrollToSection("explorations")} 
          isSplashActive={showSplash}
        />

        {/* ZONE 1 - THE EXPLORER */}
        <JournalIndicator zone="explorer" label="ZONA_01 // PENJELAJAH TEKNOLOGI" icon={<Compass className="w-4 h-4 text-accent-cyan" />} />
        <div className="scroll-anim-section relative">
          <JourneySection />
        </div>

        {/* ZONE 2 - THE BUILDER */}
        <JournalIndicator zone="builder" label="ZONA_02 // SHARE CODE & AI WEB TOOLS" icon={<Cpu className="w-4 h-4 text-accent-cyan animate-pulse-slow" />} />
        
        <div className="scroll-anim-section relative">
          <EcosystemSection />
        </div>
        
        <div className="scroll-anim-section relative">
          <ExplorationsSection />
        </div>

        {/* Real-time Interactive Laboratory Section */}
        <div id="ai-sandbox" className="py-24 max-w-5xl mx-auto px-6 scroll-anim-section relative">
          <div className="text-center space-y-3 mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f2fe] bg-cyan-950/20 border border-cyan-500/10 px-3 py-1 rounded-full uppercase">[ MULTI-PANE SANDBOX // KANVAS EKSPERIMEN ]</span>
            <h2 className="text-5xl font-display font-medium text-white tracking-widest uppercase">MUTASI LAB CHAT</h2>
            <p className="text-sm text-zinc-500 max-w-lg mx-auto leading-relaxed">
              Uji coba simulasi pemikiran kognitif R_hmt serta pelajari filosofi building, teknologi, dan karyanya langsung bersama AI kembaran digitalnya.
            </p>
          </div>
          <AiSandbox />
        </div>

        {/* ZONE 3 - THE THINKER */}
        <JournalIndicator zone="thinker" label="ZONA_03 // KOSMOS FILOSOF" icon={<Network className="w-4 h-4 text-accent-cyan" />} />
        
        <div className="scroll-anim-section relative">
          <PeopleAndCommunities />
        </div>
        
        {/* Footers */}
        <FooterSection />

      </main>

      {/* Floating Back to Top with Scroll Progress Ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-zinc-950/80 backdrop-blur-md border border-cyan-500/20 text-cyan-400 hover:text-white flex items-center justify-center cursor-pointer z-50 hover:border-cyan-400/50 transition-all shadow-[0_0_20px_rgba(0,242,254,0.15)] group active:scale-95 select-none"
            aria-label="Back to top"
          >
            {/* SVG Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="rgba(255,255,255,0.03)"
                strokeWidth="2"
              />
              <circle
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#00f2fe"
                strokeWidth="2"
                strokeDasharray="100"
                strokeDashoffset={100 - scrollProgress}
                className="transition-all duration-75"
              />
            </svg>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sleek Futuristic Toast System */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9, x: "-50%" }}
            animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: "-50%" }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-3.5 bg-zinc-950/90 backdrop-blur-md border border-cyan-500/25 text-cyan-400 font-mono text-xs rounded-xl shadow-[0_10px_30px_rgba(0,242,254,0.15)] flex items-center gap-2.5 z-55"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </>
  );
}

// Micro Zone visual anchor separator
function JournalIndicator({ zone, label, icon }: { zone: string; label: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center py-12 relative select-none">
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-3 px-6 py-2 rounded-full bg-zinc-950 border border-zinc-900 shadow-xl z-10 transition-colors">
        {icon}
        <span className="text-[10px] font-mono tracking-widest text-[#00f2fe]/80 uppercase">{label}</span>
      </div>
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-zinc-900 to-transparent z-0"></div>
    </div>
  );
}
