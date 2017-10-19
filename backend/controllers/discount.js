"use strict";

var repository = require('../repository/index'),
    models = require('../models/index').allModels,
    constants = require('../helper/constants');
    
    function getDiscount(req, res) {
       
        var query = {};
    
        repository
            .getData(models.DiscountModel, query, false)
            .then(function (data) {
                res.status(200).json({"status":true, "response": data, "error": null });
            },
            function(error){
                res.status(400).json({"status":false, "response":null, "error": error });
            }
        );
    }

    function updateDiscount(req, res) {
        var body = req.body;
        if (!req.params.id) {
            return res.status(400).json({ "status": false, "response": null, "error": constants.fields_missing });
        }
    
        var query = { _id: req.params.id };
    
        repository.updateData(models.DiscountModel, query, body)
            .then(function (success) {
                res.status(200).json({ "status": true, "response": success, "error": null });
            },
            function (error) {
                res.status(400).json({ "status": false, "response": null, "error": error });
            });
    }
    
    
    
    exports.getDiscount = getDiscount;
    exports.updateDiscount = updateDiscount;