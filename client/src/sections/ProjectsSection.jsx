import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import api from '../utils/api';

const ProjectsSection = () => {
  const location = useLocation();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data.filter(p => p.published !== false).sort((a, b) => a.order - b.order));
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading || projects.length === 0) return null;

  return (
    <section id="projects" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-neutral-900">
              Selected Work
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {location.pathname !== '/projects' && (
              <Link to="/projects" className="text-neutral-600 hover:text-neutral-900 transition-colors flex items-center gap-2 font-semibold">
                View all projects <ArrowRight size={18} />
              </Link>
            )}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {(location.pathname === '/projects' ? projects : projects.slice(0, 4)).map((project, idx) => (
            <motion.div 
              key={project._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: (idx % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group rounded-2xl bg-white border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <Link to={`/project/${project.slug}`} className="block relative aspect-[16/10] overflow-hidden bg-neutral-100">
                {project.thumbnail ? (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400 font-medium">
                    No Image Available
                  </div>
                )}
                <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/10 transition-colors duration-300"></div>
              </Link>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex flex-wrap gap-2 mb-5">
                  {(project.technologies || []).slice(0, 4).map((tech, i) => (
                    <span key={i} className="text-xs font-bold px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 border border-neutral-200">
                      {tech}
                    </span>
                  ))}
                  {(project.technologies?.length > 4) && (
                    <span className="text-xs font-bold px-2.5 py-1 text-neutral-500">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
                
                <h3 className="text-2xl font-bold text-neutral-900 mb-3 tracking-tight">
                  <Link to={`/project/${project.slug}`} className="hover:text-blue-600 transition-colors">
                    {project.title}
                  </Link>
                </h3>
                
                <p className="text-neutral-600 mb-8 flex-1 leading-relaxed">
                  {project.shortDescription}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-neutral-100">
                  <Link 
                    to={`/project/${project.slug}`}
                    className="text-sm font-bold text-neutral-900 hover:text-blue-600 transition-colors flex items-center gap-1.5 group/link"
                  >
                    Read Case Study <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                  
                  <div className="flex gap-4 text-neutral-500">
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors" title="Source Code">
                        <FaGithub size={20} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors" title="Live Demo">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default ProjectsSection;
