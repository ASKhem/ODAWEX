//referencias útiles
const contenedorTabla = document.getElementById("tabla-pilotos");
const enviar = document.getElementById("submit");
const paginaActual = document.getElementById("pagina-actual");
const numeroPagTotal = document.getElementById("total-paginas");
const siguiente = document.getElementById("flecha-derecha");
const anterior = document.getElementById("flecha-izquierda");
const botonVerTablaCompleta = document.getElementById("ver-tabla-completa");
//El programa está diseñado para que al hacer
let pagina = -1;
let pag = [];

fetch("./pilotos.json")
    .then(response => response.json())
    .then(data => {
        pag = [...paginas(data.pilotos)];
        cambiarPagina(pag);
        //Cosulta del tipo de tabla
        enviar.addEventListener("click", (event) => {
            //mejor usar arrow function para no perder el contexto
            event.preventDefault();
            submit(data);
        });
        numeroPagTotal.textContent = pag.length;
        siguiente.addEventListener("click", (event) => {
            event.preventDefault();
            cambiarPagina(pag);
        });
        anterior.addEventListener("click", (event) => {
            event.preventDefault();
            cambiarPaginaInverso(pag);
        });
        botonVerTablaCompleta.addEventListener("click", (event) => {
            event.preventDefault();
            contenedorTabla.innerHTML = "";
            contenedorTabla.appendChild(crearTablaPilotos(data.pilotos));
        });
    })
    .catch(error => console.error("Error al cargar los datos:", error));

function submit(data) {
    let opcion3 = document.getElementById("buscador").value;
    let opcion1 = document.getElementById("opciones-tabla-1").value;
    let opcion2 = document.getElementById("opciones-tabla-2").value;
    pagina = -1;
    if(opcion3 !== ""){
        pag = [...paginas(buscarPorNacionalidad(data.pilotos, opcion3))];
        numeroPagTotal.textContent = pag.length;
        cambiarPagina(pag);
    }else{
        let ordenarFunc;
        if (opcion1 == 1) {
            ordenarFunc = ordernarPorNombre;
        } else {
            ordenarFunc = ordernarPorEquipo;
        }
        pag = [...paginas(ordenarFunc(data.pilotos, opcion2))];
        numeroPagTotal.textContent = pag.length;
        cambiarPagina(pag);
    }


}

function ordernarPorNombre(pilotos, opcion) {
    if(opcion == 0){//opcion predeterminada
        return pilotos;
    }else{
        return ordenarPorCampo(pilotos, 'nombre', opcion);
    }

}

function ordernarPorEquipo(pilotos, opcion) {
    if(opcion == 0){
        return pilotos;
    }else{
        return ordenarPorCampo(pilotos, 'equipo', opcion);
    }
}

//funcion que nos ordena los pilotos por el campo que le pasemos
function ordenarPorCampo(pilotos, campo, opcion) {
    const pilotosOrdenados = [...pilotos];
    return pilotosOrdenados.sort((a, b) => {
        if (opcion == 1) {
            return a[campo].localeCompare(b[campo]);
        } else if (opcion == 2) {
            return b[campo].localeCompare(a[campo]);
        }
    });
}

function crearTablaPilotos(pilotos) {
    contenedorTabla.innerHTML = "";
    const tabla = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const filaEncabezado = document.createElement("tr");
    const encabezados = ["NOMBRE", "EQUIPO", "NUMERO", "NACIONALIDAD"];
    encabezados.forEach((encabezado) => {
        const th = document.createElement("th");
        th.textContent = encabezado;
        filaEncabezado.appendChild(th);
    });

    thead.appendChild(filaEncabezado);
    tabla.appendChild(thead);
    pilotos.forEach(piloto => {
        const fila = document.createElement("tr");
        fila.className = "piloto";
        const celdas = ["nombre", "equipo", "numero", "nacionalidad"];
        celdas.forEach((celda) => {
            const td = document.createElement("td");
            td.textContent = piloto[celda];
            fila.appendChild(td);
        });
        fila.addEventListener("click", destacarPilotoClick);
        tbody.appendChild(fila);
    });

    tabla.appendChild(tbody);
    return tabla;
}

function paginas(pilotos) {
    let paginas = [];
    for (let i = 0; i < pilotos.length; i++) {
        if (i % 3 == 0) {//cada 3 pilotos se crea una nueva pagina
            paginas.push([]);
        }
        paginas[paginas.length - 1].push(pilotos[i]);
    }
    return paginas;
}

function cambiarPagina(pilotosPagina) {
    if (pagina < pilotosPagina.length - 1) {
        pagina++;
        actualizarTabla(pilotosPagina);
    }

}

function cambiarPaginaInverso(pilotosPagina) {
    if (pagina > 0) {
        pagina--;
        actualizarTabla(pilotosPagina);
    }
}


function actualizarTabla(pilotosPagina) {
    contenedorTabla.innerHTML = "";
    contenedorTabla.appendChild(crearTablaPilotos(pilotosPagina[pagina]));
    paginaActual.textContent = pagina +1;
}

function buscarPorNacionalidad(pilotos, nacionalidad) {
    const pilotosPorNacionalidad = pilotos.filter(piloto => piloto.nacionalidad === nacionalidad);
    pag = [...paginas(pilotosPorNacionalidad)];
    numeroPagTotal.textContent = pag.length;
    document.getElementById("buscador").value = "";
    return pilotosPorNacionalidad;
}

function destacarPilotoClick(event) {
    if (event.target.parentNode.classList.contains("destacar")) {
        event.target.parentNode.classList.remove("destacar");
    } else {
        event.target.parentNode.classList.add("destacar");
    }
}
