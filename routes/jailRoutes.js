const express = require('express');
const { createJail, getJails, editJail, deleteJail, getJailsByUser } = require('../controllers/jailController');
const { verifyToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/jail', verifyToken, createJail);
router.get('/jail', verifyToken, getJails);
router.get('/jail/:id', verifyToken, getJailsByUser);
router.put('/jail/:id', verifyToken, editJail);  // Editar cárcel
router.delete('/jail/:id', verifyToken, deleteJail);  // Eliminar cárcel

module.exports = router;
