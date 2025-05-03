const repo = require('../repositories/missao.repository');

async function criar(dados) {
  // aqui você pode validar dados, por exemplo:
  if (!dados.titulo || !dados.pontos) {
    throw new Error('Título e pontos são obrigatórios');
  }
  return repo.criarMissao(dados);
}

async function listar() {
  return repo.listarMissoesAtivas();
}

module.exports = { criar, listar };
