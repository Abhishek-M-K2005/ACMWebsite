import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';

const rainbowColors = [
  "#ef4444", // Red
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#0ea5e9", // Sky Blue
  "#6366f1", // Indigo
  "#a855f7", // Violet
  "#ec4899"  // Pink (ACMW)
];

// Mapping SIG/Yantra names to circular logo images in public/
const SIG_IMAGES = {
  sanganitra: "/logos/sanganitra.png",
  karyavarta: "/logos/karyavarta.png",
  kaaryavarta: "/logos/karyavarta.png",
  vidyut: "/logos/vidyuth.png",
  vidyuth: "/logos/vidyuth.png",
  yantrika: "/logos/yantrika.png",
  sahiitya: "/logos/Saahitya.jpg",
  saahitya: "/logos/Saahitya.jpg",
  abhivyakta: "/logos/Abhivyakta.jpeg",
  krutagnata: "/logos/ACM.png",
  acmw: "/logos/acmw.png",
};

const defaultYantras = [
  { name: "Sanganitra", image: "/logos/sanganitra.png" },
  { name: "Karyavarta", image: "/logos/karyavarta.png" },
  { name: "Vidyut", image: "/logos/vidyuth.png" },
  { name: "Yantrika", image: "/logos/yantrika.png" },
  { name: "Sahiitya", image: "/logos/Saahitya.jpg" },
  { name: "Abhivyakta", image: "/logos/Abhivyakta.jpeg" },
  { name: "Krutagnata", image: "/logos/ACM.png" },
  { name: "ACMW", image: "/logos/acmw.png" }
];

function resolveItem(item) {
  if (typeof item === 'object' && item !== null) {
    const name = item.name || item.title || 'SIG';
    const key = name.toLowerCase().trim();
    return {
      name,
      image: item.image || item.logo || SIG_IMAGES[key] || (key === 'acmw' ? '/logos/acmw.png' : '/logos/ACM.png')
    };
  }
  const str = String(item || '').trim();
  const key = str.toLowerCase();
  return {
    name: str,
    image: SIG_IMAGES[key] || (key === 'acmw' ? '/logos/acmw.png' : '/logos/ACM.png')
  };
}

export default function OrbitShowcase({ title = "Our Yantras", items = defaultYantras }) {
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

  const resolvedItems = (items && items.length > 0 ? items : defaultYantras).map(resolveItem);

  return (
    <section ref={containerRef} className="relative w-full py-48 bg-white dark:bg-black transition-colors duration-300 overflow-hidden flex items-center justify-center min-h-[80vh]">

      {/* Ambient center blue glow */}
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center opacity-10 dark:opacity-20 z-0">
        <div className="w-[30rem] h-[30rem] bg-brand-blue rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full max-w-5xl">

        {/* Subtle Orbital Ellipse Guide */}
        <div
          className="absolute pointer-events-none border border-dashed border-brand-blue/20 dark:border-brand-blue/30 rounded-full transition-all duration-700 ease-out"
          style={{
            width: radii.x * 2,
            height: radii.y * 2,
            opacity: isExpanded ? 0.6 : 0,
            transform: isExpanded ? 'scale(1)' : 'scale(0.3)'
          }}
        />

        {/* Central Core */}
        <motion.div
          onClick={() => setIsExpanded(!isExpanded)}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          className="absolute z-20 flex flex-col items-center justify-center w-36 h-36 md:w-48 md:h-48 rounded-full border border-brand-blue/30 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(108,180,238,0.2)] cursor-pointer select-none"
        >
          <h3 className="text-xs md:text-sm font-bold tracking-[0.2em] text-brand-blue uppercase text-center leading-relaxed">
            {title.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
          </h3>
        </motion.div>

        {/* Orbiting SIG Images in Circles */}
        {resolvedItems.map((item, i) => {
          const angle = (i / resolvedItems.length) * 2 * Math.PI - Math.PI / 2;

          // Target coordinates based on whether the state is expanded or collapsed
          const targetX = isExpanded ? Math.cos(angle) * radii.x : 0;
          const targetY = isExpanded ? Math.sin(angle) * radii.y : 0;

          const themeColor = rainbowColors[i % rainbowColors.length];

          return (
            <motion.div
              key={item.name || i}
              animate={{
                x: targetX,
                y: targetY,
                opacity: isExpanded ? 1 : 0,
                scale: isExpanded ? 1 : 0.2
              }}
              whileHover={{
                scale: 1.15,
                zIndex: 30,
              }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 12,
                delay: isExpanded ? i * 0.08 : 0,
              }}
              className="group absolute z-10 flex flex-col items-center justify-center cursor-pointer"
            >
              <Link
                to="/project-proposal"
                className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full border-2 bg-white dark:bg-black/90 backdrop-blur-xl shadow-xl transition-all duration-300 group-hover:shadow-[0_0_25px_var(--glow-color)] p-2 overflow-hidden"
                style={{
                  borderColor: `${themeColor}aa`,
                  '--glow-color': themeColor,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/logos/ACM.png";
                  }}
                />
              </Link>

              {/* Tooltip popping up on hover */}
              <span
                style={{ color: themeColor }}
                className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase whitespace-nowrap bg-white/95 dark:bg-black/90 border border-black/10 dark:border-white/10 shadow-lg transform translate-y-1 group-hover:translate-y-0"
              >
                {item.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}