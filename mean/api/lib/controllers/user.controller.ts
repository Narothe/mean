import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import {auth} from '../middlewares/auth.middleware';
import {admin} from '../middlewares/admin.middleware';
import UserService from "../modules/services/user.service";
import PasswordService from "../modules/services/password.service";
import TokenService from "../modules/services/token.service";
import {logger} from "../middlewares/logger.middleware";
import nodemailer from 'nodemailer';
import {config} from "../config";
import {sendEmail} from "../utils/sendEmail";
import {authSecured} from "../middlewares/authSecure.middleware";
import {Role} from "../types";

class UserController implements Controller {
    public path = '/api/user';
    public router = Router();
    private userService = new UserService();
    private passwordService = new PasswordService();
    private tokenService = new TokenService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/create`, logger, this.createNewOrUpdate);
        this.router.post(`${this.path}/auth`, logger, this.authenticate);
        this.router.delete(`${this.path}/logout/:userId`, auth, logger, this.removeHashSession);
        this.router.post(`${this.path}/reset-password`, logger, this.resetPassword); // Nowy endpoint do resetowania hasła
        this.router.delete(`${this.path}/delete`, authSecured, logger, this.deleteUser);
        this.router.post(`${this.path}/create-admin`, logger, this.createNewOrUpdateAdmin);

    }

    private authenticate = async (request: Request, response: Response, next: NextFunction) => {
        const {login, password} = request.body;

        try {
            const user = await this.userService.getByEmailOrName(login);
            if (!user) {
                response.status(401).json({error: 'Unauthorized'});
            }
            await this.passwordService.authorize(user.id, await this.passwordService.hashPassword(password));
            const token = await this.tokenService.create(user);
            response.status(200).json(this.tokenService.getToken(token));
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private createNewOrUpdate = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            userData.role = Role.USER;
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }

    };

    private removeHashSession = async (request: Request, response: Response, next: NextFunction) => {
        const {userId} = request.params

        try {
            const result = await this.tokenService.remove(userId);
            response.status(200).send(result);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(401).json({error: 'Unauthorized'});
        }
    };

    private resetPassword = async (request: Request, response: Response, next: NextFunction) => {
        const { emailOrUsername } = request.body;

        try {
            const user = await this.userService.getByEmailOrName(emailOrUsername);
            if (!user) {
                return response.status(404).json({ error: 'User not found' });
            }

            const newPassword = this.passwordService.generateRandomPassword();
            const hashedPassword = await this.passwordService.hashPassword(newPassword);

            await this.passwordService.createOrUpdate({ userId: user.id, password: hashedPassword });

            const mailOptions = {
                from: 'connectify@onet.pl',
                to: user.email,
                subject: 'Password Reset',
                text: `Your new password is: ${newPassword}`
            };
            sendEmail(mailOptions); // Wywołanie funkcji do wysyłania e-maili

            return response.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            console.error(`Password Reset Error: ${error.message}`);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }

    private deleteUser = async (request: Request, response: Response, next: NextFunction) => {
        const { userId } = request.body;
        try {
            const existingUser = await this.userService.getById(userId);
            if (!existingUser) {
                return response.status(404).json({ error: 'User not found' });
            }

            await this.userService.deleteUser(userId);
            response.status(200).json({ message: 'User deleted' });
        } catch (error) {
            console.error(`Delete User Error: ${error.message}`);
            response.status(500).json({ error: 'Internal server error' });
        }
    }


    private createNewOrUpdateAdmin = async (request: Request, response: Response, next: NextFunction) => {
        const userData = request.body;
        try {
            userData.role = Role.ADMIN;
            const user = await this.userService.createNewOrUpdate(userData);
            if (userData.password) {
                const hashedPassword = await this.passwordService.hashPassword(userData.password)
                await this.passwordService.createOrUpdate({
                    userId: user._id,
                    password: hashedPassword
                });
            }
            response.status(200).json(user);
        } catch (error) {
            console.error(`Validation Error: ${error.message}`);
            response.status(400).json({error: 'Bad request', value: error.message});
        }

    };

}

export default UserController;
