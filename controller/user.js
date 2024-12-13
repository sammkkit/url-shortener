const USER = require("../models/user")
const URL = require("../models/url")
const {v4:uuidv4} = require("uuid");
const {getUser,setUser} = require("../service/auth")
async function handleSignUp(req,res){
    const {name ,email , password} = req.body;
    try{
        const user = await USER.create({
            name,email,password
        });
        return res.redirect("/")
    }catch(error){
        return res.json({message: `error in signup ${error}`})
    } 
}
async function handleLogin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await USER.findOne({ email, password });
        console.log("step 1");
        console.log(user);
        if (!user) {
            return res.render("login", {
                error: "Invalid username or password",
            });
        }
        const token = setUser(user);
        console.log(`step - 2\n ${token}`);
        res.cookie("token", token,{ httpOnly: true });
        return res.redirect("/");
    } catch (error) {
        console.error("Error in handleLogin:", error);
        return res.status(500).json({
            message: "An unexpected error occurred. Please try again.",
        });
    }
}


module.exports = {
    handleSignUp,
    handleLogin
}