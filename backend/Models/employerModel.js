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
        },
        contactNumber: {
            type: String,
            required: true
        },
        birthDay: {
            type: Date,
            required: true
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