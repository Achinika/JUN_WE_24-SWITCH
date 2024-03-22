import mongoose from "mongoose";

const EnrollSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        studentName: {
            type: String,
            required: true
        },
        birthDate: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
        },
        province: {
            type: String,
            required: true
        },
        postalcode: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        mobileNumberl: {
            type: String,
            required: true
        },
        courses: {
            type: String,
            required: true
        },
        additionalcomment: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const UserEnrollModel = mongoose.model('enrollUsers', EnrollSchema);

export default UserEnrollModel;