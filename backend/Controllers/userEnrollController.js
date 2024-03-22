import UserEnrollModel from "../Models/userEnrollModel.js";
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
        const { studentName, birthDate,gender, address, city, province, postalcode, email, mobileNumberl, courses, additionalcomment} = req.body;

        // Create a new EmployerModel document associated with the user's ID
        const newEnroll = new UserEnrollModel({
            user: userId,
            studentName,
            birthDate,
            gender,
            address,
            city,
            province,
            postalcode,
            email,
            mobileNumberl,
            courses,
            additionalcomment

        });

        // Save the new enroll details
        const savedEnroll = await newEnroll.save();

        res.status(200).json(savedEnroll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//post Enroll
export const postEnroll = async (req,res) =>{
    const userId = req.params.userId;

    try {
        const {studentName, birthDate,gender, address, city, province, postalcode, email, mobileNumberl, courses, additionalcomment} = req.body;

        const newEnroll = new UserEnrollModel({
            user: userId,
            studentName,
            birthDate,
            gender,
            address,
            city,
            province,
            postalcode,
            email,
            mobileNumberl,
            courses,
            additionalcomment

        });

    // Respond with a success message and the created enrollment
    res.status(201).json({ message: 'Enrollment created successfully', enroll: newEnroll });
  } catch (error) {
    // Handle any errors that occurred during enrollment
    console.error('Error enrolling in courses:', error);
    res.status(500).json({ message: 'An error occurred while enrolling in courses' });
  }
};




//get a Enroll   
export const getEnroll = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related UserModel
        const emp = await UserEnrollModel.findOne({ user: userId }).populate('user', 'email');
        if(emp)
        {
            //remove the pw from the response
            const {password, ...otherDetails} =emp._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json({ message: "Enroll not found" });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update a Enroll Details
export const updateEnrollDetails = async (req, res) => {
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

        // Retrieve the existing Enroll document
        let enroll = await UserEnrollModel.findOne({ user: userId });

        // Check if Enroll exists
        if (!enroll) {
            return res.status(404).json({ message: "GenUser not found" });
        }

        // Update Enroll details with the new data from the request body
        const {studentName, birthDate,gender, address, city, province, postalcode, email, mobileNumberl, courses, additionalcomment} = req.body;

        enroll.studentName = studentName;
        enroll.birthDate = birthDate;
        enroll.gender = gender;
        enroll.address = address;
        enroll.city = city;
        enroll.province = province;
        enroll.postalcode = postalcode;
        enroll.email = email;
        enroll.mobileNumberl = mobileNumberl;
        enroll.courses = courses;
        enroll.additionalcomment = additionalcomment;

        // Save the updated Enroll document
        enroll = await enroll.save();

        // Return the updated Enroll data as a response
        res.status(200).json(enroll);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


   

