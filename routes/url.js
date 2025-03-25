const express=require("express");
const {
    handleGenerateNewUrl,
    handleShortLink,
    handleGetAnalytics
}=require("../controllers/url");

const router=express.Router();

router.post("/",handleGenerateNewUrl);
router.get("/:shortId",handleShortLink);
router.get("/analytics/:shortId",handleGetAnalytics);

module.exports=router;