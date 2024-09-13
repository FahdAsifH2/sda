const jwt = require('jsonwebtoken');



// singleton design impl
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
   return jwt.sign ( {email:user.email,id :user._id},process.env.JWT_SECRET,{expiresIn: "10s"} );
  }
}


const instance = new TokenGenerator()
module.exports= instance