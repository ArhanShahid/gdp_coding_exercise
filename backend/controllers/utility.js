"use strict";

var repository = require('../repository/index'),
    models = require('../models/index').allModels,
    response_messages = require('../helper/constants'),
    seed_data = require('../helper/seed');

function seed(req, res) {
    var query = {};
    repository.getData(models.UserModel, query, true)
        .then(function (success) {
            if (success) {
                res.status(401).json({ "status": false, "response": null, "error": response_messages.seed_already_executed });
            } else {
                repository.register(models.UserModel, seed_data.admin)
                    .then(function (success) {
                        repository.bulkInsert(models.AdsModel, seed_data.ads);
                        repository.bulkInsert(models.DiscountModel, seed_data.discounts);
                        res.status(200).json({ "status": true, "response": response_messages.seed_executed, "error": null });
                    }, function (error) {
                        res.status(400).json({ "status": false, "response": null, "error": error });
                    });
            }
        }, function (error) {
            res.status(400).json({ "status": false, "response": null, "error": error });
        });
}

exports.seed = seed;