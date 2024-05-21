# Cypress QA Automation Projecto Banco XYZ

Este es un proyecto de automatización de pruebas utilizando Cypress. El objetivo es proporcionar un conjunto de pruebas automatizadas para la aplicación bancaria de ejemplo del Banco XYZ, asegurando su correcta funcionalidad y rendimiento.


## 📋 Tabla de Contenidos

- [Introducción](#introducción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
  - [Modo Interactivo](#ejecución-en-modo-interactivo)
  - [Modo Headless](#ejecución-en-modo-headless)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Escribiendo Pruebas](#escribiendo-pruebas)
- [Comandos Customizados](#comandos-customizados)

## 🌟 Introducción

Este proyecto utiliza Cypress para automatizar pruebas end-to-end de la aplicación bancaria. Cypress es una herramienta poderosa para realizar pruebas rápidas y fiables en cualquier aplicación web.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## 🛠 Instalación

Sigue estos pasos para configurar el proyecto localmente:

```bash
# Clona este repositorio
git clone https://github.com/emilopez48/globalSQA.git)

# Navega al directorio del proyecto
cd Programacion\Globalsqa

# Instala las dependencias del proyecto
npm install

🚀 Ejecución de Pruebas
Ejecución en Modo Interactivo
Para ejecutar Cypress en modo interactivo, donde puedes ver las pruebas en acción, usa el siguiente comando:
npm run cypress:open

Ejecución en Modo Headless
Para ejecutar las pruebas en modo headless, ideal para integración continua (CI), usa:
npm run cypress:run

📂 Estructura del Proyecto
La estructura del proyecto es la siguiente:

globalSQA/
│
├── cypress/
│   ├── fixtures/DOM/localizadores        # Datos de prueba estáticos
│   ├── e2e/
│        ├──  account.cy                  # Archivos de prueba referidos a cuentas
│        ├──  login.cy                    # Archivos de prueba referidos a inicio de sesion
│        └──  transaccions.cy             # Archivos de prueba referidos a transacciones de deposito y extraccón             
│   └── support/                          # Comandos y configuración de Cypress
│       ├── commands.js                   # Comandos customizados
│       └── e2e.js                        # Archivo de configuración principal
│
├── node_modules/                         # Dependencias de Node.js
├── globalSQA/README                      # Documentación del proyecto
├── cypress.json                          # Configuración de Cypress
├── package.json                          # Dependencias y scripts de npm

📝 Escribiendo Pruebas
Para escribir una nueva prueba, crea un archivo en el directorio cypress/e2e/tests con el siguiente contenido de ejemplo:

describe('Ejemplo de prueba', () => {
  it('Debería hacer algo correctamente', () => {
    cy.visit('https://www.example.com');
    cy.contains('Example Domain').should('be.visible');
  });
});

🛠 Comandos Customizados
Puedes definir comandos customizados en cypress/support/commands.js. Por ejemplo:

Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
