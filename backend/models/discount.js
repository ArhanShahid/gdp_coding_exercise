"use strict";

var mongoose = require("mongoose"),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var DiscountSchema = new Schema({
    customer            :       { type: String },
    ad                  :       { type: String },
    type                :       { type: String },
    min_ad              :       { type: Number },
    discount_price      :       { type: Number },
    discount_for        :       { type: Object }
}, { timestamps: true });

exports.DiscountModel = function () {
    return mongoose.model('discounts', DiscountSchema);
};