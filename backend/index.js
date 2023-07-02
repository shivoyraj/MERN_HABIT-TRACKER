// importing and using express
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const path = require('path');

// importing index_routes
const indexRoutes = require('./routes/index_routes');

// included mongoose db configuration
const mongoose = require('mongoose');
const db = require('./configs/mongoose')

const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());


app.use('/', indexRoutes);

const portNo = process.env.PORT || 8001;

app.listen(portNo, function (err) {
    if (err) {
        console.log(`Error while running server: ${err}`);
        return;
    }
    console.log(`Server is running at port Number: ${portNo}`);
});