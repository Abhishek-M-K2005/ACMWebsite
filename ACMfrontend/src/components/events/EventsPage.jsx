import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, ArrowRight, Clock, X } from 'lucide-react';
import Hero from '../ui/Hero';
import { api } from '../../services/api';
import { handleImageError } from '../../lib/utils';

// --- ANIMATION VARIANTS ---
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 100, damping: 15 }
    },
};

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        let isMounted = true;
        api.getEvents().then((data) => {
            if (!isMounted) return;
            if (Array.isArray(data)) {
                const checkedAt = Date.now();
                setEvents(data.map((event) => ({
                    ...event,
                    date: event.start_time
                        ? new Date(event.start_time).toLocaleDateString(undefined, { dateStyle: 'long' })
                        : 'Date to be announced',
                    time: event.start_time
                        ? new Date(event.start_time).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
                        : null,
                    image: event.cover_image_url || null,
                    sub_events: event.sub_events || [],
                    isPast: Boolean(event.start_time)
                        && new Date(event.end_time || event.start_time).getTime() < checkedAt,
                })));
            } else {
                setLoadError(true);
            }
            setIsLoading(false);
        }).catch(() => {
            if (!isMounted) return;
            setLoadError(true);
            setIsLoading(false);
        });
        return () => { isMounted = false; };
    }, []);

    const [upcomingEvents, pastEvents] = events.reduce((groups, event) => {
        groups[event.isPast ? 1 : 0].push(event);
        return groups;
    }, [[], []]);

    useEffect(() => {
        if (!selectedEvent) return undefined;
        const closeOnEscape = (event) => {
            if (event.key === 'Escape') setSelectedEvent(null);
        };
        window.addEventListener('keydown', closeOnEscape);
        return () => window.removeEventListener('keydown', closeOnEscape);
    }, [selectedEvent]);

    const renderEventCard = (event) => (
        <motion.article
            key={event.id}
            variants={cardVariants}
            className="group flex flex-col overflow-hidden rounded-3xl border border-black/10 bg-black/[0.02] shadow-lg transition-colors hover:border-brand-blue/50 dark:border-white/10 dark:bg-white/[0.02]"
        >
            {event.image && (
                <div className="h-48 w-full overflow-hidden bg-black/10">
                    <img src={event.image} onError={handleImageError} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
            )}
            <div className="flex flex-grow flex-col p-6 sm:p-8">
                <span className="mb-3 w-fit rounded-full border border-brand-blue/20 bg-brand-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-blue">
                    {event.is_sub_event ? 'Sub-event' : event.is_intra_club ? 'Chapter event' : 'Open event'}
                </span>
                <h3 className="mb-4 text-xl font-bold text-brand-navy dark:text-white sm:text-2xl">{event.title}</h3>
                <div className="mb-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p className="flex items-start gap-2"><Calendar aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />{event.date}{event.end_time && event.start_time && new Date(event.end_time).toDateString() !== new Date(event.start_time).toDateString() ? ` – ${new Date(event.end_time).toLocaleDateString(undefined, { dateStyle: 'long' })}` : ''}</p>
                    {event.time && <p className="flex items-start gap-2"><Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />{event.time}{event.end_time ? ` – ${new Date(event.end_time).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}` : ''}</p>}
                    {event.location && <p className="flex items-start gap-2"><MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand-blue" />{event.location}</p>}
                </div>
                {event.description && <p className="mb-6 flex-grow text-sm leading-relaxed text-gray-600 dark:text-gray-400">{event.description}</p>}
                <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-black/10 pt-4 text-sm dark:border-white/10">
                    <button type="button" onClick={() => setSelectedEvent(event)} className="inline-flex min-h-11 items-center gap-2 font-bold uppercase tracking-wide text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
                        Event details <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </button>
                    {event.link && <a href={event.link} target="_blank" rel="noopener noreferrer" aria-label={`Open registration or event information for ${event.title} in a new tab`} className="inline-flex min-h-11 items-center font-semibold text-brand-blue underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">Registration / event link <span className="sr-only">(opens in a new tab)</span></a>}
                </div>
            </div>
        </motion.article>
    );

    return (
        <main className="flex-grow w-full">
            {/* 1. HERO SECTION */}
            <Hero description="Browse ACM NITK events and check each listing for dates, venue, and participation details.">
                <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
                    Discover our
                </span>
                <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
                    Events
                </span>
            </Hero>

            {/* 2. EVENTS GRID SECTION */}
            <section className="relative w-full pb-32 px-6 md:px-12 lg:px-24 bg-white text-brand-navy dark:bg-black dark:text-white transition-colors duration-300">

                {/* Ambient Background Glow */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[150px] pointer-events-none z-0" />

                <div className="max-w-7xl mx-auto relative z-10">

                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-brand-blue"></div>
                        <h2 className="text-xs font-bold tracking-[0.2em] text-brand-blue uppercase">
                            Upcoming & Ongoing
                        </h2>
                      </div>
                      <a href="#past-events" className="text-sm font-semibold text-brand-blue underline underline-offset-4">Browse past events</a>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {isLoading && <p className="col-span-full py-10 text-center text-gray-500" role="status">Loading chapter events…</p>}
                        {!isLoading && loadError && <p className="col-span-full py-10 text-center text-gray-500">Events are temporarily unavailable. Please try again later.</p>}
                        {!isLoading && !loadError && upcomingEvents.length === 0 && <p className="col-span-full py-10 text-center text-gray-500">No upcoming events are listed right now. Check back for chapter updates.</p>}
                        {!isLoading && upcomingEvents.map(renderEventCard)}
                    </motion.div>

                    <section id="past-events" className="mt-24 scroll-mt-24">
                      <div className="mb-8 flex items-center gap-3">
                        <div className="h-px w-8 bg-brand-blue" />
                        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Past Events</h2>
                      </div>
                      {pastEvents.length > 0 ? (
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{pastEvents.map(renderEventCard)}</div>
                      ) : (
                        <p className="py-6 text-sm text-gray-500">Past event records and recaps will appear here when available.</p>
                      )}
                    </section>

                </div>
            </section>

            {/* Event Details Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="event-dialog-title"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedEvent(null)}
                            className="absolute inset-0 bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-[#111] rounded-3xl shadow-2xl p-8 border border-black/10 dark:border-white/10 z-10 max-h-[85vh] overflow-y-auto"
                        >
                            <button
                                type="button"
                                aria-label="Close event details"
                                onClick={() => setSelectedEvent(null)}
                                className="absolute right-4 top-4 rounded-lg p-2 text-gray-500 transition-colors hover:text-brand-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-blue dark:hover:text-white sm:right-6 sm:top-6"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="w-full h-48 rounded-2xl overflow-hidden mb-6">
                                <img
                                    src={selectedEvent.image}
                                    onError={handleImageError}
                                    alt={selectedEvent.title}
                                        decoding="async"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-brand-blue/10 border border-brand-blue/20 text-brand-blue text-xs font-bold tracking-wider uppercase mb-3 inline-block">
                                {selectedEvent.category}
                            </span>
                            <h2 id="event-dialog-title" className="text-3xl font-black text-brand-navy dark:text-white mb-4">
                                {selectedEvent.title}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 mb-6 border-y border-black/10 dark:border-white/10 text-sm text-gray-600 dark:text-gray-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-brand-blue" />
                                    <span>{selectedEvent.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-brand-blue" />
                                    <span>{selectedEvent.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-brand-blue" />
                                    <span>{selectedEvent.location}</span>
                                </div>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                                {selectedEvent.description}
                            </p>
                            {(selectedEvent.organizer || selectedEvent.contact_email) && <div className="mb-6 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                              {selectedEvent.organizer && <p><strong>Organizer:</strong> {selectedEvent.organizer}</p>}
                              {selectedEvent.contact_email && <p><strong>Contact:</strong> <a className="text-brand-blue underline" href={`mailto:${selectedEvent.contact_email}`}>{selectedEvent.contact_email}</a></p>}
                            </div>}
                            {(selectedEvent.recap_url || selectedEvent.resources_url) && <div className="mb-6 flex flex-wrap gap-4">
                              {selectedEvent.recap_url && <a className="text-sm font-semibold text-brand-blue underline" href={selectedEvent.recap_url} target="_blank" rel="noopener noreferrer">Event recap</a>}
                              {selectedEvent.resources_url && <a className="text-sm font-semibold text-brand-blue underline" href={selectedEvent.resources_url} target="_blank" rel="noopener noreferrer">Slides and resources</a>}
                            </div>}
                            {selectedEvent.link && <div className="mb-6"><a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" aria-label={`Open registration or event information for ${selectedEvent.title} in a new tab`} className="inline-flex min-h-11 items-center rounded-full bg-brand-blue px-5 py-2 font-bold text-brand-navy">Registration / event link <span className="sr-only">(opens in a new tab)</span></a><p className="mt-2 text-xs text-gray-500">This opens an external page. Review its form for details about requested information and how it will be used.</p></div>}
                            {selectedEvent.sub_events && selectedEvent.sub_events.length > 0 && (
                                <div className="pt-4 border-t border-black/10 dark:border-white/10">
                                    <h4 className="font-bold text-lg mb-3">Sub-Events & Schedule</h4>
                                    <div className="space-y-2">
                                        {selectedEvent.sub_events.map((sub, i) => (
                                            <div key={i} className="p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                                                <p className="font-semibold text-sm">{sub.title || sub.name}</p>
                                                <p className="text-xs text-gray-500">{sub.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
