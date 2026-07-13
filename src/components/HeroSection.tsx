import React, { useState, useEffect, useRef } from "react";
import { ArrowDown, CornerDownRight, Laptop, Play, Terminal, Eye, Code, ExternalLink, Sparkles, RefreshCw, Layers } from "lucide-react";
import { motion } from "motion/react";
import { gsap } from "gsap";

const roles = [
  "Technology Explorer",
  "vibe coders",
  "Web Tools & Utilities Creator",
  "AI Collaborator & Experimenter",
  "Self-taught Tech Builder"
];

function TerminalCodeSimulator() {
  const lines = [
    ">_ loading workspace compilers...",
    ">_ setting target directory: ~/r_hmt/digital_ecosystem",
    ">_ linking cognitive resources: Google Gemini AI [OK]",
    ">_ starting fast-iterative build engines...",
    ">_ compiling codebases...",
    "   - [1/4] TugasKu Pro premium workspace compiled successfully.",
    "   - [2/4] HD Upscale kognitif model upscaler compiled successfully.",
    "   - [3/4] Analisis Tanaman vision detector compiled successfully.",
    "   - [4/4] Repo Flow automation deployment pipeline compiled successfully.",
    ">_ deploy status: ALL SYSTEMS RUNNING STABLY IN PRODUCTION",
    ">_ [COMPILATION SUCCESSFUL]"
  ];

  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  useEffect(() => {
    setVisibleLines([]);
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        setVisibleLines(prev => [...prev, lines[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 450);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full p-5 text-zinc-300 font-mono text-[10px] leading-relaxed overflow-y-auto bg-black border border-zinc-900 rounded-xl select-text scrollbar-thin">
      <div className="text-[9px] text-zinc-650 border-b border-zinc-950 pb-2 mb-3 flex justify-between select-none">
        <span>CONSOLE // OUTPUT_BUILD_ENGINE</span>
        <span className="animate-pulse flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 block"></span>
          COMPILING_ACTIVE
        </span>
      </div>
      <div className="space-y-1">
        {visibleLines.map((line, idx) => (
          <p key={idx} className={(line && (line.includes("SUCCESSFUL") || line.includes("[OK]"))) ? "text-cyan-400 font-bold" : (line && (line.includes("TugasKu") || line.includes("HD Upscale") || line.includes("Analisis Tanaman") || line.includes("Repo Flow"))) ? "text-slate-100" : "text-zinc-400"}>
            {line}
          </p>
        ))}
        {visibleLines.length < lines.length && (
          <p className="text-cyan-400 animate-pulse">&gt;_ compiling...</p>
        )}
      </div>
    </div>
  );
}

export default function HeroSection({ 
  onExploreJourney, 
  onViewExplorations, 
  isSplashActive = false 
}: { 
  onExploreJourney: () => void; 
  onViewExplorations: () => void; 
  isSplashActive?: boolean; 
}) {
  const [activeScreenTab, setActiveScreenTab] = useState<"gateway" | "preview" | "code">("gateway");
  const [displayedText, setDisplayedText] = useState("");
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [wallpaperError, setWallpaperError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const container3D = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // Typing animation untuk "hi, im" dengan jeda di "hi,"
  useEffect(() => {
    if (isSplashActive) {
      setDisplayedText("");
      return;
    }
    
    let isMounted = true;
    let timeoutId: any;
    const sequence = ["h", "hi", "hi,", "hi, ", "hi, i", "hi, im", "hi, im "];
    let currentIndex = 0;

    const type = () => {
      if (!isMounted) return;
      if (currentIndex < sequence.length) {
        setDisplayedText(sequence[currentIndex]);
        const currentStr = sequence[currentIndex];
        
        let delay = 100; // Default typing speed
        // If we just typed "hi,", pause!
        if (currentStr === "hi,") {
          delay = 1000; // 1 second pause at "hi,"
        }
        
        currentIndex++;
        timeoutId = setTimeout(type, delay);
      }
    };

    type();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [isSplashActive]);

  // Animasi pergantian role dengan typing kustom (ada jeda natural)
  useEffect(() => {
    if (isSplashActive) {
      setDisplayedRole("");
      return;
    }
    const currentRole = roles[currentRoleIndex];
    let charIndex = 0;
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (!isMounted) return;
      if (charIndex <= currentRole.length) {
        setDisplayedRole(currentRole.slice(0, charIndex));
        const lastChar = currentRole.charAt(charIndex - 1);
        
        // Add pauses (jeda natural):
        // If space or special char, pause slightly longer, otherwise use variable delay
        let delay = 55 + Math.random() * 35; // baseline speed
        if (lastChar === " " || lastChar === "," || lastChar === "&") {
          delay = 250 + Math.random() * 80; // natural human pause
        }
        
        charIndex++;
        timeoutId = setTimeout(typeNextChar, delay);
      } else {
        // Tunggu 2.5 detik sebelum ganti role
        timeoutId = setTimeout(() => {
          if (isMounted) {
            setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
            setDisplayedRole("");
          }
        }, 2500);
      }
    };

    typeNextChar();

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [currentRoleIndex, isSplashActive]);

  // Mouse tilt 3D effect
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth) - 0.5;
      const yPercent = (clientY / innerHeight) - 0.5;

      if (container3D.current) {
        gsap.to(container3D.current, {
          rotateX: -yPercent * 25,
          rotateY: xPercent * 25,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.6
        });
      }

      if (infoRef.current) {
        gsap.to(infoRef.current, {
          x: xPercent * 15,
          y: yPercent * 15,
          ease: "power2.out",
          duration: 0.8
        });
      }
    };

    const handleMouseLeave = () => {
      if (container3D.current) {
        gsap.to(container3D.current, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      }
      if (infoRef.current) {
        gsap.to(infoRef.current, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hero) hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-32 pb-24 px-6 overflow-hidden bg-[#020205] select-none"
    >
      {/* High-Tech Grid Overlays to elevate visual depth (no more flat look) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0c152a_1px,transparent_1px),linear-gradient(to_bottom,#0c152a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-[0.35] pointer-events-none"></div>
      
      {/* 3D Perspective Grid Background (Cyber Space Grid) */}
      <div 
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 242, 254, 0.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 254, 0.18) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: "perspective(500px) rotateX(60deg) translateY(-10%) translateZ(-80px)",
          transformOrigin: "top center",
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 80%)"
        }}
      ></div>

      {/* Cyberpunk Floating Light Spheres */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[550px] h-[550px] bg-accent-cyan/15 rounded-full blur-[140px] pointer-events-none animate-pulse-slow"></div>
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-accent-blue/800 bg-cyan-950/10 rounded-full blur-[120px] pointer-events-none animate-pulse-slow"></div>

      {/* Ambient Radial Spotlight Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,242,254,0.02),transparent_40%)] pointer-events-none"></div>

      {/* Cyber Decorative Tech Brackets (Corners) */}
      <div className="absolute top-28 left-6 w-3 h-3 border-t-2 border-l-2 border-cyan-500/20 pointer-events-none hidden sm:block"></div>
      <div className="absolute top-28 right-6 w-3 h-3 border-t-2 border-r-2 border-cyan-500/20 pointer-events-none hidden sm:block"></div>
      <div className="absolute bottom-6 left-6 w-3 h-3 border-b-2 border-l-2 border-cyan-500/20 pointer-events-none hidden sm:block"></div>
      <div className="absolute bottom-6 right-6 w-3 h-3 border-b-2 border-r-2 border-cyan-500/20 pointer-events-none hidden sm:block"></div>

      {/* Futuristic Header Metadata Banner */}
      <div className="absolute top-28 left-6 right-6 flex justify-between items-center text-[9px] font-mono text-cyan-500/50 border-b border-zinc-900/60 pb-3 z-20 max-w-7xl mx-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse"></span>
          <span>SYSTEM_INIT // ONLINE_PROT: V2_SPATIAL</span>
        </div>
        <div className="tracking-widest">[ COGNITIVE CORE: ACTIVATED ]</div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10 mt-16 sm:mt-20 lg:mt-12 font-sans">
        
        {/* Left column: Epic Hero Typography */}
        <div ref={infoRef} className="lg:col-span-5 text-left space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={isSplashActive ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-black/90 border border-cyan-500/15 rounded-full shadow-[0_0_15px_rgba(0,242,254,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-ping"></span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00f2fe] font-bold">TECH SHARING & AI LAB</span>
          </motion.div>

          <div className="space-y-8">
            {/* Typing animation: "hi, im" + nama */}
            <div className="space-y-4 pb-3 pt-1">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                animate={isSplashActive ? { opacity: 0, scale: 0.95, filter: "blur(4px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.8, delay: 0.05 }}
                className="text-3xl sm:text-5xl font-display font-medium text-zinc-500 leading-relaxed"
              >
                <span className="tracking-widest">{displayedText}</span>
                {!isSplashActive && <span className="animate-blink font-mono text-cyan-400 ml-0.5 select-none">_</span>}
              </motion.h1>
              <h1 className="text-6xl sm:text-8xl font-display font-black tracking-widest leading-none pb-2 filter drop-shadow-[0_0_15px_rgba(0,242,254,0.15)] select-text flex flex-wrap">
                {"R_HMT".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                    animate={isSplashActive ? { opacity: 0, y: 20, filter: "blur(6px)" } : { opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 0.7, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block bg-gradient-to-r from-white via-cyan-100 to-[#9ca3af] bg-clip-text text-transparent"
                  >
                    {char
                    }
                  </motion.span>
                ))}
              </h1>
            </div>
            
            {/* Animasi role berganti */}
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              animate={isSplashActive ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-lg font-mono font-medium text-accent-cyan uppercase tracking-widest glow-text-cyan flex items-center gap-1.5 min-h-[32px] mt-8 pt-3 relative"
            >
              &gt; {displayedRole}
              {!isSplashActive && <span className="animate-[pulse_0.8s_infinite] text-[#00f2fe] font-bold">|</span>}
            </motion.h2>
 
            {/* Deskripsi dengan tambahan text requirement */}
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={isSplashActive ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xs sm:text-sm text-zinc-400 max-w-sm leading-relaxed mt-8 pt-3"
            >
              Saya (Rohmatulloh) seorang pelajar MA yang gemar berbagi source code menarik, info perkembangan teknologi AI terbaru, update & share tools web praktis, serta melakukan eksplorasi digital <span className="text-[#00f2fe]">secara otodidak & mandiri</span>.
            </motion.p>
          </div>

          {/* Action Hub */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isSplashActive ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              onClick={onExploreJourney}
              className="px-6 py-3 bg-white text-black text-xs font-mono uppercase font-bold tracking-widest rounded-xl hover:bg-accent-cyan hover:shadow-[0_0_20px_rgba(0,242,254,0.4)] cursor-pointer transition-all active:scale-95 flex items-center gap-2 border border-transparent"
            >
              KRONOLOGI <ArrowDown className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={onViewExplorations}
              className="px-6 py-3 border border-zinc-900 hover:border-accent-cyan text-white text-xs font-mono uppercase font-bold tracking-widest rounded-xl cursor-pointer transition-all active:scale-95 flex items-center gap-2 bg-black/40 backdrop-blur-md"
            >
              LIHAT EKSPERIMEN <Play className="w-3 h-3 text-[#00f2fe]" />
            </button>
          </motion.div>
        </div>

        {/* Right column: Responsive Interactive 3D Spatial Frame with unified tab navigation */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center w-full overflow-hidden mt-16 sm:mt-24 lg:mt-12">
          
          {/* Tabbed Virtual OS Glass Frame */}
          <div 
            ref={container3D} 
            className="w-full max-w-[620px] transition-all duration-300 relative px-1 sm:px-0 mt-8 lg:mt-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Background 3D Depth Rings */}
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-tr from-accent-cyan/10 via-zinc-950/20 to-accent-blue/10 blur-xl opacity-80 pointer-events-none" style={{ transform: "translateZ(-40px)" }}></div>

            {/* Simulated Desktop Glass Frame */}
            <div 
              className="bg-black/40 border border-zinc-850 rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-xl relative"
              style={{ transform: "translateZ(0px)" }}
            >
              
              {/* Screen Top Header Controls */}
              <div className="flex bg-zinc-950/85 border-b border-zinc-900/60 px-4 py-3.5 items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block"></span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-400 tracking-wider font-bold">R_HMT // VIRTUAL_OS</span>
                </div>
                
                {/* Visual Tab Selection */}
                <div className="flex bg-[#070707] p-1 rounded-lg border border-zinc-900 overflow-x-auto whitespace-nowrap scrollbar-none max-w-[240px] xs:max-w-xs sm:max-w-full">
                  <button 
                    onClick={() => setActiveScreenTab("gateway")}
                    className={`px-3 py-1 rounded-md text-[9px] font-mono tracking-wider cursor-pointer transition-all ${activeScreenTab === "gateway" ? "bg-zinc-900 text-[#00f2fe] font-bold shadow-[0_0_10px_rgba(0,242,254,0.1)] border border-cyan-500/10" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    <Layers className="w-3 h-3 inline-block mr-1" /> <span className="inline text-[8px] xs:text-[9.5px]">MY PHOTO</span>
                  </button>
                  <button 
                    onClick={() => setActiveScreenTab("preview")}
                    className={`px-3 py-1 rounded-md text-[9px] font-mono tracking-wider cursor-pointer transition-all ${activeScreenTab === "preview" ? "bg-zinc-900 text-[#00f2fe] font-bold shadow-[0_0_10px_rgba(0,242,254,0.1)] border border-cyan-500/10" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    <Eye className="w-3 h-3 inline-block mr-1" /> <span className="inline text-[8px] xs:text-[9.5px]">VISUAL_DESK</span>
                  </button>
                  <button 
                    onClick={() => setActiveScreenTab("code")}
                    className={`px-3 py-1 rounded-md text-[9px] font-mono tracking-wider cursor-pointer transition-all ${activeScreenTab === "code" ? "bg-zinc-900 text-[#00f2fe] font-bold shadow-[0_0_10px_rgba(0,242,254,0.1)] border border-cyan-500/10" : "text-zinc-500 hover:text-zinc-300"}`}
                  >
                    <Code className="w-3 h-3 inline-block mr-1" /> <span className="inline text-[8px] xs:text-[9.5px]">CODE_ENGINE</span>
                  </button>
                </div>
              </div>

              {/* Screen Screen Viewer */}
              <div className="aspect-auto min-h-[320px] sm:aspect-[16/11] sm:min-h-0 relative overflow-y-auto lg:overflow-hidden bg-[#020204] flex items-stretch p-4 scrollbar-none">
                
                {activeScreenTab === "gateway" && (
                  <div className="w-full h-full relative min-h-[280px] sm:min-h-0" style={{ transform: "translateZ(30px)" }}>
                    {!wallpaperError ? (
                      <img 
                        src="/gambar/pp.png"
                        alt="My Photo Horizontal 16:9"
                        className="w-full h-full object-contain rounded-xl border border-zinc-900/60 transition-all duration-500 bg-black/40"
                        onError={() => {
                          setWallpaperError(true);
                        }}
                      />
                    ) : (
                      /* Modern horizontal fallback */
                      <div 
                        className="absolute inset-0 bg-gradient-to-tr from-[#02050a] to-[#0a1122] flex flex-col items-center justify-center p-6 text-center space-y-4 rounded-xl border border-zinc-900"
                      >
                        <div className="relative">
                          <div className="w-24 h-12 rounded-lg border border-cyan-500/30 bg-cyan-950/20 flex items-center justify-center backdrop-blur shadow-[0_0_20px_rgba(0,242,254,0.15)] font-mono text-[9px] text-[#00f2fe] tracking-widest font-extrabold pb-0.5">VIRTUAL OS</div>
                        </div>
                        <div>
                          <p className="font-mono text-[10px] text-zinc-100 uppercase tracking-widest font-bold">R_HMT // PORTAL GATEWAY</p>
                          <p className="font-mono text-[8px] text-zinc-400 mt-1 uppercase">16:9 AMBIENT PHOTO LOADED</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeScreenTab === "preview" && (
                  <div className="w-full h-full flex flex-col-reverse sm:flex-row gap-4 text-white relative overflow-y-auto sm:overflow-visible scrollbar-none">
                    
                    {/* Retro IDE Frame */}
                    <div className="w-full sm:w-1/2 shrink-0 sm:shrink bg-[#050508]/90 border border-zinc-900 rounded-xl p-4 flex flex-col justify-between font-mono text-[9px] text-zinc-400 select-none shadow-inner animate-[fadeIn_0.5s_ease_out]">
                      <div>
                        <div className="text-zinc-500 border-b border-zinc-950 pb-2 mb-2 flex justify-between items-center text-[7px] font-bold">
                          <span>IDE // CORE_AGENT.TSX</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 block"></span>
                        </div>
                        <div className="space-y-1.5 overflow-y-auto max-h-[170px] leading-relaxed select-text scrollbar-thin">
                          <p className="text-purple-400">import <span className="text-zinc-100">React</span> from <span className="text-emerald-400">"react"</span>;</p>
                          <p className="text-purple-400">import <span className="text-zinc-100">{"{ motion }"}</span> from <span className="text-cyan-400">"motion/react"</span>;</p>
                          <p className="text-zinc-550">// Representasi Visual Desk</p>
                          <p className="text-amber-300">export default function <span className="text-blue-400">ProfileWorkspace</span>() {"{"}</p>
                          <p className="pl-3 text-purple-400">return (</p>
                          <p className="pl-6 text-zinc-300">&lt;<span className="text-cyan-400">motion.div</span> className=<span className="text-emerald-400">"card"</span>&gt;</p>
                          <p className="pl-9 text-zinc-300">&lt;<span className="text-cyan-400">img</span> src=<span className="text-emerald-400">"/gambar/pp-dev.png"</span> /&gt;</p>
                          <p className="pl-9 text-zinc-300">&lt;<span className="text-cyan-400">h3</span>&gt;R_hmt&lt;/<span className="text-cyan-400">h3</span>&gt;</p>
                          <p className="pl-9 text-zinc-300">&lt;<span className="text-cyan-400">span</span>&gt;ACTIVE ARCHITECT&lt;/<span className="text-cyan-400">span</span>&gt;</p>
                          <p className="pl-6 text-zinc-300">&lt;/<span className="text-cyan-400">motion.div</span>&gt;</p>
                          <p className="pl-3 text-purple-450">);</p>
                          <p className="text-amber-300">{"}"}</p>
                        </div>
                      </div>
                      <div className="text-[7px] bg-black/40 px-2 py-1 rounded text-zinc-400 flex justify-between items-center border border-zinc-900/60 mt-2">
                        <span>Line 42 // UTF-8</span>
                        <span className="text-cyan-400">React TSX</span>
                      </div>
                    </div>

                    {/* Snapshot / Mirror photo frame block */}
                    <div className="w-full sm:w-1/2 shrink-0 sm:shrink flex items-center justify-center relative min-h-[220px] sm:min-h-0" style={{ transform: "translateZ(40px)" }}>
                      <div className="w-full max-w-[195px] rounded-xl bg-zinc-900/40 border border-zinc-800 p-1 pb-2 flex flex-col shadow-2xl relative select-none">
                        
                        <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-950 mb-1">
                          <span className="text-[7.5px] font-mono text-zinc-500 uppercase">PROFILE_WORKSPACE // PP-DEV.PNG</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan block"></span>
                        </div>
                        
                        <div className="relative aspect-square bg-[#050508] rounded-lg overflow-hidden flex items-center justify-center">
                           {!avatarError ? (
                            <img
                              src="/gambar/pp-dev.png"
                              onError={() => {
                                setAvatarError(true);
                              }}
                              alt="1:1 Profile of R_hmt"
                              className="w-full h-full object-contain opacity-95 transition-all duration-500"
                            />
                          ) : (
                            /* Modern cyber avatar fallback design */
                            <div 
                              className="absolute inset-0 bg-gradient-to-tr from-[#030308] to-[#12001a] flex flex-col items-center justify-center p-4 text-center space-y-3"
                            >
                              <div className="relative animate-pulse">
                                <div className="w-12 h-12 rounded-full border border-[#00f2fe]/20 bg-cyan-950/20 flex items-center justify-center backdrop-blur shadow-[0_0_15px_rgba(0,242,254,0.15)]">
                                  <span className="font-display font-bold text-accent-cyan tracking-wider text-sm glow-text-cyan">R</span>
                                </div>
                              </div>
                              <div>
                                <p className="font-mono text-[9px] text-zinc-100 uppercase tracking-widest font-bold">R_HMT</p>
                                <p className="font-mono text-[7px] text-zinc-400 mt-1 uppercase">ACTIVE ARCHITECT</p>
                              </div>
                            </div>
                          )}

                          {/* Futuristic Scanner overlay */}
                          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-[#00f2fe]/60 shadow-[0_0_10px_#00f2fe] animate-[bounce_3s_infinite] pointer-events-none"></div>
                        </div>

                        {/* Code output text that matches the IDE representation on the left */}
                        {!avatarError && (
                          <div className="mt-2 text-center py-1 border-t border-zinc-950/40">
                            <h3 className="text-zinc-100 font-bold text-[10px] tracking-wider uppercase font-mono leading-none">R_hmt</h3>
                            <span className="text-accent-cyan text-[7.5px] tracking-widest uppercase font-mono block mt-1.5 leading-none">ACTIVE ARCHITECT</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Integrated visual frame overlay */}
                    <div className="absolute bottom-1 right-1 left-1 bg-[#010103]/90 border border-zinc-900/60 p-2.5 rounded-lg flex items-center justify-between text-[8px] font-mono text-zinc-400 z-10 backdrop-blur select-none hidden sm:flex">
                      <div className="flex items-center gap-2">
                        <Terminal className="w-3 h-3 text-cyan-400" />
                        <span>RUNTIME ACTIVE: EDGE_SHIELD_PROT_3000</span>
                      </div>
                      <span className="font-bold text-cyan-300">[ STATUS: GREEN ]</span>
                    </div>

                  </div>
                )}

                {activeScreenTab === "code" && (
                  /* Screen Raw Code Option with typing terminal simulation */
                  <TerminalCodeSimulator />
                )}

              </div>
            </div>

            {/* Futuristic laptop metal joint base */}
            <div className="w-[102%] -ml-[1%] h-2.5 bg-zinc-900 rounded-b-xl border border-t-0 border-zinc-800 shadow-xl relative z-0">
              <div className="absolute left-1/2 -translate-x-1/2 w-20 h-1 bg-zinc-950 rounded-b-md"></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
