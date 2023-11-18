document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registration-form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");
    const passwordError = document.getElementById("password-error");

    registrationForm.addEventListener("submit", function (e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            passwordError.textContent = "Las contraseñas no coinciden";
        } else {
            passwordError.textContent = "";
        }
    });
});