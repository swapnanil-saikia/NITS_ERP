var express = require('express');
var router = express.Router();

var complainStudent = require('../../model/complain-student');
var complainFaculty = require('../../model/complain-faculty');
var Employee = require('../../model/employee');


//ROUTES===============

//student
router.get("/",isLoggedIn,(req,res)=>{
	complainStudent.find({}).populate("employee").exec((err,all)=>{
		if(err){
			console.log(err);
		}else{
			Employee.find({},(err,emp)=>{
				res.render("./admin/adminstudent",{complain:all,employee:emp});
			})		
		}
	})
})

router.post("/:id",isLoggedIn,(req,res)=>{
	complainStudent.findById(req.params.id,(err,complain)=>{
		if(err) console.log(err);
		else{
			Employee.findById(req.body.employee,(err,emp)=>{
				if(err) console.log(err);
				else{
					emp.complainStudent.push(complain);
					emp.save((err,e)=>{
						complain.employee=e;
						complain.save();
						console.log(e);
					});							

					res.redirect("/admin/student/x");
				}
			})
		}		
	})
})

router.get("/x",isLoggedIn,(req,res)=>{
	res.redirect("/admin/student");
})


//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/admin/login");
}
module.exports = router;
