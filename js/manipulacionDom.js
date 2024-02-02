export const manipulacionDom = () => {
      const formAgregarProducto = document.getElementById("contenedor-formulario-agregar-producto");
      const btnMostrarFormAgregar = document.getElementById("btn-mostrar-form-agregar");
      const btnCancelarAddProducto = document.getElementById("btnCancelarAddProducto");
      const menu = document.getElementById("section-menu");
      const links = document.querySelectorAll(".link");

      const abrirMenu = () =>{
          menu.style.width = "150px";
          links.forEach(link => {
              link.style.display = "block";
          });
      }

      const cerrarMenu = () =>{
          menu.style.width = "50px";
          links.forEach(link => {
              link.style.display = "none";
          });
      }

      const mostrarMenuAdd = () =>{
        console.log('boton mostrar menu funciona')
         formAgregarProducto.style.display = "flex"
      }
      const ocultarMenuAdd = () =>{
         formAgregarProducto.style.display = "none"
      }
      
      menu.addEventListener('mouseover', abrirMenu);
      menu.addEventListener('mouseout', cerrarMenu);  
      btnMostrarFormAgregar.addEventListener('click', mostrarMenuAdd);
      btnCancelarAddProducto.addEventListener('click', ocultarMenuAdd);

};
