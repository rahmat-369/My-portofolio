import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PROJECTS } from "../data";
import { Project } from "../types";
import { ExternalLink, Code, ArrowUpRight, Filter, Folder, X, Layers, AlertCircle, HelpCircle, Trophy, Sparkles, ChevronLeft, ChevronRight, Binary, Cpu, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";

export default function ExplorationsSection() {
  const [activeCategory, setActiveCategory] = useState<"All" | "Productivity" | "AI Tools" | "Utilities" | "Archive Experiments">("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = ["All", "Productivity", "AI Tools", "Utilities", "Archive Experiments"] as const;

  const filteredProjects = activeCategory === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const handlePrev = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
  };

  const handleNext = () => {
    if (filteredProjects.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const jumpToProject = (index: number) => {
    setCurrentIndex(index);
  };

  // Get surrounding items for 3D layout math
  const getProjectAtOffset = (offset: number) => {
    if (filteredProjects.length === 0) return null;
    const len = filteredProjects.length;
    const rawTarget = currentIndex + offset;
    const targetIdx = ((rawTarget % len) + len) % len;
    return { project: filteredProjects[targetIdx], index: targetIdx };
  };

  const leftObj = getProjectAtOffset(-1);
  const rightObj = getProjectAtOffset(1);
  const currentProj = filteredProjects[currentIndex] || null;

  return (
    <section id="explorations" className="py-32 px-6 select-none bg-transparent min-h-screen flex flex-col justify-center border-t border-zinc-950/60 relative overflow-hidden font-sans">
      
      {/* Background cyber space laser grid details */}
      <div className="absolute top-1/4 right-[5%] w-[500px] h-[500px] bg-[#00f2fe]/2 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-700/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      {/* Technical coordinate lines */}
      <div className="absolute left-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none hidden md:block"></div>
      <div className="absolute right-[8%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent pointer-events-none hidden md:block"></div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16 pb-6 border-b border-zinc-900/40">
          <div className="space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#00f2fe] bg-cyan-950/20 border border-cyan-500/10 px-3.5 py-1.5 rounded-full uppercase">[ PORTFOLIO 3D MATRIX // INTERAKTIF DECK ]</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-medium text-white tracking-widest uppercase">LABORATORIUM KARYA // PORTFOLIO</h2>
            <p className="text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed">
              Klik proyek background di kanan/kiri untuk memutar deck, klik bagian tengah untuk merobek kode, membelah arsitektur, dan membedah studi kasus mendalam.
            </p>
          </div>

          {/* Filtering buttons */}
          <div className="flex flex-wrap gap-1.5 bg-[#03070c]/95 border border-zinc-900 p-1.5 rounded-2xl backdrop-blur-xl">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${activeCategory === cat ? "bg-[#091b29] text-[#00f2fe] border border-cyan-500/25 font-bold" : "text-zinc-500 hover:text-zinc-350"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3D Carousel Stage */}
        <div className="relative w-full py-10 flex flex-col items-center">
          {filteredProjects.length === 0 ? (
            <div className="py-24 text-center space-y-4 border border-zinc-900/60 bg-[#020509]/30 rounded-3xl w-full max-w-xl">
              <Binary className="w-8 h-8 text-zinc-500 mx-auto animate-pulse" />
              <p className="font-mono text-zinc-400 text-xs uppercase tracking-widest">[ DECK KOSONG // SISTEM TIDAK MENEMUKAN DATA ]</p>
            </div>
          ) : (
            <>
              {/* Main Carousel viewport container */}
              <div 
                className="relative w-full max-w-4xl h-[460px] flex items-center justify-center animate-[fadeIn_0.5s_ease_out]"
                style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
              >
                {/* 1. LEFT BACKGROUND PROJECT CARD */}
                {leftObj && filteredProjects.length > 1 && (
                  <motion.div
                    key={`left-${leftObj.index}`}
                    onClick={() => jumpToProject(leftObj.index)}
                    className="absolute left-0 md:left-[5%] w-[85%] sm:w-[50%] md:w-[410px] h-[370px] select-none cursor-pointer group/left opacity-35 hover:opacity-75 z-10"
                    animate={{
                      x: "-30%",
                      rotateY: "26deg",
                      scale: 0.83,
                      z: "-140px"
                    }}
                    transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.8 }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="absolute inset-0 border border-cyan-500/5 bg-[#020408]/80 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-2xl pointer-events-none">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-650">
                          <span>{leftObj.project.category}</span>
                          <span>NODE_0{leftObj.index + 1}</span>
                        </div>
                        <h4 className="text-lg font-display font-medium text-zinc-350">{leftObj.project.name}</h4>
                        <p className="text-[11px] text-zinc-400 font-sans line-clamp-3">{leftObj.project.description}</p>
                      </div>
                      <div className="border-t border-zinc-900/50 pt-4 text-[10px] font-mono text-cyan-600 uppercase tracking-wider flex items-center justify-between">
                        <span>SWAP KE DEPAN</span>
                        <ChevronLeft className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 2. ACTIVE CENTER PROJECT CARD */}
                {currentProj && (
                  <motion.div
                    key={`center-${currentIndex}`}
                    onClick={() => setSelectedProject(currentProj)}
                    className="absolute w-[95%] sm:w-[70%] md:w-[460px] h-[410px] z-30 select-none cursor-pointer"
                    animate={{
                      x: "0%",
                      rotateY: "0deg",
                      scale: 1,
                      z: "50px"
                    }}
                    transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.8 }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    {/* Cyber High-Tech Border Container Decors */}
                    <div className="glow-card-cyan bg-gradient-to-b from-[#030c14] to-[#010408] rounded-3xl p-8 flex flex-col justify-between h-full relative border border-cyan-500/20 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_40px_rgba(0,242,254,0.06)] overflow-hidden">
                      
                      {/* Interactive scanning tech light laser effect */}
                      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#00f2fe] to-transparent animate-scan shadow-[0_0_10px_#00f2fe] z-20"></div>
                      
                      {/* Corner cybernetic bracket highlights */}
                      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-cyan-500/40 rounded-tl"></div>
                      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-cyan-500/40 rounded-tr"></div>
                      <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-cyan-500/40 rounded-bl"></div>
                      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500/40 rounded-br"></div>

                      <div className="space-y-6">
                        <div className="flex justify-between items-center text-xs font-mono">
                          <span className="text-[#00f2fe] bg-cyan-950/40 px-3 py-1 border border-cyan-500/15 rounded-lg font-bold uppercase tracking-widest text-[9px]">
                            {currentProj.category}
                          </span>
                          <span className="text-zinc-500 flex items-center gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                            NODE_0{currentIndex + 1}
                          </span>
                        </div>

                        <div className="space-y-3" style={{ transform: "translateZ(30px)" }}>
                          <h3 className="text-2xl sm:text-3xl font-display font-medium text-white tracking-wide glow-text-cyan flex items-center justify-between">
                            {currentProj.name}
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                          </h3>
                          <p className="text-xs text-zinc-400 font-sans leading-relaxed line-clamp-4 pt-1">
                            {currentProj.description}
                          </p>
                        </div>
                      </div>

                      {/* Stack tech list preview */}
                      <div className="mt-4 flex flex-wrap gap-1.5" style={{ transform: "translateZ(15px)" }}>
                        {currentProj.ecosystem.slice(0, 3).map((stack, sIdx) => (
                          <span key={sIdx} className="px-2.5 py-1 bg-black/40 border border-zinc-900 font-mono text-[9px] text-[#00f2fe]/70 rounded-md">
                            {stack}
                          </span>
                        ))}
                        {currentProj.ecosystem.length > 3 && (
                          <span className="px-2.5 py-1 bg-black/40 border border-zinc-900 font-mono text-[9px] text-zinc-400 rounded-md">
                            +{currentProj.ecosystem.length - 3} MORE
                          </span>
                        )}
                      </div>

                      {/* Interaction link trigger */}
                      <div className="pt-5 border-t border-zinc-900/60 mt-4 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                        <span className="font-bold tracking-widest uppercase text-cyan-400/80 group-hover/card:text-[#00f2fe] transition-colors">[ KLIK UNTUK MENCOBA ]</span>
                        <div className="w-6 h-6 rounded-full border border-cyan-500/20 flex items-center justify-center bg-cyan-950/10">
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#00f2fe]" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* 3. RIGHT BACKGROUND PROJECT CARD */}
                {rightObj && filteredProjects.length > 1 && (
                  <motion.div
                    key={`right-${rightObj.index}`}
                    onClick={() => jumpToProject(rightObj.index)}
                    className="absolute right-0 md:right-[5%] w-[85%] sm:w-[50%] md:w-[410px] h-[370px] select-none cursor-pointer group/right opacity-35 hover:opacity-75 z-10"
                    animate={{
                      x: "30%",
                      rotateY: "-26deg",
                      scale: 0.83,
                      z: "-140px"
                    }}
                    transition={{ type: "spring", stiffness: 110, damping: 20, mass: 0.8 }}
                    style={{
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="absolute inset-0 border border-cyan-500/5 bg-[#020408]/80 rounded-3xl p-6 flex flex-col justify-between backdrop-blur-sm shadow-2xl pointer-events-none">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-mono text-zinc-650">
                          <span>{rightObj.project.category}</span>
                          <span>NODE_0{rightObj.index + 1}</span>
                        </div>
                        <h4 className="text-lg font-display font-medium text-zinc-350">{rightObj.project.name}</h4>
                        <p className="text-[11px] text-zinc-400 font-sans line-clamp-3">{rightObj.project.description}</p>
                      </div>
                      <div className="border-t border-zinc-900/50 pt-4 text-[10px] font-mono text-cyan-600 uppercase tracking-wider flex items-center justify-between">
                        <span>SWAP KE DEPAN</span>
                        <ChevronRight className="w-4 h-4 animate-pulse" />
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* High-Tech HUD Navigation & Status Controls */}
              <div className="mt-8 flex flex-col items-center gap-6 w-full max-w-xl relative z-30">
                {/* Physical Controls */}
                <div className="flex items-center gap-6 bg-black/60 border border-zinc-900/80 py-3.5 px-6 rounded-full backdrop-blur-md shadow-lg">
                  <button
                    onClick={handlePrev}
                    className="p-2 border border-cyan-500/10 hover:border-cyan-500/30 bg-[#030911]/85 text-cyan-400 hover:text-white rounded-full transition-all active:scale-90 cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="text-center min-w-[130px] select-none">
                    <span className="block text-[10px] font-mono text-zinc-500 tracking-widest uppercase font-bold">[ ALIGNMENT ]</span>
                    <span className="font-mono text-xs text-[#00f2fe] font-semibold">
                      NODE_0{currentIndex + 1} // 0{filteredProjects.length}
                    </span>
                  </div>

                  <button
                    onClick={handleNext}
                    className="p-2 border border-cyan-500/10 hover:border-cyan-500/30 bg-[#030911]/85 text-cyan-400 hover:text-white rounded-full transition-all active:scale-90 cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Cyber Dot Indicators */}
                <div className="flex items-center gap-2">
                  {filteredProjects.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => jumpToProject(dotIdx)}
                      className={`h-1.5 transition-all duration-350 rounded-full cursor-pointer ${
                        currentIndex === dotIdx 
                          ? "w-8 bg-[#00f2fe] glow-text-cyan shadow-[0_0_8px_#00f2fe]" 
                          : "w-2 bg-zinc-800 hover:bg-zinc-650"
                      }`}
                    />
                  ))}
                </div>

                {/* Technical System Status Matrix block */}
                <div className="text-[10px] font-mono text-zinc-500 flex items-center gap-4 bg-[#03080e]/20 border border-cyan-500/5 px-4 py-2 rounded-xl">
                  <span>ORBIT_SWAP: <span className="text-cyan-400">ACTIVE</span></span>
                  <span className="text-zinc-800">|</span>
                  <span>MATRIX_DEPTH: <span className="text-cyan-400">3D_PERSPECTIVE</span></span>
                  <span className="text-zinc-800">|</span>
                  <span>RENDER_ANGLE: <span className="text-cyan-400">Y_28deg</span></span>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Card Detailed Dialog Modal Panel (Expanded State) */}
        {mounted && createPortal(
          <AnimatePresence>
            {selectedProject && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-[999999] font-sans">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="glow-card-cyan rounded-3xl bg-[#03060c] border border-cyan-500/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden w-full max-w-sm relative z-[1000000] p-6 space-y-5"
                >
                  
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00f2fe] animate-pulse"></span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">[ PORTAL LINK // EKSPERIMEN ]</span>
                    </div>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="p-1.5 text-zinc-500 hover:text-white rounded-lg hover:bg-zinc-900 cursor-pointer transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-2 text-center py-2">
                    <h3 className="text-xl font-display font-medium text-white tracking-wider glow-text-cyan">
                      {selectedProject.name}
                    </h3>
                    <p className="text-[11px] text-zinc-450 font-sans leading-relaxed">
                      Apakah Anda ingin dialihkan keluar dari portofolio untuk mengunjungi website proyek ini?
                    </p>
                  </div>

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="flex-1 py-2.5 border border-zinc-850 hover:border-zinc-700 bg-transparent text-zinc-400 hover:text-white rounded-xl text-xs font-mono uppercase tracking-wider cursor-pointer transition-all active:scale-95 duration-200"
                    >
                      Batal
                    </button>
                    {selectedProject.url !== "#" ? (
                      <a
                        href={selectedProject.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 py-2.5 bg-cyan-500 text-black hover:bg-[#00f2fe] hover:shadow-[0_0_15px_rgba(0,242,254,0.3)] font-mono text-xs uppercase font-bold tracking-wider rounded-xl text-center cursor-pointer transition-all active:scale-95 duration-200 flex items-center justify-center gap-1.5"
                      >
                        Buka Website <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="flex-1 py-2.5 bg-zinc-950 text-zinc-600 border border-zinc-900 font-mono text-xs uppercase tracking-wider rounded-xl cursor-not-allowed select-none"
                      >
                        Offline
                      </button>
                    )}
                  </div>

                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

      </div>
    </section>
  );
}
export { PROJECTS };
