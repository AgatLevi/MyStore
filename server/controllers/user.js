const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.create(req.body);
    const token = generateAccessToken({ email, id: user._id });
    if (!user) throw new Error('Failed creating a user');
    res.json({ msg: 'registration success', email });
  } catch (e) {
    next(e);
  }
};

exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email, password });
    if (!user) throw new Error('user not found');
    res.json({ msg: 'login success', email });
  } catch (e) {
    next(e);
  }
};
