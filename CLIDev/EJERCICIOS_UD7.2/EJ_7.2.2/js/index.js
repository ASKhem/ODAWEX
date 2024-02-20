$(document).ready(function () {
    let colorActivo = "color6";
    let pintando = false;

    const tabla = crearTabla(30, 30);
    $("#zonadibujo").append(tabla);

    $("#paleta").on("click", seleccionarColor);
    $("#zonadibujo").on("click", activarPincel);
    $("#zonadibujo").on("mousemove", dibujar);

    function seleccionarColor(event) {
        const colorSeleccionado = $(event.target).attr('class').split(' ')[0];
        if (colorSeleccionado && colorSeleccionado.startsWith("color")) {
            colorActivo = colorSeleccionado;

            $(".seleccionado").removeClass("seleccionado");
            $(event.target).addClass("seleccionado");
            pintando = true;
            actualizarMensajePincel();
        }
    }

    function activarPincel() {
        pintando = !pintando;
        actualizarMensajePincel();
    }

    function dibujar(event) {
        if (pintando ) {
            const celda = $(event.target).closest(".cell");
            if (celda.length) {
                actualizarColores(celda, ["color1", "color2", "color3", "color4", "color5", "color6"]);
            }
        }
    }

    function actualizarMensajePincel() {
        const pincelEstado = $("#pincel");
        pincelEstado.text(pintando ? "PINCEL ACTIVADO" : "PINCEL DESACTIVADO");
    }

    function crearTabla(filas, columnas) {
        const tabla = $("<table></table>");
        for (let i = 0; i < filas; i++) {
            const fila = $("<tr></tr>");
            for (let j = 0; j < columnas; j++) {
                const celda = $("<td></td>");
                celda.addClass("cell");
                fila.append(celda);
            }
            tabla.append(fila);
        }
        return tabla;
    }

    function actualizarColores(elemento, colores) {
        for (let i = 0; i < colores.length; i++) {
            if (colorActivo !== colores[i]) {
                elemento.removeClass(colores[i]);
            }
        }
        elemento.addClass(colorActivo);
    }
});