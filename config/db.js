const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

// Configuración de la base de datos local
// const db = mysql.createConnection({
//   host: 'localhost',  // El host de la base de datos (extraído de la URL)
//   user: 'root',                     // El usuario
//   password: 'root', // La contraseña
//   database: 'datosjaulas',              // El nombre de la base de datos
//   port: 3306                       // El puerto (46245 como se especifica en la URL)
// });

// Conexión a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = db;
