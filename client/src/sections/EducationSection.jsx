import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../utils/api';
import { GraduationCap } from 'lucide-react';

const EducationSection = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const { data } = await api.get('/education');
        setEducation(data.sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('Failed to fetch education', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  if (loading || education.length === 0) return null;

  return (
    <section id="education" className="py-24 bg-neutral-50/50 relative border-t border-neutral-100">
      <div className="container mx-auto px-6 lg:px-12 max-w-5xl">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 shadow-sm">
              <GraduationCap size={24} />
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
              Education
            </h2>
          </div>
        </motion.div>

        <div className="space-y-4">
          {education.map((edu, idx) => (
            <motion.div 
              key={edu._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 p-6 md:p-8 rounded-3xl transition-all duration-500 hover:bg-white border border-transparent hover:border-neutral-200/60 hover:shadow-sm"
            >
              <div className="md:col-span-1 pt-1 md:pr-4">
                <div className="text-sm font-bold text-neutral-400 uppercase tracking-widest mb-2">
                  {formatDate(edu.startDate)} — {edu.current ? 'Present' : formatDate(edu.endDate)}
                </div>
                <div className="text-lg font-bold text-neutral-900">
                  {edu.institution}
                </div>
              </div>
              
              <div className="md:col-span-3 flex flex-col">
                <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {edu.degree}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default EducationSection;
