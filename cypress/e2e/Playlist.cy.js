beforeEach(() => {
  cy.visit('http://localhost:3000/login');
  cy.get('input[name="username"]').type('test');
  cy.get('input[name="password"]').type('Testtest123');
  cy.get('#submit').click();
  cy.location('pathname').should('eq', '/');
})

describe('get playlist', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Playlist');
    cy.get('#playlists').children().should('exist');
  })
})

describe('create playlist', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Playlist');
    cy.get('input[name="playlistName"]').type('testPlaylist');
    cy.get('#createPlaylist').click();
    cy.get('#playlists').children().should('exist', '#testPlaylist');
  })
})

describe('add song to playlist', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Playlist');
    cy.wait(1000);
    cy.get('#testPlaylist > #songs').contains('testSong').then(($song) => {
      cy.wrap($song).click({force : true});
    });
    cy.get('#testPlaylist > #addSong').click();
    cy.get('#playlists').children().get('#testPlaylist').children().get('#songss').should('exist', '');
  })
});

describe('delete song from playlist', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Playlist');
    cy.get('#testPlaylist').children().get('#songss').get('#deleteSong').click({force : true});
    cy.wait(1000);
    cy.get('#testPlaylist').children().get('#songss').children().should('not.exist', ''); 
  })
})

describe('delete playlist', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/Playlist');
    cy.get('#testPlaylist > #deletePlaylist').click();
    cy.get('#testPlaylist').should('not.exist', '');
  })
});