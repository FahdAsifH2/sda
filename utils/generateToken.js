const jwt = require('jsonwebtoken');


const generateToken = (user) => 
{
    console.log(process.env.JWT_SECRET)

    return jwt.sign(
        { email: user.email, id: user._id },  // Use 'user' instead of 'User'
        process.env.JWT_SECRET // Make sure this environment variable is set
       
    );
};

module.exports = { generateToken }; // Simplified export syntax
