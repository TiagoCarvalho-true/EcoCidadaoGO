const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prisma');

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    
    // Verificar o token do Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    
    const payload = ticket.getPayload();
    const email = payload.email;
    const nome = payload.name || payload.email.split('@')[0];
    
    // Verificar se o usuário já existe pelo email
    let user = await prisma.usuario.findUnique({
      where: { email }
    });
    
    if (!user) {
      // Criar novo usuário com senha aleatória
      const randomPassword = Math.random().toString(36).slice(-10);
      const senhaHash = await bcrypt.hash(randomPassword, 10);
      
      user = await prisma.usuario.create({
        data: {
          nome,
          email,
          senhaHash,
          pontuacao: 0
        }
      });
    }
    
    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, nome: user.nome, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({
      user: {
        id: user.id,
        nome: user.nome,
        email: user.email,
        pontuacao: user.pontuacao
      },
      token
    });
  } catch (err) {
    console.error('Erro na autenticação Google:', err);
    res.status(401).json({ erro: 'Falha na autenticação com Google' });
  }
};


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