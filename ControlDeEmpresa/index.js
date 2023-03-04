'use strict'

const express = require("express");
const app = express();
const {connection} = require("./src/database/connection");
require('dotenv').config();
const port = process.env.PORT;
const company = require('./src/routes/company.routes');

connection();

app.use(express.urlencoded({extended: false}));

app.use('/api', company);

app.listen(port, function(){
    console.log(`El servidor esta conectado al puerto ${port}`);
});