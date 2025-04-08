const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.buscarTop10 = async () => {
  return prisma.usuario.findMany({
    orderBy: { pontuacao: 'desc' },
    take: 10,
    select: {
      id: true,
      nome: true,
      pontuacao: true
    }
  });
};
