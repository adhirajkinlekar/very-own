const mongoose = require('mongoose');

const SubdomainSchema = new mongoose.Schema({
    subdomainName: { // add a unique check
        type: String,
        required: true,
    },
    applicationType: {
        type: String,
        required: true, 
    }, 
    // headline :{
    //     type: String,
    //     required: true,
    // }
});

const Academy = mongoose.model('Subdomain', SubdomainSchema);

module.exports = Academy;
