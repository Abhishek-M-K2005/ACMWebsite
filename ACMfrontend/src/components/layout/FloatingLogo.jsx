import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FloatingLogo() {
  return (
    <div className="fixed top-6 left-4 md:left-8 z-50 flex items-center h-[46px]">
      <Link to="/" aria-label="Go to Home" className="block">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          src="/logos/ACM.png"
          alt="ACM NITK Logo"
          className="w-32 md:w-44 h-auto object-contain cursor-pointer brightness-0 dark:invert transition-all duration-300"
        />
      </Link>
    </div>
  );
}