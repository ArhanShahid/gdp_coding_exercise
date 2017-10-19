
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development',
    path = require('path');

var config = {

    root: path.resolve(__dirname + '/../'),

    port: process.env.PORT || 3000,

    redisSessionSecret: 'eVCbCFxUUG1kq3x5U9tuzUOkg',

    logMaxFileSize: 1048576,

    logMaxFiles: 10,

    'secret': '',

    pushServerKey : ''
};

module.exports = config;
