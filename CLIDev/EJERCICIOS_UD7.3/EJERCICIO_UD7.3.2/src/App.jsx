// import Paginacion from './Paginacion'
import TablaPilotos from './TablaPilotos';
import Controllers from './Controllers';
import './App.css'

function App() {
  return (
    <>
      <div id="titulo"><h1>FORMULA 1</h1><img src={"https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/F1.svg/800px-F1.svg.png"}/></div>
      <Controllers />
      <TablaPilotos />
    </>
  )
}

export default App;
