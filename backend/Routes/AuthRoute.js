import express from "express";
import { registerUser,loginUser } from "../Controllers/authController.js";
import { updateToEmployer } from '../Controllers/empController.js';

import { updateToBusiness } from '../Controllers/businessController.js';


const  router = express.Router();


//define routes
//FOR ALL USERS
router.post ('/register', registerUser)
router.post ('/login', loginUser)

//FOR GENERAL USERS




//FOR EMPLOYERS
router.get('/switchEmployer/:userId', updateToEmployer);
router.post('/switchEmployer/:userId', updateToEmployer); //add form data



//FOR BUSINESS
router.get('/switchBusiness/:userId', updateToBusiness);
router.post('/switchBusiness/:userId', updateToBusiness); //add form data


//FOR CONSULTANTS





export default router