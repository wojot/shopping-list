const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "You are not authorized!" });

  try {
    const decoded = jwt.verify(token, config.secretJWT);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }

};

module.exports = authMiddleware;
