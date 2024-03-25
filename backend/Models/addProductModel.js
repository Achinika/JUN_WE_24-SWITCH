import mongoose from "mongoose";

const addProductSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users', // Reference to the UserModel
            required: true
        },
        title:String,
        catagory:String,
        descr:String,
        image:String,
        likes: []

    },{timestamps: true}
);




const addProductModel = mongoose.model('addProduct', addProductSchema);

export default addProductModel;