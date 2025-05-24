const { Router } = require('express');
const { perfil } = require('../controllers/usuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');

const router = Router();

// Rota para obter perfil do usuário logado
router.get('/perfil', authMiddleware, perfil);

module.exports = router;