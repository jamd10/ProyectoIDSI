document.addEventListener('DOMContentLoaded', function () {

    const btn1 = document.getElementById('Agregar');
    const btn2 = document.getElementById('Editar');
    const btn3 = document.getElementById('Eliminar');
    const div1 = document.getElementById('DC1');
    const div2 = document.getElementById('DC2');
    const div3 = document.getElementById('DC3');

    document.getElementById('addProductButton').addEventListener('click', addProduct);
    btn1.addEventListener('click', CD1);
    btn2.addEventListener('click', CD2);
    btn3.addEventListener('click', CD3);

    function addProduct() {
        const category = document.getElementById('category').value;
        const brand = document.getElementById('brand').value;
        const productName = document.getElementById('productName').value;
        const productImage = document.getElementById('productImage').value; 
        const productPrice = document.getElementById('productPrice').value;
        const productQuantity = document.getElementById('productQuantity').value;

        console.log('Categoría:', category);
        console.log('Marca:', brand);
        console.log('Nombre del Producto:', productName);
        console.log('Imagen del Producto:', productImage); 
        console.log('Precio del Producto:', productPrice);
        console.log('Cantidad en Stock:', productQuantity);


    }

    function CD1(){
        div1.style.display = "block";
        div2.style.display = "none";
        div2.style.display = "none";
    }

    function CD2(){
        div1.style.display = "none";
        div2.style.display = "block";
        div2.style.display = "none";
    }

    function CD3(){
        div1.style.display = "none";
        div2.style.display = "none";
        div2.style.display = "block";
    }

});
