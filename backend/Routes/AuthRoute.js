import express from "express";
import { registerUser,loginUser } from "../Controllers/authController.js";
import { updateToEmployer } from '../Controllers/empController.js';


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



//FOR CONSULTANTS





export default router