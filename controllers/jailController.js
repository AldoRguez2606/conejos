const db = require('../config/db');

// Crear una nueva cárcel
const createJail = (req, res) => {
  const { code, users_id } = req.body;

  db.query('INSERT INTO jail (code, users_id) VALUES (?, ?)', [code, users_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Cárcel registrada correctamente' });
  });
};

// Obtener todas las cárceles
const getJails = (req, res) => {
  db.query('SELECT * FROM jail', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Obtener las cárceles asignadas a un usuario específico
const getJailsByUser = (req, res) => {
  const { id } = req.params;

  db.query('SELECT * FROM jail WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    res.status(200).json(results);
  });
};

// Editar una cárcel
const editJail = (req, res) => {
  const { id } = req.params;
  const { code, users_id } = req.body;

  db.query('UPDATE jail SET code = ?, users_id = ? WHERE id = ?', [code, users_id, id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cárcel actualizada correctamente' });
  });
};

// Eliminar una cárcel
const deleteJail = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM jail WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Cárcel eliminada correctamente' });
  });
};

module.exports = { createJail, getJails, editJail, deleteJail, getJailsByUser };
