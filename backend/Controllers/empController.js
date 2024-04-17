import EmployerModel from "../Models/employerModel.js";
import UserModel from "../Models/userModel.js";
import JobModel from "../Models/jobsModel.js";
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

        // Update the userType field in the UserModel to 'employer'
        user.accountType = 'employer';

        // Save the updated user document
        await user.save();

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
        // Retrieve the existing employer document for the specified user ID
        let employer = await EmployerModel.findOne({ user: userId });

        // Check if employer exists
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Extract the token from the request headers
        const token = req.headers.authorization.split(' ')[1];

        // Verify the token to obtain user data, including the user ID
        try {
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

            // Extract the user ID from the decoded token
            const loggedInUserId = decodedToken.userId;

            // Check if the user ID in the request matches the logged-in user ID
            if (userId !== loggedInUserId) {
                return res.status(403).json({ message: "You are not authorized to perform this action" });
            }

            // Update employer details with the new data from the request body
            const { firstName, lastName, email, location, workingCompany, linkURL, contactNumber, birthDay, description, profilePic, coverPic } = req.body;

            employer.firstName = firstName;
            employer.lastName = lastName;
            employer.email = email; // Only update email if required
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
        } catch (jwtError) {
            if (jwtError instanceof jwt.TokenExpiredError) {
                // Token has expired, send an error response indicating the need to re-login
                return res.status(401).json({ message: "Token has expired, please log in again" });
            } else {
                // Other JWT verification errors
                throw jwtError;
            }
        }
    } catch (error) {
        // Handle database and other errors
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


// Add a job advertisement
export const addJobAdvt = async (req, res) => {
    const userId = req.params.userId;

    try {
        // Retrieve the existing employer document
        const employer = await EmployerModel.findOne({ user: userId });

        // Check if employer exists
        if (!employer) {
            return res.status(404).json({ message: "Employer not found" });
        }

        // Extract job details from request body
        const { jobTitle, jobDescription, postedDate, closingDate, experienceLevel,minEduLevel, company, location, jobType, contactNumber, contactEmail } = req.body;

        // Create a new Job model instance
        const newJob = new JobModel({
            employer: employer._id,
            jobTitle,
            jobDescription,
            postedDate,
            closingDate,
            experienceLevel,
            minEduLevel,
            company,
            location,
            jobType,
            contactNumber,
            contactEmail
        });

        // Save the new job advertisement
        const savedJob = await newJob.save();

        res.status(200).json(savedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//edit job advertisement
export const updateJobAdvt = async (req, res) => {
    const jobId = req.params.jobId; // Assuming you pass the job ID as a parameter

    try {
        // Find the job advertisement by ID
        const job = await JobModel.findById(jobId);

        // Check if job advertisement exists
        if (!job) {
            return res.status(404).json({ message: "Job advertisement not found" });
        }

        // Extract updated job details from request body
        const { jobTitle, jobDescription, postedDate, closingDate, experienceLevel,minEduLevel, company, location, jobType, contactNumber, contactEmail } = req.body;

        // Update job advertisement fields with new values
        job.jobTitle = jobTitle;
        job.jobDescription = jobDescription;
        job.postedDate = postedDate;
        job.closingDate = closingDate;
        job.experienceLevel = experienceLevel;
        job.minEduLevel = minEduLevel;
        job.company = company;
        job.location = location;
        job.jobType = jobType;
        job.contactNumber = contactNumber;
        job.contactEmail = contactEmail;

        // Save the updated job advertisement
        const updatedJob = await job.save();

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a job advertisement
export const deleteJobAdvt = async (req, res) => {
    const jobId = req.params.jobId; // Assuming you pass the job ID as a parameter

    try {
        // Find the job advertisement by ID and delete it
        const deletedJob = await JobModel.findByIdAndDelete(jobId);

        // Check if job advertisement exists
        if (!deletedJob) {
            return res.status(404).json({ message: "Job advertisement not found" });
        }

        res.status(200).json({ message: "Job advertisement deleted successfully !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



   

