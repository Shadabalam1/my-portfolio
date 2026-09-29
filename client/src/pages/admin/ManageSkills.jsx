import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';
import { Pencil, Trash2, Plus } from 'lucide-react';

const ManageSkills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    icon: '',
    level: 50,
    order: 0,
    isActive: true,
  });

  const fetchSkills = async () => {
    try {
      const { data } = await api.get('/skills');
      setSkills(data);
    } catch (error) {
      console.error('Failed to fetch skills', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
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
      if (isEditing) {
        await api.put(`/skills/${currentSkill._id}`, formData);
      } else {
        await api.post('/skills', formData);
      }
      fetchSkills();
      resetForm();
    } catch (error) {
      console.error('Failed to save skill', error);
    }
  };

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      icon: skill.icon || '',
      level: skill.level || 50,
      order: skill.order || 0,
      isActive: skill.isActive,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (error) {
        console.error('Failed to delete skill', error);
      }
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentSkill(null);
    setFormData({
      name: '',
      category: '',
      icon: '',
      level: 50,
      order: 0,
      isActive: true,
    });
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manage Skills</h1>
        {isEditing && (
          <Button onClick={resetForm} variant="outline">
            Cancel Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>{isEditing ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Skill Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <Input
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="e.g., Frontend, Backend"
                  required
                />
                <Input
                  label="Icon (SVG string or class)"
                  name="icon"
                  value={formData.icon}
                  onChange={handleInputChange}
                />
                <Input
                  label="Proficiency Level (1-100)"
                  type="number"
                  name="level"
                  min="1"
                  max="100"
                  value={formData.level}
                  onChange={handleInputChange}
                />
                <Input
                  label="Display Order"
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleInputChange}
                />
                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                    Active (Visible on portfolio)
                  </label>
                </div>
                <Button type="submit" className="w-full mt-4">
                  {isEditing ? 'Update Skill' : 'Add Skill'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Level</th>
                      <th className="px-6 py-3">Status</th>
                      <th className="px-6 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                          No skills found.
                        </td>
                      </tr>
                    ) : (
                      skills.map((skill) => (
                        <tr key={skill._id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-gray-900">{skill.name}</td>
                          <td className="px-6 py-4">{skill.category}</td>
                          <td className="px-6 py-4">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 rounded text-xs ${skill.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {skill.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => handleEdit(skill)} className="text-blue-600 hover:text-blue-900 mr-3">
                              <Pencil size={18} />
                            </button>
                            <button onClick={() => handleDelete(skill._id)} className="text-red-600 hover:text-red-900">
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
        </div>
      </div>
    </div>
  );
};

export default ManageSkills;
