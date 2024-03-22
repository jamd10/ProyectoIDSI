function loggedIn(){
    if(localStorage["correo"] == null){
        document.getElementById("LogInMenuButton").href="main.html";
        document.getElementById("LogInMenuButton").textContent="Iniciar Sesion";
    }else{
        var us = localStorage.getItem('usuario');
        var usuario = us ? JSON.parse(us) : [];
        if(localStorage["Admin"] == null && localStorage["Repartidor"] == null && usuario != null){
            document.getElementById("LogInMenuButton").href="PerfilUsuario.html";
            document.getElementById("LogInMenuButton").textContent=usuario.nombre;
        }else if(localStorage["Repartidor"] == "Repartidor"){
            document.getElementById("LogInMenuButton").href="repartidor.html";
            document.getElementById("LogInMenuButton").textContent="Perfil Repartidor";
        }else{
            document.getElementById("LogInMenuButton").href="index_admin.html";
            document.getElementById("LogInMenuButton").textContent="Perfil Administrador";
        }
    }
}