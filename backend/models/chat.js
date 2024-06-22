const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chat = new Schema({

    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const chatSchema = mongoose.model('chat', chat);
module.exports = chatSchema;