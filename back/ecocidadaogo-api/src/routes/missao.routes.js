const { Router } = require('express');
const controller = require('../controllers/missao.controller');

const router = Router();
router.post('/', controller.criarMissao);
router.get('/', controller.listarMissoes);

module.exports = router;
