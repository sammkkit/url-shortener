const USER = require("../models/user")
const URL = require("../models/url")
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
    return res.render("home",{
        urls: allUrls
    });
}

module.exports = {
    handleSignUp
}