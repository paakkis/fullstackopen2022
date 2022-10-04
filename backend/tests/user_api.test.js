const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
  })


test('a user can be added ', async () => {
  const newUser = {
    id: "12345",
    name: 'Test User',
    username: 'Tester',
    password: 'test1234'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

  const user = usersAtEnd.map(user => user.username)
  expect(user).toContain('Tester')
})

test('error 400 if username not provided', async () => {
const newUser = {
    name: 'Tester2',
    password: '1234'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

test('error 400 if password not provided', async () => {
    const newUser = {
      name: 'Tester2',
      username: 'Tester2'
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

test('error 400 if username shorter than 3 characters', async () => {
    const newUser = {
        name: 'Tester123',
        username: 'Tt',
        password: 'Tester2'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

test('error 400 if password shorter than 3 characters', async () => {
    const newUser = {
        name: 'Tester123',
        username: 'Tester123',
        password: '12'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
    })
    

afterAll(() => {
    mongoose.connection.close()
}) 