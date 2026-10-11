import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FloatingLogo() {
  return (
    <div className="fixed top-4 sm:top-5 left-4 sm:left-6 lg:left-8 z-50 flex items-center h-8 sm:h-9">
      <Link to="/" aria-label="Go to Home" className="block">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          src="/logos/acm_cropped.png"
          alt="ACM NITK Logo"
          className="h-7 sm:h-8 lg:h-9 w-auto object-contain cursor-pointer brightness-0 dark:invert transition-all duration-300 drop-shadow-sm"
        />
      </Link>
    </div>
  );
}