import HeroScene from './components/3D/HeroScene';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './stores/themeStore';
import { useAuthStore } from './stores/authStore';
import { trackPageView } from './lib/analytics';

// Layout Components
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import VideoBackground from './components/Layout/VideoBackground';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';

// Admin Pages
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import SignUp from './pages/admin/SignUp';
import AdminHome from './pages/admin/AdminHome';
import AdminAbout from './pages/admin/AdminAbout';
import AdminProjects from './pages/admin/AdminProjects';
import AdminDocuments from './pages/admin/AdminDocuments';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) {
      trackPageView(location.pathname, document.title);
    }
  }, [location]);

  return null;
}

function App() {
  const { isDark } = useThemeStore();
  const { initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <AnalyticsTracker />
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/signup" element={<SignUp />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="documents" element={<AdminDocuments />} />
            <Route path="settings" element={<div>Admin Settings Page (Coming Soon)</div>} />
          </Route>

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <Header />
                <VideoBackground />
                <main className="min-h-screen relative z-10">
                  <div className="relative w-full min-h-[60vh] flex items-center justify-center">
                    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <HeroScene />
                    </div>
                    {/* Hero section content will be rendered by each page */}
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </div>
                  {/* Other page content can go here if needed */}
                </main>
                <Footer />
              </>
            }
          />
        </Routes>

        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: isDark ? '#374151' : '#ffffff',
              color: isDark ? '#f3f4f6' : '#111827',
              border: isDark ? '1px solid #4b5563' : '1px solid #e5e7eb',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;