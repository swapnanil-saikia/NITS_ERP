var express = require('express');


var router = express.Router();
var Employee = require('../../model/employee');


//ROUTES====================================
//AUTH ROUTES====================
var authRoutes = require('./Auth')
router.use(authRoutes)

//account
router.get("/acc",isLoggedIn,(req,res)=>{
	Employee.findById(req.user._id).populate("complainFaculty").populate("complainStudent").exec((err,all)=>{
				if(err) console.log(err);
				else 
				res.render("employee/acc",{currentuser:all});
			})
})


//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/employee/login");
}

module.exports = router;