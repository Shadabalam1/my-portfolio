import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Code2, Server, Layout, User } from 'lucide-react';

const AboutSection = () => {
  const { profile } = useOutletContext();

  const cards = [
    {
      icon: <Layout className="text-blue-600" size={24} />,
      title: "Frontend Development",
      desc: "Creating pixel-perfect, accessible, and highly interactive user interfaces using React and modern CSS."
    },
    {
      icon: <Server className="text-emerald-600" size={24} />,
      title: "Backend Engineering",
      desc: "Architecting secure REST APIs, robust business logic, and scalable database schemas with Node.js."
    },
    {
      icon: <Code2 className="text-purple-600" size={24} />,
      title: "Full-Stack Integration",
      desc: "Connecting seamless frontend experiences with powerful backend data processing in the MERN stack."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white relative border-t border-neutral-100">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-neutral-50 border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-sm">
              <User size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
              About Me
            </h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-neutral-900 mb-6">
              {profile?.title || 'Software Engineer'}
            </h3>
            <div className="text-lg text-neutral-600 leading-relaxed space-y-4 whitespace-pre-wrap">
              {profile?.about || 'I am a software engineer specializing in the MERN stack. I focus on writing clean, elegant code that scales well.'}
            </div>
            
            {(profile?.yearsOfExperience > 0 || profile?.projectsCompleted > 0) && (
              <div className="mt-10 flex gap-10 pt-8 border-t border-neutral-100">
                {profile?.yearsOfExperience > 0 && (
                  <div>
                    <div className="text-4xl font-extrabold text-neutral-900 mb-1">{profile.yearsOfExperience}+</div>
                    <div className="text-sm text-neutral-500 font-bold tracking-wide uppercase">Years Exp.</div>
                  </div>
                )}
                {profile?.projectsCompleted > 0 && (
                  <div>
                    <div className="text-4xl font-extrabold text-neutral-900 mb-1">{profile.projectsCompleted}+</div>
                    <div className="text-sm text-neutral-500 font-bold tracking-wide uppercase">Projects</div>
                  </div>
                )}
              </div>
            )}
          </motion.div>

          <div className="md:col-span-7 space-y-4">
            {cards.map((card, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative grid grid-cols-1 sm:grid-cols-5 gap-4 p-6 rounded-3xl transition-all duration-500 hover:bg-neutral-50 border border-transparent hover:border-neutral-200/60 hover:shadow-sm items-start"
              >
                <div className="sm:col-span-1 pt-1">
                  <div className="w-12 h-12 rounded-xl bg-white border border-neutral-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {card.icon}
                  </div>
                </div>
                <div className="sm:col-span-4 flex flex-col">
                  <h4 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-neutral-600 leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
