

function Controllers() {

    return (
        <div id="controllersContainer">
            <div id="controles">
                <button id="ver-tabla-completa">Ver tabla completa</button>
                <div id="contenedor-seleccionar">
                    <div>
                        <select id="opciones-tabla-1">
                            <option value="1">Ordenado por nombre</option>
                            <option value="2">Ordenado por Equipo</option>
                        </select>
                        <select id="opciones-tabla-2">
                            <option value="0">Orden original</option>
                            <option value="1">Orden alfabeticamente</option>
                            <option value="2">Orden inverso</option>
                        </select>
                    </div>
                    <div>
                        <input type="text" id="buscador" placeholder="Buscar piloto por nacionalidad"/>
                    </div>
                </div>
                <button id="submit">Consultar</button>
            </div>
        </div>
    );
}

export default Controllers;