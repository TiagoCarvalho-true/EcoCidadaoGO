const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();



// Libere a origem do front-end
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // se precisar usar cookies/autenticação
}));
app.use(express.json());
app.use(routes);

module.exports = app;
