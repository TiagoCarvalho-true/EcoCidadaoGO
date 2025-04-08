const rankingService = require('../services/ranking.service');

exports.listarTopUsuarios = async (req, res) => {
  try {
    const ranking = await rankingService.obterRanking();
    res.json(ranking);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
