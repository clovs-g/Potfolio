import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import clovisImg from '../../../image/clovis.png';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const { isDark, toggle } = useThemeStore();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Admin', href: '/admin' },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDark ? 'bg-gray-900/80' : 'bg-white/80'
    } backdrop-blur-md border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className={`w-10 h-10 rounded-lg overflow-hidden shadow-lg flex items-center justify-center bg-white`}> 
              <img src={clovisImg} alt="Clovis logo" className="w-full h-full object-cover" />
            </div>
            <span className={`hidden sm:block font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Clovis
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative py-2 px-1 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? isDark ? 'text-blue-400' : 'text-blue-600'
                    : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <motion.div
                    layoutId="activeIndicator"
                    className={`absolute bottom-0 left-0 right-0 h-0.5 ${
                      isDark ? 'bg-blue-400' : 'bg-blue-600'
                    } rounded-full`}
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${
                isDark 
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800' 
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t border-gray-200 dark:border-gray-800"
            >
              <div className="py-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 px-1 text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? isDark ? 'text-blue-400' : 'text-blue-600'
                        : isDark ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header;