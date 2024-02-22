import { useState, useEffect } from 'react';
import pilotosData from './pilotos.json';
function TablaPilotosTotal() {
    const [pilotos, setPilotos] = useState([]);

    //No me funciona el fetch, por eso uso el import
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
                paginas.push([]);
        }
    }, [pilotos]);
    //si no indicamos [pilotos] en el segundo argumento, se ejecutará cada vez que se renderice el componente

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
                        {pilotos.map((piloto, index) => {
                            return (
                                <tr key={index}>
                                    <td>{piloto.nombre}</td>
                                    <td>{piloto.equipo}</td>
                                    <td>{piloto.numero}</td>
                                    <td>{piloto.nacionalidad}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TablaPilotosTotal;