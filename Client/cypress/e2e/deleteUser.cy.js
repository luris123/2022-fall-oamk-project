describe('frontpage open ', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
        cy.contains('Kirjaudu').click()
        cy.get('#login-username').type('testi777')
        cy.get('#login-password').type('testi777')
        cy.get('#login-button').click()
    })

    it('front page can be opened', function () {
        cy.contains('Web-ohjelmoinnin sovellusprojekti')
    });

    it('deleteUser', function () {
        cy.contains('Profiili').click()
        cy.contains('Poista käyttäjä').click()
        cy.get('#deleteUser').type('testi777')
        cy.get('#deleteUser-button').click()
    });
})