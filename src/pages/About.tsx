import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin, Mail, Phone, Linkedin, Github, Award, Upload, Trash2 } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { useAuthStore } from '../stores/authStore';
import { aboutService, documentsService } from '../lib/supabase';
import type { About } from '../types';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import DocumentUploadModal from '../components/UI/DocumentUploadModal';
import toast from 'react-hot-toast';

interface Document {
  id: string;
  type: 'cv' | 'certificate';
  title: string;
  file_url: string;
  file_name: string;
  file_size: number;
  created_at: string;
}

const About: React.FC = () => {
  const { isDark } = useThemeStore();
  const { user } = useAuthStore();
  const [aboutData, setAboutData] = useState<About | null>({
    id: '1',
    bio: `I'm an experienced IT Professional with expertise spanning Network & Service Mobile infrastructure, Full-Stack Web Development, and AI Engineering. With a passion for innovative technology solutions, I specialize in creating robust, scalable systems that drive business success.

My journey in technology has been driven by curiosity and a commitment to continuous learning. From optimizing network infrastructures to developing cutting-edge AI applications, I bring a comprehensive understanding of modern technology stacks and methodologies.

I believe in the power of technology to transform businesses and improve lives. Whether it's building responsive web applications, implementing AI solutions, or designing secure network architectures, I approach each project with dedication, creativity, and technical excellence.`,
    skills: [
      'Network Architecture',
      'Mobile Service Infrastructure',
      'React.js & Next.js',
      'Node.js & Python',
      'Machine Learning',
      'AI Model Development',
      'Cloud Computing (AWS, Azure)',
      'Database Design',
      'DevOps & CI/CD',
    ],
    contact_info: {
      email: 'clovisrugendabanga4@gmail.com',
      phone: '0702913471',
      location: 'Uganda Kampala',
      linkedin: 'https://www.linkedin.com/in/clovis-deklo-268016392/',
      github: 'https://github.com/clovs-g'
    },
    resume_url: '',
    updated_at: '',
  });
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Document[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const loadDocuments = async () => {
    try {
      const cv = await documentsService.getCV();
      if (cv) {
        setCvUrl(cv.file_url);
      } else {
        setCvUrl(null);
      }

      const certs = await documentsService.getByType('certificate');
      setCertificates(certs || []);
    } catch (error) {
      console.error('Error loading documents:', error);
    }
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleDeleteDocument = async (id: string) => {
    if (!confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await documentsService.delete(id);
      toast.success('Document deleted successfully');
      await loadDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  return (
  <div className="min-h-screen pt-24 pb-12 transition-colors duration-300 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Bio */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className={`text-4xl sm:text-5xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ir Rugendabanga Clovis
              </h1>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent">
                About Me
              </h2>
              <p className={`text-base sm:text-lg leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {aboutData!.bio.split('\n\n').join(' ')}
              </p>
              <div className="flex flex-wrap gap-3">
                {aboutData!.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-5 py-2.5 rounded-lg text-sm font-medium ${
                      isDark
                        ? 'bg-gray-800/80 text-gray-300 border border-gray-700/50'
                        : 'bg-white text-gray-700 border border-gray-200'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Contact & Photo */}
          <div className="space-y-6">
            {/* Professional Photo Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="p-8 text-center">
                <div className="w-40 h-40 mx-auto rounded-full mb-6 shadow-lg overflow-hidden bg-white">
                  <img
                    src="/clovic-removebg-preview copy.png"
                    alt="Ir Rugendabanga Clovis"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className={`text-xl font-bold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Ir Rugendabanga Clovis
                </h3>
                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  IT Professional & Technology Leader
                </p>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="p-8">
                <h3 className={`text-xl font-bold mb-6 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Contact Information
                </h3>
                <div className="space-y-5">
                  <div className="flex items-start space-x-3">
                    <Mail className={`w-5 h-5 mt-0.5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm break-all ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {aboutData!.contact_info.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {aboutData!.contact_info.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className={`w-5 h-5 flex-shrink-0 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {aboutData!.contact_info.location}
                    </span>
                  </div>
                  <div className="flex space-x-3 pt-4">
                    <a
                      href={aboutData!.contact_info.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-lg transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href={aboutData!.contact_info.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-2.5 rounded-lg transition-colors duration-200 ${
                        isDark
                          ? 'text-gray-400 hover:text-white hover:bg-gray-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Certificates Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16"
        >
          <div className="mb-8">
            <h2 className={`text-3xl font-bold ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Certificates & Achievements
            </h2>
          </div>

          {certificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className={`p-6 h-full flex flex-col ${
                    isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <Award className={`w-10 h-10 ${
                        isDark ? 'text-yellow-400' : 'text-yellow-600'
                      }`} />
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                        }`}>
                          Certificate
                        </span>
                        {user && (
                          <button
                            onClick={() => handleDeleteDocument(cert.id)}
                            className={`p-1 rounded-lg transition-colors ${
                              isDark
                                ? 'hover:bg-red-900/20 text-red-400 hover:text-red-300'
                                : 'hover:bg-red-50 text-red-600 hover:text-red-700'
                            }`}
                            title="Delete certificate"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                    <h3 className={`text-lg font-bold mb-2 flex-1 ${
                      isDark ? 'text-white' : 'text-gray-900'
                    }`}>
                      {cert.title}
                    </h3>
                    <p className={`text-sm mb-4 ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {cert.file_name}
                    </p>
                    <a href={cert.file_url} target="_blank" rel="noopener noreferrer" download>
                      <Button variant="primary" size="sm" className="w-full flex items-center justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Download Certificate
                      </Button>
                    </a>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className={`p-12 text-center ${
              isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
            }`}>
              <Award className={`w-16 h-16 mx-auto mb-4 ${
                isDark ? 'text-gray-600' : 'text-gray-400'
              }`} />
              <h3 className={`text-xl font-semibold mb-2 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                No Certificates Yet
              </h3>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Certificates will appear here once uploaded.
              </p>
            </Card>
          )}
        </motion.div>

        {/* Upload Modal */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onUploadComplete={loadDocuments}
        />
      </div>
    </div>
  );
};

export default About;