//Importa el mdulo mongoose, que es  una biblioteca para modelar objetos MongoDB en node.js
const mongoose = require('mongoose');
// Define un nuevo esquema de mongoose para la entidad 'Usuario'. Un esquema es una
// descripción de la estructura de los documentos que se almacenarán en la colección.
const usuarioSchema = new mongoose.Schema({

    //Define un campo 'name' de tipo String que es obligatorio (required) al crear un nuevo usuario.
    name: {
        type: String,
        required: true
        },
        
    // Define un campo 'username' de tipo String que es obligatorio (required) al crear un nuevo usuario.
    username: {
        type: String,
        required: true
        },
    
    // Define un campo 'password' de tipo String que es obligatorio (required) al crear un nuevo usuario.
    password: {
        type: String,
        required: true
        }
    
    //Puedes agregar otros campos según sea necesario para representar la información del usuario.
    });
    
    
    // Crea un modelo de mongoose llamado 'Usuario' basado en el esquema 'usuarioSchema'
    // Este modelo se utilizará para realizar operaciones CRUD en la colección 'usuarios de MongoDB.
    const Usuario = mongoose.model('Usuario', usuarioSchema);
    
    
    // Exporta el modelo 'Usuario para que pueda ser utilizado en otros archivos.
    module.exports = Usuario;