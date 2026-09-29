import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import api from '../utils/api';

const ContactSection = () => {
  const { profile } = useOutletContext();
  
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
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-950 relative border-t border-zinc-900">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-zinc-500 font-mono text-sm tracking-widest uppercase">06 // Contact</span>
            <div className="h-[1px] w-12 bg-zinc-800"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-heading text-white">
            Let's <span className="text-zinc-500">Connect.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 max-w-6xl">
          
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6 font-heading">
              Ready to collaborate?
            </h3>
            <p className="text-zinc-400 leading-relaxed mb-12">
              Whether you have a question, a project idea, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
            </p>
            
            <div className="space-y-6">
              {profile?.email && (
                <div className="flex flex-col gap-2">
                  <h4 className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Email</h4>
                  <a href={`mailto:${profile.email}`} className="text-lg text-white hover:text-emerald-400 transition-colors border-b border-zinc-800 pb-4 inline-block w-full">
                    {profile.email}
                  </a>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-2/3 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              
              {status === 'success' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 bg-zinc-950/95 backdrop-blur-sm border border-zinc-800 rounded-xl flex flex-col items-center justify-center z-20 text-center p-8"
                >
                  <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                  <p className="text-zinc-400">Thanks for reaching out. I'll get back to you as soon as possible.</p>
                </motion.div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === 'error' && (
                  <div className="bg-red-950/50 border border-red-900 text-red-400 px-4 py-3 rounded-lg flex items-center gap-3">
                    <AlertCircle size={20} />
                    <p className="text-sm">{errorMessage}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Your Email</label>
                    <input 
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Subject (Optional)</label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs font-mono tracking-widest text-zinc-500 uppercase mb-2">Your Message</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-zinc-900/50 border border-zinc-800 rounded-md px-4 py-3 text-white focus:outline-none focus:border-zinc-500 focus:bg-zinc-900 transition-colors resize-none"
                    placeholder="Hello, I'd like to talk about..."
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="bg-white hover:bg-zinc-200 text-zinc-950 font-semibold py-3 px-8 rounded-md transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <>Send Message <Send size={16} strokeWidth={2} /></>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
