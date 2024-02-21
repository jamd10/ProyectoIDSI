function loggedIn(){
    if(localStorage["correo"] == null){
        document.getElementById("LogInMenuButton").href="main.html";
        document.getElementById("LogInMenuButton").textContent="Iniciar Sesion";
    }else{
        var us = localStorage.getItem('usuario');
        var usuario = us ? JSON.parse(us) : [];
        if(localStorage["Admin"] == null){
            var str = usuario.nombre;
            if(usuario.nombre.length > 20){
                str = usuario.nombre.substring(0,20);
            }
            document.getElementById("LogInMenuButton").href="PerfilUsuario.html";
            document.getElementById("LogInMenuButton").textContent=str;
        }else{
            document.getElementById("LogInMenuButton").href="index_admin.html";
            document.getElementById("LogInMenuButton").textContent="Perfil Administrador";
        }
    }
}