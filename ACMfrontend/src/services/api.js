const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export async function fetchWithTimeout(resource, options = {}) {
  const { timeout = 15000, ...fetchOptions } = options;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(resource, {
      ...fetchOptions,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    if (error.name === 'AbortError') {
      const timeoutError = new Error(`Request timed out after ${timeout / 1000}s. The server at ${API_BASE_URL} may not be running.`);
      timeoutError.name = 'TimeoutError';
      throw timeoutError;
    }
    throw error;
  }
}

export const api = {
  async getEvents() {
    try {
      const token = this.getToken();
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      const res = await fetchWithTimeout(`${API_BASE_URL}/events`, { headers });
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) ? data : null;
    } catch {
      return null;
    }
  },

  async getBlogs() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/blogs`);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) ? data : null;
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

  async getSigs() {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/sigs`);
      if (!res.ok) return null;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0 ? data : null;
    } catch {
      return null;
    }
  },

  async getSig(id) {
    try {
      const res = await fetchWithTimeout(`${API_BASE_URL}/sigs/${id}`);
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async login(email, password) {
    try {
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
    } catch (err) {
      if (err.name === 'TimeoutError' || err.name === 'AbortError') {
        throw new Error('Connection timed out (15s). Backend server may not be running on http://localhost:3000.', { cause: err });
      }
      if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
        throw new Error('Could not connect to backend server. Ensure it is running on http://localhost:3000.', { cause: err });
      }
      throw err;
    }
  },

  getToken() {
    return localStorage.getItem('acm_token') || null;
  },

  async createBlog(blogData) {
    const token = this.getToken();
    const res = await fetchWithTimeout(`${API_BASE_URL}/blogs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(blogData)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const errorMsg = Array.isArray(data.errors)
        ? data.errors.join(', ')
        : (data.errors || data.error || 'Failed to create blog post');
      throw new Error(errorMsg);
    }
    return data;
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
  },

  async changePassword({ currentPassword, newPassword, passwordConfirmation }) {
    const token = this.getToken();
    if (!token) throw new Error('You must be logged in to change your password.');

    const res = await fetchWithTimeout(`${API_BASE_URL}/auth/change_password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        current_password: currentPassword,
        new_password: newPassword,
        password_confirmation: passwordConfirmation
      })
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      const errorMsg = Array.isArray(data.errors)
        ? data.errors.join(', ')
        : (data.error || data.errors || 'Failed to update password');
      throw new Error(errorMsg);
    }
    return data;
  }
};
