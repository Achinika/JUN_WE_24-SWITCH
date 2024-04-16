import mongoose from "mongoose";

const RideSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        role: {
            type: String,
            enum: ['passenger', 'driver'], // Specify the role (passenger or driver)
            required: true
        },
        pickupLocation: {
            type: String,
            required: true
        },
        dropLocation: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        },
        estimate: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const RideModel = mongoose.model('ride', RideSchema);

export default RideModel;