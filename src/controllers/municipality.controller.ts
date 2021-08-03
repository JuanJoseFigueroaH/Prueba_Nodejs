import { Request, Response, NextFunction } from 'express';
import BaseController from './_base.controller';

class MunicipalityController extends BaseController {
    public create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        req.body.nombre = req.body.nombre.toUpperCase();
        const newMunicipality = await this.db.municipalityModel.create(req.body);
        res.status(201).send({data: newMunicipality, message: 'Registro Modificado Correctamente'});
    };
}

export default MunicipalityController;