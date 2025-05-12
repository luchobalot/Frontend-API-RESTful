import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoriasList from './pages/categorias/CategoriasList';
import CategoriasForm from './pages/categorias/CategoriasForm';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
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