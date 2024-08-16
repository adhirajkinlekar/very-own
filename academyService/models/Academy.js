const mongoose = require('mongoose');

const academySchema = new mongoose.Schema({
    academyName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
    }
});

const Academy = mongoose.model('Academy', academySchema);

module.exports = Academy;
