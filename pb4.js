// Funciones para mostrar/ocultar el modal
function openModal() {
    document.getElementById("myModal").style.display = "block";
  }
  
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
  }
  
  // Función para enviar el formulario (aquí tenemos que implementar la lógica de recuperación de contraseña)
  function submitForm() {
    // Obtener los datos del formulario
    var email = document.getElementById("email").value;

    closeModal();
  }