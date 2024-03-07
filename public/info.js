$(function () {
    $('.banner').unslider({
        //  Enable keyboard arrows
        keys: true,
        // Enable dot nav
        dots: true,
        delay: 7000
    });
});

//relleno 4
document.addEventListener("DOMContentLoaded", function() {
    const text1 = document.getElementById("text1");
    const text2 = document.getElementById("text2");

    setInterval(function() {
        toggleTextVisibility(text1, text2);
    }, 3000); // Cambiar el valor de 3000 a la cantidad de tiempo en milisegundos deseada entre cambios
});

function toggleTextVisibility(text1, text2) {
    if (text1.classList.contains("active")) {
        text1.classList.remove("active");
        text2.classList.add("active");
    } else {
        text1.classList.add("active");
        text2.classList.remove("active");
    }
}
