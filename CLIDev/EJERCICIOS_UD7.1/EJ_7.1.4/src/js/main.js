window.onload = function() {
    cargarEquipos();
};

function cargarEquipos(){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let equipos = JSON.parse(this.responseText);
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
    };
    xhr.open("GET", "/data/equipos.json", true);
    xhr.send();
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