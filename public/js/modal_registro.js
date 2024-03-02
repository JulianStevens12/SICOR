// Función para abrir el modal
function abrirModal () {
    // Oculta el formulario de inicio de sesión.
    document.getElementById('form-logon').style.display = 'none'
    // Muestra el modal.
    document.getElementById('modal').style.display = 'block'
  }
  // Función para abrir el modal desde un enlace
  function abrirModalDesdeEnlace () {
    // Muestra el modal al hacer clic en el enlace.
    abrirModal()
  }
  // Función para cerrar el modal
  function cerrarModal () {
    // Muestra el formulario de inicio de sesión al cerrar el modal.
    document.getElementById('form-logon').style.display = 'inline-block';
    // Oculta el modal.
    document.getElementById('modal').style.display = 'none';
  }
  // Función asíncrona para enviar datos de registro al servidor
  const enviarRegistro = async () => {
    // Obtiene los valores de los campos del formulario de registro.
    const name = document.getElementById('name').value;
    const username = document.getElementById('registro_username').value;
    const password = document.getElementById('registro_password').value;
    const mensajeRegistro = document.getElementById('mensajeRegistro')
  
    try {
      // Envía una solicitud POST al servidor con los datos de registro.
      const response = await axios.post('/api/registro', {
        name,
        username,
        password
        //Agrega mas campos segun tus necesidades
      });
      //Cierra el modal despues de un registro exitoso
      cerrarModal();
      // Si la respuesta del servidor tiene un código de estado 201 (creado con éxito).
      if (response.status === 201) {
        // Muestra una alerta de registro exitoso en el HTML.
        mensajeRegistro.innerHTML = `<span style=color:green;">${response.data.mensaje}</span>`;
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
  
      // Maneja errores, incluyendo mensajes de error del servidor si están disponibles.
      if (error.response && error.response.data && error.response.data.error) {
          mensajeRegistro.innerHTML = `<span style="color: red;">${error.response.data.error}</span>`;
      } else {
          mensajeRegistro.innerHTML = `<span style="color: red;">Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde.</span>`;
      }
  }

  };