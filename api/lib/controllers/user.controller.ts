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
            // Sprawdź czy istnieje użytkownik o podanym adresie email lub nazwie użytkownika
            const user = await this.userService.getByEmailOrName(emailOrUsername);
            if (!user) {
                return response.status(404).json({ error: 'User not found' });
            }

            // Generuj nowe hasło
            const newPassword = this.passwordService.generateRandomPassword();
            const hashedPassword = await this.passwordService.hashPassword(newPassword);

            // Aktualizuj hasło użytkownika
            await this.passwordService.createOrUpdate({ userId: user.id, password: hashedPassword });

            // Wysyłka nowego hasła na adres email użytkownika
            const mailOptions = {
                from: 'connectify@onet.pl', // Adres e-mail nadawcy
                to: user.email, // Adres e-mail odbiorcy
                subject: 'Password Reset', // Temat wiadomości
                text: `Your new password is: ${newPassword}` // Treść wiadomości
            };
            sendEmail(mailOptions); // Wywołanie funkcji do wysyłania e-maili

            return response.status(200).json({ message: 'Password reset successful' });
        } catch (error) {
            console.error(`Password Reset Error: ${error.message}`);
            return response.status(500).json({ error: 'Internal server error' });
        }
    }
    // private resetPassword = async (request: Request, response: Response, next: NextFunction) => {
    //     const { emailOrUsername } = request.body;
    //
    //     try {
    //         // Sprawdź czy istnieje użytkownik o podanym adresie email lub nazwie użytkownika
    //         const user = await this.userService.getByEmailOrName(emailOrUsername);
    //         if (!user) {
    //             return response.status(404).json({ error: 'User not found' });
    //         }
    //
    //         // Generuj nowe hasło
    //         const newPassword = this.passwordService.generateRandomPassword();
    //         const hashedPassword = await this.passwordService.hashPassword(newPassword);
    //
    //         // Aktualizuj hasło użytkownika
    //         await this.passwordService.createOrUpdate({ userId: user.id, password: hashedPassword });
    //
    //         // Wysyłka nowego hasła na adres email użytkownika
    //         // Tutaj możesz umieścić kod wysyłki emaila z nowym hasłem
    //
    //         return response.status(200).json({ message: 'Password reset successful', newPassword });
    //     } catch (error) {
    //         console.error(`Password Reset Error: ${error.message}`);
    //         return response.status(500).json({ error: 'Internal server error' });
    //     }
    // };


}

export default UserController;
