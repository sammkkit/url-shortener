const express = require("express");
const path = require("path")
const app = express();
const PORT = 8001;
const URL = require("./models/url")
const {connectMongoDB} = require("./connection")
const cookieParser = require("cookie-parser");
const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
const userRouter = require("./routes/user")
const {restrictToLoggedInUserOnly,checkAuth} = require("./middlewares/auth")

//connect mongo db
connectMongoDB("mongodb://127.0.0.1:27017/Url-shortner").then(() => {
    console.log("connected to monogo DB")
})

//ejs
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
//routes
app.use("/user",userRouter)
app.use("/url",restrictToLoggedInUserOnly,urlRouter);
app.use("/",checkAuth,staticRouter);

//app start
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
