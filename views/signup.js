const mongoose = require('mongoose');
const express=require("express")
const app=express()
const jsonwt=require('jsonwebtoken')
const jwt=require('jsonwebtoken')
app.listen(3004)
app.use(express.json())
var jwtpass="123456"
// let s=process.env.JWTPASS || ""


mongoose.connect("mongodb+srv://sukhbirsinghsareen:3XMBqA40qEUCZzcC@cluster0.mfkvcb1.mongodb.net/examchamp")
  .then(() => {
    console.log('Successfully connected to MongoDB');
  })
  .catch(err => {
    console.error('Connection error', err);
  });

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
  });
  
  
  const User = mongoose.model('studentinfo', userSchema);

app.post("/signup",async function(req,res){
    username=req.body.username;
    password=req.body.password;
    name=req.body.name

    let user=new User({
        name:name,
        email:username,
        password:password,
    })

    let existinguser=await User.findOne({email:username})

    if(existinguser){
        res.status(400).json({
            msg:"User already exists"
    })}else{

        user.save()
      .then(() => {
        console.log("Data saved");
        res.json({
            msg:"data saved successfully"
        })
      })
      .catch(err => {
        console.error('Error saving data', err);
      });
    }
})
