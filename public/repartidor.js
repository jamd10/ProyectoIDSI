const baseUrl = 'http://localhost:3001';
var passvalue = "";

document.addEventListener("DOMContentLoaded", function () {
  var entre = [];
  const deliveryList = document.getElementById("delivery-list");

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
      const deliveryList = document.getElementById("delivery-list");
      for(var i=0; i<data.length; i++){
        entre.push(data[i]);
        if(data[i].estado_entrega == "Asignado" || data[i].estado_entrega == "Camino"){
          const listItem = document.createElement("li");
          listItem.classList.add("delivery-item");
          listItem.innerHTML = `<strong>Entrega ${data[i].id}:</strong> 
          Dirección: ${data[i].direccion} 
          <div>
            <button id="on-way-button-${data[i].id}" class="btn btn-warning" onclick="caminoALaEntrega('`+data[i].id+`', '`+data[i].direccion+`')">Camino</button>
            <button id="delivered-button-${data[i].id}" class="btn btn-info" onclick="entregaRealizada('`+data[i].id+`', '`+data[i].direccion+`')">Entregado</button>
          </div>`;
          deliveryList.appendChild(listItem);
          const onWayButton = document.querySelector(`#on-way-button-${data[i].id}`);
          const deliveredButton = document.querySelector(`#delivered-button-${data[i].id}`);
          if(data[i].estado_entrega == "Asignado"){
            deliveredButton.disabled = true;
            deliveredButton.innerHTML = "Entregado <span class='button-lock'>🔒</span>";
          }else{
            onWayButton.disabled = true;
            onWayButton.innerHTML = "En Camino <span class='button-lock'>🔒</span>";
          }
        }
      }
      cargarRepartidor();
    })
    .catch(error => {
        alert(':('+error);
    });
  }

  var repartidor = {
  };

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
    document.getElementById("edit-telefono").value = repartidor.telefono;
    document.getElementById("edit-correo").value = repartidor.correo;
    document.getElementById("edit-tipoVehiculo").value = repartidor.tipoVehiculo;
    document.getElementById("edit-numeroPlaca").value = repartidor.numeroPlaca;
    document.getElementById("edit-password").value = repartidor.password;
  }

  function CerrarSesion() {
    fetch(baseUrl + '/logOut', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.msg == "log out") {
          const logoutMessage = document.getElementById("logout-message");
          logoutMessage.innerText = `Hasta luego, ${repartidor.nombre}`;
          logoutMessage.classList.add("show");
          localStorage.removeItem('Repartidor');
          localStorage.removeItem('correo');
          setTimeout(function () {
            logoutMessage.classList.remove("show");
            window.location.href = "index.html"; // Redirige al usuario a index.html
          }, 2000);
        } else {

        }
      })
      .catch(error => {
        alert('No se ha podido cerrar sesion');
      });
  }

  window.cerrarSesion = function () {
    // Aquí puedes agregar la lógica para cerrar la sesión si es necesario
    CerrarSesion();

  }

  // Mostrar Entregas Pendientes por defecto
  mostrarEntregasPendientes();

  window.mostrarEstadoEntregas = function () {
  
    document.getElementById("deliveries-container").style.display = "none";
    document.getElementById("profile-info-container").style.display = "none";
    document.getElementById("profile-edit-container").style.display = "none";
    document.getElementById("delivery-status-container").style.display = "block"; // Mostrar Estado de Entregas
  
    // Mostrar el estado de cada entrega
    const deliveryStatusList = document.getElementById("delivery-status-list");
    deliveryStatusList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
    entre.forEach(entrega => {
      const listItem = document.createElement("li");
      listItem.classList.add("delivery-status-item");
      listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
                            Dirección: ${entrega.direccion} 
                            Estado: ${entrega.estado_entrega === "Entregado" ? "✅ Entrega realizada exitosamente" : "🔴 Pendiente"}`;
      deliveryStatusList.appendChild(listItem);
    });
  
    // Crear un combobox con las fechas de las entregas
    const dateList = [...new Set(entre.map(entrega => entrega.fecha))]; // Obtener las fechas únicas
    const dateSelect = document.createElement("select");
    dateSelect.id = "date-select";
    dateSelect.onchange = filtrarEntregasPorFecha; // Función para filtrar las entregas
    dateSelect.innerHTML = `<option value="">Todas las fechas</option>` + dateList.map(date => `<option value="${date}">${date}</option>`).join("");
    deliveryStatusList.appendChild(dateSelect);
  }
  
  function filtrarEntregasPorFecha() {
    const selectedDate = document.getElementById("date-select").value;
    const deliveryStatusList = document.getElementById("delivery-status-list");
    deliveryStatusList.innerHTML = ""; // Limpiar la lista antes de agregar los elementos
    entre.filter(entrega => !selectedDate || entrega.fecha === selectedDate).forEach(entrega => {
      const listItem = document.createElement("li");
      listItem.classList.add("delivery-status-item");
      listItem.innerHTML = `<strong>Entrega ${entrega.id}:</strong> 
                            Dirección: ${entrega.direccion} 
                            Estado: ${entrega.estado_entrega === "Entregado" ? "✅ Entrega realizada exitosamente" : "🔴 Pendiente"}`;
      deliveryStatusList.appendChild(listItem);
    });
  }
});

// Agregar un event listener al formulario para guardar los cambios
document.getElementById("edit-form").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevenir la recarga de la página

  // Guardar los cambios en el objeto repartidor
  repartidor.nombre = document.getElementById("edit-name").value;
  repartidor.telefono = document.getElementById("edit-telefono").value;
  repartidor.tipoVehiculo = document.getElementById("edit-tipoVehiculo").value;
  repartidor.numeroPlaca = document.getElementById("edit-numeroPlaca").value;
  repartidor.password = document.getElementById("edit-password").value;

  // Actualizar los datos del repartidor en el HTML
  document.getElementById("name").innerText = repartidor.nombre;
  document.getElementById("telefono").innerText = `Teléfono: ${repartidor.telefono}`;
  document.getElementById("tipoVehiculo").innerText = `Tipo de Vehículo: ${repartidor.tipoVehiculo}`;
  document.getElementById("numeroPlaca").innerText = `Número de Placa: ${repartidor.numeroPlaca}`;

  // Volver a mostrar la información personal
  mostrarInformacionPersonal();
});

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


window.caminoALaEntrega = function (id, direccion) {
  // Bloquear el botón "Camino" y mostrar un ícono de bloqueo
  const onWayButton = document.querySelector(`#on-way-button-${id}`);
  onWayButton.innerHTML = "Camino <span class='button-lock'>🔒</span>";
  onWayButton.disabled = true;

  // Desbloquear el botón "Entregado"
  const deliveredButton = document.querySelector(`#delivered-button-${id}`);
  deliveredButton.disabled = false;
  deliveredButton.innerHTML = "Entregado";

  // Imprimir la dirección asociada en la consola

  // Llamamos a la función de enviarCorreo con la dirección obtenida
  sendEmail2(direccion);
  fetch(baseUrl + '/ActualizarFactura', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id,texto: "Camino"}),
  })
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
      //alert('No se ha podido actualizar su informacion'+error);
  });
}

window.entregaRealizada = function (id, direccion) {
  sendEmail3(direccion);
  // Bloquear el botón "Camino" y mostrar un ícono de bloqueo
  const deliveredButton = document.querySelector(`#delivered-button-${id}`);
  deliveredButton.innerHTML = "Entregado <span class='button-lock'>🔒</span>";
  deliveredButton.disabled = true;
  fetch(baseUrl + '/ActualizarFactura', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id,texto: "Entregado"}),
  })
  .then(response => response.json())
  .then(data => {
  })
  .catch(error => {
      //alert('No se ha podido actualizar su informacion'+error);
  });
}

const getBtn = document.getElementById('GuardarCambios');

getBtn.addEventListener('click', Validar);

function Validar() {
  const nombre = document.getElementById("edit-name").value;
  const telefono = document.getElementById("edit-telefono").value;
  const tipoVehiculo = document.getElementById("edit-tipoVehiculo").value;
  const numeroPlaca = document.getElementById("edit-numeroPlaca").value;
  const password = document.getElementById("edit-password").value;

  // Validar que todos los campos estén llenos
  if (nombre.trim() === "" || telefono.trim() === "" || tipoVehiculo.trim() === "" || numeroPlaca.trim() === "" || password.trim() === "") {
      alert("Por favor, complete todos los campos del formulario.");
      return false;
  }else if(telefono.length != 8){
    alert("El numero de telefono debe de contener 8 numeros");
  }else if(numeroPlaca.length != 7){
    alert("La placa del vehiculo debe de contener 7 caracteres");
  }
  else{
    NuevaContra();
  }

  return true;
}

function NuevaContra() {
  fetch(baseUrl + '/updatePassword2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ correo: document.getElementById("edit-correo").value, password: document.getElementById("edit-password").value }),
  })
    .then(response => response.json())
    .then(data => {
      Actualizar();
    })
    .catch(error => {
      alert('No se ha podido actualizar la contraseña');
    });
}

function Actualizar() {
  fetch(baseUrl + '/ActualizarRepartidor2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: document.getElementById("edit-name").value, telefono: document.getElementById("edit-telefono").value,
      vehiculo: document.getElementById("edit-tipoVehiculo").value, placa: document.getElementById("edit-numeroPlaca").value, 
      contra: document.getElementById("edit-text").value, correo: document.getElementById("edit-correo").value
    }),
  })
    .then(response => response.json())
    .then(data => {
      alert('Su informacion a sido actualizada exitosamente!');
      window.location.reload();
    })
    .catch(error => {
      alert('No se ha podido actualizar su informacion');
    });
}

function validate() {
  var element = document.getElementById('edit-name');
  element.value = element.value.replace(/[^a-zA-Z ñÑáéíóúÁÉÍÓÚ]+/, '');
};

function validate4() {
  var element2 = document.getElementById('edit-telefono');
  element2.value = element2.value.replace(/[^0-9]+/, '');
};

function validate5() {
  var element2 = document.getElementById('edit-numeroPlaca');
  element2.value = element2.value.replace(/[^A-Z0-9]+/, '');
};

const sendEmail2 = (direccion) => {
  const templateHTML = `
  <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">

      
      <!--[if !mso]><!-->
        
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">

        <style type="text/css">
        // TODO: fix me!
          @import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap);
      </style>
      
      <!--<![endif]-->

      <!--[if mso]>
        <style>
            // TODO: fix me!
            * {
                font-family: sans-serif !important;
            }
        </style>
      <![endif]-->
  
      
      <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
      <title></title>

      <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      
  <style>
      :root {
          color-scheme: light;
          supported-color-schemes: light;
      }

      html,
      body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;

          overflow-wrap: break-word;
          -ms-word-break: break-all;
          -ms-word-break: break-word;
          word-break: break-all;
          word-break: break-word;
      }


      
direction: undefined;
center,
#body_table {
  
}

ul, ol {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

li {
  margin-bottom: 0;
}



.list-block-list-outside-left li {
  margin-left: 20px !important;
}

.list-block-list-outside-right li {
  margin-right: 20px !important;
}


  .paragraph {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #5f5f5f;
    
  }


  .heading1 {
    font-size: 32px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .heading2 {
    font-size: 28px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .heading3 {
    font-size: 20px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .list {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #5f5f5f;
    
  }


p a, 
li a {
  
display: inline-block;  
  color: #3498db;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;

}

.button-table a {
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
}

.paragraph > span {text-decoration: none;}.heading1 > span {text-decoration: none;}.heading2 > span {text-decoration: none;}.heading3 > span {text-decoration: none;}.list > span {text-decoration: none;}


      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
          margin: 0 !important;
      }

      #MessageViewBody,
      #MessageWebViewDiv {
          width: 100% !important;
      }

      table {
          border-collapse: collapse;
          border-spacing: 0;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }
      table:not(.button-table) {
          border-spacing: 0 !important;
          border-collapse: collapse !important;
          table-layout: fixed !important;
          margin: 0 auto !important;
      }

      th {
          font-weight: normal;
      }

      tr td p {
          margin: 0;
      }

      img {
          -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors],

      .unstyle-auto-detected-links a,
      .aBn {
          border-bottom: 0 !important;
          cursor: default !important;
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      .im {
          color: inherit !important;
      }

      .a6S {
          display: none !important;
          opacity: 0.01 !important;
      }

      img.g-img+div {
          display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u~div .contentMainTable {
              min-width: 320px !important;
          }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u~div .contentMainTable {
              min-width: 375px !important;
          }
      }

      @media only screen and (min-device-width: 414px) {
          u~div .contentMainTable {
              min-width: 414px !important;
          }
      }
  </style>

  <style>
      @media only screen and (max-device-width: 600px) {
          .contentMainTable {
              width: 100% !important;
              margin: auto !important;
          }
          .single-column {
              width: 100% !important;
              margin: auto !important;
          }
          .multi-column {
              width: 100% !important;
              margin: auto !important;
          }
          .imageBlockWrapper {
              width: 100% !important;
              margin: auto !important;
          }
      }
      @media only screen and (max-width: 600px) {
          .contentMainTable {
              width: 100% !important;
              margin: auto !important;
          }
          .single-column {
              width: 100% !important;
              margin: auto !important;
          }
          .multi-column {
              width: 100% !important;
              margin: auto !important;
          }
          .imageBlockWrapper {
              width: 100% !important;
              margin: auto !important;
          }
      }
  </style>
  <style></style>
  
<!--[if mso | IE]>
  <style>
      .list-block-outlook-outside-left {
          margin-left: -18px;
      }
  
      .list-block-outlook-outside-right {
          margin-right: -18px;
      }

      a:link, span.MsoHyperlink {
          mso-style-priority:99;
          
display: inline-block;  
  color: #3498db;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;

      }
  </style>
<![endif]-->


  </head>

  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #DBFFE9;">
      <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #DBFFE9;">
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #DBFFE9;">
          <tbody>    
              <tr>
                  <td>
                  <![endif]-->
                      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="contentMainTable">
                          <tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#fff;display:block;padding-top:50px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:36.80px;font-size:32px;background-color:#fff;color:#444444;margin:0;word-break:normal" class="heading1">Pedido En Camino!</p></td></tr><tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#fff;line-height:40px;font-size:40px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:left;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;letter-spacing:0;word-break:normal">En camino a la dirección: ${direccion}</p></td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:left;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;letter-spacing:0;word-break:normal">Su pedido fue procesado exitosamente y esta en camino al domicilio. </p></td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#fff;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" align="center"><table align="center" width="246.4" class="imageBlockWrapper" style="width:246.4px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/40844065-6c4f-453e-aade-2f178cd67255/entrega-servicios-camion-punteros-camino_186930-903.avif" width="246.4" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons" style="display:table-row;background-color:#fff"><td style="width:100%"><table style="background-color:#fff;width:100%;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;border-collapse:separate !important" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td align="center" valign="top"><div style="max-width:560px"><table role="presentation" style="width:100%" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><div style="margin-left:auto;margin-right:auto;margin-top:-2px;margin-bottom:-2px;width:100%;max-width:114px"><table role="presentation" style="padding-left:223" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://facebook.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/facebook/facebook-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Facebook"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://whatsapp.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/whatsapp/whatsapp-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Whatsapp"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://example.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/website/website-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Website"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></td></tr><tr><td valign="top" align="center" style="padding:20px 20px 20px 20px;background-color:#fff"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;letter-spacing:0;word-break:normal">Imprimir</p></td></tr>
                      </table>
                  <!--[if mso | IE]>
                  </td>
              </tr>
          </tbody>
          </table>
          <![endif]-->
      </center>
  </body>
</html>
  `;
  Email.send({
    Host: 'smtp.elasticemail.com', // Reemplaza con el servidor SMTP que uses
    Username: 'grupomaslimpio39@gmail.com', // Reemplaza con tu nombre de usuario SMTP
    Password: '69E01DB91010FCA73CF620B5C721E5FD2B78', // Reemplaza con tu contraseña SMTP
    To: 'felixomardominguez847@gmail.com', // Reemplaza con la dirección de correo del equipo de soporte
    From: 'grupomaslimpio39@gmail.com', // Reemplaza con tu dirección de correo
    Subject: 'Pedido Confirmado',
    Body: templateHTML,
    ContentType: 'text/html; charset=utf-8' // Indica que el cuerpo es HTML
  })
    
  .then(function (message) {
      console.log('Correo enviado correctamente:', message);
  })
  .catch(function (error) {
      console.error('Error al enviar el correo:', error);
  });
};

const sendEmail3 = (direccion) => {
  const templateHTML = `
  <!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

  <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="x-apple-disable-message-reformatting">
      <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">

      <meta name="color-scheme" content="light">
      <meta name="supported-color-schemes" content="light">

      
      <!--[if !mso]><!-->
        
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap">

        <style type="text/css">
        // TODO: fix me!
          @import url(https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&family=Open+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap);
      </style>
      
      <!--<![endif]-->

      <!--[if mso]>
        <style>
            // TODO: fix me!
            * {
                font-family: sans-serif !important;
            }
        </style>
      <![endif]-->
  
      
      <!-- NOTE: the title is processed in the backend during the campaign dispatch -->
      <title></title>

      <!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
              <o:AllowPNG/>
              <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
      
  <style>
      :root {
          color-scheme: light;
          supported-color-schemes: light;
      }

      html,
      body {
          margin: 0 auto !important;
          padding: 0 !important;
          height: 100% !important;
          width: 100% !important;

          overflow-wrap: break-word;
          -ms-word-break: break-all;
          -ms-word-break: break-word;
          word-break: break-all;
          word-break: break-word;
      }


      
direction: undefined;
center,
#body_table {
  
}

ul, ol {
  padding: 0;
  margin-top: 0;
  margin-bottom: 0;
}

li {
  margin-bottom: 0;
}



.list-block-list-outside-left li {
  margin-left: 20px !important;
}

.list-block-list-outside-right li {
  margin-right: 20px !important;
}


  .paragraph {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #5f5f5f;
    
  }


  .heading1 {
    font-size: 32px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .heading2 {
    font-size: 28px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .heading3 {
    font-size: 20px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #444444;
    
  }


  .list {
    font-size: 16px;
    font-family: Open Sans, sans-serif;
    font-weight: normal;
    font-style: normal;
    text-align: start;
    line-height: 1;
    text-decoration: none;
    color: #5f5f5f;
    
  }


p a, 
li a {
  
display: inline-block;  
  color: #3498db;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;

}

.button-table a {
  text-decoration: none;
  font-style: normal;
  font-weight: normal;
}

.paragraph > span {text-decoration: none;}.heading1 > span {text-decoration: none;}.heading2 > span {text-decoration: none;}.heading3 > span {text-decoration: none;}.list > span {text-decoration: none;}


      * {
          -ms-text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
      }

      div[style*="margin: 16px 0"] {
          margin: 0 !important;
      }

      #MessageViewBody,
      #MessageWebViewDiv {
          width: 100% !important;
      }

      table {
          border-collapse: collapse;
          border-spacing: 0;
          mso-table-lspace: 0pt !important;
          mso-table-rspace: 0pt !important;
      }
      table:not(.button-table) {
          border-spacing: 0 !important;
          border-collapse: collapse !important;
          table-layout: fixed !important;
          margin: 0 auto !important;
      }

      th {
          font-weight: normal;
      }

      tr td p {
          margin: 0;
      }

      img {
          -ms-interpolation-mode: bicubic;
      }

      a[x-apple-data-detectors],

      .unstyle-auto-detected-links a,
      .aBn {
          border-bottom: 0 !important;
          cursor: default !important;
          color: inherit !important;
          text-decoration: none !important;
          font-size: inherit !important;
          font-family: inherit !important;
          font-weight: inherit !important;
          line-height: inherit !important;
      }

      .im {
          color: inherit !important;
      }

      .a6S {
          display: none !important;
          opacity: 0.01 !important;
      }

      img.g-img+div {
          display: none !important;
      }

      @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
          u~div .contentMainTable {
              min-width: 320px !important;
          }
      }

      @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
          u~div .contentMainTable {
              min-width: 375px !important;
          }
      }

      @media only screen and (min-device-width: 414px) {
          u~div .contentMainTable {
              min-width: 414px !important;
          }
      }
  </style>

  <style>
      @media only screen and (max-device-width: 600px) {
          .contentMainTable {
              width: 100% !important;
              margin: auto !important;
          }
          .single-column {
              width: 100% !important;
              margin: auto !important;
          }
          .multi-column {
              width: 100% !important;
              margin: auto !important;
          }
          .imageBlockWrapper {
              width: 100% !important;
              margin: auto !important;
          }
      }
      @media only screen and (max-width: 600px) {
          .contentMainTable {
              width: 100% !important;
              margin: auto !important;
          }
          .single-column {
              width: 100% !important;
              margin: auto !important;
          }
          .multi-column {
              width: 100% !important;
              margin: auto !important;
          }
          .imageBlockWrapper {
              width: 100% !important;
              margin: auto !important;
          }
      }
  </style>
  <style></style>
  
<!--[if mso | IE]>
  <style>
      .list-block-outlook-outside-left {
          margin-left: -18px;
      }
  
      .list-block-outlook-outside-right {
          margin-right: -18px;
      }

      a:link, span.MsoHyperlink {
          mso-style-priority:99;
          
display: inline-block;  
  color: #3498db;
  text-decoration: none;
  font-style: normal;
  font-weight: normal;

      }
  </style>
<![endif]-->


  </head>

  <body width="100%" style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #DBFFE9;">
      <center role="article" aria-roledescription="email" lang="en" style="width: 100%; background-color: #DBFFE9;">
          <!--[if mso | IE]>
          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" id="body_table" style="background-color: #DBFFE9;">
          <tbody>    
              <tr>
                  <td>
                  <![endif]-->
                      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="margin: auto;" class="contentMainTable">
                          <tr class="wp-block-editor-headingblock-v1"><td valign="top" style="background-color:#fff;display:block;padding-top:50px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:center"><p style="font-family:Open Sans, sans-serif;text-align:center;line-height:36.80px;font-size:32px;background-color:#fff;color:#444444;margin:0;word-break:normal" class="heading1">Pedido Entregado!</p></td></tr><tr class="wp-block-editor-spacerblock-v1"><td style="background-color:#fff;line-height:40px;font-size:40px;width:100%;min-width:100%">&nbsp;</td></tr><tr class="wp-block-editor-paragraphblock-v1"><td valign="top" style="padding:20px 20px 20px 20px;background-color:#fff"><p class="paragraph" style="font-family:Open Sans, sans-serif;text-align:left;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;letter-spacing:0;word-break:normal">Su pedido fue entregado a la dirección: ${direccion}</p></td></tr><tr class="wp-block-editor-imageblock-v1"><td style="background-color:#fff;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px" align="center"><table align="center" width="196" class="imageBlockWrapper" style="width:196px" role="presentation"><tbody><tr><td style="padding:0"><img src="https://api.smtprelay.co/userfile/40844065-6c4f-453e-aade-2f178cd67255/95405564-icono-de-línea-de-seguimiento-de-paquetes-signo-de-monitoreo-de-entrega-símbolo-de-ubicación-de-la.jpg" width="196" height="" alt="" style="border-radius:0px;display:block;height:auto;width:100%;max-width:100%;border:0" class="g-img"></td></tr></tbody></table></td></tr><tr class="wp-block-editor-socialiconsblock-v1" role="article" aria-roledescription="social-icons" style="display:table-row;background-color:#fff"><td style="width:100%"><table style="background-color:#fff;width:100%;padding-top:20px;padding-bottom:20px;padding-left:20px;padding-right:20px;border-collapse:separate !important" cellpadding="0" cellspacing="0" role="presentation"><tbody><tr><td align="center" valign="top"><div style="max-width:560px"><table role="presentation" style="width:100%" cellpadding="0" cellspacing="0" width="100%"><tbody><tr><td valign="top"><div style="margin-left:auto;margin-right:auto;margin-top:-2px;margin-bottom:-2px;width:100%;max-width:114px"><table role="presentation" style="padding-left:223" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><td><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://facebook.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/facebook/facebook-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Facebook"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://whatsapp.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/whatsapp/whatsapp-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Whatsapp"></a></td></tr></tbody></table><table role="presentation" align="left" style="float:left" class="single-social-icon" cellpadding="0" cellspacing="0"><tbody><tr><td valign="top" style="padding-top:2px;padding-bottom:2px;padding-left:4px;padding-right:4px;border-collapse:collapse !important;border-spacing:0;font-size:0"><a class="social-icon--link" href="https://example.com" target="_blank" rel="noreferrer"><img src="https://template-editor-assets.s3.eu-west-3.amazonaws.com/assets/social-icons/website/website-round-solid-color.png" width="30" height="30" style="max-width:30px;display:block;border:0" alt="Website"></a></td></tr></tbody></table></td></tr></tbody></table></div></td></tr></tbody></table></div></td></tr></tbody></table></td></tr><tr><td valign="top" align="center" style="padding:20px 20px 20px 20px;background-color:#fff"><p aria-label="Unsubscribe" class="paragraph" style="font-family:Open Sans, sans-serif;text-align:center;line-height:18.40px;font-size:16px;margin:0;color:#5f5f5f;letter-spacing:0;word-break:normal">Imprimir</p></td></tr>
                      </table>
                  <!--[if mso | IE]>
                  </td>
              </tr>
          </tbody>
          </table>
          <![endif]-->
      </center>
  </body>
</html>
  `;
  Email.send({
    Host: 'smtp.elasticemail.com', // Reemplaza con el servidor SMTP que uses
    Username: 'grupomaslimpio39@gmail.com', // Reemplaza con tu nombre de usuario SMTP
    Password: '69E01DB91010FCA73CF620B5C721E5FD2B78', // Reemplaza con tu contraseña SMTP
    To: 'felixomardominguez847@gmail.com', // Reemplaza con la dirección de correo del equipo de soporte
    From: 'grupomaslimpio39@gmail.com', // Reemplaza con tu dirección de correo
    Subject: 'Pedido Confirmado',
    Body: templateHTML,
    ContentType: 'text/html; charset=utf-8' // Indica que el cuerpo es HTML
  })
    
  .then(function (message) {
      console.log('Correo enviado correctamente:', message);
  })
  .catch(function (error) {
      console.error('Error al enviar el correo:', error);
  });
};