import  UserModel  from '../schemas/user.schema';
import {IUser} from "../models/user.model";

class UserService {
    public async createNewOrUpdate(user: IUser) {
        console.log(user)
        try {
            if (!user._id) {
                const dataModel = new UserModel(user);
                return await dataModel.save();
            } else {
                return await UserModel.findByIdAndUpdate(user._id, { $set: user }, { new: true });
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    public async getByEmailOrName(name: string) {
        try {
            const result = await UserModel.findOne({ $or: [{ email: name }, { name: name }] });
            if (result) {
                return result;
            }
        } catch (error) {
            console.error('Wystąpił błąd podczas pobierania danych:', error);
            throw new Error('Wystąpił błąd podczas pobierania danych');
        }
    }

    public async deleteUser(userId: string) {
        try {
            return await UserModel.findByIdAndDelete(userId);
        } catch (error) {
            console.error('Wystąpił błąd podczas usuwania danych:', error);
            throw new Error('Wystąpił błąd podczas usuwania danych');
        }
    }


    public async getById(userId: string) {
        try {
            // Użyj metody modelu, aby pobrać użytkownika z bazy danych na podstawie ID
            const user = await UserModel.findById(userId);

            // Sprawdź, czy użytkownik został znaleziony
            if (!user) {
                throw new Error('User not found');
            }

            // Zwróć znalezionego użytkownika
            return user;
        } catch (error) {
            // Obsłuż błędy, na przykład gdy użytkownik nie zostanie znaleziony w bazie danych
            throw new Error(`Error fetching user by ID: ${error.message}`);
        }
    }

}

export default UserService;
