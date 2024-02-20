window.addEventListener("load", inicio, true);

function inicio() {
    document.getElementById("inicio").addEventListener("click", menu);
}

async function getClientes(datosClientes) {
    const response = await fetch("data/clientes.json");
    const listaClientes = await response.json();
    datosClientes(listaClientes);
}

function generarTabla(clientes) {
    let tabla = "<table><tr><th>Nombre</th><th>Cuota</th></tr>";
    clientes.forEach(cliente => {
        tabla += `<tr><td>${cliente.nombre}</td><td>${cliente.saldo}</td></tr>`;
    });
    tabla += "</table>";
    return tabla;
}

function mostrarClientes() {
    getClientes(clientes => {
        document.getElementById("mostrar").innerHTML = generarTabla(clientes);
    });
}

function mostrarClientesPorProvincia() {
    let provincia = document.getElementById("textoInput").value;
    getClientes(clientes => {
        let resultados = clientes.filter(cliente => cliente.localidad === provincia);
        document.getElementById("tabla").innerHTML = resultados.length > 0 ? generarTabla(resultados) : `No hay clientes en ${provincia}`;
    });
}

function mostrarClientesConCuotaMayorA() {
    let saldo = parseInt(document.getElementById("textoInput").value);
    getClientes(clientes => {
        let resultados = clientes.filter(cliente => cliente.saldo> saldo);
        document.getElementById("tabla").innerHTML = resultados.length > 0 ? generarTabla(resultados) : `No hay clientes con una cuota mayor a ${saldo}`;
    });
}

function menu() {
    let opcion = parseInt(document.getElementById("opcion").value);
    switch (opcion) {
        case 1:
            mostrarClientes();
            break;
        case 2:
            mostrarClientesPorProvincia();
            break;
        case 3:
            mostrarClientesConCuotaMayorA();
            break;
        default:
            document.getElementById("mostrar").innerHTML = "Opción no válida";
    }
}