import { useState } from 'react';
import PeliculaModal from './PeliculaModal';
import '../../styles/peliculas.css';

const TarjetaPelicula = ({ pelicula }) => {
  const [mostrarModal, setMostrarModal] = useState(false);

  // Validación de la estructura del objeto pelicula
  if (!pelicula) {
    console.error('Objeto película no definido');
    return (
      <div className="card h-100 shadow-sm">
        <div className="card-body">
          <h5 className="card-title">Error de carga</h5>
          <p className="text-muted">No se pudo cargar la información de la película</p>
        </div>
      </div>
    );
  }

  const manejarClicImagen = () => {
    setMostrarModal(true);
  };

  // Función para obtener el año de forma segura
  const obtenerAnio = () => {
    try {
      if (pelicula.fechaEstreno) {
        return new Date(pelicula.fechaEstreno).getFullYear();
      }
      return 'Sin fecha';
    } catch (error) {
      console.error('Error al procesar la fecha:', error);
      return 'Sin fecha';
    }
  };

  return (
    <>
      <div className="card h-100 shadow-sm">
        <div 
          className="image-container position-relative" 
          onClick={manejarClicImagen}
          style={{ cursor: 'pointer' }}
        >
          {pelicula.rutaImagen ? (
            <img 
              src={pelicula.rutaImagen} 
              className="card-img-top" 
              alt={pelicula.nombre || 'Película'}
              onError={(e) => {
                console.error('Error al cargar la imagen');
                e.target.onerror = null; 
                e.target.src = 'https://via.placeholder.com/300x450?text=Sin+imagen';
              }}
            />
          ) : (
            <div 
              className="bg-light d-flex justify-content-center align-items-center"
              style={{ height: '300px' }}
            >
              <span className="text-muted">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{pelicula.nombre || 'Sin título'}</h5>
          <div className="d-flex justify-content-between">
            <span className="text-muted">
              {obtenerAnio()}
            </span>
            <span className="badge bg-secondary">
              {(pelicula.duracion || '?')} min
            </span>
          </div>
        </div>
      </div>

      {mostrarModal && (
        <PeliculaModal
          pelicula={pelicula}
          onClose={() => setMostrarModal(false)}
        />
      )}
    </>
  );
};

export default TarjetaPelicula;
