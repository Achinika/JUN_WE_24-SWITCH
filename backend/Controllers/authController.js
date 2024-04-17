import UserModel from "../Models/userModel.js";
import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';

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
        accountType: 'regular' //set default value for account type
    });

    
   await newUser.save(); // Save the new user to the database
    
   res.status(200).json(newUser) // Send response with the new user data

}  catch (error) {
        res.status(500).json ({message:error.message}) ;// Handle error if any
    }

};

//login all users
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password validity
        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({ message: "Incorrect password" });
        }

        // Generate JWT token with expiration time (1 hour)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return response with token and user data
        res.status(200).json({ token, user });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: error.message });
    }
};

// Middleware to verify token expiration
export const verifyTokenExpiration = (req, res, next) => {
    const token = req.headers.authorization; // Assuming token is sent in the Authorization header

    if (!token) {
        return res.status(401).json({ message: "Token not provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: "Token expired, please login again" });
            } else {
                return res.status(401).json({ message: "Invalid token" });
            }
        }

        req.userId = decoded.userId;
        next(); // Proceed to next middleware or route handler
    });
};