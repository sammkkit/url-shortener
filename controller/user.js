const USER = require("../models/user")
const URL = require("../models/url")
const {v4:uuidv4} = require("uuid");
const {getUser,setUser} = require("../service/auth")
async function handleSignUp(req,res){
    const {name ,email , password} = req.body;
    try{
        await USER.create({
            name,email,password
        });

    }catch(error){
        return res.json({message: `error in signup ${error}`})
    }
    const allUrls = await URL.find({});
    return res.redirect("/")
}
async function handleLogin(req,res){
    const {email,password} = req.body;
    const user = await USER.findOne({email,password});
    if(!user){
        return res.render("login",{
            error:"Invalid username or password"
        })
    }
    const sessionID = uuidv4();
    setUser(sessionID,user);
    res.cookie("uid",sessionID)
    return res.redirect("/")
}

module.exports = {
    handleSignUp,
    handleLogin
}