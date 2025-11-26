import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowDown, Code, Network, Brain } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import HeroScene from '../components/3D/HeroScene';
import Button from '../components/UI/Button';

const Home: React.FC = () => {
  const { isDark } = useThemeStore();
  const navigate = useNavigate();

  const specialties = [
    {
      icon: Network,
      title: 'Network & Service Mobile',
      description: 'Expert in mobile network infrastructure and service optimization'
    },
    {
      icon: Code,
      title: 'Web Development',
      description: 'Full-stack development with modern technologies and frameworks'
    },
    {
      icon: Brain,
      title: 'AI Engineering',
      description: 'Machine learning, AI model development and implementation'
    }
  ];

  return (
    <div className="relative min-h-screen">
      <HeroScene />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              <span className="block">Ir Rugendabanga</span>
              <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-slate-700 bg-clip-text text-transparent">
                Clovis
              </span>
            </h1>
          </motion.div>

          <motion.p
            className={`text-xl sm:text-2xl mb-8 max-w-3xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            IT Professional specializing in Network & Service Mobile, Web Development, and AI Engineering.
            Transforming ideas into innovative digital solutions.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" className="px-8 py-3" onClick={() => navigate('/projects')}>
              View My Work
            </Button>
            {/* Download CV - place `cv.pdf` in the `public/` folder for this to work */}
            <a href="/cv.pdf" className="inline-block">
              <Button variant="outline" size="lg" className="px-8 py-3">
                Download CV
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <ArrowDown className={`w-6 h-6 mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
          </motion.div>
        </div>
      </section>

  {/* Specialties Section */}
  {/* Removed section translucent background so individual cards keep their own panels and won't overlay other content */}
  <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Technical Expertise
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Delivering comprehensive solutions across multiple technology domains
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {specialties.map((specialty, index) => (
              <motion.div
                key={index}
                className={`p-8 rounded-xl border ${
                  isDark 
                    ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm' 
                    : 'bg-white/70 border-gray-200 backdrop-blur-sm'
                } hover:shadow-xl transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
              >
                <div className={`w-16 h-16 rounded-lg ${
                  isDark ? 'bg-gradient-to-br from-cyan-500 to-blue-700' : 'bg-gradient-to-br from-cyan-600 to-blue-800'
                } flex items-center justify-center mb-6`}>
                  <specialty.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-4 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  {specialty.title}
                </h3>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  {specialty.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;