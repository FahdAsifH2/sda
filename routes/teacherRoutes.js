const express = require('express');
const router = express.Router();
const Test = require('../model/testModel'); // Make sure this points to the correct model
const auth = require("../middlewares/isLoggedin"); // Import your authentication middleware

// Route to render the teacher dashboard
router.get('/home', (req, res) => 
{
    res.render('teacher/home'); // Render the home.ejs (dashboard)
});

// Route to render the question form
router.get('/questionForm', auth.authenticate, (req, res) => 
{
    res.render('teacher/questionForm');
});

// Route to handle question form submission
// Route to handle question form submission


  router.get("/editProfilePage",auth.authenticate,async (req,res)=>
  {
    const tests = await Test.find({})
    res.render("editProfile")
  })

// Route to handle question form submission
router.post('/submit-question',auth.authenticate, async (req,res) => 
{
     
    try 
    {
        const {testName, question, optionA, optionB, optionC, optionD, correctOption } = req.body;

        console.log(req.body)

        const newQuestion = new Test({
            testName:testName,
            question: question,
            options: [
                { option: 'A', text: optionA },
                { option: 'B', text: optionB },
                { option: 'C', text: optionC },
                { option: 'D', text: optionD }
            ],
            testName:testName,
            correctOption: correctOption,
            teacherId: req.user._id // Temporarily set to null (no authentication for now)
        });

        // Save the new question to the database
        await newQuestion.save();

        // Redirect to confirmation page with question ID
        res.redirect(`/teacher/confirmation?questionId=${newQuestion._id}`);
    } 
    catch (error)
    {
        console.error('Error submitting question:', error);
        res.status(500).send('Error submitting question');
    }
});



// Route for confirmation page
router.get('/confirmation', async (req, res) => 
{
    try 
    {
        const questionId = req.query.questionId;
        const test = await Test.findById(questionId);

        res.render('teacher/confirmation', { test });
    }
     catch (error) 
    {
        console.error('Error loading confirmation page:', error);
        res.status(500).send('Error loading confirmation page');
    }
});


router.get('/previewQuestions',auth.authenticate, async (req, res) => 
{
    
    try 
    {
        const teacherId = req.user._id;
        // Fetch all test documents from the database
        const tests = await Test.find({}); // You can filter by teacherId if necessary
        console.log("Fetched Tests:", tests); 
        // Render the previewQuestions.ejs with the collected questions
        res.render('teacher/previewQuestions', { questions: tests });
    }
     catch (error)
    {
        console.error('Error loading preview questions:', error);
        res.status(500).send('Error loading preview questions');
    }
});



module.exports = router;
