import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Calendar, MapPin, ArrowRight, User, BookOpen, 
  Sparkles, ShieldCheck, Lock 
} from 'lucide-react';
import { api } from '../../services/api';
import { cn, handleImageError } from '../../lib/utils';

export default function HomeFeed() {
  const [events, setEvents] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [eventsStatus, setEventsStatus] = useState('loading');
  const [blogsStatus, setBlogsStatus] = useState('loading');
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(api.getCurrentUser()));

  useEffect(() => {
    let isMounted = true;

    const loadEvents = () => {
      api.getEvents().then((data) => {
        if (!isMounted) return;
        if (data) {
          const now = Date.now();
          setEvents(data
            .filter((event) => !event.start_time || new Date(event.end_time || event.start_time).getTime() >= now)
            .sort((a, b) => new Date(a.start_time || '9999-12-31') - new Date(b.start_time || '9999-12-31'))
            .slice(0, 4));
          setEventsStatus('loaded');
        } else {
          setEventsStatus('error');
        }
      });
    };

    const handleAuthChange = () => {
      setIsLoggedIn(Boolean(api.getCurrentUser()));
      setEventsStatus('loading');
      loadEvents();
    };
    window.addEventListener('acm-auth-changed', handleAuthChange);
    loadEvents();

    // Fetch live blogs
    api.getBlogs().then((data) => {
      if (!isMounted) return;
      if (data) {
        setBlogs(data
          .sort((a, b) => new Date(b.published_at || b.created_at || 0) - new Date(a.published_at || a.created_at || 0))
          .slice(0, 3));
        setBlogsStatus('loaded');
      } else {
        setBlogsStatus('error');
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener('acm-auth-changed', handleAuthChange);
    };
  }, []);

  const nextEvent = events[0];
  const remainingEvents = events.slice(1);

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

          {eventsStatus === 'loaded' && nextEvent && (
            <article className="relative mb-8 overflow-hidden rounded-3xl border border-brand-blue/25 bg-gradient-to-r from-brand-blue/[0.12] via-brand-blue/[0.05] to-transparent p-6 shadow-sm dark:from-brand-blue/20 dark:via-brand-blue/[0.08] md:p-8">
              <div className="absolute -right-10 -top-16 h-48 w-48 rounded-full bg-brand-blue/10 blur-3xl" aria-hidden="true" />
              <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue px-3 py-1 text-[10px] font-black uppercase tracking-wider text-brand-navy">
                      <Sparkles className="h-3 w-3" /> Next up
                    </span>
                    {nextEvent.is_intra_club && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-brand-blue/30 bg-white/50 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-brand-blue dark:bg-black/20">
                        <Lock className="h-3 w-3" /> Intra-club
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black tracking-tight md:text-3xl">
                    {nextEvent.title || 'Upcoming chapter event'}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <span className="inline-flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-brand-blue" />
                      {nextEvent.start_time
                        ? new Date(nextEvent.start_time).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
                        : 'Date to be announced'}
                    </span>
                    {nextEvent.location && (
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-brand-blue" /> {nextEvent.location}
                      </span>
                    )}
                  </div>
                  {nextEvent.description && (
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-2">
                      {nextEvent.description}
                    </p>
                  )}
                </div>
                <Link
                  to="/events"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-brand-blue px-5 py-3 text-sm font-bold text-brand-navy transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue md:self-center"
                >
                  Event details <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          )}

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remainingEvents.map((event, idx) => {
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
                          loading="lazy"
                          decoding="async"
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
            {eventsStatus === 'loading' && <p className="col-span-full py-8 text-sm text-gray-500" role="status">Loading chapter events…</p>}
            {eventsStatus === 'error' && <p className="col-span-full py-8 text-sm text-gray-500">Events are temporarily unavailable. Please try again later.</p>}
            {eventsStatus === 'loaded' && events.length === 0 && <p className="col-span-full py-8 text-sm text-gray-500">No upcoming events are listed right now. Check the Events page for updates.</p>}
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
                          loading="lazy"
                          decoding="async"
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
            {blogsStatus === 'loading' && <p className="col-span-full py-8 text-sm text-gray-500" role="status">Loading chapter articles…</p>}
            {blogsStatus === 'error' && <p className="col-span-full py-8 text-sm text-gray-500">Chapter articles are temporarily unavailable. Please try again later.</p>}
            {blogsStatus === 'loaded' && blogs.length === 0 && <p className="col-span-full py-8 text-sm text-gray-500">No recent chapter articles are available yet.</p>}
          </div>
        </div>

      </div>
    </section>
  );
}
