// Path: cypress\e2e\auth.cy.js

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

describe('login', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type('test')
    cy.get('input[name="password"]').type('Testtest123')
    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/')
  })
});

describe('register', () => {
  var numbers = getRandomInt(100, 100000000);
  var username = 'test' + numbers;
  var email = 'test' + numbers + '@test.com';
  var password = 'Testtest' + numbers;

  it('passes', () => {
    cy.visit('http://localhost:3000/register')
    cy.get('input[name="username"]').type(username)
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type(password)
    cy.get('input[name="verPass"]').type(password)
    cy.get('#submit').click()
    cy.location('pathname').should('eq', '/Login')
  })
});

// describe('go to register', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000/login')
//     cy.get('#registerLink').click()
//     cy.location('pathname').should('eq', '/Register')
//   })
// });

// describe('go to login', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000/register')
//     cy.get('#loginLink').click()
//     cy.location('pathname').should('eq', '/Login')
//   })
// });

describe('logout', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/login')
    cy.get('input[name="username"]').type('test')
    cy.get('input[name="password"]').type('Testtest123')
    cy.get('#submit').click()
    cy.get('#logoutButton').click()
    cy.location('pathname').should('eq', '/Login')
  })
});