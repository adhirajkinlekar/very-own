// models/User.js
const mongoose = require('mongoose');

const serviceEnrollmentSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
});

module.exports = mongoose.model('serviceEnrollment', serviceEnrollmentSchema);
