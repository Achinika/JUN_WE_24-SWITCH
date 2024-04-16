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

//update a consultant Details
export const updateconsultantDetails = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Extract the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token to obtain user data, including the user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const loggedInUserId = decodedToken.userId;

        // Check if the user ID in the request matches the logged-in user ID
        if (userId !== loggedInUserId) {
            return res.status(403).json({ message: "You are not authorized to perform this action" });
        }

        // Retrieve the existing consultant document
        let consultant = await consultantModel.findOne({ user: userId });

        // Check if consultant exists
        if (!consultant) {
            return res.status(404).json({ message: "consultant not found" });
        }

        // Update consultant details with the new data from the request body
        const { name,specialization,experience,phone,profilePic, coverPic } = req.body;

        consultant.name = name;
        consultant.specialization = specialization;
        consultant.experience = experience;
        consultant.phone = phone;
        consultant.profilePic = profilePic;
        consultant.coverPic = coverPic;

        // Save the updated consultant document
        consultant = await consultant.save();

        // Return the updated consultant data as a response
        res.status(200).json(consultant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete consultant account from both db
export const deleteconsultantAccount =async(req,res) => {
    const userId = req.params.userId;

    try {
        // Extract the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token to obtain user data, including the user ID
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        // Extract the user ID from the decoded token
        const loggedInUserId = decodedToken.userId;

        // Check if the user ID in the request matches the logged-in user ID
        if (userId !== loggedInUserId) {
            return res.status(403).json({ message: "You are not authorized to Delete this Account" });
        }

        // Find and delete the consultant document
        await consultantModel.findOneAndDelete({ user: userId });

        // Find and delete the user document
        await UserModel.findByIdAndDelete(userId);

        // Return success response
        res.status(200).json({ message: "User account deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}