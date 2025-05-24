const prisma = require('../prisma');

/**
 * Controller para buscar perfil do usuário logado
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
async function perfil(req, res) {
  try {
    const user = await prisma.usuario.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        nome: true,
        email: true,
        pontuacao: true,
        criadoEm: true,
        missoes: {
          select: {
            id: true,
            concluida: true,
            missao: {
              select: {
                id: true,
                titulo: true,
                descricao: true,
                pontos: true,
                ativa: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ erro: 'Usuário não encontrado' });
    }

    // Cálculos adicionais
    const missoesConcluidas = user.missoes.filter(m => m.concluida).length;
    const missoesPendentes = user.missoes.length - missoesConcluidas;
    
    // Cálculo do nível baseado na pontuação
    const nivel = Math.floor(user.pontuacao / 100) + 1;
    const experiencia = user.pontuacao % 100;

    res.json({
      user: {
        ...user,
        missoesConcluidas,
        missoesPendentes,
        nivel,
        experiencia,
        proximoNivel: {
          atual: nivel,
          progresso: experiencia,
          pontosNecessarios: 100
        }
      }
    });
    
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ erro: 'Erro interno do servidor' });
  }
}

module.exports = { perfil };