import express from "express";
import {getEmployer } from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';

const  router = express.Router();


//FOR GENERAL USERS





//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer






//FOR BUSINESS 







//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant









export default router