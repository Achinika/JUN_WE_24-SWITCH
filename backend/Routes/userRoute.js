
import express from "express";
import {getEmployer } from '../Controllers/empController.js';


const  router = express.Router();


//FOR GENERAL USERS





//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer






//FOR BUSINESS 
router.get('/:userId', getBusiness); //get a Business






//FOR CONSULTANT 






export default router
