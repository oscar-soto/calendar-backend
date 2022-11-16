const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const newUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    // Email exists
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe con ese correo',
      });
    }

    // Save a new user
    user = new User(req.body);

    // Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.status(201).json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Porfavor hable con el administrador',
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Email exists
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario no existe con ese email',
      });
    }

    // Confirm password
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: 'Password incorrecto',
      });
    }

    // Generate JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Porfavor hable con el administrador',
    });
  }
};

const renewToken = async (req, res = response) => {
  const {uid, name} = req;

  // Generate JWT
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token
  });
};

module.exports = {
  newUser,
  loginUser,
  renewToken,
};
