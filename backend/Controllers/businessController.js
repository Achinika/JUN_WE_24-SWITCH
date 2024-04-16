import addProductModel from "../Models/addproductModel.js";
import BusinessModel from "../Models/businessModel.js";
import UserModel from "../Models/userModel.js";
import jwt from 'jsonwebtoken';


// Update user account to become an business
export const updateToBusiness = async (req, res) => {
    const userId = req.params.userId; // Assuming you pass the user ID as a parameter

    try {
        // Retrieve the user by ID
        const user = await UserModel.findById(userId);

        // Check if user exists
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Extract business details from request body
        const { businessName, location, industry, website, profilepicture, coverpicture, followers, following} = req.body;

        // Create a new businessModel document associated with the user's ID
        const newBusiness = new BusinessModel({
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

        // Save the new business details
        const savedBusiness = await newBusiness.save();

        res.status(200).json(savedBusiness);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//get a Business 
export const getBusiness = async (req,res) =>{
    const userId = req.params.userId;

    try {
        //include the email field and userId  from the related UserModel
        const emp = await BusinessModel.findOne({ user: userId }).populate('user', 'email');
        if(emp)
        {
            //remove the pw from the response
            const {password, ...otherDetails} =emp._doc
            res.status(200).json(otherDetails);
        }
        else{
            res.status(404).json({ message: "Business not found" });
        }

    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

//Update business details
export const updateBusinessDetails = async (req, res) => {
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

        // Retrieve the existing Business document
        let business = await BusinessModel.findOne({ user: userId });

        // Check if business exists
        if (!business) {
            return res.status(404).json({ message: "business not found" });
        }

        // Update business details with the new data from the request body
        const { businessName, location, industry, website, profilepicture, coverpicture, followers, following } = req.body;

        business.businessName = businessName;
        business.location = location;
        business.industry = industry;
        business.website = website;
        business.profilepicture = profilepicture;
        business.coverpicture = coverpicture;
        business.followers = followers;
        business.following = following;

        // Save the updated business document
        business = await business.save();

        // Return the updated business data as a response
        res.status(200).json(business);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete business account from both db
export const deleteBusinessAccount =async(req,res) => {
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

        // Find and delete the Business document
        await BusinessModel.findOneAndDelete({ user: userId });

        // Find and delete the user document
        await UserModel.findByIdAndDelete(userId);

        // Return success response
        res.status(200).json({ message: "User account deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//////////////add new product part//////////////////////////////////////////////////

export const addproduct = async (req,res) =>{
    const userId = req.params.userId;

    try {
        // Retrieve the existing business document
        const business = await businessModel.findOne({ user: userId });

        // Check if business exists
        if (!business) {
            return res.status(404).json({ message: "business not found" });
        }

        // Extract product details from request body
        const { title, description, catagory } = req.body;

        // Create a new product model instance
        const newProduct = new addProductModel({
            business: business._id,
            title,
            catagory,
            descr,
            image,
            likes
            
        });

        // Save the new product advertisement
        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//edit product details
export const updateProduct = async (req, res) => {
    const productId = req.params.productId; // Assuming you pass the product ID as a parameter

    try {
        // Find the product advertisement by ID
        const product = await addProductModel.findById(productId);

        // Check if product advertisement exists
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Extract updated product details from request body
        const { title, catagory, descr, image, likes } = req.body;

        // Update product advertisement fields with new values
        product.title = title;
        product.catagory = catagory;
        product.descr = descr;
        product.image = image;
        product.likes = likes;

        

        // Save the updated product advertisement
        const updatedProduct = await product.save();

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product advertisement
export const deleteProduct = async (req, res) => {
    const productId = req.params.ProductId; // Assuming you pass the product ID as a parameter

    try {
        // Find the product advertisement by ID and delete it
        const deletedProduct = await addProductModel.findByIdAndDelete(productId);

        // Check if Product advertisement exists
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully !" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};