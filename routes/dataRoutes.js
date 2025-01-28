const express = require('express');
const { createData, getData, editData, deleteData, getDataByUser } = require('../controllers/dataController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/data', verifyToken, createData);
router.get('/data', verifyToken, getData);
router.get('/data/:id', verifyToken, getDataByUser);// Obtener los registros de datos de un usuario específico
router.put('/data/:id', verifyToken, editData);  // Editar datos
router.delete('/data/:id', verifyToken, deleteData);  // Eliminar datos

module.exports = router;
