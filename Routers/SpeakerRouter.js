const express = require("express");
const router = express.Router();
const controller = require("./../Controller/speakerController");
isAuth = require("./../Middleware/authMW");

router.get("/speakers", isAuth, controller.getSpeaker)
    .post("/speakers", controller.setSpeaker)
    .put("/speakers", isAuth, controller.updateSpeaker)
    .delete("/speakers", isAuth, controller.deleteSpeaker)

module.exports = router;