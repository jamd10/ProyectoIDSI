if (document.querySelector('.mi-carrusel-personalizado')) {
  setInterval('fntExecuteSlide("next")', 5000);
}
//------------------------------ LIST SLIDER -------------------------
if (document.querySelector('.mi-carrusel-personalizado .listslider')) {
  let link = document.querySelectorAll(".mi-carrusel-personalizado .listslider li a");
  link.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      let item = this.getAttribute('itlist');
      let arrItem = item.split("_");
      fntExecuteSlide(arrItem[1]);
      return false;
    });
  });
}

function fntExecuteSlide(side) {
  let parentTarget = document.querySelector('.mi-carrusel-personalizado #slider');
  let elements = parentTarget.getElementsByTagName('li');
  let curElement, nextElement;

  for (var i = 0; i < elements.length; i++) {

    if (elements[i].style.opacity == 1) {
      curElement = i;
      break;
    }
  }
  if (side == 'prev' || side == 'next') {

    if (side == "prev") {
      nextElement = (curElement == 0) ? elements.length - 1 : curElement - 1;
    } else {
      nextElement = (curElement == elements.length - 1) ? 0 : curElement + 1;
    }
  } else {
    nextElement = side;
    side = (curElement > nextElement) ? 'prev' : 'next';

  }
  //RESALTA LOS PUNTOS
  let elementSel = document.querySelector('.mi-carrusel-personalizado .listslider').getElementsByTagName("a");
  elementSel[curElement].classList.remove("item-select-slid");
  elementSel[nextElement].classList.add("item-select-slid");
  elements[curElement].style.opacity = 0;
  elements[curElement].style.zIndex = 0;
  elements[nextElement].style.opacity = 1;
  elements[nextElement].style.zIndex = 1;
}
