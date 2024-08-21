// models/User.js
const mongoose = require('mongoose');

const serviceSSODetailsSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        required: true,
        unique: true,
    },
    servicePublicId: {
        type: String,
        required: true,
        unique: true,
    },
    serviceImageURL: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('ServiceSSODetail', serviceSSODetailsSchema);
