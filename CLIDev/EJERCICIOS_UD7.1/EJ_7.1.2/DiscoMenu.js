import { Disco } from './Disco.js';
cargarDiscos();
//Mostrar numero discos
document.getElementById("inicio").addEventListener("click", function () {
    document.getElementById("mostrarN").innerHTML =discos.length;
}, true);

let discos = [];

function cargarDiscos() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //llamar a la función que procesa el XML
            cargarXML(this);
        }
    };
    xhr.open("GET", "discos.xml", true);
    xhr.send();
}

function cargarXML(xml){
    var docXML = xml.responseXML;
    //buscamos el nodo raíz que nos interesa, en este caso "discos"
    var discosXML = docXML.getElementsByTagName("disco");

    //ejemplo de disco en XML:
    // <disco>
    //     <titulo>Dark Side of the Moon</titulo>
    //     <artista>Pink Floyd</artista>
    //     <genero>Rock</genero>
    //     <año>1973</año>
    // </disco>

    for (let i = 0; i < discosXML.length; i++) {
        let disco = discosXML[i];
        //creamos un objeto Disco con los datos del XML
        let discoX = new Disco(
            disco.getElementsByTagName("titulo")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("artista")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("genero")[0].childNodes[0].nodeValue, 
            disco.getElementsByTagName("año")[0].childNodes[0].nodeValue
        );
        //añadimos el disco al array
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
        discos.reverse();//volvemos a dejar el array como estaba
    } else {
        mostrar = "Tabla con los discos ordenados alfabéticamente: " + generarTable(ordenarTablaAlfabeticamente(OpcionTabla, discos));
    }
    document.getElementById("tablaConsulta").innerHTML = mostrar;
}

function generarTable(elemento) {
    let array1 = [...elemento];
    let tableContent = "";

    for (let i = 0; i < array1.length; i++) {
        tableContent += "<tr>";
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
    let discosOrdenados = array.slice();

    function comparar(a, b) {
        if (opcion == 3) {
            if (a.grupo < b.grupo) return -1;
            if (a.grupo > b.grupo) return 1;
            return 0;
        } else if (opcion == 4) {
            if (a.disco < b.disco) return -1;
            if (a.disco > b.disco) return 1;
            return 0;
        }
    }

    discosOrdenados.sort(comparar);
    return discosOrdenados;
}


//Discos en un intervalo de fechas
document.getElementById("actionDiscosIntervalo").addEventListener("click", mostrarYOrdenarDiscosIntervaloFecha, true);
function mostrarYOrdenarDiscosIntervaloFecha() {
    let mostrar;
    let discosCopy = discos.slice();
    let intervalo = document.getElementById("fecha").value;
    //separamos el intervalo de fechas
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
            //añadir al principio
            discos.unshift(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            document.getElementById("discoAñadido").innerHTML = "Disco: " + discos[discos.length - 1] + " añadido correctamente al principio";
        } else if (opcion === 2) {
            //añadir al final
            discos.push(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            document.getElementById("discoAñadido").innerHTML = "Disco: " + discos[discos.length - 1] + " añadido correctamente al final";
        }
    } else {
        document.getElementById("discoAñadido").innerHTML = "Escribe parámetros válidos";
    }
}

//Borrar un disco
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







