//no tocar nada de este archivo ya que es el punto de entrada de la aplicación
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// import Car from './Car.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Lenguaje jsx, es una extensión de JavaScript que permite escribir HTML en JavaScript.
  <React.StrictMode>
    {/* App es el componente principal de la aplicación; */}
    <App />
  </React.StrictMode>,
  //el strict mode es una herramienta para detectar problemas potenciales en una aplicación de React.
)
