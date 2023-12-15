// actualizar el precio
var precio = document.getElementById('precio');
var precioSeleccionado = document.getElementById('precioSeleccionado');
// Inicializa el precio seleccionado
precioSeleccionado.innerHTML = "L. " + precio.value;
precio.oninput = function () {
    precioSeleccionado.innerHTML = "L. " + this.value;
}
const productos = [
    { id: 1234567, nombre: 'Servicio De Plomeria', precio: 15.99, marca: 'Plomeria', categoria: 'Servicio De Plomeria', imagen: 'img/11.jpg', img1: 'img/1.jpg', img2: 'img/2.jpg', cantidad: 31, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345678, nombre: 'Servicio De Electricidad', precio: 25.49, marca: 'Electricidad', categoria: 'Servicio De Electricidad', imagen: 'img/12.jpg', img1: 'img/3.jpg', img2: 'img/4.jpg', cantidad: 22, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3456789, nombre: 'Servicio De Jardineria', precio: 100.90, marca: 'Jardineria', categoria: 'Servicio De Jardineria', imagen: 'img/13.jpg', img1: 'img/5.jpg', img2: 'img/6.jpg', cantidad: 53, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4567890, nombre: 'Servicio De Carpinteria', precio: 300.00, marca: 'Carpinteria', categoria: 'Servicio De Carpinteria', imagen: 'img/14.jpg', img1: 'img/7.jpg', img2: 'img/8.jpg', cantidad: 44, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5678901, nombre: 'Servicio De Cerrajeria', precio: 200.00, marca: 'Cerrajeria', categoria: 'Servicio De Cerrajeria', imagen: 'img/15.jpg', img1: 'img/9.jpg', img2: 'img/1.jpg', cantidad: 25, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 6789012, nombre: 'Servicio De Pintura General', precio: 22.99, marca: 'Pintura General', categoria: 'Servicio De Pintura General', imagen: 'img/16.jpg', img1: 'img/2.jpg', img2: 'img/3.jpg', cantidad: 36, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 7890123, nombre: 'Servicio De Mantenimiento Computadoras', precio: 12.99, marca: 'Informatica', categoria: 'Servicio De Mantenimiento Computadoras', imagen: 'img/17.jpg', img1: 'img/4.jpg', img2: 'img/5.jpg', cantidad: 67, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 8901234, nombre: 'Servicio De Aires Acondicionados', precio: 400.00, marca: 'Aires Acondicionados', categoria: 'Servicio De Aires Acondicionados', imagen: 'img/18.jpg', img1: 'img/6.jpg', img2: 'img/7.jpg', cantidad: 28, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 9012345, nombre: 'Servicio De Fumigacion', precio: 400.00, marca: 'Fumigacion', categoria: 'Servicio De Fumigacion', imagen: 'img/19.jpg', img1: 'img/8.jpg', img2: 'img/9.jpg', cantidad: 49, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234501, nombre: 'Servicio De Champuseado Muebles', precio: 240.00, marca: 'Champuseado Muebles', categoria: 'Servicio De Champuseado Muebles', imagen: 'img/20.jpg', img1: 'img/1.jpg', img2: 'img/2.jpg', cantidad: 50, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345012, nombre: 'Servicio De Soldadura', precio: 111.49, marca: 'Soldadura', categoria: 'Servicio De Soldadura', imagen: 'img/21.jpg', img1: 'img/3.jpg', img2: 'img/4.jpg', cantidad: 31, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3450123, nombre: 'Servicio De Instalacion Extintores', precio: 935.99, marca: 'Instalacion Extintores', categoria: 'Servicio De Instalacion Extintores', imagen: 'img/22.jpg', img1: 'img/6.jpg', img2: 'img/22.jpg', cantidad: 22, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4501234, nombre: 'Servicio De Mudanza', precio: 319.99, marca: 'Mudanza', categoria: 'Servicio De Mudanza', imagen: 'img/23.jpg', cantidad: 63, img1: 'img/7.jpg', img2: 'img/8.jpg', descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5012345, nombre: 'Servicio De Ipersonal De Limpieza', precio: 726.49, marca: 'Ipersonal De Limpieza', categoria: 'Servicio De Ipersonal De Limpieza', imagen: 'img/24.jpg', img1: 'img/9.jpg', img2: 'img/1.jpg', cantidad: 44, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234590, nombre: 'Servicio De Gruas Y Remolques', precio: 614.99, marca: 'Gruas Y Remolques', categoria: 'Servicio De Gruas Y Remolques', imagen: 'img/25.jpg', img1: 'img/2.jpg', img2: 'img/3.jpg', cantidad: 35, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.', beneficiosCaracteristicas: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' }
];
var productosPorPagina = 6; // Cambiado a 10 productos por página
var paginaActual = 1;
var productosFiltrados = productos; // Inicialmente, todos los productos están filtrados
var intervalId;
// Funciones de inicialización y filtrado
function inicializarCatalogo() {
    mostrarProductos(productosFiltrados, paginaActual);
}
// Asumiendo que tienes una variable 'productos' que contiene todos tus productos
// Función para filtrar productos por nombre
function busquedaProducto(query) {
    var inputBusqueda = query.toLowerCase();
    return productos.filter(function (producto) {
        var nombre = producto.nombre.toLowerCase();
        return nombre.includes(inputBusqueda);
    });
}
// Función para mostrar productos en la sección de catálogo
function mostrarProductos(productos, pagina) {
    // Aquí va tu código para mostrar los productos en la página
}
// Obtener la búsqueda del parámetro de la URL
var urlParams = new URLSearchParams(window.location.search);
var busqueda = urlParams.get('nombre');
// Establecer el valor del cuadro de búsqueda
document.querySelector('.search-bar').value = busqueda;
var productosFiltrados;
if (busqueda === null || busqueda === '') {
    // Si la búsqueda está vacía o es null, mostrar todos los productos
    productosFiltrados = productos;
} else {
    // Si no, filtrar los productos por nombre
    productosFiltrados = busquedaProducto(busqueda);
}
// Mostrar los productos filtrados en la sección de catálogo
mostrarProductos(productosFiltrados, paginaActual);
// Evento input del cuadro de búsqueda
document.querySelector('.search-bar').addEventListener('input', function () {
    var busqueda = document.querySelector('.search-bar').value;
    var productosFiltrados;
    if (busqueda === '') {
        // Si la búsqueda está vacía, mostrar todos los productos
        productosFiltrados = productos;
    } else {
        // Si no, filtrar los productos por nombre
        productosFiltrados = busquedaProducto(busqueda);
    }
    // Mostrar los productos filtrados en la sección de catálogo
    mostrarProductos(productosFiltrados, paginaActual);
});
//filtros
function aplicarFiltros() {
    var precioSeleccionado = parseFloat(document.getElementById('precio').value);
    var marcaSeleccionada = document.getElementById('marca').value;
    var categoriaSeleccionada = document.getElementById('categoria').value;
    var busqueda = document.querySelector('.search-bar').value;
    productosFiltrados = productos.filter(function (producto) {
        var coincidePrecio = producto.precio <= precioSeleccionado;
        var coincideMarca = marcaSeleccionada === '' || producto.marca === marcaSeleccionada;
        var coincideCategoria = categoriaSeleccionada === '' || producto.categoria.toLowerCase().trim() === categoriaSeleccionada.toLowerCase().trim();
        var coincideBusqueda = busqueda === '' || busquedaProducto(busqueda).includes(producto);
        return coincidePrecio && coincideMarca && coincideCategoria && coincideBusqueda;
    });
    // Reiniciar la página actual al aplicar filtros
    paginaActual = 1;
    // Mostrar los productos filtrados en la sección de catálogo
    mostrarProductos(productosFiltrados, paginaActual);
    // Actualizar el texto en el encabezado
    var texto = categoriaSeleccionada !== '' ? categoriaSeleccionada : 'Servicios';
    document.querySelector('h1').textContent = texto;
}
function limpiarFiltros() {
    // Restablecer el valor del rango
    var precio = document.getElementById('precio');
    precio.value = 1001;
    // Restablecer el contenido del elemento <p> asociado al precio
    var precioSeleccionado = document.getElementById('precioSeleccionado');
    precioSeleccionado.innerHTML = "L. " + precio.value;
    var marca = document.getElementById('marca');
    var categoria = document.getElementById('categoria');
    var busqueda = document.querySelector('.search-bar'); // Obtener el cuadro de búsqueda
    marca.value = '';
    categoria.value = '';
    busqueda.value = ''; // Restablecer el valor del cuadro de búsqueda
    // Mostrar todos los productos
    productosFiltrados = productos;
    // Actualizar la página de productos
    mostrarProductos(productosFiltrados, paginaActual);
    // Restablecer el texto en la franja a 'Catálogo'
    document.getElementById('catalogoFiltro').textContent = 'Servicios';
}
// Funciones para cambiar la cantidad

// Funciones para mostrar productos y detalles
function mostrarProductos(productos, pagina) {
    // Cerrar el detalle del producto
    if (typeof restoreContent === 'function') {
        restoreContent();
    }
    var catalogoProductos = document.getElementById('catalogoProductos');
    catalogoProductos.innerHTML = '';
    var inicio = (pagina - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;
    for (var i = inicio; i < fin; i++) {
        var productoHTML;
        if (i < productos.length) {
            var producto = productos[i];
            productoHTML = `
                <div class="card" style="box-shadow: 0 0 1000px rgba(35, 192, 30, 0.2);" onclick="mostrarDetalle(${producto.id}, '${producto.nombre}', '${producto.imagen}', ${producto.cantidad})">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <img src="${producto.imagen}" class="card-img" alt="${producto.nombre}" style="object-fit: contain; height: 100%; width: 100%;">
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <div class="card-body text-center">
                                <p style="font-size: 24px; color: #008000; margin-bottom: 10px;"><i class="fas fa-medal" style="margin-left: 5px;"></i> Grupo Más Limpio</p>
                                <h5 class="card-title" style="font-size: 20px; margin-bottom: 0; color: #000; font-weight: bold;">${producto.nombre}</h5>
                                <p class="card-text" style="font-size: 12px;">${producto.descripcion}</p>
                                <a href="#" class="btn btn-primary" style="height: 100%; width: 100%; padding: 6px 0; margin-top: 5px; font-size: 1vw;">Contratar Servicio</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Agregar una tarjeta de producto vacía
            productoHTML = `<div class="card invisible"></div>`;
        }
        catalogoProductos.innerHTML += productoHTML;
    }
    mostrarBotonesPaginacion(productos, pagina);
}
function mostrarProductos(productos, pagina) {
    // Cerrar el detalle del producto
    if (typeof restoreContent === 'function') {
        restoreContent();
    }
    var catalogoProductos = document.getElementById('catalogoProductos');
    catalogoProductos.innerHTML = '';
    var inicio = (pagina - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;
    for (var i = inicio; i < fin; i++) {
        var productoHTML;
        if (i < productos.length) {
            var producto = productos[i];
            productoHTML = `
                <div class="card" style="box-shadow: 0 0 1000px rgba(35, 192, 30, 0.2);" onclick="mostrarDetalle(${producto.id}, '${producto.nombre}', '${producto.imagen}', ${producto.cantidad})">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <img src="${producto.imagen}" class="card-img" alt="${producto.nombre}" style="object-fit: contain; height: 100%; width: 100%;">
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <div class="card-body text-center">
                                <p style="font-size: 20px; color: #008000; margin-bottom: 10px;"><i class="fas fa-medal" style="margin-left: 5px;"></i> Grupo Más Limpio</p>
                                <h5 class="card-title" style="font-size: 15px; margin-bottom: 0; color: #000; font-weight: bold;">${producto.nombre}</h5>
                                <p class="card-text" style="font-size: 12px;">${producto.descripcion}</p>
                                <a href="#" class="btn btn-primary" style="height: 100%; width: 100%; padding: 6px 0; margin-top: 5px; font-size: 1vw;">Contratar Servicio</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Agregar una tarjeta de producto vacía
            productoHTML = `<div class="card invisible"></div>`;
        }
        catalogoProductos.innerHTML += productoHTML;
    }
    mostrarBotonesPaginacion(productos, pagina);
}





// Funcion para mostrar detalles de los productos
function mostrarDetalle(id, nombre, imagen, maxCantidad) {
    var productoSeleccionado = productos.find(p => p.id === id); // Encuentra el producto por id
    var mainContainer = document.getElementById('catalogoProductos');
    var filtersContainer = document.querySelector('.col-md-3');
    var paginationContainer = document.getElementById('botones');
    var publicidad = document.querySelector('.publicidad'); // Obtén el elemento de publicidad
    var currentContent = mainContainer.innerHTML;
    var currentFilters = filtersContainer.innerHTML;
    var currentPagination = paginationContainer.innerHTML;
    var newContent = `
    <div class="row justify-content-center" style="margin-top: 50px;">
        <div class="col-lg-3 col-md-12 mb-3 d-flex flex-lg-column flex-md-row align-items-center" style="flex: 0 0 300px;"> <!-- Ajuste del tamaño fijo -->
            <img src="${imagen}" class="img-fluid mb-2 image-thumbnail" alt="${nombre}" onclick="changeImage('${imagen}')">
            <img src="${productoSeleccionado.img1}" class="img-fluid mb-2 image-thumbnail" alt="Imagen 1" onclick="changeImage('${productoSeleccionado.img1}')">
            <img src="${productoSeleccionado.img2}" class="img-fluid mb-2 image-thumbnail" alt="Imagen 2" onclick="changeImage('${productoSeleccionado.img2}')">
        </div>
        <div class="col-lg-9 col-md-12">
            <div class="row justify-content-end">
                <div class="col-lg-6 col-md-12 mb-3 d-flex flex-column align-items-start">
                    <img src="${imagen}" class="img-fluid product-image" alt="${nombre}" id="mainImage">
                </div>
                <div class="col-lg-6 col-md-12 d-flex flex-column align-items-start">
                    <p style="font-size: 24px; color: #008000; margin-bottom: 20px;"><i class="fas fa-medal" style="margin-left: 5px;"></i> Grupo Más Limpio</p>
                    <h1 class="product-title" style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${nombre}</h1>
                    <a href="#" class="btn btn-success mb-2" style="width: 100%; height: 40px; background-color: rgba(38, 190, 0, 0.6);" onclick="event.stopPropagation();">Contratar servicio</a>
                    <button class="btn btn-danger" style="width: 100%; height: 40px; margin-bottom: 20px;" onclick="restoreContent()">Cancelar</button>
                    <div class="description" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px; width: 100%; border-radius: 10px; position: relative;">
                        <h2 style="position: absolute; top: 10px; left: 10px; background: rgba(38, 190, 0, 0.6); color: #fff; padding: 0 10px; font-weight: bold;">Descripción</h2>
                        <p style="margin-top: 40px; text-align: justify;">${productoSeleccionado.descripcion}</p>
                    </div>
                    <div class="benefits-features" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px; width: 100%; border-radius: 10px; position: relative;">
                        <h2 style="position: absolute; top: 10px; left: 10px; background: rgba(38, 190, 0, 0.6); color: #fff; padding: 0 10px; font-weight: bold;">Beneficios y Características</h2>
                        <p style="margin-top: 40px; text-align: justify;">${productoSeleccionado.beneficiosCaracteristicas}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    document.querySelector('h1').textContent = nombre;
    filtersContainer.style.display = 'none';
    paginationContainer.style.display = 'none';
    publicidad.style.display = 'block'; // Muestra la publicidad
    mainContainer.style.margin = '0 auto'; // Ajuste de margen para centrar el contenido
    mainContainer.innerHTML = newContent;
    window.restoreContent = function () {
        filtersContainer.style.display = 'block';
        paginationContainer.style.display = 'block';
        publicidad.style.display = 'none'; // Oculta la publicidad
        mainContainer.style.margin = '0'; // Restaurar el margen original
        mainContainer.innerHTML = currentContent;
        document.querySelector('h1').textContent = "Servicios"; // Actualiza el encabezado a "Servicios"
        document.getElementById('formulario-section').style.display = 'none'; // Oculta el formulario de contacto
    }
    window.changeImage = function (newImage) {
        document.querySelector('#mainImage').src = newImage;
    }
    var images = document.querySelectorAll('.image-thumbnail');
    images.forEach(function (image) {
        image.style.width = '100px';
        image.style.height = '100px';
        image.style.objectFit = 'contain';
        image.style.borderRadius = '5px';
        image.style.border = '3px solid #D3D3D3';
        image.style.cursor = 'pointer';
        image.onmouseover = function () {
            image.style.border = '3px solid #23c01e';
        };
        image.onmouseout = function () {
            image.style.border = '3px solid #D3D3D3';
        };
        image.onclick = function () {
            images.forEach(function (img) {
                img.style.border = '3px solid #D3D3D3';
            });
            image.style.border = '3px solid #23c01e';
            changeImage(image.src);
        }
    });
    var mainImage = document.querySelector('#mainImage');
    mainImage.style.width = '900px';
    mainImage.style.height = '600px';
    mainImage.style.objectFit = 'contain';

    // Aquí es donde mostramos el formulario de contacto
    document.getElementById('formulario-section').style.display = 'block';
}



// Funciones para la paginación
function mostrarBotonesPaginacion(productos, pagina) {
    var botones = document.getElementById('botones');
    botones.innerHTML = '';
    var numeroPaginas = Math.ceil(productos.length / productosPorPagina);
    for (var i = 1; i <= numeroPaginas; i++) {
        var botonHTML = `<button class="btn btn-primary" onclick="cambiarPagina(${i})">${i}</button>`;
        botones.innerHTML += botonHTML;
    }
}
function cambiarPagina(pagina) {
    paginaActual = pagina;
    mostrarProductos(productosFiltrados, paginaActual);
}
// Inicializar catálogo al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    inicializarCatalogo();
});