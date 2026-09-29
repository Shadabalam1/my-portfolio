import { Mail, ArrowUp } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = ({ profile, settings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 py-12 border-t border-zinc-900 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold font-heading text-zinc-100 mb-1">
              {profile?.name || 'My Portfolio'}
            </h2>
            <p className="text-zinc-500 font-mono text-sm tracking-wide">{profile?.title || 'Developer'}</p>
          </div>
          
          <div className="flex space-x-4">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 transition-colors">
                <FaGithub size={18} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 transition-colors">
                <FaLinkedin size={18} />
              </a>
            )}
            {profile?.email && (
              <a href={`mailto:${profile.email}`} className="w-10 h-10 rounded border border-zinc-800 bg-zinc-900/50 flex items-center justify-center text-zinc-400 hover:border-zinc-500 hover:text-zinc-100 transition-colors">
                <Mail size={18} />
              </a>
            )}
          </div>
        </div>
        
        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs font-mono tracking-widest uppercase">
          <p>{settings?.footerText || `© ${new Date().getFullYear()} ${profile?.name || 'Portfolio'}. All rights reserved.`}</p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center gap-2 hover:text-zinc-300 transition-colors"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
