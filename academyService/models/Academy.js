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
    headline :{
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: null,
    },
    publicId: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

const Academy = mongoose.model('Academy', academySchema);

module.exports = Academy;
