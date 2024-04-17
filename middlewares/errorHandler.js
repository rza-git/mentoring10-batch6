const errorHandler = (err, req, res, next) => {
    console.log(err);

    if(err.name === "MissingFile") {
        res.status(400).json({message: "Missing File"})
    } else if(err.name === "InvalidCredentials") {
        res.status(400).json({message: "Wrong Email or Password"})
    } else if(err.name === "ErrorNotFound") {
        res.status(404).json({name: "Error Not Found", message: err.message})
    } else if(err.name === "Unauthenticated") {
        res.status(400).json({name: "Unauthenticated"})
    }
    
    
    else {
        res.status(500).json({message: "Internal Server Error"})
    }
}


module.exports = errorHandler;