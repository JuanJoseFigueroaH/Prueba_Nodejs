import { Request, Response, NextFunction } from 'express';
import BaseController from './_base.controller';
import { NotFoundError } from '../errors/not-found-error';

class InstitucionController extends BaseController {
    public getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const institucion = await this.db.institucionModel.find();
        res.status(200).send({data: institucion});
    };

    public create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        req.body.nombre = req.body.nombre.toUpperCase();
        req.body.descripcion = req.body.descripcion.toUpperCase();
        const newInstitucion = await this.db.institucionModel.create(req.body);
        res.status(201).send({data: newInstitucion, message: 'Registro Creado Correctamente'});
    };

    public getOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const institucion = await this.db.institucionModel.findOne({_id: id});
        if (!institucion) {
          throw new NotFoundError();
        }
        res.status(200).send({data: institucion});
    };

    public deleted = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const institucion = await this.db.institucionModel.findByIdAndDelete({_id: id});
        if (!institucion) {
          throw new NotFoundError();
        }
        res.status(201).send({data: institucion, message: 'Registro Eliminado Correctamente'});
    };

    public update = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const institucionFound = await this.db.institucionModel.findOne({_id: parseInt(id)});
        if (!institucionFound) {
          throw new NotFoundError();
        }
        
        req.body.descripcion = req.body.descripcion.toUpperCase();
        // Update Institucion data
        const institucionUpdated = await this.db.institucionModel.findByIdAndUpdate({_id:parseInt(id)}, req.body)
        res.status(201).send({data: institucionUpdated, message: 'Registro Modificado Correctamente'});
    };

    public deletedArray = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const that = this;
        const arrayId = req.body;
        arrayId.map(async function(id: any){
            console.log(id);
            const institucion = await that.db.institucionModel.findByIdAndDelete({_id: id});
            if (!institucion) {
                throw new NotFoundError();
            }
        });
        res.status(201).send({message: 'Registros eliminados correctamente'});
    };
}

export default InstitucionController;