/*
  Warnings:

  - A unique constraint covering the columns `[usuarioId,missaoId]` on the table `MissaoUsuario` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `MissaoUsuario_usuarioId_missaoId_key` ON `MissaoUsuario`(`usuarioId`, `missaoId`);
