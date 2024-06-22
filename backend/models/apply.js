const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const applySchema = new Schema({
    jobId: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    appliedAt: {
        type: Date,
        default: Date.now
    }
});

const Apply = mongoose.model('Apply', applySchema);
module.exports = Apply;
