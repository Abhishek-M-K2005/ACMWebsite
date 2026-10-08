import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Target, Lightbulb, Quote, Sparkles, 
  Layers, Images, FolderGit2, Users as UsersIcon, ArrowRight
} from 'lucide-react';
import Hero from '../ui/Hero';
import Loader from '../ui/Loader';
import AceternityParallaxGallery from './AceternityParallaxGallery';
import { api } from '../../services/api';
import { cn, handleImageError } from '../../lib/utils';

// High-resolution thematic gallery collections by SIG/Yantra
const SIG_GALLERY_COLLECTIONS = {
  sanganitra: [
    {
      id: 'san-1',
      title: 'Systems & Kernel Hacking Workshop',
      category: 'Workshops',
      description: 'Hands-on session diving into Linux kernel internals, concurrency primitives, and low-level memory layout.',
      src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'san-2',
      title: 'Distributed Systems & Cloud Dev',
      category: 'Projects',
      description: 'Building resilient high-throughput microservices using Go, gRPC, and container orchestration.',
      src: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'san-3',
      title: 'ACM Code Sprint & Hackathon',
      category: 'Events',
      description: 'Intense 36-hour competitive coding and hackathon challenge hosted at NITK.',
      src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'san-4',
      title: 'Modern Web Architecture Showcase',
      category: 'Showcase',
      description: 'Demonstration of modern micro-frontends, responsive interaction design, and distributed caching.',
      src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'san-5',
      title: 'Algorithms & Competitive Programming Meet',
      category: 'Workshops',
      description: 'Deep dive into graph algorithms, dynamic programming optimizations, and problem solving.',
      src: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'san-6',
      title: 'AI & Data Science Hack Sprint',
      category: 'Events',
      description: 'Collaborative development of predictive models and neural network fine-tuning.',
      src: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=1200&auto=format&fit=crop'
    }
  ],
  yantrika: [
    {
      id: 'yan-1',
      title: 'Autonomous Rover & Robotics Lab',
      category: 'Projects',
      description: 'Designing autonomous mobile robots with ROS2, LiDAR navigation, and custom mechanical chassis.',
      src: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'yan-2',
      title: '3D CAD Prototyping & Rapid Manufacturing',
      category: 'Workshops',
      description: 'Precision mechanical modeling and additive manufacturing for lightweight aerial robotics.',
      src: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'yan-3',
      title: 'Robotics Hardware Expo',
      category: 'Showcase',
      description: 'Annual mechanical innovation showcase exhibiting student robotic arms and drone frames.',
      src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'yan-4',
      title: 'Sensors, Actuators & Embedded Drivers',
      category: 'Workshops',
      description: 'Hands-on embedded microcontroller programming and feedback loop control.',
      src: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'yan-5',
      title: 'Aerodynamics & Drone Assembly',
      category: 'Projects',
      description: 'Custom flight controllers, motor synchronization, and telemetry transmission.',
      src: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=1200&auto=format&fit=crop'
    }
  ],
  vidyut: [
    {
      id: 'vid-1',
      title: 'High-Speed PCB Design & Fabrication',
      category: 'Projects',
      description: 'Designing multi-layer PCBs with impedance matching, RF shielding, and microcontroller circuits.',
      src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'vid-2',
      title: 'Embedded IoT & Smart Sensor Nodes',
      category: 'Workshops',
      description: 'Firmware programming with ESP32, FreeRTOS, and MQTT telemetry integration.',
      src: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'vid-3',
      title: 'Hardware Signal Analysis & Oscilloscope Lab',
      category: 'Showcase',
      description: 'Debugging analog signals, protocol analyzers, and power distribution networks.',
      src: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'vid-4',
      title: 'Power Electronics & Inverter Prototyping',
      category: 'Projects',
      description: 'Switching regulator design and clean energy management prototypes.',
      src: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=1200&auto=format&fit=crop'
    }
  ],
  acmw: [
    {
      id: 'acmw-1',
      title: 'EmpowerTech Summit & Women in Computing',
      category: 'Events',
      description: 'Celebrating women in engineering with keynote talks, panels, and tech mentorship.',
      src: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'acmw-2',
      title: 'Mentorship & Tech Leadership Circles',
      category: 'Workshops',
      description: 'Connecting junior students with industry engineers and academic researchers.',
      src: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'acmw-3',
      title: 'ACM-W Hack for Impact Showcase',
      category: 'Showcase',
      description: 'Collaborative hackathon solving social impact challenges with modern tech.',
      src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop'
    },
    {
      id: 'acmw-4',
      title: 'Career Pathways & Graduate Seminars',
      category: 'Workshops',
      description: 'Guidance sessions on research internships, fellowship programs, and corporate roles.',
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop'
    }
  ]
};

// Generic fallback collection for other SIGs
const DEFAULT_GALLERY = [
  {
    id: 'def-1',
    title: 'Technical Ideation & Sprint',
    category: 'Workshops',
    description: 'Brainstorming architectures, design patterns, and engineering deliverables.',
    src: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'def-2',
    title: 'Research & Innovation Showcase',
    category: 'Showcase',
    description: 'Demonstration of prototypes, whitepapers, and technical reports developed by SIG members.',
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'def-3',
    title: 'Community Hackathon',
    category: 'Events',
    description: 'Hands-on weekend sprint turning innovative concepts into functioning software.',
    src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'def-4',
    title: 'Engineering Peer Reviews',
    category: 'Projects',
    description: 'Code reviews and architectural walkthroughs emphasizing quality engineering practices.',
    src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'def-5',
    title: 'Hands-on Technology Lab',
    category: 'Workshops',
    description: 'Collaborative technical experimentation in state-of-the-art developer environments.',
    src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: 'def-6',
    title: 'Annual Project Exhibition',
    category: 'Showcase',
    description: 'Showcasing completed projects to institute students, faculty, and visiting evaluators.',
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop'
  }
];

export default function SigDetailsPage() {
  const { id } = useParams();
  const [sig, setSig] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Parallax refs for sections
  const overviewRef = useRef(null);
  const projectsRef = useRef(null);

  const { scrollYProgress: overviewScroll } = useScroll({
    target: overviewRef,
    offset: ['start end', 'end start']
  });

  const { scrollYProgress: projectsScroll } = useScroll({
    target: projectsRef,
    offset: ['start end', 'end start']
  });

  const overviewY = useTransform(overviewScroll, [0, 1], [30, -30]);
  const projectsY = useTransform(projectsScroll, [0, 1], [40, -40]);

  useEffect(() => {
    // If user navigates directly to /sigs/acmw or /sigs/40, immediately redirect to external ACM-W site
    const normalizedParam = String(id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalizedParam === 'acmw' || normalizedParam === '40') {
      window.location.replace('https://acmwnitk.hosting.acm.org');
      return;
    }

    const fetchSigDetails = async () => {
      const startTime = Date.now();
      try {
        const data = await api.getSig(id);
        if (!data || data.error) {
          throw new Error('Yantra (SIG) not found or backend offline');
        }
        // Double check in case name resolved to ACMW from backend
        if ((data.name || '').toLowerCase().replace(/[^a-z]/g, '') === 'acmw') {
          window.location.replace('https://acmwnitk.hosting.acm.org');
          return;
        }
        setSig(data);
      } catch (err) {
        setError(err.message || 'Unable to load Yantra details');
      } finally {
        // General page/details loading reduced to half time (1000ms)
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 1000 - elapsed);
        setTimeout(() => {
          setIsLoading(false);
        }, remaining);
      }
    };

    fetchSigDetails();
  }, [id]);

  // Combine backend media_assets and project images with curated SIG collection
  const galleryItems = useMemo(() => {
    if (!sig) return [];

    const items = [];
    const normalizedName = (sig.name || '').toLowerCase().trim();

    // 1. Backend media assets if present
    if (sig.media_assets && sig.media_assets.length > 0) {
      sig.media_assets.forEach((asset, idx) => {
        if (asset.file_url) {
          items.push({
            id: `media-${asset.id || idx}`,
            title: asset.file_name || `${sig.name} Photo ${idx + 1}`,
            category: 'Media',
            description: `${sig.name} media archive`,
            src: asset.file_url
          });
        }
      });
    }

    // 2. Project cover images if present
    if (sig.projects && sig.projects.length > 0) {
      sig.projects.forEach((proj, idx) => {
        if (proj.cover_image_url) {
          items.push({
            id: `proj-${proj.id || idx}`,
            title: proj.title || 'Project Showcase',
            category: 'Projects',
            description: `Project developed within ${sig.name}`,
            src: proj.cover_image_url
          });
        }
      });
    }

    // 3. SIG-specific curated high-res gallery
    const curated = SIG_GALLERY_COLLECTIONS[normalizedName] || DEFAULT_GALLERY;
    items.push(...curated);

    return items;
  }, [sig]);

  if (isLoading) return <Loader text="Loading Yantra Details..." overlay={true} />;

  if (error) {
    return (
      <div className="text-center py-32 flex flex-col items-center">
        <p className="text-red-400 font-bold mb-4">{error}</p>
        <Link to="/" className="text-brand-blue hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <main className="flex-grow w-full">
      <Hero>
        <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
          Discover
        </span>
        <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)] uppercase">
          {sig.name}
        </span>
      </Hero>

      <div className="relative w-full pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300">
        <div className="max-w-6xl mx-auto relative z-10 pt-10">
          
          {/* Back Link */}
          <div className="mb-10">
            <Link
              to="/project-proposals"
              className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase hover:underline transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Yantras
            </Link>
          </div>

          {/* Subtitle & Motto */}
          <div className="text-center mb-20">
            <h1 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{sig.title}</h1>
            {sig.motto && (
              <div className="flex items-center justify-center gap-3 text-brand-blue italic font-medium text-lg md:text-xl">
                <Quote className="w-6 h-6 opacity-50" />
                <span>{sig.motto}</span>
              </div>
            )}
          </div>

          {/* SECTION 1: OVERVIEW (With Subtle Parallax Float) */}
          <section ref={overviewRef} className="relative mb-28">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[1px] w-8 bg-brand-blue" />
              <h2 className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-2">
                <Layers className="w-4 h-4" /> Overview & Purpose
              </h2>
            </div>

            <motion.div style={{ y: overviewY }} className="space-y-12">
              <div className="p-8 md:p-12 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-xl text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-light">
                <p>{sig.description}</p>
              </div>

              {/* Vision & Mission Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sig.vision && (
                  <div className="p-8 md:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm shadow-lg hover:border-brand-blue/40 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center">
                        <Lightbulb className="w-5 h-5 text-brand-blue" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-widest">Our Vision</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{sig.vision}</p>
                  </div>
                )}
                
                {sig.mission && (
                  <div className="p-8 md:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm shadow-lg hover:border-brand-blue/40 transition-colors duration-300">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-brand-blue/15 border border-brand-blue/30 flex items-center justify-center">
                        <Target className="w-5 h-5 text-brand-blue" />
                      </div>
                      <h3 className="text-lg font-bold uppercase tracking-widest">Our Mission</h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{sig.mission}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </section>

          {/* SECTION 2: PROJECTS SECTION (Sequential Below Overview) */}
          {sig.projects && sig.projects.length > 0 && (
            <section ref={projectsRef} className="relative mb-28">
              <div className="flex items-center justify-between mb-10 border-b border-black/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-brand-blue" />
                  <h2 className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4" /> Featured Projects
                  </h2>
                </div>
                <Link
                  to="/projects"
                  className="text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline flex items-center gap-1"
                >
                  View All Expo Projects <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <motion.div style={{ y: projectsY }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sig.projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="group rounded-3xl p-6 border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-lg hover:border-brand-blue/50 hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
                  >
                    <div>
                      {proj.cover_image_url ? (
                        <div className="h-44 rounded-2xl overflow-hidden mb-4 bg-black/10">
                          <img
                            src={proj.cover_image_url}
                            alt={proj.title}
                            onError={handleImageError}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="h-32 rounded-2xl mb-4 bg-gradient-to-br from-brand-blue/10 to-transparent border border-brand-blue/20 flex items-center justify-center">
                          <FolderGit2 className="w-8 h-8 text-brand-blue/60" />
                        </div>
                      )}
                      <h4 className="text-xl font-bold mb-2 group-hover:text-brand-blue transition-colors">
                        {proj.title}
                      </h4>
                    </div>
                    <Link
                      to="/projects"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
                    >
                      Explore Project <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </motion.div>
            </section>
          )}

          {/* SECTION 3: ACETERNITY PARALLAX GALLERY (Sequential Below Projects) */}
          <section className="relative mb-28">
            <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-[1px] w-8 bg-brand-blue" />
                  <span className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-2">
                    <Images className="w-4 h-4" /> Visual Archive
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black">
                  {sig.name} In Action
                </h2>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                <span>Interactive multi-depth parallax gallery</span>
              </div>
            </div>

            {/* Parallax Bento Gallery Component */}
            <AceternityParallaxGallery items={galleryItems} sigName={sig.name} />
          </section>

          {/* SECTION 4: CORE MEMBERS */}
          {sig.members && sig.members.length > 0 && (
            <section className="relative pt-6 border-t border-black/10 dark:border-white/10">
              <div className="flex items-center gap-3 mb-10">
                <div className="h-[1px] w-8 bg-brand-blue" />
                <h2 className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" /> Core Members
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
                {sig.members.map((member) => (
                  <div
                    key={member.id}
                    className="p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md shadow-lg flex flex-col items-center text-center hover:border-brand-blue/50 transition-colors duration-300"
                  >
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-brand-blue/20 mb-3 border-2 border-brand-blue/40">
                      {member.avatar_url ? (
                        <img
                          src={member.avatar_url}
                          onError={handleImageError}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-brand-blue uppercase">
                          {member.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <h4 className="text-sm font-bold mb-1">{member.name}</h4>
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-brand-blue hover:underline mt-1"
                      >
                        LinkedIn
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </main>
  );
}