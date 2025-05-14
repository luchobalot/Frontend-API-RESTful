import { Link } from 'react-router-dom';

const NoEncontrado = () => {
  return (
    <div className="pagina-no-encontrada">
      <h1 className="codigo-error">404</h1>
      <h2 className="mensaje-error">Página no encontrada</h2>
      <p className="descripcion-error">
        La página que estás buscando no existe.
      </p>
      <Link to="/" className="boton-volver">
        Volver al inicio
      </Link>
    </div>
  );
};

export default NoEncontrado;
