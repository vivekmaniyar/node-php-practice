const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    class: {
        type: String,
        required: true
    },
    semester: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Student', StudentSchema);