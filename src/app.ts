import express, { Response, Request } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import mongoose from 'mongoose';

//Conexión a la base de datos MongoDB
mongoose.Promise=global.Promise;
const dbUrl = 'mongodb://localhost:27017/prueba-nodejs';
mongoose.connect(dbUrl, {useCreateIndex:true, useNewUrlParser: true})
.then(mongoose => console.log('Conectado a la BD en el puerto 27017'))
.catch(err => console.log(err));

import { NotFoundError } from './errors';
//import { errorHandler } from './middlewares';
import mainRoute from './routes/_main.route';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerDocs = swaggerJsDoc({
  swaggerDefinition: {
    info: {
      title: 'Prueba',
      description: 'Api Rest Prueba',
      version: '2.0',
      contact: {
        name: 'name'
      },
      servers: [
        {
          url: 'http://localhost:3001/',
          name: 'test'
        }
      ]
    },
    basePath: '/api',
  },
  apis: ['src/routes/*.ts']
});
const app = express();
// middleware
app.set('trust proxy', true);
app.use(express.json());
app.use(morgan('combined'));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  '/api/v2/public',
  express.static(path.join(__dirname, '/public'))
);

// swagger
app.get('/swagger.json', function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerDocs);
});
app.use(
  '/swagger',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocs)
);

app.use('/api', mainRoute);

app.all('*', (req: Request, res: Response) => {
  throw new NotFoundError();
});
//app.use(errorHandler);

export { app };
