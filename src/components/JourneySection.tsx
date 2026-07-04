import React from "react";
import { JOURNEY_STEPS } from "../data";
import { Orbit, Compass, Cpu, Bookmark, Code, Terminal, Sparkles, ArrowDown, ChevronRight, Smartphone, Laptop, GraduationCap } from "lucide-react";
import { motion } from "motion/react";

export default function JourneySection() {
  const getIconForStep = (phase: string) => {
    if (phase.includes("Phase 1")) return <Sparkles className="w-5 h-5 text-amber-400" />;
    if (phase.includes("Phase 2")) return <Bookmark className="w-5 h-5 text-cyan-400" />;
    if (phase.includes("Phase 3")) return <Cpu className="w-5 h-5 text-indigo-400" />;
    if (phase.includes("Phase 4")) return <Compass className="w-5 h-5 text-emerald-400" />;
    if (phase.includes("Phase 5")) return <Terminal className="w-5 h-5 text-rose-400" />;
    return <Orbit className="w-5 h-5 text-violet-400" />; // Phase 6
  };

  const getColorForStep = (phase: string) => {
    if (phase.includes("Phase 1")) return {
      border: "border-amber-950/40 hover:border-amber-500/30",
      text: "text-amber-400",
      bg: "from-amber-500/5 to-transparent",
      badge: "bg-amber-950/25 border-amber-500/10 text-amber-400",
      glow: "rgba(245, 158, 11, 0.08)",
      dot: "bg-amber-500",
      ring: "group-hover:border-amber-500/40",
      glowLine: "from-amber-500/30 via-amber-500/20 to-transparent"
    };
    if (phase.includes("Phase 2")) return {
      border: "border-cyan-950/40 hover:border-cyan-500/30",
      text: "text-cyan-400",
      bg: "from-cyan-500/5 to-transparent",
      badge: "bg-cyan-950/25 border-cyan-500/10 text-cyan-400",
      glow: "rgba(6, 182, 212, 0.08)",
      dot: "bg-cyan-500",
      ring: "group-hover:border-cyan-500/40",
      glowLine: "from-cyan-500/30 via-cyan-500/20 to-transparent"
    };
    if (phase.includes("Phase 3")) return {
      border: "border-indigo-950/40 hover:border-indigo-500/30",
      text: "text-indigo-400",
      bg: "from-indigo-500/5 to-transparent",
      badge: "bg-indigo-950/25 border-indigo-500/10 text-indigo-400",
      glow: "rgba(99, 102, 241, 0.08)",
      dot: "bg-indigo-500",
      ring: "group-hover:border-indigo-500/40",
      glowLine: "from-indigo-500/30 via-indigo-500/20 to-transparent"
    };
    if (phase.includes("Phase 4")) return {
      border: "border-emerald-950/40 hover:border-emerald-500/30",
      text: "text-emerald-400",
      bg: "from-emerald-500/5 to-transparent",
      badge: "bg-emerald-950/25 border-emerald-500/10 text-emerald-400",
      glow: "rgba(16, 185, 129, 0.08)",
      dot: "bg-emerald-500",
      ring: "group-hover:border-emerald-500/40",
      glowLine: "from-emerald-500/30 via-emerald-500/20 to-transparent"
    };
    if (phase.includes("Phase 5")) return {
      border: "border-rose-950/40 hover:border-rose-500/30",
      text: "text-rose-400",
      bg: "from-rose-500/5 to-transparent",
      badge: "bg-rose-950/25 border-rose-500/10 text-rose-400",
      glow: "rgba(244, 63, 94, 0.08)",
      dot: "bg-rose-500",
      ring: "group-hover:border-rose-500/40",
      glowLine: "from-rose-500/30 via-rose-500/20 to-transparent"
    };
    return {
      border: "border-violet-950/40 hover:border-violet-500/30",
      text: "text-violet-400",
      bg: "from-violet-500/5 to-transparent",
      badge: "bg-violet-950/25 border-violet-500/10 text-violet-400",
      glow: "rgba(139, 92, 246, 0.08)",
      dot: "bg-violet-500",
      ring: "group-hover:border-violet-500/40",
      glowLine: "from-violet-500/30 via-violet-500/20 to-transparent"
    };
  };

  return (
    <section id="journey" className="py-24 sm:py-32 px-4 xs:px-6 select-none bg-transparent min-h-screen flex flex-col justify-center relative overflow-hidden font-sans">
      
      {/* Glow background effects (Highly performant, static blurred elements) */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-cyan-500/3 rounded-full blur-[140px] pointer-events-none transform-gpu"></div>
      <div className="absolute bottom-0 left-10 w-[450px] h-[450px] bg-amber-500/3 rounded-full blur-[160px] pointer-events-none transform-gpu"></div>

      <div className="max-w-4xl mx-auto w-full relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20 sm:mb-28">
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-widest text-amber-500 bg-amber-950/20 border border-amber-500/15 px-3 py-1 rounded-full uppercase">
            [ THE EXPERIENCE PATHWAY // ALUR PERJALANAN ]
          </span>
          <h2 className="text-3xl xs:text-4xl sm:text-5xl font-display font-medium text-white tracking-widest uppercase">
            THE JOURNEY
          </h2>
          <p className="text-xs sm:text-sm text-zinc-450 max-w-xl mx-auto leading-relaxed px-2">
            Menelusuri kronologi eksplorasi teknologi R_HMT secara berurutan. Setiap langkah adalah fase pembelajaran berkelanjutan menuju sistem arsitektur modern.
          </p>
          
          <div className="flex justify-center pt-4">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="text-zinc-650 flex flex-col items-center gap-1.5"
            >
              <span className="text-[9px] font-mono tracking-widest uppercase text-zinc-500">SCROLL DOWN TO TRACE</span>
              <ArrowDown className="w-4 h-4 text-amber-500/55" />
            </motion.div>
          </div>
        </div>

        {/* Vertical Timeline Path */}
        <div className="relative ml-2 xs:ml-4 sm:ml-8 pl-6 xs:pl-8 sm:pl-12 space-y-12 sm:space-y-16 py-4">
          
          {/* Main vertical ambient light beam (High performance gradient line) */}
          <div className="absolute left-0 top-0 bottom-0 w-[1.5px] bg-gradient-to-b from-amber-500/40 via-cyan-500/30 to-violet-500/40 transform-gpu"></div>

          {JOURNEY_STEPS.map((step, idx) => {
            const colors = getColorForStep(step.phase);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="relative group transform-gpu will-change-[transform,opacity]"
              >
                {/* Timeline node marker circle with glow and transition */}
                <div className="absolute -left-[31px] xs:-left-[39px] sm:-left-[55px] top-4 z-15 flex items-center justify-center">
                  <div className="relative flex items-center justify-center">
                    {/* Ring aura */}
                    <div className={`absolute w-8 h-8 rounded-full bg-black border border-zinc-900 group-hover:border-zinc-750 transition-all duration-300 ${colors.ring}`}></div>
                    
                    {/* Pulsing colored center */}
                    <div className="w-5 h-5 rounded-full bg-zinc-950 border border-zinc-850 flex items-center justify-center z-10 group-hover:scale-115 transition-all duration-300">
                      <div className={`w-2 h-2 rounded-full ${colors.dot} group-hover:scale-110 transition-transform duration-300`}></div>
                    </div>
                    
                    {/* Glowing active glow aura */}
                    <div className="absolute -inset-1.5 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: colors.glow }}></div>
                  </div>
                </div>

                {/* Main Content Card */}
                <div className={`relative rounded-2xl bg-zinc-950/50 border ${colors.border} p-5 xs:p-6 sm:p-8 hover:bg-zinc-950/80 transition-all duration-500 shadow-xl overflow-hidden group`}>
                  
                  {/* Glowing card border corner light effect (GPU-friendly radial gradient) */}
                  <div 
                    className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl opacity-0 group-hover:opacity-100 pointer-events-none rounded-bl-full transition-opacity duration-700" 
                    style={{ background: `radial-gradient(circle at top right, ${colors.glow} 0%, transparent 75%)` }}
                  ></div>

                  {/* Step Metadata Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 mb-5 border-b border-zinc-900/60">
                    <div className="flex items-center gap-3.5">
                      <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-850 shadow-inner flex items-center justify-center shrink-0">
                        {getIconForStep(step.phase)}
                      </div>
                      <div>
                        <span className={`text-[9px] font-mono uppercase tracking-widest ${colors.text} font-bold`}>
                          [ {step.phase.toUpperCase()} ]
                        </span>
                        <h3 className="text-base sm:text-lg font-display font-medium text-zinc-100 group-hover:text-white transition-colors leading-tight">
                          {step.title}
                        </h3>
                      </div>
                    </div>
                    
                    <span className={`inline-block px-3 py-1 rounded-lg border text-[9px] font-mono font-bold uppercase w-fit whitespace-nowrap tracking-wider ${colors.badge}`}>
                      {step.subtitle}
                    </span>
                  </div>

                  {/* Description text with dynamic leading and readable font weights */}
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-sans font-normal tracking-wide">
                    {step.description}
                  </p>

                  {/* Render Custom Environment Box for Phase 2 */}
                  {step.environment && (
                    <div className="mt-5 p-4 rounded-xl bg-zinc-900/30 border border-zinc-900/80 space-y-2.5 font-mono text-[10px] xs:text-xs">
                      <div className="flex items-center justify-between text-zinc-500 border-b border-zinc-900/50 pb-2 mb-2">
                        <span className="text-[9px] font-bold tracking-widest text-cyan-500/70">[ LOG // LAB_ENVIRONMENT ]</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></span>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Device</span>
                            <span className="text-zinc-300 truncate">{step.environment.device}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Laptop className="w-3.5 h-3.5 text-zinc-650 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Laptop</span>
                            <span className="text-zinc-500 truncate">{step.environment.laptop}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-[8px] text-zinc-500 uppercase tracking-wider">Learning Method</span>
                            <span className="text-zinc-300 truncate">{step.environment.learning}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills tags footer */}
                  <div className="mt-6 pt-5 border-t border-zinc-900/50">
                    <span className="text-[9px] font-mono text-zinc-500 block mb-3 uppercase tracking-widest font-bold">
                      Key Technology Markers:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {step.techKeywords.map((kw, i) => (
                        <div 
                          key={i} 
                          className="bg-zinc-950/80 border border-zinc-900/80 hover:border-zinc-850 hover:text-zinc-200 text-zinc-450 px-2.5 py-1 rounded-lg text-[9px] font-mono tracking-wide transition-colors flex items-center gap-1"
                        >
                          <ChevronRight className="w-2.5 h-2.5 text-zinc-600 shrink-0" />
                          <span>{kw}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
