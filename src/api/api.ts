import axios from 'axios';

//Axios is a JavaScript library used to make HTTP requests (like GET, POST, PUT, DELETE).
//It lets your frontend (React, Vue, etc.) talk to your backend (Node/Express API) or any external API.

// used
const API = axios.create({
  baseURL: 'https://backend-taskandexpenses-manager.onrender.com',
});

//API → axios instance (with baseURL http://localhost:5000/api)
// API.method('/endpoint',data ->info we sending ,{headers}->token for auth)

export const registerUser = (data: { name: string; email: string; password: string }) =>
  API.post('/auth/register', data);

export const loginUser = (data: { email: string; password: string }) =>
  API.post('/auth/login', data);

export const getCurrentUser = (token: string) =>
  API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token: string) =>
  API.get('/tasks', { headers: { Authorization: `Bearer ${token}` } });

export const addTask = (token: string, task: { title: string; description?: string }) =>
  API.post('/tasks', task, { headers: { Authorization: `Bearer ${token}` } });

export const updateTask = (token: string, id: string, data: any) =>
  API.put(`/tasks/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteTask = (token: string, id: string) =>
  API.delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } });

export const getExpenses = (token: string) =>
  API.get('/expenses', { headers: { Authorization: `Bearer ${token}` } });

export const addExpense = (token: string, expense: { title: string; amount: number; category: string }) =>
  API.post('/expenses', expense, { headers: { Authorization: `Bearer ${token}` } });

export const updateExpense = (token: string, id: string, data: any) =>
  API.put(`/expenses/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteExpense = (token: string, id: string) =>
  API.delete(`/expenses/${id}`, { headers: { Authorization: `Bearer ${token}` } });

