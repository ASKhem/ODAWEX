//eliminamos la clase Cliente ya que no la utilizarémos en este ejercicio
window.addEventListener("load", inicio, true);
let clientes;
function inicio() {
    obtenerClientes();
    document.getElementById("inicio").addEventListener("click", menu);
}

//funcion que obtiene los datos de los clientes mediante una petición AJAX
function getClientes(datosClientes) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        //4 es el estado de completado y 200 es el estado de OK
        if (this.readyState == 4 && this.status == 200) {
            //parseamos el JSON y obtenemos los datos como una cadena de texto y lo convertimos a un objeto
            const listaClientes = JSON.parse(this.responseText);
            //llamamos a la función que nos pasaron como parámetro y le pasamos los datos
            datosClientes(listaClientes);
        }
    }
    xhr.open("GET", "data/clientes.json", true);
    xhr.send();
}

/*
 *esta funcion nos asigna los datos de los clientes a la variable clientes
 *evitando tener que hacer la petición AJAX cada vez que necesitemos los datos
 */  
function obtenerClientes() {
    getClientes(data => {
        clientes = data;
    });
}

function generarTabla(clientes) {
    let tabla = "<table><tr><th>Nombre</th><th>Cuota</th></tr>";
    //iteramos sobre el array de clientes y generamos una fila por cada cliente
    clientes.forEach(cliente => {
        tabla += `<tr><td>${cliente.nombre}</td><td>${cliente.saldo}</td></tr>`;
    });

    //Alternativa con for of
    // for (let cliente of clientes) {
    //     tabla += `<tr><td>${cliente.nombre}</td><td>${cliente.saldo}</td></tr>`;
    // }

    tabla += "</table>";
    return tabla;
}

function mostrarClientes() {
    document.getElementById("mostrar").innerHTML = generarTabla(clientes);
}

function mostrarClientesPorProvincia() {
    let provincia = document.getElementById("textoInput").value;
    if (provincia === "") {
        document.getElementById("mostrar").innerHTML = "Debe ingresar una provincia";
        return;
    }
    let resultados = clientes.filter(cliente => cliente.localidad === provincia);
    document.getElementById("tabla").innerHTML = resultados.length > 0 ? generarTabla(resultados) : `No hay clientes en ${provincia}`;
}

function mostrarClientesConCuotaMayorA() {
    let saldo = document.getElementById("textoInput").value;
    if (saldo === "") {
        document.getElementById("mostrar").innerHTML = "Debe ingresar un saldo";
        return;
    }
    let resultados = clientes.filter(cliente => cliente.saldo > saldo);
    document.getElementById("tabla").innerHTML = resultados.length > 0 ? generarTabla(resultados) : `No hay clientes con una cuota mayor a ${saldo}`;
}

function menu() {
    let opcion = document.getElementById("opcion").value;
    document.getElementById("tabla").innerHTML = "";
    document.getElementById("mostrar").innerHTML = "";

    switch (opcion) {
        case "1":
            mostrarClientes();
            break;
        case "2":
            mostrarClientesPorProvincia();
            break;
        case "3":
            mostrarClientesConCuotaMayorA();
            break;
        default:
            document.getElementById("mostrar").innerHTML = "Opción no válida";
    }
}
