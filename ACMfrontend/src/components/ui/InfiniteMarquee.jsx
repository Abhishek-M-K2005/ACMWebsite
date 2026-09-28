import React from 'react';
import { motion } from 'framer-motion';

export default function InfiniteMarquee({ title, items = [], speed = 25 }) {
  // Duplicate the items array 3 times to ensure a seamless endless loop
  const duplicatedItems = [...items, ...items, ...items];

  return (
    <section className="py-16 md:py-24 bg-white dark:bg-black transition-colors duration-300 overflow-hidden relative">
      
      {/* Optional Title */}
      {title && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 mb-10 text-center">
          <h3 className="text-sm font-bold tracking-widest text-brand-blue uppercase">
            {title}
          </h3>
        </div>
      )}

      {/* 
        GRADIENT MASK: 
        Fades out the left and right edges for a premium "emerging" look.
      */}
      <div className="relative w-full max-w-7xl mx-auto [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] flex overflow-hidden">
        
        <motion.div
          className="flex flex-nowrap gap-6 w-max"
          animate={{ 
            x: ["0%", "-33.333%"] // Moves exactly one original array length, then resets
          }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: speed 
          }}
        >
          {duplicatedItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 px-8 py-4 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md text-brand-navy dark:text-gray-300 font-medium tracking-wide transition-colors duration-300 hover:border-brand-blue/50 hover:text-brand-blue cursor-pointer"
            >
              {item}
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}