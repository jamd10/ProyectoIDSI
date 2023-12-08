// actualizar el precio
var precio = document.getElementById('precio');
var precioSeleccionado = document.getElementById('precioSeleccionado');

// Inicializa el precio seleccionado
precioSeleccionado.innerHTML = "L. " + precio.value;

precio.oninput = function () {
    precioSeleccionado.innerHTML = "L. " + this.value;
}

const productos = [
    { id: 1234567, nombre: 'Limpiador de Baños FreshClean', precio: 15.99, marca: 'CleanStar', categoria: 'Baños', imagen: 'img/1.png', cantidad: 31 },
    { id: 2345678, nombre: 'Detergente Lavanda Premium', precio: 25.49, marca: 'PureWash', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 22 },
    { id: 3456789, nombre: 'Escoba de Microfibra Ultra Limpia', precio: 100.90, marca: 'SweepPro', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 53 },
    { id: 4567890, nombre: 'Desinfectante PowerGuard', precio: 300.00, marca: 'Guardian', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 44 },
    { id: 5678901, nombre: 'Toallitas Desinfectantes BioShield', precio: 200.00, marca: 'BioDefense', categoria: 'Bioseguridad', imagen: 'img/5.png', cantidad: 25 },
    { id: 6789012, nombre: 'Gel de Manos Suave y Fresco', precio: 22.99, marca: 'SoftCare', categoria: 'Cuidado Personal', imagen: 'img/6.png', cantidad: 36 },
    { id: 7890123, nombre: 'Bolsas de Basura Resistentes EcoPlast', precio: 12.99, marca: 'EcoSolutions', categoria: 'Productos Plásticos', imagen: 'img/7.png', cantidad: 67 },
    { id: 8901234, nombre: 'Limpiador de Ventanas CrystalView', precio: 400.00, marca: 'ClearVision', categoria: 'Herramientas de limpieza', imagen: 'img/8.png', cantidad: 28 },
    { id: 9012345, nombre: 'Eliminador de Olores FreshAir', precio: 400.00, marca: 'AromaFresh', categoria: 'Baños', imagen: 'img/1.png', cantidad: 49 },
    { id: 1234501, nombre: 'Detergente Hipoalergénico PureGentle', precio: 240.00, marca: 'SensitiveCare', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 50 },
    { id: 2345012, nombre: 'Esponja Multiusos PowerScrub', precio: 111.49, marca: 'ScrubMaster', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 31 },
    { id: 3450123, nombre: 'Toallitas Limpiadoras GentleTouch', precio: 935.99, marca: 'GentleClean', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 22 },
    { id: 4501234, nombre: 'Spray Antibacterial BioGuard', precio: 319.99, marca: 'BioShield', categoria: 'Bioseguridad', imagen: 'img/5.png', cantidad: 63 },
    { id: 5012345, nombre: 'Jabón Líquido AloeFresh', precio: 726.49, marca: 'NatureSoothe', categoria: 'Cuidado Personal', imagen: 'img/6.png', cantidad: 44 },
    { id: 1234590, nombre: 'Contenedores de Almacenamiento EcoBox', precio: 614.99, marca: 'EcoStorage', categoria: 'Productos Plásticos', imagen: 'img/7.png', cantidad: 35 },
    { id: 2345901, nombre: 'Limpiador de Superficies MultiClean', precio: 529.99, marca: 'SurfacePro', categoria: 'Herramientas de limpieza', imagen: 'img/8.png', cantidad: 56 },
    { id: 3459012, nombre: 'Desodorante Ambiental FreshBreeze', precio: 417.99, marca: 'AirScent', categoria: 'Baños', imagen: 'img/1.png', cantidad: 27 },
    { id: 4590123, nombre: 'Suavizante de Ropa DelicateSoft', precio: 323.49, marca: 'SoftLux', categoria: 'Lavandería', imagen: 'img/2.png', cantidad: 48 },
    { id: 5901234, nombre: 'Cepillo de Limpieza Profunda DeepClean', precio: 213.49, marca: 'ProScrub', categoria: 'Herramientas de limpieza', imagen: 'img/3.png', cantidad: 39 },
    { id: 9012345, nombre: 'Toallitas Desinfectantes CitrusGuard', precio: 131.99, marca: 'CitrusShield', categoria: 'Desinfectante', imagen: 'img/4.png', cantidad: 60 },
    { id: 1234590, nombre: 'Gel de Ducha Relajante SpaSensation', precio: 121.99, marca: 'SpaLux', categoria: 'Cuidado Personal', imagen: 'img/5.png', cantidad: 51 },
    { id: 2345901, nombre: 'Bolsas de Basura Biodegradables GreenBag', precio: 17.49, marca: 'EcoGreen', categoria: 'Productos Plásticos', imagen: 'img/6.png', cantidad: 32 },
    { id: 3459012, nombre: 'Limpiavidrios Profesional ClearMaster', precio: 1.00, marca: 'CrystalClear', categoria: 'Herramientas de limpieza', imagen: 'img/7.png', cantidad: 43 },
    { id: 4590123, nombre: 'Aromatizador de Ambientes FreshScent', precio: 2.99, marca: 'AromaBliss', categoria: 'Baños', imagen: 'img/8.png', cantidad: 24 },
    { id: 5901234, nombre: 'Detergente para Ropa WhiteLux', precio: 9.99, marca: 'LuxClean', categoria: 'Lavandería', imagen: 'img/1.png', cantidad: 55 },
    { id: 9012345, nombre: 'Cepillo de Esponja Multiuso SpongeMaster', precio: 3.99, marca: 'SpongePro', categoria: 'Herramientas de limpieza', imagen: 'img/2.png', cantidad: 3 },
    { id: 1234567, nombre: 'Toallitas Antibacterianas AquaGuard', precio: 15.99, marca: 'AquaShield', categoria: 'Desinfectante', imagen: 'img/3.png', cantidad: 66 },
    { id: 2345678, nombre: 'Jabón de Manos Vainilla SilkTouch', precio: 333.49, marca: 'SilkCare', categoria: 'Cuidado Personal', imagen: 'img/4.png', cantidad: 47 },
    { id: 3456789, nombre: 'Contenedores de Almacenamiento EcoBin', precio: 149.99, marca: 'EcoStorage', categoria: 'Productos Plásticos', imagen: 'img/5.png', cantidad: 38 },
    { id: 4567890, nombre: 'Limpiador Multiusos EcoClean', precio: 99.99, marca: 'EcoSolutions', categoria: 'Baños', imagen: 'img/6.png', cantidad: 59 },
    // ... (resto de los productos con sus IDs y cantidades)
];
// inicializa el catalago
// inicializa el catálogo
var productosPorPagina = 10; // Cambiado a 10 productos por página
var paginaActual = 1;
var productosFiltrados = productos; // Inicialmente, todos los productos están filtrados

function inicializarCatalogo() {
    mostrarProductos(productosFiltrados, paginaActual);
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


// mostrar catálogo
function limpiarFiltros() {
    // Restablecer el valor del rango
    var precio = document.getElementById('precio');
    precio.value = 101;

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
// code
var intervalId;

function startChangingQuantity(id, change) {
    intervalId = setInterval(function () {
        var spinner = document.getElementById('spinner' + id);
        var newValue = parseInt(spinner.textContent) + change;
        if (newValue >= 1) {
            spinner.textContent = newValue;
        }
    }, 200);
}

function stopChangingQuantity() {
    clearInterval(intervalId);
}


var intervalId;

function startChangingQuantity(id, change) {
    intervalId = setInterval(function () {
        var spinner = document.getElementById('spinner' + id);
        var newValue = parseInt(spinner.value) + change;
        if (newValue >= 1) {
            spinner.value = newValue;
        }
    }, 200);
}

function stopChangingQuantity() {
    clearInterval(intervalId);
}



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
    mostrarProductos(productosFiltrados, paginaActual); // Mostrar productos filtrados
}

// Detalles

// Funciones para restar y sumar la cantidad en el spinner del modal
// Variables globales
var intervalId;

// Mostrar catálogo
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






// Cambiar cantidad en el spinner
function cambiarCantidad(id, change, maxCantidad) {
    var spinner = document.getElementById('spinner' + id);
    var newValue = parseInt(spinner.textContent) + change;
    if (newValue >= 1 && newValue <= maxCantidad) {
        spinner.textContent = newValue;
    }
}

// Mostrar botones de paginación
function mostrarBotonesPaginacion(productos, pagina) {
    var botones = document.getElementById('botones');
    botones.innerHTML = '';

    var numeroPaginas = Math.ceil(productos.length / productosPorPagina);

    for (var i = 1; i <= numeroPaginas; i++) {
        var botonHTML = `<button class="btn btn-primary" onclick="cambiarPagina(${i})">${i}</button>`;
        botones.innerHTML += botonHTML;
    }
}

// Cambiar página
function cambiarPagina(pagina) {
    paginaActual = pagina;
    mostrarProductos(productosFiltrados, paginaActual);
}

// Mostrar detalles del producto en el modal
function cambiarCantidad(id, cambio, maxCantidad) {
    var spinner = document.getElementById('spinner' + id);
    var nuevoValor = parseInt(spinner.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidad) {
        spinner.textContent = nuevoValor;
    }
}

// Función para mostrar el detalle de un producto en un modal
function cambiarCantidadDetalle(id, cambio, maxCantidadDetalle) {
    var spinnerDetalle = document.getElementById('spinnerDetalle' + id);
    var nuevoValor = parseInt(spinnerDetalle.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidadDetalle) {
        spinnerDetalle.textContent = nuevoValor;
    }
}

// Función para mostrar el detalle de un producto en un modal
function cambiarCantidadDetalle(id, cambio, maxCantidadDetalle) {
    var spinnerDetalle = document.getElementById('spinnerDetalle' + id);
    var nuevoValor = parseInt(spinnerDetalle.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidadDetalle) {
        spinnerDetalle.textContent = nuevoValor;
    }
}

// Función para mostrar el detalle de un producto en un modal
function cambiarCantidadDetalle(id, cambio, maxCantidadDetalle) {
    var spinnerDetalle = document.getElementById('spinnerDetalle' + id);
    var nuevoValor = parseInt(spinnerDetalle.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidadDetalle) {
        spinnerDetalle.textContent = nuevoValor;
    }
}

// Función para mostrar el detalle de un producto en un modal
function mostrarDetalle(id, nombre, imagen, precio, maxCantidad) {
    // Verificar si el clic se realizó en el botón "Añadir al carrito"
    if (event.target.tagName.toLowerCase() !== 'a' || !event.target.classList.contains('btn-primary')) {
        // Eliminar el modal anterior si existe
        var modalAnterior = document.getElementById('detalleModal');
        if (modalAnterior) {
            modalAnterior.parentNode.removeChild(modalAnterior);
        }

        // Crear el contenido del modal
        var modalHTML = `
            <div class="modal fade" id="detalleModal" tabindex="-1" role="dialog" aria-labelledby="detalleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered modal-lg" role="document"> <!-- Centrado y modal más grande -->
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="detalleModalLabel">${nombre}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src="${imagen}" class="img-fluid" alt="${nombre}" style="width: 100%; height: auto; max-height: 400px; object-fit: cover;">
                            <p>Precio: L. ${precio.toFixed(2)}</p>
                            <!-- Agrega más detalles según sea necesario -->
                        </div>
                        <div class="modal-footer" style="justify-content: flex-start;"> <!-- Alinea los botones a la izquierda -->
                            <div class="input-group mb-3">
                                <button class="btn btn-outline-success" type="button" id="decrementButton" onclick="event.stopPropagation(); cambiarCantidadDetalle(${id}, -1, ${maxCantidad})">-</button>
                                <span class="form-control text-center border-success" id="spinnerDetalle${id}">1</span>
                                <button class="btn btn-outline-success" type="button" id="incrementButton" onclick="event.stopPropagation(); cambiarCantidadDetalle(${id}, 1, ${maxCantidad})">+</button>
                            </div>
                            <a href="#" class="btn btn-success btn-block" onclick="event.stopPropagation();">Añadir al carrito</a>
                            <button type="button" class="btn btn-success btn-block" data-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Agregar el modal al final del cuerpo del documento
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        // Mostrar el modal
        $('#detalleModal').modal('show');
        // Establecer estilos para los botones en el modal
        var decrementButton = document.getElementById('decrementButton');
        var incrementButton = document.getElementById('incrementButton');
        var spinner = document.getElementById('spinnerDetalle' + id);
        var addToCartButton = document.querySelector('#detalleModal .btn-success:nth-child(2)');
        var closeButton = document.querySelector('#detalleModal .btn-success:nth-child(3)');
        decrementButton.style.backgroundColor = 'white';
        decrementButton.style.color = '#23c01e';
        decrementButton.style.borderColor = '#23c01e';
        decrementButton.onmouseover = function () {
            this.style.backgroundColor = '#23c01e';
            this.style.color = 'white';
        }
        decrementButton.onmouseout = function () {
            this.style.backgroundColor = 'white';
            this.style.color = '#23c01e';
        }
        incrementButton.style.backgroundColor = 'white';
        incrementButton.style.color = '#23c01e';
        incrementButton.style.borderColor = '#23c01e';
        incrementButton.onmouseover = function () {
            this.style.backgroundColor = '#23c01e';
            this.style.color = 'white';
        }
        incrementButton.onmouseout = function () {
            this.style.backgroundColor = 'white';
            this.style.color = '#23c01e';
        }
        // Estilo para el spinner
        spinner.style.borderColor = '#23c01e';
        // Estilo para el botón "Añadir al carrito"
        addToCartButton.style.backgroundColor = '#23c01e';
        addToCartButton.style.color = 'white';
        // Estilo para el botón "Cerrar"
        closeButton.style.backgroundColor = '#23c01e';
        closeButton.style.color = 'white';
    }
}

// Inicializar catálogo al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    inicializarCatalogo();
});


// Resto del código...
document.addEventListener('DOMContentLoaded', function () {
    inicializarCatalogo();
});