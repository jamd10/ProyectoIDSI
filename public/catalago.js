// actualizar el precio
var precio = document.getElementById('precio');
var precioSeleccionado = document.getElementById('precioSeleccionado');

// Inicializa el precio seleccionado
precioSeleccionado.innerHTML = "L. " + precio.value;

precio.oninput = function () {
    precioSeleccionado.innerHTML = "L. " + this.value;
}

const productos = [
    { id: 1234567, nombre: 'Limpiador de Baños FreshClean', precio: 15.99, marca: 'CleanStar', categoria: 'Baños', imagen: 'img/1.png', cantidad: 31, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345678, nombre: 'Detergente Lavanda Premium', precio: 25.49, marca: 'PureWash', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 22, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3456789, nombre: 'Escoba de Microfibra Ultra Limpia', precio: 100.90, marca: 'SweepPro', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 53, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4567890, nombre: 'Desinfectante PowerGuard', precio: 300.00, marca: 'Guardian', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 44, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5678901, nombre: 'Toallitas Desinfectantes BioShield', precio: 200.00, marca: 'BioDefense', categoria: 'Bioseguridad', imagen: 'img/5.png', cantidad: 25, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 6789012, nombre: 'Gel de Manos Suave y Fresco', precio: 22.99, marca: 'SoftCare', categoria: 'Cuidado Personal', imagen: 'img/6.png', cantidad: 36, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 7890123, nombre: 'Bolsas de Basura Resistentes EcoPlast', precio: 12.99, marca: 'EcoSolutions', categoria: 'Productos Plásticos', imagen: 'img/7.png', cantidad: 67, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 8901234, nombre: 'Limpiador de Ventanas CrystalView', precio: 400.00, marca: 'ClearVision', categoria: 'Herramientas de limpieza', imagen: 'img/8.png', cantidad: 28, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 9012345, nombre: 'Eliminador de Olores FreshAir', precio: 400.00, marca: 'AromaFresh', categoria: 'Baños', imagen: 'img/1.png', cantidad: 49, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234501, nombre: 'Detergente Hipoalergénico PureGentle', precio: 240.00, marca: 'SensitiveCare', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 50, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345012, nombre: 'Esponja Multiusos PowerScrub', precio: 111.49, marca: 'ScrubMaster', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 31, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3450123, nombre: 'Toallitas Limpiadoras GentleTouch', precio: 935.99, marca: 'GentleClean', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 22, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4501234, nombre: 'Spray Antibacterial BioGuard', precio: 319.99, marca: 'BioShield', categoria: 'Bioseguridad', imagen: 'img/5.png', cantidad: 63, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5012345, nombre: 'Jabón Líquido AloeFresh', precio: 726.49, marca: 'NatureSoothe', categoria: 'Cuidado Personal', imagen: 'img/6.png', cantidad: 44, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234590, nombre: 'Contenedores de Almacenamiento EcoBox', precio: 614.99, marca: 'EcoStorage', categoria: 'Productos Plásticos', imagen: 'img/7.png', cantidad: 35, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345901, nombre: 'Limpiador de Superficies MultiClean', precio: 529.99, marca: 'SurfacePro', categoria: 'Herramientas de limpieza', imagen: 'img/8.png', cantidad: 56, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3459012, nombre: 'Desodorante Ambiental FreshBreeze', precio: 417.99, marca: 'AirScent', categoria: 'Baños', imagen: 'img/1.png', cantidad: 27, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4590123, nombre: 'Suavizante de Ropa DelicateSoft', precio: 323.49, marca: 'SoftLux', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 48, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5901234, nombre: 'Cepillo de Limpieza Profunda DeepClean', precio: 213.49, marca: 'ProScrub', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 39, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 9012345, nombre: 'Toallitas Desinfectantes CitrusGuard', precio: 131.99, marca: 'CitrusShield', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 60, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234590, nombre: 'Gel de Ducha Relajante SpaSensation', precio: 121.99, marca: 'SpaLux', categoria: 'Cuidado Personal', imagen: 'img/5.png', cantidad: 51, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345901, nombre: 'Bolsas de Basura Biodegradables GreenBag', precio: 17.49, marca: 'EcoGreen', categoria: 'Productos Plásticos', imagen: 'img/6.png', cantidad: 32, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3459012, nombre: 'Limpiavidrios Profesional ClearMaster', precio: 1.00, marca: 'CrystalClear', categoria: 'Herramientas de limpieza', imagen: 'img/7.png', cantidad: 43, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4590123, nombre: 'Aromatizador de Ambientes FreshScent', precio: 2.99, marca: 'AromaBliss', categoria: 'Baños', imagen: 'img/8.png', cantidad: 24, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 5901234, nombre: 'Detergente para Ropa WhiteLux', precio: 9.99, marca: 'LuxClean', categoria: 'Lavandería', imagen: 'img/1.png', cantidad: 55, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 9012345, nombre: 'Cepillo de Esponja Multiuso SpongeMaster', precio: 3.99, marca: 'SpongePro', categoria: 'Herramientas de limpieza', imagen: 'img/2.png', cantidad: 3, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 1234567, nombre: 'Toallitas Antibacterianas AquaGuard', precio: 15.99, marca: 'AquaShield', categoria: 'Desinfectante', imagen: 'img/3.png', cantidad: 66, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 2345678, nombre: 'Jabón de Manos Vainilla SilkTouch', precio: 333.49, marca: 'SilkCare', categoria: 'Cuidado Personal', imagen: 'img/4.png', cantidad: 47, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 3456789, nombre: 'Contenedores de Almacenamiento EcoBin', precio: 149.99, marca: 'EcoStorage', categoria: 'Productos Plásticos', imagen: 'img/5.png', cantidad: 38, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    { id: 4567890, nombre: 'Limpiador Multiusos EcoClean', precio: 99.99, marca: 'EcoSolutions', categoria: 'Baños', imagen: 'img/6.png', cantidad: 59, descripcion: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam, at earum similique voluptates accusantium voluptatum sit, facilis sunt, perspiciatis beatae est eveniet ex iste architecto reiciendis sequi error dolores laboriosam.' },
    // ... (resto de los productos con sus IDs y cantidades)
];
var productosPorPagina = 10; // Cambiado a 10 productos por página
var paginaActual = 1;
var productosFiltrados = productos; // Inicialmente, todos los productos están filtrados
var intervalId;

// Funciones de inicialización y filtrado
function inicializarCatalogo() {
    mostrarProductos(productosFiltrados, paginaActual);
}
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
if (busqueda === '') {
    // Si la búsqueda está vacía, mostrar todos los productos
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
    var texto = categoriaSeleccionada !== '' ? categoriaSeleccionada : 'Catálogo';
    document.querySelector('h1').textContent = texto;
}

function aplicarFiltros() {
    var precioSeleccionado = parseFloat(document.getElementById('precio').value);
    var marcaSeleccionada = document.getElementById('marca').value;
    var categoriaSeleccionada = document.getElementById('categoria').value;

    productosFiltrados = productos.filter(function (producto) {
        var coincidePrecio = producto.precio <= precioSeleccionado;
        var coincideMarca = marcaSeleccionada === '' || producto.marca === marcaSeleccionada;
        var coincideCategoria = categoriaSeleccionada === '' || producto.categoria.toLowerCase().trim() === categoriaSeleccionada.toLowerCase().trim();

        return coincidePrecio && coincideMarca && coincideCategoria;
    });

    // Reiniciar la página actual al aplicar filtros
    paginaActual = 1;

    // Mostrar los productos filtrados en la sección de catálogo
    mostrarProductos(productosFiltrados, paginaActual);

    // Actualizar el texto en el encabezado
    var texto = categoriaSeleccionada !== '' ? categoriaSeleccionada : 'Catálogo';
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

    marca.value = '';
    categoria.value = '';

    // Mostrar todos los productos
    productosFiltrados = productos;

    // Actualizar la página de productos
    mostrarProductos(productosFiltrados, paginaActual);

    // Restablecer el texto en la franja a 'Catálogo'
    document.getElementById('catalogoFiltro').textContent = 'Catálogo';
}


// Funciones para cambiar la cantidad
function cambiarCantidad(id, change, maxCantidad) {
    var spinner = document.getElementById('spinner' + id);
    var newValue = parseInt(spinner.textContent) + change;
    if (newValue >= 1 && newValue <= maxCantidad) {
        spinner.textContent = newValue;
    }
}

function cambiarCantidadDetalle(id, cambio, maxCantidadDetalle) {
    var spinnerDetalle = document.getElementById('spinnerDetalle' + id);
    var nuevoValor = parseInt(spinnerDetalle.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidadDetalle) {
        spinnerDetalle.textContent = nuevoValor;
    }
}

// Funciones para mostrar productos y detalles
function mostrarProductos(productos, pagina) {
    var catalogoProductos = document.getElementById('catalogoProductos');
    catalogoProductos.innerHTML = '';

    var inicio = (pagina - 1) * productosPorPagina;
    var fin = inicio + productosPorPagina;

    for (var i = inicio; i < fin; i++) {
        var productoHTML;
        if (i < productos.length) {
            var producto = productos[i];
            productoHTML = `
                <div class="card" style="box-shadow: 0 0 10px rgba(35, 192, 30, 0.2);" onclick="mostrarDetalle(${producto.id}, '${producto.nombre}', '${producto.imagen}', ${producto.precio.toFixed(2)}, ${producto.cantidad})">
                    <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="object-fit: contain; height: 200px; width: 100%;">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="font-size: 16px; margin-bottom: 0; color: #000; font-weight: bold;">${producto.nombre}</h5>
                        <p class="card-text" style="color: #ff8c00; margin-bottom: 5px; margin-top: 5px; font-size: 18px; font-weight: bold;">Precio: L. ${producto.precio.toFixed(2)}</p>
                        <div class="input-group mb-1" style="margin-bottom: 5px; margin-top: 5px;">
                            <button class="btn btn-outline-success" type="button" style="height: 30px; font-size: 12px;" onclick="event.stopPropagation(); cambiarCantidad(${producto.id}, -1, ${producto.cantidad})">-</button>
                            <span class="form-control text-center" id="spinner${producto.id}" style="height: 30px; padding: 0; margin: 0 5px;">1</span>
                            <button class="btn btn-outline-success" type="button" style="height: 30px; font-size: 12px;" onclick="event.stopPropagation(); cambiarCantidad(${producto.id}, 1, ${producto.cantidad})">+</button>
                        </div>
                        <a href="#" class="btn btn-primary" style="width: 100%; padding: 5px 0; margin-top: 5px;">Añadir al carrito</a>
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
function mostrarDetalle(id, nombre, imagen, precio, maxCantidad) {
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
            <img src="img/6.png" class="img-fluid mb-2 image-thumbnail" alt="Imagen 1" onclick="changeImage('img/6.png')">
            <img src="img/1.png" class="img-fluid mb-2 image-thumbnail" alt="Imagen 2" onclick="changeImage('img/1.png')">
        </div>
        <div class="col-lg-9 col-md-12">
            <div class="row justify-content-end">
                <div class="col-lg-6 col-md-12 mb-3 d-flex flex-column align-items-start">
                    <img src="${imagen}" class="img-fluid product-image" alt="${nombre}" id="mainImage">
                </div>
                <div class="col-lg-6 col-md-12 d-flex flex-column align-items-start">
                    <p style="font-size: 24px; margin-bottom: 20px;font-weight: bold; color: gray;">${id}</p>
                    <h1 class="product-title" style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${nombre}</h1>
                    <p style="font-size: 30px; color: #ff8c00; margin-bottom: 20px;">Precio: L. ${precio.toFixed(2)}</p>
                    <div class="quantity-control mb-3 d-flex align-items-center" style="width: ${nombre.length * 15}px; height: 60px; margin-bottom: 20px;">
                        <button class="btn btn-outline-success" type="button" id="decrementButton" onclick="event.stopPropagation(); cambiarCantidadDetalle(${id}, -1, ${maxCantidad})" style="background-color: white;">-</button>
                        <span class="form-control text-center border-success" id="spinnerDetalle${id}" style="background-color: white;">1</span>
                        <button class="btn btn-outline-success" type="button" id="incrementButton" onclick="event.stopPropagation(); cambiarCantidadDetalle(${id}, 1, ${maxCantidad})" style="background-color: white);">+</button>
                    </div>
                    <a href="#" class="btn btn-success mb-2" style="width: ${nombre.length * 15}px; height: 40px; background-color: rgba(38, 190, 0, 0.6);" onclick="event.stopPropagation();">Añadir al carrito</a>
                    <button class="btn btn-danger" style="width: ${nombre.length * 15}px; height: 40px; margin-bottom: 20px;" onclick="restoreContent()">Cancelar</button>
                    <div class="description" style="border: 1px solid rgba(0, 0, 0, 0.1); padding: 10px; width: ${nombre.length * 15}px; border-radius: 10px; position: relative;">
                        <h2 style="position: absolute; top: 10px; left: 10px; background: rgba(38, 190, 0, 0.6); color: #fff; padding: 0 10px; font-weight: bold;">Descripción</h2>
                        <p style="margin-top: 40px; text-align: justify;">${productoSeleccionado.descripcion}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

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

    var spinner = document.querySelector('.quantity-control .form-control');
    var button = document.querySelector('.quantity-control .btn');

    spinner.style.width = button.offsetWidth + 'px';
    spinner.style.height = button.offsetHeight + 'px';

    spinner.style.display = 'flex';
    spinner.style.justifyContent = 'center';
    spinner.style.alignItems = 'center';

    var decrementButton = document.getElementById('decrementButton');
    var incrementButton = document.getElementById('incrementButton');
    decrementButton.style.width = spinner.offsetWidth + 'px';
    decrementButton.style.height = spinner.offsetHeight + 'px';
    incrementButton.style.width = spinner.offsetWidth + 'px';
    incrementButton.style.height = spinner.offsetHeight + 'px';

    decrementButton.style.display = 'flex';
    decrementButton.style.justifyContent = 'center';
    decrementButton.style.alignItems = 'center';
    incrementButton.style.display = 'flex';
    incrementButton.style.justifyContent = 'center';
    incrementButton.style.alignItems = 'center';

    var quantityControl = document.querySelector('.quantity-control');
    quantityControl.style.width = (button.offsetWidth * 3) + 'px';

    var addToCartButton = document.querySelector('.btn.btn-success');
    var cancelButton = document.querySelector('.btn.btn-danger');
    addToCartButton.style.width = '100%';
    cancelButton.style.width = '100%';

    if (window.innerWidth <= 768) {
        mainContainer.style.marginBottom = '50px';
    }

    var descriptionCard = document.querySelector('.description');
    descriptionCard.style.width = '100%';
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
