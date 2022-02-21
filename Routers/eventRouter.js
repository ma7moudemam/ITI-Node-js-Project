const express = require("express");
const router = express.Router();

const controller = require("./../Controller/eventsController");


router.get("/events", controller.getEvent)
    .post("/events", controller.setEvent)
    .put("/events", controller.updateEvent)
    .delete("/events", controller.deleteEvent)

module.exports = router;