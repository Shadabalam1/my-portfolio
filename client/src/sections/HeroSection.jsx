import { motion } from 'framer-motion';
import { useOutletContext, Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';

const HeroSection = () => {
  const { profile } = useOutletContext();
  
  return (
    <section id="hero" className="py-16 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <div className="flex flex-col-reverse lg:flex-row items-center gap-16 lg:gap-24">
          
          <motion.div 
            className="flex-1 flex flex-col items-start"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {profile?.availabilityText && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-green-50 text-green-700 border border-green-200 mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-semibold tracking-wide uppercase">
                  {profile.availabilityText}
                </span>
              </div>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
              {profile?.heroTagline ? (
                <span dangerouslySetInnerHTML={{ __html: profile.heroTagline.replace('\n', '<br class="hidden sm:block" />') }} />
              ) : (
                <>
                  Building modern <br className="hidden sm:block" />
                  software experiences.
                </>
              )}
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mb-10 leading-relaxed">
              {profile?.heroDescription || profile?.shortBio || `I'm ${profile?.name || 'Shadab Alam'}, a Software Engineer specializing in the MERN stack. I build robust, scalable applications with clean code and a focus on exceptional user experience.`}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <Link 
                to={profile?.primaryBtnLink || "/projects"}
                className="h-12 px-8 rounded bg-neutral-900 text-white font-medium flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-sm hover:shadow"
              >
                {profile?.primaryBtnText || "View Work"} <ArrowRight size={18} />
              </Link>
              
              <Link 
                to={profile?.secondaryBtnLink || "/contact"}
                className="h-12 px-8 rounded bg-white border border-neutral-200 text-neutral-900 font-medium flex items-center justify-center hover:bg-neutral-50 transition-colors"
              >
                {profile?.secondaryBtnText || "Contact Me"}
              </Link>

              {profile?.resumeUrl && (
                <a 
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="h-12 px-8 rounded bg-white border border-neutral-200 text-blue-600 font-medium flex items-center justify-center hover:bg-blue-50 transition-colors"
                >
                  Download CV
                </a>
              )}
            </div>
            
            {profile?.location && (
              <div className="mt-12 flex items-center gap-2 text-sm text-neutral-500 font-medium">
                <MapPin size={16} /> Based in {profile.location}
              </div>
            )}
          </motion.div>
          
          <motion.div 
            className="w-full max-w-sm lg:w-1/3 shrink-0"
            initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 shadow-xl border border-neutral-200 rotate-2 hover:rotate-0 transition-transform duration-500">
              {profile?.profileImage ? (
                <img 
                  src={profile.profileImage} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-400 p-8 text-center">
                  Update profile image in admin panel
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
