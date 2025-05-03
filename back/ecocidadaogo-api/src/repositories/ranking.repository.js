const prisma = require('../prisma');

async function buscarTop10() {
  return prisma.usuario.findMany({
    orderBy: { pontuacao: 'desc' },
    take: 10,
    select: { id: true, nome: true, pontuacao: true }
  });
}

module.exports = { buscarTop10 };
