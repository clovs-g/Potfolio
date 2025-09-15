import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Calendar,
  Globe,
  Smartphone
} from 'lucide-react';
import { useThemeStore } from '../../stores/themeStore';
import Card from '../../components/UI/Card';

const Dashboard: React.FC = () => {
  const { isDark } = useThemeStore();
  const [stats, setStats] = useState({
    totalViews: 12345,
    uniqueVisitors: 8901,
    projectViews: 456,
    contactMessages: 23
  });

  const statCards = [
    {
      title: 'Total Page Views',
      value: stats.totalViews.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: Eye,
      color: 'blue'
    },
    {
      title: 'Unique Visitors',
      value: stats.uniqueVisitors.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: Users,
      color: 'green'
    },
    {
      title: 'Project Views',
      value: stats.projectViews.toLocaleString(),
      change: '+15.3%',
      changeType: 'increase',
      icon: BarChart,
      color: 'purple'
    },
    {
      title: 'Contact Messages',
      value: stats.contactMessages.toString(),
      change: '+5 this week',
      changeType: 'neutral',
      icon: MessageSquare,
      color: 'orange'
    }
  ];

  const recentActivities = [
    { type: 'project_view', description: 'AI-Powered Analytics Dashboard viewed', time: '2 hours ago' },
    { type: 'contact', description: 'New contact message received', time: '4 hours ago' },
    { type: 'project_view', description: 'E-Commerce Platform project viewed', time: '6 hours ago' },
    { type: 'page_view', description: 'About page visited from mobile', time: '8 hours ago' },
    { type: 'project_view', description: 'Network Infrastructure project viewed', time: '1 day ago' }
  ];

  const deviceStats = {
    desktop: 60,
    mobile: 35,
    tablet: 5
  };

  const topPages = [
    { page: 'Home', views: 4532, percentage: 37 },
    { page: 'Projects', views: 3210, percentage: 26 },
    { page: 'About', views: 2890, percentage: 23 },
    { page: 'Experience', views: 1234, percentage: 10 },
    { page: 'Contact', views: 479, percentage: 4 }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Dashboard
        </h1>
        <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          Welcome back! Here's what's happening with your portfolio.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {stat.title}
                  </p>
                  <p className={`text-2xl font-bold mt-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 flex items-center ${
                    stat.changeType === 'increase' ? 'text-green-500' : 
                    stat.changeType === 'decrease' ? 'text-red-500' : 
                    isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.changeType === 'increase' && <TrendingUp className="w-4 h-4 mr-1" />}
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400' :
                  stat.color === 'green' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                  stat.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                  'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                }`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="p-6">
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'project_view' ? 'bg-blue-500' :
                    activity.type === 'contact' ? 'bg-green-500' :
                    'bg-gray-400'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {activity.description}
                    </p>
                    <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Device Stats */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card className="p-6">
            <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Device Analytics
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Globe className={`w-5 h-5 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Desktop
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${deviceStats.desktop}%` }}
                    />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {deviceStats.desktop}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className={`w-5 h-5 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Mobile
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${deviceStats.mobile}%` }}
                    />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {deviceStats.mobile}%
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Calendar className={`w-5 h-5 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    Tablet
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full" 
                      style={{ width: `${deviceStats.tablet}%` }}
                    />
                  </div>
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {deviceStats.tablet}%
                  </span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Top Pages */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="p-6">
          <h2 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Top Pages
          </h2>
          <div className="space-y-4">
            {topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                    {index + 1}.
                  </span>
                  <span className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    {page.page}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {page.views.toLocaleString()} views
                  </span>
                  <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${page.percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Dashboard;