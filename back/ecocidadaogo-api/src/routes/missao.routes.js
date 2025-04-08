const { Router } = require('express');
const missaoController = require('../controllers/missao.controller');

const router = Router();

router.post('/', missaoController.criarMissao);
router.get('/', missaoController.listarMissoes);

module.exports = router;
