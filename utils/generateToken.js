const jwt = require('jsonwebtoken');

class TokenGenerator
{
  constructor()
  {
    if(!TokenGenerator.instance)
    {
        TokenGenerator.instance = this
    }

    return TokenGenerator.instance
  }

  generateToken(user)
  {
   return jwt.sign (
    
      {email:user.email,id :user._id},
      process.env.JWT_SECRET
    
   );
  }
}


const instance = new TokenGenerator()
module.exports= instance