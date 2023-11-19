// JavaScript
var animacionPausada = false;

function detenerAnimacion() {
    var texto = document.getElementById('texto');
    texto.style.animationPlayState = "paused";
    animacionPausada = true;
}

function reanudarAnimacion() {
    var texto = document.getElementById('texto');
    texto.style.animationPlayState = "running";
    animacionPausada = false;
}

detenerAnimacion();
reanudarAnimacion();
