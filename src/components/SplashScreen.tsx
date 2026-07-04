import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [displayText, setDisplayText] = useState("");
  const fullText = "> R_HMT // INITIALIZING SYSTEM...";

  // Boot sequence lines
  const bootLines = [
    "> Loading cognitive core...",
    "> Pre-rendering 3D interactive matrix configurations...",
    "> Optimizing continuous GPU hardware acceleration...",
    "> Gateway: ACTIVE ✓",
    "[SYSTEM READY & RENDERED]"
  ];

  const [activeBootLines, setActiveBootLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const [currentLineText, setCurrentLineText] = useState("");

  // Step 1: Type out the main line
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        // Start boot sequence after 400ms
        setTimeout(() => {
          setCurrentLineIndex(0);
        }, 400);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Step 2: Type out each boot line sequentially
  useEffect(() => {
    if (currentLineIndex < 0 || currentLineIndex >= bootLines.length) return;

    const lineToType = bootLines[currentLineIndex];
    let charIndex = 0;
    setCurrentLineText("");

    const interval = setInterval(() => {
      if (charIndex < lineToType.length) {
        setCurrentLineText(lineToType.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(interval);
        // Save current finished line to the active boot lines array
        setActiveBootLines(prev => [...prev, lineToType]);
        setCurrentLineText("");
        
        // Advance to next line after a small pause
        setTimeout(() => {
          if (currentLineIndex + 1 < bootLines.length) {
            setCurrentLineIndex(prev => prev + 1);
          } else {
            // Completed all lines! Wait 1.2s before finishing splash screen
            setCurrentLineIndex(bootLines.length); // Mark as completely finished
            setTimeout(onComplete, 1200);
          }
        }, 150);
      }
    }, 12); // fast typing speed per character for boot lines

    return () => clearInterval(interval);
  }, [currentLineIndex]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 bg-black z-[999] flex items-center justify-center overflow-hidden font-mono"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 242, 254, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 242, 254, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="relative z-10 max-w-2xl w-full px-6">
        {/* Terminal window frame */}
        <div className="border border-[#00f2fe]/40 bg-black/80 backdrop-blur-xl rounded-lg overflow-hidden shadow-[0_0_40px_rgba(0,242,254,0.15)]">
          {/* Terminal header */}
          <div className="bg-zinc-900/50 border-b border-[#00f2fe]/20 px-4 py-3 flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60"></div>
            </div>
            <span className="text-[9px] font-mono text-zinc-500 ml-2">R_HMT_SYSTEM</span>
          </div>

          {/* Terminal content */}
          <div className="p-8 space-y-4 min-h-[18rem] flex flex-col justify-center">
            {/* Animated main text */}
            <div className="text-lg font-mono text-[#00f2fe] select-none">
              {displayText}
              {displayText.length < fullText.length && (
                <span className="animate-pulse bg-[#00f2fe] h-4 w-2 inline-block ml-1"></span>
              )}
            </div>

            {/* System boot sequence lines */}
            {(activeBootLines.length > 0 || currentLineIndex >= 0) && (
              <div className="space-y-1.5 text-xs sm:text-sm font-mono select-none">
                {/* Render already fully typed lines */}
                {activeBootLines.map((line, idx) => {
                  let cls = "text-zinc-500";
                  if (line.includes("ACTIVE")) cls = "text-[#00f2fe] font-bold";
                  else if (line.includes("READY")) cls = "text-emerald-400 font-bold text-xs mt-3 block";
                  else if (line.includes("Pre-rendering") || line.includes("Optimizing")) cls = "text-zinc-650";

                  return (
                    <p key={idx} className={cls}>
                      {line}
                    </p>
                  );
                })}

                {/* Render currently typing line */}
                {currentLineIndex >= 0 && currentLineIndex < bootLines.length && currentLineText && (
                  <p className={
                    currentLineText.includes("ACTIVE") ? "text-[#00f2fe] font-bold" :
                    currentLineText.includes("READY") ? "text-emerald-400 font-bold text-xs mt-3 block" :
                    (currentLineText.includes("Pre-rendering") || currentLineText.includes("Optimizing")) ? "text-zinc-650" : "text-zinc-500"
                  }>
                    {currentLineText}
                    <span className="animate-pulse bg-cyan-400 h-3 w-1.5 inline-block ml-0.5"></span>
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-4 h-4 border-t border-l border-[#00f2fe]/40"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 border-t border-r border-[#00f2fe]/40"></div>
        <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b border-l border-[#00f2fe]/40"></div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b border-r border-[#00f2fe]/40"></div>
      </div>

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: "1s" }}></div>
    </motion.div>
  );
}
