const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const getUsers = async(req, res) => {
    const users = await User.find({});

    if (!users) return res.status(204).json({ 'message': 'No users found.' });
    
    console.log(users);
    res.json(users);
}

const createUser = async (request, response) => {
  const { username, password } = request.body
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
}

module.exports = {
    createUser,
    getUsers
}
