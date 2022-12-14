describe('register ', function () {

    beforeEach(function () {
        cy.visit('http://localhost:3000')
    })

    it('front page can be opened', function () {
        cy.contains('Web-ohjelmoinnin sovellusprojekti')
    });

    it('register user', function () {
        cy.contains('Rekisteröidy').click()
        cy.get('#register-username').type('testi777')
        cy.get('#register-password').type('testi777')
        cy.contains('Luo uusi tili').click()
    });
})