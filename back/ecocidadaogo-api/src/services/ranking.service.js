const repo = require('../repositories/ranking.repository');

async function obterRanking() {
  return repo.buscarTop10();
}

module.exports = { obterRanking };
