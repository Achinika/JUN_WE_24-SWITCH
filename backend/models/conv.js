const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const conversationSchema = new Schema({
    umail: {
        type: String,
        required: true
    },
    conMail: {
        type: String,
        required: true
    }
});

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
