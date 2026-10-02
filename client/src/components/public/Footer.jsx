import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = ({ profile, settings }) => {
  return (
    <footer className="py-12 bg-white border-t border-neutral-200 mt-auto">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-neutral-900 text-white flex items-center justify-center text-sm font-semibold shadow-sm">
              {profile?.name ? profile.name.charAt(0) : 'S'}
            </div>
            <span className="font-bold text-neutral-900 tracking-tight">
              {profile?.name || 'Portfolio'}
            </span>
          </div>

          <div className="text-neutral-500 text-sm font-medium text-center md:text-left">
            {settings?.footerText || `© ${new Date().getFullYear()} ${profile?.name || 'Shadab Alam'}. All rights reserved.`}
          </div>

          <div className="flex items-center space-x-4">
            {profile?.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-neutral-900 transition-colors p-2 hover:bg-neutral-100 rounded-full">
                <span className="sr-only">GitHub</span>
                <FaGithub size={20} />
              </a>
            )}
            {profile?.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin size={20} />
              </a>
            )}
            {profile?.twitter && (
              <a href={profile.twitter} target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-blue-400 transition-colors p-2 hover:bg-blue-50 rounded-full">
                <span className="sr-only">Twitter</span>
                <FaTwitter size={20} />
              </a>
            )}
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
