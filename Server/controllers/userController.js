const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const getUsers = async (req, res) => {
  const users = await User.find({});

  if (!users) return res.status(204).json({ 'message': 'No users found.' });

  console.log(users);
  res.json(users);
}

const createUser = async (request, response) => {
  const { username, password } = request.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  };

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
}

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const createNewVisual = async (req, res) => {
  const body = req.body;

  const token = getTokenFrom(req);

  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const rand = Math.random().toString(16).substr(2, 4);

  user.visualizations.push({
    'url': rand,
    'settings': {
      "v1v2": body.settings.v1v2,
      "v1v2text": body.settings.v1v2text,
      "v3v4v10": body.settings.v3v4v10,
      "v3v4v10text": body.settings.v3v4v10text,
      "v5": body.settings.v5,
      "v5text": body.settings.v5text,
      "v6": body.settings.v6,
      "v6text": body.settings.v6text,
      "v7v10": body.settings.v7v10,
      "v7v10text": body.settings.v7v10text,
      "v8": body.settings.v8,
      "v8text": body.settings.v8text,
      "v9": body.settings.v9,
      "v9text": body.settings.v9text,
      "display": body.settings.display,
    }
  });

  const savedUser = await user.save();

  return res.status(201).json(savedUser);
}

module.exports = {
  createUser,
  getUsers,
  createNewVisual
}
