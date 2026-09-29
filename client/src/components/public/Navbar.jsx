import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ resumeUrl, profile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Experience', href: '/#experience' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleNavClick = (href) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      window.location.href = href;
    } else {
      const id = href.replace('/#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link to="/" onClick={() => handleNavClick('/#home')} className="text-xl font-bold font-mono tracking-tighter text-white">
          {profile?.name ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'PORTFOLIO'}<span className="text-emerald-500">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <button 
                  onClick={() => handleNavClick(link.href)}
                  className="text-zinc-400 hover:text-zinc-100 transition-colors text-[13px] font-mono uppercase tracking-widest"
                >
                  {link.name}
                </button>
              </li>
            ))}
          </ul>
          {resumeUrl && (
            <a 
              href={resumeUrl} 
              target="_blank" 
              rel="noreferrer"
              className="px-5 py-2 rounded text-zinc-950 bg-white hover:bg-zinc-200 transition-colors text-xs font-mono uppercase tracking-widest font-bold flex items-center gap-2"
            >
              <FileText size={14} /> Resume
            </a>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-zinc-400 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-900 p-6 md:hidden flex flex-col space-y-4 shadow-2xl"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-zinc-400 hover:text-zinc-100 text-sm font-mono uppercase tracking-widest text-left py-3 border-b border-zinc-900"
              >
                {link.name}
              </button>
            ))}
            {resumeUrl && (
              <a 
                href={resumeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="mt-4 px-5 py-3 rounded bg-white text-zinc-950 text-center text-sm font-mono uppercase tracking-widest font-bold flex items-center justify-center gap-2"
              >
                <FileText size={16} /> Resume
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
