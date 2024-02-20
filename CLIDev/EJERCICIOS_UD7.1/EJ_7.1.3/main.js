import MemoryGame from './MemoryGame.js';

window.addEventListener("load", inicializarJuego);
function cargarImagenes(afterImagesLoaded){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if (xhr.readyState == 4 && xhr.status == 200){
            let imagenes = procesarXML(xhr);
            afterImagesLoaded(imagenes);
        }
    };
    xhr.open("GET", "https://randomuser.me/api/?results=6&format=XML", true);
    xhr.send();
}

function procesarXML(xml){
    let xmlDoc = xml.responseXML;
    let xmlImagenes = xmlDoc.getElementsByTagName("picture");
    let img = [];
    for (let i = 0; i < xmlImagenes.length; i++){
        console.log(xmlImagenes[i].getElementsByTagName("large")[0])
        console.log(xmlImagenes[i].getElementsByTagName("large")[0].childNodes[0]);
        img.push(xmlImagenes[i].getElementsByTagName("large")[0].childNodes[0].nodeValue);
    }
    return img;
}

function inicializarJuego() {
    //funcion callback que se ejecuta cuando las imagenes estan cargadas
    cargarImagenes(function(imagenes) {
        const duplicadas = imagenes.concat(imagenes);
        const memoryGame = new MemoryGame(duplicadas);
    });

}