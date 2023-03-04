'use strict'

const {Router} = require('express');
const { CreateCompany,
        deleteCompany,
        updateCompany,
        readCompany,
        loginCompany,
        addBranchOffice,
        editBranchOffice,
        deleteBranchOffice, } = require('../controllers/company.controller');
const {check} = require('express-validator');
const {validateParams} = require('../middlewares/validate-params');
const {validateJWT} = require('../middlewares/validate-jwt');
//const { editBranchOffice } = require('../controllers/company.controller');

const api = Router();

//Empresa

api.post('/create-company', 
    [
        check("name", "El nombre de empresa es obligatorio").not().isEmpty(),
        check("password", "El password debe ser mayor a 6 digitos").isLength({
            min: 6,
        }),
        check("email", "El email es obligatorio").not().isEmpty(),
        validateParams,
    ],
CreateCompany
);

api.delete('/delete-company/:id', deleteCompany);

api.put('/update-company/:id',
[
    validateJWT,
    check("name", "El nombre de la empresa es obligatoria").not().isEmpty(),
    check("password", "El password debe ser mayor a 6 digitos").isLength({
        min: 6,
    }),
    check("email", "El email es obligatoria").not().isEmpty(),
    validateParams,
    ],
updateCompany);

api.get('/read-company', readCompany);

api.post('/login', loginCompany);

//About sucursal

api.put('/add-sucursal/:id', validateJWT, addBranchOffice);

api.put('/update-sucursal/:id', validateJWT, editBranchOffice);

api.delete('/delete-sucursal/:id', validateJWT, deleteBranchOffice);

module.exports = api;