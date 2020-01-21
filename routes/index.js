var express = require('express');
var router = express.Router();

var studentRoutes = require('./Student/student')
var facultyRoutes = require('./Faculty/faculty')
var employeeRoutes = require('./Employee/employee')
var adminRoutes = require('./Admin/admin')

router.get("/",(req,res)=>{
	res.render("index");
})


router.use("/student",studentRoutes);
router.use("/faculty",facultyRoutes);
router.use("/employee",employeeRoutes);
router.use("/admin",adminRoutes);


module.exports = router;