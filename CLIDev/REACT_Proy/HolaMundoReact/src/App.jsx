//importamos los componentes que necesitamos
import './App.css'
import Garage from './Garage.jsx'
//App es el componente principal de la aplicación;
function App() {
  const marcas = ['Ford', 'BMW', 'Audi'];
  return (
    <>
      <Garage coches={marcas} />
    </>
  );
}

//exportamos el componente
export default App
