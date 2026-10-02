import { useState } from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { Send, MapPin, Mail, Phone } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import api from '../utils/api';

const ContactSection = () => {
  const { profile, settings } = useOutletContext();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      await api.post('/messages', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-50/50">
      
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-neutral-900 mb-6">
              {settings?.contactHeading || "Let's talk."}
            </h2>
            <p className="text-neutral-600 text-lg mb-12 leading-relaxed max-w-md">
              {settings?.contactDescription || "Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!"}
            </p>
            
            <div className="space-y-6 mb-12">
              {profile?.email && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 mb-0.5">Email</div>
                    <a href={`mailto:${profile.email}`} className="text-neutral-600 hover:text-blue-600 transition-colors font-medium">
                      {profile.email}
                    </a>
                  </div>
                </div>
              )}
              
              {profile?.location && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 mb-0.5">Location</div>
                    <span className="text-neutral-600 font-medium">{profile.location}</span>
                  </div>
                </div>
              )}
              
              {profile?.phone && (
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700">
                    <Phone size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-neutral-900 mb-0.5">Phone</div>
                    <a href={`tel:${profile.phone}`} className="text-neutral-600 hover:text-blue-600 transition-colors font-medium">
                      {profile.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex gap-4">
              {profile?.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:text-neutral-900 hover:border-neutral-300 transition-all">
                  <span className="sr-only">GitHub</span>
                  <FaGithub size={20} />
                </a>
              )}
              {profile?.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full bg-white border border-neutral-200 shadow-sm flex items-center justify-center text-neutral-700 hover:text-blue-600 hover:border-neutral-300 transition-all">
                  <span className="sr-only">LinkedIn</span>
                  <FaLinkedin size={20} />
                </a>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="p-8 md:p-10 rounded-2xl bg-white border border-neutral-200 shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-neutral-900 block">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-neutral-900 block">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-neutral-900 block">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors"
                  placeholder="How can I help you?"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-bold text-neutral-900 block">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-3 text-neutral-900 focus:outline-none focus:border-neutral-400 focus:ring-1 focus:ring-neutral-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full py-4 rounded-lg bg-neutral-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors disabled:opacity-70 shadow-sm"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Message'} 
                <Send size={18} />
              </button>
              
              {status === 'success' && (
                <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {status === 'error' && (
                <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm font-medium">
                  {errorMessage}
                </div>
              )}
              
            </form>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
