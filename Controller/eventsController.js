const Event = require('./../Models/EventSchema');

exports.getEvent = (request, response, next) => {
    Event.find({})
        .populate({ path: "speakers" })
        .populate({ path: "students" })
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => {
            next(error);
        })
}

exports.setEvent = (request, response, next) => {
    let event = new Event({
        _id: request.body.id,
        title: request.body.title,
        date: request.body.date,
        mainSpeaker: request.body.mainSpeaker,
        students: request.body.students,
        speakers: request.body.speakers,
    })
    event.save()
        .then(data => {
            response.status(201).json({ message: "added", data })
        })
        .catch(error => next(error));
}

exports.updateEvent = (request, response, next) => {
    Event.findByIdAndUpdate(request.body.id, {
            $set: {
                title: request.body.title,
                date: request.body.date,
                mainSpeaker: request.body.mainSpeaker,
                students: request.body.students,
                speakers: request.body.speakers,
            }
        })
        .then(data => {
            if (data == null) throw new Error("Event is not Find");
            response.status(200).json({ message: "Updated" }, data);
        })
        .catch(err => next(err))
}

exports.deleteEvent = (request, response, next) => {
    Event.findByIdAndDelete(request.body.id)
        .then(data => {
            if (data == null) throw new Error("Event is not Found");
            response.status(200).json({ message: "Deleted" })
        })
        .catch(err => next(err))
}