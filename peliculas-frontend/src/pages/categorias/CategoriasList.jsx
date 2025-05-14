import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriaService } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ListaCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const respuesta = await categoriaService.getAll();
        setCategorias(respuesta.data);
        setCargando(false);
      } catch (err) {
        setError('Error al cargar las categorías.');
        setCargando(false);
        console.error(err);
      }
    };

    obtenerCategorias();
  }, []);

  const eliminarCategoria = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await categoriaService.delete(id);
        setCategorias(categorias.filter(cat => cat.id !== id));
      } catch (err) {
        setError('Error al eliminar la categoría.');
        console.error(err);
      }
    }
  };

  if (cargando) return <div>Cargando...</div>;
  if (error) return <div className="alerta-error">{error}</div>;

  return (
    <div className="contenedor-categorias">
      <div className="encabezado-categorias">
        <h2>Categorías</h2>
        <Link to="/categorias/nueva" className="boton-nueva-categoria">
          Nueva Categoría
        </Link>
      </div>

      <table className="tabla-categorias">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.length === 0 ? (
            <tr>
              <td colSpan="4" className="texto-centro">
                No hay categorías disponibles
              </td>
            </tr>
          ) : (
            categorias.map((categoria) => (
              <tr key={categoria.id}>
                <td>{categoria.id}</td>
                <td>{categoria.nombre}</td>
                <td>{new Date(categoria.fechaCreacion).toLocaleDateString()}</td>
                <td>
                  <Link to={`/categorias/${categoria.id}`} className="boton-editar">
                    <FaEdit /> Editar
                  </Link>
                  <button onClick={() => eliminarCategoria(categoria.id)} className="boton-eliminar">
                    <FaTrash /> Eliminar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListaCategorias;
