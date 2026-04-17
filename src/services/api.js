const BASE_URL = 'http://localhost:5000/api';

// ── Helper function for all requests ──
const request = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const options = { method, headers };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// ── AUTH ──
export const register = (name, email, password, profession) =>
  request('/auth/register', 'POST', { name, email, password, profession });

export const login = (email, password) =>
  request('/auth/login', 'POST', { email, password });

// ── QUESTS ──
export const getQuests = (token) =>
  request('/quests', 'GET', null, token);

export const createQuest = (quest, token) =>
  request('/quests', 'POST', quest, token);

export const updateQuest = (id, status, token) =>
  request(`/quests/${id}`, 'PATCH', { status }, token);

export const deleteQuest = (id, token) =>
  request(`/quests/${id}`, 'DELETE', null, token);