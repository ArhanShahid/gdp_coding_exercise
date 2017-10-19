"use strict";

var repository = require('../repository/index'),
    models = require('../models/index').allModels,
    random_string = require('just.randomstring'),
    bcrypt = require('bcrypt-nodejs'),
    constants = require('../helper/constants');

function login(req, res) {
    var body = req.body;
    var query = {
        email: body.email
    };
    repository.getData(models.UserModel, query, true)
        .then(function (user) {
            if (!user) {
                res.status(401).json({ "status": false, "response": null, "error": constants.authentication_failed });
            } else if (user) {
                bcrypt.compare(body.password, user.password, function (err, result) {
                    if (result) {
                        var token = random_string(60) + '-' + user._id.toString();
                        var updateObj = {
                            $set: {
                                access_token: token
                            }
                        };
                        var responseData = {
                            access_token: token,
                            email: user.email
                        };
                        repository.updateData(models.UserModel, { _id: user._id }, updateObj)
                            .then(function (data) {
                                res.status(200).json({ "status": true, "response": responseData, "error": null });
                            });
                    }
                    else {
                        if (checkIfAJAXRequest(req)) {
                            console.log("JSON Found User Not Authenticated!");
                            res.status(400).json({ "status": false, "response": null, "error": constants.invalid_credentials });
                        } else {
                            console.log("Not a JSON Request User Not Authenticated!");
                            res.status(400).json({ "status": false, "response": null, "error": constants.invalid_credentials });
                        }
                    }
                });
            }
        });
}

function logout(req, res) {
    var body = {
        $set: {
            access_token: null
        }
    };
    var query = { access_token: req.headers['access_token'] };
    repository.updateData(models.UserModel, query, body)
        .then(function (Admin) {
            res.status(200).json({ "status": true, "response": true, "error": null });
        }, function (error) {
            res.status(401).json({ "status": false, "response": null, "error": error });
        });
}

function checkIfAJAXRequest(req) {
    return (req.headers && ((req.headers['x-requested-with'] && req.headers['x-requested-with'] == 'XMLHttpRequest')
        || (req.headers['content-type'].indexOf('application/json') != -1)) ? true : false);
}

exports.login = login;
exports.logout = logout;