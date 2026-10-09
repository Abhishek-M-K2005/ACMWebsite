import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, ExternalLink } from 'lucide-react';
import Hero from '../ui/Hero';
import { api } from '../../services/api';
import { handleImageError } from '../../lib/utils';

// Core 4 SIG projects: Sanganitra, Yantrika, Vidyuth, Kaaryavarta
const expoProjects = [
    {
        id: "mock-1",
        title: "Innovision Web Portal",
        sig: "Sanganitra",
        description: "The official registration and event management portal for NITK's technical fest, scaling to 15,000+ active users.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop",
        techStack: ["React", "Node.js", "PostgreSQL", "Redis"]
    },
    {
        id: "mock-2",
        title: "Autonomous All-Terrain Rover",
        sig: "Yantrika",
        description: "An autonomous rover built to traverse uneven terrains and map environments using LiDAR and computer vision.",
        image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
        techStack: ["C++", "ROS", "Raspberry Pi", "SolidWorks"]
    },
    {
        id: "mock-3",
        title: "Smart Grid Energy Monitor",
        sig: "Vidyuth",
        description: "IoT embedded sensor array mapping real-time campus power consumption and surge telemetry.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        techStack: ["ESP32", "MQTT", "Embedded C", "InfluxDB"]
    },
    {
        id: "mock-4",
        title: "Kaaryavarta Operations Suite",
        sig: "Kaaryavarta",
        description: "Strategic planning, project analytics dashboard, and cross-functional team coordination workflows.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
        techStack: ["Agile", "Jira", "Product Roadmaps", "Data Analytics"]
    }
];

const filterOptions = ["All", "Sanganitra", "Yantrika", "Vidyuth", "Kaaryavarta"];

export default function ProjectExpoPage() {
    const [projects, setProjects] = useState(expoProjects);
    const [selectedSig, setSelectedSig] = useState("All");

    useEffect(() => {
        const loadLiveProjects = async () => {
            const data = await api.getProjects();
            if (data && data.length > 0) {
                // Strictly filter to the 4 technical & management SIGs: Sanganitra, Yantrika, Vidyuth, Kaaryavarta
                const allowedData = data.filter(p => {
                    const s = (p.sig?.name || '').toLowerCase();
                    return s.includes('sanga') || s.includes('yantrika') || s.includes('vidyut') || s.includes('karyavarta') || s.includes('kaaryavarta');
                });
                if (allowedData.length > 0) {
                    const formatted = allowedData.map(p => ({
                        id: p.id,
                        title: p.title,
                        sig: p.sig?.name || "Sanganitra",
                        description: p.description || p.results || "Project developed at ACM NITK.",
                        image: p.cover_image_url || "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop",
                        techStack: p.method ? p.method.split(',').map(s => s.trim()) : ["React", "Ruby on Rails"],
                        meet_link: p.meet_link || null
                    }));
                    setProjects(formatted);
                }
            }
        };
        loadLiveProjects();
    }, []);

    const displayedProjects = selectedSig === "All"
        ? projects
        : projects.filter(p => {
            const sigLower = (p.sig || '').toLowerCase();
            const filterLower = selectedSig.toLowerCase();
            return sigLower.includes(filterLower) || (filterLower === 'vidyuth' && sigLower.includes('vidyut')) || (filterLower === 'kaaryavarta' && sigLower.includes('karyavarta'));
        });

    return (
        <main className="flex-grow w-full">
            <Hero description="Explore projects built by ACM NITK members and discover the Yantras behind them.">
                <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
                    Witness our
                </span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
                    Project Expo
                </span>
            </Hero>

            <section className="relative w-full pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="h-[1px] w-8 bg-brand-blue"></div>
                        <h2 className="text-xs font-bold tracking-[0.2em] text-brand-blue uppercase">
                            Hall of Fame
                        </h2>
                    </div>

                    {/* Filter Tabs for the 4 core SIGs */}
                    <div className="flex flex-wrap items-center gap-3 mb-12">
                        {filterOptions.map((sigName) => (
                            <button
                                key={sigName}
                                onClick={() => setSelectedSig(sigName)}
                                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 border ${
                                    selectedSig === sigName
                                        ? "bg-brand-blue text-brand-navy border-brand-blue shadow-lg scale-105"
                                        : "bg-black/[0.03] dark:bg-white/[0.03] text-gray-600 dark:text-gray-300 border-black/10 dark:border-white/10 hover:border-brand-blue/50"
                                }`}
                            >
                                {sigName}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayedProjects.map((project, idx) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ delay: idx * 0.1, duration: 0.6 }}
                                className="group flex flex-col rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm overflow-hidden hover:border-brand-blue/50 transition-all duration-500 shadow-lg"
                            >
                                <div className="relative h-64 w-full overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                                    <img
                                        src={project.image}
                                        onError={handleImageError}
                                        alt={project.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />

                                    {/* Overlay Badges */}
                                    <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
                                        <span className="px-3 py-1 rounded-full bg-brand-blue/20 backdrop-blur-md border border-brand-blue/50 text-white text-xs font-bold tracking-wider uppercase w-fit">
                                            {project.sig}
                                        </span>
                                        <h3 className="text-3xl font-bold text-white drop-shadow-md">{project.title}</h3>
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6">
                                        {project.description}
                                    </p>

                                    {/* Tech Stack Tags */}
                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.techStack.map(tech => (
                                            <span key={tech} className="px-3 py-1 text-xs font-medium bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg text-brand-navy dark:text-gray-300">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-4 mt-auto">
                                        <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-navy dark:text-white hover:text-brand-blue dark:hover:text-brand-blue transition-colors uppercase">
                                            <GitBranch className="w-4 h-4" /> Source
                                        </button>
                                        {project.meet_link ? (
                                            <a
                                                href={project.meet_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase ml-auto hover:underline"
                                            >
                                                View Demo <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </a>
                                        ) : (
                                            <button className="flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase ml-auto">
                                                View Demo <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
