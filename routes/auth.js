/**
 * Rutas de Usuarios / Auth
 * host + /api/auth
*/

const { Router } = require('express');
const {check} = require('express-validator')
const router = Router();// const router = express.Router

const { newUser, loginUser, renewToken } = require('../controllers/auth');

router.post(
  '/new',
  [ // Middlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
  ], 
  newUser
);
router.post(
  '/', 
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password incorrecto').isLength({min: 6}),
  ],
  loginUser
);
router.get('/renew', renewToken);

module.exports = router;