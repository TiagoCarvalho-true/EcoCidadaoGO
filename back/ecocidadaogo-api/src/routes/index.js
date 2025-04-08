const { Router } = require('express');
const userRoutes = require('./user.routes');

const routes = Router();

routes.use('/usuarios', userRoutes);

module.exports = routes;
