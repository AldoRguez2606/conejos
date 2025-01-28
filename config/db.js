const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'monorail.proxy.rlwy.net',        // Host de la base de datos
  user: 'root',                           // Usuario
  password: 'DCTyfYqrVOfovXxJbHLKcDcnaZWIZVQF',  // Contraseña
  database: 'railway',                    // Nombre de la base de datos
  port: 12608                             // Puerto
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
