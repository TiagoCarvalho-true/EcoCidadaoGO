const service = require('../services/missao.service');

async function criarMissao(req, res) {
  try {
    const missao = await service.criar(req.body);
    return res.status(201).json(missao);
  } catch (err) {
    return res.status(400).json({ erro: err.message });
  }
}

async function listarMissoes(req, res) {
  try {
    const missoes = await service.listar();
    return res.json(missoes);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

module.exports = { criarMissao, listarMissoes };
