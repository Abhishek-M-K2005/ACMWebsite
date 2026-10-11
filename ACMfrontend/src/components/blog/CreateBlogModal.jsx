import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PenLine, Sparkles, Image, Tag, Send } from 'lucide-react';
import { api } from '../../services/api';

export default function CreateBlogModal({ isOpen, onClose, onBlogCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    content: '',
    cover_image_url: '',
    category_names: 'Technical, NITK',
    tag_names: 'ACM, Engineering'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error('Please provide both a title and article content.');
      }

      const res = await api.createBlog(formData);
      if (onBlogCreated) {
        onBlogCreated(res);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to publish blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-navy/70 dark:bg-black/85 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-brand-blue/30 rounded-3xl shadow-[0_0_50px_rgba(108,180,238,0.2)] overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-black/10 dark:border-white/10 bg-brand-blue/[0.04]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/20 flex items-center justify-center text-brand-blue">
                <PenLine className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-brand-navy dark:text-white">Write Chapter Blog</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">Authorized for Webmaster & Core Committee</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-gray-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5">
            {error && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g., Demystifying High-Concurrency Systems at NITK"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Subtitle / Abstract
              </label>
              <input
                type="text"
                placeholder="Short one-line summary or hook for readers"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                <Image className="w-3.5 h-3.5 text-brand-blue" /> Cover Image URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/photo-..."
                value={formData.cover_image_url}
                onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-sm focus:outline-none focus:border-brand-blue transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-brand-blue" /> Categories
                </label>
                <input
                  type="text"
                  placeholder="Comma separated: Technical, Workshop"
                  value={formData.category_names}
                  onChange={(e) => setFormData({ ...formData, category_names: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-xs focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" /> Tags
                </label>
                <input
                  type="text"
                  placeholder="Comma separated: Go, Systems, ACM"
                  value={formData.tag_names}
                  onChange={(e) => setFormData({ ...formData, tag_names: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-xs focus:outline-none focus:border-brand-blue transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1.5">
                Article Body (Markdown Supported) *
              </label>
              <textarea
                required
                rows={7}
                placeholder="Write your article markdown or narrative content here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-brand-navy dark:text-white text-sm focus:outline-none focus:border-brand-blue font-mono text-xs transition-colors"
              />
            </div>

            <div className="pt-2 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-full bg-brand-blue text-brand-navy text-xs font-bold tracking-wider uppercase hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center gap-2 shadow-md shadow-brand-blue/20"
              >
                {isSubmitting ? 'Publishing...' : (
                  <>
                    <Send className="w-3.5 h-3.5" /> Publish Article
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
