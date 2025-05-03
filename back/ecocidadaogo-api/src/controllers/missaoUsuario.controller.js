// src/controllers/missaoUsuario.controller.js
const service = require('../services/missaoUsuario.service');

async function concluirMissao(req, res) {
  try {
    const usuarioId = req.user.id;      // supondo que você tenha middleware de JWT que popula req.user
    const missaoId = parseInt(req.params.id, 10);

    const resultado = await service.concluir(usuarioId, missaoId);
    return res.json({ message: 'Missão concluída!', data: resultado });
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

module.exports = { concluirMissao };
