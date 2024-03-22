import GeneralUserModel from "../Models/generalUserModel.js";
import UserModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';


// Update user account to become an employer
export const updateToGenUser = async (req, res) => {
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
        const newGenUser = new GeneralUserModel({
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
        const savedGenUser = await newGenUser.save();

        res.status(200).json(savedGenUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get a General User 

export const getGenUser = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related UserModel
        const emp = await GeneralUserModel.findOne({ user: userId }).populate('user', 'email');
        if(emp)
        {
            //remove the pw from the response
            const {password, ...otherDetails} =emp._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json({ message: "GenUser not found" });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};



//update a employer Details
export const updateGenDetails = async (req, res) => {
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
        let genUser = await GeneralUserModel.findOne({ user: userId });

        // Check if employer exists
        if (!genUser) {
            return res.status(404).json({ message: "GenUser not found" });
        }

        // Update employer details with the new data from the request body
        const { firstName, lastName, email, location, workingCompany, linkURL, contactNumber, birthDay, description, profilePic, coverPic } = req.body;

        genUser.firstName = firstName;
        genUser.lastName = lastName;
        genUser.email = email;
        genUser.location = location;
        genUser.workingCompany = workingCompany;
        genUser.linkURL = linkURL;
        genUser.contactNumber = contactNumber;
        genUser.birthDay = birthDay;
        genUser.description = description;
        genUser.profilePic = profilePic;
        genUser.coverPic = coverPic;

        // Save the updated employer document
        genUser = await genUser.save();

        // Return the updated employer data as a response
        res.status(200).json(genUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



   

