import Cookies from './cookiesManager.js';
class MemoryGame {
    constructor(imagenes) {
        this.arrayImagenes = [...imagenes];
        console.log(this.arrayImagenes);
        this.imagenesSeleccionadas = [];
        this.asignaciones = [];
        this.paresAcertados = 0;

        this.inicializarJuego();
    }

    inicializarJuego() {

        this.obtenerNombreUsuario();
        this.mezclarArray(this.arrayImagenes);

        document.getElementById("reiniciar").addEventListener("click", this.reiniciarJuego.bind(this));

        //referencia a la tabla
        let table = document.getElementById("mainTable");

        //añadir evento click a la tabla
        table.addEventListener("click", this.manejarTabla.bind(this));
        this.mostrarVentanaBienvenida();
        this.reiniciarJuego();
    }

    // Metodo que se llama al hacer click sobre una imagen
    manejarTabla(event) {
        //comprueba que el elemento clicado es una imagen
        if (event.target.tagName === "IMG") {
            //añadir Animacion
            event.target.classList.add('animate__animated', 'animate__flip');
            //llamar a la funcion acertar
            this.acertar(event.target);
        }
    }

    reiniciarJuego() {
        this.imagenesSeleccionadas = [];
        this.paresAcertados = 0;
        this.actualizarContador();

        for (let i = 1; i <= 12; i++) {
            let imagen = document.getElementById(i.toString());
            imagen.src = "img/0.jpg";
            imagen.classList.remove('animate__animated', 'animate__flip', 'animate__bounce');
        }

        this.mezclarArray(this.arrayImagenes);
        this.asignaciones = [...this.arrayImagenes];

        document.getElementById("banda").style.display = "none";
    }

    mostrarVentanaBienvenida() {
        const nombre = Cookies.getCookie('nombre');
        if (!nombre) {
            document.getElementById('desplegable').style.display = 'flex';
            document.getElementById('bienvenida').style.display = 'none';
    
            const form = document.getElementById('nombreForm');
            form.addEventListener('submit', function(event){
                event.preventDefault();
                const nombreUsuario = form.elements['nombre'].value.trim();
                if (nombreUsuario) {
                    Cookies.setCookie('nombre', nombreUsuario);
                    document.getElementById('desplegable').style.display = 'none';
                    const contador = Cookies.getCookie("contador");
                    this.incrementarContadorVisitas();
                }
            });
        } else {
            document.getElementById('desplegable').style.display = 'none';
            document.getElementById('bienvenida').style.display = 'flex';
            document.getElementById("bienvenida").innerHTML =
            `Bienvenido ${Cookies.getCookie("nombre")}` +
            `&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;` +
            `Has visitado esta página ${Cookies.getCookie("contador")} veces`;
        }
    }

    actualizarContador() {
        document.getElementById("paresAcertados").textContent = this.paresAcertados;

        if (this.paresAcertados === this.arrayImagenes.length / 2) {
            this.felicitar();
        }
    }

    // Metodo que se llama desde el evento manejarTabla
    acertar(imagen) {
        // Obtenemos el indice de la imagen clicada
        let index = imagen.id - 1;

        // Si no hay ninguna imagen contenida, la añadimos al array
        if (this.imagenesSeleccionadas.length < 2) {
            imagen.src = this.asignaciones[index];
            // Añadimos la imagen al array
            this.imagenesSeleccionadas.push(imagen);

            // Si hay dos imagenes en el array, comprobamos si son iguales
            if (this.imagenesSeleccionadas.length === 2) {
                if (this.imagenesSeleccionadas[0].src !== this.imagenesSeleccionadas[1].src) {
                    // Si no son iguales, las volteamos
                    setTimeout(() => this.voltearImagenes(), 1500);
                } else {
                    //se aumenta el contador de pares acertados
                    this.paresAcertados++;
                    this.actualizarContador();
                    // Si son iguales, las eliminamos del array
                    this.imagenesSeleccionadas = [];
                }
            }
        }
    }

    voltearImagen(imagen) {
        imagen.src = "img/0.jpg";
    }

    voltearImagenes() {
        for (let i = 0; i < this.imagenesSeleccionadas.length; i++) {
            this.voltearImagen(this.imagenesSeleccionadas[i]);
            this.imagenesSeleccionadas[i].classList.remove('animate__animated', 'animate__flip');
        }
        this.imagenesSeleccionadas = [];
    }

    mezclarArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    felicitar() {
        document.getElementById("banda").style.display = "flex";
    }

    obtenerNombreUsuario() {
        let nombre = Cookies.getCookie("nombre");

        if (!nombre) {
            nombre = document.getElementById("nombre").value;
            if (nombre) {
                Cookies.setCookie("nombre", nombre);
            }
        }
        this.incrementarContadorVisitas();
        return nombre;
    }

    incrementarContadorVisitas() {
        let contador = Cookies.getCookie("contador");
        const nombre = Cookies.getCookie("nombre");
    
        // Solo incrementa el contador si el nombre del usuario existe
        if (nombre) {
            if (!contador) {
                contador = 1;
            } else {
                contador = parseInt(contador) + 1;
            }
            Cookies.setCookie("contador", contador);
        }
    }

}

export default MemoryGame;
