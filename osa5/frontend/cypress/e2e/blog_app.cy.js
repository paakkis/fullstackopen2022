/* eslint-disable linebreak-style */

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'root',
      username: 'root',
      password: 'root'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })
  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('root')
      cy.get('#login-button').click()
      cy.contains('root logged in')
    })
    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      cy.get('html').should('not.contain', 'root logged in')
    })
  })
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'root' })
    })

    it('a new blog can be created', function() {
      cy.contains('add blog').click()
      cy.get('#titleInput').type('a blog created by cypress')
      cy.get('#authorInput').type('a blog created by cypress')
      cy.get('#urlInput').type('a blog created by cypress')
      cy.contains('create').click()
      cy.contains('a blog created by cypress')
    })
    describe('and blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          author: 'first author',
          title: 'first blog',
          url: 'first url'
        })
      })
      it('a blog can be liked', function () {
        cy.contains('first blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })
      it('a blog can be removed by the owner', function () {
        cy.contains('first blog').parent().find('button').as('theButton')
        cy.get('@theButton').click()
        cy.contains('remove').click()
        !cy.contains('first blog')
      })
    })
    describe('and multiple blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'Most likes',
          author: 'test',
          url: 'test',
          likes: 10
        })

        cy.createBlog({
          title: 'Second most likes',
          author: 'test',
          url: 'test',
          likes: 5
        })

        cy.createBlog({
          title: 'Third most likes',
          author: 'test',
          url: 'url3',
          likes: 4
        })
        cy.visit('http://localhost:3000')
      })

      it('blogs are sorted by likes descending', function() {
        cy.get('.blogs').eq(0).should('contain', 'Most likes test')
        cy.get('.blogs').eq(1).should('contain', 'Second most likes test')
        cy.get('.blogs').eq(2).should('contain', 'Third most likes test')
      })
      it('blogs are sorted again when liked', function() {
        cy.get('.blogs').eq(2).contains('view').click()

        cy.get('.blogs').eq(2).get('.likeBtn').click()
        cy.wait(1000)
        cy.get('.blogs').eq(2).get('.likeBtn').click()
        cy.wait(1000)
        cy.get('.blogs').eq(0).should('contain', 'Third most likes test')
      })
    })
  })
})