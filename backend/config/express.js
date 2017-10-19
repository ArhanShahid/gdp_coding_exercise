var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    config = require('./config'),
    // Custom winston logger
    logger = require('./log'),
    express = require('express'),
    methodOverride = require('method-override'),
    //busboy          = require('connect-busboy'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    // gzip/deflate outgoing responses
    compression = require('compression'),
    // Express HTTP access and error logging
    morgan = require('morgan'),
    path = require('path');


module.exports = function (app) {

    app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
    app.use(bodyParser.json({ limit: '10mb' }));
    app.disable('x-powered-by');
    app.use(morgan('dev'));
    app.use(methodOverride());
     app.use(express.static(path.join(__dirname, '../client')));
    app.set('view engine', 'ejs');
    app.use(cors());
    app.set('superSecret', config.secret);
};