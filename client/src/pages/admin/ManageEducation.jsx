import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { Pencil, Trash2, Plus, X } from 'lucide-react';

const ManageEducation = () => {
  const [educationList, setEducationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    order: 0,
  });

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

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/education/${currentEdu._id}`, formData);
      } else {
        await api.post('/education', formData);
      }
      fetchEducation();
      resetForm();
    } catch (error) {
      console.error('Failed to save education', error);
    }
  };

  const handleEdit = (edu) => {
    setCurrentEdu(edu);
    setFormData({
      degree: edu.degree,
      institution: edu.institution,
      location: edu.location || '',
      startDate: new Date(edu.startDate).toISOString().split('T')[0],
      endDate: edu.endDate ? new Date(edu.endDate).toISOString().split('T')[0] : '',
      description: edu.description || '',
      order: edu.order || 0,
    });
    setIsEditing(true);
    setIsFormVisible(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this education entry?')) {
      try {
        await api.delete(`/education/${id}`);
        fetchEducation();
      } catch (error) {
        console.error('Failed to delete education', error);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setIsFormVisible(false);
    setCurrentEdu(null);
    setFormData({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      order: 0,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Education</h1>
        {!isFormVisible && (
          <Button onClick={() => setIsFormVisible(true)} className="flex items-center gap-2">
            <Plus size={18} /> Add Education
          </Button>
        )}
      </div>

      {isFormVisible ? (
        <Card className="mb-8">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle>{isEditing ? 'Edit Education' : 'Add New Education'}</CardTitle>
            <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Degree / Certificate" name="degree" value={formData.degree} onChange={handleInputChange} required />
                <Input label="Institution" name="institution" value={formData.institution} onChange={handleInputChange} required />
                <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} />
                <Input label="Display Order" type="number" name="order" value={formData.order} onChange={handleInputChange} />
                <Input label="Start Date" type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} required />
                <Input label="End Date (Leave blank if ongoing)" type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
                <Button type="submit">
                  {isEditing ? 'Update Education' : 'Save Education'}
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
                    <th className="px-6 py-3">Degree & Institution</th>
                    <th className="px-6 py-3">Duration</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {educationList.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                        No education entries found.
                      </td>
                    </tr>
                  ) : (
                    educationList.map((edu) => (
                      <tr key={edu._id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-bold text-gray-900">{edu.degree}</div>
                          <div className="text-gray-500">{edu.institution} {edu.location && `• ${edu.location}`}</div>
                        </td>
                        <td className="px-6 py-4">
                          {new Date(edu.startDate).getFullYear()} - 
                          {edu.endDate ? new Date(edu.endDate).getFullYear() : ' Present'}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleEdit(edu)} className="text-blue-600 hover:text-blue-900 mr-3">
                            <Pencil size={18} />
                          </button>
                          <button onClick={() => handleDelete(edu._id)} className="text-red-600 hover:text-red-900">
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

export default ManageEducation;
