import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { categoriaService } from '../../services/api';

const FormularioCategorias = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const [categoria, setCategoria] = useState(null);
  const [cargando, setCargando] = useState(!!id);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const obtenerCategoria = async () => {
        try {
          const respuesta = await categoriaService.getById(id);
          setCategoria(respuesta.data);
          setCargando(false);
        } catch (err) {
          setError('Error al cargar la categoría');
          setCargando(false);
          console.error(err);
        }
      };

      obtenerCategoria();
    }
  }, [id]);

  const valoresIniciales = {
    nombre: categoria?.nombre || '',
  };

  const esquemaValidacion = Yup.object({
    nombre: Yup.string()
      .required('El nombre es obligatorio')
      .max(100, 'El nombre no puede tener más de 100 caracteres'),
  });

  const enviarFormulario = async (valores, { setSubmitting }) => {
    try {
      if (id) {
        await categoriaService.update(id, { ...valores, id: parseInt(id) });
      } else {
        await categoriaService.create(valores);
      }
      navegar('/categorias');
    } catch (err) {
      setError('Error al guardar la categoría');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (cargando) return <div>Cargando...</div>;

  return (
    <div className="contenedor-formulario">
      <h2>{id ? 'Editar' : 'Nueva'} Categoría</h2>
      {error && <div className="alerta-error">{error}</div>}

      <Formik
        initialValues={valoresIniciales}
        validationSchema={esquemaValidacion}
        onSubmit={enviarFormulario}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form className="formulario-categoria">
            <div className="grupo-formulario">
              <label htmlFor="nombre" className="etiqueta-formulario">
                Nombre
              </label>
              <Field
                type="text"
                id="nombre"
                name="nombre"
                className="campo-texto"
              />
              <ErrorMessage
                name="nombre"
                component="div"
                className="mensaje-error"
              />
            </div>

            <div className="acciones-formulario">
              <button
                type="submit"
                className="boton-primario"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Guardar'}
              </button>
              <button
                type="button"
                className="boton-secundario"
                onClick={() => navegar('/categorias')}
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

export default FormularioCategorias;
