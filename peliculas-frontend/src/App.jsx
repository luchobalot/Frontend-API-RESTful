// src/App.jsx (Con importaciones de estilos)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.css';
import './styles/navbar.css';
import './styles/home.css';
import './styles/modal.css';
import './styles/peliculas.css'; // Importación global de los estilos de películas
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoriasList from './pages/categorias/CategoriasList';
import CategoriasForm from './pages/categorias/CategoriasForm';
import PeliculasList from './pages/peliculas/PeliculasList';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peliculas" element={<PeliculasList />} />
          <Route path="/categorias" element={<CategoriasList />} />
          <Route path="/categorias/new" element={<CategoriasForm />} />
          <Route path="/categorias/:id" element={<CategoriasForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;