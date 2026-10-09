import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowLeft, Target, Lightbulb, Quote, 
  Layers, Images, FolderGit2, Users as UsersIcon, ArrowRight
} from 'lucide-react';
import Hero from '../ui/Hero';
import Loader from '../ui/Loader';
import AceternityParallaxGallery from './AceternityParallaxGallery';
import { api } from '../../services/api';
import { handleImageError } from '../../lib/utils';

// Keep the public Yantra pages navigable when the Rails API is unavailable.
// These titles and summaries mirror the chapter's seeded SIG records.
const LOCAL_SIGS = {
  sanganitra: { name: 'Sanganitra', title: 'Computer Science SIG', description: 'Exploring software and algorithms.' },
  yantrika: { name: 'Yantrika', title: 'Mechanical SIG', description: 'Building the physical future.' },
  vidyuth: { name: 'Vidyuth', title: 'Electrical SIG', description: 'Powering innovations.' },
  kaaryavarta: { name: 'Kaaryavarta', title: 'Management SIG', description: 'Leading and organizing.' },
  saahitya: { name: 'Saahitya', title: 'Literary & Research SIG', description: 'Technical publications, newsletters and research writing.' },
  abhivyakta: { name: 'Abhivyakta', title: 'Media & Design SIG', description: 'Digital art, branding and front-end aesthetics.' },
  krutagnata: { name: 'Krutagnata', title: 'Social Initiative SIG', description: 'Tech-driven community outreach and impact.' },
};

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
        const normalizedName = String(id || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const sigData = data && !data.error ? data : LOCAL_SIGS[normalizedName];
        if (!sigData) throw new Error('Yantra (SIG) not found');
        // Double check in case name resolved to ACMW from backend
        if ((sigData.name || '').toLowerCase().replace(/[^a-z]/g, '') === 'acmw') {
          window.location.replace('https://acmwnitk.hosting.acm.org');
          return;
        }
        setSig({ projects: [], members: [], media_assets: [], ...sigData });
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

  // Only show real media attached to this Yantra or its projects. Avoid presenting
  // stock/demo imagery and invented event descriptions as chapter activity.
  const galleryItems = useMemo(() => {
    if (!sig) return [];

    const items = [];
    (sig.media_assets || []).forEach((asset, index) => {
      if (!asset.file_url) return;
      items.push({
        id: `media-${asset.id || index}`,
        title: asset.file_name || `${sig.name} Photo ${index + 1}`,
        category: 'Media',
        description: `${sig.name} media archive`,
        src: asset.file_url
      });
    });

    (sig.projects || []).forEach((project, index) => {
      if (!project.cover_image_url) return;
      items.push({
        id: `project-${project.id || index}`,
        title: project.title || 'Project',
        category: 'Projects',
        description: `Project from ${sig.name}`,
        src: project.cover_image_url
      });
    });

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
      <Hero description={sig.description || `Explore ${sig.name}, its projects, and activities within ACM NITK.`}>
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
            <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">{sig.title}</h2>
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
                            loading="lazy"
                            decoding="async"
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

          {/* Show only uploaded Yantra media and actual project cover images. */}
          {galleryItems.length > 0 && <section className="relative mb-28">
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
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Photos and project images shared by this Yantra.
              </p>
            </div>

            {/* Parallax Bento Gallery Component */}
            <AceternityParallaxGallery items={galleryItems} sigName={sig.name} />
          </section>}

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
