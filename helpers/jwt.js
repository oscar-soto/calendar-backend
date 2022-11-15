const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };
    jwt.sign(
      payload,
      process.env.SCRET_JWT_SEED,
      {
        expiresIn: '2h',
      },
      
      (error, token) => {

        if (error) {
          console.log(error);
          reject('No se pudo generar el token');
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
