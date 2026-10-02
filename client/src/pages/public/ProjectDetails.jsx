import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
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

  if (loading) return <div className="py-24 text-sm text-[#666666]">Loading...</div>;
  if (error) return <div className="py-24 text-sm text-red-600">{error}</div>;
  if (!project) return null;

  return (
    <div className="py-12">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-[#666666] hover:text-black transition-colors mb-12 hover:underline underline-offset-4 decoration-black/30">
        <ArrowLeft size={14} /> Back
      </Link>
      
      <div className="mb-12">
        <h1 className="text-2xl sm:text-3xl font-medium text-[#1A1A1A] mb-4">
          {project.title}
        </h1>
        <p className="text-base text-[#4A4A4A] leading-relaxed max-w-prose">
          {project.shortDescription}
        </p>
      </div>
      
      {project.thumbnail && (
        <div className="mb-16 w-full border border-black/5 bg-[#F9F9F9] p-2 sm:p-4 rounded-lg">
          <img 
            src={project.thumbnail} 
            alt={project.title} 
            className="w-full h-auto object-cover rounded shadow-sm border border-black/5" 
          />
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
        
        <div className="md:col-span-8">
          <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Overview</h2>
          <div className="text-[#4A4A4A] leading-relaxed space-y-4 max-w-prose mb-12">
            <div className="whitespace-pre-wrap">{project.description}</div>
          </div>
          
          {project.features && project.features.length > 0 && (
            <>
              <h2 className="text-lg font-medium text-[#1A1A1A] mb-4">Features</h2>
              <ul className="list-disc list-outside ml-4 text-[#4A4A4A] leading-relaxed space-y-2 max-w-prose">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="pl-2">{feature}</li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        <div className="md:col-span-4 space-y-8">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-[#666666] mb-3">Stack</h3>
            <div className="flex flex-wrap gap-2">
              {(project.technologies || []).map((tech, idx) => (
                <span key={idx} className="text-xs font-medium px-2 py-1 bg-black/5 text-[#4A4A4A] rounded">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-[#666666] mb-3">Links</h3>
            <div className="flex flex-col gap-2">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-[#1A1A1A] hover:opacity-70 transition-opacity flex items-center gap-1.5 w-fit"
                >
                  Live Website <ArrowUpRight size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-sm text-[#1A1A1A] hover:opacity-70 transition-opacity flex items-center gap-1.5 w-fit"
                >
                  Source Code <ArrowUpRight size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default ProjectDetails;
