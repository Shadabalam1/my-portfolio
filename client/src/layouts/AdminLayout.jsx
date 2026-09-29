import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  UserCircle, 
  Code2, 
  FolderGit2, 
  Briefcase, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';

const AdminLayout = () => {
  const { logout, adminInfo } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Profile', path: '/admin/profile', icon: <UserCircle size={20} /> },
    { name: 'Skills', path: '/admin/skills', icon: <Code2 size={20} /> },
    { name: 'Projects', path: '/admin/projects', icon: <FolderGit2 size={20} /> },
    { name: 'Experience', path: '/admin/experience', icon: <Briefcase size={20} /> },
    { name: 'Education', path: '/admin/education', icon: <GraduationCap size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <MessageSquare size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
          <p className="text-sm text-gray-500">{adminInfo?.name}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 text-red-600 rounded-md hover:bg-red-50 transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="bg-white shadow-sm p-4 md:hidden flex justify-between items-center">
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <button onClick={handleLogout} className="text-red-600"><LogOut size={20} /></button>
        </header>
        <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
