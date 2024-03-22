import express from "express";
import {getEmployer, updateEmpDetails} from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';
import {getGenUser, updateGenDetails} from '../Controllers/generalUserController.js';

import {getEnroll, updateEnrollDetails,postEnroll} from '../Controllers/userEnrollController.js';




const  router = express.Router();

//FOR GENERAL USERS
router.get('/:userId', getGenUser); //get a Employer
router.patch('/update/:userId', updateGenDetails); //update epmloyer

// For Enroll User
router.get('/:userId', getEnroll); //get a Employer
router.patch('/update/:userId', updateEnrollDetails); //update epmloyer
router.post('/add/:userId', postEnroll); //update epmloyer






//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer
router.patch('/update/:userId', updateEmpDetails); //update epmloyer













//FOR BUSINESS 














//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant















export default router