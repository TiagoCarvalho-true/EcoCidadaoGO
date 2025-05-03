const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: { nome, email, senhaHash }
    });
    res.status(201).json({ id: user.id, nome: user.nome, email: user.email });
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await prisma.usuario.findUnique({ where: { email } });
    if (!user) throw new Error('Usuário não encontrado');
    const valid = await bcrypt.compare(senha, user.senhaHash);
    if (!valid) throw new Error('Senha inválida');
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.json({ token });
  } catch (err) {
    res.status(401).json({ erro: err.message });
  }
};
