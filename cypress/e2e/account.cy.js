describe('Pruebas proyecto Globalsqa seccion Cuentas ', () => {
  
    beforeEach(() => {
      cy.visit('/');
      cy.fixture("DOM/localizadores").as('el');
    });

    it('Deberia agregar un nuevo cliente', function () {
      cy.loginBancario();
      cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreCliente, this.el.dataNuevoCliente.apellidoCliente, this.el.dataNuevoCliente.codigoPostalCliente);
      cy.on('window:alert', (s) => {
      expect(s).to.contains('successfully');
      });
    });

    it('Deberia abrir una nueva cuenta', function () {
      cy.loginBancario();
      cy.abrirCuentaNueva(this.el.dataClientes.clienteHermoine, this.el.dataMoneda.monedaDollar);
    });

    it('Deberia eliminar un cliente existente', function () {
      cy.loginBancario();
      cy.eliminarCliente(this.el.dataClientes.clienteHermoineNombre);
    });

    it('Deberia verificar los Elementos de interfaz de usuarios', function () {
      cy.contains(this.el.botonLoginCliente).should('be.visible');
      cy.contains(this.el.botonLoginBancario).should('be.visible');
      cy.contains(this.el.botonLoginCliente).click();
      cy.get(this.el.selectorCliente).should('be.visible');
      cy.get(this.el.selectorCliente).select(this.el.dataClientes.clienteHermoine);
      cy.get(this.el.botonLogin).should('be.visible');
      cy.go(this.el.accionAtras);
      cy.contains(this.el.botonLoginBancario).click();
      cy.contains(this.el.botonAgregarCliente).should('be.visible');
      cy.contains(this.el.botonAbrirCuenta).should('be.visible');
      cy.contains(this.el.botonVerClientes).should('be.visible');
    });

    it('Deberia cambiar cuenta y actualizar información de la nueva cuenta', function () {
      cy.loginCliente(this.el.dataClientes.clienteHermoine);
      cy.cambiarCuentaVerificandoNuevaInfo(this.el.dataCuentas.cuenta1001, this.el.dataCuentas.cuenta1002);
    });
  
    it('Deberia agregar un nuevo cliente sin crear una cuenta y validar el mensaje', function () {
      cy.loginBancario();
      cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreCliente, this.el.dataNuevoCliente.apellidoCliente, this.el.dataNuevoCliente.codigoPostalCliente);
      cy.contains(this.el.botonHome).click();
      cy.loginCliente(this.el.dataNuevoCliente.nombreCompletoCliente);
      cy.get(this.el.elementoNoCuenta).should('be.visible');
    });

    it('Deberia eliminar un cliente y verificar que no permita iniciar sesión', function () {
      cy.loginBancario();
      cy.eliminarCliente(this.el.dataClientes.clienteHermoineNombre);
      cy.contains(this.el.botonHome).click();
      cy.contains(this.el.botonLoginCliente).click();
      cy.get(this.el.selectorCliente).should('not.contain', this.el.dataClientes.clienteHermoine);
    });

    it('Deberia abrir una nueva cuenta para un cliente existente en la tabla y verificar que arroje un mensaje de exito', function () {
      cy.loginBancario();
      cy.abrirCuentaNueva(this.el.dataClientes.clienteHarry, this.el.dataMoneda.monedaDollar);
    });

    it('Deberia verificar la existencia de un cliente en la pestaña Customers', function () {
      cy.loginBancario();
      cy.contains(this.el.botonVerClientes).click();
      cy.verificarExistenciaCliente(this.el.dataClientes.clienteHarryNombre);
    });

    it('Deberia mostrar error al intentar agregar un cliente con campos vacíos', function() {
      cy.loginBancario();
      cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreClienteVacio, this.el.dataNuevoCliente.apellidoClienteVacio, this.el.dataNuevoCliente.codigoPostalClienteVacio);
      cy.on('window:alert', (s) => {
           expect(s).to.contains(this.el.mensajeErrorAgregandoCiente);
      });
    });
 });
    
    
  