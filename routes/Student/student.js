var express = require('express');
var router = express.Router();

var complainStudent = require('../../model/complain-student');

router.get("/",(req,res)=>{
	complainStudent.find({},(err,allcomplaint)=>{
		if(err) console.log(err);
		else{
			res.render("./student/studentindex",{Complaint:allcomplaint});
		}
	})
})

router.post("/",(req,res)=>{
	var newComplain = {
		name : req.body.name,
		scid : req.body.scid,
		email : req.body.email,
		mobileno :req.body.mobileno,
		complaint : req.body.complaint
	}

	complainStudent.create(newComplain,(err,nc)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect("studentstatus/"+nc._id);
		}
	})
})

router.get("/studentstatus/:id",(req,res)=>{
	var s=0;
	complainStudent.findById(req.params.id,(err,nc)=>{
		if(err)
			res.render("./student/studentstatus",{newComplain:nc,status:s});
		else{
			s=1;
			res.render("./student/studentstatus",{newComplain:nc,status:s});
		}
	})
	
})

module.exports = router;