import { Disco } from './Disco.js';

//Mostrar numero discos
document.getElementById("inicio").addEventListener("click", function () {
    cargarDiscos();
    document.getElementById("mostrarN").innerHTML =discos.length;
}, true);
let discos = [];

async function cargarDiscos() {
    const response = await fetch("discos.xml");
    const text = await response.text();
    const parser = new DOMParser();
    const docXML = parser.parseFromString(text, "application/xml");
    cargarXML(docXML);
}

function cargarXML(docXML){
    var discosXML = docXML.getElementsByTagName("disco");

    for (let i = 0; i < discosXML.length; i++) {
        let disco = discosXML[i];
        let discoX = new Disco(
            disco.getElementsByTagName("titulo")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("artista")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("genero")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("año")[0].childNodes[0].nodeValue
        );
        discos.push(discoX);
    }
}
//Mostrar tabla discos
document.getElementById("actionShowTable").addEventListener("click", showTable, true);
function showTable() {
    let mostrar;
    let OpcionTabla = parseInt(document.getElementById("opcionTabla").value);
    if (OpcionTabla == 1) {
        mostrar = "Tabla con los discos sin cambios: </br>" + generarTable(discos);
    } else if (OpcionTabla == 2) {
        mostrar = "Tabla con los discos en orden inverso: " + generarTable(discos.reverse());
    } else {
        mostrar = "Tabla con los discos ordenados alfabéticamente: " + generarTable(ordenarTablaAlfabeticamente(OpcionTabla, discos));
    }
    document.getElementById("tablaConsulta").innerHTML = mostrar;
}

function generarTable(elemento) {
    let array1 = [...elemento];
    let tableContent = '';

    for (let i = 0; i < array1.length; i++) { // Cambiar discos.length a array1.length
        tableContent += '<tr>';
        tableContent += `<td>${array1[i].disco}</td>`;
        tableContent += `<td>${array1[i].grupo}</td>`;
        tableContent += `<td>${array1[i].tipo}</td>`;
        tableContent += `<td>${array1[i].anioPublicacion}</td>`;
        tableContent += `<td>${array1[i].localizacion}</td>`;
        tableContent += `<td>${array1[i].prestado}</td>`;
        tableContent += `<td>${array1[i].caratula}</td>`;
        tableContent += '</tr>';
    }

    let columnas = ['Disco', 'Grupo', 'Genero', 'Anio Publicacion', "Localizacion", "Prestado", "Caratula"];
    let thead = '<tr>';
    for (let i = 0; i < columnas.length; i++) {
        thead += `<th>${columnas[i]}</th>`;
    }
    thead += '</tr>';

    return `<table>${thead}${tableContent}</table>`;
}

//tabla ordenada por algún elemento en concreto.
function ordenarTablaAlfabeticamente(opcion, array) {
    let discosOrdenados = [...array];

    // Función de comparación
    function comparar(a, b) {
        if (opcion == 3) {
            return a.grupo.localeCompare(b.grupo);
        } else if (opcion == 4) { return a.disco.localeCompare(b.disco); }
    }
    discosOrdenados.sort(comparar);
    return discosOrdenados;
}


//Discos en un intervalo de fechas
document.getElementById("actionDiscosIntervalo").addEventListener("click", mostrarYOrdenarDiscosIntervaloFecha, true);
function mostrarYOrdenarDiscosIntervaloFecha() {
    let mostrar;
    let discosCopy = [...discos];
    let intervalo = document.getElementById("fecha").value;
    let fechas = intervalo.split("-");

    // Filtrar discos por intervalo de fecha
    discosCopy = discosCopy.filter(disco => {
        return disco.anioPublicacion >= fechas[0] && disco.anioPublicacion <= fechas[1];
    });

    if (discosCopy.length > 0) {
        mostrar = "Discos publicados entre esas Fechas <br>" + discosCopy;
    } else {
        mostrar = "No se encontraron discos en ese intervalo de fechas.";
    }

    document.getElementById("tablaConsulta").innerHTML = generarTable(discosCopy);
}

//Añadir disco
document.getElementById("actionAñadirDisco").addEventListener("click", añadirDisco, true);
function añadirDisco() {
    let opcion = parseInt(document.getElementById("opcionAñadirDisco").value);
    let discoX = document.getElementById("añadirDisco").value.split(",");
    if (discoX.length === 4) {
        if (opcion === 1) {
            discos.unshift(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            document.getElementById("discoAñadido").innerHTML = "Disco: " + discos[discos.length - 1] + " añadido correctamente al principio";
        } else if (opcion === 2) {
            discos.push(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            document.getElementById("discoAñadido").innerHTML = "Disco: " + discos[discos.length - 1] + " añadido correctamente al final";
        }
    } else {
        document.getElementById("discoAñadido").innerHTML = "Escribe parámetros válidos";
    }
}

//Borrar un disco
document.getElementById("actionBorrar").addEventListener("click", borrarDisco, true);

// Borrar un disco
document.getElementById("actionBorrar").addEventListener("click", borrarDisco, true);

function borrarDisco() {
    let opcion = parseInt(document.getElementById("opcionBorrarDisco").value);
    if (opcion === 1) {
        // Borrar el primer disco
        if (discos.length > 0) {
            discos.shift();
            document.getElementById("discoBorrado").innerHTML = "Primer disco ha sido borrado.";
        } else {
            document.getElementById("discoBorrado").innerHTML = "No hay discos para borrar.";
        }
    } else if (opcion === 2) {
        // Borrar el último disco
        if (discos.length > 0) {
            discos.pop();
            document.getElementById("discoBorrado").innerHTML = "Último disco ha sido borrado.";
        } else {
            document.getElementById("discoBorrado").innerHTML = "No hay discos para borrar.";
        }
    } else {
        document.getElementById("discoBorrado").innerHTML = "Elija una opción válida para borrar el disco.";
    }
}







