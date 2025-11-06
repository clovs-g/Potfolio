import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Award } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { experienceService } from '../lib/supabase';
import type { Certificate } from '../types';
import type { Experience } from '../types';
import Card from '../components/UI/Card';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const ExperiencePage: React.FC = () => {
  const { isDark } = useThemeStore();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [certs, setCerts] = useState<Certificate[]>([]);

  useEffect(() => {
    const loadExperiences = async () => {
      setIsFetching(true);
      // 1) Instant cache render
      try {
        const cachedExp = sessionStorage.getItem('experience_cache_v1');
        if (cachedExp) setExperiences(JSON.parse(cachedExp) as Experience[]);
        const cachedCerts = sessionStorage.getItem('certificates_cache_v1');
        if (cachedCerts) setCerts(JSON.parse(cachedCerts) as Certificate[]);
        if (!cachedExp) {
          // If no cache, display demo experiences immediately for perceived speed
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
            }
          ];
          setExperiences(demoExperiences);
        }
      } catch {}

      // 2) Fetch fresh with soft timeout so UI isn't blocked
      const withTimeout = <T,>(p: Promise<T>, ms: number) => new Promise<T>((resolve, reject) => {
        const t = setTimeout(() => reject(new Error('timeout')), ms);
        p.then((v) => { clearTimeout(t); resolve(v); }).catch((e) => { clearTimeout(t); reject(e); });
      });

      try {
        const [expRes, certRes] = await Promise.allSettled([
          withTimeout(experienceService.getAll(), 800),
          (async () => {
            try {
              const supabaseLib = await import('../lib/supabase');
              return await withTimeout(supabaseLib.certificatesService.getAll(), 800);
            } catch (e) {
              const raw = localStorage.getItem('certificates_local');
              return raw ? (JSON.parse(raw) as Certificate[]) : [];
            }
          })()
        ]);

        if (expRes.status === 'fulfilled') {
          setExperiences(expRes.value || []);
          try { sessionStorage.setItem('experience_cache_v1', JSON.stringify(expRes.value || [])); } catch {}
        }
        if (certRes.status === 'fulfilled') {
          setCerts((certRes.value as Certificate[]) || []);
          try { sessionStorage.setItem('certificates_cache_v1', JSON.stringify(certRes.value || [])); } catch {}
        }
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
        setIsFetching(false);
      }
    };

    loadExperiences();
  }, []);

  // No blocking spinner; we render skeletons below if needed

  // Removed static certification chips; we only show uploaded certificates when available

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
          transition={{ duration: 0.5 }}
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
        <div className="space-y-8" style={{ contain: 'content' }}>
          {(experiences.length ? experiences : Array.from({ length: 4 }).map((_, i) => ({ id: `sk-${i}` } as any))).map((experience) => (
            <div key={experience.id} style={{ contentVisibility: 'auto' }}>
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
                        {('position' in experience) ? experience.position : <span className="block h-6 w-48 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}
                      </h3>
                      <p className={`text-lg font-medium ${
                        isDark ? 'text-blue-400' : 'text-blue-600'
                      }`}>
                        {('company' in experience) ? experience.company : <span className="inline-block h-5 w-40 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-2 sm:mt-0">
                      <Calendar className="w-4 h-4" />
                      <span>{('duration' in experience) ? experience.duration : <span className="inline-block h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}</span>
                    </div>
                  </div>

                  <p className={`text-base mb-4 ${
                    isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    {('description' in experience) ? experience.description : <span className="block h-16 w-full bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {('skills' in experience ? experience.skills : Array.from({ length: 5 }).map((_, i) => `sk${i}`)).map((skill: string) => (
                      <span
                        key={skill}
                        className={`px-3 py-1 text-xs rounded-full ${
                          isDark 
                            ? 'bg-gray-700 text-gray-300' 
                            : 'bg-gray-100 text-gray-700'
                        } ${skill.startsWith('sk') ? 'animate-pulse opacity-60 w-16 h-4' : ''}`}
                      >
                        {skill.startsWith('sk') ? '' : skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Certificates (uploaded only) */}
        {certs.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Card className="p-8">
              <div className="flex items-center mb-6">
                <Award className={`w-6 h-6 mr-3 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Certificates
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {certs.map((c) => (
                  <a
                    key={c.id || c.path}
                    href={c.url || '#'}
                    target={c.url ? '_blank' : undefined}
                    rel={c.url ? 'noreferrer' : undefined}
                    className={`${isDark ? 'text-blue-300 hover:text-blue-200' : 'text-blue-700 hover:text-blue-600'} underline`}
                  >
                    {c.name}
                  </a>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;