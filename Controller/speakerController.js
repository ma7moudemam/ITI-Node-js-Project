const Speaker = require("./../Models/SpeakerSchema")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

exports.getSpeaker = (request, response, next) => {
    if (request.role == "admin") {
        Speaker.find({})
            .then(data => {
                response.status(200).json(data);
            })
            .catch(error => {
                next(error);
            })
    }

}

const salt = bcrypt.genSaltSync(10);
exports.setSpeaker = (request, response, next) => {


    console.log(({ body: request.body, file: request.file }));

    let speaker = new Speaker({
        // _id: request.body.id,
        fullName: request.body.fullName,
        password: bcrypt.hashSync(request.body.password, salt),
        email: request.body.mail,
        address: request.body.address,
        role: request.body.role,
        image: request.file.filename,

    })
    speaker.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
        })
        .catch(error => next(error));
}

exports.updateSpeaker = (request, response, next) => {
    if (request.role == "admin") {
        Speaker.findByIdAndUpdate(request.body.id, {
                $set: {
                    fullName: request.body.fullName,
                    password: request.body.password,
                    email: request.body.mail,
                    address: request.body.address,
                    role: request.body.role,
                    image: request.file.filename,
                }
            })
            .then(data => {
                if (data == null) throw new Error("Speaker Is not Found!")
                response.status(200).json({ message: "updated", data })

            })
            .catch(error => next(error))
    }

}

exports.deleteSpeaker = (request, response, next) => {
    if (request.role == "admin") {
        Speaker.findByIdAndDelete(request.body.id)
            .then(data => {
                if (data == null) throw new Error("Speaker Is not Found!")
                response.status(200).json({ message: "deleted" })
            })
            .catch(error => next(error))
    }

}