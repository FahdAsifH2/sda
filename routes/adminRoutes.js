const express = require("express");
const router = express.Router();
const studentModel = require("../model/studentModel")
const teacherModel= require("../model/teacherModel")
router.get("/home", (req, res) => {
  res.render("admin/home");
});


router.get("/studentInfo",async(req,res)=>
{
  

  
   const students = await studentModel.find()
 
   res.render("studentInfo",{students})
   

})

router.get("/teacher",async(req,res)=>
{
   const teachers = await teacherModel.find({})
   console.log(teachers)
   res.render("TeacherInfo",{teachers})
})
module.exports = router;
