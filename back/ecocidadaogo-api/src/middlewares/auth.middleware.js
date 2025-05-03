const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ erro: 'Token não informado' });
  const [ , token ] = authHeader.split(' ');
  if (!token) return res.status(401).json({ erro: 'Token mal formatado' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // aqui vem { id, nome, email }
    return next();
  } catch {
    return res.status(401).json({ erro: 'Token inválido' });
  }
};
