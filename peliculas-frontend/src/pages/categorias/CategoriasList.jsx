import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriaService } from '../../services/api';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CategoriasList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.getAll();
        setCategorias(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar las categorías.');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
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

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Categorías</h2>
        <Link to="/categorias/new" className="btn btn-primary">
          Nueva Categoría
        </Link>
      </div>

      <table className="table table-striped">
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
              <td colSpan="4" className="text-center">
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
                  <Link
                    to={`/categorias/${categoria.id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    <FaEdit /> Editar
                  </Link>
                  <button
                    onClick={() => handleDelete(categoria.id)}
                    className="btn btn-sm btn-danger"
                  >
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

export default CategoriasList;