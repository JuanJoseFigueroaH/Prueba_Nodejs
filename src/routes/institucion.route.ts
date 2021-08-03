import { Router } from 'express';
import InstitucionController from '../controllers/institucion.controller';
import InstitucionValidator from '../validators/institucion.validator';
import { validateRequest } from '../middlewares';

const institucionRoute = Router();
const institucionController = new InstitucionController();
const institucionValidator = new InstitucionValidator();

/**
 * @swagger
 * /institucions:
 *  get:
 *    description: "Get all Institucions"
 *    tags:
 *      - Institucions
 *    security:
 *      - bearerAuth: []
 *    responses:
 *       200:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       404:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             "errors": [
 *                  "message": "Not Found"
 *              ],
 *           }
 */
institucionRoute.get('/', institucionController.getAll);

/**
 * @swagger
 * /institutions/{id}:
 *  get:
 *    description: "Get Institucions by id"
 *    tags:
 *      - Institucions
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *       200:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       404:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             "errors": [
 *                  "message": "Not Found"
 *              ],
 *           }
 */
institucionRoute.get(
    '/:id',
    institucionValidator.paramIdValidator,
    institucionController.getOne
);

/**
 * @swagger
 * /institutions/create:
 *  post:
 *    description: "Create Institucions"
 *    tags:
 *      - Institucions
 *    produces:
 *      - application/json
 *    parameters:
 *      - name: nombre
 *        in: formData
 *        required: true
 *        type: string
 *      - name: departamento
 *        in: formData
 *        type: ObjectId
 *    responses:
 *       201:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       400:
 *         description: bad request
 *         examples:
 *           application/json: {
 *              "errors": [
 *                  {
 *                    "message": "Name is required",
 *                    "field": "name"
 *                  }
 *              ]
 *           }
 */
institucionRoute.post(
    '/create',
    institucionValidator.validateFields,
    validateRequest,
    institucionValidator.valifateIfInstitucionExists,
    institucionController.create
);

/**
 * @swagger
 * /institutions/modify/{id}:
 *  put:
 *    description: "Update Institucions"
 *    tags:
 *      - Institucions
 *    produces:
 *      - application/json
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: number
 *      - name: descripcion
 *        in: formData
 *        required: true
 *        type: string
 *      - name: municipio
 *        in: formData
 *        type: ObjectId
 *    responses:
 *       201:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       400:
 *         description: bad request
 *         examples:
 *           application/json: {
 *            "errors": [
 *                {
 *                    "message": "Name is required",
 *                    "field": "name"
 *                }
 *            ]
 *           }
 */
institucionRoute.put(
    'modify/:id',
    institucionValidator.updateFields,
    validateRequest,
    institucionController.update
);

/**
 * @swagger
 * /institutions/delete/{id}:
 *  delete:
 *    description: "Delete Institucions by id"
 *    tags:
 *      - Institucions
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *       200:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       404:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             "errors": [
 *                  "message": "Not Found"
 *              ],
 *           }
 */
institucionRoute.delete(
    '/:id',
    institucionValidator.paramIdValidator,
    institucionController.deleted
);

/**
 * @swagger
 * /institutions/delete:
 *  delete:
 *    description: "Delete Institucions"
 *    tags:
 *      - Institucions
 *    security:
 *      - bearerAuth: []
 *    parameters:
 *      - name: id
 *        in: path
 *        required: true
 *        type: number
 *    responses:
 *       200:
 *         examples:
 *           application/json: {
 *              "_id": 606c8c02a4179839540ab167,
 *              "nombre": "Colegio",
 *              "descripcion": "Colegio 1",
 *              "municipio": 606c8c24a4179839540ab168,
 *              "created_at": "2021-06-10T01:07:31.210Z",
 *              "updated_at": "2021-06-10T01:10:30.126Z"
 *           }
 *       404:
 *         schema:
 *           type: object
 *           properties:
 *             errors:
 *               type: object
 *         examples:
 *           application/json: {
 *             "errors": [
 *                  "message": "Not Found"
 *              ],
 *           }
 */
institucionRoute.post(
    '/delete',
    institucionController.deletedArray
);

export default institucionRoute;