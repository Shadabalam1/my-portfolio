import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';

const SkillsSection = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await api.get('/skills');
        setSkills(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('Failed to fetch skills', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading || skills.length === 0) return null;

  return (
    <section id="skills" className="py-24 border-y border-neutral-100 bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 mb-4">
            Technologies & Tools
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto">
            The tech stack I use to build robust and scalable web applications.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 max-w-4xl mx-auto"
        >
          {skills.map((skill, idx) => (
            <motion.div 
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-5 sm:py-3 rounded bg-white border border-neutral-200 shadow-sm hover:shadow hover:border-neutral-300 transition-all cursor-default"
            >
              {skill.iconUrl && (
                <img 
                  src={skill.iconUrl} 
                  alt={skill.name} 
                  className="w-5 h-5 object-contain"
                />
              )}
              <span className="font-semibold text-neutral-700 text-sm sm:text-base">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default SkillsSection;
