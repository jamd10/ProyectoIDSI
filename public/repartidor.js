document.addEventListener("DOMContentLoaded", function () {
  var entre = [];
  const deliveryList = document.getElementById("delivery-list");

  const baseUrl = 'https://grupolimpio-api.onrender.com';

  function cargarRepartidor() {
    fetch(baseUrl + '/selectRepartidor', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: localStorage["correo"]}),
    })
    .then(response => response.json())
    .then(data => {
      repartidor = {
        nombre: data.nombre,
        correo: data.correo,
        telefono: data.telefono,
        identidad: data.numero_identidad,
        tipoVehiculo: data.vehiculo, // Puede ser "Carro" o "Moto"
        numeroPlaca: data.placa,
        password: data.contra, // Agregamos una contraseña al repartidor
        entregas: entre,
      };
      // Actualizar datos del repartidor en el HTML
      document.getElementById("name").innerText = repartidor.nombre;
      document.getElementById("correo").innerText = `Correo: ${repartidor.correo}`;
      document.getElementById("telefono").innerText = `Teléfono: ${repartidor.telefono}`;
      document.getElementById("identidad").innerText = `Identidad: ${repartidor.identidad}`;
      document.getElementById("tipoVehiculo").innerText = `Tipo de Vehículo: ${repartidor.tipoVehiculo}`;
      document.getElementById("numeroPlaca").innerText = `Número de Placa: ${repartidor.numeroPlaca}`;
      document.getElementById("greeting-name").innerText = repartidor.nombre;
    })
    .catch(error => {
        alert(':('+error);
    });
  }

  window.onload = function (){
    CargarPedidos();
  }

  function CargarPedidos() {
    fetch(baseUrl + '/selectPedidos', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: localStorage["correo"]}),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const deliveryList = document.getElementById("delivery-list");
      for(var i=0; i<data.length; i++){
        CargarPedidos2(data[i].orden);
      }
      cargarRepartidor();
    })
    .catch(error => {
        alert(':('+error);
    });
  }

  function CargarPedidos2(datas) {
    fetch(baseUrl + '/selectPedidos2', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: datas}),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      const listItem = document.createElement("li");
      listItem.classList.add("delivery-item");
      listItem.innerHTML = `<strong>Entrega ${datas}:</strong> 
                            Dirección: ${data.direccion} 
                            <div>
                              <button class="btn btn-success" onclick="tomarPedido(${datas})">Tomar</button>
                              <button class="btn btn-warning" onclick="caminoALaEntrega(${datas})">Camino</button>
                              <button class="btn btn-info" onclick="entregaRealizada(${datas})">Entregado</button>
                            </div>`;
      deliveryList.appendChild(listItem);
      entre.push(data);
    })
    .catch(error => {
        alert(':('+error);
    });
  }

  var repartidor = {
  };

  // Mostrar entregas
  // const deliveryList = document.getElementById("delivery-list");
  // repartidor.entregas.forEach(entrega => {
  //   const listItem = document.createElement("li");
  //   listItem.classList.add("delivery-item");
  //   listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
  //                         Dirección: ${entrega.direccion} 
  //                         <div>
  //                           <button class="btn btn-success" onclick="tomarPedido(${entrega.id})">Tomar</button>
  //                           <button class="btn btn-warning" onclick="caminoALaEntrega(${entrega.id})">Camino</button>
  //                           <button class="btn btn-info" onclick="entregaRealizada(${entrega.id})">Entregado</button>
  //                         </div>`;
  //   deliveryList.appendChild(listItem);
  // });

  // Funciones para los botones del menú
  window.mostrarEntregasPendientes = function () {
    document.getElementById("deliveries-container").style.display = "block";
    document.getElementById("profile-info-container").style.display = "none";
    document.getElementById("profile-edit-container").style.display = "none";
    document.getElementById("delivery-status-container").style.display = "none"; // Ocultar Estado de Entregas
  }

  window.mostrarInformacionPersonal = function () {
    document.getElementById("deliveries-container").style.display = "none";
    document.getElementById("profile-info-container").style.display = "block";
    document.getElementById("profile-edit-container").style.display = "none";
    document.getElementById("delivery-status-container").style.display = "none"; // Ocultar Estado de Entregas
  }

  window.mostrarFormularioEdicion = function () {
    document.getElementById("deliveries-container").style.display = "none";
    document.getElementById("profile-info-container").style.display = "none";
    document.getElementById("profile-edit-container").style.display = "block";
    document.getElementById("delivery-status-container").style.display = "none"; // Ocultar Estado de Entregas

    // Cargar los datos actuales del repartidor en el formulario
    document.getElementById("edit-name").value = repartidor.nombre;
    document.getElementById("edit-correo").value = repartidor.correo;
    document.getElementById("edit-telefono").value = repartidor.telefono;
    document.getElementById("edit-identidad").value = repartidor.identidad;
    document.getElementById("edit-tipoVehiculo").value = repartidor.tipoVehiculo;
    document.getElementById("edit-numeroPlaca").value = repartidor.numeroPlaca;
    document.getElementById("edit-password").value = repartidor.password;
  }

  window.mostrarEstadoEntregas = function () {
    document.getElementById("deliveries-container").style.display = "none";
    document.getElementById("profile-info-container").style.display = "none";
    document.getElementById("profile-edit-container").style.display = "none";
    document.getElementById("delivery-status-container").style.display = "block"; // Mostrar Estado de Entregas

    // Mostrar el estado de cada entrega
    const deliveryStatusList = document.getElementById("delivery-status-list");
    deliveryStatusList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
    repartidor.entregas.forEach(entrega => {
      // Mostrar la entrega solo si su estado es "Entregado"
      if (entrega.estado === "Entregado") {
        const listItem = document.createElement("li");
        listItem.classList.add("delivery-status-item");
        listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
                              Dirección: ${entrega.direccion} 
                              Estado: ✅ Paquete entregado con éxito`;
        deliveryStatusList.appendChild(listItem);
      }
    });
  }


  window.cerrarSesion = function () {
    // Aquí puedes agregar la lógica para cerrar la sesión si es necesario
    const logoutMessage = document.getElementById("logout-message");
    logoutMessage.innerText = `Hasta luego, ${repartidor.nombre}`;
    logoutMessage.classList.add("show");
    setTimeout(function () {
      logoutMessage.classList.remove("show");
      window.location.href = "index.html"; // Redirige al usuario a index.html
    }, 2000);
  }

  // Mostrar Entregas Pendientes por defecto
  mostrarEntregasPendientes();
});

window.tomarPedido = function (id) {
  // Aquí puedes agregar la lógica para tomar el pedido
  const button = document.querySelector(`#delivery-${id} .btn-success`);
  button.classList.add("tomar");
  setTimeout(() => button.classList.remove("tomar"), 1000);
}

window.caminoALaEntrega = function (id) {
  // Aquí puedes agregar la lógica para indicar que estás en camino a la entrega
  const button = document.querySelector(`#delivery-${id} .btn-warning`);
  button.classList.add("camino");
  setTimeout(() => button.classList.remove("camino"), 1000);
}

window.entregaRealizada = function (id) {
  // Aquí puedes agregar la lógica para indicar que la entrega fue realizada
  const button = document.querySelector(`#delivery-${id} .btn-info`);
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    document.body.appendChild(confetti);
    setTimeout(() => document.body.removeChild(confetti), 2000);
  }
}

// Agregar un event listener al formulario para guardar los cambios
document.getElementById("edit-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Guardar los cambios en el objeto repartidor
  repartidor.nombre = document.getElementById("edit-name").value;
  repartidor.edad = document.getElementById("edit-age").value;
  repartidor.correo = document.getElementById("edit-correo").value;
  repartidor.telefono = document.getElementById("edit-telefono").value;
  repartidor.tipoVehiculo = document.getElementById("edit-tipoVehiculo").value;
  repartidor.numeroPlaca = document.getElementById("edit-numeroPlaca").value;
  repartidor.password = document.getElementById("edit-password").value;

  // Actualizar los datos del repartidor en el HTML
  document.getElementById("name").innerText = repartidor.nombre;
  document.getElementById("age").innerText = `Edad: ${repartidor.edad} años`;
  document.getElementById("correo").innerText = `Correo: ${repartidor.correo}`;
  document.getElementById("telefono").innerText = `Teléfono: ${repartidor.telefono}`;
  document.getElementById("tipoVehiculo").innerText = `Tipo de Vehículo: ${repartidor.tipoVehiculo}`;
  document.getElementById("numeroPlaca").innerText = `Número de Placa: ${repartidor.numeroPlaca}`;

  // Volver a mostrar la información personal
  mostrarInformacionPersonal();
});

window.mostrarEstadoEntregas = function () {
  document.getElementById("deliveries-container").style.display = "none";
  document.getElementById("profile-info-container").style.display = "none";
  document.getElementById("profile-edit-container").style.display = "none";
  document.getElementById("delivery-status-container").style.display = "block"; // Mostrar Estado de Entregas

  // Mostrar el estado de cada entrega
  const deliveryStatusList = document.getElementById("delivery-status-list");
  deliveryStatusList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
  repartidor.entregas.forEach(entrega => {
    const listItem = document.createElement("li");
    listItem.classList.add("delivery-status-item");
    listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
                          Dirección: ${entrega.direccion} 
                          Estado: ${entrega.estado === "Pendiente" ? "🔴 Pendiente" : "✅ Entrega realizada exitosamente"}`;
    deliveryStatusList.appendChild(listItem);
  });

  // Crear un combobox con las fechas de las entregas
  const dateList = [...new Set(repartidor.entregas.map(entrega => entrega.fecha))]; // Obtener las fechas únicas
  const dateSelect = document.createElement("select");
  dateSelect.id = "date-select";
  dateSelect.onchange = filtrarEntregasPorFecha; // Función para filtrar las entregas
  dateSelect.innerHTML = `<option value="">Todas las fechas</option>` + dateList.map(date => `<option value="${date}">${date}</option>`).join("");
  document.getElementById("delivery-status-container").appendChild(dateSelect);
}

function filtrarEntregasPorFecha() {
  const selectedDate = document.getElementById("date-select").value;
  const deliveryStatusList = document.getElementById("delivery-status-list");
  deliveryStatusList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
  repartidor.entregas.filter(entrega => !selectedDate || entrega.fecha === selectedDate).forEach(entrega => {
    const listItem = document.createElement("li");
    listItem.classList.add("delivery-status-item");
    listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
                          Dirección: ${entrega.direccion} 
                          Estado: ${entrega.estado === "Pendiente" ? "🔴 Pendiente" : "✅ Entrega realizada exitosamente"}`;
    deliveryStatusList.appendChild(listItem);
  });
}


// contraseña
function togglePassword() {
  var passwordInput = document.getElementById('edit-password');
  var textInput = document.getElementById('edit-text');
  var passwordToggle = document.querySelector(".toggle-password svg");
  if (passwordInput.style.display === 'none') {
    passwordInput.style.display = 'block';
    textInput.style.display = 'none';
    passwordInput.value = textInput.value;
    passwordToggle.classList.remove("show-password");
  } else {
    passwordInput.style.display = 'none';
    textInput.style.display = 'block';
    textInput.value = passwordInput.value;
    passwordToggle.classList.add("show-password");
  }
}
// nuevo boton
