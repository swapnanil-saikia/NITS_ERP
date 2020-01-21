var express = require('express'), 
	mongoose = require('mongoose');

var schema = mongoose.Schema;

var studentSchema = new schema({
	name : String,
	scid : String,
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

module.exports = mongoose.model("complainStudent",studentSchema);