// src/repositories/missaoUsuario.repository.js
const prisma = require('../prisma');

async function concluirMissao(usuarioId, missaoId, pontos) {
  // Tenta fazer upsert: se não existir, cria; se existir, atualiza o flag
  // Mas precisamos também atualizar a pontuação do usuário
  const tx = await prisma.$transaction([
    prisma.missaoUsuario.upsert({
      where: { usuarioId_missaoId: { usuarioId, missaoId } },
      update: { concluida: true },
      create: { usuarioId, missaoId, concluida: true }
    }),
    prisma.usuario.update({
      where: { id: usuarioId },
      data: { pontuacao: { increment: pontos } }
    })
  ]);
  return tx[0]; // retorna o registro de MissaoUsuario
}

module.exports = { concluirMissao };
