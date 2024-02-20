import { useState, useEffect } from 'react';
import Image from './Image';
// import pilotos from './pilotos.json';
const pilotos = [
    {
        "nombre": "Lewis Hamilton",
        "equipo": "Mercedes",
        "numero": 44,
        "nacionalidad": "Reino Unido"
    },
    {
        "nombre": "Max Verstappen",
        "equipo": "Red Bull Racing",
        "numero": 33,
        "nacionalidad": "Países Bajos"
    },
    {
        "nombre": "Charles Leclerc",
        "equipo": "Ferrari",
        "numero": 16,
        "nacionalidad": "Mónaco"
    },
    {
        "nombre": "Fernando Alonso",
        "equipo": "Aston Martin",
        "numero": 14,
        "nacionalidad": "España"
    },
    {
        "nombre": "Valtteri Bottas",
        "equipo": "Mercedes",
        "numero": 77,
        "nacionalidad": "Finlandia"
    },
    {
        "nombre": "Daniel Ricciardo",
        "equipo": "McLaren",
        "numero": 3,
        "nacionalidad": "Australia"
    },
    {
        "nombre": "Sergio Pérez",
        "equipo": "Red Bull Racing",
        "numero": 11,
        "nacionalidad": "México"
    },
    {
        "nombre": "Carlos Sainz",
        "equipo": "Ferrari",
        "numero": 55,
        "nacionalidad": "España"
    },
    {
        "nombre": "Lando Norris",
        "equipo": "McLaren",
        "numero": 4,
        "nacionalidad": "Reino Unido"
    },
    {
        "nombre": "Pierre Gasly",
        "equipo": "AlphaTauri",
        "numero": 10,
        "nacionalidad": "Francia"
    },
    {
        "nombre": "Esteban Ocon",
        "equipo": "Alpine",
        "numero": 31,
        "nacionalidad": "Francia"
    },
];
//cambiar a fetch la lectura del archivo json
function TablaPilotos() {
    const [pagina, setPagina] = useState(0);
    const [pilotosPagina, setPilotosPagina] = useState([]);

    useEffect(() => {
        const paginas = [];
        for (let i = 0; i < pilotos.length; i++) {
            if (i % 3 === 0) {
                paginas.push([]);
            }
            paginas[paginas.length - 1].push(pilotos[i]);
        }
        setPilotosPagina(paginas);
    }, []);

    const cambiarPagina = () => {
        if (pagina < pilotosPagina.length - 1) {
            setPagina(pagina + 1);
        }
    };

    const cambiarPaginaInverso = () => {
        if (pagina > 0) {
            setPagina(pagina - 1);
        }
    };

    return (
        <div id="mainContainerTable">
            <div id="tabla-pilotos">
                <table>
                    <thead>
                        <tr>
                            <th>NOMBRE</th>
                            <th>EQUIPO</th>
                            <th>NUMERO</th>
                            <th>NACIONALIDAD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pilotosPagina[pagina]?.map((piloto, index) => (
                            <tr key={index} className="piloto">
                                <td>{piloto.nombre}</td>
                                <td>{piloto.equipo}</td>
                                <td>{piloto.numero}</td>
                                <td>{piloto.nacionalidad}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={"contendor-botones"}>
                <Image url={"https://cdn-icons-png.flaticon.com/128/11450/11450517.png"} idtf={"flecha-izquierda"} cl={"flecha"} onClick={cambiarPaginaInverso} />
                <p id="pagina">
                    <span id="pagina-actual">{pagina + 1}</span> / <span id="total-paginas">{pilotosPagina.length}</span>
                </p>
                <Image url={"https://cdn-icons-png.flaticon.com/128/11450/11450517.png"} idtf={"flecha-derecha"} cl={"flecha"} onClick={cambiarPagina} />
            </div>
        </div>
    );
}

export default TablaPilotos;