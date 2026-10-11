import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, ZoomIn, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { cn, handleImageError } from '../../lib/utils';

export default function AceternityGallery({ items = [], sigName = '' }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Derive categories from items
  const categories = ['All', ...new Set(items.map(item => item.category).filter(Boolean))];

  const filteredItems = activeCategory === 'All' 
    ? items 
    : items.filter(item => item.category === activeCategory);

  return (
    <div className="w-full">
      {/* Category Pills (Aceternity floating rounded pills) */}
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
                    layoutId="activePill"
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

      {/* Modern Aceternity-style Bento Gallery Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            // Give subtle span variations for visual rhythm (bento style)
            const isFeatured = index % 5 === 0;

            return (
              <motion.div
                layout
                key={item.id || item.src || index}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className={cn(
                  "group relative rounded-3xl overflow-hidden cursor-pointer",
                  "border border-black/10 dark:border-white/10",
                  "bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md",
                  "shadow-lg hover:shadow-2xl transition-all duration-500",
                  "hover:border-brand-blue/50",
                  isFeatured ? "md:col-span-2 lg:col-span-2 aspect-[16/9]" : "aspect-[4/3]"
                )}
                onClick={() => setSelectedImage(item)}
              >
                {/* Image with smooth zoom and subtle grayscale-to-color or contrast transition */}
                <img
                  src={item.src}
                  alt={item.title || `${sigName} Gallery`}
                  onError={handleImageError}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Ambient Top Glow on Hover */}
                <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-brand-blue/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Floating Tag */}
                {item.category && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase text-white bg-black/50 backdrop-blur-md border border-white/20">
                      <Sparkles className="w-3 h-3 text-brand-blue" />
                      {item.category}
                    </span>
                  </div>
                )}

                {/* Hover Quick Action Icon */}
                <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <div className="w-9 h-9 rounded-full bg-brand-blue/30 backdrop-blur-md border border-brand-blue/50 flex items-center justify-center text-white shadow-lg">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Bottom Meta */}
                <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  <h4 className="text-lg md:text-xl font-bold text-white drop-shadow-sm line-clamp-1 mb-1">
                    {item.title}
                  </h4>
                  {item.description && (
                    <p className="text-xs md:text-sm text-gray-300 font-light line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Aceternity Interactive Lightbox Modal */}
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
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white border border-white/20 transition-all hover:scale-110"
                aria-label="Close image modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Container */}
              <div className="relative w-full overflow-hidden bg-black/50 flex items-center justify-center max-h-[65vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  onError={handleImageError}
                  className="w-full h-full max-h-[65vh] object-contain"
                />
              </div>

              {/* Details Pane */}
              <div className="p-6 md:p-8 bg-black/70 backdrop-blur-md flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  {selectedImage.category && (
                    <span className="px-3 py-0.5 rounded-full text-xs font-semibold text-brand-blue bg-brand-blue/10 border border-brand-blue/30 uppercase tracking-widest">
                      {selectedImage.category}
                    </span>
                  )}
                  <span className="text-xs text-gray-400">
                    {sigName} Showcase
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
