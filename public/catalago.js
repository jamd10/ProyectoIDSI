// actualizar el precio
var precio = document.getElementById('precio');
var detalleono = 0;
var primeravez = 0;
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

const baseUrl2 = 'https://grupolimpio-api.onrender.com';

function leerProducto() {
    fetch(baseUrl2 + '/selectProductos', {
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


// Asumiendo que tienes una variable 'productos' que contiene todos tus productos
// Función para filtrar productos por nombre
function busquedaProducto(query) {
    var inputBusqueda = query.toLowerCase();
    return productos.filter(function (producto) {
        var nombre = producto.nombre.toLowerCase();
        return nombre.includes(inputBusqueda);
    });
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
    console.log(cambio);
    var spinnerDetalle = document.getElementById('spinnerDetalle' + id);
    var nuevoValor = parseInt(spinnerDetalle.textContent) + cambio;
    if (nuevoValor >= 1 && nuevoValor <= maxCantidadDetalle) {
        spinnerDetalle.textContent = nuevoValor;
    }
}

function AgregarCarrito(id, nombre, imagen, precio, cantidad){
    detalleono = 0;
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    var cantidadActualizada = parseInt(document.getElementById('spinner' + id).textContent);

    if (estadoCarrito[id]) {
        if ((estadoCarrito[id].cantidad + cantidadActualizada) > cantidad) {
            Swal.fire({
                icon: 'error',
                title: '¡No hay suficientes productos en existencia!',
                text: `La cantidad máxima permitida es ${cantidad}.`,
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
            maxCantidad: cantidad,
            cantidad: 0,
            precio: precio,
            precioTotal: precio * cantidadActualizada,
            imagen: imagen
        };
        carrito2.push(estadoCarrito[id]);
    }

    document.getElementById('cantidadCarrito').textContent = carrito2.length;

    var precioCarrito = 0;
    carrito2.forEach(function (producto) {
        precioCarrito += producto.precioTotal;
    });

    Swal.fire({
        icon: 'success',
        title: '¡Producto añadido al carrito con éxito!',
        text: `Cantidad: ${cantidadActualizada}, Precio total: L. ${precioCarrito}`,
        confirmButtonColor: '#28be00',
        confirmButtonText: '¡Entendido!',
    });

    localStorage.setItem('carrito', JSON.stringify(carrito2));

    // Actualizar el carrito en el panel
    mostrarCarrito();
    cambiarCantidadCarrito(id, cantidadActualizada, cantidad);
}

// Funciones para mostrar productos y detalles
function mostrarProductos(productos, pagina) {
    // Limpiar el carrito en el almacenamiento local
    //localStorage.removeItem('carrito');

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
                        <a href="#" class="btn btn-primary" style="width: 100%; padding: 5px 0; margin-top: 5px;" onclick="event.stopPropagation(); AgregarCarrito('${producto.id}', '${producto.nombre}', '${producto.imagen1}', ${producto.precio}, ${producto.cantidad}); ">Añadir al carrito</a>
                    </div>
                </div>
            `;       
            actualizarCantidadProductosEnCarrito();
        } else {
            // Agregar una tarjeta de producto vacía
            productoHTML = `<div class="card invisible"></div>`;
        }
        catalogoProductos.innerHTML += productoHTML;
    }
    //Por ahorita porque siempre tira un error al iniciar pagina (No esta definido)
    //mostrarBotonesPaginacion(productos, pagina);
}
// Funcion para mostrar detalles de los productos
function actualizarCantidadProductosEnCarrito() {
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    var cantidadProductos = carrito2.reduce(function (total, producto) {
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
                        <button class="btn btn-outline-success" type="button" id="decrementButton" onclick="cambiarCantidadDetalle('${id}', -1, ${maxCantidad})" style="background-color: white;">-</button>
                        <span class="form-control text-center border-success" id="spinnerDetalle${id}" style="background-color: white;">1</span>
                        <button class="btn btn-outline-success" type="button" id="incrementButton" onclick="cambiarCantidadDetalle('${id}', 1, ${maxCantidad})" style="background-color: white);">+</button>
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

    detalleono = 1;

    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];

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
                maxCantidad: maxCantidad,
                cantidad: cantidadActualizada,
                precio: precio,
                precioTotal: precio * cantidadActualizada,
                imagen: imagen
            };
            carrito2.push(estadoCarrito[id]);
        }

        document.getElementById('cantidadCarrito').textContent = carrito2.length;

        var precioCarrito = 0;
        carrito2.forEach(function (producto) {
            precioCarrito += producto.precioTotal;
        });

        Swal.fire({
            icon: 'success',
            title: '¡Producto añadido al carrito con éxito!',
            text: `Cantidad: ${cantidadActualizada}, Precio total: L. ${precioCarrito}`,
            confirmButtonColor: '#28be00',
            confirmButtonText: '¡Entendido!',
        });

        localStorage.setItem('carrito', JSON.stringify(carrito2));

        // Actualizar el carrito en el panel
        mostrarCarrito();
        cambiarCantidadCarrito(id, 0, maxCantidad);
    };

    actualizarCantidadProductosEnCarrito();
}

// Función para ocultar el carrito
function ocultarCarrito() {
    var carritoPanel = document.getElementById('carritoPanel');
    carritoPanel.classList.remove('open');
}
// Función para mostrar el carrito con el nuevo diseño
function mostrarCarrito() {
    var carritoPanel = document.getElementById('carritoPanel');
    carritoPanel.classList.add('open');

    // Obtener el contenedor donde se mostrarán los productos
    var productosCarritoContainer = document.getElementById('productosCarrito');

    // Limpiar el contenido actual
    productosCarritoContainer.innerHTML = '';

    // Tamaño fijo para las imágenes del carrito
    var imagenCarritoStyle = 'width: 80px; height: 80px; object-fit: contain; margin-right: 20px; border: 1px solid #ddd;'; // Ajusta el tamaño según tus preferencias
    
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    // Mostrar cada producto en el carrito
    carrito2.forEach(function (producto) {
        var productoHTML = `
            <div class="producto-carrito" style="display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="img-thumbnail carrito-imagen" style="${imagenCarritoStyle}">
                <div style="flex: 1;">
                    <p style="font-weight: bold; margin-bottom: 5px;">${producto.nombre}</p>
                    <p style="margin-bottom: 5px;">Cantidad: ${producto.cantidad} (Max: ${producto.maxCantidad})</p>
                    <div class="quantity-control d-flex align-items-center" style="margin-bottom: 5px;">
                        <button class="btn btn-outline-success" type="button" onclick="cambiarCantidadCarrito('${producto.id}', -1, ${producto.maxCantidad})">-</button>
                        <span class="form-control text-center border-success" id="spinnerCarrito${producto.id}" style="margin: 0 5px; font-size: 12px;">${producto.cantidad}</span>
                        <button class="btn btn-outline-success" type="button" onclick="cambiarCantidadCarrito('${producto.id}', 1, ${producto.maxCantidad})">+</button>
                    </div>
                    <p style="color: green; margin-bottom: 5px;">Precio total: L. ${producto.precioTotal.toFixed(2)}</p>
                    <button class="btn btn-danger btn-block" onclick="eliminarProductoCarrito('${producto.id}');">Eliminar</button>
                </div>
            </div>
        `;
        productosCarritoContainer.innerHTML += productoHTML;
    });

    actualizarCantidadProductosEnCarrito();

    // Calcular y mostrar el total a pagar
    calcularTotalPagar();
}

function cambiarCantidadCarrito(id, cantidad, maxCantidad) {
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    var productoCarrito = carrito2.find(producto => producto.id === id);

    // Verificar límites de cantidad
    if (cantidad === -1 && productoCarrito.cantidad === 1) {
        return; // Evitar cantidad negativa o cero
    }

    if (cantidad === 1 && productoCarrito.cantidad === maxCantidad) {
        Swal.fire({
            icon: 'error',
            title: '¡No puedes añadir más productos!',
            text: `La cantidad máxima permitida es ${maxCantidad}.`,
            confirmButtonColor: '#e44d26',
            confirmButtonText: '¡Entendido!',
        });
        return; // Evitar exceder la cantidad máxima
    }

    // Actualizar la cantidad del producto
    productoCarrito.cantidad += cantidad;

    // Actualizar el spinner
    document.getElementById(`spinnerCarrito${id}`).textContent = productoCarrito.cantidad;

    // Actualizar el precio total
    productoCarrito.precioTotal = productoCarrito.precio * productoCarrito.cantidad;

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito2));

    // Calcular y mostrar el total a pagar
    calcularTotalPagar();

    // Actualizar el carrito en el panel
    mostrarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProductoCarrito(id) {
    // Filtrar el carrito para excluir el producto con el ID dado
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    carrito2 = carrito2.filter(producto => producto.id !== id);
    if(detalleono == 1){
        estadoCarrito[id].cantidad = 0;
    }else{
        estadoCarrito[id] = null;
    }

    // Actualizar el carrito en el almacenamiento local
    localStorage.setItem('carrito', JSON.stringify(carrito2));

    // Actualizar el carrito en el panel
    mostrarCarrito();

    // Actualizar la cantidad de productos en el carrito
    actualizarCantidadProductosEnCarrito();
}


// Función para calcular y mostrar el total a pagar
function calcularTotalPagar() {
    var totalPagar = 0;
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    // Calcular el total sumando los precios totales de cada producto en el carrito
    carrito2.forEach(function (producto) {
        totalPagar += producto.precioTotal;
    });

    document.getElementById('totalPagar').textContent = 'L. ' + totalPagar.toFixed(2);
}

function realizarCompra(){
    var carritoGuardado2 = localStorage.getItem('carrito');
    var carrito2 = carritoGuardado2 ? JSON.parse(carritoGuardado2) : [];
    if(localStorage["Admin"] == "Admin"){
        alert("Debe ingresar como usuario");
    }else if(carrito2.length == 0){
        alert("El carrito debe de contener productos antes de realizar la compra");
    }else { 
        if(localStorage["correo"] == null){
            window.location.href = "Proceso de pago/Iniciar_Sesion.html";
        }else{
            window.location.href = "Proceso de pago/Tipo_Entrega.html";
        }
    }

}
