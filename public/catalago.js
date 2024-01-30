// actualizar el precio
var precio = document.getElementById('precio');
var precioSeleccionado = document.getElementById('precioSeleccionado');
// Inicializa el precio seleccionado
precioSeleccionado.innerHTML = "L. " + precio.value;
precio.oninput = function () {
    precioSeleccionado.innerHTML = "L. " + this.value;
}
var productos = [];
var productosPorPagina = 10; // Cambiado a 10 productos por página
var paginaActual = 1;
var productosFiltrados = productos; // Inicialmente, todos los productos están filtrados
var intervalId;

const baseUrl = 'https://grupolimpio-api.onrender.com';

function leerProducto() {
    fetch(baseUrl + '/selectProductos', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => response.json())
        .then(data => {
            productos = data;
            productosFiltrados = productos;
            mostrarProductos(productosFiltrados, paginaActual);
            // console.log(productos[0].imagen1);
        })
        .catch(error => {
            alert(':(' + error);
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
    var precioSeleccionado = parseFloat(document.getElementById('precio').value);
    var categoriaSeleccionada = document.getElementById('categoria').value;
    var busqueda = document.querySelector('.search-bar').value;
    productosFiltrados = productos.filter(function (producto) {
        var coincidePrecio = producto.precio <= precioSeleccionado;
        var coincideCategoria = categoriaSeleccionada === '' || producto.categoria.toLowerCase().trim() === categoriaSeleccionada.toLowerCase().trim();
        var coincideBusqueda = busqueda === '' || busquedaProducto(busqueda).includes(producto);
        return coincidePrecio && coincideCategoria && coincideBusqueda;
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
    var categoria = document.getElementById('categoria');
    var busqueda = document.querySelector('.search-bar'); // Obtener el cuadro de búsqueda
    categoria.value = '';
    busqueda.value = ''; // Restablecer el valor del cuadro de búsqueda
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
    // Limpiar el carrito en el almacenamiento local
// localStorage.removeItem('carrito');

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
                <div class="card" style="box-shadow: 0 0 10px rgba(35, 192, 30, 0.2);" onclick="mostrarDetalle('${producto.id}', '${producto.nombre}', '${producto.imagen1}', ${producto.precio}, ${producto.cantidad})">
                    <img src="${producto.imagen1}" class="card-img-top" alt="${producto.nombre}" style="object-fit: contain; height: 200px; width: 100%;">
                    <div class="card-body text-center">
                        <h5 class="card-title" style="font-size: 16px; margin-bottom: 0; color: #000; font-weight: bold;">${producto.nombre}</h5>
                        <p class="card-text" style="color: #ff8c00; margin-bottom: 5px; margin-top: 5px; font-size: 18px; font-weight: bold;">Precio: L. ${producto.precio}</p>
                        <div class="input-group mb-1" style="margin-bottom: 5px; margin-top: 5px;">
                            <button class="btn btn-outline-success" type="button" style="height: 30px; font-size: 12px;" onclick="event.stopPropagation(); cambiarCantidad('${producto.id}', -1, ${producto.cantidad})">-</button>
                            <span class="form-control text-center" id="spinner${producto.id}" style="height: 30px; padding: 0; margin: 0 5px;">1</span>
                            <button class="btn btn-outline-success" type="button" style="height: 30px; font-size: 12px;" onclick="event.stopPropagation(); cambiarCantidad('${producto.id}', 1, ${producto.cantidad})">+</button>
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
function actualizarCantidadProductosEnCarrito() {
    var cantidadProductos = carrito.reduce(function (total, producto) {
        return total + producto.cantidad;
    }, 0);

    // Actualiza la cantidad de productos en el HTML
    document.getElementById('cantidadCarrito').textContent = cantidadProductos;
}

// Cargar el carrito desde el almacenamiento local al inicio
// Intenta obtener el carrito desde el almacenamiento local
var carritoGuardado = localStorage.getItem('carrito');
var carrito = carritoGuardado ? JSON.parse(carritoGuardado) : [];

// Actualiza la cantidad en el carrito en el HTML
document.getElementById('cantidadCarrito').textContent = carrito.length;



var estadoCarrito = {};

function cambiarCantidadDetalle(id, cambio, maxCantidad) {
    var cantidadTemporal = 1;
    cantidadTemporal += cambio;
    document.getElementById('spinnerDetalle' + id).textContent = cantidadTemporal;
}

function mostrarDetalle(id, nombre, imagen, precio, maxCantidad) {
    var productoSeleccionado = productos.find(p => p.id === id);
    var mainContainer = document.getElementById('catalogoProductos');
    var filtersContainer = document.querySelector('.col-md-3');
    var paginationContainer = document.getElementById('botones');
    var publicidad = document.querySelector('.publicidad');
    var currentContent = mainContainer.innerHTML;
    var currentFilters = filtersContainer.innerHTML;
    var currentPagination = paginationContainer.innerHTML;

    var newContent = `
    <div class="row justify-content-center" style="margin-top: 50px;">
        <div class="col-lg-3 col-md-12 mb-3 d-flex flex-lg-column flex-md-row align-items-center" style="flex: 0 0 300px;">
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
                    <p style="font-size: 24px; margin-bottom: 20px;font-weight: bold; color: gray;">${id}</p>
                    <h1 class="product-title" style="font-size: 36px; font-weight: bold; margin-bottom: 20px;">${nombre}</h1>
                    <p style="font-size: 30px; color: #ff8c00; margin-bottom: 20px;">Precio: L. ${precio}</p>
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
    publicidad.style.display = 'block';
    mainContainer.style.margin = '0 auto';
    mainContainer.innerHTML = newContent;

    window.restoreContent = function () {
        filtersContainer.style.display = 'block';
        paginationContainer.style.display = 'block';
        publicidad.style.display = 'none';
        mainContainer.style.margin = '0';
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
    document.querySelector('h1').textContent = nombre;

    window.restoreContent = function () {
        filtersContainer.style.display = 'block';
        paginationContainer.style.display = 'block';
        publicidad.style.display = 'none';
        mainContainer.style.margin = '0';
        mainContainer.innerHTML = currentContent;
        document.querySelector('h1').textContent = "Catálogo";
    }

    document.querySelector('.btn.btn-success').onclick = function () {
        var cantidadActualizada = parseInt(document.getElementById('spinnerDetalle' + id).textContent);

        if (estadoCarrito[id]) {
            if ((estadoCarrito[id].cantidad + cantidadActualizada) > maxCantidad) {
                Swal.fire({
                    icon: 'error',
                    title: '¡No hay suficientes productos en existencia!',
                    text: `La cantidad máxima permitida es ${maxCantidad}.`,
                    confirmButtonColor: '#e44d26',
                    confirmButtonText: '¡Entendido!',
                });
                return;
            }
            estadoCarrito[id].cantidad += cantidadActualizada;
        } else {
            estadoCarrito[id] = {
                id: id,
                nombre: nombre,
                cantidad: cantidadActualizada,
                precioTotal: precio * cantidadActualizada
            };
            carrito.push(estadoCarrito[id]);
        }

        document.getElementById('cantidadCarrito').textContent = carrito.length;

        var precioCarrito = 0;
        carrito.forEach(function (producto) {
            precioCarrito += producto.precioTotal;
        });

        Swal.fire({
            icon: 'success',
            title: '¡Producto añadido al carrito con éxito!',
            text: `Cantidad: ${cantidadActualizada}, Precio total: L. ${precioCarrito}`,
            confirmButtonColor: '#28be00',
            confirmButtonText: '¡Entendido!',
        });

        localStorage.setItem('carrito', JSON.stringify(carrito));
        
    };
    // ... (código para añadir productos al carrito)

    // Luego de añadir o actualizar productos, llama a la función
    actualizarCantidadProductosEnCarrito();

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
