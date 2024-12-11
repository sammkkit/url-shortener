const {setUser,getUser} = require("../service/auth")
async function restrictToLoggedInUserOnly(req,res,next){
    const userUuid = req.cookies?.uid;
    console.log(`step 1- ${userUuid}`)
    if(!userUuid){
        return res.redirect("/login")
    }
    const user = getUser(userUuid);
    // console.log(`step 2- ${user}`)
    if(!user){
        return res.redirect("/login");
    }
    req.user = user;
    next();
}
async function checkAuth(req,res,next){
    const userUuid = req.cookies?.uid;
    const user = getUser(userUuid);
    req.user = user;
    next();
}
module.exports = {
    restrictToLoggedInUserOnly
    ,checkAuth
}