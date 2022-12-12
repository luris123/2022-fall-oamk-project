const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

//checks if user exists and if password is correct and returns new token, username and users views
const handleLogin = async (request, response) => {
    const { username, password } = request.body;

    const user = await User.findOne({ username });

    let passwordCorrect;

    if(user){
      passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    }
    
    if (!user || !passwordCorrect) {
      return response.status(401).json({ error: 'Väärä käyttäjätunnus tai salasana'})
    }
  
    const userForToken = {
      username: user.username,
      id: user._id,
    }

    //token expires in 1hour
    const token = jwt.sign(
      userForToken, 
      process.env.SECRET,
      { expiresIn: 60*60 }
    )
  
    response
      .status(200)
      .send({ token, username: user.username, views: user.views})
  }

module.exports = {
    handleLogin
}