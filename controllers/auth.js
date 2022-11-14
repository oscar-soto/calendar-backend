const { response } = require('express');
const User = require('../models/User');

const newUser = async (req, res = response) => {
  // const { name, email, password } = req.body;

  const user = new User(req.body);
  try {
    await user.save();

    res.status(201).json({
      ok: true,
      msg: 'Register',
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
