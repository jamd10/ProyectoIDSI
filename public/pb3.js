document.addEventListener('DOMContentLoaded', function () {
    const categorySelect = document.getElementById('category');

    categorySelect.addEventListener('change', function () {
        const selectedCategory = categorySelect.value;

        document.querySelectorAll('.product').forEach(function (product) {
            const productCategory = product.classList[1]; // la segunda clase indica la categoría
            const productId = product.id;

            if (selectedCategory === 'todo' || productCategory === `categoria-${selectedCategory}`) {
                document.getElementById(productId).style.display = 'block';
            } else {
                document.getElementById(productId).style.display = 'none';
            }
        });
    });
});
