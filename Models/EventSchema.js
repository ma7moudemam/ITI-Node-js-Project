const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// 1 - build schema with validation 
const schema = new mongoose.Schema({
    _id: Number,
    title: String,
    date: Date,
    mainSpeaker: { type: mongoose.Schema.Types.ObjectId, ref: "speakers" },
    students: [{ type: Number, ref: "students" }],
    speakers: [{ type: mongoose.Schema.Types.ObjectId, ref: "speakers" }],
}, { _id: false })

schema.plugin(AutoIncrement, { id: "eventAutoIncrement2", inc_field: "_id" });

// 2 - register for schema in mongoose

module.exports = mongoose.model("events", schema);