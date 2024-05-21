describe('Pruebas proyecto Globalsqa Login', () => {
  
    beforeEach(() => {
      cy.visit('/');
      cy.fixture("DOM/localizadores").as('el');
    });

    it('Deberia cargar la pagina de Log In', function () {
      cy.contains(this.el.botonLoginCliente).should('be.visible');
      cy.contains(this.el.botonLoginBancario).should('be.visible');
    });

    it('Deberia iniciar sesion como cliente', function () {
    cy.loginCliente(this.el.dataClientes.clienteHarry);
    });

    it('Deberia iniciar sesion como gerente bancario', function () {
      cy.loginBancario();
    });
    it('Deberia realizar deslogueo correcto como cliente', function () {
        cy.loginCliente(this.el.dataClientes.clienteHarry);
        cy.contains(this.el.botonLogout).click();
        cy.get(this.el.formularioYourName).contains(this.el.labelYourName);
    });
    it('Deberia realizar deslogueo correcto como cliente', function () {
        cy.loginCliente(this.el.dataClientes.clienteHarry);
        cy.contains(this.el.botonLogout).click();
        cy.get(this.el.formularioYourName).contains(this.el.labelYourName);
    });
    it('No deberia mostrar el boton de Login si no se selecciona un cliente', function () {
        cy.contains(this.el.botonLoginCliente).click();
        cy.get(this.el.botonLogin).should('not.be.visible');
    });
});