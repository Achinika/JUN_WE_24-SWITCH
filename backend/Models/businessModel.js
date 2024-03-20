import mongoose from "mongoose";

const businessSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        businessName:{
            type: String,
            required: true
        },
        location:{
            type:String,
            required: true,
        },
        industry:{
            type:String,
            required: true,
        },
        website:{
            type:String,
        },

        profilepicture: String,
        coverpicture: String,
        followers: [],
        following: []

    },{timestamps: true}
);




const businessModel = mongoose.model('business', businessSchema);

export default businessModel;