// src/main.jsx (Corregido)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css' // Asegúrate de que esta ruta sea correcta
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)