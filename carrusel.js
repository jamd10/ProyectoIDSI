var diapositivas = document.querySelectorAll('.diapositiva');
var botones = document.querySelectorAll('.boton');
let diapositivaActual = 1;

// Navegación manual del carrusel de imágenes
var navegacionManual = function(manual){
  diapositivas.forEach((diapositiva) => {
    diapositiva.classList.remove('active');

    botones.forEach((boton) => {
      boton.classList.remove('active');
    });
  });

  diapositivas[manual].classList.add('active');
  botones[manual].classList.add('active');
}

botones.forEach((boton, i) => {
  boton.addEventListener("click", () => {
    navegacionManual(i);
    diapositivaActual = i;
  });
});

// Navegación automática del carrusel de imágenes
var repetir = function(activeClass){
  let activo = document.getElementsByClassName('active');
  let indice = 0;

  var repetidor = () => {
    setTimeout(function(){
      [...activo].forEach((diapositivaActiva) => {
        diapositivaActiva.classList.remove('active');
      });

    diapositivas[indice].classList.add('active');
    botones[indice].classList.add('active');
    indice++;

    if(indice == diapositivas.length){
      indice = 0;
    }
    repetidor();
  }, 3000);
  }
  repetidor();
}
repetir();
