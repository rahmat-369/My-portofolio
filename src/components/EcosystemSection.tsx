import React, { useState, useEffect, useRef } from "react";
import { ECOSYSTEM } from "../data";
import { Sparkles, HelpCircle, HardDrive, MessageSquare, Terminal, RefreshCw, Zap, Radio, Globe, Layers, Database, Code, Activity, Github, Command, Cpu, ShieldAlert, MonitorCheck, Network } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";

const BRAND_LOGOS: Record<string, string> = {
  "ChatGPT": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/chatgpt-icon.png",
  "Claude": "https://images.seeklogo.com/logo-png/55/2/claude-logo-png_seeklogo-554534.png",
  "Gemini": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Google_Gemini_icon_2025.svg/1280px-Google_Gemini_icon_2025.svg.png",
  "DeepSeek": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1GcM2cT29bqcJU1_O_IPmQQJ5ZXexPGd5Kv0kioZzMg&s=10",
  "Kimi": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/kimi-color.png",
  "Zhipu AI": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/dark/zhipu-color.png",
  "Copilot": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMFHPkh8jsdKgHWq00zaX4dkE1GS-utN968Q&s",
  "Codex": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD8yncmEusmOXNqagDyLcVr-InUiP3tPphQZ23ntnMNQ&s=10",
  "Lovable": "https://lovable.dev/img/logo/lovable-logo-icon.svg",
  "v0": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQS6wM-CYeh8ETUXHft5be0eP6PXqbjExv6hg&s",
  "Google AI Studio": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_AI_Studio_icon_%28May_2026%29.svg/960px-Google_AI_Studio_icon_%28May_2026%29.svg.png",
  "Devin": "https://pixello.co.in/wp-content/uploads/2025/11/devin-ai-logo.webp",
  "Railway": "https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/railway-infrastructure-platform-icon.png",
  "Supabase": "https://raw.githubusercontent.com/lobehub/lobe-icons/refs/heads/master/packages/static-png/light/supabase-color.png",
  "Netlify": "https://images.seeklogo.com/logo-png/47/3/netlify-icon-logo-png_seeklogo-477950.png",
  "VS Code": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Visual_Studio_Code_1.35_icon.svg/960px-Visual_Studio_Code_1.35_icon.svg.png",
  "Termux": "https://upload.wikimedia.org/wikipedia/commons/2/2f/Termux_logo.png",
  "Reqable": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTqQDReO8nJyvLg33Ak-uzHz6lmkrV-jvoWqO_E9LjAA&s=10",
  "Vercel": "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/vercel-logo-icon.png"
};

// Flatten all items from categories in ECOSYSTEM
interface FlattenedTool {
  name: string;
  description: string;
  iconName: string;
  category: "AI Tools" | "Builders" | "Infrastructure" | "Environment";
}

const ALL_TOOLS: FlattenedTool[] = [
  // Ring 1 (AI Tools)
  { name: "ChatGPT", description: "Penyelesaian masalah umum & verifikasi model penalaran kognitif.", iconName: "MessageSquareCode", category: "AI Tools" },
  { name: "Claude", description: "Analisis arsitektur sistem kompleks & rekonstruksi modular.", iconName: "Workflow", category: "AI Tools" },
  { name: "Gemini", description: "Analisis modalitas pengelihatan & pipeline penalaran cerdas.", iconName: "Sparkles", category: "AI Tools" },
  { name: "DeepSeek", description: "Pengujian fungsional kecepatan tinggi & penalaran logika murni.", iconName: "Brain", category: "AI Tools" },
  { name: "Kimi", description: "Ulasan berkas dokumen super panjang & sintesis data luas.", iconName: "FileSpreadsheet", category: "AI Tools" },
  { name: "Zhipu AI", description: "Model cerdas dwibahasa mutakhir untuk penalaran teks dan pemrosesan data mendalam.", iconName: "Sparkles", category: "AI Tools" },
  // Ring 2 (Builders)
  { name: "Copilot", description: "Suntikan pelengkapan kode otomatis langsung di editor.", iconName: "Terminal", category: "Builders" },
  { name: "Codex", description: "Perumusan blok kode sistem pemrograman tingkat dasar.", iconName: "Code", category: "Builders" },
  { name: "Lovable", description: "Pembuatan prototipe visual antarmuka klien super cepat.", iconName: "Layout", category: "Builders" },
  { name: "v0", description: "Pembuat rancangan kode komponen antarmuka modular instan.", iconName: "Layers", category: "Builders" },
  { name: "Google AI Studio", description: "Eksperimen langsung parameter API model-model Google secara penuh.", iconName: "Cpu", category: "Builders" },
  { name: "Devin", description: "Simulasi alur logis pengembang AI otonom multi-langkah.", iconName: "Binary", category: "Builders" },
  // Ring 3 (Infrastructure & Environment)
  { name: "Railway", description: "Penyedia server kontainer cerdas & database andal bagi sistem.", iconName: "Cloud", category: "Infrastructure" },
  { name: "Supabase", description: "Infrastruktur database PostgreSQL & listener real-time instant.", iconName: "Database", category: "Infrastructure" },
  { name: "Netlify", description: "Pengiriman CDN tepi berlatensi ultra rendah bagi frontend.", iconName: "Globe", category: "Infrastructure" },
  { name: "Vercel", description: "Platform deployment optimal terintegrasi dengan pipeline git modern.", iconName: "Vercel", category: "Infrastructure" },
  { name: "VS Code", description: "Lingkungan pengembangan terpadu penulisan baris kode pemrograman modern.", iconName: "Code", category: "Environment" },
  { name: "Termux", description: "Akses terminal shell Linux di perangkat mobile yang tangguh.", iconName: "Terminal", category: "Environment" },
  { name: "Reqable", description: "Inspeksi jaringan digital proxy penilai respons REST API.", iconName: "Activity", category: "Environment" }
];

export default function EcosystemSection() {
  const [hoveredTool, setHoveredTool] = useState<FlattenedTool | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const orbitalRef = useRef<HTMLDivElement>(null);

  // Group tools by orbital ring level
  const ring1Items = ALL_TOOLS.filter(t => t.category === "AI Tools"); // Inner Loop (r=95)
  const ring2Items = ALL_TOOLS.filter(t => t.category === "Builders"); // Middle Loop (r=160)
  const ring3Items = ALL_TOOLS.filter(t => t.category === "Infrastructure" || t.category === "Environment"); // Outer Loop (r=225)

  // Floating ambient drifts using GSAP
  useEffect(() => {
    if (!orbitalRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(".galaxy-core-glow", {
        scale: "random(0.9, 1.15)",
        opacity: "random(0.4, 0.75)",
        duration: 3,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }, orbitalRef);
    return () => ctx.revert();
  }, []);

  const getToolIcon = (name: string, iconName: string, active: boolean, isDetail: boolean = false) => {
    if (name === "Vercel") {
      if (isDetail) {
        return (
          <svg
            viewBox="0 0 512 512"
            className="w-7.5 h-7.5 text-white"
            fill="currentColor"
          >
            <path d="M256 48l240 416H16z" />
          </svg>
        );
      }
      return (
        <svg
          viewBox="0 0 512 512"
          className={`w-5.5 h-5.5 transition-all duration-300 ${active ? "text-white scale-120 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" : "text-zinc-150 group-hover:scale-115 group-hover:text-white"}`}
          fill="currentColor"
        >
          <path d="M256 48l240 416H16z" />
        </svg>
      );
    }

    if (name === "Railway") {
      const logoUrl = BRAND_LOGOS[name];
      if (isDetail) {
        return (
          <img
            src={logoUrl}
            alt={name}
            className="w-9 h-9 object-contain"
            onError={() => {
              setImageErrors(prev => ({ ...prev, [name]: true }));
            }}
            referrerPolicy="no-referrer"
          />
        );
      }
      return (
        <div className={`w-6.5 h-6.5 bg-white rounded-md flex items-center justify-center p-0.5 transition-all duration-300 ${active ? "scale-115 shadow-[0_0_12px_rgba(255,255,255,0.5)]" : "group-hover:scale-110"}`}>
          <img
            src={logoUrl}
            alt={name}
            className="w-4.5 h-4.5 object-contain"
            onError={() => {
              setImageErrors(prev => ({ ...prev, [name]: true }));
            }}
            referrerPolicy="no-referrer"
          />
        </div>
      );
    }

    if (BRAND_LOGOS[name] && !imageErrors[name]) {
      return (
        <img
          src={BRAND_LOGOS[name]}
          alt={name}
          className={`w-6.5 h-6.5 object-contain rounded-md transition-all duration-300 ${active ? 'scale-115 opacity-100 brightness-110 shadow-[0_0_12px_rgba(0,242,254,0.35)] ring-1 ring-cyan-400/20' : 'opacity-[0.80] group-hover:scale-110 group-hover:opacity-100'}`}
          onError={() => {
            setImageErrors(prev => ({ ...prev, [name]: true }));
          }}
          referrerPolicy="no-referrer"
        />
      );
    }

    const cls = `w-5.5 h-5.5 transition-all duration-300 ${active ? 'text-cyan-400 scale-115' : 'text-zinc-500 group-hover:text-cyan-300'}`;
    switch(iconName) {
      case "MessageSquareCode":
        return <MessageSquare className={cls} />;
      case "Workflow":
        return <Zap className={cls} />;
      case "Sparkles":
        return <Sparkles className={cls} />;
      case "Brain":
        return <Radio className={cls} />;
      case "FileSpreadsheet":
        return <HardDrive className={cls} />;
      case "Terminal":
        return <Terminal className={cls} />;
      case "Code":
        return <Code className={cls} />;
      case "Layout":
        return <Layers className={cls} />;
      case "Cpu":
        return <Cpu className={cls} />;
      case "Binary":
        return <Terminal className={cls} />;
      case "Cloud":
        return <Zap className={cls} />;
      case "Database":
        return <Database className={cls} />;
      case "Globe":
        return <Globe className={cls} />;
      case "Github":
        return <Github className={cls} />;
      case "Command":
        return <Command className={cls} />;
      case "Activity":
        return <Activity className={cls} />;
      default:
        return <HelpCircle className={cls} />;
    }
  };

  return (
    <section id="ecosystem" className="scroll-mt-24 pt-28 pb-20 px-4 xs:px-6 select-none bg-transparent min-h-screen flex flex-col justify-center relative overflow-hidden font-sans">
      
      {/* Visual cyber mesh space backdrop */}
      <div className="absolute inset-0 bg-transparent opacity-30 pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-cyan-500/3 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10 space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-[#00f2fe] bg-cyan-950/20 border border-cyan-500/10 px-3.5 py-1.5 rounded-full uppercase">[ 3D UNIFIED STELLAR CONSTELLATION ]</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-widest uppercase font-sans">DIGITAL ECOSYSTEM</h2>
          <p className="text-sm text-zinc-500 max-w-xl mx-auto leading-relaxed">
            Semua pipeline cerdas, model kognitif AI, infrastruktur server, dan terminal penunjang produktivitas R_hmt bersatu dalam sebuah simulasi Orbit Galaksi 3D terpadu.
          </p>
        </div>

        {/* Outer Grid: Galaxy on Left, Telemetry Terminal on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* LEFT: Core 3D Constellation (The Unified Galaxy Sphere) */}
          <div ref={orbitalRef} className="lg:col-span-7 flex justify-center items-center relative min-h-[380px] xs:min-h-[460px] sm:min-h-[520px] overflow-visible select-none">
            
            {/* The main circular viewport with custom scale for mobile compatibility */}
            <div className="relative w-[340px] h-[340px] xs:w-[420px] xs:h-[420px] sm:w-[500px] sm:h-[500px] rounded-full border border-zinc-950/20 flex items-center justify-center bg-black/5 leading-none transition-transform duration-300 scale-90 xs:scale-95 sm:scale-100">
              
              {/* Outer Decorative Universe Bounds */}
              <div className="absolute inset-0 rounded-full border border-zinc-900/30 border-dashed animate-[spin_100s_linear_infinite] pointer-events-none"></div>
              
              {/* CENTRAL COSMIC CORE NODE - GITHUB ICON */}
              <div className="w-[102px] h-[102px] rounded-full bg-[#030712] border-2 border-zinc-800 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(0,10,30,0.8)] z-30 group relative transition-all duration-500 hover:border-[#00f2fe]/40 hover:shadow-[0_0_35px_rgba(0,242,254,0.25)] cursor-pointer">
                <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[#060914] to-[#010204] -z-10"></div>
                <div className="absolute w-[85px] h-[85px] rounded-full bg-cyan-400/10 blur-lg pointer-events-none galaxy-core-glow"></div>
                
                {/* Glowing subtle ring */}
                <div className="absolute inset-0 rounded-full border border-cyan-500/15 animate-ping opacity-20 pointer-events-none"></div>

                <Github className="w-8 h-8 text-[#00f2fe] drop-shadow-[0_0_8px_rgba(0,242,254,0.4)] group-hover:scale-110 transition-transform duration-300" />
                <span className="text-[7.5px] font-mono text-zinc-500 mt-1 uppercase select-none tracking-widest font-extrabold group-hover:text-cyan-300 transition-colors">GITHUB_CORE</span>
              </div>

              {/* RANGKAIAN ORBIT 1 (INNER): AI Tools Orbit (Radius: 85px) - Slower Clockwise Spin */}
              <div className="absolute w-[170px] h-[170px] rounded-full border border-cyan-400/30 border-dashed animate-orbit-cw-slow pointer-events-none transform-gpu"></div>
              <div className="absolute w-[170px] h-[170px] rounded-full animate-orbit-cw-slow transform-gpu will-change-transform">
                {ring1Items.map((item, idx) => {
                  const angle = (idx * 360) / ring1Items.length;
                  const active = hoveredTool?.name === item.name;
                  return (
                    <div
                      key={item.name}
                      style={{
                        transform: `rotate(${angle}deg) translate(85px) rotate(${-angle}deg)`
                      }}
                      className="absolute left-[calc(50%-18px)] top-[calc(50%-18px)] pointer-events-auto"
                    >
                      <button
                        onMouseEnter={() => setHoveredTool(item)}
                        onMouseLeave={() => setHoveredTool(null)}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer z-20 ${active ? "bg-black border border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.5)] scale-115" : "bg-black/80 backdrop-blur border border-zinc-900 hover:border-cyan-500/20 hover:scale-105"}`}
                      >
                        {/* Inner icon reverse rotated to remain static upright */}
                        <div className="animate-orbit-cw-slow-reverse transform-gpu will-change-transform">
                          {getToolIcon(item.name, item.iconName, active)}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* RANGKAIAN ORBIT 2 (MIDDLE): Builders Engine Orbit (Radius: 150px) - Reverse Counter-Clockwise Spin */}
              <div className="absolute w-[300px] h-[300px] rounded-full border border-cyan-400/25 pointer-events-none transform-gpu"></div>
              <div className="absolute w-[300px] h-[300px] rounded-full animate-orbit-ccw-medium transform-gpu will-change-transform">
                {ring2Items.map((item, idx) => {
                  const angle = (idx * 360) / ring2Items.length;
                  const active = hoveredTool?.name === item.name;
                  return (
                    <div
                      key={item.name}
                      style={{
                        transform: `rotate(${angle}deg) translate(150px) rotate(${-angle}deg)`
                      }}
                      className="absolute left-[calc(50%-20px)] top-[calc(50%-20px)] pointer-events-auto"
                    >
                      <button
                        onMouseEnter={() => setHoveredTool(item)}
                        onMouseLeave={() => setHoveredTool(null)}
                        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer z-20 ${active ? "bg-black border border-cyan-400 shadow-[0_0_18px_rgba(0,242,254,0.5)] scale-115" : "bg-black/80 backdrop-blur border border-zinc-900 hover:border-cyan-500/20 hover:scale-105"}`}
                      >
                        <div className="animate-orbit-ccw-medium-reverse transform-gpu will-change-transform">
                          {getToolIcon(item.name, item.iconName, active)}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* RANGKAIAN ORBIT 3 (OUTER): Infrastructure & Terminal Shell Orbit (Radius: 215px) - Clockwise Slow Spin */}
              <div className="absolute w-[430px] h-[430px] rounded-full border border-cyan-500/20 border-dashed pointer-events-none transform-gpu"></div>
              <div className="absolute w-[430px] h-[430px] rounded-full animate-orbit-cw-very-slow transform-gpu will-change-transform">
                {ring3Items.map((item, idx) => {
                  const angle = (idx * 360) / ring3Items.length;
                  const active = hoveredTool?.name === item.name;
                  const btnBgClass = active 
                    ? "bg-black border border-cyan-500 shadow-[0_0_20px_rgba(0,242,254,0.55)] scale-115" 
                    : "bg-black/90 backdrop-blur-md border border-zinc-900 hover:border-cyan-500/20 hover:scale-105";

                  return (
                    <div
                      key={item.name}
                      style={{
                        transform: `rotate(${angle}deg) translate(215px) rotate(${-angle}deg)`
                      }}
                      className="absolute left-[calc(50%-21px)] top-[calc(50%-21px)] pointer-events-auto"
                    >
                      <button
                        onMouseEnter={() => setHoveredTool(item)}
                        onMouseLeave={() => setHoveredTool(null)}
                        className={`w-11 h-11 rounded-lg flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer z-20 ${btnBgClass}`}
                      >
                        <div className="animate-orbit-cw-very-slow-reverse transform-gpu will-change-transform">
                          {getToolIcon(item.name, item.iconName, active)}
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* RIGHT: High-tech Telemetry Connection Console (The Detailed Terminal) */}
          <div className="lg:col-span-5 w-full flex flex-col justify-stretch">
            
            <AnimatePresence mode="wait">
              {hoveredTool ? (
                <motion.div
                  key={hoveredTool.name}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25 }}
                  className="bg-black/60 border border-[#00f2fe]/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] min-h-[380px] flex flex-col justify-between"
                >
                  {/* Cyber matrix scanner grid overlay */}
                  <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent animate-scan shadow-[0_0_10px_#00f2fe]"></div>
                  
                  {/* Category Status & Brand Title */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900/60 pb-4">
                      <div>
                        <span className="text-[8px] font-mono text-zinc-400 block uppercase tracking-widest font-extrabold">COGNITIVE COMPONENT CATEGORY</span>
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-cyan-950/20 text-cyan-400 border border-cyan-500/10 rounded font-mono text-[9px] uppercase tracking-wider font-bold mt-1 shadow-[0_0_10px_rgba(0,242,254,0.05)]">
                          {hoveredTool.category}
                        </span>
                      </div>
                      <div className="bg-[#020408]/80 px-2.5 py-1 rounded border border-zinc-900 text-right leading-none select-none">
                        <span className="text-[7px] font-mono text-zinc-650 block">LINK STATE</span>
                        <span className="text-[10px] font-mono text-emerald-400 font-bold tracking-wider">[ SYNC_OK ]</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4.5 pt-1">
                      <div className={`w-14 h-14 rounded-xl border p-2 flex items-center justify-center shadow-xl select-none transition-colors duration-300 ${(hoveredTool.name === "Railway") ? "bg-white border-zinc-200" : "bg-black border-zinc-850"}`}>
                        {getToolIcon(hoveredTool.name, hoveredTool.iconName, true, true)}
                      </div>
                      <div>
                        <h4 className="text-xl font-display font-medium text-white uppercase tracking-wider">{hoveredTool.name}</h4>
                        <span className="text-[9px] font-mono text-zinc-500 block mt-0.5">ESTABLISHED CONNECTION STABLE</span>
                      </div>
                    </div>

                    {/* Rich description text */}
                    <p className="text-xs text-zinc-400 leading-relaxed font-sans pt-2">
                      {hoveredTool.description}
                    </p>
                  </div>

                  {/* High Tech Metrics Telemetry Block */}
                  <div className="space-y-3 pt-6 border-t border-zinc-950/80">
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest font-bold block mb-1">SYSTEM INSTANCE TELEMETRY LOG:</span>
                    <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                      <div className="bg-[#020509] p-2 rounded border border-zinc-900 flex justify-between items-center">
                        <span className="text-zinc-650">INTEGRATION:</span>
                        <span className="text-white font-bold select-none flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse"></span> FULL_STACK
                        </span>
                      </div>
                      <div className="bg-[#020509] p-2 rounded border border-zinc-900 flex justify-between items-center">
                        <span className="text-zinc-650">STABILITY_RATIO:</span>
                        <span className="text-[#00f2fe] font-bold">99.98%</span>
                      </div>
                      <div className="bg-[#020509] p-2 rounded border border-zinc-900 flex justify-between items-center">
                        <span className="text-zinc-650">KRNL_PORT:</span>
                        <span className="text-zinc-400 text-[8px]">LOCAL_PORT3000</span>
                      </div>
                      <div className="bg-[#020509] p-2 rounded border border-zinc-900 flex justify-between items-center">
                        <span className="text-zinc-650">RESPONSE:</span>
                        <span className="text-emerald-400 font-bold select-none">&lt; 15MS</span>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="default-overview"
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -25 }}
                  transition={{ duration: 0.25 }}
                  className="bg-[#040811]/45 border border-zinc-900 rounded-2xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-xl shadow-xl min-h-[380px] flex flex-col justify-between"
                >
                  {/* Subtle decorative pattern inside default panel */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/2 to-transparent pointer-events-none" />
                  
                  <div className="space-y-5">
                    <div className="flex items-center justify-between border-b border-zinc-900/40 pb-4">
                      <div>
                        <span className="text-[8px] font-mono text-zinc-600 block uppercase tracking-widest font-extrabold">ECOSYSTEM MONITOR DIALOGUE</span>
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-zinc-900 text-zinc-500 border border-zinc-850 rounded font-mono text-[8px] uppercase tracking-wider font-semibold mt-1">
                          System Active Offline
                        </span>
                      </div>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse-slow"></span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-sm font-mono text-[#00f2fe] uppercase tracking-widest font-bold flex items-center gap-1.5">
                        <Network className="w-4 h-4 text-[#00f2fe]" />
                        [ STELLAR SYSTEM OVERVIEW ]
                      </h4>
                      <p className="text-xs text-zinc-450 leading-relaxed font-sans">
                        Arahkan kursor Anda ke atom node ikon teknologi di dalam diagram untuk memeriksa, memetakan, dan memicu telemetri komponen asisten digital Vyna (R_hmt).
                      </p>
                    </div>

                    <div className="space-y-3 pt-2">
                      <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest">Core Structure Stats:</span>
                      <div className="space-y-1.5 font-mono text-[10px] text-zinc-400">
                        <div className="flex justify-between items-center border-b border-zinc-950 pb-1.5">
                          <span className="text-zinc-650">Total Connected Modules</span>
                          <span>19 Nodes Loaded</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-950 pb-1.5">
                          <span className="text-zinc-650">Stellar Galaxy Layers/Orbits</span>
                          <span>3 Orbital Rings</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-zinc-950 pb-1.5">
                          <span className="text-zinc-650">Current Primary Model</span>
                          <span className="text-[#00f2fe]">Gemini 3.5 Flash</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="pt-4 border-t border-zinc-950 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
                    <MonitorCheck className="w-4 h-4 text-emerald-500/50" />
                    <span>STABLE HOST SERVER INGRESS PORTS: OPEN</span>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
