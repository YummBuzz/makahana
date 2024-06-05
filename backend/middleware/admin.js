const jwt = require("jsonwebtoken")


function adminAuthenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, admin) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        }
        return res.sendStatus(403); // Other JWT errors
      }
      
      req.admin = admin;
    next();
  });
}

module.exports = adminAuthenticateToken;