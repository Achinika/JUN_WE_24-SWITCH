import RideModel from "../Models/rideSharingModel.js";
import UserModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';


// Update user account to become an Ridesharing
export const updateToniRdesharing = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const {role, pickupLocation,dropLocation, number, estimate} = req.body;

        const newRidesharing = new RideModel({
            user: userId,
            role,
            pickupLocation,
            dropLocation,
            number,
            estimate

        });

        // Save the new Ridesharing details
        const savedRidesharing = await newRidesharing.save();

        res.status(200).json(savedRidesharing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//post Ridesharing
export const postRidesharing = async (req,res) =>{
    const userId = req.params.userId;

    try {
        const {role, pickupLocation,dropLocation, number, estimate} = req.body;

        const newRidesharing = new RideModel({
            user: userId,
            role,
            pickupLocation,
            dropLocation,
            number,
            estimate

        });

      // Save the new Ridesharing to the database
      await newRidesharing.save();

      // Fetch user details from MongoDB
      const user = await UserModel.findById(userId);

      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Customize the response data with user details
      const responseData = {
          message: 'Ridesharing created successfully',
          enroll: newRidesharing,
          user: {
              _id: user._id,
              username: user.username,
              // Include other relevant user details here
          }
      };

      // Respond with the customized data
      res.status(201).json(responseData);
  } catch (error) {
      // Handle any errors that occurred during enrollment
      console.error('Error Ridesharing in ride:', error);
      res.status(500).json({ message: 'An error occurred while Ridesharing in ride' });
  }
};


//get Ridesharing   
export const getRidesharing = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related RideModel
        const emp = await RideModel.findOne({ user: userId }).populate('user', 'email');
        if(emp)
        {
            //remove the pw from the response
            const {password, ...otherDetails} =emp._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json({ message: "Ridesharing not found" });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//update a Ridesharing Details
export const updateRidesharingDetails = async (req, res) => {
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

        // Retrieve the existing Ridesharing document
        let ridesharing = await RideModel.findOne({ user: userId });

        // Check if Ridesharing exists
        if (!ridesharing) {
            return res.status(404).json({ message: "Ridesharing not found" });
        }

        // Update Ridesharing details with the new data from the request body
        const {role, pickupLocation,dropLocation, number, estimate} = req.body;

        ridesharing.role = role;
        ridesharing.pickupLocation = pickupLocation;
        ridesharing.dropLocation = dropLocation;
        ridesharing.number = number;
        ridesharing.estimate = estimate;
       

        // Save the updated Ridesharing document
        ridesharing = await ridesharing.save();

        // Return the updated Ridesharing data as a response
        res.status(200).json(ridesharing);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


   

