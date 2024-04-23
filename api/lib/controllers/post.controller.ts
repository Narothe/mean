import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import DataService from '../modules/services/data.service';
import {logger} from "../middlewares/logger.middleware";

class PostController implements Controller {
    public path = '/api/post';
    public router = Router();
    public dataService = new DataService;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, logger, this.addData); // dodanie elementu
        this.router.get(`${this.path}/:id`, logger, this.getElementById); // pobranie elementu o danym id
        this.router.delete(`${this.path}/:id`, logger, this.removePost); // usunięcie elementu

        this.router.get(`${this.path}/:id`, logger, this.getById); // pobranie elementu o danym id
        this.router.delete(`${this.path}/:id`, logger, this.deleteById); // usunięcie elementu
        this.router.delete(`${this.path}`, logger, this.deleteAllPosts); // usunięcie wszystkich elementów
    }

    private addData = async (request: Request, response: Response, next: NextFunction) => {
        const {title, text, image} = request.body;

        const readingData = {
            title,
            text,
            image
        };
        try {
            await this.dataService.createPost(readingData);
            response.status(200).json(readingData);
        } catch (error) {
            console.log('eeee', error)

            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Invalid input data.'});
        }
    }

    private getElementById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }

    private removePost = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    private getById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const allData = await this.dataService.query({_id: id});
        response.status(200).json(allData);
    }

    private deleteById = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        await this.dataService.deleteData({_id: id});
        response.sendStatus(200);
    };

    private deleteAllPosts = async (request: Request, response: Response, next: NextFunction) => {
        await this.dataService.deleteData({});
        response.sendStatus(200);
    };


}

export default PostController;
