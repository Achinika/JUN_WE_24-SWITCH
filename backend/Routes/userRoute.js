import express from "express";
import {getEmployer, updateEmpDetails,deleteEmpAccount} from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';
import {getGenUser, updateGenDetails} from '../Controllers/generalUserController.js';

import {getEnroll, updateEnrollDetails,postEnroll} from '../Controllers/userEnrollController.js';




import {getBusiness, updateBusinessDetails} from '../Controllers/businessController.js'











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
router.delete('/:userId',deleteEmpAccount); //delete employer












//FOR BUSINESS 
router.get('/:userId', getBusiness); //get a business
router.patch('/update/:userId', updateBusinessDetails); //update business













//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant















export default router