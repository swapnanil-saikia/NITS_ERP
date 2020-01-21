var express = require('express');
var router = express.Router();

var complainStudent = require('../../model/complain-student');
var complainFaculty = require('../../model/complain-faculty');
var Employee = require('../../model/employee');
var Admin = require('../../model/admin');


//AUTH ROUTES============
var authRoutes = require('./Auth')
router.use(authRoutes);

//ROUTES================
router.get("/acc",(req,res)=>{
	res.render("./admin/acc");
})

//student
var studentRoutes = require('./student');
router.use("/student",studentRoutes)

//faculty
var facultyRoutes = require('./faculty');
router.use("/faculty",facultyRoutes)


//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/admin/login");
}
module.exports = router;
