import UserModel from "../Models/userModel.js";
import bcrypt  from 'bcrypt';

//Registering every New User
export const registerUser = async(req,res) =>{
    const {userName, password, confirmPassword, email} = req.body;

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
   
try{
    //encrypt user password
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt);
    
    const newUser = new UserModel({
        userName, 
        password: hashedPass,
        email,
        accountType: 'regular' // Set a default value for accountType
    });

    
   await newUser.save(); // Save the new user to the database
    
   res.status(200).json(newUser) // Send response with the new user data

}  catch (error) {
        res.status(500).json ({message:error.message}) ;// Handle error if any
    }

};

//login all users
export const loginUser = async (req, res)=>{
    const {email, password}= req.body
    try {
        const user = await UserModel.findOne({email:email})
        console.log("User found:", user); // Debug log

        
        if(user) //if user exist
        {
            const isValid = await bcrypt.compare(password, user.password) //check password validity
            console.log("Password valid:", isValid); // Debug log
            
            if (isValid) {
                return res.status(200).json(user);
            } else {
                return res.status(400).json("Wrong Password");
            }
        }
        else{
            res.status(404).json("User does not exist")
        }
    } catch (error) {
        console.error("Error:", error); // Debug log
        return  res.status(500).json ({message:error.message}) ;// Handle error if any
    }
}