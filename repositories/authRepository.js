const {User} = require("../models");

class AuthRepository {

    static register = async (params) => {
        try {
            const user = await User.create(params, {returning: true});

            return user;
        } catch(err) {
            throw err
        }
    }

    static login = async (params) => {
        try {
            const {email} = params;

            const foundUser = await User.findOne({
                where: {
                    email
                }
            })

            if(!foundUser) 
                throw {name: "ErrorNotFound"}

            return foundUser;    
        } catch(err) {
            throw err
        }
    }
    
}

module.exports = AuthRepository;