const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Obtener todos los registros
router.get("/productos", (req, res) => {
  const query = "SELECT * FROM productos";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Crear un nuevo registro
router.post("/productos", (req, res) => {
  const { nombre, precio } = req.body;
  const query = "INSERT INTO productos (nombre, precio) VALUES (?, ?)";
  db.query(query, [nombre, precio], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ mensaje: "Producto creado", id: results.insertId });
  });
});

// Eliminar un registro
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM productos WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ mensaje: "Producto eliminado", affectedRows: results.affectedRows });
  });
});

module.exports = router;
