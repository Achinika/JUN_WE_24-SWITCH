const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const businessPostSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
});

const BusinessPost = mongoose.model('BusinessPost', businessPostSchema);

module.exports = BusinessPost;
