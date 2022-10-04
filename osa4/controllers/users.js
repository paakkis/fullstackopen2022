const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })

  if (!username) {
    return response.status(400).json({
        error: 'username is required'
    })
  }else if (!password) {
    return response.status(400).json({
        error: 'password is required'
    })
  }else if (password.length < 3){
    return response.status(400).json({
        error: 'password must be atleast 3 characters long'
    })
  }
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
      .find({}).populate('blogs', { author: 1})
    response.json(users)
  });

module.exports = usersRouter