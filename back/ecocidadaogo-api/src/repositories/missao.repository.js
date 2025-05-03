const prisma = require('../prisma');

async function criarMissao({ titulo, descricao, pontos }) {
  return prisma.missao.create({
    data: { titulo, descricao, pontos }
  });
}

async function listarMissoesAtivas() {
  return prisma.missao.findMany({
    where: { ativa: true },
    orderBy: { criadoEm: 'desc' }
  });
}

module.exports = {
  criarMissao,
  listarMissoesAtivas
};
