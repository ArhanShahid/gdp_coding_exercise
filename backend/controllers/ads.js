"use strict";

var repository = require('../repository/index'),
    models = require('../models/index').allModels,
    constants = require('../helper/constants');

function getAds(req, res) {

    var query = {};

    repository
        .getData(models.AdsModel, query, false)
        .then(function (data) {
            res.status(200).json({ "status": true, "response": data, "error": null });
        },
        function (error) {
            res.status(400).json({ "status": false, "response": null, "error": error });
        }
        );
}

function updateAd(req, res) {
    var body = req.body;
    if (!req.params.id && body.name == null && body.price == null) {
        return res.status(400).json({ "status": false, "response": null, "error": constants.fields_missing });
    }

    var query = { _id: req.params.id };

    var obj = { name: body.name, price: body.price };

    repository.updateData(models.AdsModel, query, obj)
        .then(function (success) {
            res.status(200).json({ "status": true, "response": success, "error": null });
        },
        function (error) {
            res.status(400).json({ "status": false, "response": null, "error": error });
        });
}

exports.getAds = getAds;
exports.updateAd = updateAd;