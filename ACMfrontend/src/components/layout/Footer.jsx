import { Link } from 'react-router-dom';
import { Home, Puzzle, TrendingUp, Calendar, FileText, HelpCircle, MapPin, Mail, Globe, Code2, Camera, BriefcaseBusiness, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-navy text-white pt-16 pb-12 px-6 md:px-12 lg:px-24 w-full">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
        
        {/* Column 1: About */}
        <div className="lg:col-span-5 space-y-6 pr-0 lg:pr-8">
          
          {/* Replaced the CSS logo and text with the SVG */}
          <div className="flex items-center mb-4">
            <img 
              src="/logos/ACM.svg" 
              alt="ACM NITK Logo" 
              className="w-56 md:w-64 h-auto object-contain"
            />
          </div>
          
          <p className="text-sm leading-relaxed text-gray-300 text-justify">
            We are a bunch of enthusiastic students who aim at uniting the computing fraternity at NITK under one tag and allows the students to learn together and share their knowledge to cater the interests of the individuals as well as the institute as a whole. We organize a plethora of events which cover most of the fields of engineering like KEP's, guest lectures, workshops, coding contests etc. which gives students an exposure to the computing world as well as allows them to understand the progress going on in the computing sphere worldwide.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-3 space-y-6 lg:justify-self-center">
          <h3 className="font-bold text-xl tracking-wide">QUICK LINKS</h3>
          <ul className="space-y-4">
            <li><Link to="/" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><Home className="w-4 h-4" /> Home</Link></li>
            <li><Link to="/project-expo" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><Puzzle className="w-4 h-4" /> Project Expo</Link></li>
            <li><Link to="/project-proposal" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><TrendingUp className="w-4 h-4" /> Project Proposals</Link></li>
            <li><Link to="/events" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><Calendar className="w-4 h-4" /> Events</Link></li>
            <li><Link to="/blog" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><FileText className="w-4 h-4" /> Blog</Link></li>
            <li><a href="mailto:acm@nitk.edu.in" className="flex items-center gap-3 hover:text-brand-blue transition-colors text-sm"><HelpCircle className="w-4 h-4" /> Contact</a></li>
          </ul>
        </div>

        {/* Column 3: Contact & Connect */}
        <div className="lg:col-span-4 space-y-8">
          <div className="space-y-6">
            <h3 className="font-bold text-xl tracking-wide">CONTACT US</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 mt-1 shrink-0" />
              <p className="text-sm text-gray-300">
                NITK Surathkal NH-66,<br />
                Srinivasnagar Surathkal,<br />
                Mangaluru Karnataka<br />
                575025
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 shrink-0" />
              <a href="mailto:acm@nitk.edu.in" className="text-sm hover:text-brand-blue transition-colors">acm@nitk.edu.in</a>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-xl tracking-wide">CONNECT</h3>
            <div className="flex gap-4">
              <a href="#" aria-label="Facebook" className="hover:text-brand-blue transition-colors"><Globe className="w-6 h-6" /></a>
              <a href="#" aria-label="GitHub" className="hover:text-brand-blue transition-colors"><Code2 className="w-6 h-6" /></a>
              <a href="#" aria-label="Instagram" className="hover:text-brand-blue transition-colors"><Camera className="w-6 h-6" /></a>
              <a href="#" aria-label="LinkedIn" className="hover:text-brand-blue transition-colors"><BriefcaseBusiness className="w-6 h-6" /></a>
              <a href="#" aria-label="Twitter" className="hover:text-brand-blue transition-colors"><MessageCircle className="w-6 h-6" /></a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}