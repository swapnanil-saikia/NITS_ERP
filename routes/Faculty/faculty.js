var express = require('express');
var router = express.Router();

var complainFaculty = require('../../model/complain-faculty');

router.get("/",(req,res)=>{
	complainFaculty.find({},(err,allcomplaint)=>{
		if(err) console.log(err);
		else{
			res.render("./faculty/facultyindex",{Complaint:allcomplaint});
		}
	})
})

router.post("/",(req,res)=>{
	var newComplain = {
		name : req.body.name,
		empid : req.body.empid,
		email : req.body.email,
		mobileno :req.body.mobileno,
		complaint : req.body.complaint
	}

	complainFaculty.create(newComplain,(err,nc)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect("facultystatus/"+nc._id);
		}
	})
})

router.get("/facultystatus/:id",(req,res)=>{
	var s=0;
	complainFaculty.findById(req.params.id,(err,nc)=>{
		if(err)
			res.render("./faculty/facultystatus",{newComplain:nc,status:s});
		else{
			s=1;
			res.render("./faculty/facultystatus",{newComplain:nc,status:s});
		}
	})
	
})

module.exports = router;