import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';
import api from '../utils/api';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await api.get('/skills');
        setSkills(data.filter(skill => skill.isActive));
      } catch (error) {
        console.error('Failed to fetch skills', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  const categories = Object.keys(groupedSkills);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="skills" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">03 // Skills</span>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Technical <span className="text-zinc-500">Arsenal.</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-20 text-zinc-600 font-mono">Loading skills...</div>
        ) : categories.length === 0 ? (
          <div className="flex justify-center py-20 text-zinc-600 font-mono">No skills found.</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {categories.map((category, idx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="bg-zinc-900/40 border border-zinc-800 rounded-xl p-8"
              >
                <h3 className="text-xl font-bold text-white mb-6 font-heading flex items-center gap-3">
                  <span className="text-emerald-500 font-mono text-sm">&lt;/&gt;</span>
                  {category}
                </h3>
                
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  {groupedSkills[category].map((skill) => (
                    <motion.div
                      key={skill._id}
                      variants={itemVariants}
                      className="bg-zinc-950/50 border border-zinc-800 hover:border-zinc-700 rounded-lg p-4 flex flex-col items-center justify-center gap-3 transition-colors group"
                    >
                      {skill.icon ? (
                        <div 
                          className="w-8 h-8 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 transition-colors"
                          dangerouslySetInnerHTML={{ __html: skill.icon }} 
                        />
                      ) : (
                        <div className="w-8 h-8 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center font-bold text-zinc-500 group-hover:text-emerald-400 transition-colors font-mono">
                          {skill.name.charAt(0)}
                        </div>
                      )}
                      <span className="text-xs font-mono tracking-wider text-zinc-400 group-hover:text-zinc-200 text-center transition-colors">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
