"use strict";

var mongoose = require("mongoose"),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var AdsSchema = new Schema({
    id          :       { type: String, default: null },
    name        :       { type: String, default: null },
    price       :       { type: Number, default: 0 },
    is_deleted  :       { type: Boolean, default: false }
}, { timestamps: true });

exports.AdsModel = function () {
    return mongoose.model('ads', AdsSchema);
};
