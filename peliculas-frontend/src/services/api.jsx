import axios from 'axios';

// Crear una instancia de axios con configuración básica
const api = axios.create({
  baseURL: 'https://localhost:7220/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de espera
});

// Interceptor global para manejar errores de la API
api.interceptors.response.use(
  respuesta => respuesta,
  error => {
    console.error('Error en la solicitud a la API:', error);

    if (error.code === 'ECONNABORTED') {
      console.error('La solicitud tardó demasiado en responder');
    }

    if (!error.response) {
      console.error('No se pudo conectar con el servidor. Verifique que el backend esté en funcionamiento.');
    }

    return Promise.reject(error);
  }
);

// Servicios para Categorías
export const servicioCategorias = {
  obtenerTodas: () => api.get('/Categorias').catch(manejarErrorApi),

  obtenerPorId: (id) => api.get(`/Categorias/${id}`).catch(manejarErrorApi),

  crear: (categoria) => api.post('/Categorias', categoria).catch(manejarErrorApi),

  actualizar: (id, categoria) => api.patch(`/Categorias/${id}`, categoria).catch(manejarErrorApi),

  eliminar: (id) => api.delete(`/Categorias/${id}`).catch(manejarErrorApi),
};

// Servicios para Películas
export const servicioPeliculas = {
  obtenerTodas: () => api.get('/Peliculas').catch(manejarErrorApi),

  obtenerPorId: (id) => api.get(`/Peliculas/${id}`).catch(manejarErrorApi),

  buscarPorNombre: (nombre) => api.get(`/Peliculas/Buscar?nombre=${encodeURIComponent(nombre)}`).catch(manejarErrorApi),
};

// Función auxiliar para manejar errores de la API
function manejarErrorApi(error) {
  console.error('Error específico de la API:', error);

  if (error.message === 'Network Error') {
    return Promise.reject({
      mensaje: 'No se pudo conectar con el servidor. Verifique que el backend esté en funcionamiento.',
    });
  }

  if (error.response && error.response.data) {
    return Promise.reject({
      estado: error.response.status,
      mensaje: error.response.data.message || 'Error en el servidor',
      datos: error.response.data,
    });
  }

  return Promise.reject({
    mensaje: 'Error inesperado al comunicarse con el servidor',
  });
}

export default api;
