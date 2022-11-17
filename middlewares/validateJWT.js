const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  // x-token Headers
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición',
    });
  }

  try {
    const { uid, name } = jwt.verify(token, process.env.SCRET_JWT_SEED);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido',
    });
  }

  next();
};

module.exports = {
  validateJWT,
};
