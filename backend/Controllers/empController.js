import EmployerModel from "../Models/employerModel.js";
import UserModel from "../Models/userModel.js";


// Update user account to become an employer
export const updateToEmployer = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract employer details from request body
        const { firstName, lastName, location, workingCompany, linkURL, contactNumber, birthDay, description } = req.body;

        // Create a new EmployerModel document associated with the user's ID
        const newEmployer = new EmployerModel({
            user: userId,
            firstName,
            lastName,
            location,
            workingCompany,
            linkURL,
            contactNumber,
            birthDay,
            description
        });

        // Save the new employer details
        const savedEmployer = await newEmployer.save();

        res.status(200).json(savedEmployer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};