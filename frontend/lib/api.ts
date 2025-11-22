import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // For Django session auth
});

// API response types
export interface Memory {
  id: string;
  title: string;
  caption: string;
  media_url: string;
  position_x: number;
  position_y: number;
  position_z: number;
  orbit_radius: number;
  is_secret: boolean;
  is_featured: boolean;
  category: 'romantic' | 'adventure' | 'milestone' | 'everyday';
  date: string;
  order: number;
}

export interface SiteSettings {
  id: number;
  camera_rotation_speed: number;
  particle_count: number;
  music_enabled: boolean;
  landing_message: string;
}

// API functions
export const memoriesApi = {
  getAll: () => api.get<Memory[]>('/api/memories/'),
  getById: (id: string) => api.get<Memory>(`/api/memories/${id}/`),
  create: (data: Partial<Memory>) => api.post<Memory>('/api/memories/', data),
  update: (id: string, data: Partial<Memory>) => api.patch<Memory>(`/api/memories/${id}/`, data),
  delete: (id: string) => api.delete(`/api/memories/${id}/`),
  upload: (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post<{media_url: string}>('/api/memories/upload/', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  revealSecret: () => api.post('/api/memories/secret_reveal/'),
};

export const authApi = {
  login: (username: string, password: string) =>
    api.post('/api/auth/login/', { username, password }),
  logout: () => api.post('/api/auth/logout/'),
};

export const settingsApi = {
  get: () => api.get<SiteSettings>('/api/settings/'),
  update: (data: Partial<SiteSettings>) => api.patch('/api/settings/', data),
};