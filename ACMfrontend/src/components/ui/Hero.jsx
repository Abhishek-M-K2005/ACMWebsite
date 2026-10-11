import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "./lamp";

export default function Hero({ children, description }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden bg-transparent z-10 flex items-center justify-center">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="py-4 text-center tracking-tight leading-tight md:leading-snug flex flex-col items-center justify-center gap-2"
        >
          {children}
          {description && (
            <p className="mt-4 max-w-2xl text-center text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-normal">
              {description}
            </p>
          )}
        </motion.h1>
      </LampContainer>
    </section>
  );
}