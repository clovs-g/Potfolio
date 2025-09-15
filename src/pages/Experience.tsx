import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { experienceService } from '../lib/supabase';
import type { Experience } from '../types';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ExperiencePage: React.FC = () => {
  const { isDark } = useThemeStore();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await experienceService.getAll();
        setExperiences(data || []);
      } catch (error) {
        console.error('Error loading experiences:', error);
        // Fallback demo data
        const demoExperiences: Experience[] = [
          {
            id: '1',
            company: 'TechCorp Solutions',
            position: 'Senior Network Engineer',
            duration: '2022 - Present',
            description: 'Leading network infrastructure projects for enterprise clients, specializing in SD-WAN implementations and network security optimization. Managed a team of 5 engineers and delivered solutions that improved network performance by 45%.',
            skills: ['Network Architecture', 'SD-WAN', 'Cisco', 'Security', 'Team Leadership'],
            created_at: '2024-01-01'
          },
          {
            id: '2',
            company: 'InnovateAI Labs',
            position: 'AI Engineering Consultant',
            duration: '2021 - 2022',
            description: 'Developed and deployed machine learning models for various clients, focusing on natural language processing and computer vision applications. Built scalable ML pipelines and reduced model inference time by 60%.',
            skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'MLOps'],
            created_at: '2024-01-02'
          },
          {
            id: '3',
            company: 'WebDev Pro',
            position: 'Full Stack Developer',
            duration: '2020 - 2021',
            description: 'Built modern web applications using React, Node.js, and cloud technologies. Collaborated with cross-functional teams to deliver high-quality solutions for clients in various industries.',
            skills: ['React', 'Node.js', 'MongoDB', 'AWS', 'GraphQL', 'TypeScript'],
            created_at: '2024-01-03'
          },
          {
            id: '4',
            company: 'NetSecure Systems',
            position: 'Network Administrator',
            duration: '2019 - 2020',
            description: 'Maintained and optimized network infrastructure for a mid-sized company. Implemented security protocols and monitoring systems that reduced downtime by 30%.',
            skills: ['Network Monitoring', 'Firewall Management', 'VPN', 'Security Protocols'],
            created_at: '2024-01-04'
          }
        ];
        setExperiences(demoExperiences);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const certifications = [
    'Cisco Certified Network Professional (CCNP)',
    'AWS Solutions Architect',
    'Google Cloud Professional ML Engineer',
    'Microsoft Azure AI Engineer',
    'CompTIA Security+',
    'Project Management Professional (PMP)'
  ];

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Professional Experience
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My journey through various roles in technology and engineering
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <motion.div
              key={experience.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <Card className="p-8 relative">
                {/* Timeline dot */}
                <div className={`absolute -left-4 top-8 w-8 h-8 rounded-full border-4 ${
                  isDark ? 'bg-gray-900 border-blue-500' : 'bg-gray-50 border-blue-600'
                } flex items-center justify-center`}>
                  <div className={`w-3 h-3 rounded-full ${
                    isDark ? 'bg-blue-500' : 'bg-blue-600'
                  }`} />
                </div>

                <div className="ml-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                    <div>
                      <h3 className={`text-xl font-bold ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {experience.position}
                      </h3>
                      <p className={`text-lg font-medium ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {experience.company}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span>{experience.duration}</span>
                    </div>
                  </div>

                  <p className={`text-base mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {experience.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="p-8">
            <div className="flex items-center mb-6">
              <Award className={`w-6 h-6 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Certifications & Qualifications
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  className={`flex items-center p-3 rounded-lg ${
                    isDark ? 'bg-gray-700/50' : 'bg-gray-50'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                >
                  <div className={`w-2 h-2 rounded-full mr-3 ${
                    isDark ? 'bg-blue-400' : 'bg-blue-600'
                  }`} />
                  <span className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {cert}
                  </span>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ExperiencePage;