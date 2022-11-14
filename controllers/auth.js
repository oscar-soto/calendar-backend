const { response } = require('express');
const User = require('../models/User');

const newUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Email exists
    if (user) {
      res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese correo',
      });
    }

    // Save a new user
    user = new User(req.body);
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Porfavor hable con el administrador',
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: 'Login',
    email,
    password,
  });
};

const renewToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'renew',
  });
};

module.exports = {
  newUser,
  loginUser,
  renewToken,
};
