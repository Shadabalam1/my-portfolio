import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/public/Navbar';
import Footer from '../components/public/Footer';
import api from '../utils/api';

const PublicLayout = () => {
  const { pathname } = useLocation();
  const [profile, setProfile] = useState({});
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, settingsRes] = await Promise.all([
          api.get('/profile'),
          api.get('/settings')
        ]);
        if (profileRes.data) setProfile(profileRes.data);
        if (settingsRes.data) setSettings(settingsRes.data);
      } catch (error) {
        console.error('Error fetching layout data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white text-neutral-900">
        <div className="animate-pulse text-lg font-medium tracking-tight">Loading...</div>
      </div>
    );
  }

  return (
    <div className="public-theme bg-white min-h-screen text-neutral-900 font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Navbar profile={profile} settings={settings} />
      <AnimatePresence mode="wait">
        <motion.main 
          key={pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex-grow w-full relative z-10"
        >
          <Outlet context={{ profile, settings }} />
        </motion.main>
      </AnimatePresence>
      <Footer profile={profile} settings={settings} />
    </div>
  );
};

export default PublicLayout;
