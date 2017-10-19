"use strict";

var mongoose = require("mongoose"),
    bcrypt = require('bcrypt-nodejs'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    name             : String,
    email            : { type: String, unique: true, index: true  },
    password         : { type: String },
    access_token     : { type: String, default: null },
    is_deleted       : { type: Boolean, default: false }
}, { timestamps: true });


// generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

exports.UserModel = function () {
    return mongoose.model('users', UserSchema);
};
