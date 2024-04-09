import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';

let testArr = [4,5,6,3,5,3,7,5,13,5,6,4,3,6,3,6];

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/latest`, this.getAll);
        this.router.post(`${this.path}/:id`, this.addData);
    }

    private getAll = async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(testArr);
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const { elem } = request.body;

        testArr.push(elem);

        response.status(200).json(testArr);
    }
}

export default PostController;
