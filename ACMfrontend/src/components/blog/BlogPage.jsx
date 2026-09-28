import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ExternalLink, ArrowRight, BookOpen } from 'lucide-react';
import Hero from '../ui/Hero';

const blogSources = [
    {
        title: "ACM NITK Blog",
        description: "Read the latest technical write-ups, project post-mortems, and event experiences written directly by our student chapter members.",
        link: "/blog/acm-nitk",
        isInternal: true,
        tag: "Local Chapter"
    },
    {
        title: "CACM",
        description: "Communications of the ACM is the leading print and online publication for the computing and information technology fields.",
        link: "https://cacm.acm.org/",
        isInternal: false,
        tag: "Global Publication"
    },
    {
        title: "ACM Interactions",
        description: "A mirror on the human-computer interaction and interaction design communities and beyond.",
        link: "https://interactions.acm.org/",
        isInternal: false,
        tag: "HCI / Design"
    },
    {
        title: "ACM India",
        description: "News, updates, and research highlights specifically tailored for the growing computing community in India.",
        link: "https://india.acm.org/",
        isInternal: false,
        tag: "Regional News"
    },
    {
        title: "ACM TechNews / HuffPost",
        description: "Breaking news, industry trends, and high-level tech journalism curated for ACM members globally.",
        link: "https://technews.acm.org/",
        isInternal: false,
        tag: "Industry News"
    },
    {
        title: "ACM Global Insights",
        description: "Deep dives into theoretical computer science, algorithms, and worldwide technological policies.",
        link: "https://www.acm.org/articles",
        isInternal: false,
        tag: "Research"
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
};

export default function BlogPage() {
    return (
        <main className="flex-grow w-full">
            <Hero>
                <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
                    Read our
                </span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
                    Publications
                </span>
            </Hero>

            <section className="relative w-full pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-16">
                        <div className="h-[1px] w-8 bg-brand-blue"></div>
                        <h2 className="text-xs font-bold tracking-[0.2em] text-brand-blue uppercase">
                            Curated Sources
                        </h2>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                    >
                        {blogSources.map((source, idx) => {
                            const CardContent = (
                                <motion.div
                                    variants={cardVariants}
                                    className="group h-full flex flex-col p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm hover:bg-black/[0.04] dark:hover:bg-white/[0.04] hover:border-brand-blue/50 transition-all duration-500 shadow-lg relative overflow-hidden"
                                >
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                            <BookOpen className="w-5 h-5 text-brand-blue" />
                                        </div>
                                        <span className="text-[10px] font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400 bg-black/5 dark:bg-white/5 px-3 py-1 rounded-full">
                                            {source.tag}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-3 transition-colors duration-300">
                                        {source.title}
                                    </h3>

                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8 flex-grow">
                                        {source.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase mt-auto">
                                        {source.isInternal ? "Read Local Blog" : "Visit Publication"}
                                        {source.isInternal ? (
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        ) : (
                                            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        )}
                                    </div>
                                </motion.div>
                            );

                            return source.isInternal ? (
                                <Link to={source.link} key={idx} className="block h-full">{CardContent}</Link>
                            ) : (
                                <a href={source.link} target="_blank" rel="noopener noreferrer" key={idx} className="block h-full">{CardContent}</a>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </main>
    );
}