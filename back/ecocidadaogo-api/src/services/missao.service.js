const missaoRepository = require('../repositories/missao.repository');

exports.criar = async (dados) => {
  return await missaoRepository.criarMissao(dados);
};

exports.listar = async () => {
  return await missaoRepository.listarMissoesAtivas();
};
