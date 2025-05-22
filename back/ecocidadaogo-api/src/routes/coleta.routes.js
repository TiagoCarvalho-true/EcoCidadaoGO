const { Router } = require('express');
const prisma = new PrismaClient();// ajuste o caminho conforme seu projeto

const router = Router();

router.post('/', async (req, res) => {
  const { tipoResiduo, latitude, longitude } = req.body;
  try {
    const coleta = await prisma.coleta.create({
      data: { tipoResiduo, latitude, longitude }
    });
    res.status(201).json(coleta);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao salvar coleta' });
  }
});

module.exports = router;