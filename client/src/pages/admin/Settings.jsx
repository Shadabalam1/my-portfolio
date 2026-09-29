import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import api from '../../utils/api';

const Settings = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savingSecurity, setSavingSecurity] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    siteTitle: '',
    siteDescription: '',
    footerText: '',
    contactEmail: '',
    resumeUrl: '',
  });

  const [securityData, setSecurityData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, profileRes] = await Promise.all([
          api.get('/settings'),
          api.get('/auth/me')
        ]);
        
        if (settingsRes.data && settingsRes.data._id) {
          setFormData({
            siteTitle: settingsRes.data.siteTitle || '',
            siteDescription: settingsRes.data.siteDescription || '',
            footerText: settingsRes.data.footerText || '',
            contactEmail: settingsRes.data.contactEmail || '',
            resumeUrl: settingsRes.data.resumeUrl || '',
          });
        }
        
        if (profileRes.data) {
          setSecurityData((prev) => ({
            ...prev,
            email: profileRes.data.email || '',
          }));
        }
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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
    data.append('folder', 'portfolio/resume');

    try {
      setUploading(true);
      const res = await api.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, resumeUrl: res.data.url });
      alert('Resume uploaded successfully. Remember to save settings.');
    } catch (error) {
      console.error('Upload failed', error);
      alert('File upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSecuritySubmit = async (e) => {
    e.preventDefault();
    try {
      setSavingSecurity(true);
      const res = await api.put('/auth/me', securityData);
      
      // Update local storage with new token if returned
      if (res.data && res.data.token) {
        localStorage.setItem('adminInfo', JSON.stringify({ token: res.data.token }));
      }
      
      setSecurityData(prev => ({ ...prev, password: '' })); // clear password field
      alert('Security credentials updated successfully');
    } catch (error) {
      console.error('Failed to update security credentials', error);
      alert(error.response?.data?.message || 'Failed to update credentials');
    } finally {
      setSavingSecurity(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await api.put('/settings', formData);
      alert('Settings updated successfully');
    } catch (error) {
      console.error('Failed to save settings', error);
      alert('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Website Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Configurations</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input 
                label="Site Title (SEO)" 
                name="siteTitle" 
                value={formData.siteTitle} 
                onChange={handleInputChange} 
                placeholder="My Portfolio" 
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Site Description (SEO Meta)</label>
                <textarea 
                  name="siteDescription" 
                  value={formData.siteDescription} 
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-400 focus:outline-none"
                  placeholder="A brief description of your portfolio for search engines"
                ></textarea>
              </div>

              <Input 
                label="Contact Form Receiver Email" 
                type="email" 
                name="contactEmail" 
                value={formData.contactEmail} 
                onChange={handleInputChange} 
                placeholder="Where contact form messages will be sent (Optional)" 
              />

              <Input 
                label="Footer Text" 
                name="footerText" 
                value={formData.footerText} 
                onChange={handleInputChange} 
                placeholder="© 2026 Your Name. All rights reserved." 
              />
            </div>

            <div className="pt-6 border-t">
              <h3 className="text-lg font-medium mb-4">Resume File</h3>
              
              <div className="flex items-center gap-4">
                {formData.resumeUrl ? (
                  <div className="flex flex-col gap-2 flex-1">
                    <a 
                      href={formData.resumeUrl} 
                      target="_blank" 
                      rel="noreferrer"
                      className="text-purple-600 hover:underline flex items-center gap-1"
                    >
                      Current Resume PDF
                    </a>
                  </div>
                ) : (
                  <p className="text-gray-500 flex-1">No resume uploaded</p>
                )}
                
                <div>
                  <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 font-medium inline-block transition-colors">
                    {uploading ? 'Uploading...' : 'Upload New Resume'}
                    <input 
                      type="file" 
                      accept=".pdf,.doc,.docx" 
                      onChange={handleFileUpload} 
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" isLoading={saving} className="px-8">
                Save Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Account Security</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSecuritySubmit} className="space-y-6">
            <div className="space-y-4">
              <Input 
                label="Admin Email" 
                type="email" 
                name="email" 
                value={securityData.email} 
                onChange={(e) => setSecurityData({...securityData, email: e.target.value})} 
                placeholder="admin@example.com" 
                required
              />
              
              <Input 
                label="New Password (Leave blank to keep current)" 
                type="password" 
                name="password" 
                value={securityData.password} 
                onChange={(e) => setSecurityData({...securityData, password: e.target.value})} 
                placeholder="Enter new password" 
              />
            </div>
            
            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" isLoading={savingSecurity} className="px-8 bg-red-600 hover:bg-red-700 text-white">
                Update Credentials
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
