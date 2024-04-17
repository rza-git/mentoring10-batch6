const {verifyToken} = require("../lib/jwt.js")
const {User} = require("../models")

const authentication = async (req, res, next) => {

    try {
        if(req.headers.authorization) {

            
            const accessToken = req.headers.authorization.split(" ")[1]
            
            const {id} = verifyToken(accessToken)

            const foundUser = await User.findOne({
                where: {
                    id
                }
            })

            if(!foundUser) 
                throw {name: "Unauthenticated"}

            req.loggedUser = {
                id: foundUser.id,
                email: foundUser.email
            }

            next();
        } else {
            throw {name: "Unauthenticated"}
        }
    } catch(err) {
        next(err);
    }
}

module.exports = {
    authentication
}