class Disco {
    constructor(disco, grupo, tipo, anioPublicacion) {
        this.disco = disco;
        this.grupo = grupo;
        this.tipo = tipo;
        this.anioPublicacion = anioPublicacion;
        this.localizacion = 0;
        this.prestado = false;
        this.caratula = "imagen.png";
    }

    
    mostrarInfoDisco() {
        return (
            "Nombre: " + this.Disco + "<br>" +
            "Grupo: " + this.Grupo + "<br>" +
            "Año de publicación: " + this.AnioPublicacion + "<br>" +
            "Localización: " + this.Localizacion + "<br>" +
            "Prestado: " + this.Prestado + "<br>" +
            "Carátula: " + this.Caratula + "<br>"
        );
    }

    cambiarLocalizacionDisco(nuevaLocalizacion) {
        this.Localizacion = nuevaLocalizacion;
    }

    cambiarEstadoPrestado(estado) {
        this.Prestado = estado;
    }
}

export { Disco };