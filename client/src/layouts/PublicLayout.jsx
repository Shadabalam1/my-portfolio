import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import api from '../utils/api';

const PublicLayout = () => {
  const [profile, setProfile] = useState(null);
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const [profileRes, settingsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/settings')
        ]);
        setProfile(profileRes.data);
        setSettings(settingsRes.data);
        
        // Update document title
        if (settingsRes.data.siteTitle) {
          document.title = settingsRes.data.siteTitle;
        }
      } catch (error) {
        console.error('Failed to fetch global data', error);
      }
    };
    fetchGlobalData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-950 text-gray-300">
      <Navbar resumeUrl={settings?.resumeUrl} profile={profile} />
      <main className="flex-grow w-full">
        <Outlet context={{ profile, settings }} />
      </main>
      <Footer profile={profile} settings={settings} />
    </div>
  );
};

export default PublicLayout;
