import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';

const yantras = ["Sanganitra", "Karyavarta", "Vidyut", "Yantrika", "Sahiitya", "Abhivyakta", "Krutagnata", "ACMW"];

// NavLinks mapping to real routes
const navLinks = [
  { name: "Home", path: "/" },
  { name: "Project Proposal", path: "/project-proposal" },
  { name: "Project Expo", path: "/project-expo" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" }
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Track the current route to highlight the active tab
  const location = useLocation();

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] md:w-fit max-w-5xl z-40 text-brand-navy dark:text-white transition-colors duration-300">

      <div className="flex items-center justify-between px-6 py-3 rounded-full 
        bg-brand-blue/10 dark:bg-white/10 
        backdrop-blur-[24px] backdrop-saturate-150 
        border border-brand-blue/20 dark:border-white/10 
        shadow-sm dark:shadow-2xl
        w-full transition-all duration-300">

        {/* Mobile View: Justified to the right so it doesn't overlap the Floating Logo on the left */}
        <div className="md:hidden flex items-center justify-end w-full gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-1 hover:text-brand-blue transition-colors">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-6 text-sm font-semibold pl-4">
          <li className="relative" onMouseEnter={() => setDropdownOpen(true)} onMouseLeave={() => setDropdownOpen(false)}>
            <button className="flex items-center gap-1 hover:text-brand-blue transition-colors">
              Yantras <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <ul className="absolute top-full mt-4 left-0 w-48 py-2 rounded-2xl 
                bg-white/90 dark:bg-black/80 
                backdrop-blur-[24px] backdrop-saturate-150 
                border border-brand-blue/20 dark:border-white/10 
                shadow-xl
                overflow-hidden">
                {yantras.map((item) => (
                  <li key={item}>
                    <Link
                      to="/project-proposal"
                      onClick={() => setDropdownOpen(false)}
                      className="block px-4 py-3 hover:bg-brand-blue/10 dark:hover:bg-white/10 hover:text-brand-blue cursor-pointer transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                to={link.path}
                // Apply active text color if the user is on this path
                className={`cursor-pointer transition-colors whitespace-nowrap ${location.pathname === link.path
                  ? "text-brand-blue"
                  : "hover:text-brand-blue"
                  }`}
              >
                {link.name}
              </Link>
            </li>
          ))}

          <li className="ml-4 border-l border-brand-navy/20 dark:border-white/40 pl-4 shrink-0">
            <button onClick={() => setDarkMode(!darkMode)} className="hover:scale-110 hover:text-brand-blue transition-all">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full mt-4 w-full rounded-3xl 
          bg-white/90 dark:bg-black/80 
          backdrop-blur-[32px] backdrop-saturate-150 
          border border-brand-blue/20 dark:border-white/10 
          shadow-xl
          overflow-hidden flex flex-col p-5 gap-4">
          <div className="font-bold mb-2 border-b border-brand-navy/10 dark:border-white/20 pb-2">Yantras</div>
          <div className="grid grid-cols-2 gap-3 text-sm pl-2">
            {yantras.map((item) => (
              <Link
                key={item}
                to="/project-proposal"
                onClick={() => setIsOpen(false)}
                className="cursor-pointer hover:text-brand-blue font-medium transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="font-bold mb-2 border-b border-brand-navy/10 dark:border-white/20 pb-2 mt-2">Links</div>
          <div className="grid gap-3 text-sm pl-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)} // Close menu on click
                className={`font-medium ${location.pathname === link.path ? "text-brand-blue" : "hover:text-brand-blue"}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}