// src/services/api.jsx (Corregido)
import axios from 'axios';

// Crear una instancia de axios con un tiempo de espera y manejo de errores
const api = axios.create({
  baseURL: 'https://localhost:7220/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la solicitud API:', error);
    
    // Si el error es por tiempo de espera
    if (error.code === 'ECONNABORTED') {
      console.error('La solicitud tomó demasiado tiempo en responder');
    }
    
    // Si no hay respuesta del servidor
    if (!error.response) {
      console.error('No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.');
    }
    
    return Promise.reject(error);
  }
);

// Servicios para Categorías
export const categoriaService = {
  getAll: () => api.get('/Categorias').catch(handleApiError),

  getById: (id) => api.get(`/Categorias/${id}`).catch(handleApiError),

  create: (categoria) => api.post('/Categorias', categoria).catch(handleApiError),

  update: (id, categoria) => api.patch(`/Categorias/${id}`, categoria).catch(handleApiError),
  
  delete: (id) => api.delete(`/Categorias/${id}`).catch(handleApiError),
};

// Servicios para Películas
export const peliculaService = {
  getAll: () => api.get('/Peliculas').catch(handleApiError),

  getById: (id) => api.get(`/Peliculas/${id}`).catch(handleApiError),
  
  buscar: (nombre) => api.get(`/Peliculas/Buscar?nombre=${encodeURIComponent(nombre)}`).catch(handleApiError),
};

// Función auxiliar para manejar errores de API
function handleApiError(error) {
  // Para depuración
  console.error('Error específico de API:', error);
  
  // Si es un error de red, es probable que el backend no esté funcionando
  if (error.message === 'Network Error') {
    return Promise.reject({
      message: 'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.'
    });
  }
  
  // Si tenemos una respuesta del servidor con un mensaje de error
  if (error.response && error.response.data) {
    return Promise.reject({
      status: error.response.status,
      message: error.response.data.message || 'Error en el servidor',
      data: error.response.data
    });
  }
  
  // Cualquier otro tipo de error
  return Promise.reject({
    message: 'Error inesperado al comunicarse con el servidor'
  });
}

export default api;