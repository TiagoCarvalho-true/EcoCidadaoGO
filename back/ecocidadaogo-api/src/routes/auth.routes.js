const { Router } = require('express');
const auth = require('../controllers/auth.controller');

const router = Router();
router.post('/register', auth.register);
router.post('/login', auth.login);
router.post('/google', auth.googleAuth);

module.exports = router;