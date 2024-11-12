const express = require("express");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("admin/home");
});


router.get("/studentInfo",(req,res)=>
{
   res.render("studentInfo")
})
module.exports = router;
