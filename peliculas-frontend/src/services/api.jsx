import axios from 'axios';


const api = axios.create({
  baseURL: 'https://localhost:7220/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Servicios para Categorías
export const categoriaService = {
  getAll: () => api.get('/Categorias'),
  getById: (id) => api.get(`/Categorias/${id}`),
  create: (categoria) => api.post('/Categorias', categoria),
  update: (id, categoria) => api.patch(`/Categorias/${id}`, categoria),
  delete: (id) => api.delete(`/Categorias/${id}`),
};

export default api;