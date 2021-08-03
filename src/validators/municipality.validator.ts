import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors';
import { body, param } from 'express-validator';
import BaseValidator from './_base.validator';

class MunicipalityValidator extends BaseValidator {
    public validateFields = [
        body('nombre')
            .notEmpty()
            .withMessage('Name is required')
            .isString()
            .withMessage('Name is not a string'),
        body('departamento')
            .isString()
            .withMessage('Id Department is string')
    ];

    public valifateIfMunicipalityExists = async (
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


export default MunicipalityValidator;