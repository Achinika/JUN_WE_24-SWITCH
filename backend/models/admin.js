const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const admin = new Schema({

    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    indus: {
        type: String,
        default: "IT"
    },
    location: {
        type: String,
        default: "Colombo"
    },
}, {
    timestamps: true
});
const adminSchema = mongoose.model('admin', admin);
module.exports = adminSchema;