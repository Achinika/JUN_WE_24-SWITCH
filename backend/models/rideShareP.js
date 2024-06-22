const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideSharePSchema = new Schema({
    rid: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    startPoint: {
        type: String,
        required: true
    },
    endPoint: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    passengerCount: {
        type: Number,
        required: true,       
    }
});

const RideShareP = mongoose.model('RideShareP', rideSharePSchema);
module.exports = RideShareP;
