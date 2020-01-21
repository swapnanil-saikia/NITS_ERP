var express = require('express'),
	mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = mongoose.Schema;

var adminSchema = new schema({
	username: String,
	password: String,
})

adminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Admin",adminSchema); 