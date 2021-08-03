import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors';
import { body, param } from 'express-validator';
import BaseValidator from './_base.validator';

class InstitucionValidator extends BaseValidator {
    public validateFields = [
        body('nombre')
            .notEmpty()
            .withMessage('Name is required')
            .isString()
            .withMessage('Name is not a string'),
        body('descripcion')
            .notEmpty()
            .withMessage('Descripcion is required')
            .isString()
            .withMessage('Descripcion is not a string'),
        body('departamento')
            .isString()
            .withMessage('Id Department is string')
    ];

    public updateFields = [
        body('descripcion')
            .notEmpty()
            .withMessage('Descripcion is required')
            .isString()
            .withMessage('Descripcion is not a string'),
        body('departamento')
            .isString()
            .withMessage('Id Department is string')
    ];

    public paramIdValidator = [
        param('id')
        .notEmpty()
        .isNumeric()
    ];

    public valifateIfInstitucionExists = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        req.body.nombre = req.body.nombre.toUpperCase();
        const municipality = await this.db.municipalityModel.findOne({nombre: req.body.nombre});
        if (municipality) {
            throw new BadRequestError(
                `Municipality: ${req.body.nombre} exists in db`
            );
        }
        next();
    };
}

export default InstitucionValidator;