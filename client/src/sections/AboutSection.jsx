import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { User, Code, Server, Database } from 'lucide-react';

const AboutSection = () => {
  const { profile } = useOutletContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const featureCards = [
    {
      icon: <Code size={24} strokeWidth={1.5} />,
      title: 'Frontend Development',
      description: 'Building responsive, accessible, and highly interactive user interfaces using React and Tailwind CSS.'
    },
    {
      icon: <Server size={24} strokeWidth={1.5} />,
      title: 'Backend Engineering',
      description: 'Creating robust, scalable RESTful APIs with Node.js, Express, and secure authentication flows.'
    },
    {
      icon: <Database size={24} strokeWidth={1.5} />,
      title: 'Database Design',
      description: 'Architecting efficient data models and performing complex queries using MongoDB and Mongoose.'
    }
  ];

  return (
    <section id="about" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12">
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">01 // About</span>
            <div className="h-[1px] flex-1 bg-zinc-800 max-w-xs"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Driven by <span className="text-zinc-500">Curiosity.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-zinc-400 leading-relaxed whitespace-pre-wrap font-medium">
                {profile?.about || 'Welcome to my portfolio! I am a passionate developer.'}
              </p>
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">{profile?.yearsOfExperience || 0}+</h4>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider">Years Exp.</p>
              </div>
              <div>
                <h4 className="text-white font-bold text-3xl mb-1">{profile?.projectsCompleted || 0}+</h4>
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-wider">Projects</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 w-full grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {featureCards.map((card, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`group border border-zinc-800 bg-zinc-900/50 p-6 rounded-xl hover:bg-zinc-800 transition-colors ${index === 2 ? 'sm:col-span-2' : ''}`}
              >
                <div className="w-10 h-10 mb-6 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                  {card.icon}
                </div>
                <h4 className="text-lg font-semibold text-zinc-100 mb-2">{card.title}</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">{card.description}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
