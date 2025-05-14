import ReactDOM from 'react-dom';
import '../../styles/modal.css';

const clasificaciones = {
  0: 'Siete',
  1: 'Trece',
  2: 'Dieciséis',
  3: 'Dieciocho'
};

const PeliculaModal = ({ pelicula, onClose }) => {
  // Validación de la estructura del objeto pelicula
  if (!pelicula) {
    console.error('Objeto película no definido para el modal');
    return null;
  }
  
  // Función para formatear fecha de forma segura
  const formatearFecha = (fechaCadena) => {
    try {
      if (!fechaCadena) return 'No disponible';
      return new Date(fechaCadena).toLocaleDateString();
    } catch (error) {
      console.error('Error al formatear fecha:', error);
      return 'Fecha inválida';
    }
  };

  return ReactDOM.createPortal(
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{pelicula.nombre || 'Sin título'}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Cerrar"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-4">
                {pelicula.rutaImagen ? (
                  <img
                    src={pelicula.rutaImagen}
                    className="img-fluid rounded"
                    alt={pelicula.nombre || 'Película'}
                    onError={(e) => {
                      console.error('Error al cargar la imagen en el modal');
                      e.target.onerror = null; 
                      e.target.src = 'https://via.placeholder.com/300x450?text=Sin+imagen';
                    }}
                  />
                ) : (
                  <div
                    className="bg-light d-flex justify-content-center align-items-center rounded"
                    style={{ height: '300px' }}
                  >
                    <span className="text-muted">Sin imagen</span>
                  </div>
                )}
              </div>
              <div className="col-md-8">
                <h4>Detalles</h4>
                <p className="text-justify mb-4">{pelicula.descripcion || 'Sin descripción disponible.'}</p>
                
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Año de estreno:</strong>
                  </div>
                  <div className="col-6">
                    {formatearFecha(pelicula.fechaEstreno)}
                  </div>
                </div>
                
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Duración:</strong>
                  </div>
                  <div className="col-6">
                    {pelicula.duracion ? `${pelicula.duracion} minutos` : 'No especificada'}
                  </div>
                </div>
                
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Clasificación:</strong>
                  </div>
                  <div className="col-6">
                    <span className={`badge ${obtenerColorInsigniaClasificacion(pelicula.clasificacion)}`}>
                      {obtenerClasificacion(pelicula.clasificacion)}
                    </span>
                  </div>
                </div>
                
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Categoría:</strong>
                  </div>
                  <div className="col-6">
                    {pelicula.categoria?.nombre || 'No especificada'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>,
    document.body
  );
};

// Función para determinar el color de la insignia según la clasificación
const obtenerColorInsigniaClasificacion = (clasificacion) => {
  switch(clasificacion) {
    case 0: return 'bg-success'; // Siete - Verde
    case 1: return 'bg-info';    // Trece - Azul
    case 2: return 'bg-warning'; // Dieciséis - Amarillo
    case 3: return 'bg-danger';  // Dieciocho - Rojo
    default: return 'bg-secondary';
  }
};

// Función para obtener la clasificación de forma segura
const obtenerClasificacion = (clasificacionId) => {
  return clasificaciones[clasificacionId] || 'No especificada';
};

export default PeliculaModal;
