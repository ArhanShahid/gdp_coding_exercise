"use strict";

var utilityCtrl = require("../controllers/utility");

exports.utility_services = function(app,middleware){

    app.post('/utility/seed',utilityCtrl.seed);

};