import React, { useEffect, useMemo, useState, useDeferredValue } from 'react';
import { Filter, ExternalLink, Github, Search } from 'lucide-react';
import { useThemeStore } from '../stores/themeStore';
import { projectsService } from '../lib/supabase';
import type { Project } from '../types';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import LoadingSpinner from '../components/UI/LoadingSpinner';
// ImageWithFallback removed — restored original <img> usage below

const Projects: React.FC = () => {
  const { isDark } = useThemeStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredQuery = useDeferredValue(searchQuery);

  const categories = [
    { id: 'all', name: 'All Projects' },
    { id: 'network', name: 'Network & Mobile' },
    { id: 'web', name: 'Web Development' },
    { id: 'ai', name: 'AI Engineering' },
  ];

  useEffect(() => {
    const loadProjects = async () => {
      // Instant render from cache if available
      setIsFetching(true);
      try {
        const cached = sessionStorage.getItem('projects_cache_v1');
        if (cached) {
          const parsed = JSON.parse(cached) as Project[];
          setProjects(parsed);
        }
        // If no cache, show demo data immediately so content appears fast
        if (!cached) {
          const demoProjects: Project[] = [
            {
              id: '1',
              title: 'Network Infrastructure Optimization',
              description: 'Comprehensive network redesign for a large enterprise, improving performance by 40% and reducing latency by 60%.',
              tech_stack: ['Cisco', 'MPLS', 'BGP', 'OSPF', 'SD-WAN'],
              image_url: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg',
              demo_url: null,
              repo_url: null,
              category: 'network',
              created_at: '2024-01-15',
              updated_at: '2024-01-15'
            },
            {
              id: '2',
              title: 'AI-Powered Analytics Dashboard',
              description: 'Machine learning dashboard providing real-time insights and predictive analytics for business intelligence.',
              tech_stack: ['Python', 'TensorFlow', 'React', 'D3.js', 'PostgreSQL'],
              image_url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
              demo_url: 'https://demo.example.com',
              repo_url: 'https://github.com/example',
              category: 'ai',
              created_at: '2024-02-10',
              updated_at: '2024-02-10'
            },
            {
              id: '3',
              title: 'E-Commerce Platform',
              description: 'Full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
              tech_stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
              image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
              demo_url: 'https://demo.example.com',
              repo_url: 'https://github.com/example',
              category: 'web',
              created_at: '2024-03-05',
              updated_at: '2024-03-05'
            }
          ];
          setProjects(demoProjects);
        }
      } catch {}

      try {
        // Add a soft timeout so UI never feels blocked
        const withTimeout = <T,>(p: Promise<T>, ms: number) => new Promise<T>((resolve, reject) => {
          const t = setTimeout(() => reject(new Error('timeout')), ms);
          p.then((v) => { clearTimeout(t); resolve(v); }).catch((e) => { clearTimeout(t); reject(e); });
        });

        const data = await withTimeout(projectsService.getAll(), 800);
        setProjects(data || []);
        try { sessionStorage.setItem('projects_cache_v1', JSON.stringify(data || [])); } catch {}
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback demo data
        const demoProjects: Project[] = [
          {
            id: '1',
            title: 'Network Infrastructure Optimization',
            description: 'Comprehensive network redesign for a large enterprise, improving performance by 40% and reducing latency by 60%.',
            tech_stack: ['Cisco', 'MPLS', 'BGP', 'OSPF', 'SD-WAN'],
            image_url: 'https://images.pexels.com/photos/2881232/pexels-photo-2881232.jpeg',
            demo_url: null,
            repo_url: null,
            category: 'network',
            created_at: '2024-01-15',
            updated_at: '2024-01-15'
          },
          {
            id: '2',
            title: 'AI-Powered Analytics Dashboard',
            description: 'Machine learning dashboard providing real-time insights and predictive analytics for business intelligence.',
            tech_stack: ['Python', 'TensorFlow', 'React', 'D3.js', 'PostgreSQL'],
            image_url: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
            demo_url: 'https://demo.example.com',
            repo_url: 'https://github.com/example',
            category: 'ai',
            created_at: '2024-02-10',
            updated_at: '2024-02-10'
          },
          {
            id: '3',
            title: 'E-Commerce Platform',
            description: 'Full-stack e-commerce solution with modern UI, payment integration, and admin dashboard.',
            tech_stack: ['React', 'Node.js', 'MongoDB', 'Stripe', 'AWS'],
            image_url: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
            demo_url: 'https://demo.example.com',
            repo_url: 'https://github.com/example',
            category: 'web',
            created_at: '2024-03-05',
            updated_at: '2024-03-05'
          },
          {
            id: '4',
            title: 'Mobile Network Monitoring System',
            description: 'Real-time monitoring system for mobile network infrastructure with automated alerting.',
            tech_stack: ['Java', 'Spring Boot', 'Kafka', 'Elasticsearch', 'React'],
            image_url: 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg',
            demo_url: null,
            repo_url: null,
            category: 'network',
            created_at: '2024-01-20',
            updated_at: '2024-01-20'
          },
          {
            id: '5',
            title: 'Natural Language Processing API',
            description: 'RESTful API for text analysis, sentiment analysis, and entity recognition using transformer models.',
            tech_stack: ['Python', 'FastAPI', 'Transformers', 'Docker', 'Redis'],
            image_url: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg',
            demo_url: 'https://api.example.com',
            repo_url: 'https://github.com/example',
            category: 'ai',
            created_at: '2024-02-25',
            updated_at: '2024-02-25'
          },
          {
            id: '6',
            title: 'Portfolio Management System',
            description: 'Comprehensive web application for investment portfolio tracking and analysis.',
            tech_stack: ['Vue.js', 'Laravel', 'MySQL', 'Chart.js', 'Tailwind CSS'],
            image_url: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg',
            demo_url: 'https://portfolio.example.com',
            repo_url: 'https://github.com/example',
            category: 'web',
            created_at: '2024-03-15',
            updated_at: '2024-03-15'
          }
        ];
        setProjects(demoProjects);
      } finally {
        setIsFetching(false);
      }
    };

    loadProjects();
  }, []);

  const computedFiltered = useMemo(() => {
    let filtered = projects;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (deferredQuery) {
      const q = deferredQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech_stack.some(t => t.toLowerCase().includes(q))
      );
    }
    return filtered;
  }, [projects, selectedCategory, deferredQuery]);

  useEffect(() => {
    setFilteredProjects(computedFiltered);
  }, [computedFiltered]);

  return (
    <div className={`min-h-screen pt-24 pb-12 transition-colors duration-300 ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            My Projects
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? 'text-gray-300' : 'text-gray-600'
          }`}>
            A showcase of my work across network infrastructure, web development, and AI engineering
          </p>
        </div>

        {/* Filters and Search */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
              isDark ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2">
            <Filter className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-500'}`} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className={`px-4 py-2 rounded-lg border transition-colors duration-200 ${
                isDark 
                  ? 'bg-gray-800 border-gray-700 text-white focus:border-blue-500' 
                  : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Projects Grid (no AnimatePresence to reduce overhead) */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ contain: 'content' }}>
            {filteredProjects.map((project) => (
              <div key={project.id} style={{ contentVisibility: 'auto' }}>
                <Card transparent className="overflow-hidden h-full flex flex-col">
                  {project.image_url && (
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden">
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-xl"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        width={1280}
                        height={720}
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-3 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm mb-4 ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 text-xs rounded-md ${
                              isDark
                                ? 'bg-gray-700/30 text-gray-300'
                                : 'bg-white/10 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {project.demo_url && (
                        <a href={project.demo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="primary" size="sm" className="w-full flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 mr-1" />
                            Demo
                          </Button>
                        </a>
                      )}
                      {project.repo_url && (
                        <a href={project.repo_url} target="_blank" rel="noopener noreferrer" className="flex-1">
                          <Button variant="outline" size="sm" className="w-full flex items-center justify-center">
                            <Github className="w-4 h-4 mr-1" />
                            GitHub
                          </Button>
                        </a>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-800 rounded-xl mb-4" />
                <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;