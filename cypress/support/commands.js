// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

  Cypress.Commands.add('loginCliente', (nombreCliente) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.botonLoginCliente).click();
    cy.get(el.selectorCliente).select(nombreCliente);
    cy.get(el.botonLogin).click();
    cy.contains(el.mensajeBienvenida).should('contain', nombreCliente);
    });
  });

  Cypress.Commands.add('loginBancario', () => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.botonLoginBancario).click();
    cy.url().should('include', '/manager');
    });
  });
  Cypress.Commands.add('agregarNuevoCliente', (nombre, apellido, codigoPostal) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.botonAgregarCliente).click();
    cy.get(el.campoAñadirClienteNombre).type(nombre);
    cy.get(el.campoAñadirClienteApellido).type(apellido);
    cy.get(el.campoAñadirClienteCodigoPostal).type(codigoPostal);
    cy.get(el.botonAñadirCliente).click();
    
    });
  });

  Cypress.Commands.add('abrirCuentaNueva', (nombreCliente, moneda) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.botonAbrirCuenta).click();
    cy.get(el.selectorAbrirCuentaCliente).select(nombreCliente);
    cy.get(el.selectorAbrirCuentaMoneda).select(moneda);
    cy.get(el.botonAbrirCuentaProcesar).click();
    cy.on('window:alert', (s) => {
      expect(s).to.include('Account created successfully with account Number');
      });
    });
  });

  Cypress.Commands.add('deposito', (cantidad) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.pestañaDeposito).click();
    cy.get(el.campoDepositoCantidad).type(cantidad);
    cy.get(el.botonConfirmarDeposito).click();
    cy.contains(el.mensajeDepositoExitoso).should('be.visible');
    });
  });

  
  Cypress.Commands.add('extracción', (cantidad) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.pestañaRetiro).click();
    cy.contains(el.labelCantidadRetiro).next(el.contenedorCantidadCampoRetiro).type(cantidad);
    cy.get(el.botonConfirmarExtraccion).click();
    cy.contains(el.mensajeTransaccionExitosa).should('be.visible');
    });
  });

  Cypress.Commands.add('intentoExtracciónExcesiva', (cantidad) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.pestañaRetiro).click();
    cy.get(el.contenedorCantidadCampoRetiro).clear().type(cantidad);
    cy.get(el.botonConfirmarExtraccion).click();
    cy.contains(el.mensajeTransaccionFallida).should('be.visible');
    });
 });

  Cypress.Commands.add('eliminarCliente', (nombre) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.contains(el.botonVerClientes).click();
    cy.get(el.tablaClientes).contains(nombre).parent('tr').within(() => {
    cy.get(el.botonEliminarCliente).click();
 });
    cy.get(el.tablaClientes).should('not.contain', nombre);
    }); 
 }); 
  
 Cypress.Commands.add('cambiarCuentaVerificandoNuevaInfo', (cuenta1, cuenta2) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.get(el.selectorCuenta).select(cuenta1);
    cy.contains(el.labelBalance).should('not.be.empty');
    cy.get(el.labelInfoCuenta).then((balance) => {
    const infoCuenta1 = balance.text();
    cy.get(el.selectorCuenta).select(cuenta2);
    cy.get(el.labelInfoCuenta).should((nuevaInfo) => {
    const infoCuenta2 = nuevaInfo.text();
        expect(infoCuenta2).not.to.equal(infoCuenta1);
        });
      });
    });
});
Cypress.Commands.add('verificarExistenciaCliente', (nombreCliente) => {
    cy.fixture("DOM/localizadores").then((el) => {
    cy.get(el.tablaClientes).contains(nombreCliente).should('be.visible');
    });
});


