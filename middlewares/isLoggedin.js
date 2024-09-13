const jwt = require("jsonwebtoken")
const User = require("../model/userModel")


class IsloggedIn
{
  constructor()
  {
    this.secret = process.env.JWT_SECRET;
  }
  
  handle(req,res,next)
  {
    if(!req.cookies.token)
    {
      req.flash("Error,You need to login first")
       
      return res.redirect("/")
    }

    try
    {
      const decoded = jwt.verify(req.cokkies.token,process.env.JWT)
      req.user.decoded
      next()
    }
    catch(err)
    {
      req.flash("Error,Invlaid or expired token")
      return res.redirect("/")
    }
  }

}


const isLoggedInInstance = new IsloggedIn();
module.exports = isLoggedInInstance



// //kia jo banda login access krnay ki koshshs kr raha ha uskay pas token nahi ha
// module.exports = async (req,res,next)=>
// {
//     if(!req.cookies.token)
//     {
//         req.flash("Errro, you need to login first")
//         return res.redirect("/")
//     }
// }

// //agr token ha tou

// try
// {
//   //token say vlaue nikalo
//   let decoded = jwt.verify(req.cokies.token,process.env.JWT)
// }

// catch(err)
// {
    

// }