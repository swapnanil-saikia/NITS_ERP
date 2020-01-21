var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local');
var router = express.Router();

var Admin = require('../../model/admin');


//PASSPORT CONFIGURATION===========
router.use(require('express-session')({
  secret: "Mogambo!",
  resave: false,
  saveUninitialized: false
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

router.use(function(req,res,next){
  res.locals.currentUser = req.user;
  next();  
});

//AUTH ROUTES============
router.get("/",(req,res)=>{
	res.render("./admin/adminindex");
})


//login
router.get("/login",(req,res)=>{
	res.render("./admin/adminlogin");
})
router.post("/login", passport.authenticate("local",
	{
		successRedirect: "/admin/acc",
		failureRedirect: "/admin/login"
	}),(req,res)=>{

})


//register
router.get("/register",(req,res)=>{
	res.render("admin/adminregister");
})

router.post("/register",(req,res)=>{
	var newAdmin = new Admin({
		username : req.body.username,
		});

	  Admin.register(newAdmin,req.body.password,function(err,user){
	    if(err){
	      console.log(err);
	      res.render("admin/register");
	    }else{
	      passport.authenticate("local")(req,res,function(){
	        res.redirect("/admin/acc");
	      })
	    }
	})
})


//logout
router.get("/logout",function(req,res){
  req.logout();
  res.redirect("/admin")
})



//middleware for login
function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/admin/login");
}
module.exports = router;
