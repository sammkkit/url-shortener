
const shortid = require('shortid');
const URL = require("../models/url")
async function handleGenerateNewshortUrl(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ message: "url is required" })
    const shortId = shortid();
    await URL.create({
        shortID: shortId,
        redirectURL: body.url,
        visitHistory: []
    })
    const allUrls = await URL.find({});
    return res.render("home",{
        id: shortId,
        urls : allUrls
    })
}
async function handleRedirect(req, res) {
    try {
        const shortID = req.params.shortId;
        console.log(shortID)
        const entry = await URL.findOneAndUpdate({ shortID },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            },
            { new: true }
        );
        console.log("Updated entry:", entry); // Log the updated entry to see if it's correct

        if (!entry) {
            console.log(`No entry found for shortID: ${shortID}`);
            return res.status(404).json({ message: "Short URL not found" });
        }
        console.log("Updated entry 2:", entry); // Log the updated entry
        console.log(`Redirecting to: ${entry.redirectURL}`)
        res.redirect(entry.redirectURL)
    } catch (error) {
        console.error("Error in handleRedirect:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
async function handleGetAnalytics(req,res){
    const shortID = req.params.shortID;
    const result = await URL.findOne({shortID});
    return res.json({
        totalClicks : `${result.visitHistory.length}`,
        analytics : result.visitHistory
    })
}
module.exports = {
    handleGenerateNewshortUrl,
    handleRedirect,
    handleGetAnalytics
}