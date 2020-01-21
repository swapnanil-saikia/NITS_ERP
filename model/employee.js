var express = require('express'),
	mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var schema = mongoose.Schema;

var employeeSchema = new schema({
	username: String,
	password: String,
	name : String,
	empid : String,
	email : String,
	mobileno : String,
	complainStudent: [{

		type:mongoose.Schema.Types.ObjectId,
	    ref:"complainStudent"
	}],
	
	complainFaculty: [{
		type:mongoose.Schema.Types.ObjectId,
	    ref:"complainFaculty"
	}]
})

employeeSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("Employee",employeeSchema); 