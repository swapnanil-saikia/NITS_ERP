var express = require('express'), 
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var facultySchema = new schema({
	name : String,
	empid : String,
	email : String,
	mobileno : String,
	complaint : String,
	token: String,
	status1: String,
	status2: String,
	status3: String,
	employee:
	    {
	      type:mongoose.Schema.Types.ObjectId,
	      ref:"Employee"
	    }
})

module.exports = mongoose.model("complainFaculty",facultySchema);