const express = require("express");
const router = express.Router();
const controller = require("./../Controller/studentController");
isAuth = require("./../Middleware/authMW");
// router.route("/students")
router.get("/students", isAuth, controller.getStudents)
    .post("/students", controller.setStudents)
    .put("/students", isAuth, controller.updateStudents)
    .delete("/students", isAuth, controller.deleteStudents)

module.exports = router;