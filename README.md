# Crud Mean Stack

Esto es un ejemplo sencillo de aplicación `CRUD` desarrollada en `Mean Stack`, podemos visualizar una lista de usuarios, en la que podemos editar o borrar estos, disponemos de otra ruta para la creación de nuevos usuarios y si pinchamos en el nombre de la app resetearemos los datos almacenados en MongoDB a unos por defecto.(MongoDB Express Angular Nodejs), [Angular CLI](https://github.com/angular/angular-cli) versión 8.3.5.

## Ejemplo

Aquí os dejo un link, [Crud Mean Stack](https://mean-stack81.herokuapp.com/) en el que podéis ver la aplicación en producción, subida al Host de `Heroku`.

## Información General, Instalaciones y versiones

### General

Toda la aplicación ha sido subida como una sola, de manera que `Node.js` sirve los archivos de angular, de este modo no seria necesario configurar nada de `CORS`, si hubiera sido subida a diferentes host, si seria necesario configurar las cabeceras de `CORS`, la aplicación ha sido subida `Heroku` y la base de datos esta directamente subida a un plan gratuito en la web oficial de `MongoDB`.

### Paquetes para Angular

Proyecto generado con `Angular-CLI` en la versión 8.3.5.  
Tenemos instalado `Angular Material` en la versión 8.2.1.  
Hemos añadido el paquete de `Angular/flex-layout` en su versión 8.0.0-beta.27.

### Paquetes para Node.js

Hemos añadido el paquete de `dotenv: ^8.2.0` para variables de entorno.  
Hemos añadido el paquete de `express: ^4.17.1` creación del servidor http.  
Hemos añadido el paquete de `mongoose: ^5.7.7` para la conexión con MongoDB.  
Hemos añadido el paquete de `morgan: ^1.9.1` en desarrollo para visualización de peticiones.

## Configuración Necesaria

Serán necesario hacer 2 configuraciones, cambiar la variable de entorno MONGO_URI en el archivo de `backend/config/config.env` y el `URL` en el archivo `src/app/services/user.service.ts` para la correcta realización de las peticiones `http`.

## Server en Desarrollo

Ejecuta `ng serve` desde dentro del directorio y navega a `http://localhost:4200/`
.  
Ejecuta `npm start` desde dentro del directorio para ejecución del servidor en `http://localhost:5000/`.

## Build

Antes de nada deberas asegurarte revisar la configuración en el archvivo de `angular.json`, debe esta configurada la salida de los archivos de Angular a `"outputPath": "backend/angular"`, que es donde tenemos configurados los archivos publicos de nuestro backend.  
Ejecuta `ng build --prod` desde dentro del directorio y los archivos de producción serán generados en la carpeta de `backend/angular/`.
