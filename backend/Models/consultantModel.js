import mongoose from "mongoose";

const consultantSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        name: {
            type: String,
            required: true
        },
        specialization: {
            type: String,
            required: true
        },
        experience: {
            type: Number,
            required: true
        },

        phone: {
            type: String,
            required: true,
            unique: true, // Ensure phone number is unique
            validate: {
                validator: function (v) {
                    return /\d{10}/.test(v); // Validate phone number format (10 digits)
                },
                message: props => `${props.value} is not a valid phone number!`
            }
        },

        
    },
    { timestamps: true }
);

const consultantModel = mongoose.model('consultants', consultantSchema);

export default consultantModel;

