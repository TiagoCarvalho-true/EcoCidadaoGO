const { Router } = require('express');
const controller = require('../controllers/ranking.controller');

const router = Router();
router.get('/', controller.listarTopUsuarios);

module.exports = router;
