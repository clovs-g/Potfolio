import React from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, User } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';

const Footer: React.FC = () => {
  const { isDark } = useThemeStore();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/clovs-g', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/clovis-deklo-268016392/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:clovisrugendabanga4@gmail.com', label: 'Email' },
  ];

  return (
    <footer
      className={`backdrop-blur-lg ${isDark ? 'bg-black/50' : 'bg-white/40'} border-t ${isDark ? 'border-white/5' : 'border-gray-200/20'} transition-colors duration-300`}
      style={{ WebkitBackdropFilter: 'blur(12px)' }}
    >
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 rounded-lg overflow-hidden shadow-sm flex items-center justify-center ${isDark ? 'bg-white/10' : 'bg-white'}`}>
                <img src={clovisImg} alt="Clovis logo" className="w-full h-full object-cover" />
              </div>
              <span className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Ir Rugendabanga Clovis
              </span>
            </div>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              IT Professional specializing in Network & Service Mobile, Web Development, and AI Engineering.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Info</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>0702913471</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>clovisrugendabanga4@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className={`w-4 h-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Uganda Kampala</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Connect</h3>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={`p-2 rounded-lg transition-colors duration-200 ${
                    isDark 
                      ? 'text-gray-400 hover:text-white hover:bg-gray-800' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

  <div className={`mt-8 pt-8 border-t border-transparent text-center`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © {new Date().getFullYear()} Ir Rugendabanga Clovis. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;