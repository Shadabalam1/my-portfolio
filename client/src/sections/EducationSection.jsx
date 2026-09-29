import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';
import api from '../utils/api';

const EducationSection = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await api.get('/education');
        setEducationList(data);
      } catch (error) {
        console.error('Failed to fetch education', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  if (loading || educationList.length === 0) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="education" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">05 // Education</span>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Academic <span className="text-zinc-500">Background.</span>
          </h2>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {educationList.map((edu) => (
            <motion.div 
              key={edu._id}
              variants={itemVariants}
              className="bg-zinc-900/40 border border-zinc-800 p-8 rounded-xl relative overflow-hidden group hover:border-zinc-700 transition-colors"
            >
              
              <div className="w-10 h-10 mb-6 text-zinc-400 group-hover:text-emerald-400 transition-colors">
                <GraduationCap size={32} strokeWidth={1.5} />
              </div>
              
              <h3 className="text-xl font-bold text-zinc-100 font-heading mb-2">
                {edu.degree}
              </h3>
              
              <h4 className="text-md text-zinc-400 font-medium mb-6">
                {edu.institution}
              </h4>
              
              <div className="space-y-3 mb-4 font-mono text-xs tracking-wide">
                <div className="flex items-center gap-3 text-zinc-500">
                  <Calendar size={14} />
                  <span>
                    {new Date(edu.startDate).getFullYear()} - 
                    {edu.endDate ? new Date(edu.endDate).getFullYear() : ' Present'}
                  </span>
                </div>
                {edu.location && (
                  <div className="flex items-center gap-3 text-zinc-500">
                    <MapPin size={14} />
                    <span>{edu.location}</span>
                  </div>
                )}
              </div>
              
              {edu.description && (
                <p className="text-sm text-zinc-400 leading-relaxed mt-6 pt-6 border-t border-zinc-800/50">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default EducationSection;
