const express = require("express");
const router = express.Router();
const URL = require("../models/url")

router.get("/",async (req,res)=>{
    const allUrls = await URL.find({});
    // console.log(allUrls);
    return res.render("home",{
        urls:allUrls,
    });
})

router.get("/signup",(req,res)=>{
    return res.render("signUp")
})

module.exports = router