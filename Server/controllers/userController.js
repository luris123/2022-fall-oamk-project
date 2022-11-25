const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//middleware?
const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

const getUsers = async (req, res) => {
  const users = await User.find({});

  if (!users) return res.status(204).json({ 'message': 'No users found.' });

  console.log(users);
  res.json(users);
}

const createUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({
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

  res.status(201).json(savedUser);
}

const deleteUser = async(req, res) => {
  const token = getTokenFrom(req);
  const password = req.body.password;
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  try {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({
        error: 'invalid password'
      })
    }
  } catch (error) {
    return res.status(401).json({ error: 'Password Check Failed' });
  }

  user.deleteOne();

  res.status(200).json({message: "User deleted successfully"});
}

const createNewView = async (req, res) => {
  const body = req.body;

  const token = getTokenFrom(req);

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' });
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

  res.status(201).json(savedUser);
}

const deleteView = async(req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);

  const object = user.visualizations.find(x => x.url === body.url);

  if(object === undefined){
    return res.status(404).json({message: "Visualization not found"});
  }

  const index = user.visualizations.indexOf(object);

  user.visualizations.splice(index, 1);
  user.save();

  res.status(200).json({message: "Visualization deleted successfully"});
}

module.exports = {
  createUser,
  getUsers,
  deleteUser,
  createNewView,
  deleteView
}
