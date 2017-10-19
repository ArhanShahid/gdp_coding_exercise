"use strict";

var ads = require("../controllers/ads");

exports.ads = function(app, middleware){
    app.get('/ads', ads.getAds);
    app.put('/ads/:id', middleware, ads.updateAd);
};

