const express = require('express');
const { register, login, editUser, deleteUser, getUserById, getAllUsers, changePassword } = require('../controllers/authController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// Obtener la información de un usuario por ID
router.get('/users/:id', verifyToken, getUserById);

// Obtener todos los usuarios (solo accesible por admins)
router.get('/users', verifyToken, getAllUsers);

// Cambiar la contraseña de un usuario
router.put('/users/:id/password', verifyToken, changePassword);

router.put('/users/:id', verifyToken, editUser);  // Editar usuario
router.delete('/users/:id', verifyToken, deleteUser);  // Eliminar usuario

module.exports = router;
