import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import api from '../utils/api';

const ExperienceSection = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const { data } = await api.get('/experience');
        setExperiences(data.filter(exp => exp.published));
      } catch (error) {
        console.error('Failed to fetch experiences', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  if (loading) return null;
  if (experiences.length === 0) return null; // Don't show if empty per requirements

  return (
    <section id="experience" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">04 // Experience</span>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Professional <span className="text-zinc-500">Journey.</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative mt-20">
          {/* Minimal Vertical Line */}
          <div className="absolute left-[7px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 md:-translate-x-1/2"></div>
          
          <div className="space-y-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div 
                  key={exp._id}
                  className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-zinc-950 md:-translate-x-1/2 mt-1.5 md:mt-0 z-10"></div>
                  
                  <div className="hidden md:block md:w-1/2"></div>
                  
                  {/* Content */}
                  <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                    <div className="bg-transparent group">
                      
                      <h3 className="text-2xl font-bold text-zinc-100 font-heading mb-1">{exp.jobTitle}</h3>
                      <h4 className="text-lg text-emerald-400 font-medium mb-4">{exp.company}</h4>
                      
                      <div className="flex flex-col sm:flex-row gap-4 mb-6 text-sm text-zinc-500 font-mono tracking-wide">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={14} />
                          <span>
                            {new Date(exp.startDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})} - 
                            {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : ' Present'}
                          </span>
                        </div>
                        {exp.location && (
                          <div className="flex items-center gap-1.5">
                            <MapPin size={14} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                      </div>
                      
                      {exp.description && (
                        <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                          {exp.description}
                        </p>
                      )}
                      
                      {exp.responsibilities && exp.responsibilities.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-sm text-zinc-400 flex items-start gap-3">
                              <span className="text-emerald-500 mt-1 flex-shrink-0 text-[10px]">▹</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-4">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="text-[10px] font-mono tracking-widest px-2 py-1 bg-zinc-900 text-zinc-400 rounded border border-zinc-800 uppercase">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
