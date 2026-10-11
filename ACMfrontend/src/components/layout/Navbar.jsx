import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun, CircleUserRound, LogOut } from 'lucide-react';
import FloatingLogin from './FloatingLogin';
import { api } from '../../services/api';

const DEFAULT_YANTRAS = [
  { id: 1, name: "Sanganitra" },
  { id: 2, name: "Karyavarta" },
  { id: 3, name: "Vidyut" },
  { id: 4, name: "Yantrika" },
  { id: 5, name: "Sahiitya" },
  { id: 6, name: "Abhivyakta" },
  { id: 7, name: "Krutagnata" },
  { id: 8, name: "ACMW" }
];

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About & Team", path: "/about" },
  { name: "Project Proposal", path: "/project-proposals" },
  { name: "Project Expo", path: "/projects" },
  { name: "Events", path: "/events" },
  { name: "Blog", path: "/blog" }
];

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [sigs, setSigs] = useState(DEFAULT_YANTRAS);
  const dropdownRef = useRef(null);

  // Fetch SIGs from backend model dynamically
  useEffect(() => {
    let isMounted = true;
    api.getSigs().then((data) => {
      if (isMounted && data && Array.isArray(data) && data.length > 0) {
        setSigs(data);
      }
    }).catch(() => {
      // Keep DEFAULT_YANTRAS as safe fallback
    });
    return () => { isMounted = false; };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if the user is authenticated via local storage
  const currentUser = JSON.parse(localStorage.getItem('acm_user'));

  // Track the current route to highlight the active tab
  const location = useLocation();

  return (
    <>
      {/* ========================================================= */}
      {/* 1. DESKTOP NAVBAR (lg+): Centered Frosted Glass Capsule   */}
      {/* ========================================================= */}
      <nav className="hidden lg:block fixed top-5 left-1/2 -translate-x-1/2 z-40 text-brand-navy dark:text-white transition-colors duration-300 max-w-5xl">
        <div className="flex items-center px-4 sm:px-5 py-2 sm:py-2.5 rounded-full 
          bg-white/25 dark:bg-white/[0.08] 
          bg-gradient-to-b from-white/40 to-white/10 dark:from-white/[0.12] dark:to-transparent 
          backdrop-blur-2xl backdrop-saturate-200 
          border border-white/50 dark:border-white/15 
          shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.45)] 
          dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.18)]
          transition-all duration-300">

          {/* Desktop Links */}
          <ul className="flex items-center gap-2.5 xl:gap-3.5 text-xs xl:text-[13px] font-semibold pl-1.5">
            <li 
              ref={dropdownRef} 
              className="relative" 
              onMouseEnter={() => setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)} 
                className={`flex items-center gap-1 transition-colors ${
                  location.pathname.startsWith('/sigs') ? 'text-brand-blue' : 'hover:text-brand-blue'
                }`}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                Yantras <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full pt-3 left-0 w-52 z-50">
                  <ul className="py-2 rounded-2xl 
                    bg-white/40 dark:bg-black/40 
                    bg-gradient-to-b from-white/40 to-white/15 dark:from-white/[0.08] dark:to-transparent 
                    backdrop-blur-2xl backdrop-saturate-200 
                    border border-white/40 dark:border-white/15 
                    shadow-[0_8px_32px_0_rgba(0,0,0,0.15),inset_0_1px_1px_0_rgba(255,255,255,0.4)] 
                    dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.7),inset_0_1px_1px_0_rgba(255,255,255,0.15)]
                    overflow-hidden">
                    {sigs.map((sig) => {
                      const isAcmw = (sig.name || '').toLowerCase().replace(/[^a-z]/g, '') === 'acmw' || String(sig.id) === '40';
                      if (isAcmw) {
                        return (
                          <li key={sig.id || sig.name}>
                            <a
                              href="https://acmwnitk.hosting.acm.org"
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={() => setDropdownOpen(false)}
                              className="block px-4 py-2.5 cursor-pointer transition-colors hover:bg-brand-blue/10 dark:hover:bg-white/10 hover:text-brand-blue"
                            >
                              {sig.name}
                            </a>
                          </li>
                        );
                      }

                      const sigPath = `/sigs/${sig.id || sig.name.toLowerCase()}`;
                      const isActive = location.pathname === sigPath;
                      return (
                        <li key={sig.id || sig.name}>
                          <Link
                            to={sigPath}
                            onClick={() => setDropdownOpen(false)}
                            className={`block px-4 py-2.5 cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-brand-blue/15 text-brand-blue font-bold' 
                                : 'hover:bg-brand-blue/10 dark:hover:bg-white/10 hover:text-brand-blue'
                            }`}
                          >
                            {sig.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </li>

            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`cursor-pointer transition-colors whitespace-nowrap ${
                    location.pathname === link.path ? "text-brand-blue font-bold" : "hover:text-brand-blue"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Auth Integration for Desktop */}
            <li className="flex items-center ml-1 sm:ml-1.5">
              {currentUser ? (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-1.5 text-brand-blue hover:opacity-80 transition-opacity"
                    title={`Logged in as ${currentUser.name}. Click to view profile / logout.`}
                  >
                    <div className="w-6.5 h-6.5 rounded-full bg-brand-blue/20 border border-brand-blue/50 flex items-center justify-center overflow-hidden text-[11px] uppercase font-bold">
                      {currentUser.avatar_url ? (
                        <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name.charAt(0)
                      )}
                    </div>
                    <span className="text-xs font-semibold max-w-[95px] truncate">{currentUser.name.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={() => {
                      api.logout();
                      window.location.reload();
                    }}
                    title="Sign Out"
                    className="text-gray-400 hover:text-red-500 transition-colors p-0.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-1.5 hover:text-brand-blue transition-colors text-xs sm:text-[13px] font-semibold">
                  <CircleUserRound className="w-4 h-4" /> Login
                </button>
              )}
            </li>

            <li className="ml-1 sm:ml-1.5 border-l border-brand-navy/20 dark:border-white/40 pl-2.5 shrink-0">
              <button 
                onClick={() => setDarkMode(!darkMode)} 
                aria-label="Toggle theme"
                className="hover:scale-110 hover:text-brand-blue transition-all flex items-center"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* ========================================================= */}
      {/* 2. MOBILE & TABLET NAVBAR (< lg): Sleek Floating Capsule */}
      {/* ========================================================= */}
      <div className="lg:hidden fixed top-4 sm:top-5 right-4 sm:right-6 z-50">
        <div className="flex items-center gap-1.5 p-1.5 rounded-full 
          bg-white/25 dark:bg-white/[0.08] 
          bg-gradient-to-b from-white/40 to-white/10 dark:from-white/[0.12] dark:to-transparent 
          backdrop-blur-2xl backdrop-saturate-200 
          border border-white/50 dark:border-white/15 
          shadow-[0_8px_32px_0_rgba(0,0,0,0.1),inset_0_1px_1px_0_rgba(255,255,255,0.45)] 
          dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5),inset_0_1px_1px_0_rgba(255,255,255,0.18)]
          transition-all duration-300">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            aria-label="Toggle theme"
            className="p-1.5 hover:text-brand-blue transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            aria-label="Toggle navigation menu"
            className="p-1.5 hover:text-brand-blue transition-colors rounded-full hover:bg-black/5 dark:hover:bg-white/10"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {isOpen && (
          <div className="absolute right-0 top-full mt-3 w-80 max-w-[calc(100vw-2rem)] rounded-3xl 
            bg-white/35 dark:bg-neutral-900/85 
            bg-gradient-to-b from-white/50 to-white/20 dark:from-white/[0.12] dark:to-transparent 
            backdrop-blur-3xl backdrop-saturate-200 
            border border-white/50 dark:border-white/15 
            shadow-[0_16px_40px_0_rgba(0,0,0,0.2),inset_0_1px_1px_0_rgba(255,255,255,0.4)] 
            dark:shadow-[0_16px_40px_0_rgba(0,0,0,0.8),inset_0_1px_1px_0_rgba(255,255,255,0.15)] 
            max-h-[82vh] overflow-y-auto flex flex-col p-5 gap-4 z-50">

            <div className="font-bold mb-2 border-b border-brand-navy/10 dark:border-white/20 pb-2">Yantras</div>
            <div className="grid grid-cols-2 gap-3 text-sm pl-2">
              {sigs.map((sig) => {
                const isAcmw = (sig.name || '').toLowerCase().replace(/[^a-z]/g, '') === 'acmw' || String(sig.id) === '40';
                if (isAcmw) {
                  return (
                    <a
                      key={sig.id || sig.name}
                      href="https://acmwnitk.hosting.acm.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer font-medium transition-colors hover:text-brand-blue"
                    >
                      {sig.name}
                    </a>
                  );
                }

                const sigPath = `/sigs/${sig.id || sig.name.toLowerCase()}`;
                const isActive = location.pathname === sigPath;
                return (
                  <Link
                    key={sig.id || sig.name}
                    to={sigPath}
                    onClick={() => setIsOpen(false)}
                    className={`cursor-pointer font-medium transition-colors ${
                      isActive ? 'text-brand-blue font-bold' : 'hover:text-brand-blue'
                    }`}
                  >
                    {sig.name}
                  </Link>
                );
              })}
            </div>

            <div className="font-bold mb-2 border-b border-brand-navy/10 dark:border-white/20 pb-2 mt-2">Links</div>
            <div className="grid gap-3 text-sm pl-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium ${location.pathname === link.path ? "text-brand-blue font-bold" : "hover:text-brand-blue"}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Auth Integration for Mobile */}
            <div className="font-bold mb-2 border-b border-brand-navy/10 dark:border-white/20 pb-2 mt-2">Account</div>
            <div className="pl-2">
              {currentUser ? (
                <div className="flex items-center justify-between pr-2">
                  <button
                    onClick={() => { setIsOpen(false); setIsLoginOpen(true); }}
                    className="flex items-center gap-3 text-sm font-medium text-brand-blue"
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-blue/20 flex items-center justify-center overflow-hidden text-xs uppercase font-bold">
                      {currentUser.avatar_url ? <img src={currentUser.avatar_url} alt="" className="w-full h-full object-cover" /> : currentUser.name.charAt(0)}
                    </div>
                    <span>{currentUser.name}</span>
                  </button>
                  <button
                    onClick={() => {
                      api.logout();
                      setIsOpen(false);
                      window.location.reload();
                    }}
                    className="flex items-center gap-1.5 text-xs text-red-500 font-semibold px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" /> Sign Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setIsOpen(false); setIsLoginOpen(true); }}
                  className="flex items-center gap-2 text-sm font-medium hover:text-brand-blue transition-colors"
                >
                  <CircleUserRound className="w-4 h-4" /> Member Login
                </button>
              )}
            </div>

          </div>
        )}
      </div>

      {/* Keep the modal isolated from the sticky nav structure */}
      <FloatingLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
  );
}