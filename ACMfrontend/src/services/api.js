const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 4000 } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

export const api = {
  async getEvents() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/events`);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : null;
    } catch {
      return null;
    }
  },

  async getBlogs() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/blogs`);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : null;
    } catch {
      return null;
    }
  },

  async getProjects() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/projects`);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : null;
    } catch {
      return null;
    }
  },

  async getProjectProposals(sigId = null) {
    try {
      const url = sigId 
        ? `${API_BASE_URL}/project_proposals?sig_id=${sigId}` 
        : `${API_BASE_URL}/project_proposals`;
      const res = await fetchWithTimeout(url);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : null;
    } catch {
      return null;
    }
  },

  async getProjectProposal(id) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/project_proposals/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async login(email, password) {
    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.errors || errData.error || 'Invalid email or password');
    }
    return await res.json();
  },

  getCurrentUser() {
    try {
      const item = localStorage.getItem('acm_user');
      if (!item || item === 'undefined' || item === 'null') return null;
      const parsed = JSON.parse(item);
      return parsed && typeof parsed === 'object' ? parsed : null;
    } catch {
      return null;
    }
  },

  saveAuth(token, user) {
    try {
      localStorage.setItem('acm_token', token);
      localStorage.setItem('acm_user', JSON.stringify(user));
    } catch (e) {
      console.error('Failed to save auth to localStorage:', e);
    }
  },

  logout() {
    try {
      localStorage.removeItem('acm_token');
      localStorage.removeItem('acm_user');
    } catch (e) {
      console.error('Failed to clear auth:', e);
    }
  }
};
