import consultantModel from "../Models/consultantModel.js";
import UserModel from "../Models/userModel.js";


// Update user account to become an consultant
export const updateToconsultant = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract employer details from request body
        const { name,specialization,experience,phone } = req.body;

        // Create a new consultantModel document associated with the user's ID
        const newconsultant = new consultantModel({
            user: userId,
            name,
            specialization,
            experience,
            phone
        });

        // Save the new consultant details
        const savedconsultant = await newconsultant.save();

        res.status(200).json(savedconsultant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get a consultant
export const getconsultant = async (req,res) =>{
    const userId = req.params.userId;

    try {
        const consultant = await consultantModel.findById(userId);

        if(consultant)
        {
            res.status(200).json(consultant);
        }

    } catch (error) {
        res.status(500).json(error)
    }
};