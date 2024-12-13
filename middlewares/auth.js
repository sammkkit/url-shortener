const {setUser,getUser} = require("../service/auth")

function checkForAuthentication(req,res,next){
    const tokenCookie = req.cookies?.token;
    req.user = null;
    if(!tokenCookie ){
        return next();
    }
    const token  = tokenCookie
    const user = getUser(token);
    req.user = user;
    return next()
}
function restrictTo(roles = []){
    return function(req,res,next){
        if(!req.user){
            console.log("first if error in restrictTo")
            res.redirect("/login");
        }
        if(!roles.includes(req.user.role)){
            console.log("second if error in restrictTo")
            res.send("unauthorized");
        }
        next();
    }
}
module.exports = {
    checkForAuthentication,
    restrictTo
}