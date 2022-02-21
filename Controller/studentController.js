const Student = require("./../Models/StudentSchema")
const bcrypt = require('bcrypt');
const { body } = require("express-validator");
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';



exports.getStudents = (request, response, next) => {

    if (request.role == "admin") {
        Student.find({})
            .then(data => {
                response.status(200).json(data);
            })
            .catch(error => {
                next(error);
            })
    }
}


const salt = bcrypt.genSaltSync(10);

exports.setStudents = async(request, response, next) => {

    let student = new Student({
        _id: request.body.id,
        fullName: request.body.fullName,
        password: bcrypt.hashSync(request.body.password, salt),
        email: request.body.mail
    })
    student.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
        })
        .catch(error => next(error));
}

exports.updateStudents = (request, response, next) => {
    if (request.role == "admin") {
        Student.findByIdAndUpdate(request.body.id, {
                $set: {
                    fullname: request.body.fullName,
                    password: request.body.password,
                    email: request.body.mail
                }
            })
            .then(data => {
                if (data == null) throw new Error("Student Is not Found!")
                response.status(200).json({ message: "updated", data })

            })
            .catch(error => next(error))
    }

}

exports.deleteStudents = (request, response, next) => {
    if (request.role == "admin") {
        Student.findByIdAndDelete(request.body.id)
            .then(data => {
                if (data == null) throw new Error("Student Is not Found!")
                response.status(200).json({ message: "deleted" })
            })
            .catch(error => next(error))
    }

}