import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FolderGit2, ExternalLink, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import api from '../utils/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await api.get('/projects');
        setProjects(data.filter(p => p.published));
      } catch (error) {
        console.error('Failed to fetch projects', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Extract all unique technologies to use as categories
  const allTechs = projects.flatMap(p => p.technologies || []);
  const techCounts = allTechs.reduce((acc, tech) => {
    acc[tech] = (acc[tech] || 0) + 1;
    return acc;
  }, {});
  
  // Get top 4 technologies to use as filters + 'All'
  const topTechs = Object.entries(techCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(entry => entry[0]);
    
  const filters = ['All', ...topTechs];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.technologies?.includes(filter));

  return (
    <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-zinc-900">
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">02 // Work</span>
              <div className="h-[1px] w-12 bg-zinc-800"></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
              Selected <span className="text-zinc-500">Projects.</span>
            </h2>
          </motion.div>

          {/* Filters */}
          <motion.div 
            className="flex flex-wrap gap-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {filters.map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${
                  filter === f 
                    ? 'bg-zinc-100 text-zinc-900 border-zinc-100' 
                    : 'bg-transparent text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:border-zinc-600'
                }`}
              >
                {f}
              </button>
            ))}
          </motion.div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-zinc-600 font-mono">Loading projects...</div>
        ) : projects.length === 0 ? (
          <div className="flex justify-center py-20 text-zinc-600 font-mono">No projects found.</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="group bg-zinc-900/40 border border-zinc-800 rounded-xl overflow-hidden flex flex-col h-full hover:border-zinc-700 transition-colors"
                >
                  {/* Image container with overlay */}
                  <div className="relative h-60 overflow-hidden bg-zinc-900 border-b border-zinc-800">
                    {project.thumbnail ? (
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-700">
                        <ImageIcon size={48} strokeWidth={1} />
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 backdrop-blur-sm">
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110"
                          title="View Code"
                        >
                          <FaGithub size={28} />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noreferrer"
                          className="text-zinc-400 hover:text-white transition-colors transform hover:scale-110"
                          title="Live Demo"
                        >
                          <ExternalLink size={28} strokeWidth={1.5} />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-zinc-100 font-heading">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="text-emerald-400 text-[10px] uppercase tracking-widest font-bold font-mono">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <p className="text-zinc-400 text-sm line-clamp-3 mb-6 flex-1 leading-relaxed">
                      {project.shortDescription}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.technologies || []).slice(0, 3).map((tech, i) => (
                        <span key={i} className="text-[11px] font-mono tracking-wide px-2 py-1 bg-zinc-800/50 text-zinc-300 rounded border border-zinc-700">
                          {tech}
                        </span>
                      ))}
                      {(project.technologies || []).length > 3 && (
                        <span className="text-[11px] font-mono tracking-wide px-2 py-1 bg-zinc-800/50 text-zinc-300 rounded border border-zinc-700">
                          +{(project.technologies.length - 3)}
                        </span>
                      )}
                    </div>
                    
                    <Link 
                      to={`/project/${project.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-medium text-zinc-100 hover:text-zinc-300 transition-colors group/link mt-auto uppercase tracking-wider font-mono"
                    >
                      View Details 
                      <ChevronRight size={16} className="transform transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
