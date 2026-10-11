import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Hero from '../ui/Hero';
import DocumentViewer from './DocumentViewer';
import { api } from '../../services/api';

const dummyProject = {
  title: "Sanganitra Phase 1",
  thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2000&auto=format&fit=crop",
  mentors: "Dr. Smith, Prof. Johnson",
  members: "Alice (Lead), Bob (Backend), Charlie (UI/UX)",
  duration: "6 months",
  introduction: "This proposal outlines the architecture and execution plan for Sanganitra Phase 1. The goal is to build a scalable, highly available web architecture that can sustain high traffic during peak college event registrations.",
  method_description: "We will utilize a modern tech stack consisting of **React**, **TailwindCSS**, and **Vite** for the frontend. \n\n```javascript\n// Example tech stack initialization\nconst stack = ['React', 'Tailwind', 'Node.js'];\nconsole.log('Building the future!');\n```",
  results: "Expected to reduce page load times by 40% and support up to 10,000 concurrent users during the Innovision fest."
};

export default function DocumentPage() {
  const { id } = useParams();
  const [project, setProject] = useState(dummyProject);

  useEffect(() => {
    const fetchProposalData = async () => {
      if (id) {
        const liveDoc = await api.getProjectProposal(id);
        if (liveDoc && !liveDoc.error) {
          setProject(liveDoc);
          return;
        }
      }
      // If no id, attempt to load latest proposal from API, or fallback to dummy
      const allProposals = await api.getProjectProposals();
      if (allProposals && allProposals.length > 0) {
        setProject(allProposals[0]);
      }
    };

    fetchProposalData();
  }, [id]);

  return (
    <main className="flex-grow w-full">
      <Hero>
        <span className="text-2xl md:text-3xl lg:text-4xl font-semibold text-brand-navy dark:text-white mb-2 transition-colors duration-300">
          Explore our
        </span>
        <span className="text-5xl md:text-7xl lg:text-8xl font-black text-brand-blue drop-shadow-[0_0_30px_rgba(108,180,238,0.3)] dark:drop-shadow-[0_0_30px_rgba(108,180,238,0.6)]">
          Documents
        </span>
      </Hero>

      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link 
          to="/project-proposal" 
          className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-brand-blue uppercase hover:underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Proposals
        </Link>
      </div>
      
      <DocumentViewer project={project} />
    </main>
  );
}