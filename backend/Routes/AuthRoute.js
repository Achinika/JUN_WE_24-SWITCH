import express from "express";
import { registerUser,loginUser } from "../Controllers/authController.js";
import { updateToEmployer } from '../Controllers/empController.js';


const  router = express.Router();


//define routes
//FOR ALL USERS-authentication
router.post ('/register', registerUser)
router.post ('/login', loginUser)


//FOR GENERAL USERS-authentication




//FOR EMPLOYERS-authentication
router.get('/switchEmployer/:userId', updateToEmployer);
router.post('/switchEmployer/:userId', updateToEmployer); //add form data



//FOR BUSINESS-authentication



//FOR CONSULTANTS-authentication





export default router