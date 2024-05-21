describe('Pruebas proyecto Globalsqa', () => {
  
    beforeEach(() => {
      cy.visit('/');
      cy.fixture("DOM/localizadores").as('el');
    });

    it('Deberia cargar la pagina de Log In se', function () {
      cy.contains(this.el.botonLoginCliente).should('be.visible');
      cy.contains(this.el.botonLoginBancario).should('be.visible');
    });

    it('Deberia iniciar sesion como cliente', function () {
    cy.loginCliente(this.el.dataClientes.clienteHarry);
    });

    it('Deberia iniciar sesion como gerente bancario', function () {
      cy.loginBancario();
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

    it('Deberia realizar deslogueo correcto como cliente', function () {
      cy.loginCliente(this.el.dataClientes.clienteHarry);
      cy.contains(this.el.botonLogout).click();
      cy.get(this.el.formularioYourName).contains(this.el.labelYourName);
    });

    it('Deberia cambiar cuenta y actualizar información de la nueva cuenta', function () {
      cy.loginCliente(this.el.dataClientes.clienteHermoine);
      cy.cambiarCuentaVerificandoNuevaInfo(this.el.dataCuentas.cuenta1001, this.el.dataCuentas.cuenta1002);
    });

    it('Deberia permitir realizar multiples depositos/retiros', function () {
      cy.loginCliente(this.el.dataClientes.clienteHarry);
      cy.deposito(this.el.dataDeposito.deposito10000);
      cy.extracción(this.el.dataRetiro.retiro1000);
      cy.deposito(this.el.dataDeposito.deposito1000);
      cy.extracción(this.el.dataRetiro.retiro500);
      cy.contains(this.el.mensajeTransaccionExitosa).should('be.visible');
      cy.contains(this.el.pestañaTransacciones).click();
      cy.get(this.el.tablaTransacciones).should('have.length.greaterThan', 1);
    });
    

    it('No deberia mostrar el boton de Login si no se selecciona un cliente', function () {
      cy.contains(this.el.botonLoginCliente).click();
      cy.get(this.el.botonLogin).should('not.be.visible');
    });

    it('Deberia agregar un nuevo cliente sin crear una cuenta y validar el mensaje', function () {
      cy.loginBancario();
      cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreCliente, this.el.dataNuevoCliente.apellidoCliente, this.el.dataNuevoCliente.codigoPostalCliente);
      cy.contains(this.el.botonHome).click();
      cy.loginCliente(this.el.dataNuevoCliente.nombreCompletoCliente);
      cy.get(this.el.elementoNoCuenta).should('be.visible');
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

    it('Deberia no mostrar el mensaje de deposito exitoso,si deposita una cantidad negativa', function() {
      
      cy.loginCliente(this.el.dataClientes.clienteHarry);
      cy.contains(this.el.pestañaDeposito).click();
      cy.get(this.el.campoDepositoCantidad).type(this.el.dataDeposito.depositoNegativo);
      cy.get(this.el.botonConfirmarDeposito).click();
      cy.get(this.el.mensajeConfirmacionDepositoExitoso).should('not.be.visible');
    });

    it('Deberia mostrar error al intentar agregar un cliente con campos vacíos', function() {
      cy.loginBancario();
      cy.agregarNuevoCliente(this.el.dataNuevoCliente.nombreClienteVacio, this.el.dataNuevoCliente.apellidoClienteVacio, this.el.dataNuevoCliente.codigoPostalClienteVacio);
      cy.on('window:alert', (s) => {
           expect(s).to.contains(this.el.mensajeErrorAgregandoCiente);
      });
    });
 });
    
    
  