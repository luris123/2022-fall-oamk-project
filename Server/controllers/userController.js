const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

//gets only number value from auhorization header
const getTokenFrom = (req) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null;
}

//checks if user exists and if user does not exist creates new user
const createUser = async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({ username });

  if (existingUser) {
    return res.status(400).json({error: 'Käyttäjä jo olemassa'})
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

//checks if password is correct and deletes user
const deleteUser = async(req, res) => {
  const token = getTokenFrom(req);
  const password = req.body.password;
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Tokeni puuttuu tai on väärä' });
  }

  const user = await User.findById(decodedToken.id);

  try {
    passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return res.status(401).json({error: 'Salasana väärin'})
    }
  } catch (error) {
    return res.status(401).json({ error: 'Salasanan tarkastus epäonnistui' });
  }

  user.deleteOne();

  res.status(200).json({message: "Käyttäjä poistettu onnistuneesti"});
}

//if user is found creates new view and returns updated user
const createNewView = async (req, res) => {
  const body = req.body;

  const token = getTokenFrom(req);

  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Tokeni puuttuu tai on väärä' });
  }

  const user = await User.findById(decodedToken.id);

  const rand = Math.random().toString(16).substr(2, 4);

  user.views.push({
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

//if user is found deletes view and returns updated user
const deleteView = async(req, res) => {
  const body = req.body;
  const token = getTokenFrom(req);
  
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch (error) {
    return res.status(401).json({ error: 'Tokeni puuttuu tai on väärä' });
  }

  const user = await User.findById(decodedToken.id);

  const object = user.views.find(x => x.url === body.url);

  if(object === undefined){
    return res.status(404).json({message: "Näkymää ei löytynyt"});
  }

  const index = user.views.indexOf(object);

  user.views.splice(index, 1);
  user.save();

  res.status(200).json({views: user.views});
}

//gets view from user and returns it
const getView = async(req, res) => {
    const body = req.body;
    const user = await User.findOne({ "views.url": body.url }).exec();
    const object = user.views.find(x => x.url === body.url);
    res.status(200).json(object);
}

module.exports = {
  createUser,
  deleteUser,
  createNewView,
  deleteView,
  getView
}
