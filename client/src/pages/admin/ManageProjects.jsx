import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { Pencil, Trash2, Plus, Image as ImageIcon, X } from 'lucide-react';

const ManageProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    description: '',
    features: '',
    technologies: '',
    thumbnail: '',
    githubUrl: '',
    liveUrl: '',
    featured: false,
    published: true,
    order: 0,
  });

  const fetchProjects = async () => {
    try {
      const { data } = await api.get('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Auto-generate slug from title
    if (name === 'title' && !isEditing) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, title: value, slug }));
      return;
    }

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'portfolio/projects');

    try {
      setUploading(true);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, thumbnail: res.data.url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (isEditing) {
        await api.put(`/projects/${currentProject._id}`, payload);
      } else {
        await api.post('/projects', payload);
      }
      fetchProjects();
      resetForm();
    } catch (error) {
      console.error('Failed to save project', error);
      alert(error.response?.data?.message || 'Failed to save project');
    }
  };

  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      title: project.title,
      slug: project.slug,
      shortDescription: project.shortDescription,
      description: project.description || '',
      features: (project.features || []).join(', '),
      technologies: (project.technologies || []).join(', '),
      thumbnail: project.thumbnail || '',
      githubUrl: project.githubUrl || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured,
      published: project.published,
      order: project.order || 0,
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/projects/${id}`);
        fetchProjects();
      } catch (error) {
        console.error('Failed to delete project', error);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setIsFormVisible(false);
    setCurrentProject(null);
    setFormData({
      title: '',
      slug: '',
      shortDescription: '',
      description: '',
      features: '',
      technologies: '',
      thumbnail: '',
      githubUrl: '',
      liveUrl: '',
      featured: false,
      published: true,
      order: 0,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Projects</h1>
        {!isFormVisible && (
          <Button onClick={() => setIsFormVisible(true)} className="flex items-center gap-2">
            <Plus size={18} /> Add Project
          </Button>
        )}
      </div>

      {isFormVisible ? (
        <Card className="mb-8">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{isEditing ? 'Edit Project' : 'Add New Project'}</CardTitle>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Project Title" name="title" value={formData.title} onChange={handleInputChange} required />
                <Input label="Slug (URL)" name="slug" value={formData.slug} onChange={handleInputChange} required />
                <Input label="GitHub URL" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} />
                <Input label="Live Demo URL" name="liveUrl" value={formData.liveUrl} onChange={handleInputChange} />
                <Input label="Display Order" type="number" name="order" value={formData.order} onChange={handleInputChange} />
              </div>
              
              <Input label="Short Description (for cards)" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} required />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Detailed Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Technologies (comma separated)</label>
                <textarea 
                  name="technologies" 
                  value={formData.technologies} 
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="React, Node.js, MongoDB, TailwindCSS"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <textarea 
                  name="features" 
                  value={formData.features} 
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="User Authentication, Payment Gateway, Real-time Chat"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
                <div className="flex items-center gap-4">
                  {formData.thumbnail && (
                    <img src={formData.thumbnail} alt="Thumbnail preview" className="w-20 h-20 object-cover rounded border" />
                  )}
                  <div className="flex-1">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      disabled={uploading}
                    />
                    {uploading && <p className="text-sm text-purple-600 mt-1">Uploading...</p>}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 pt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-700">Featured Project</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                  <label htmlFor="published" className="text-sm font-medium text-gray-700">Published (Visible)</label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit" isLoading={uploading}>
                  {isEditing ? 'Update Project' : 'Save Project'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12 text-gray-500">No projects found. Add your first project!</div>
          ) : (
            projects.map(project => (
              <Card key={project._id} className="overflow-hidden flex flex-col">
                <div className="h-48 bg-gray-200 relative">
                  {project.thumbnail ? (
                    <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <ImageIcon size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 flex gap-2">
                    {project.featured && <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded font-bold shadow">Featured</span>}
                    {!project.published && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded font-bold shadow">Draft</span>}
                  </div>
                </div>
                <CardContent className="flex-1">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">{project.shortDescription}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {(project.technologies || []).slice(0, 3).map((tech, i) => (
                      <span key={i} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{tech}</span>
                    ))}
                    {(project.technologies || []).length > 3 && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">+{project.technologies.length - 3}</span>}
                  </div>
                </CardContent>
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Order: {project.order}</span>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 rounded transition">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 rounded transition">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ManageProjects;
