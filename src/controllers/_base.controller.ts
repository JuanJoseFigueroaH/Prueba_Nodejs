import model from '../models/_main.model';

abstract class BaseController {
    protected db = model;
    // eslint-disable-next-line no-useless-constructor
    constructor () {}
  }
  
  export default BaseController;