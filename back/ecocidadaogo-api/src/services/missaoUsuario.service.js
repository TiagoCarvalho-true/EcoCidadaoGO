// src/services/missaoUsuario.service.js
const missaoRepo = require('../repositories/missaoUsuario.repository');
const prisma = require('../prisma');

async function concluir(usuarioId, missaoId) {
  // 1) Verifica se a missão existe e está ativa
  const missao = await prisma.missao.findUnique({
    where: { id: missaoId }
  });
  if (!missao || !missao.ativa) {
    throw new Error('Missão não encontrada ou inativa.');
  }

  // 2) Conclui a missão e atualiza pontos
  const registro = await missaoRepo.concluirMissao(usuarioId, missaoId, missao.pontos);
  return registro;
}

module.exports = { concluir };
