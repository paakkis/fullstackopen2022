const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

let blog = null

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    const user = {
      id: "12345",
      username: "test",
      name: "test",
      password: "test"
    }
    await api.post('/api/users').send(user)
    console.log(user.id)
    const response = await api.post('/api/login').send(
      { 
        username: user.username, 
        password: user.password 
      }
    )
    token = "Bearer " + response.body.token
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('identifier must be named "id"', async () => {
    const response = await api.get('/api/blogs')
    response.body.map(blog => {
        expect(blog.id).toBeDefined()
    })
  });

test('a blog can be added ', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'testblog.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const title = blogsAtEnd.map(b => b.title)
  expect(title).toContain('Test Blog')
})
test('a blog cant be added without a token', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Tester',
    url: 'testblog.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

})

test('likes are set to 0 if not defined', async () => {
  const newBlog = {
    title: 'Test Blog2',
    author: 'Tester2',
    url: 'testblog.com',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  const blog = blogsAtEnd.find(b => b.title === 'Test Blog2') 
  expect(blog.likes).toBe(0)
})

test('error 400 if title and url are not defined', async () => {
  const newBlog = {
    author: 'Tester2',
    likse: '5'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', token)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: 'test-blog',
    author: 'tester',
    url: 'test-blog'
  }
  const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog)
  blog = res.body

  const blogToDelete = blog

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', token)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const ids = blogsAtEnd.map(r => r.id)

  expect(ids).not.toContain(blogToDelete.id)
})
test('a blog cant be deleted without a token', async () => {
  const newBlog = {
    title: 'test-blog',
    author: 'tester',
    url: 'test-blog'
  }
  const res = await api.post('/api/blogs').set('Authorization', token).send(newBlog)
  blog = res.body

  const blogToDelete = blog

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(401)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const ids = blogsAtEnd.map(r => r.id)

  expect(ids).toContain(blogToDelete.id)
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]

  const updatedBlog = {
      title: 'Updated Blog',
      author: 'Test',
      url: 'updatetest.com',
      likes: 123
  }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  const blog = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  expect(blog.id).toBe(blogToUpdate.id)

})



afterAll(() => {
    mongoose.connection.close()
}) 