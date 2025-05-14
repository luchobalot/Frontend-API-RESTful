import { useState, useEffect } from 'react';
import { peliculaService } from '../../services/api';
import PeliculasCard from "../../components/peliculas/PeliculasCard";
import '../../styles/peliculas.css';

const ListaPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const obtenerPeliculas = async () => {
      try {
        setCargando(true);
        const respuesta = await peliculaService.getAll();
        
        if (respuesta && respuesta.data && Array.isArray(respuesta.data)) {
          console.log('Películas recibidas:', respuesta.data);
          setPeliculas(respuesta.data);
          setError(null);
        } else {
          console.error('Formato de respuesta incorrecto:', respuesta);
          setError('El formato de respuesta de la API no es válido');
        }
      } catch (err) {
        console.error('Error al cargar películas:', err);
        setError('No se pudieron cargar las películas. Por favor, intenta más tarde.');
      } finally {
        setCargando(false);
      }
    };

    obtenerPeliculas();
  }, []);

  const buscarPeliculas = async (e) => {
    e.preventDefault();
    
    try {
      setCargando(true);
      let respuesta;
      
      if (!busqueda.trim()) {
        respuesta = await peliculaService.getAll();
      } else {
        respuesta = await peliculaService.buscar(busqueda);
      }
      
      if (respuesta && respuesta.data && Array.isArray(respuesta.data)) {
        console.log('Películas encontradas:', respuesta.data);
        setPeliculas(respuesta.data);
        setError(null);
      } else {
        console.error('Formato de respuesta incorrecto:', respuesta);
        setError('El formato de respuesta de la API no es válido');
      }
    } catch (err) {
      console.error('Error al buscar películas:', err);
      setError('Error al buscar películas');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="contenedor-cargando">
        <div className="animacion-cargando"></div>
        <p className="texto-cargando">Cargando películas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alerta-error">
        {error}
      </div>
    );
  }

  return (
    <div className="contenedor-peliculas">
      <h2 className="titulo-peliculas">Películas</h2>

      <form onSubmit={buscarPeliculas} className="formulario-busqueda">
        <div className="grupo-busqueda">
          <input
            type="text"
            className="campo-busqueda"
            placeholder="Buscar películas..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button className="boton-buscar" type="submit">
            Buscar
          </button>
        </div>
      </form>

      {peliculas.length === 0 ? (
        <div className="alerta-info">
          No se encontraron películas.
        </div>
      ) : (
        <div className="grid-peliculas">
          {peliculas.map((pelicula) => (
            <div className="tarjeta-pelicula" key={pelicula.id}>
              <PeliculasCard pelicula={pelicula} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListaPeliculas;
