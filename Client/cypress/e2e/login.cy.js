describe('login ', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Web-ohjelmoinnin sovellusprojekti')
    });

    it('login user', function () {
        cy.contains('Kirjaudu').click()
        cy.get('#login-username').type('testi777')
        cy.get('#login-password').type('testi777')
        cy.contains('Kirjaudu sisään').click()
    });
})