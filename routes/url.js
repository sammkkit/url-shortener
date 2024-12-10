const express = require("express");
const router = express.Router();
const {handleGenerateNewshortUrl,handleRedirect,handleGetAnalytics} = require("../controller/url")

router.post("/",handleGenerateNewshortUrl);
router.get("/:shortId",handleRedirect)
router.get("/analytics/:shortID",handleGetAnalytics)
module.exports = router