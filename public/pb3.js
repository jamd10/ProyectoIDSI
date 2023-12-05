document.addEventListener('DOMContentLoaded', function () {
    
    let fp = [];
    const products = document.querySelectorAll('.product');
    const productsPerPage = 4;
    let currentPage = 1;
    let currentCategory = 'todo';
    const productDetailsContainer = document.getElementById('category');
    const categorySelector = document.getElementById('category');

    function showPage(page, category) {
        let filteredProducts = [];
        products.forEach(function (product) {
            const productCategories = product.classList;
            const shouldDisplay = category === 'todo' || productCategories.contains('categoria-' + category);

            if (shouldDisplay) {
                filteredProducts.push(product);
            }
        });

        const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
        const start = (page - 1) * productsPerPage;
        const end = start + productsPerPage;

        filteredProducts.forEach(function (product, index) {
            if (index >= start && index < end) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        products.forEach(function (product) {
            if (!filteredProducts.includes(product)) {
                product.style.display = 'none';
            }
        });

        updatePageNumbers(totalPages); 
        fp = filteredProducts;
    }

    function updatePageNumbers(totalPages) {
        const pageNumbersContainer = document.getElementById('page-numbers');
        pageNumbersContainer.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageNumber = document.createElement('div');
            pageNumber.textContent = i;

            if (i === currentPage) {
                pageNumber.classList.add('selected');
            }

            pageNumber.addEventListener('click', function () {
                currentPage = i;
                showPage(currentPage, currentCategory);
                updatePageNumbers(totalPages);
            });

            pageNumbersContainer.appendChild(pageNumber);
        }
    }

    categorySelector.addEventListener('change', function () {
        currentCategory = categorySelector.value.toLowerCase();
        currentPage = 1;
        showPage(currentPage, currentCategory);

    });

    products.forEach(function (product) {
        product.addEventListener('click', function () {
            showProductDetails(product);
        });
    });

    function showProductDetails(product) {
        productDetailsContainer.innerHTML = `
            <img src="${product.querySelector('img').src}" alt="${product.querySelector('p').textContent}">
            <p>${product.querySelector('p').textContent}</p>
            <p>Precio: ${product.dataset.price}</p>
            <label for="quantity">Cantidad:</label>
            <input type="number" id="quantity" value="1" min="1">
            <button id="add-to-cart">Añadir al carrito</button>
        `;

        const addToCartButton = document.getElementById('add-to-cart');
        addToCartButton.addEventListener('click', function () {
            const quantity = document.getElementById('quantity').value;
            // Puedes agregar lógica aquí para agregar el producto al carrito con la cantidad seleccionada
            // console.log(`Añadir al carrito: ${quantity} unidades del producto ${product.id}`);
        });
    }

    document.getElementById('prev').addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage, currentCategory);
        }
    });

    document.getElementById('next').addEventListener('click', function () {
        const totalPages = Math.ceil(fp.length / productsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage, currentCategory);
        }
    });

    const newProductBtn = document.getElementById('new-product-btn');
    if (newProductBtn) {
        newProductBtn.addEventListener('click', function () {
            window.location.href = 'fcatalogo.html';
        });
    }

    window.addEventListener('load', function () {
        showPage(currentPage, currentCategory);
    });
});
