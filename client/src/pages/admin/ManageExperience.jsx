import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const ManageExperience = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  
  const [formData, setFormData] = useState({
    jobTitle: '',
    company: '',
    employmentType: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    responsibilities: '',
    technologies: '',
    published: true,
    order: 0,
  });

  const fetchExperiences = async () => {
    try {
      const { data } = await api.get('/experience');
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        responsibilities: formData.responsibilities.split('\n').map(r => r.trim()).filter(Boolean),
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };

      if (isEditing) {
        await api.put(`/experience/${currentExp._id}`, payload);
      } else {
        await api.post('/experience', payload);
      }
      fetchExperiences();
      resetForm();
    } catch (error) {
      console.error('Failed to save experience', error);
    }
  };

  const handleEdit = (exp) => {
    setCurrentExp(exp);
    setFormData({
      jobTitle: exp.jobTitle,
      company: exp.company,
      employmentType: exp.employmentType || '',
      location: exp.location || '',
      startDate: new Date(exp.startDate).toISOString().split('T')[0],
      endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : '',
      description: exp.description || '',
      responsibilities: (exp.responsibilities || []).join('\n'),
      technologies: (exp.technologies || []).join(', '),
      published: exp.published,
      order: exp.order || 0,
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience entry?')) {
      try {
        await api.delete(`/experience/${id}`);
        fetchExperiences();
      } catch (error) {
        console.error('Failed to delete experience', error);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setIsFormVisible(false);
    setCurrentExp(null);
    setFormData({
      jobTitle: '',
      company: '',
      employmentType: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      responsibilities: '',
      technologies: '',
      published: true,
      order: 0,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Experience</h1>
        {!isFormVisible && (
          <Button onClick={() => setIsFormVisible(true)} className="flex items-center gap-2">
            <Plus size={18} /> Add Experience
          </Button>
        )}
      </div>

      {isFormVisible ? (
        <Card className="mb-8">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{isEditing ? 'Edit Experience' : 'Add New Experience'}</CardTitle>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} required />
                <Input label="Company" name="company" value={formData.company} onChange={handleInputChange} required />
                <Input label="Employment Type (e.g., Full-time)" name="employmentType" value={formData.employmentType} onChange={handleInputChange} />
                <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} />
                <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                <Input label="End Date (Leave blank if current)" type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
                <Input label="Display Order" type="number" name="order" value={formData.order} onChange={handleInputChange} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Responsibilities (One per line)</label>
                <textarea 
                  name="responsibilities" 
                  value={formData.responsibilities} 
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="Developed new features...&#10;Maintained existing code..."
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
                  placeholder="React, Node.js, AWS"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input type="checkbox" id="published" name="published" checked={formData.published} onChange={handleInputChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500" />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">Published (Visible)</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">
                  {isEditing ? 'Update Experience' : 'Save Experience'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3">Role & Company</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No experience entries found.
                      </td>
                    </tr>
                  ) : (
                    experiences.map((exp) => (
                      <tr key={exp._id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{exp.jobTitle}</div>
                          <div className="text-gray-500">{exp.company} {exp.location && `• ${exp.location}`}</div>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(exp.startDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'})} - 
                          {exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : ' Present'}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${exp.published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {exp.published ? 'Published' : 'Hidden'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEdit(exp)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(exp._id)} className="text-red-600 hover:text-red-900">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ManageExperience;
