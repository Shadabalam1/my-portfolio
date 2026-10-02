import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
const AdminLayout = lazy(() => import('./layouts/AdminLayout'));

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Skills from './pages/public/Skills';
import Projects from './pages/public/Projects';
import Experience from './pages/public/Experience';
import Education from './pages/public/Education';
import Contact from './pages/public/Contact';
const ProjectDetails = lazy(() => import('./pages/public/ProjectDetails'));

// Admin Pages
const Login = lazy(() => import('./pages/admin/Login'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const ManageProfile = lazy(() => import('./pages/admin/ManageProfile'));
const ManageSkills = lazy(() => import('./pages/admin/ManageSkills'));
const ManageProjects = lazy(() => import('./pages/admin/ManageProjects'));
const ManageExperience = lazy(() => import('./pages/admin/ManageExperience'));
const ManageEducation = lazy(() => import('./pages/admin/ManageEducation'));
const ManageMessages = lazy(() => import('./pages/admin/ManageMessages'));
const Settings = lazy(() => import('./pages/admin/Settings'));

const ProtectedRoute = ({ children }) => {
  const { adminInfo, loading } = useAuth();
  
  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;
  
  if (!adminInfo) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<div className="flex h-screen items-center justify-center text-gray-500">Loading...</div>}>
    {children}
  </Suspense>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="skills" element={<Skills />} />
            <Route path="projects" element={<Projects />} />
            <Route path="experience" element={<Experience />} />
            <Route path="education" element={<Education />} />
            <Route path="contact" element={<Contact />} />
            <Route path="project/:slug" element={<SuspenseWrapper><ProjectDetails /></SuspenseWrapper>} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<SuspenseWrapper><Login /></SuspenseWrapper>} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <SuspenseWrapper><AdminLayout /></SuspenseWrapper>
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<SuspenseWrapper><Dashboard /></SuspenseWrapper>} />
            <Route path="profile" element={<SuspenseWrapper><ManageProfile /></SuspenseWrapper>} />
            <Route path="skills" element={<SuspenseWrapper><ManageSkills /></SuspenseWrapper>} />
            <Route path="projects" element={<SuspenseWrapper><ManageProjects /></SuspenseWrapper>} />
            <Route path="experience" element={<SuspenseWrapper><ManageExperience /></SuspenseWrapper>} />
            <Route path="education" element={<SuspenseWrapper><ManageEducation /></SuspenseWrapper>} />
            <Route path="messages" element={<SuspenseWrapper><ManageMessages /></SuspenseWrapper>} />
            <Route path="settings" element={<SuspenseWrapper><Settings /></SuspenseWrapper>} />
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
          </Route>
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
