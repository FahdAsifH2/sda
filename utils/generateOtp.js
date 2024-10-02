const crypto = require("crypto");

const generateVerificationToken = () => 
{
  return crypto.randomInt(1000, 9999); // Generates a 4-digit OTP
};

const expiry = (time) => 
{
  return new Date(Date.now() + time * 1000);
};

module.exports = 
{
  generateVerificationToken,
  expiry,
};
