const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


// 1 - build schema with validation 
const schema = new mongoose.Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId },
    fullName: String,
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    },
    password: String,
    role: String,
    address: Object,
    image: String,
})



// 2 - register for schema in mongoose

module.exports = mongoose.model("speakers", schema);