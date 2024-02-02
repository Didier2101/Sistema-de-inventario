// validacionFormularios.js
export const validacionFormLogin = () => {
      const form = document.querySelector(".form-login");
      const inputCorreoL = document.getElementById("ipt-email-login");
      const inputPasswordL = document.getElementById("ipt-email-pass");

      if (form) {
          form.addEventListener("submit", (e) => {
              e.preventDefault();
              console.log("Botón haciendo clic primero");

              if (inputCorreoL.value.trim() === "" || inputPasswordL.value.trim() === "") {
                  console.log("complete todos los campos");
                  alert("Por favor, complete todos los campos.");
                  return false;
              }
              if (inputCorreoL.value !== "didier.@gmail.com" || inputPasswordL.value !== "123") {
                  console.log("contraseñas incorrectas");
                  alert("Correo o contraseña incorrectos. Intente de nuevo.");
                  return false;
              }
              window.location.replace("../app/dashboard.html");
              // / Simula un tiempo de carga antes de redirigir al dashboard (puedes ajustar el tiempo)
    //   Swal.fire({
    //     position: "center",
    //     icon: "success",
    //     title: "Bienvenido",
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   setTimeout(() => {
    //       loader.style.display = "none";
    //       window.location.replace("./app/plantillas/dashboard.html");
    //     }, 1500);
          });
      }
};
