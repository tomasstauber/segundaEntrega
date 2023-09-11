import { userModel } from "./models/user.model.js";

class UserManager {

    async addUser(user) {
        try {
            await userModel.create(user);
            console.log("Ususario creado correctamente!");
            return true;
        } catch (error) {
            console.log("Ha ocurrido un error al crear el usuario!");
            return false;
        }
    }

    async getUsers(params) {
        let { limit, page, query, sort } = params;
        limit = limit ? limit : 10;
        page = page ? page : 1;
        query = query || {};
        sort = sort ? sort == "asc" ? 1 : -1 : 0;
        let users = await userModel.find({}).lean();
        return users;
    }

    async loggin(user, pass) {
        try {
            const userLoggued = await userModel.findOne({ $and: [{ email: user }, { password: pass }] }) || null;
            if (userLoggued) {
                console.log("Usuario logueado correctamente!");
                return user;
            }
            return false;
        } catch (error) {
            console.log("Se ha producido un error al loguear el usuario!");
            return false;
        }
    }
}

export default UserManager;