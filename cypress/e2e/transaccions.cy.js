describe('Pruebas proyecto Globalsqa Transacciones', () => {
  
    beforeEach(() => {
      cy.visit('/');
      cy.fixture("DOM/localizadores").as('el');
    });

    it('Deberia realizar un deposito', function () {
        cy.loginCliente(this.el.dataClientes.clienteHermoine);
        cy.deposito(this.el.dataDeposito.deposito10000);
      });
  
      it('Deberia realizar un retiro e intentar girar en descubierto', function () {
        cy.loginCliente(this.el.dataClientes.clienteHarry);
        cy.deposito(this.el.dataDeposito.deposito10000);
        cy.extracción(this.el.dataRetiro.retiro500);
        cy.intentoExtracciónExcesiva(this.el.dataRetiro.retiroFueraDeRango);
      });
      it('Deberia permitir realizar multiples depositos/retiros', function () {
        cy.loginCliente(this.el.dataClientes.clienteHarry);
        cy.deposito(this.el.dataDeposito.deposito10000);
        cy.extracción(this.el.dataRetiro.retiro1000);
        cy.deposito(this.el.dataDeposito.deposito1000);
        cy.extracción(this.el.dataRetiro.retiro500);
        cy.contains(this.el.mensajeTransaccionExitosa).should('be.visible');
      });
      it('Debería mostrar un mensaje de error al intentar retirar más del saldo disponible', function () {
        cy.loginCliente(this.el.dataClientes.clienteHermoine);
        cy.intentoExtracciónExcesiva(this.el.dataRetiro.retiroFueraDeRango);
      });
  
      it('Deberia verificar el saldo inicial de una cuenta nueva en 0', function () {
        cy.loginBancario();
        cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreCliente, this.el.dataNuevoCliente.apellidoCliente, this.el.dataNuevoCliente.codigoPostalCliente);
        cy.contains(this.el.botonHome).click();
        cy.loginBancario();
        cy.abrirCuentaNueva(this.el.dataNuevoCliente.nombreCompletoCliente, this.el.dataMoneda.monedaDollar);
        cy.contains(this.el.botonProcess).click();
        cy.contains(this.el.botonHome).click();
        cy.loginCliente(this.el.dataNuevoCliente.nombreCompletoCliente);
        cy.get(this.el.labelInfoCuenta).eq(1).contains('0');
      });
      it('Deberia no mostrar el mensaje de deposito exitoso,si deposita una cantidad negativa', function() {
      
        cy.loginCliente(this.el.dataClientes.clienteHarry);
        cy.contains(this.el.pestañaDeposito).click();
        cy.get(this.el.campoDepositoCantidad).type(this.el.dataDeposito.depositoNegativo);
        cy.get(this.el.botonConfirmarDeposito).click();
        cy.get(this.el.mensajeConfirmacionDepositoExitoso).should('not.be.visible');
      });
    });