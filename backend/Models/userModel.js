import mongoose from "mongoose"

const UserSchema = mongoose.Schema(
    {
        userName:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required: true,
            minlength: 6,
        },
        confirmPassword:{
            type:String,
        },
        email:{
            type:String,
            required: true,
            unique: true, // Ensure email is unique
            lowercase: true, // Convert email to lowercase before saving
            match: [ // Use a regex pattern to validate email format
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"]
        },
        accountType:{
            type: String,
            enum: ['regular','general', 'employer', 'consultant', 'business'],
            required: true
        }

    },{timestamps: true}
);




const UserModel = mongoose.model('Users', UserSchema);

export default UserModel;