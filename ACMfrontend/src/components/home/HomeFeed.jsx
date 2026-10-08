import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, ArrowRight, User, BookOpen, 
  Sparkles, ShieldCheck, Lock, ExternalLink 
} from 'lucide-react';
import { api } from '../../services/api';
import { cn, handleImageError } from '../../lib/utils';

// Fallback events (Open public events)
const fallbackOpenEvents = [
  {
    id: "evt-1",
    title: "Innovision 2026: Hack the Future",
    start_time: "2026-10-15T09:00:00Z",
    location: "Main Auditorium, NITK",
    description: "The largest annual flagship hackathon at NITK. Build cutting-edge solutions across AI, Systems, and Distributed Computing with mentors.",
    cover_image_url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1000&auto=format&fit=crop",
    is_intra_club: false
  },
  {
    id: "evt-2",
    title: "System Design & Distributed Scalability Masterclass",
    start_time: "2026-10-24T17:30:00Z",
    location: "LHC-C, Seminar Hall",
    description: "An intensive architectural teardown of large-scale distributed systems, database sharding, and high-throughput pipelines.",
    cover_image_url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
    is_intra_club: false
  }
];

// Fallback Intra-Club Event (displayed when user is logged in)
const fallbackIntraEvents = [
  {
    id: "evt-intra-1",
    title: "ACM Intra-Club Project Review & SIG Leads Sprint",
    start_time: "2026-10-12T18:00:00Z",
    location: "ACM Clubroom / Discord",
    description: "Internal sprint for active chapter members and SIG leads to evaluate milestone deliverables and hardware allocations.",
    cover_image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop",
    is_intra_club: true
  }
];

// Fallback blogs
const fallbackBlogs = [
  {
    id: "blog-1",
    title: "Building Scalable Systems for Innovision 2026",
    writer_name: "Sanganitra Team",
    published_at: "2026-09-05T12:00:00Z",
    subtitle: "How our backend engineering team handled a 500% spike in traffic during registrations using Redis caching and Go microservices.",
    cover_image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "blog-2",
    title: "The Ultimate Guide to Open Source Contributions",
    writer_name: "Vidyut SIG",
    published_at: "2026-08-22T12:00:00Z",
    subtitle: "A step-by-step blueprint from NITK seniors on navigating massive codebases and submitting first-time pull requests.",
    cover_image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: "blog-3",
    title: "Mastering Dynamic Programming for ICPC",
    writer_name: "Karyavarta Competitive Team",
    published_at: "2026-07-14T12:00:00Z",
    subtitle: "Unpacking the 5 core dynamic programming problem paradigms for collegiate competitive programming contests.",
    cover_image_url: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1000&auto=format&fit=crop"
  }
];

export default function HomeFeed() {
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = api.getCurrentUser();
    setIsLoggedIn(!!user);
    setCurrentUser(user);

    // Fetch live events (will include intra-club if authenticated)
    api.getEvents().then((data) => {
      if (data && data.length > 0) {
        setEvents(data.slice(0, 4));
      } else {
        setEvents(user ? [...fallbackIntraEvents, ...fallbackOpenEvents] : fallbackOpenEvents);
      }
    });

    // Fetch live blogs
    api.getBlogs().then((data) => {
      if (data && data.length > 0) {
        setBlogs(data.slice(0, 3));
      } else {
        setBlogs(fallbackBlogs);
      }
    });
  }, []);

  return (
    <section className="relative w-full py-28 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] bg-brand-blue/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-10 left-[-10%] w-[450px] h-[450px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-32">

        {/* ========================================================= */}
        {/* SECTION 1: UPCOMING EVENTS (OPEN vs INTRA-CLUB LOGIC)    */}
        {/* ========================================================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-brand-blue" />
                <span className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Events Calendar
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Upcoming Chapter Events
              </h2>
            </div>

            {/* Auth Badge status for events */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-xs font-bold text-brand-blue">
                  <ShieldCheck className="w-4 h-4 text-brand-blue" />
                  <span>Member Access: Open + Intra-Club Events</span>
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-medium text-gray-500 dark:text-gray-400">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Public Open Events (Login for Intra-Club)</span>
                </div>
              )}

              <Link
                to="/events"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
              >
                All Events <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, idx) => {
              const isIntra = event.is_intra_club;
              const dateStr = event.start_time 
                ? new Date(event.start_time).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Upcoming';

              return (
                <motion.div
                  key={event.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={cn(
                    "group relative rounded-3xl p-6 border flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300",
                    isIntra
                      ? "border-brand-blue/40 bg-brand-blue/[0.03] dark:bg-brand-blue/[0.04] hover:border-brand-blue"
                      : "border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-brand-blue/50",
                    "backdrop-blur-md hover:shadow-2xl hover:-translate-y-1"
                  )}
                >
                  <div>
                    {/* Event Image */}
                    {event.cover_image_url && (
                      <div className="h-44 w-full rounded-2xl overflow-hidden mb-5 bg-black/10">
                        <img
                          src={event.cover_image_url}
                          alt={event.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase",
                        isIntra 
                          ? "bg-brand-blue text-brand-navy font-black shadow-sm"
                          : "bg-black/5 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                      )}>
                        {isIntra ? "🔒 Intra-Club Only" : "🌐 Open Event"}
                      </span>

                      <div className="flex items-center gap-1 text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                        <Calendar className="w-3 h-3 text-brand-blue" />
                        <span>{dateStr}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2 group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Location */}
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400 mb-3">
                        <MapPin className="w-3.5 h-3.5 text-brand-blue shrink-0" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed line-clamp-3 mb-6 font-light">
                      {event.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                    <Link
                      to="/events"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
                    >
                      View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-8 text-center sm:hidden">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs font-bold text-brand-blue uppercase tracking-wider"
            >
              Browse All Events <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>


        {/* ========================================================= */}
        {/* SECTION 2: RECENT BLOGS & TECHNICAL DISPATCHES            */}
        {/* ========================================================= */}
        <div>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 border-b border-black/10 dark:border-white/10 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="h-[1px] w-8 bg-brand-blue" />
                <span className="text-xs font-bold tracking-[0.25em] text-brand-blue uppercase flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" /> Editorial Feed
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Recent Chapter Dispatches
              </h2>
            </div>

            <Link
              to="/blog/acm-nitk"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
            >
              Read NITK Blog <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogs.map((post, idx) => {
              const pubDate = post.published_at 
                ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'Recent';

              return (
                <motion.article
                  key={post.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className="group rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-md p-6 flex flex-col justify-between hover:border-brand-blue/50 hover:shadow-2xl transition-all duration-300"
                >
                  <div>
                    {/* Cover image */}
                    {post.cover_image_url && (
                      <div className="h-44 w-full rounded-2xl overflow-hidden mb-5 bg-black/10">
                        <img
                          src={post.cover_image_url}
                          alt={post.title}
                          onError={handleImageError}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}

                    {/* Metadata */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3 font-medium">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-brand-blue" />
                        <span>{post.author?.name || post.writer_name || "ACM NITK"}</span>
                      </div>
                      <span>•</span>
                      <span>{pubDate}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-brand-navy dark:text-white mb-2 group-hover:text-brand-blue transition-colors duration-300 line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-light line-clamp-3 mb-6">
                      {post.subtitle || post.content || "Explore this latest technical article written by our student chapter members."}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/5 dark:border-white/5">
                    <Link
                      to="/blog/acm-nitk"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue uppercase tracking-wider hover:underline"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
