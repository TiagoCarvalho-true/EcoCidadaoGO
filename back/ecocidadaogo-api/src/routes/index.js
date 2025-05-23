const { Router } = require('express');
const missaoRoutes = require('./missao.routes');
const rankingRoutes = require('./ranking.routes');
const missaoUsuarioRoutes = require('./missaoUsuario.routes');
const authRoutes = require('./auth.routes');
const coletaRoutas = require('./coleta.routes');
// (adicione aqui outras rotas conforme for criando)
const routes = Router();

routes.use('/auth', authRoutes);
routes.use('/missoes-usuario', missaoUsuarioRoutes);
routes.use('/missoes', missaoRoutes);
routes.use('/ranking', rankingRoutes);
routes.use('/coletas', coletaRoutas);

module.exports = routes;

