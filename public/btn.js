document.addEventListener("DOMContentLoaded", function () {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");

    window.addEventListener("scroll", function () {
        // Muestra el botón cuando el usuario baja más de 300px
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    });

    scrollToTopBtn.addEventListener("click", function () {
        // Hace scroll suavemente hacia arriba
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
