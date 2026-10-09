import Hero from '../ui/Hero';

const sourceLinkClass = 'font-semibold text-brand-blue underline underline-offset-4 hover:text-indigo-500';

// These are layout placeholders only. Replace every name and photo with the
// current, chapter-approved roster before publishing the page.
const teamMembers = [
  { role: 'Chairperson', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Vice Chairperson', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Convenor', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Secretary', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Treasurer', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Faculty Advisor', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Technical Secretary', name: 'Dummy Name', photo: '/team-placeholder.svg' },
  { role: 'Webmaster', name: 'Dummy Name', photo: '/team-placeholder.svg' },
];

export default function AboutTeamPage() {
  return (
    <main className="flex-grow w-full">
      <Hero description="Learn about ACM NITK's place at NITK Surathkal, the chapter's history, and how to reach the current team.">
        <span className="text-5xl md:text-7xl font-black text-brand-blue">About &amp; Team</span>
      </Hero>

      <div className="relative mx-auto max-w-5xl space-y-8 px-6 pb-28 text-brand-navy dark:text-white md:px-12">
        <section className="rounded-3xl border border-black/10 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Who we are</p>
          <h2 className="mb-4 text-3xl font-bold">A student chapter at NITK Surathkal</h2>
          <p className="leading-relaxed text-gray-600 dark:text-gray-300">
            ACM is a global computing community that advances computing as a science and a profession. ACM NITK is its student chapter at the National Institute of Technology Karnataka, Surathkal. The chapter connects students with computing through the interest groups, projects, and events featured on this site.
          </p>
          <div className="mt-6 flex flex-wrap gap-5 text-sm">
            <a className={sourceLinkClass} href="https://www.acm.org/" target="_blank" rel="noopener noreferrer">About ACM</a>
            <a className={sourceLinkClass} href="https://www.acm.org/chapters" target="_blank" rel="noopener noreferrer">ACM chapters</a>
            <a className={sourceLinkClass} href="https://acm.nitk.ac.in/" target="_blank" rel="noopener noreferrer">ACM NITK public site</a>
            <a className={sourceLinkClass} href="https://www.nitk.ac.in/" target="_blank" rel="noopener noreferrer">NITK official site</a>
          </div>
        </section>

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
                ACM-W NITK's public About page says the student chapter began in summer 2019. Its current leadership and activities should be confirmed with ACM-W before this page is expanded.
              </p>
              <a className={`mt-2 inline-block text-sm ${sourceLinkClass}`} href="https://acmwnitk.hosting.acm.org/" target="_blank" rel="noopener noreferrer">Visit ACM-W NITK</a>
            </li>
          </ol>
        </section>

        <section aria-labelledby="meet-us-heading" className="rounded-3xl border border-black/10 bg-black/[0.02] p-7 dark:border-white/10 dark:bg-white/[0.03] md:p-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-blue">Meet us</p>
          <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 id="meet-us-heading" className="text-3xl font-bold">The people behind ACM NITK</h2>
              <p className="mt-2 max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
                Meet the officers who guide the chapter and its activities.
              </p>
            </div>
          </div>

          {teamMembers.length > 0 ? (
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {teamMembers.map((member) => (
                <li key={`${member.role}-${member.name}`} className="overflow-hidden rounded-2xl border border-black/10 bg-white dark:border-white/10 dark:bg-black/20">
                  <div className="aspect-[4/3] overflow-hidden bg-brand-blue/10">
                    <img src={member.photo} alt="Placeholder portrait" loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-blue">{member.role}</p>
                    <h3 className="mt-1 text-xl font-bold">{member.name}</h3>
                  </div>
                </li>
              ))}
            </ul>
          ) : null}

          <a
            href="mailto:acm@nitk.edu.in"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-blue px-6 py-3 text-sm font-bold text-brand-navy transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue"
          >
            Contact ACM NITK
          </a>
        </section>
      </div>
    </main>
  );
}
