import { Disco } from './Disco.js';
let discos = [];


$(document).ready(function() {
    cargarDiscos();
    init();
});

function init(){
    $("#inicio").click(function() {$("#mostrarN").html(discos.length);});
    $("#actionShowTable").click(showTable);
    $("#actionDiscosIntervalo").click(mostrarYOrdenarDiscosIntervaloFecha);
    $("#actionAñadirDisco").click(añadirDisco);
    $("#actionBorrar").click(borrarDisco);
}
function cargarDiscos() {
    $.ajax({
        type: "GET",
        url: "discos.xml",
        dataType: "xml",
        success: function(xml) {
            cargarXML(xml);
        }
    });
}

function cargarXML(xml) {
    //each nos permite recorrer todos los discos
    $(xml).find("disco").each(function() {
        let discoX = new Disco(
            //this es el disco actual
            $(this).find("titulo").text(),
            $(this).find("artista").text(),
            $(this).find("genero").text(),
            $(this).find("año").text()
        );
        discos.push(discoX);
    });
}



function showTable() {
    let mostrar;
    let OpcionTabla = parseInt($("#opcionTabla").val());
    if (OpcionTabla == 1) {
        mostrar = "Tabla con los discos sin cambios: </br>" + generarTable(discos);
    } else if (OpcionTabla == 2) {
        mostrar = "Tabla con los discos en orden inverso: " + generarTable(discos.reverse());
    } else {
        mostrar = "Tabla con los discos ordenados alfabéticamente: " + generarTable(ordenarTablaAlfabeticamente(OpcionTabla, discos));
    }
    $("#tablaConsulta").html(mostrar);
}


function generarTable(elemento) {
    let array1 = [...elemento];
    let tableContent = '';

    for (let i = 0; i < array1.length; i++) {
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

function mostrarYOrdenarDiscosIntervaloFecha() {
    let mostrar;
    let discosCopy = [...discos];
    let intervalo = $("#fecha").val();
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

    $("#tablaConsulta").html(generarTable(discosCopy));
}

function añadirDisco() {
    let opcion = parseInt($("#opcionAñadirDisco").val());
    let discoX = $("#añadirDisco").val().split(",");
    if (discoX.length === 4) {
        if (opcion === 1) {
            discos.unshift(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            $("#discoAñadido").html("Disco: " + discos[discos.length - 1] + " añadido correctamente al principio");
        } else if (opcion === 2) {
            discos.push(new Disco(discoX[0], discoX[1], discoX[2], discoX[3]));
            $("#discoAñadido").html("Disco: " + discos[discos.length - 1] + " añadido correctamente al final");
        }
    } else {
        $("#discoAñadido").html("Escribe parámetros válidos");
    }
}

function borrarDisco() {
    let opcion = parseInt($("#opcionBorrarDisco").val());
    if (opcion === 1) {
        // Borrar el primer disco
        if (discos.length > 0) {
            discos.shift();
            $("#discoBorrado").html("Primer disco ha sido borrado.");
        } else {
            $("#discoBorrado").html("No hay discos para borrar.");
        }
    } else if (opcion === 2) {
        // Borrar el último disco
        if (discos.length > 0) {
            discos.pop();
            $("#discoBorrado").html("Último disco ha sido borrado.");
        } else {
            $("#discoBorrado").html("No hay discos para borrar.");
        }
    } else {
        $("#discoBorrado").html("Elija una opción válida para borrar el disco.");
    }
}

