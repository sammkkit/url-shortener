const express = require("express");
const path = require("path")
const app = express();
const PORT = 8001;
const URL = require("./models/url")
const {connectMongoDB} = require("./connection")

const urlRouter = require("./routes/url")
const staticRouter = require("./routes/staticRouter")
//connect mongo db
connectMongoDB("mongodb://127.0.0.1:27017/Url-shortner").then(() => {
    console.log("connected to monogo DB")
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use("/url",urlRouter);
app.use("/",staticRouter);
app.listen(PORT, () => {
    console.log(`server started at port ${PORT}`);
});
