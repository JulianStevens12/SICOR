const enviarDatos = async () => {
  // Obtiene los valores de los campos de nombre de usuario y contraseña del formulario.
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  try {
      // Envía una solicitud POST al servidor con los datos de nombre de usuario y contraseña.
      const response = await axios.post('/api/login', {
          username,
          password
      });
      
      // Si la respuesta del servidor tiene un código de estado 200 (éxito).
      if (response.status === 200) {
        alert('Ingreso exitoso');
          // Redirige el usuario a la página principal o realiza alguna otra acción según sea necesario.
          window.location.href = '/';
      }
  } catch (error) {
      // Maneja los errores, incluyendo mensajes de error del servidor si están disponibles.
      if (error.response && error.response.data && error.response.data.error) {
          // Obtiene el mensaje de error del cuerpo de la respuesta.
          const mensaje = error.response.data.error;
          // Muestra una alerta en el navegador con el mensaje de error.
          alert(mensaje);
      } else {
          // Muestra un mensaje de error en la consola si no hay una respuesta del servidor.
          console.error('Error en la solicitud:', error.message);
          // Maneja otros tipos de errores si es necesario.
      }
  }
};
