const express = require('express');
const router = express.Router();
const User = require('../model/userModel');
const bcrypt = require("bcrypt")



// Define specific routes for each page
router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/register', (req,res) => {
    res.render('register');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

router.get('/elements', (req, res) => {
    res.render('elements');
});

router.get('/gallery', (req, res) => {
    res.render('gallery');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/news', (req, res) => {
    res.render('news');
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/staff', (req, res) => {
    res.render('staff');
});

router.post("/register", (req,res)=>
{
    try{
        let {email,password,fullName}= req.body
        bcrypt.genSalt(10,(err,salt)=>
        {
            bcrypt.hash(password,salt,async(err,hash)=>{
                if(err)
                {
                    res.send(err.message)
                    
                }
                else
                {
                    await User.create( {
                        email,
                        password,
                        fullName
                    })
                }
            })
        })
        // Log the values to the console
      console.log('Email:', email);
      console.log('Password:', password);
      console.log('Full Name:', fullName);

       //making sure nothing remains empty
        // if(!fullName||!email||!password)
        // {
        //     return res.status(404).send("All fields are required")
        // }
      
    }
   catch(err)
   {
    console.log(err.message)
   }
   
})



module.exports = router; // Export the router to be used in other files
