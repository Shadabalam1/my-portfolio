import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import api from '../../utils/api';
import { Trash2, CheckCircle, Mail, Clock } from 'lucide-react';

const ManageMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  const fetchMessages = async () => {
    try {
      const { data } = await api.get('/messages');
      setMessages(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id, currentStatus) => {
    try {
      await api.patch(`/messages/${id}/read`, { isRead: !currentStatus });
      fetchMessages();
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage({ ...selectedMessage, isRead: !currentStatus });
      }
    } catch (error) {
      console.error('Failed to update message status', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await api.delete(`/messages/${id}`);
        fetchMessages();
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage(null);
        }
      } catch (error) {
        console.error('Failed to delete message', error);
      }
    }
  };

  const openMessage = (msg) => {
    setSelectedMessage(msg);
    if (!msg.isRead) {
      markAsRead(msg._id, false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Messages</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Message List */}
        <div className="lg:col-span-1 flex flex-col bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 font-semibold text-gray-700">
            Inbox ({messages.filter(m => !m.isRead).length} unread)
          </div>
          <div className="overflow-y-auto flex-1">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">No messages found.</div>
            ) : (
              messages.map(msg => (
                <div 
                  key={msg._id} 
                  onClick={() => openMessage(msg)}
                  className={`p-4 border-b cursor-pointer transition-colors ${selectedMessage?._id === msg._id ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'hover:bg-gray-50 border-l-4 border-l-transparent'} ${!msg.isRead ? 'font-bold' : ''}`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className="truncate pr-2">{msg.name}</span>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="text-sm truncate text-gray-600 mb-1">{msg.subject || 'No Subject'}</div>
                  <div className="text-xs text-gray-500 truncate">{msg.message}</div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail */}
        <div className="lg:col-span-2">
          {selectedMessage ? (
            <Card className="h-full flex flex-col">
              <CardHeader className="border-b bg-gray-50 flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-xl mb-2">{selectedMessage.subject || 'No Subject'}</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-semibold text-gray-900">{selectedMessage.name}</span>
                    <span>&lt;{selectedMessage.email}&gt;</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Clock size={14} />
                    {new Date(selectedMessage.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => markAsRead(selectedMessage._id, selectedMessage.isRead)}
                    title={selectedMessage.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    <CheckCircle size={16} className={selectedMessage.isRead ? "text-gray-400" : "text-green-600"} />
                  </Button>
                  <a href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}>
                    <Button variant="outline" size="sm" title="Reply">
                      <Mail size={16} className="text-blue-600" />
                    </Button>
                  </a>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleDelete(selectedMessage._id)}
                    title="Delete"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 flex-1 overflow-y-auto">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                  {selectedMessage.message}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border border-dashed border-gray-300 text-gray-500">
              Select a message to read
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageMessages;
