import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxShowcase({ title, items = [] }) {
  const containerRef = useRef(null);

  // Track the scroll progress of this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"] // Triggers while the section is in the viewport
  });

  // Map the scroll progress (0 to 1) to pixel values for vertical movement
  // Left column moves UP, Right column moves DOWN
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  // Split the items into two columns
  const midPoint = Math.ceil(items.length / 2);
  const leftColumn = items.slice(0, midPoint);
  const rightColumn = items.slice(midPoint);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full py-32 px-6 bg-white dark:bg-black transition-colors duration-300 overflow-hidden flex flex-col items-center justify-center min-h-[60vh]"
    >
      {/* Optional Ambient Background Glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-5 dark:opacity-20 blur-3xl z-0">
        <div className="w-[30rem] h-[30rem] bg-brand-blue rounded-full mix-blend-screen filter blur-3xl"></div>
      </div>

      {title && (
        <div className="relative z-10 mb-16 text-center">
          <h3 className="text-sm font-bold tracking-[0.3em] text-brand-blue uppercase">
            {title}
          </h3>
        </div>
      )}

      {/* Parallax Grid */}
      <div className="relative z-10 flex gap-6 md:gap-10 w-full max-w-3xl justify-center">
        
        {/* Left Column (Moves Up) */}
        <motion.div style={{ y: y1 }} className="flex flex-col gap-6 w-1/2 md:w-64">
          {leftColumn.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center text-center p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-lg transition-colors duration-300 hover:border-brand-blue/50"
            >
              <span className="text-brand-navy dark:text-gray-200 font-semibold tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Right Column (Moves Down) */}
        <motion.div style={{ y: y2 }} className="flex flex-col gap-6 w-1/2 md:w-64 mt-12 md:mt-24">
          {rightColumn.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center justify-center text-center p-8 rounded-3xl border border-black/5 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-lg transition-colors duration-300 hover:border-brand-blue/50"
            >
              <span className="text-brand-navy dark:text-gray-200 font-semibold tracking-wide">
                {item}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}