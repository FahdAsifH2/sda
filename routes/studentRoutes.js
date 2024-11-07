const express = require('express');
const router = express.Router();
const Test = require('../model/testModel');

router.get('/home', (req, res) => 
{
    console.log("Hello from MCQ")
 res.render('student/home'); // Render the home.ejs (dashboard)
});

router.get('/solveExam', async (req, res) => 
{
    
    const test = await Test.find({})
   // console.log(test)
    res.render('student/solveExam');
});
router.get('/mcq', async(req, res) => 
{
    try{
        const tests = await Test.find({})
        res.render('mcq',{tests});
    }
   
  catch(error)
  {
     res.send(500).render("error fecthing the data")
  }
   
});
router.get('/editProfile', (req, res) => 
{
    res.render('student/editProfile');
});

// Route for student registration
router.get('/register', (req, res) => 
{
    res.render('student/register'); // Ensure this points to the correct view
});

// Add more student-related routes here...

module.exports = router;
