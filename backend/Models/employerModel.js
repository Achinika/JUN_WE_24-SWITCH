import mongoose from "mongoose";

const EmpSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        workingCompany: {
            type: String,
            required: true
        },
        linkURL: {
            type: String,
            /*alidate: {
                validator: function (v) {
                    // Check if the URL is valid (basic validation)
                    return /^(ftp|http|https):\/\/[^ "]+$/.test(v);
                },
                message: props => `${props.value} is not a valid URL!`
            }*/
        },
        contactNumber: {
            type: String,
            required: true
        },
        birthDay: {
            type: Date,
            required: true,
            validate: {
                validator: function (v) {
                    // Check if the date is not in the future
                    return v <= new Date();
                },
                message: props => `${props.value} cannot be a future date!`
            }
        },
        description: {
            type: String,
            required: true
        },
        profilePic: String,
        coverPic:  String,
        
    },
    { timestamps: true }
);

const EmployerModel = mongoose.model('empUsers', EmpSchema);

export default EmployerModel;