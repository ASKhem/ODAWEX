import {useState} from 'react';
function Form1() {
    //esta inicializacion solo se producirá la primera vez que se renderice el componente
    const [name, setName] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`The name you entered was: ${name}`)
    }

    return (
      <form onSubmit = {handleSubmit}>
        <label>Enter your name:
          <input
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </form>
    )
  }

export default Form1;