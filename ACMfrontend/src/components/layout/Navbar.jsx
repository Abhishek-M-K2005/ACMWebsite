import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Moon, Sun, CircleUserRound, LogOut } from 'lucide-react';
import FloatingLogin from './FloatingLogin';
import { api } from '../../services/api';

const DEFAULT_YANTRAS = [
  { id: 1, name: "Sanganitra" },
  { id: 2, name: "Yantrika" },
  { id: 3, name: "Vidyuth" },
  { id: 4, name: "Kaaryavarta" },
  { id: 5, name: "Saahitya" },
  { id: 6, name: "Abhivyakta" },
  { id: 7, name: "Krutagnata" }
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
  const [currentUser, setCurrentUser] = useState(() => api.getCurrentUser());
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

  // Track the current route to highlight the active tab
  const location = useLocation();

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] lg:w-fit max-w-5xl z-40 text-brand-navy dark:text-white transition-colors duration-300">

        <div className="flex items-center justify-between px-6 py-3 rounded-full 
          bg-brand-blue/10 dark:bg-white/10 
          backdrop-blur-[24px] backdrop-saturate-150 
          border border-brand-blue/20 dark:border-white/10 
          shadow-sm dark:shadow-2xl
          w-full transition-all duration-300">

          {/* Mobile View: Justified to the right so it doesn't overlap the Floating Logo on the left */}
          <div className="lg:hidden flex items-center justify-end w-full gap-4">
            <button type="button" aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg hover:text-brand-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue transition-colors">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button type="button" aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={isOpen} aria-controls="mobile-navigation" onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-6 text-sm font-semibold pl-4">
            <li>
              <Link
                to="/"
                className={`cursor-pointer transition-colors whitespace-nowrap ${location.pathname === '/' ? 'text-brand-blue' : 'hover:text-brand-blue'}`}
              >
                Home
              </Link>
            </li>
            <li 
              ref={dropdownRef} 
              className="relative" 
              onMouseEnter={() => setDropdownOpen(true)} 
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button 
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)} 
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
                className={`flex items-center gap-1 rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue ${
                  location.pathname.startsWith('/sigs') ? 'text-brand-blue' : 'hover:text-brand-blue'
                }`}
              >
                Yantras <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute left-full top-0 z-50 w-56 pl-3">
                  <ul className="py-2 rounded-2xl 
                    bg-white/95 dark:bg-black/90 
                    backdrop-blur-[24px] backdrop-saturate-150 
                    border border-brand-blue/20 dark:border-white/10 
                    shadow-xl
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

                      const sigPath = `/sigs/${sig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
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

            {navLinks.slice(1).map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`cursor-pointer transition-colors whitespace-nowrap ${location.pathname === link.path ? "text-brand-blue" : "hover:text-brand-blue"
                    }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Auth Integration for Desktop */}
            <li className="flex items-center ml-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center gap-2 text-brand-blue hover:opacity-80 transition-opacity"
                    title={`Logged in as ${currentUser.name}. Click to view profile / logout.`}
                  >
                    <div className="w-7 h-7 rounded-full bg-brand-blue/20 border border-brand-blue/50 flex items-center justify-center overflow-hidden text-xs uppercase font-bold">
                      {currentUser.avatar_url ? (
                        <img src={currentUser.avatar_url} alt={currentUser.name} className="w-full h-full object-cover" />
                      ) : (
                        currentUser.name.charAt(0)
                      )}
                    </div>
                    <span className="text-xs font-semibold max-w-[100px] truncate">{currentUser.name.split(' ')[0]}</span>
                  </button>
                  <button
                    onClick={() => {
                      api.logout();
                      setCurrentUser(null);
                      window.dispatchEvent(new Event('acm-auth-changed'));
                    }}
                    title="Sign Out"
                    className="text-gray-400 hover:text-red-500 transition-colors p-1"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button onClick={() => setIsLoginOpen(true)} className="flex items-center gap-1.5 hover:text-brand-blue transition-colors">
                  <CircleUserRound className="w-4 h-4" /> Login
                </button>
              )}
            </li>

            <li className="ml-2 border-l border-brand-navy/20 dark:border-white/40 pl-4 shrink-0">
                <button type="button" aria-label={darkMode ? 'Switch to light theme' : 'Switch to dark theme'} onClick={() => setDarkMode(!darkMode)} className="hover:scale-110 hover:text-brand-blue transition-all flex items-center rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-blue">
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </li>
          </ul>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div id="mobile-navigation" className="lg:hidden absolute top-full mt-4 w-full rounded-3xl
            bg-white/90 dark:bg-black/80 
            backdrop-blur-[32px] backdrop-saturate-150 
            border border-brand-blue/20 dark:border-white/10 
            shadow-xl
            overflow-hidden flex flex-col p-5 gap-4">

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className={`pl-2 text-sm font-medium ${location.pathname === '/' ? 'text-brand-blue font-bold' : 'hover:text-brand-blue'}`}
            >
              Home
            </Link>

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

                const sigPath = `/sigs/${sig.name.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
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
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium ${location.pathname === link.path ? "text-brand-blue" : "hover:text-brand-blue"}`}
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
                      setCurrentUser(null);
                      window.dispatchEvent(new Event('acm-auth-changed'));
                      setIsOpen(false);
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
      </nav>

      {/* Keep the modal isolated from the sticky nav structure */}
      <FloatingLogin
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onAuthChange={setCurrentUser}
      />
    </>
  );
}
