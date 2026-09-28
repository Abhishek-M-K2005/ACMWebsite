import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const rainbowColors = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#0ea5e9", // Sky Blue
  "#6366f1", // Indigo
  "#a855f7"  // Violet
];

export default function OrbitShowcase({ title, items = [] }) {
  const [radii, setRadii] = useState({ x: 380, y: 240 });

  // Controls whether the items are burst out or collapsed in the center
  const [isExpanded, setIsExpanded] = useState(false);

  const containerRef = useRef(null);

  // Triggers exactly once when the component enters the viewport
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const updateRadii = () => {
      if (window.innerWidth < 768) {
        setRadii({ x: 140, y: 220 });
      } else {
        setRadii({ x: 380, y: 240 });
      }
    };

    updateRadii();
    window.addEventListener('resize', updateRadii);
    return () => window.removeEventListener('resize', updateRadii);
  }, []);

  // Fire the expansion animation when the user scrolls down to this section
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setIsExpanded(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-white dark:bg-black transition-colors duration-300 overflow-hidden flex items-center justify-center min-h-[80vh]">

      {/* Ambient center blue glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10 dark:opacity-20 z-0">
        <div className="w-[30rem] h-[30rem] bg-brand-blue rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full max-w-5xl">

        {/* Central Core */}
        <motion.div
          onClick={() => setIsExpanded(!isExpanded)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 flex flex-col items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-full border border-brand-blue/30 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(108,180,238,0.2)] cursor-pointer"
        >
          <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] text-brand-blue uppercase text-center leading-relaxed">
            {title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
          </h3>
        </motion.div>

        {/* Orbiting Rainbow Items */}
        {items.map((item, i) => {
          const angle = (i / items.length) * 2 * Math.PI - Math.PI / 2;

          // Target coordinates based on whether the state is expanded or collapsed
          const targetX = isExpanded ? Math.cos(angle) * radii.x : 0;
          const targetY = isExpanded ? Math.sin(angle) * radii.y : 0;

          const themeColor = rainbowColors[i % rainbowColors.length];

          return (
            <motion.div
              key={i}
              onClick={() => setIsExpanded(false)}
              animate={{
                x: targetX,
                y: targetY,
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? 1 : 0.2
              }}
              whileHover={{
                scale: 1.05,
                borderColor: themeColor,
                boxShadow: `0 0 24px ${themeColor}66`,
                backgroundColor: `${themeColor}11`
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: isExpanded ? i * 0.08 : 0,
              }}
              className="absolute z-10 flex items-center justify-center px-6 py-3 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-md shadow-lg cursor-pointer"
            >
              <span
                style={{ color: themeColor }}
                className="text-sm md:text-base font-semibold tracking-wide whitespace-nowrap drop-shadow-sm"
              >
                {item}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}