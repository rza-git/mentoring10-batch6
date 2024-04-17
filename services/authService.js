const AuthRepository = require("../repositories/authRepository.js")
const {generateToken} = require("../lib/jwt.js")
const bcrypt = require("bcrypt")

class AuthService {
    
    static register = async (params) => {
        try {

            const result = await AuthRepository.register(params)

            return result
        } catch(err) {
            throw err
        }
    }

    static login = async (params) => {
        try {
            const foundUser = await AuthRepository.login(params);

            const {password} = params;
            let result = {}
            if(bcrypt.compareSync(password, foundUser.password)) {
                const accessToken = generateToken({
                    id: foundUser.id,
                    email: foundUser.email
                })

                result = {
                    email: foundUser.email,
                    accessToken
                }
            } else {
                throw {name: "InvalidCredentials"}
            }
            return result;
        } catch(err) {
            throw err
        }
    }
}

module.exports = AuthService