import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Sparkles } from 'lucide-react';

const SYSTEM_LOGS = [
  'INITIALIZING QUANTUM RUNTIME...',
  'FETCHING ACM PROTOCOLS...',
  'CONNECTING TO NITK CAMPUS NODES...',
  'SYNCHRONIZING SECURE REPOSITORIES...',
  'RENDERING VISUAL INTERFACES...'
];

export default function Loader({ text = 'ACM NITK System Boot', size = 'default', overlay = false }) {
  const isCompact = size === 'compact';
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % SYSTEM_LOGS.length);
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={
        overlay
          ? 'fixed inset-0 z-50 flex flex-col items-center justify-center select-none bg-white/70 dark:bg-[#0a0a0a]/75 backdrop-blur-xl transition-all duration-300'
          : `relative flex-grow flex flex-col items-center justify-center select-none overflow-hidden ${
              isCompact ? 'min-h-[25vh] py-8' : 'min-h-[55vh] py-20'
            }`
      }
    >
      {/* 1. Subtle Dribbble/Aceternity Cyber Grid Backdrop */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#6cb4ee08_1px,transparent_1px),linear-gradient(to_bottom,#6cb4ee08_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      {/* 2. Soft Radial Neon Ambient Glows */}
      <div className="absolute w-80 h-80 bg-brand-blue/15 dark:bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute w-48 h-48 bg-cyan-400/10 rounded-full blur-[70px] pointer-events-none" />

      {/* 3. Multi-Layered Gyroscopic Cyber Rings (Dribbble/MagicUI orbital stage) */}
      <div className="relative flex items-center justify-center w-52 h-52 mb-6">
        
        {/* Outer Laser Pulsing Dashed Orbit */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 16, ease: 'linear' }}
          className="absolute inset-0 rounded-full border border-dashed border-brand-blue/30 dark:border-brand-blue/40"
        />

        {/* Counter-Rotating Glowing Gyroscope Ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
          className="absolute inset-3 rounded-full border-2 border-transparent border-t-brand-blue border-r-cyan-400 drop-shadow-[0_0_15px_rgba(108,180,238,0.7)]"
        />

        {/* Orbiting Satellite Node 1 (Binary/Packet) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          className="absolute inset-0 flex items-start justify-center"
        >
          <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee] -mt-1.5" />
        </motion.div>

        {/* Orbiting Satellite Node 2 (Opposite) */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 5, ease: 'linear' }}
          className="absolute inset-0 flex items-end justify-center"
        >
          <div className="w-2.5 h-2.5 rounded-full bg-brand-blue shadow-[0_0_10px_#6cb4ee] -mb-1" />
        </motion.div>

        {/* Middle Ring with 3 Glowing Orbit Arc Segments */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="absolute inset-8 rounded-full border-t border-b border-brand-blue/60"
        />

        {/* Inner Counter Core Pulsing Circle */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="relative w-24 h-24 rounded-2xl bg-white/60 dark:bg-[#0a0f1d]/80 backdrop-blur-xl border border-brand-blue/40 dark:border-brand-blue/50 shadow-[0_0_30px_rgba(108,180,238,0.35)] flex flex-col items-center justify-center p-3 overflow-hidden group"
        >
          {/* Top Edge Laser Bar */}
          <motion.div
            animate={{ x: [-40, 40] }}
            transition={{ repeat: Infinity, duration: 1.6, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute top-0 w-8 h-[2px] bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
          />

          {/* ACM Branding Symbol */}
          <div className="flex items-center gap-0.5 mb-1 font-black text-xl tracking-tighter text-brand-blue drop-shadow-[0_0_10px_rgba(108,180,238,0.6)]">
            <span>A</span>
            <span className="text-cyan-400">C</span>
            <span>M</span>
          </div>

          {/* Micro Telemetry Bar */}
          <div className="w-12 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <motion.div
              animate={{ x: [-20, 20] }}
              transition={{ repeat: Infinity, duration: 1.2, repeatType: 'reverse', ease: 'easeInOut' }}
              className="w-5 h-full bg-gradient-to-r from-brand-blue to-cyan-400 rounded-full"
            />
          </div>

          {/* Bottom Edge Laser Bar */}
          <motion.div
            animate={{ x: [40, -40] }}
            transition={{ repeat: Infinity, duration: 1.6, repeatType: 'reverse', ease: 'easeInOut' }}
            className="absolute bottom-0 w-8 h-[2px] bg-brand-blue shadow-[0_0_8px_#6cb4ee]"
          />
        </motion.div>
      </div>

      {/* 4. Retro Pixelated Status & Live Telemetry Line (No Capsular Boundary) */}
      <div className="flex flex-col items-center gap-3 z-10 px-4 mt-2">
        {/* Pixelated Status Heading without capsule boundary */}
        <div className="flex items-center gap-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '4s' }} />
          <h2 className="font-silkscreen text-xs sm:text-sm tracking-wider uppercase text-brand-navy dark:text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]">
            {text}
          </h2>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-blue" />
          </span>
        </div>

        {/* Live Cyber Log Terminal Line */}
        <div className="h-5 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={logIndex}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-2 text-[10px] font-silkscreen tracking-widest text-brand-blue/80 dark:text-cyan-300/80"
            >
              <Terminal className="w-2.5 h-2.5 shrink-0" />
              <span>{SYSTEM_LOGS[logIndex]}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Aceternity-style Shimmer Progress Track */}
        <div className="w-56 h-[3px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative mt-1">
          <motion.div
            animate={{
              x: ['-100%', '100%']
            }}
            transition={{
              repeat: Infinity,
              duration: 1.8,
              ease: 'easeInOut'
            }}
            className="w-1/2 h-full bg-gradient-to-r from-transparent via-cyan-400 to-brand-blue"
          />
        </div>
      </div>
    </div>
  );
}
