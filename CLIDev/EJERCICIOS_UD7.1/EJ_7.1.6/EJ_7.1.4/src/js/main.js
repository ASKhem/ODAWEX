window.onload = function() {
    cargarEquipos();
};

async function cargarEquipos() {
    const response = await fetch("/data/equipos.json");
    const equipos = await response.json();
    let lista = document.getElementById("teamSelect");
    for (let i = 0; i < equipos.length; i++) {
        let opcion = document.createElement("option");
        opcion.text = equipos[i].nombre;
        opcion.value = i;
        lista.appendChild(opcion);
    }
    lista.onchange = function(){
        let index = lista.value;
        let equipo = equipos[index].nombre;
        mostrarInfoEquipo(equipo, equipos);
    }
}

function mostrarInfoEquipo(equipo, equipos){
    let info = document.getElementById("teamInfo");
    info.innerHTML = ""; 
    for (let i = 0; i < equipos.length; i++) {
        if (equipos[i].nombre == equipo){
            let equipoInfo = equipos[i];
            info.innerHTML += "Nombre: " + equipoInfo.nombre + "<br>";
            info.innerHTML += "Partidos Jugados: " + equipoInfo.PJ + "<br>";
            info.innerHTML += "Partidos Ganados: " + equipoInfo.PG + "<br>";
            info.innerHTML += "Partidos Perdidos: " + equipoInfo.PP + "<br>";
            info.innerHTML += "Partidos Empatados: " + equipoInfo.PE + "<br>";
        }
    }
}