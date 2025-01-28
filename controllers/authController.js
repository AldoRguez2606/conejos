const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Registrar un nuevo usuario
const register = async (req, res) => {
  const { name, user, password } = req.body;

  db.query('SELECT * FROM users WHERE user = ?', [user], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query('INSERT INTO users (name, user, password) VALUES (?, ?, ?)', [name, user, hashedPassword], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    });
  });
};

// Login de un usuario
const login = (req, res) => {
  const { user, password } = req.body;
  
  db.query('SELECT * FROM users WHERE user = ?', [user], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

    const userData = results[0];

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: userData.id, user: userData.user }, 'tu_clave_secreta', { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token });
  });
};

// Obtener la información de un usuario por ID
const getUserById = (req, res) => {
  const { id } = req.params;

  db.query('SELECT id, name, user FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(results[0]);
  });
};

// Obtener todos los usuarios
const getAllUsers = (req, res) => {
  db.query('SELECT id, name, user FROM users', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    res.status(200).json(results);
  });
};

// Cambiar la contraseña de un usuario
const changePassword = (req, res) => {
  const { id } = req.params;
  const { currentPassword, newPassword } = req.body;

  db.query('SELECT password FROM users WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error en la base de datos' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const user = results[0];

    // Verificar si la contraseña actual es correcta
    if (!bcrypt.compareSync(currentPassword, user.password)) {
      return res.status(400).json({ message: 'La contraseña actual es incorrecta' });
    }

    const hashedPassword = bcrypt.hashSync(newPassword, 10);

    db.query('UPDATE users SET password = ? WHERE id = ?', [hashedPassword, id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error al cambiar la contraseña' });
      }

      res.status(200).json({ message: 'Contraseña cambiada exitosamente' });
    });
  });
};

// Editar usuario
const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, user, password } = req.body;

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE id = ?', [id], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const hashedPassword = password ? await bcrypt.hash(password, 10) : results[0].password;

    db.query('UPDATE users SET name = ?, user = ?, password = ? WHERE id = ?', [name, user, hashedPassword, id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario actualizado correctamente' });
    });
  });
};

// Eliminar usuario
const deleteUser = (req, res) => {
  const { id } = req.params;

  // Verificar si el usuario existe
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    db.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Usuario eliminado correctamente' });
    });
  });
};

module.exports = { register, login, editUser, deleteUser, getUserById, getAllUsers, changePassword };
