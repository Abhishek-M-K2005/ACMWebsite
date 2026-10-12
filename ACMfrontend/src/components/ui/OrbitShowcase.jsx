import React from 'react';
import { motion } from 'framer-motion';

const yantras = [
  { name: "Sanganitra", logo: "/logos/sanganitra.png" },
  { name: "Yantrika", logo: "/logos/yantrika.png" },
  { name: "Vidyuth", logo: "/logos/vidyuth.png" },
  { name: "Kaaryavarta", logo: "/logos/karyavarta.png" },
  { name: "Saahitya", logo: "/logos/Saahitya.jpg" },
  { name: "Abhivyakta", logo: "/logos/Abhivyakta.jpeg" },
  { name: "Krutagnata", logo: "/logos/krutagnata.png" }, // Added Krutagnata here
  { name: "ACMW", logo: "/logos/acmw.png" }
];

export default function OrbitShowcase() {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-white dark:bg-black transition-colors duration-300">

      {/* Center Logo */}
      <div className="absolute z-20 flex items-center justify-center w-32 h-32 rounded-full bg-white dark:bg-gray-900 shadow-[0_0_40px_rgba(108,180,238,0.3)] border border-black/5 dark:border-white/10">
        <img src="/logos/ACM.png" alt="ACM Central" className="w-20 h-20 object-contain" />
      </div>

      {/* Orbiting Rings */}
      <div className="absolute w-[300px] h-[300px] border border-brand-blue/20 rounded-full" />
      <div className="absolute w-[450px] h-[450px] border border-brand-blue/10 rounded-full" />
      <div className="absolute w-[600px] h-[600px] border border-brand-blue/5 rounded-full" />

      {/* Orbiting Items */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[450px] h-[450px]"
      >
        {yantras.map((yantra, i) => {
          const angle = (i * 360) / yantras.length;
          // Calculate position on the circle (radius = 225px)
          const radius = 225;
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);

          return (
            <motion.div
              key={yantra.name}
              className="absolute top-1/2 left-1/2 flex items-center justify-center w-16 h-16 -ml-8 -mt-8 bg-white dark:bg-gray-800 rounded-full shadow-lg border border-black/5 dark:border-white/10 group cursor-pointer"
              style={{ x, y }}
              // Counter-rotate the icons so they stay upright while orbiting
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              whileHover={{ scale: 1.2 }}
            >
              <img src={yantra.logo} alt={yantra.name} className="w-10 h-10 object-contain rounded-full" />

              {/* Tooltip on hover */}
              <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs font-bold text-brand-navy dark:text-white bg-white/90 dark:bg-black/90 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                {yantra.name}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}