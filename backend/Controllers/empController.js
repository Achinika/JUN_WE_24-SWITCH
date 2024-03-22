import EmployerModel from "../Models/employerModel.js";
import UserModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';


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
        const { firstName, lastName,location, workingCompany, linkURL, contactNumber, birthDay, description, profilePic, coverPic, followings, followers } = req.body;

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
            description,
            profilePic,
            coverPic,
            followings,
            followers

        });

        // Save the new employer details
        const savedEmployer = await newEmployer.save();

        res.status(200).json(savedEmployer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get a Employer 
export const getEmployer = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related UserModel
        const emp = await EmployerModel.findOne({ user: userId }).populate('user', 'email');
        if(emp)
        {
            //remove the pw from the response
            const {password, ...otherDetails} =emp._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json({ message: "Employer not found" });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update a employer Details
export const updateEmpDetails = async (req, res) => {
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

        // Retrieve the existing employer document
        let employer = await EmployerModel.findOne({ user: userId });

        // Check if employer exists
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Update employer details with the new data from the request body
        const { firstName, lastName, email, location, workingCompany, linkURL, contactNumber, birthDay, description, profilePic, coverPic } = req.body;

        employer.firstName = firstName;
        employer.lastName = lastName;
        employer.email = email;
        employer.location = location;
        employer.workingCompany = workingCompany;
        employer.linkURL = linkURL;
        employer.contactNumber = contactNumber;
        employer.birthDay = birthDay;
        employer.description = description;
        employer.profilePic = profilePic;
        employer.coverPic = coverPic;

        // Save the updated employer document
        employer = await employer.save();

        // Return the updated employer data as a response
        res.status(200).json(employer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete Employer account from both db
export const deleteEmpAccount =async(req,res) => {
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

        // Find and delete the employer document
        await EmployerModel.findOneAndDelete({ user: userId });

        // Find and delete the user document
        await UserModel.findByIdAndDelete(userId);

        // Return success response
        res.status(200).json({ message: "User account deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




   

