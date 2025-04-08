const { Router } = require('express');
const missaoRoutes = require('./missao.routes');
const rankingRoutes = require('./ranking.routes');

const routes = Router();

routes.use('/missoes', missaoRoutes);
routes.use('/ranking', rankingRoutes);

module.exports = routes;
