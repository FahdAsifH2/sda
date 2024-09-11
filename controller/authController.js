const User = require('../model/userModel');
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

module.exports.registerUser = async (req, res) => {
  try {
    // Extract values from the request body
    const { email, password, fullName } = req.body;

    // Log the values to the console for debugging
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullName);

    // Check if the user already exists
    let user = await User.findOne({ email: email });
    if (user) {
        console.log("user exsist")
      return res.status(400).send("User already exists");
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password
    user = await User.create({
      email,
      password: hashedPassword, // Use the hashed password
      fullName,
    });

    // Generate a token for the user
    const token = generateToken(user);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    console.log("User created successfully");
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};


module.exports.loginUser = async(req,res)=>
{
    let {email,password} = req.body
    let user = await User.findOne({email:email})

    if(!user)
    {
        return res.send("User does not exsist")
        console.log("pass or email is invlaif")
    }

     bcrypt.compare(password,user.password,(err,result)=>
     {
       console.log(result)
        if(result)
        {
            token = generateToken(user)
            res.cookie(token)
        }
     })
}
