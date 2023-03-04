const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.SECRET_KEY;

const generateJWT = async(uId, name, email) =>{
    const payload = {uId, name, email};
    try{
        const token = await jwt.sign(payload, secret, {
            expiresIn: "1h",
        });
        return token;
    }catch(error){
        throw new Error(error + "No se pudo generar el token");
    }
};

module.exports = {generateJWT};