# 1234ticket BackEnd v2

BackEnd para el proyecto 1234ticket escrito en Nodejs y express con typescript

## Instalación

Instalar dependencias y crear archivo .env basado en .env.example

```bash
npm install
```
Crear interfaces prisma en base al archivo schema.prisma
```bash
npm run generate-types
```
OPCION 1: Sincronizar con base de datos con archivo schema.[prisma](https://www.prisma.io/docs/)(sin seeders)
```bash
npm run sync-db-tables
```

OPCION 2: Sincronizar con base de datos con archivo schema.[prisma](https://www.prisma.io/docs/) y archivos de migración(este proceso elimina la base de datos actual y la vuelve a crear)
```bash
npm run sync-db-migrate
```

Popular Base de datos (SEEDERS)
```bash
npm run seeds
```

Iniciar aplicación modo development

```bash
npm run dev
```

## Estructura Proyecto


```bash
/prisma/
|schema.prisma * archivo configuración prisma 
/src/
|-- controllers/ *controladores heredados de _base.controller.ts
|-- errors/   *errores genericos normalizados
|-- middlewares/ *middlewares para rutas
|-- routes/ *rutas del proyecto, partiendo de _main.route.ts
|-- seeders/ * archivos de generación de seeders
|-- utils/ * funciones genericas de ayuda ej: manejo de fechas
|-- config/ * archivos de configuracion ej: paginacion
|-- validators/ * validadores de campos 
| app.ts
| index.ts

```
## Formateo Código
La aplicación funciona con ESlint, por lo que se recomineda descargar la extensión de VScode
```bash
    npm run lint *ver errores de formato
    npm run lint-fix *ver y arreglar errores(los que se puedan) de formato
```
## Documentación Swagger
En cada ruta de la carpeta src/routes se debe llenar la documentación con JsDocs para la autogeneración de [swagger](https://swagger.io/docs/)
```javascrpit
/**
 * @swagger
 * /roles/:
 *  patch:
 *    description: Api para modificar rol
 *    responses:
 *      '200':
 *        description: Modificación satisfactoria
 *
 */
providersCatalogRoute.patch('/:id', providersCatalogController.editOne)
```
Please make sure to update tests as appropriate.
## Seeders
Comandos seeders:
```bash
    npm run seeds *ejecutar los seeders en orden de prioridad
    npm run seed *ejecutar 1 o mas seeders con linea de comandos
```
