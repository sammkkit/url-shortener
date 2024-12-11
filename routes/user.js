const express = require("express");
const {handleSignUp,handleLogin} = require("../controller/user")
const router = express.Router();

router.post("/",handleSignUp)
router.post("/login",handleLogin)


module.exports = router