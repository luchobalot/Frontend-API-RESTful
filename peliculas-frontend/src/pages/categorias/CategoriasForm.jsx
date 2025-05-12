import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { categoriaService } from '../../services/api';

const CategoriasForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [loading, setLoading] = useState(id ? true : false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchCategoria = async () => {
        try {
          const response = await categoriaService.getById(id);
          setCategoria(response.data);
          setLoading(false);
        } catch (err) {
          setError('Error al cargar la categoría');
          setLoading(false);
          console.error(err);
        }
      };

      fetchCategoria();
    }
  }, [id]);

  const initialValues = {
    nombre: categoria?.nombre || '',
  };

  const validationSchema = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .max(100, 'El nombre no puede tener más de 100 caracteres'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (id) {
        await categoriaService.update(id, { ...values, id: parseInt(id) });
      } else {
        await categoriaService.create(values);
      }
      navigate('/categorias');
    } catch (err) {
      setError('Error al guardar la categoría');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <h2>{id ? 'Editar' : 'Nueva'} Categoría</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="mb-3">
              <label htmlFor="nombre" className="form-label">
                Nombre
              </label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="text-danger"
              />
            </div>

            <div className="d-flex gap-2">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/categorias')}
              >
                Cancelar
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CategoriasForm;