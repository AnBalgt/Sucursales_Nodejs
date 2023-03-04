'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompanySchema = Schema({
    name: String,
    email: String,
    password: String,
    address: String,
    typeCompany: String,
    branchOffices: [{
        address: String,
        municipality: String,
    }]
});

module.exports = mongoose.model('Company', CompanySchema);