// actualizar el precio
// Inicializa el precio seleccionado
var productos = [];
var productosPorPagina = 6; // Cambiado a 10 productos por página
var paginaActual = 1;
var productosFiltrados = productos; // Inicialmente, todos los productos están filtrados
var intervalId;

const baseUrl = 'https://grupolimpio-api.onrender.com';

function leerProducto() {
    fetch(baseUrl + '/selectServicios', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        productos = data;
        productosFiltrados = productos;
        var filtrocat = document.getElementById('categoria');
        filtrocat.innerHTML="";
        var opt2 = "Select";
        var el2 = document.createElement("option");
        el2.textContent = opt2;
        el2.value = "";
        filtrocat.appendChild(el2)
        for(var i = 0; i < data.length; i++) {
            var opt = data[i].nombre;
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            filtrocat.appendChild(el);
        }
        mostrarProductos(productosFiltrados, paginaActual);
        // console.log(productos[0].imagen1);
    })
    .catch(error => {
        alert(':('+error);
    });   
}
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
leerProducto();
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
    var categoriaSeleccionada = document.getElementById('categoria').value;
    var busqueda = document.querySelector('.search-bar').value;
    productosFiltrados = productos.filter(function (producto) {
        var coincideCategoria = categoriaSeleccionada === '' || producto.nombre === categoriaSeleccionada;
        var coincideBusqueda = busqueda === '' || busquedaProducto(busqueda).includes(producto);
        return coincideCategoria && coincideBusqueda;
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

    // Restablecer el contenido del elemento <p> asociado al precio
    var categoria = document.getElementById('categoria');
    var busqueda = document.querySelector('.search-bar'); // Obtener el cuadro de búsqueda
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
                <div class="card2" style="box-shadow: 0 0 1000px rgba(35, 192, 30, 0.2);" onclick="mostrarDetalle('${producto.id}', '${producto.nombre}', '${producto.imagen1}')">
                    <div class="row no-gutters">
                        <div class="col-md-6">
                            <img src="${producto.imagen1}" class="card-img2" alt="${producto.nombre}" style="object-fit: contain; height: 100%; width: 100%;">
                        </div>
                        <div class="col-md-6 d-flex align-items-center justify-content-center">
                            <div class="card-body2">
                                <p style="font-size: 20px; color: #008000; margin-bottom: 10px;"><i class="fas fa-medal" style="margin-left: 5px;"></i> Grupo Más Limpio</p>
                                <h5 class="card-title2" style="font-size: 15px; margin-bottom: 0; color: #000; font-weight: bold;">${producto.nombre}</h5>
                                <p class="card-text2" style="font-size: 12px;">${producto.descripcion}</p>
                                <a href="#" class="btn btn-primary" style="height: 100%; width: 100%; padding: 6px 0; margin-top: 5px; font-size: 1vw;">Contratar Servicio</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Agregar una tarjeta de producto vacía
            productoHTML = `<div class="card2"></div>`;
        }
        catalogoProductos.innerHTML += productoHTML;
    }
    mostrarBotonesPaginacion(productos, pagina);
}





// Funcion para mostrar detalles de los productos
function mostrarDetalle(id, nombre, imagen) {
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
            <img src="${productoSeleccionado.imagen2}" class="img-fluid mb-2 image-thumbnail" alt="Imagen 1" onclick="changeImage('${productoSeleccionado.imagen2}')">
            <img src="${productoSeleccionado.imagen3}" class="img-fluid mb-2 image-thumbnail" alt="Imagen 2" onclick="changeImage('${productoSeleccionado.imagen3}')">
        </div>
        <div class="col-lg-9 col-md-12">
            <div class="row justify-content-end">
                <div class="col-lg-6 col-md-12 mb-3 d-flex flex-column align-items-start">
                    <img src="${imagen}" class="img-fluid product-image" alt="${nombre}" id="mainImage">
                </div>
                <div class="col-lg-6 col-md-12 d-flex flex-column align-items-start">
                    <p style="font-size: 24px; color: #008000; margin-bottom: 20px;"><i class="fas fa-medal" style="margin-left: 5px;"></i> Grupo Más Limpio</p>
                    <h1 class="product-title" style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${nombre}</h1>
                    <a href="https://wa.me/50495840792" class="btn btn-success mb-2" style="width: 100%; height: 40px; background-color: rgba(38, 190, 0, 0.6);" onclick="event.stopPropagation();">Contratar servicio</a>
                    <button class="btn btn-danger" style="width: 100%; height: 40px; margin-bottom: 20px;" onclick="restoreContent()">Cancelar</button>
                    <div class="description" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px; width: 100%; border-radius: 10px; position: relative;">
                        <h2 style="position: absolute; top: 10px; left: 10px; background: rgba(38, 190, 0, 0.6); color: #fff; padding: 0 10px; font-weight: bold;">Descripción</h2>
                        <p style="margin-top: 40px; text-align: justify;">${productoSeleccionado.descripcion}</p>
                    </div>
                    <div class="benefits-features" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px; width: 100%; border-radius: 10px; position: relative;">
                        <h2 style="position: absolute; top: 10px; left: 10px; background: rgba(38, 190, 0, 0.6); color: #fff; padding: 0 10px; font-weight: bold;">Características</h2>
                        <p style="margin-top: 40px; text-align: justify;">${productoSeleccionado.caracteristicas}</p>
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