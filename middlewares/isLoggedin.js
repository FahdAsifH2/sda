const jwt = require("jsonwebtoken")
const User = require("../model/userModel")


//kia jo banda login access krnay ki koshshs kr raha ha uskay pas token nahi ha
module.exports = async (req,res,next)=>
{
    if(!req.cookies.token)
    {
        req.flash("Errro, you need to login first")
        return res.redirect("/")
    }
}

//agr token ha tou

try
{
  //token say vlaue nikalo
  let decoded = jwt.verify(req.cokies.token,process.env.JWT)
}

catch(err)
{
    

}