import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, ArrowRight, X, PenLine } from 'lucide-react';
import Hero from '../ui/Hero';
import CreateBlogModal from './CreateBlogModal';
import { api } from '../../services/api';
import { handleImageError } from '../../lib/utils';

const localBlogs = [
    {
        id: "mock-1",
        title: "Building Scalable Systems for Innovision 2026",
        author: "Sanganitra Team",
        date: "September 5, 2026",
        excerpt: "A deep dive into how our backend team utilized Node.js and Redis to handle a 500% spike in traffic during the Innovision registration weekend without dropping a single request.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        content: "A deep dive into how our backend team utilized Node.js and Redis to handle a 500% spike in traffic during the Innovision registration weekend without dropping a single request. By implementing efficient caching layers and connection pooling, the architecture maintained sub-50ms response times even during peak surges."
    },
    {
        id: "mock-2",
        title: "The Ultimate Guide to Open Source Contributions",
        author: "Vidyut SIG",
        date: "August 22, 2026",
        excerpt: "Overwhelmed by massive codebases? We break down the exact step-by-step process our first-year members used to get their first PRs merged into major projects like React and Vite.",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
        content: "Overwhelmed by massive codebases? We break down the exact step-by-step process our first-year members used to get their first PRs merged into major projects like React and Vite. Starting from good first issues, mastering git workflows, to writing clean documentation and engaging with maintainers."
    },
    {
        id: "mock-3",
        title: "Mastering Dynamic Programming for ICPC",
        author: "Karyavarta Competitive Team",
        date: "July 14, 2026",
        excerpt: "Dynamic programming doesn't have to be scary. Here are the 5 core patterns you need to recognize to solve 90% of medium-to-hard DP problems in competitive programming.",
        image: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1000&auto=format&fit=crop",
        content: "Dynamic programming doesn't have to be scary. Here are the 5 core patterns you need to recognize to solve 90% of medium-to-hard DP problems in competitive programming: 0/1 Knapsack, Longest Common Subsequence, Matrix Chain Multiplication, Tree DP, and Bitmask DP."
    }
];

export default function AcmNitkBlogPage() {
    const [blogs, setBlogs] = useState(localBlogs);
    const [activePost, setActivePost] = useState(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);

    const currentUser = api.getCurrentUser();
    const canWrite = currentUser && (currentUser.can_write_blog || currentUser.is_core || currentUser.is_webmaster || currentUser.core_position);

    const loadLiveBlogs = async () => {
        const data = await api.getBlogs();
        if (data && data.length > 0) {
            const formatted = data.map(b => ({
                id: b.id,
                title: b.title,
                author: b.author?.name || b.writer_name || "ACM Team",
                date: b.published_at ? new Date(b.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : "Recent",
                excerpt: b.subtitle || (b.content ? b.content.slice(0, 160) + '...' : "Explore this write-up by our student chapter members."),
                image: b.cover_image_url || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
                content: b.content || b.subtitle || ""
            }));
            setBlogs(formatted);
        }
    };

    useEffect(() => {
        loadLiveBlogs();
    }, []);

    return (
        <main className="flex-grow w-full">
            <Hero>
                <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
                    Inside
                </span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
                    ACM NITK
                </span>
            </Hero>

            <section className="relative w-full pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300">
                <div className="max-w-4xl mx-auto relative z-10 flex flex-col gap-12">

                    {/* Webmaster / Core Member Action Bar */}
                    <div className="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-6">
                        <div>
                            <h2 className="text-xl font-bold text-brand-navy dark:text-white">Chapter Articles & Insights</h2>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Written by our SIG leads, Webmaster, and Core members</p>
                        </div>
                        {canWrite && (
                            <button
                                type="button"
                                onClick={() => setIsCreateOpen(true)}
                                className="px-5 py-2.5 rounded-full bg-brand-blue text-brand-navy text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-all flex items-center gap-2 shadow-lg shadow-brand-blue/20"
                            >
                                <PenLine className="w-4 h-4" /> Write Article
                            </button>
                        )}
                    </div>

                    {blogs.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            className="group flex flex-col md:flex-row gap-8 items-center p-6 md:p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:bg-black/[0.04] dark:hover:bg-white/[0.04] transition-colors duration-500 shadow-sm"
                        >
                            {/* Thumbnail */}
                            <div className="w-full md:w-1/3 h-48 md:h-full rounded-2xl overflow-hidden shrink-0">
                                <img
                                    src={post.image}
                                    onError={handleImageError}
                                    alt={post.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center flex-grow">
                                <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                                    <div className="flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-brand-blue" />
                                        <span>{post.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-brand-blue" />
                                        <span>{post.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-bold text-brand-navy dark:text-white mb-3 group-hover:text-brand-blue transition-colors duration-300">
                                    {post.title}
                                </h3>

                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>

                                <button
                                    onClick={() => setActivePost(post)}
                                    className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase w-fit hover:text-indigo-400 transition-colors"
                                >
                                    Read Article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </motion.article>
                    ))}

                </div>
            </section>

            {/* Reading Modal */}
            <AnimatePresence>
                {activePost && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActivePost(null)}
                            className="absolute inset-0 bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-3xl bg-white dark:bg-[#111] rounded-3xl shadow-2xl p-8 md:p-12 border border-black/10 dark:border-white/10 z-10 max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                onClick={() => setActivePost(null)}
                                className="absolute top-6 right-6 text-gray-400 hover:text-brand-navy dark:hover:text-white transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="w-full h-56 rounded-2xl overflow-hidden mb-8">
                                <img
                                    src={activePost.image}
                                    onError={handleImageError}
                                    alt={activePost.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex items-center gap-4 text-xs font-medium text-gray-500 dark:text-gray-400 mb-4">
                                <div className="flex items-center gap-1.5">
                                    <User className="w-4 h-4 text-brand-blue" />
                                    <span>{activePost.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar className="w-4 h-4 text-brand-blue" />
                                    <span>{activePost.date}</span>
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-4xl font-black text-brand-navy dark:text-white mb-6">
                                {activePost.title}
                            </h2>

                            <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                                <p className="text-lg font-medium text-brand-blue/90">
                                    {activePost.excerpt}
                                </p>
                                <div className="whitespace-pre-line text-base">
                                    {activePost.content}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Authoring Modal for Core / Webmasters */}
            <CreateBlogModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onBlogCreated={() => loadLiveBlogs()}
            />
        </main>
    );
}