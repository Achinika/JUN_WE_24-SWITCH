import BusinessModel from "../Models/businessModel.js";
import UserModel from "../Models/userModel.js";


// Update user account to become an employer
export const updateToBusiness = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract employer details from request body
        const { businessName, location, industry, website, profilepicture, coverpicture, followers, following} = req.body;

        // Create a new EmployerModel document associated with the user's ID
        const newEmployer = new BusinessModel({
            user: userId,
            businessName,
            location,
            industry,
            website,
            profilepicture,
            coverpicture,
            followers,
            following
        });

        // Save the new employer details
        const savedBusiness = await newBusiness.save();

        res.status(200).json(savedBusiness);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};