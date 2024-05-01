import UserModel from "../Models/userModel.js";

export const followUser = async (req, res) => {
    const userIdToFollow = req.params.id;
    const { currentUserId, currentAccountType } = req.body;

    try {
        // Check if the current user is trying to follow themselves
        if (currentUserId === userIdToFollow) {
            return res.status(401).json("Action Forbidden: User cannot follow themselves");
        }

        // Find the user to follow based on the account type
        let userToFollow;
        switch (currentAccountType) {
            case 'employer':
                userToFollow = await EmployerModel.findById(userIdToFollow);
                break;
            case 'general':
                userToFollow = await GeneralUserModel.findById(userIdToFollow);
                break;
            case 'consultant':
                userToFollow = await ConsultantModel.findById(userIdToFollow);
                break;
            case 'business':
                userToFollow = await BusinessModel.findById(userIdToFollow);
                break;
            default:
                // If the account type is not recognized, check in UserModel
                userToFollow = await UserModel.findById(userIdToFollow);
                break;
        }

        // Check if the user to follow exists
        if (!userToFollow) {
            return res.status(404).json("User not found");
        }

        // Update following & followers arrays
        await UserModel.findByIdAndUpdate(currentUserId, { $push: { followings: userIdToFollow } });
        await UserModel.findByIdAndUpdate(userIdToFollow, { $push: { followers: currentUserId } });

        res.status(200).json("User Followed !");
    }
    catch(error){
        res.status(500).json(error.message);
    }
};