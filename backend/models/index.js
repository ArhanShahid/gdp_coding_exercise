"use strict";

exports.allModels = {
    UserModel: require("./user").UserModel(),
    DiscountModel: require("./discount").DiscountModel(),
    AdsModel: require("./ads").AdsModel()
};

