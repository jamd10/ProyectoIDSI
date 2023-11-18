/* JS */
const navLinks = document.querySelector('.nav-links');

function onToggleMenu(e) {
    e.name = e.name === 'menu' ? 'close' : 'menu';
    navLinks.classList.toggle('top-[9%]'); // Ajusta según sea necesario
}

window.addEventListener("load", function () {
    const loader = document.getElementById("loader");
    setTimeout(function () {
        loader.classList.add("fadeOut");
    }, 1000);
});

window.addEventListener('DOMContentLoaded', (event) => {
    const buttons = document.querySelectorAll('.my-submenu-nav a');

    buttons.forEach((button, index) => {
        button.addEventListener('mouseover', () => {
            const animation = document.querySelector('.my-submenu-nav .animation');
            const newPosition = button.offsetLeft;
            animation.style.left = `${newPosition}px`;
            animation.style.width = `${button.offsetWidth}px`;
        });

        button.addEventListener('mouseout', () => {
            const animation = document.querySelector('.my-submenu-nav .animation');
            animation.style.left = '';
            animation.style.width = '';
        });
    });
});
