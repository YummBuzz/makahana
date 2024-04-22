const jwt = require("jsonwebtoken")


function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, "secret", (err, user) => {
    if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expired' });
        }
        return res.sendStatus(403); // Other JWT errors
      }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;