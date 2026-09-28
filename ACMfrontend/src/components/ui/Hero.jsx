import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom"; // <-- Import useLocation
import { LampContainer } from "./lamp";

export default function Hero({ children }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Check if we are currently on the Home page
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollY } = useScroll();

  // If mobile OR not home page, start at center (0vw). If desktop & home page, start pushed right (20vw).
  const x = useTransform(scrollY, [0, 400], [isMobile || !isHome ? "0vw" : "20vw", "0vw"]);

  return (
    <section className="relative w-full h-screen overflow-visible bg-transparent z-10">
      <LampContainer>
        <motion.h1
          style={{ x }}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="py-4 text-center tracking-tight leading-tight md:leading-snug flex flex-col items-center justify-center gap-2"
        >
          {children}
        </motion.h1>
      </LampContainer>
    </section>
  );
}