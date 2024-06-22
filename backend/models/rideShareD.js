const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rideShareDSchema = new Schema({
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

const RideShareD = mongoose.model('RideShareD', rideShareDSchema);
module.exports = RideShareD;
