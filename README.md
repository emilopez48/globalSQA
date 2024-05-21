# Cypress QA Automation Project Banco XYZ

Este es un proyecto de automatización de pruebas utilizando Cypress. El objetivo de este proyecto es proporcionar un conjunto de pruebas automatizadas para la aplicación de ejemplo del Banco XYZ, asegurando su correcta funcionalidad y rendimiento.

## Tabla de Contenidos

- [Introducción](#introducción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Ejecución de Pruebas](#ejecución-de-pruebas)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Escribiendo Pruebas](#escribiendo-pruebas)
- [Comandos Customizados](#comandos-customizados)

## Introducción

Este proyecto utiliza Cypress para automatizar pruebas end-to-end de la aplicación bancaria. Cypress es una herramienta poderosa para realizar pruebas rápidas y fiables en cualquier aplicación web.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- [Node.js](https://nodejs.org/) (versión 12 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)

## Instalación

Sigue estos pasos para configurar el proyecto localmente:

1. Clona este repositorio:
    
    git clone https://github.com/emilopez48/globalSQA.git
    

2. Navega al directorio del proyecto:
   
    cd cypress-qa-automation
    

3. Instala las dependencias del proyecto:
    
    npm install
    

## Ejecución de Pruebas

### Ejecución en modo interactivo

Para ejecutar Cypress en modo interactivo, donde puedes ver las pruebas en acción, usa el siguiente comando:

```bash
npm run cypress:open
Ejecución en modo headless
Para ejecutar las pruebas en modo headless, ideal para integración continua (CI), usa:

bash
Copiar código
npm run cypress:run
Estructura del Proyecto
La estructura del proyecto es la siguiente:

bash
Copiar código
cypress-qa-automation/
│
├── cypress/
│   ├── e2e/testingGlobalsqa.cy          # Pruebas de la aplicacion
│   ├── fixtures/DOM/localizadores       # set de localizadores y datos de pruebas
│   │                                    
│   │                             
│   ├── downloads                        # Carpeta de descargas
│   └── support/                         # Comandos y configuración de Cypress
│       ├── commands.js                  # Comandos customizados
│       └── e2e                          # Archivo de configuración principal
│
├── node_modules/           # Dependencias de Node.js
├── .gitignore              # Archivos y directorios ignorados por git
├── cypress.json            # Configuración de Cypress
├── package.json            # Dependencias y scripts de npm
└── README.md               # Documentación del proyecto
Escribiendo Pruebas
Para escribir una nueva prueba, crea un archivo en el directorio cypress/integration/tests/ con el siguiente contenido de ejemplo:

javascript
Copiar código
describe('Ejemplo de prueba', () => {
  it('Debería hacer algo correctamente', () => {
    cy.visit('https://www.example.com');
    cy.contains('Example Domain').should('be.visible');
  });
});
Comandos Customizados
Puedes definir comandos customizados en cypress/support/commands.js. Por ejemplo:

javascript
Copiar código
Cypress.Commands.add('login', (username, password) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});
