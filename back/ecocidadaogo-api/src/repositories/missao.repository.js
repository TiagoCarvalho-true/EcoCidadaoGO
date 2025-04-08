const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.criarMissao = async ({ titulo, descricao, pontos }) => {
  return prisma.missao.create({
    data: { titulo, descricao, pontos }
  });
};

exports.listarMissoesAtivas = async () => {
  return prisma.missao.findMany({
    where: { ativa: true }
  });
};
