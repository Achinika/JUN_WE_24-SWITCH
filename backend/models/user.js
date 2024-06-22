const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});
const userSchema = mongoose.model('user', user);
module.exports = userSchema;