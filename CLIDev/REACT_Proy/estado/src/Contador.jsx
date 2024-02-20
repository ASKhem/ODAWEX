import { useState } from 'react'//useState es un hook que nos permite tener estado en componentes funcionales

function Contador() {
  const [contador, setContador] = useState(0);
  //un estado es una variable que puede cambiar su valor a lo largo del tiempo

  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>Incrementar</button>
    </div>
  );
}

export default Contador;