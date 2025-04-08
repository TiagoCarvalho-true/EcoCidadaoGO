const rankingRepository = require('../repositories/ranking.repository');

exports.obterRanking = async () => {
  return await rankingRepository.buscarTop10();
};
