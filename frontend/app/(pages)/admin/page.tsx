'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Memory, memoriesApi } from '@/lib/api';
import { NavigationSidebar } from '@/components/layout/NavigationSidebar';

export default function AdminPage() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [editingMemory, setEditingMemory] = useState<Memory | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    caption: '',
    category: 'romantic' as const,
    date: '',
    is_featured: false,
    is_secret: false,
    position_x: 0,
    position_y: 0,
    position_z: 0,
    orbit_radius: 5,
    order: 0,
    media_url: '',
  });

  useEffect(() => {
    // Check if user is logged in (simplified - in production use proper auth)
    const checkAuth = () => {
      const loggedIn = localStorage.getItem('admin_logged_in') === 'true';
      setIsLoggedIn(loggedIn);
      if (loggedIn) {
        loadMemories();
      } else {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const loadMemories = async () => {
    try {
      const response = await memoriesApi.getAll();
      setMemories(response.data);
    } catch (error) {
      console.error('Failed to load memories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    try {
      // In a real app, this would call authApi.login()
      // For demo purposes, we'll use a simple check
      if (username === 'admin' && password === 'password') {
        localStorage.setItem('admin_logged_in', 'true');
        setIsLoggedIn(true);
        await loadMemories();
      } else {
        setLoginError('Invalid credentials');
      }
    } catch (error) {
      setLoginError('Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMemory) {
        await memoriesApi.update(editingMemory.id, formData);
      } else {
        await memoriesApi.create(formData);
      }

      // Reset form and reload memories
      setFormData({
        title: '',
        caption: '',
        category: 'romantic',
        date: '',
        is_featured: false,
        is_secret: false,
        position_x: 0,
        position_y: 0,
        position_z: 0,
        orbit_radius: 5,
        order: 0,
        media_url: '',
      });
      setEditingMemory(null);
      await loadMemories();
    } catch (error) {
      console.error('Failed to save memory:', error);
    }
  };

  const handleEdit = (memory: Memory) => {
    setEditingMemory(memory);
    setFormData({
      title: memory.title,
      caption: memory.caption,
      category: memory.category,
      date: memory.date,
      is_featured: memory.is_featured,
      is_secret: memory.is_secret,
      position_x: memory.position_x,
      position_y: memory.position_y,
      position_z: memory.position_z,
      orbit_radius: memory.orbit_radius,
      order: memory.order,
      media_url: memory.media_url || '',
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this memory?')) {
      try {
        await memoriesApi.delete(id);
        await loadMemories();
      } catch (error) {
        console.error('Failed to delete memory:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <motion.div
          className="glass rounded-2xl p-8 max-w-md w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-poppins font-bold text-white mb-6 text-center">
            Admin Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Enter username"
                required
              />
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                placeholder="Enter password"
                required
              />
            </div>

            {loginError && (
              <div className="bg-red-500/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg text-sm">
                {loginError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-accent-primary text-white py-3 rounded-lg font-medium hover:bg-accent-primary/80 transition-colors"
            >
              Login
            </button>
          </form>

          <div className="mt-6 text-center text-white/60 text-sm">
            Demo: username "admin", password "password"
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <NavigationSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage="admin"
      />

      <div className="pt-24 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-poppins font-bold text-white">
              Admin Dashboard
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Memory Form */}
            <div className="lg:col-span-1">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-poppins font-semibold text-white mb-6">
                  {editingMemory ? 'Edit Memory' : 'Add Memory'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1">
                      Caption
                    </label>
                    <textarea
                      value={formData.caption}
                      onChange={(e) => setFormData({...formData, caption: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary h-24"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1">
                      Media URL
                    </label>
                    <input
                      type="url"
                      value={formData.media_url}
                      onChange={(e) => setFormData({...formData, media_url: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                    >
                      <option value="romantic">💕 Romantic</option>
                      <option value="adventure">🌟 Adventure</option>
                      <option value="milestone">🎯 Milestone</option>
                      <option value="everyday">☀️ Everyday</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/80 text-sm font-medium mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-1">
                        X
                      </label>
                      <input
                        type="number"
                        value={formData.position_x}
                        onChange={(e) => setFormData({...formData, position_x: parseFloat(e.target.value)})}
                        className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-1">
                        Y
                      </label>
                      <input
                        type="number"
                        value={formData.position_y}
                        onChange={(e) => setFormData({...formData, position_y: parseFloat(e.target.value)})}
                        className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <label className="block text-white/80 text-sm font-medium mb-1">
                        Z
                      </label>
                      <input
                        type="number"
                        value={formData.position_z}
                        onChange={(e) => setFormData({...formData, position_z: parseFloat(e.target.value)})}
                        className="w-full px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                        step="0.1"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <label className="flex items-center text-white/80">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({...formData, is_featured: e.target.checked})}
                        className="mr-2"
                      />
                      Featured
                    </label>
                    <label className="flex items-center text-white/80">
                      <input
                        type="checkbox"
                        checked={formData.is_secret}
                        onChange={(e) => setFormData({...formData, is_secret: e.target.checked})}
                        className="mr-2"
                      />
                      Secret
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex-1 bg-accent-primary text-white py-2 rounded-lg font-medium hover:bg-accent-primary/80 transition-colors"
                    >
                      {editingMemory ? 'Update' : 'Create'}
                    </button>
                    {editingMemory && (
                      <button
                        type="button"
                        onClick={() => {
                          setEditingMemory(null);
                          setFormData({
                            title: '',
                            caption: '',
                            category: 'romantic',
                            date: '',
                            is_featured: false,
                            is_secret: false,
                            position_x: 0,
                            position_y: 0,
                            position_z: 0,
                            orbit_radius: 5,
                            order: 0,
                            media_url: '',
                          });
                        }}
                        className="px-4 py-2 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </motion.div>
            </div>

            {/* Memories List */}
            <div className="lg:col-span-2">
              <motion.div
                className="glass rounded-xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-2xl font-poppins font-semibold text-white mb-6">
                  Memories ({memories.length})
                </h2>

                <div className="space-y-4">
                  {memories.map((memory, index) => (
                    <motion.div
                      key={memory.id}
                      className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-poppins font-semibold text-white">
                              {memory.title}
                            </h3>
                            {memory.is_featured && <span className="text-yellow-400">⭐</span>}
                            {memory.is_secret && <span className="text-pink-400">💖</span>}
                            <span className="px-2 py-1 bg-accent-primary/20 text-accent-primary text-xs rounded-full">
                              {memory.category}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mb-2 line-clamp-2">
                            {memory.caption}
                          </p>
                          <div className="text-xs text-white/50">
                            📅 {new Date(memory.date).toLocaleDateString()} •
                            Position: ({memory.position_x.toFixed(1)}, {memory.position_y.toFixed(1)}, {memory.position_z.toFixed(1)})
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleEdit(memory)}
                            className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(memory.id)}
                            className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {memories.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📸</div>
                    <h3 className="text-xl font-poppins text-white mb-2">No memories yet</h3>
                    <p className="text-white/70">Add your first memory to get started</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}