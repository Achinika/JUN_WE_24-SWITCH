import UserEnrollModel from "../Models/userEnrollModel.js";
/*import UserModel from "../Models/userModel.js";*/
import jwt from 'jsonwebtoken';


// Update user account to become an Enroll
export const updateToGenUser = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "Enroll not found" });
        }

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

        // Save the new Enroll details
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

       // Save the new enrollment to the database
       await newEnroll.save();

       // Fetch user details from MongoDB
       const user = await UserModel.findById(userId);

       if (!user) {
           return res.status(404).json({ message: 'User not found' });
       }

       // Customize the response data with user details
       const responseData = {
           message: 'Enrollment created successfully',
           enroll: newEnroll,
           user: {
               _id: user._id,
               
               // Include other relevant user details here
           }
       };

       // Respond with the customized data
       res.status(201).json(responseData);
   } catch (error) {
       // Handle any errors that occurred during enrollment
       console.error('Error enrolling in courses:', error);
       res.status(500).json({ message: 'An error occurred while enrolling in courses' });
   }
};


//get Enroll   
export const getEnroll = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related EnrollModel
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


// DELETE an enrollment
export const deleteEnroll = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Check if the enrollment exists
        const enroll = await userId.findById(enroll);
        if (!enroll) {
            return res.status(404).json({ message: 'Enrollment not found' });
        }

        // Delete the enrollment from the database
        await enroll.remove();

        // Respond with success message and deleted enrollment data
        res.status(200).json({ message: 'Enrollment deleted successfully', deleteEnroll: enroll });
    } catch (error) {
        // Handle any errors that occurred during deletion
        console.error('Error deleting enrollment:', error);
        res.status(500).json({ message: 'An error occurred while deleting enrollment' });
    }
};

   

