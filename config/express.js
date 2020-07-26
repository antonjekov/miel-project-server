const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser')
const cors = require('cors');

/**@__basedir comes from index.js where we put it like global const. Actualy this is __dirname the directory of our project
 * Because the path to directory is different in different operation sistems is better we to resolve the path with module path with method path.resolve()
 */

module.exports = (app) => {

    app.use(bodyParser.urlencoded({
        extended: false
    }))

    app.use(bodyParser.json())

    app.use(cookieParser());

    //app.use(express.static(path.resolve(__basedir, 'static')));

    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));

};