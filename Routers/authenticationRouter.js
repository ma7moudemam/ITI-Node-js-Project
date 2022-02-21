const express = require("express");
const { body, query, param } = require("express-validator");
const router = express.Router();
const controller = require("./../Controller/authenticationController");



router.post("/login", [
    body("name").isAlpha().withMessage("Name is Wrong"),
    body("password").isAlphanumeric().withMessage("Password is Wrong"),
    body("role").isString().custom(value => {
        return (value == "student" || value == "speaker")
    }).withMessage("wrong Role"),
], controller.login)

router.post("/register", [
    // body("id").isInt().withMessage("id Should be integer"),
    body("isSpeaker").isBoolean(),
    body("fullName").isAlpha().withMessage("Name must be String"),
    body("password").isAlphanumeric().withMessage("Password must be"),
    body("mail").isEmail().withMessage("Wrong mail"),
    body("role").isString().custom(value => {
        return (value == "student" || value == "speaker")
    }).withMessage("wrong Role"),
    body("address").isObject().withMessage("Enter address"),
    body("address.city").isString().withMessage("Enter City"),
    body("address.street").isAlphanumeric().withMessage("Enter street"),
    body("address.building").isNumeric().withMessage("Enter building"),

], controller.checkUser)

module.exports = router;