function loggedIn(){
    if(localStorage["correo"] == null){
        document.getElementById("LogInMenuButton").href="main.html";
        document.getElementById("LogInMenuButton").textContent="Iniciar Sesion";
    }else{
        if(localStorage["Admin"] == null){
            document.getElementById("LogInMenuButton").href="PerfilUsuario.html";
            document.getElementById("LogInMenuButton").textContent="Perfil Usuario";
        }else{
            document.getElementById("LogInMenuButton").href="index_admin.html";
            document.getElementById("LogInMenuButton").textContent="Perfil Administrador";
        }
    }
}