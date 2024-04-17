const AuthService = require("../services/authService.js")

class AuthController {


    static register = async (req, res, next) => {
        try {
            const result = await AuthService.register(req.body);

            res.status(201).json(result)
        } catch(err) {
            next(err)
        }
    }

    static login = async (req, res, next) => {
        try {
            const result = await AuthService.login(req.body);


            res.status(200).json(result)
        } catch(err) {
            next(err);
        }
    }
}

module.exports = AuthController;