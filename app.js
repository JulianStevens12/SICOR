// Importación de módulos
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ejs = require("ejs");
const axios = require("axios");
const path = require("path");
const auth = require("./routes/auth"); // Importa las rutas de autenticación desde el archivo auth.js

// Creación de una aplicación Express
const app = express();

//Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, "public")));

// Configurar la carpeta 'views' para las vistas EJS
app.set("views", path.join(__dirname, "views"));

// Configuración del motor de plantillas EJS
app.set("view engine", "ejs");

// Puerto en el que el servidor escuchará las solicitudes
const port = 4000;

// Habilita CORS para permitir solicitudes desde otros dominios
app.use(cors());

// Configuración para manejar solicitudes JSON
app.use(express.json());

// Define una ruta para cargar index.html como página de entrada
app.get("/", (req, res) => {
    res.render("index");
});
//Define las rutas en tu aplicacion, en este caso, la ruta de autenticacion 'api'


app.use('/api', auth);

mongoose.connect(
    "mongodb+srv://TwoSoftware:1005912587RAMIREZz@devapi.4qjfrcw.mongodb.net/login?retryWrites=true&w=majority")
.then(() => {
    console.log(" conectado a mongo db");
    //configuramos en que puerto queremos que nos escuche nuestra app
app.listen(port, () => {
    console.log(`Conectado al servidor  http://localhost:${port}`);
    });
})
.catch((error) => {
    console.log(error);
});
