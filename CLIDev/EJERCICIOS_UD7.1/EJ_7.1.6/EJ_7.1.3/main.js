import MemoryGame from './MemoryGame.js';

window.addEventListener("load", inicializarJuego);

async function cargarImagenes(callback) {
    const response = await fetch("https://randomuser.me/api/?results=6&format=XML");
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, "application/xml");
    const xmlImagenes = xmlDoc.getElementsByTagName("picture");
    let img = [];
    for (let i = 0; i < xmlImagenes.length; i++){
        img.push(xmlImagenes[i].getElementsByTagName("large")[0].childNodes[0].nodeValue);
    }
    callback(img);
}

function inicializarJuego() {
    cargarImagenes(function(imagenes) {
        const duplicadas = imagenes.concat(imagenes);
        const memoryGame = new MemoryGame(duplicadas);
    });
}