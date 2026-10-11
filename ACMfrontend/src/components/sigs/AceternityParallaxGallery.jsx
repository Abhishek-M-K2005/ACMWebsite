import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Sparkles, ZoomIn, X } from 'lucide-react';
import { cn, handleImageError } from '../../lib/utils';

export default function AceternityParallaxGallery({ items = [], sigName = '' }) {
  const containerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Filter items by category
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];
  const filteredItems = activeCategory === 'All'
    ? items
    : items.filter(item => item.category === activeCategory);

  // Split into 3 columns for desktop parallax (or 2 for tablet)
  const col1 = filteredItems.filter((_, idx) => idx % 3 === 0);
  const col2 = filteredItems.filter((_, idx) => idx % 3 === 1);
  const col3 = filteredItems.filter((_, idx) => idx % 3 === 2);

  // Parallax scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Different column speeds and directions for Aceternity floating parallax feel
  const yCol1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [60, -70]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [-30, 50]);

  const renderCard = (item, idx) => (
    <motion.div
      key={item.id || item.src || idx}
      layout
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative rounded-3xl overflow-hidden cursor-pointer border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-lg hover:shadow-2xl hover:border-brand-blue/50 transition-all duration-500 mb-6"
      onClick={() => setSelectedImage(item)}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <img
          src={item.src}
          alt={item.title}
          onError={handleImageError}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-65 group-hover:opacity-90 transition-opacity duration-300" />
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {item.category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase text-white bg-black/60 backdrop-blur-md border border-white/20">
              <Sparkles className="w-2.5 h-2.5 text-brand-blue" />
              {item.category}
            </span>
          </div>
        )}

        <div className="absolute top-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-8 rounded-full bg-brand-blue/40 backdrop-blur-md border border-brand-blue/60 flex items-center justify-center text-white shadow-lg">
            <ZoomIn className="w-3.5 h-3.5" />
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5 z-10 flex flex-col justify-end">
          <h4 className="text-base md:text-lg font-bold text-white drop-shadow-sm line-clamp-1 mb-1">
            {item.title}
          </h4>
          {item.description && (
            <p className="text-xs text-gray-300 font-light line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              {item.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Category Pills */}
      {categories.length > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "relative px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300",
                  isActive
                    ? "text-brand-navy dark:text-white"
                    : "text-gray-600 dark:text-gray-400 hover:text-brand-navy dark:hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeGalleryPill"
                    className="absolute inset-0 bg-brand-blue/20 dark:bg-brand-blue/25 border border-brand-blue/50 rounded-full shadow-[0_0_20px_rgba(108,180,238,0.3)]"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 3-Column Parallax Gallery Grid for Desktop, Fallback to 1-col on mobile */}
      <div className="hidden md:grid md:grid-cols-3 gap-6 items-start">
        <motion.div style={{ y: yCol1 }}>
          {col1.map((item, idx) => renderCard(item, idx))}
        </motion.div>
        <motion.div style={{ y: yCol2 }}>
          {col2.map((item, idx) => renderCard(item, idx))}
        </motion.div>
        <motion.div style={{ y: yCol3 }}>
          {col3.map((item, idx) => renderCard(item, idx))}
        </motion.div>
      </div>

      {/* Mobile Single Column Grid */}
      <div className="grid grid-cols-1 gap-5 md:hidden">
        {filteredItems.map((item, idx) => renderCard(item, idx))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-xl"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-4xl w-full max-h-[90vh] bg-neutral-900 border border-brand-blue/30 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(108,180,238,0.2)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full overflow-hidden bg-black/50 flex items-center justify-center max-h-[65vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  onError={handleImageError}
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              <div className="p-6 md:p-8 bg-black/70 backdrop-blur-md flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {selectedImage.category && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold text-brand-blue bg-brand-blue/10 border border-brand-blue/30 uppercase tracking-widest">
                      {selectedImage.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {sigName} Visual Archive
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {selectedImage.title}
                </h3>
                {selectedImage.description && (
                  <p className="text-sm text-gray-300 leading-relaxed font-light">
                    {selectedImage.description}
                  </p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
