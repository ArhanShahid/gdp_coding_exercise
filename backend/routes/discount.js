"use strict";

var discount = require("../controllers/discount");

exports.discount = function(app, middleware){
    app.get('/discount', discount.getDiscount);
    app.put('/discount/:id', middleware, discount.updateDiscount);

};

