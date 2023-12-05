document.addEventListener('DOMContentLoaded', function () {
    const productDetailsContainer = document.getElementById('product-details-content');

    function getProductId() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id');
    }

    const baseUrl = 'https://grupolimpio-api.onrender.com';

    const productos = [];

    function leerProducto() {
        fetch(baseUrl + '/selectProductos', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            for(var i = 0; i < data.length; i++){
                var num = i+1
                var str = "producto"+num;
                var o = {};
                o = {
                    id: str,
                    nombre: data[i].nombre,
                    imagen: data[i].imagen,
                    precio: data[i].precio,
                    descripcion: data[i].marca,
                }
                productos.push(o)
            }
            showProductDetails();
        })
        .catch(error => {
            alert(':('+error);
        });    
    }
    
    function showProductDetails() {
        const productId = getProductId();
        console.log(productos[0].id);
        console.log(productos[productId]);
        var product = null;
        for(var i = 0; i < productos.length; i++){
            if(productos[i].id == productId){
                product = productos[i];
            }
        }
        const productDetailsContainer = document.getElementById('product-details-content');   
        if (product) {
            productDetailsContainer.innerHTML = `
                <div class="product-details">
                    <div class="product-image">
                        <img src="${product.imagen}" alt="${product.nombre}">
                    </div>
                    <div class="product-info">
                        <h3>${product.nombre}</h3>
                        <p>Precio: ${product.precio}</p>
                        <p>${product.descripcion}</p>
                        <label for="quantity">Cantidad:</label>
                        <input type="number" id="quantity" value="1" min="1">
                        <button id="add-to-cart">
                            <ion-icon name="cart-outline"></ion-icon> Añadir al carrito
                        </button>
                    </div>
                </div>
            `;
    
            const addToCartButton = document.getElementById('add-to-cart');
            addToCartButton.addEventListener('click', function () {
                const quantity = document.getElementById('quantity').value;
            });
        } else {
            productDetailsContainer.innerHTML = `<p>Detalles del producto no encontrados.</p>`;
        }
    }
    
    leerProducto();
});
