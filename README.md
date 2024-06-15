## Description

Prueba tecnica elaborada para glounit.

Documento guia:


## Para ejecutar sin docker
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod


Es necesario cambiar la informacion contenida en config.ts encontrado en el directorio src/config, esto con el fin de
de modificar las los valores por defecto que se le dan a la aplicacion.

Para ejecutar con docker solo ejecutart el comando docker compose up -d