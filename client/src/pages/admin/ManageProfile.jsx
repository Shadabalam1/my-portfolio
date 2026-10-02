import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';

const ManageProfile = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    shortBio: '',
    heroTagline: '',
    heroDescription: '',
    primaryBtnText: '',
    primaryBtnLink: '',
    secondaryBtnText: '',
    secondaryBtnLink: '',
    availabilityText: '',
    resumeUrl: '',
    about: '',
    yearsOfExperience: 0,
    projectsCompleted: 0,
    profileImage: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get('/profile');
        if (data && data._id) {
          setFormData({
            name: data.name || '',
            title: data.title || '',
            shortBio: data.shortBio || '',
            heroTagline: data.heroTagline || '',
            heroDescription: data.heroDescription || '',
            primaryBtnText: data.primaryBtnText || '',
            primaryBtnLink: data.primaryBtnLink || '',
            secondaryBtnText: data.secondaryBtnText || '',
            secondaryBtnLink: data.secondaryBtnLink || '',
            availabilityText: data.availabilityText || '',
            resumeUrl: data.resumeUrl || '',
            about: data.about || '',
            yearsOfExperience: data.yearsOfExperience || 0,
            projectsCompleted: data.projectsCompleted || 0,
            profileImage: data.profileImage || '',
            email: data.email || '',
            phone: data.phone || '',
            location: data.location || '',
            github: data.github || '',
            linkedin: data.linkedin || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'portfolio/profile');

    try {
      setUploading(true);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, profileImage: res.data.url });
    } catch (error) {
      console.error('Upload failed', error);
      alert('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('file', file);
    data.append('folder', 'portfolio/resume');

    try {
      setUploadingResume(true);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, resumeUrl: res.data.url });
    } catch (error) {
      console.error('Upload failed', error);
      alert(`Resume upload failed: ${error.response?.data?.message || error.message}`);
    } finally {
      setUploadingResume(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/profile', formData);
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to save profile', error);
      alert(`Failed to update profile: ${error.response?.data?.message || error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Manage Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Image Column */}
              <div className="w-full md:w-1/3 flex flex-col items-center space-y-4">
                <div className="w-48 h-48 rounded-full bg-gray-200 overflow-hidden border-4 border-white shadow-lg relative">
                  {formData.profileImage ? (
                    <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="w-full text-center">
                  <label className="block text-sm font-medium text-gray-700 mb-1 cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
                    {uploading ? 'Uploading...' : 'Change Profile Picture'}
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileUpload} 
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
              
              {/* Form Column */}
              <div className="w-full md:w-2/3 space-y-4">
                <Input label="Full Name" name="name" value={formData.name} onChange={handleInputChange} required />
                <Input label="Professional Title" name="title" value={formData.title} onChange={handleInputChange} required />
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Tagline</label>
                  <textarea 
                    name="heroTagline" 
                    value={formData.heroTagline} 
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="Engineering digital excellence."
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Description</label>
                  <textarea 
                    name="heroDescription" 
                    value={formData.heroDescription} 
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                    placeholder="I build high-performance web applications..."
                  ></textarea>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Primary Button Text" name="primaryBtnText" value={formData.primaryBtnText} onChange={handleInputChange} placeholder="Explore Projects" />
                  <Input label="Primary Button Link" name="primaryBtnLink" value={formData.primaryBtnLink} onChange={handleInputChange} placeholder="/projects" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Secondary Button Text" name="secondaryBtnText" value={formData.secondaryBtnText} onChange={handleInputChange} placeholder="Get in touch" />
                  <Input label="Secondary Button Link" name="secondaryBtnLink" value={formData.secondaryBtnLink} onChange={handleInputChange} placeholder="/contact" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Availability Badge Text" name="availabilityText" value={formData.availabilityText} onChange={handleInputChange} placeholder="Available for work" />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF)</label>
                    <div className="flex gap-2 items-center">
                      <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300 text-sm whitespace-nowrap">
                        {uploadingResume ? 'Uploading...' : 'Upload PDF'}
                        <input 
                          type="file" 
                          accept=".pdf,application/pdf" 
                          onChange={handleResumeUpload} 
                          className="hidden"
                          disabled={uploadingResume}
                        />
                      </label>
                      {formData.resumeUrl && (
                        <a href={formData.resumeUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline truncate">
                          View Current
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Detailed About Me</h3>
              <textarea 
                name="about" 
                value={formData.about} 
                onChange={handleInputChange}
                rows={6}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
              ></textarea>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Stats</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Years of Experience" type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleInputChange} />
                <Input label="Projects Completed" type="number" name="projectsCompleted" value={formData.projectsCompleted} onChange={handleInputChange} />
              </div>
            </div>

            <div className="pt-4 border-t">
              <h3 className="text-lg font-semibold mb-4">Contact & Social</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input label="Email Address" type="email" name="email" value={formData.email} onChange={handleInputChange} />
                <Input label="Phone Number" name="phone" value={formData.phone} onChange={handleInputChange} />
                <Input label="Location" name="location" value={formData.location} onChange={handleInputChange} placeholder="e.g. New York, USA" />
                <Input label="GitHub URL" name="github" value={formData.github} onChange={handleInputChange} />
                <Input label="LinkedIn URL" name="linkedin" value={formData.linkedin} onChange={handleInputChange} />
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end">
              <Button type="submit" isLoading={saving} className="px-8">
                Save Profile
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProfile;
