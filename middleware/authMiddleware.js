const jwt = require("jsonwebtoken");
const config = require("../config/default.json");

const authMiddleware = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) res.status(401).json({ msg: "You are not authorized!" });

  jwt.verify(token, config.secretJWT, (err, decoded) => {
    if (err) res.status(401).json({ msg: "You are not authorized!" });
    req.userId = decoded.id;
  });

  next();
};

module.exports = authMiddleware;
