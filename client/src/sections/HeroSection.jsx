import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { ArrowRight, Download, Mail } from 'lucide-react';

const HeroSection = () => {
  const { profile, settings } = useOutletContext();

  const handleNavClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 bg-gradient-mesh">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <motion.div 
            className="flex-1 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-zinc-800 bg-zinc-900/50 rounded-full text-zinc-400 text-xs font-mono tracking-wider"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              AVAILABLE FOR WORK
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold font-heading text-white mb-6 tracking-tight whitespace-pre-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {profile?.heroTagline || ''}
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl text-zinc-400 font-medium mb-8 max-w-2xl whitespace-pre-wrap"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {profile?.shortBio || ''}
            </motion.h2>
            
            <motion.div 
              className="flex flex-wrap items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button 
                onClick={() => handleNavClick('projects')}
                className="px-6 py-3 bg-white text-zinc-950 hover:bg-zinc-200 rounded-md font-semibold transition-colors flex items-center gap-2"
              >
                View Work <ArrowRight size={18} />
              </button>
              
              {settings?.resumeUrl && (
                <a 
                  href={settings.resumeUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-800 rounded-md font-medium transition-colors flex items-center gap-2"
                >
                  <Download size={18} /> Resume
                </a>
              )}
            </motion.div>
          </motion.div>

          <motion.div 
            className="flex-1 flex justify-center md:justify-end w-full md:w-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="relative w-72 h-80 md:w-80 md:h-[450px]">
              {/* Clean Image container */}
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 group">
                {profile?.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt={profile.name} 
                    className="w-full h-full object-cover grayscale opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700 font-mono">
                    <span className="text-6xl mb-4">&lt;/&gt;</span>
                    <span>No image set</span>
                  </div>
                )}
              </div>
              
              {/* Floating Tech Badges - Sleek version */}
              <motion.div 
                className="absolute top-6 -right-6 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded shadow-xl flex items-center gap-2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-white font-mono text-xs tracking-wider">REACT</span>
              </motion.div>
              
              <motion.div 
                className="absolute bottom-12 -left-8 bg-zinc-900 border border-zinc-800 px-4 py-2 rounded shadow-xl flex items-center gap-2"
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="text-white font-mono text-xs tracking-wider">NODE.JS</span>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator - Minimalist */}
      <motion.div 
        className="absolute bottom-10 left-6 md:left-12 flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest rotate-90 origin-left translate-x-2">Scroll</span>
        <div className="w-[1px] h-12 bg-zinc-800 overflow-hidden relative">
          <motion.div 
            className="w-full h-1/2 bg-zinc-500"
            animate={{ y: [-24, 48] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
