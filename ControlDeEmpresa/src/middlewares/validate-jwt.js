const {request, response} = require("express");
const jwt = require("jsonwebtoken");
const moment = require('moment');
const Company = require('../models/company.models');

const validateJWT = async(req = request, res = response, next) => {
    const token = req.header("x-token");

    if(!token){
        return res.status(401).send({
            message: "No hay token en la petición",
        });
    }

    try{
        const payload = jwt.decode(token, process.env.SECRET_KEY);
        const CompanyEncontrado = await Company.findById(payload.uId);
        console.log(CompanyEncontrado);

        if(payload.exp <=moment().unix()){
            return res.status(500).send({message: "El token ha expirado"})
        }

        if(!CompanyEncontrado){
            return res.status(401).send({
                message: "Token no valido -Empresa no existe en la base de datos",
            });
        }

        req.company = CompanyEncontrado;

        next();
    }catch(error){
        throw new Error(error);
    }
};

module.exports = {validateJWT};