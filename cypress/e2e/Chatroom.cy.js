// describe('visit chatroom page', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000/chatroom')
//   })
// })

// describe('render fields', () => {
//   it('passes', () => {
//     cy.visit('http://localhost:3000/chatroom')
//     cy.get('#messageField').should('exist')
//     cy.get('#buttonChat').should('exist')
//     cy.get('#messages').should('exist')
//   })
// })

describe('send message', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Chatroom')
    cy.get('#messageField').type('test')
    cy.get('#buttonChat').click()
    cy.get('#messages').should('exist')
    //cy.get('#messages').should('contain', 'test');
  })
})

describe('check sent message', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Chatroom');
    cy.wait(500);
    cy.get('#messageField').type('test');
    cy.get('#buttonChat').click();
    cy.get('#messages').should('exist');
    cy.get('#messages').should('contain', 'test');
  })
})