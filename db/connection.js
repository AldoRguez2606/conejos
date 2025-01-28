const mysql = require('mysql2');

// Configuración de la base de datos
const connection = mysql.createConnection({
  host: 'monorail.proxy.rlwy.net',  // El host de la base de datos (extraído de la URL)
  user: 'root',                     // El usuario
  password: 'puqDlYtcXCHxWdUCXIwofYtnozKFifLd', // La contraseña
  database: 'railway',              // El nombre de la base de datos
  port: 58701                       // El puerto (58701 como se especifica en la URL)
});
// Conexión
// Conexión a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos: ', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = mysql;
