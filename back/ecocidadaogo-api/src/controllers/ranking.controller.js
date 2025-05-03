const service = require('../services/ranking.service');

async function listarTopUsuarios(req, res) {
  try {
    const ranking = await service.obterRanking();
    return res.json(ranking);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

module.exports = { listarTopUsuarios };
