import { Router } from 'express';
import institucionRoute from './institucion.route';
import municipalityRoute from './municipality.route';

const mainRoute = Router();

mainRoute.use('/institutions', institucionRoute);
mainRoute.use('/municipalities', municipalityRoute);

export default mainRoute;