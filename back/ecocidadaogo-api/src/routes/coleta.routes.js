const { Router } = require('express');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

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