const mysql = require("mysql2");

// Configuración de la base de datos
const db = mysql.createConnection({
  host: "localhost", // Cambia por tu host o dominio
  user: "root", // Tu usuario de MySQL
  password: "", // Tu contraseña
  database: "mi_base_de_datos", // Nombre de tu base de datos
});

// Conexión
db.connect((err) => {
  if (err) {
    console.error("Error conectando a la base de datos:", err);
    return;
  }
  console.log("Conexión a la base de datos establecida.");
});

module.exports = db;
