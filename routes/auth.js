const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/auth.js");

// Registro de usuarios
router.post("/registro", async (req, res) => {
  try {
    console.log(req.body);
    // Validación de datos de entrada
    if (!req.body.name || !req.body.username || !req.body.password) {
      return res.status(400).json({ error: "Por favor, proporciona todos los campos requeridos." });
    }
    // Verifica si el usuario ya existe
    const existingUser = await Usuario.findOne({
      username: req.body.username,
    });
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso." });
    }

    // Hashea la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    // Crea un nuevo usuario
    const newUser = new Usuario({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
    });

    // Guarda el usuario en la base de datos
    await newUser.save();
    console.log("Registro con exito");
    // Envia un mensaje JSON para confirmar el registro
    res.status(201).json({ mensaje: "Usuario registrado correctamente." });
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    res.status(500).json({ error: "Error al registrar el usuario." });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    //Buscamos al usuario en la base de datos
    const user = await Usuario.findOne({ username: username });
    //Si el usuario no existe, enviamos el mensaje de error al usuario
    if (!user) {
      console.log("No se encontró al usuario");
      return res.status(404).json({ error: "El usuario no existe",});
    }
    //Comparamos la contraseña proporcionada con la almacenada de manera serura
    const passwordValido = await bcrypt.compare(password, user.password);
    if (!passwordValido) {
      console.log("La contrasena es incorrecta");
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    //Si las credenciales  son válidas, creamos el token y lo enviamos al cliente
    const token = jwt.sign({ usuarioId: user._id }, "secreto", {
      expiresIn: "1h",
    });
    // Agrega un console.log para verificar el token creado
   // console.log("Token creado:", token);
    //Envia el token al cliente junto con un mensaje
    res.json({
      token: token,
      mensaje: "Inicio de sesión exitoso",
    });
    
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Ruta para cerrar sesión (logout)
router.post("/logout", (req, res) => {
  // Obtener el token del encabezado de autorización
  const authHeader = req.headers.authorization;
  
  // Verificar si el token existe en el encabezado de autorización
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Token no proporcionado" });
  }
  
  // Obtener el token de la cabecera eliminando el prefijo "Bearer "
  const token = authHeader.split(' ')[1];
  
  try {
    // Verificar y decodificar el token
    const decodedToken = jwt.verify(token, "secreto");
    
    // Si todo está bien, enviar una respuesta exitosa
    res.json({ mensaje: "Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token inválido" });
  }
});

// Ruta para eliminar usuario
router.delete("/eliminar/:id", async (req, res) => {
  const usuarioId = req.params.id;
  try {
    //Buscamos al usuario en la bas de datos
    const usuario = await Usuario.findById(usuarioId);
    //Si el usuario no existe, enviamos el mensaje de error al usuario
    if (!usuario) {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    //Elinamos al usuario de la base de datos
    await Usuario.findByIdAndDelete(usuarioId);
    //Envia un mensaje indicado que el usuario fue eliminado con exito
    res.json({ mensaje: "Usuario eliminado exitosamente" });
  } catch (error) {
    console.error("Error en el servidor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

module.exports = router;
