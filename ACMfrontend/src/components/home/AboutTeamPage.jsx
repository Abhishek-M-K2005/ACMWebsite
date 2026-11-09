import React, { useState, useEffect } from 'react';
import Hero from '../ui/Hero';
import { Mail, Sparkles, Filter, Loader2 } from 'lucide-react';
import { api } from '../../services/api';

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9h2.79v8.37H6.46v-8.37M7.86 6.33a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
    </svg>
  );
}

const sourceLinkClass = 'font-semibold text-brand-blue underline underline-offset-4 hover:text-indigo-500';

const sigFilters = ["All", "Sanganitra", "Vidyut", "Yantrika", "Saahitya", "Kaaryavarta", "ACM-W"];

function TeamMemberCard({ member }) {
  const [imgError, setImgError] = useState(false);

  const initials = member.name
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .slice(0, 3)
    .join('')
    .toUpperCase();

  return (
    <li className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black/30 transition-all duration-300 hover:border-brand-blue/40 hover:shadow-xl hover:shadow-brand-blue/5">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-brand-blue/15 via-indigo-500/10 to-transparent flex items-center justify-center">
        {!imgError ? (
          <img
            src={member.photo}
            alt={member.name}
            onError={() => setImgError(true)}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 p-6 text-center select-none">
            <div className="w-16 h-16 rounded-full bg-brand-blue/20 border border-brand-blue/40 flex items-center justify-center text-xl font-black text-brand-blue">
              {initials}
            </div>
            <span className="text-[11px] font-mono text-gray-400 dark:text-gray-500">
              {member.photo.replace('/dpimg/', '')}
            </span>
          </div>
        )}

        {/* Sub-SIG Badge */}
        {member.subSig && (
          <span className="absolute top-3 right-3 rounded-full bg-black/60 backdrop-blur-md px-2.5 py-1 text-[11px] font-semibold text-white border border-white/10">
            {member.subSig}
          </span>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 sm:p-6 justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">
              {member.role}
            </p>
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">
              {member.sig}
            </span>
          </div>

          <h3 className="mt-1.5 text-xl font-bold tracking-tight text-brand-navy dark:text-white">
            {member.name}
          </h3>
        </div>

        {/* Social / Contact Links */}
        <div className="flex items-center gap-3 pt-3 border-t border-black/5 dark:border-white/10 text-gray-500 dark:text-gray-400">
          {member.linkedin && member.linkedin !== '.' && (
            <a
              href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors flex items-center gap-1.5 text-xs font-semibold"
              title={`${member.name} on LinkedIn`}
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="hover:text-brand-blue transition-colors flex items-center gap-1.5 text-xs font-semibold ml-auto"
              title={`Email ${member.name}`}
            >
              <Mail className="w-4 h-4" />
              <span>Email</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}

export default function AboutTeamPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("All");

  useEffect(() => {
    let active = true;
    api.getMembers(true).then((data) => {
      if (active) {
        if (Array.isArray(data)) {
          setMembers(data);
        }
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const displayedMembers = selectedFilter === "All"
    ? members
    : members.filter(m => m.sig && m.sig.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <main className="flex-grow w-full">
      <Hero description="Learn about ACM NITK's place at NITK Surathkal, the chapter's history, and meet the official core team leading the charge.">
        <span className="text-4xl sm:text-5xl md:text-7xl font-black text-brand-blue">About &amp; Team</span>
      </Hero>

      <div className="relative mx-auto max-w-6xl space-y-12 px-4 pb-24 sm:px-6 md:px-12 text-brand-navy dark:text-white">
        
        {/* Section 1: Who We Are */}
        <section className="rounded-3xl border border-black/10 bg-black/[0.02] p-5 sm:p-7 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Who we are</p>
          <h2 className="mb-4 text-3xl font-bold">A student chapter at NITK Surathkal</h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            ACM is a global computing community that advances computing as a science and a profession. ACM NITK is its student chapter at the National Institute of Technology Karnataka, Surathkal. The chapter connects students with computing through specialized interest groups, hardware and software projects, workshops, and flagship fests.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a className={sourceLinkClass} href="https://www.acm.org/" target="_blank" rel="noopener noreferrer">About ACM</a>
            <a className={sourceLinkClass} href="https://www.acm.org/chapters" target="_blank" rel="noopener noreferrer">ACM chapters</a>
            <a className={sourceLinkClass} href="https://acm.nitk.ac.in/" target="_blank" rel="noopener noreferrer">ACM NITK public site</a>
            <a className={sourceLinkClass} href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer">NITK official site</a>
          </div>
        </section>

        {/* Section 2: Chapter Milestones */}
        <section className="rounded-3xl border border-black/10 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">A brief history</p>
          <h2 className="mb-6 text-3xl font-bold">Chapter milestones</h2>
          <ol className="space-y-6 border-l border-brand-blue/30 pl-6">
            <li className="relative">
              <span className="absolute -left-[1.68rem] top-1.5 h-3 w-3 rounded-full bg-brand-blue" />
              <p className="font-semibold">More than a decade of ACM at NITK by 2017</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                NITK's 2017 Shoreline publication described ACM as part of campus life for over a decade and noted its collaboration with Engineer from the fest's early years.
              </p>
              <a className={`mt-2 inline-block text-sm ${sourceLinkClass}`} href="https://webj.nitk.ac.in/images/pub/shoreline17.pdf" target="_blank" rel="noopener noreferrer">Read the NITK Shoreline 2017 reference</a>
            </li>
            <li className="relative">
              <span className="absolute -left-[1.68rem] top-1.5 h-3 w-3 rounded-full bg-brand-blue" />
              <p className="font-semibold">ACM-W NITK established in 2019</p>
              <p className="mt-1 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                ACM-W NITK began in summer 2019 to support and mentor women in computing and technology across engineering disciplines.
              </p>
              <a className={`mt-2 inline-block text-sm ${sourceLinkClass}`} href="https://acmwnitk.hosting.acm.org/" target="_blank" rel="noopener noreferrer">Visit ACM-W NITK</a>
            </li>
          </ol>
        </section>

        {/* Section 3: Meet the Core Team */}
        <section aria-labelledby="meet-us-heading" className="rounded-3xl border border-black/10 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-black/10 dark:border-white/10 pb-6">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Leadership &amp; Core
              </p>
              <h2 id="meet-us-heading" className="text-3xl sm:text-4xl font-black">
                The People Behind ACM NITK
              </h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                Meet the official core committee driving technical initiatives, specialized interest groups, and chapter milestones.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-1 text-xs font-semibold text-gray-500 mr-1">
                <Filter className="w-3.5 h-3.5" /> Filter:
              </div>
              {sigFilters.map((sig) => (
                <button
                  key={sig}
                  onClick={() => setSelectedFilter(sig)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedFilter === sig
                      ? "bg-brand-blue text-brand-navy shadow-md shadow-brand-blue/20"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {sig}
                </button>
              ))}
            </div>
          </div>

          {/* Members Grid */}
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-6 h-80 flex flex-col justify-between">
                  <div className="w-full h-44 bg-black/10 dark:bg-white/10 rounded-xl" />
                  <div className="space-y-2 pt-4">
                    <div className="h-4 bg-brand-blue/20 rounded w-1/3" />
                    <div className="h-6 bg-black/10 dark:bg-white/10 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : displayedMembers.length === 0 ? (
            <div className="py-12 text-center text-gray-500 dark:text-gray-400">
              No core members found for this category.
            </div>
          ) : (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {displayedMembers.map((member) => (
                <TeamMemberCard key={member.id || `${member.role}-${member.name}`} member={member} />
              ))}
            </ul>
          )}

          <div className="mt-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-brand-blue/10 border border-brand-blue/20">
            <div>
              <h4 className="font-bold text-lg text-brand-navy dark:text-white">Want to collaborate or join our initiatives?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-0.5">Reach out to the chapter core committee or visit our public meetups.</p>
            </div>
            <a
              href="mailto:acm@nitk.edu.in"
              className="inline-flex min-h-11 items-center justify-center shrink-0 rounded-full bg-brand-blue px-6 py-2.5 text-sm font-bold text-brand-navy transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
            >
              Contact ACM NITK
            </a>
          </div>
        </section>

      </div>
    </main>
  );
}
