const jwt = require('jsonwebtoken');

/**
 * Middleware para autenticação via JWT
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 * @param {NextFunction} next - Express next
 */
function authMiddleware(req, res, next) {
  try {
    // Verifica o header de autorização
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ erro: 'Token não informado' });
    }

    // Extrai o token
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return res.status(401).json({ erro: 'Token mal formatado' });
    }

    // Verifica o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Guarda os dados do usuário no request
    req.user = {
      id: decoded.id,
      nome: decoded.nome,
      email: decoded.email
    };

    return next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

module.exports = authMiddleware;