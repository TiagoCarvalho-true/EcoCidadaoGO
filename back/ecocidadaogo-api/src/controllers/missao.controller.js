const missaoService = require('../services/missao.service');

exports.criarMissao = async (req, res) => {
  try {
    const missao = await missaoService.criar(req.body);
    res.status(201).json(missao);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarMissoes = async (req, res) => {
  try {
    const missoes = await missaoService.listar();
    res.json(missoes);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
