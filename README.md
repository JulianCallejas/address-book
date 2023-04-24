# Address book Crud ReactJS  
Crud hecho usando React Js, Axios y Bootstrap  

## Instalación  

Es necesario tener Node Js instalado.  
  
1. Instale Node Js: [Node web](https://nodejs.org/)
2. Clone el repositorio
3. Ejecute `$ npm install para instalar las dependencias
4. En la ruta base del repositorio cree un archivo .env que contenga las siguientes variables:  
REACT_APP_BASE_URL  
REACT_APP_SOCKET_URL  
  
  REACT_APP_BASE_URL contendrá la dirección para conectar con la API  
  REACT_APP_SOCKET_URL contendrá la dirección para conectar con el websocket  
  
## Ejecutar la aplicación

1.  Ejecute el comando `$ npm run start
2. Visite `http://localhost:3000`
3. Disfrute

## Dependencias:
    "axios": "^1.3.6",
    "bootstrap": "^5.3.0-alpha3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.10.0"

## Estructura de directorios:
La estructura se realizó siguiendo patrón de modelo, vista, controlador  

address-book  
+ public     - Carpeta que contiene el archivo html principal  
+ src        - Carpeta que contiene los arcivos con el código de la app  
    + components   -Carpeta que contiene componentes que se renderizan en la vista  
    + model        -Carpeta con el modelo de datos utilizado en la app  
    + services     -Carpeta contiene los controladores y servicios que comican el back-front  
    + views        -Capeta con los archivos principales de las vistas  
  
---
# Address book Crud ReactJS
Crud made using React Js, Axios, Bootstrap.

## Set up

You'll need [Node.js](https://nodejs.org/) on your local development machine.

1. Install Node Js: [Node web](https://nodejs.org/)
2. Clone the repo
3. Run `$ npm install to install the dependencies
4. Create a .env file at the base floder with the next variables:  
REACT_APP_BASE_URL  
REACT_APP_SOCKET_URL  
  REACT_APP_BASE_URL should be equal to the API-Rest url address  
  REACT_APP_SOCKET_URL should be equal to the websocket url address  
  
## Up and running

1.  Run `$ npm run start
2. Visit `http://localhost:3000`
3. Enjoy :)
