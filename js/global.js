export const global = () => {
    // Obtener el cuerpo de la tabla
    const tablaBody = document.getElementById("tabla-body");
  
    // Obtener los productos del localStorage o inicializar un array vacío si no hay productos guardados
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Función para capitalizar la primera letra de una cadena
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  
    // Función para mostrar los productos en la tabla
    const mostrarProductos = () => {
      // Limpiar la tabla antes de mostrar los productos
      tablaBody.innerHTML = "";
  
      // Iterar sobre cada producto y crear una fila en la tabla
      productos.forEach((producto, i) => {
        const nuevaFila = document.createElement("tr");
        nuevaFila.classList.add("row");
  
        // Formatear el precio con puntos como separador de miles y coma como separador decimal
        const precioFormateado = parseFloat(producto["Precio"]).toLocaleString(
          "es-CO",
          {
            style: "currency",
            currency: "COP",
          }
        );
  
        // Generar el HTML de la fila usando plantillas de cadena de texto
        nuevaFila.innerHTML = `
        <td class="cell-line">${i + 1}</td>
        <td class="cell-line">${producto["Id"]}</td>
        <td class="cell-line">${capitalizeFirstLetter(producto["Categoria"])}</td>
        <td class="cell-line">${capitalizeFirstLetter(
          producto["Referencia"]
        )}</td>
        <td class="cell-line">${capitalizeFirstLetter(producto["Nombre"])}</td>
        <td class="cell-line">${capitalizeFirstLetter(
          producto["Descripcion"]
        )}</td>
        <td class="cell-line azul">${precioFormateado}</td>
        <td class="cell-line">${capitalizeFirstLetter(producto["Marca"])}</td>
        <td class="cell-line">${producto["Stock"]}</td>
        <td class="cell-line acciones">
            <i class="fas fa-info-circle gris detalle"></i>
            <i class="fas fa-edit editar"></i>
            <i class="fas fa-trash-alt rojo eliminar eliminar-btn"></i>
        </td>
    `;
  
        // Agregar la nueva fila a la tabla
        tablaBody.appendChild(nuevaFila);
  
        const eliminarBtn = nuevaFila.querySelector(".eliminar-btn");
        eliminarBtn.addEventListener("click", () => {
          eliminarProducto(producto.Id); // Llamamos a la función eliminarProducto con el ID del producto
        });
      });
    };
  
    // Mostrar productos al cargar la página
    mostrarProductos();
  
    const formAgregarProducto = document.getElementById("form_agregar_producto");
    formAgregarProducto.addEventListener("submit", (e) => {
      e.preventDefault();
  
      // Obtener los valores del formulario
      const categoria = formAgregarProducto.querySelector(
        "[name=categoriaAdd]"
      ).value;
      const referencia = formAgregarProducto.querySelector(
        "[name=referenciaAdd]"
      ).value;
      const nombre = formAgregarProducto.querySelector("[name=nombreAdd]").value;
      const descripcion = formAgregarProducto.querySelector(
        "[name=descripcionAdd]"
      ).value;
      const precio = formAgregarProducto.querySelector("[name=precioAdd]").value;
      const marca = formAgregarProducto.querySelector("[name=marcaAdd]").value;
      const cantidad =
        formAgregarProducto.querySelector("[name=cantidadAdd]").value;
  
      // Validar que todos los campos estén llenos
      if (
        !categoria ||
        !referencia ||
        !nombre ||
        !descripcion ||
        !precio ||
        !marca ||
        !cantidad
      ) {
        alert("Por favor, complete todos los campos.");
        return;
      }
      // Verificar si la referencia ya existe en la lista de productos
      const referenciaExistente = productos.some(
        (producto) => producto.Referencia === referencia
      );
      if (referenciaExistente) {
        alert(
          "¡Error! Este producto ya existe. Buscalo en la lista y agrega mas cantidad"
        );
        formAgregarProducto.reset();
        document.getElementById(
          "contenedor-formulario-agregar-producto"
        ).style.display = "none";
        return;
      }
  
      // Generar un ID aleatorio con formato "RGXXXX"
      const idAleatorio = generarIDAleatorio();
  
      const nuevoProducto = {
        Id: idAleatorio,
        Categoria: categoria,
        Referencia: referencia,
        Nombre: nombre,
        Descripcion: descripcion,
        Precio: precio,
        Marca: marca,
        Stock: cantidad,
      };
  
      // Agregar el nuevo producto al array
      productos.push(nuevoProducto);
      // Actualizar el localStorage
      localStorage.setItem("productos", JSON.stringify(productos));
  
      // Limpiar el formulario después de agregar el producto
      formAgregarProducto.reset();
      document.getElementById(
        "contenedor-formulario-agregar-producto"
      ).style.display = "none";
  
      // Mostrar nuevamente los productos en la tabla
      mostrarProductos();
    });
  
    // Función para eliminar un producto por su ID
    const eliminarProducto = (idProducto) => {
      // Encontrar el índice del producto en el array de productos
      const indice = productos.findIndex(
        (producto) => producto.Id === idProducto
      );
    
      // Verificar si se encontró el producto
      if (indice !== -1) {
        const nombreProducto = productos[indice].Nombre; // Obtener el nombre del producto
        // Utilizar un cuadro de confirmación en lugar de una alerta
        if (confirm(`¿Estás seguro de eliminar el producto "${nombreProducto}" con ID ${idProducto}?`)) {
          // Eliminar el producto del array
          productos.splice(indice, 1);
          // Actualizar el localStorage
          localStorage.setItem("productos", JSON.stringify(productos));
          // Volver a mostrar los productos en la tabla
          mostrarProductos();
          // Mostrar mensaje de éxito
          alert(`El producto con ID ${idProducto} y nombre "${nombreProducto}" ha sido eliminado.`);
        }
      } else {
        alert("No se encontró el producto.");
      }
    };
    
    
    // Función para generar un ID aleatorio con formato "RGXXXX"
    const generarIDAleatorio = () => {
      const randomNumber = Math.floor(Math.random() * 10000); // Generar un número aleatorio de 0 a 9999
      const paddedNumber = randomNumber.toString().padStart(4, "0"); // Añadir ceros a la izquierda si es necesario
      return "RG" + paddedNumber;
    };
  };
  