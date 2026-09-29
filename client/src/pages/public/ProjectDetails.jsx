import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Calendar, Tag, CheckCircle } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../../utils/api';

const ProjectDetails = () => {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await api.get(`/projects/${slug}`);
        setProject(data);
        document.title = `${data.title} | Portfolio`;
      } catch (err) {
        setError('Project not found');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-white">{error}</div>;
  if (!project) return null;

  return (
    <div className="bg-gray-950 min-h-screen pt-24 pb-20 relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <Link to="/#projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8">
          <ArrowLeft size={20} /> Back to Projects
        </Link>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-12 mb-16">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold font-heading text-white mb-6 leading-tight">
                {project.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-purple-400" />
                  <span>{new Date(project.createdAt).toLocaleDateString(undefined, {month: 'long', year: 'numeric'})}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Tag size={16} className="text-cyan-400" />
                  <span>{project.technologies?.[0] || 'Web App'}</span>
                </div>
              </div>
              
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                {project.description || project.shortDescription}
              </p>
              
              <div className="flex flex-wrap gap-4">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-colors backdrop-blur-md flex items-center gap-2 border border-white/10"
                  >
                    <FaGithub size={20} /> Source Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <ExternalLink size={20} /> Live Demo
                  </a>
                )}
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-purple-900/20">
                {project.thumbnail ? (
                  <img src={project.thumbnail} alt={project.title} className="w-full h-auto object-cover" />
                ) : (
                  <div className="w-full aspect-video bg-gray-900 flex items-center justify-center text-gray-700">No Image Available</div>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
                <span className="w-2 h-8 bg-purple-500 rounded-full inline-block"></span>
                Key Features
              </h3>
              <ul className="space-y-4">
                {(project.features || []).map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-gray-300">
                    <CheckCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 font-heading flex items-center gap-3">
                <span className="w-2 h-8 bg-cyan-500 rounded-full inline-block"></span>
                Technologies Used
              </h3>
              <div className="flex flex-wrap gap-3">
                {(project.technologies || []).map((tech, idx) => (
                  <span key={idx} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetails;

