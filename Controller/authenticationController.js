const { validationResult } = require("express-validator");
const Student = require("./../Models/StudentSchema")
const jwt = require("jsonwebtoken")


// let isAdmin = () => {

//     // if (request.body.name !== admin && request.body.password !== pass) {
//     //     let error = new Error();
//     //     error.status = 500;
//     //     error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
//     //     throw error;
//     // }
// }

exports.login = (request, response) => {

    let errors = validationResult(request);
    let admin = "Emam";
    let pass = 12345;
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    if (request.body.name == admin && request.body.password == pass) {
        let token = jwt.sign({
                name: request.body.name,
                role: "admin",
            },
            "ITIMearnStackTeam", { expiresIn: "1h" }

        )
        response.status(200).json({ data: "Hello Admin", Body: token });
    }
    if (request.body.role == "student") {
        let token = jwt.sign({
                name: request.body.name,
                role: "student",
            },
            "ITIMearnStackTeam", { expiresIn: "1h" }
        )
        response.status(200).json({ data: "Hello Student", Body: token });
    }
    if (request.body.role == "speaker") {
        let token = jwt.sign({
                name: request.body.name,
                role: "student",
            },
            "ITIMearnStackTeam", { expiresIn: "1h" }
        )
        response.status(200).json({ data: "Hello Student", Body: token });
    }

    // response.status(201).json({ data: "login", BODY: request.body, token })
}


exports.checkUser = (request, response, next) => {


    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        let error = new Error();
        error.status = 422;
        error.message = errors.array().reduce((current, object) => current + object.msg + " ", "")
        throw error;
    }
    if (request.body.isSpeaker == true) {
        response.redirect(307, "speakers");
    }
    if (request.body.isSpeaker == false) {
        response.redirect(307, "students");
    }

}