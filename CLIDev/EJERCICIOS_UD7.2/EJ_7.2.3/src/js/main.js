$(document).ready(function() {
    $.ajax({
        url: "/data/equipos.json",
        type: "GET",
        //se ejecuta si la peticion es exitosa
        success: function(equipos) {
            init(equipos);
        }
    });
});

function init(equipos){
    let lista = $("#teamSelect");
    $.each(equipos, function(i, equipo) {
        //esta asignacion es para que el valor del option sea el indice del json
        let opcion = $("<option></option>").text(equipo.nombre).val(i);
        lista.append(opcion);
    });
    lista.change(function(){
        let index = lista.val();
        let equipo = equipos[index].nombre;
        mostrarInfoEquipo(equipo, equipos);
    });
}

function mostrarInfoEquipo(equipo, equipos){
    let info = $("#teamInfo");
    //siempre se ejecuta primer la persiona hacia arriba
    info.slideUp(600, function() {
        //limpiamos
        info.html(""); 
        //recorremos el json de equipos
        $.each(equipos, function(i, equipoInfo) {
            if (equipoInfo.nombre == equipo){
                info.append("Nombre: " + equipoInfo.nombre + "<br>");
                info.append("Partidos Jugados: " + equipoInfo.PJ + "<br>");
                info.append("Partidos Ganados: " + equipoInfo.PG + "<br>");
                info.append("Partidos Perdidos: " + equipoInfo.PP + "<br>");
                info.append("Partidos Empatados: " + equipoInfo.PE + "<br>");
            }
        });
    });
    //luego se ejecuta la animacion hacia abajo
    info.slideDown(500);
}