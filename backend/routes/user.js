"use strict";

var user = require("../controllers/user");

exports.user = function(app, middleware){
    app.post('/user/login', user.login);
    app.get('/user/logout', middleware, user.logout)
};

