const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    academyId: {
        type: String,
        required: true,
    },
    courseName: {
        type: String,
        required: true,
    },
    headline: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    sections: [{
        title: {
            type: String,
            required: true,
        },
        lectures: [{
            title: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            }
        }]
    }]
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
