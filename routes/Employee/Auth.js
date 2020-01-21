var express = require('express'), 
	passport = require('passport'),
    LocalStrategy = require('passport-local');

var router = express.Router();
var Employee = require('../../model/employee');

//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "Mogambo!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(Employee.authenticate()));
passport.serializeUser(Employee.serializeUser());
passport.deserializeUser(Employee.deserializeUser());

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();  
});

//ROUTES====================================
router.get("/",(req,res)=>{
	res.render("./employee/index");
})


//AUTH ROUTES===================
//login
router.get("/login",(req,res)=>{
	res.render("./employee/login");
})
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/employee/acc",
		failureRedirect: "/employee/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("employee/register");
})

router.post("/register",(req,res)=>{
	var newEmployee = new Employee({
		username : req.body.username,
		name : req.body.name,
		empid : req.body.empid,
		email : req.body.email,
		mobileno : req.body.mobileno
		});

	  Employee.register(newEmployee,req.body.password,function(err,user){
	    if(err){
	      console.log(err);
	      res.render("employee/register");
	    }else{
	      passport.authenticate("local")(req,res,function(){
	        res.redirect("/employee/acc");
	      })
	    }
	})
})


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/employee")
})

//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/employee/login");
}

module.exports = router;