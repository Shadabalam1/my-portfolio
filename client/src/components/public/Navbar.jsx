import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = ({ profile }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Education', path: '/education' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200 py-4 shadow-sm' : 'bg-white py-6 border-b border-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold tracking-tight text-neutral-900 flex items-center gap-2 group">
          <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold shadow-sm group-hover:bg-neutral-700 transition-colors">
            {profile?.name ? profile.name.charAt(0) : 'S'}
          </div>
          <span className="hidden sm:block">{profile?.name || 'Portfolio'}</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-all ${
                location.pathname === link.path 
                  ? 'text-neutral-900' 
                  : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          {profile?.resumeUrl && (
            <a 
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-neutral-900 border border-neutral-200 px-4 py-2 rounded hover:bg-neutral-50 transition-colors"
            >
              Resume
            </a>
          )}
          <Link 
            to="/contact"
            className="text-sm font-medium text-white bg-neutral-900 px-4 py-2 rounded hover:bg-neutral-800 transition-colors shadow-sm"
          >
            Hire Me
          </Link>
        </div>

        <button 
          className="md:hidden text-neutral-900 p-2 -mr-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-neutral-200 bg-white overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-medium ${
                    location.pathname === link.path ? 'text-neutral-900' : 'text-neutral-500'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-neutral-100 my-2" />
              {profile?.resumeUrl && (
                <a 
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-medium text-neutral-900"
                >
                  Resume
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
