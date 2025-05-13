// src/pages/peliculas/PeliculasList.jsx (Corregido)
import { useState, useEffect } from 'react';
import { peliculaService } from '../../services/api';
import PeliculasCard from "../../components/peliculas/PeliculasCard";
import '../../styles/peliculas.css';

const PeliculasList = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        setLoading(true);
        const response = await peliculaService.getAll();
        
        // Verificar si response.data existe y es un array
        if (response && response.data && Array.isArray(response.data)) {
          console.log('Películas recibidas:', response.data); // Para depuración
          setPeliculas(response.data);
          setError(null);
        } else {
          console.error('Formato de respuesta incorrecto:', response);
          setError('El formato de respuesta de la API no es válido');
        }
      } catch (err) {
        console.error('Error al cargar películas:', err);
        setError('No se pudieron cargar las películas. Por favor, intenta más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchPeliculas();
  }, []);

  const handleBuscar = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      let response;
      
      if (!busqueda.trim()) {
        // Si la búsqueda está vacía, cargar todas las películas
        response = await peliculaService.getAll();
      } else {
        response = await peliculaService.buscar(busqueda);
      }
      
      // Verificar si response.data existe y es un array
      if (response && response.data && Array.isArray(response.data)) {
        console.log('Películas encontradas:', response.data); // Para depuración
        setPeliculas(response.data);
        setError(null);
      } else {
        console.error('Formato de respuesta incorrecto:', response);
        setError('El formato de respuesta de la API no es válido');
      }
    } catch (err) {
      console.error('Error al buscar películas:', err);
      setError('Error al buscar películas');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-container text-center my-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-2">Cargando películas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="peliculas-container my-4">
      <h2 className="peliculas-title mb-4">Películas</h2>

      {/* Buscador */}
      <form onSubmit={handleBuscar} className="search-form mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar películas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Buscar
          </button>
        </div>
      </form>

      {peliculas.length === 0 ? (
        <div className="alert alert-info">
          No se encontraron películas. 
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {peliculas.map((pelicula) => (
            <div className="col" key={pelicula.id || index}>
              <PeliculasCard pelicula={pelicula} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PeliculasList;