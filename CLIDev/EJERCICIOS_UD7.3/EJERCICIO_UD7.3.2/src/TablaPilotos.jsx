import { useState, useEffect } from 'react';
import pilotosData from './pilotos.json';
import Image from './Image';
// import pilotos from './pilotos.json';
function TablaPilotos() {
    const [pagina, setPagina] = useState(0);
    const [pilotosPagina, setPilotosPagina] = useState([]);
    const [pilotos, setPilotos] = useState([]);

    // useEffect(() => {
    //     async function fetchData() {
    //         try {
    //             const response = await fetch('./pilotos.json');
    //             if (!response.ok) {
    //                 throw new Error('No se pudo cargar los pilotos');
    //             }
    //             const pilotosData = await response.json();
    //             setPilotos(pilotosData.pilotos);
    //         } catch (error) {
    //             console.error('Error al cargar la información:', error);
    //         }
    //     } fetchData();
    // }, []);

    useEffect(() => {
        setPilotos(pilotosData.pilotos);
        const paginas = [];
        for (let i = 0; i < pilotos.length; i++) {
            if (i % 3 === 0) {
                paginas.push([]);
            }
            paginas[paginas.length - 1].push(pilotos[i]);
        }
        setPilotosPagina(paginas);
    }, [pilotos]);
    //si no

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