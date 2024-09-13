const User = require('../model/userModel');
const bcrypt = require("bcrypt");
const TokenGenerator = require("../utils/generateToken"); // Import the singleton instance

// Register User
module.exports.registerUser = async (req, res) => {
  try 
  {
    const { email, password, fullName } = req.body;

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Full Name:', fullName);

    // Check if the user already exists
    let user = await User.findOne({ email: email });
    if (user) {
      console.log("User exists");
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

    // Generate token using Singleton instance
    const token = TokenGenerator.generateToken(user);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    console.log("User created successfully");
    res.status(201).send("User created successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Login User
module.exports.loginUser = async (req, res) =>
{
  const { email, password } = req.body;

  try 
  {
    // Check if the user exists
    let user = await User.findOne({ email: email });
    if (!user) 
    {
      console.log("User does not exist");
      return res.status(400).send("User does not exist");
    }

    // Compare password with hashed password
    bcrypt.compare(password, user.password, (err, result) => 
    {
      console.log(result);
      if (result)
       {
        // Generate token using Singleton instance
        const token = TokenGenerator.generateToken(user);

        // Set the token in a cookie
        res.cookie("token", token, { httpOnly: true });

        console.log("Login successful");
        res.status(200).send("Login successful");
      }
       else 
      
      {
        console.log("Invalid password");
        res.status(400).send("Invalid password");
      }
    });
  } catch (err) 
  {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
