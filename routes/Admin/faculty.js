var express = require('express');
var router = express.Router();

var complainStudent = require('../../model/complain-student');
var complainFaculty = require('../../model/complain-faculty');
var Employee = require('../../model/employee');


//ROUTES================
//faculty
router.get("/",isLoggedIn,(req,res)=>{
	complainFaculty.find({}).populate("employee").exec((err,all)=>{
		if(err){
			console.log(err);
		}else{
			Employee.find({},(err,emp)=>{
				res.render("./admin/adminfaculty",{complain:all,employee:emp});
			})		
		}
	})
})

router.post("/:id",isLoggedIn,(req,res)=>{
	complainFaculty.findById(req.params.id,(err,complain)=>{
		if(err) console.log(err);
		else{
			Employee.findById(req.body.employee,(err,emp)=>{
				if(err) console.log(err);
				else{
					emp.complainFaculty.push(complain);
					emp.save((err,e)=>{
						complain.employee=e;
						complain.save();
						console.log(e);
					});							

					res.redirect("/admin/faculty/x");
				}
			})
		}		
	})
})

router.get("/x",isLoggedIn,(req,res)=>{
	res.redirect("/admin/faculty");
})


//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/admin/login");
}
module.exports = router;
