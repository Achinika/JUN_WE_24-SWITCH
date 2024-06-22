const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const link = new Schema({
    unique: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});
const linkSchema = mongoose.model('link', link);
module.exports = linkSchema;