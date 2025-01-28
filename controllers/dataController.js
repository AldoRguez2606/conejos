const db = require('../config/db');


// Crear un nuevo registro en 'data'
const createData = (req, res) => {
  const { temp, hum, water, ligth, date, jail_id, jail_users_id } = req.body;

  db.query('INSERT INTO data (temp, hum, water, ligth, date, jail_id, jail_users_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [temp, hum, water, ligth, date, jail_id, jail_users_id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Datos insertados correctamente' });
    });
};

// Obtener todos los registros de 'data'
const getData = (req, res) => {  
  db.query('SELECT * FROM data', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Editar un registro de 'data'
const editData = (req, res) => {
  const { id } = req.params;
  const { temp, hum, water, ligth, date, jail_id, jail_users_id } = req.body;

  db.query('UPDATE data SET temp = ?, hum = ?, water = ?, ligth = ?, date = ?, jail_id = ?, jail_users_id = ? WHERE id = ?',
    [temp, hum, water, ligth, date, jail_id, jail_users_id, id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Datos actualizados correctamente' });
    });
};

// Eliminar un registro de 'data'
const deleteData = (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM data WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Datos eliminados correctamente' });
  });
};

// Obtener los registros  de un usuario
const getDataByUser = (req, res) => {
  const { id } = req.params;

  console.log( req );
  

  db.query('SELECT * FROM data WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    res.status(200).json(results);
  });
};

module.exports = { createData, getData, editData, deleteData, getDataByUser };
