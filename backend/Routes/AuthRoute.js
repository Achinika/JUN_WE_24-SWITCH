import express from "express";
import { registerUser,loginUser } from "../Controllers/authController.js";
//general Users
import { updateToEmployer } from '../Controllers/empController.js'; //employer
import { updateToBusiness } from '../Controllers/businessController.js'//business
import { updateToconsultant } from '../Controllers/cosultantController.js'; //consultant



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
router.get('/switchBusiness/:userId', updateToBusiness);
router.post('/switchBusiness/:userId', updateToBusiness); //add form data



//FOR CONSULTANTS-authentication
router.get('/switchconsultant/:userId', updateToconsultant);
router.post('/switchconsultant/:userId', updateToconsultant); //add form data




export default router