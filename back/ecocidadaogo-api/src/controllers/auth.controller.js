const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

exports.register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Verifica se usuário já existe
    const existingUser = await prisma.usuario.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const user = await prisma.usuario.create({
      data: { 
        nome, 
        email, 
        senhaHash,
        pontuacao: 0
      }
    });
    
    // Gera token após registro
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.status(201).json({ 
      user: { 
        id: user.id, 
        nome: user.nome, 
        email: user.email,
        pontuacao: user.pontuacao 
      },
      token 
    });
  } catch (err) {
    console.error('Erro no registro:', err);
    res.status(400).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const user = await prisma.usuario.findUnique({ 
      where: { email },
      select: {
        id: true,
        nome: true,
        email: true,
        senhaHash: true,
        pontuacao: true
      }
    });

    if (!user) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    const valid = await bcrypt.compare(senha, user.senhaHash);
    if (!valid) {
      return res.status(401).json({ erro: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Remove senhaHash do objeto antes de enviar
    const { senhaHash: _, ...userWithoutPassword } = user;

    res.json({ 
      user: userWithoutPassword,
      token 
    });
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(401).json({ erro: err.message });
  }
};