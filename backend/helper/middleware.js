"use strict";

var repository = require('../repository/index'),
    constants = require('./constants'),
    models = require('../models/index').allModels;

function middleware(req, res, next) {
    var token = req.headers['access_token'];
    var userId = token && token.split('-')[1];
    if (token && userId) {
        var query = { _id: userId };
        repository.getData(models.UserModel, query, true)
            .then(function (data) {
                if (data && data.access_token == token) {
                    req.session = data;
                    next();
                } else {
                    res.status(401).json({ "status": false, "response": null, "error": constants.unauthorized_request });
                }
            })
    } else {
        res.status(401).json({ "status": false, "response": null, "error": constants.unauthorized_request });
    }
};

exports.middleware = middleware;