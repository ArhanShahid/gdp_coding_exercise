
"use strict";

var middleware = require("../helper/middleware").middleware;

module.exports = function (apiRoutes) {
    
    require("./user").user(apiRoutes, middleware);
    require("./ads").ads(apiRoutes, middleware);
    require("./discount").discount(apiRoutes, middleware);
    require("./utility").utility_services(apiRoutes, middleware);
};