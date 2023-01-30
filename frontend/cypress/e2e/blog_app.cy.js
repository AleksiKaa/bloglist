describe('Blog app ', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test user',
      password: 'test123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('#loginform')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test user')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
      cy.contains('test logged in')
    })

    it('login fails with wrong password', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {

    beforeEach(function () {
      cy.get('#username').type('test user')
      cy.get('#password').type('test123')
      cy.get('#login-button').click()
      cy.contains('test logged in')
      cy.get('.toggle').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#createButton').click()
    })

    it('new blogs can be posted', function () {
      cy.contains('test blog')
      cy.contains('test author')
    })

    it('blogs can be liked', function () {
      cy.get('.viewButton').click()
      cy.get('.likeButton').click()
      cy.get('.viewButton').click()
      cy.contains('likes: 1')
    })

    it('blogs can be deleted', function () {
      cy.get('.viewButton').click()
      cy.get('.removeButton').click()
      cy.get('test blog').should('not.exist')
    })

    it('blogs are sorted by likes', function () {
      cy.get('.toggle').click()
      cy.get('#title').type('another test blog')
      cy.get('#author').type('another test author')
      cy.get('#url').type('test.com')
      cy.get('#createButton').click()
      cy.wait(1000)
      cy.get('.viewButton').eq(1).click()
      cy.get('.likeButton').click() //now another test blog has most likes and should be first in the list
      cy.get('.blog').eq(0).should('contain', 'another test blog')
      cy.get('.blog').eq(1).should('contain', 'test blog')
    })
  })
})