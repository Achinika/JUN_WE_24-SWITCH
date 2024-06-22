const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const support = new Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    issueDetail: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    todayDate: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const supportSchema = mongoose.model('support', support);
module.exports = supportSchema;