import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { FolderGit2, Code2, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';
import api from '../../utils/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0,
    education: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projRes, skillRes, expRes, eduRes, msgRes] = await Promise.all([
          api.get('/projects'),
          api.get('/skills'),
          api.get('/experience'),
          api.get('/education'),
          api.get('/messages')
        ]);

        setStats({
          projects: projRes.data.length,
          skills: skillRes.data.length,
          experience: expRes.data.length,
          education: eduRes.data.length,
          messages: msgRes.data.length,
          unreadMessages: msgRes.data.filter(m => !m.isRead).length
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  const statCards = [
    { title: 'Total Projects', value: stats.projects, icon: <FolderGit2 className="text-blue-500" size={24} /> },
    { title: 'Total Skills', value: stats.skills, icon: <Code2 className="text-purple-500" size={24} /> },
    { title: 'Experience Entries', value: stats.experience, icon: <Briefcase className="text-green-500" size={24} /> },
    { title: 'Education Entries', value: stats.education, icon: <GraduationCap className="text-yellow-500" size={24} /> },
    { title: 'Total Messages', value: stats.messages, icon: <MessageSquare className="text-pink-500" size={24} /> },
    { title: 'Unread Messages', value: stats.unreadMessages, icon: <MessageSquare className="text-red-500" size={24} /> },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, i) => (
          <Card key={i}>
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
                <h3 className="text-3xl font-bold text-gray-800">{stat.value}</h3>
              </div>
              <div className="p-4 bg-gray-50 rounded-full">
                {stat.icon}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
