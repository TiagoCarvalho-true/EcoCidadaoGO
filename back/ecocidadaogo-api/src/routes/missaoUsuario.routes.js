// src/routes/missaoUsuario.routes.js
const { Router } = require('express');
const controller = require('../controllers/missaoUsuario.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const router = Router();


router.post('/:id/concluir',
  authMiddleware,              // <— aqui
  controller.concluirMissao
);


module.exports = router;
