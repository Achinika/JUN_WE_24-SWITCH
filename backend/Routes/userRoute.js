import express from "express";
import {getEmployer, updateEmpDetails} from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';
import {getGenUser, updateGenDetails} from '../Controllers/generalUserController.js';

import {getEnroll, updateEnrollDetails, postEnroll, deleteEnroll} from '../Controllers/userEnrollController.js';

import {getRidesharing, updateRidesharingDetails, postRidesharing} from '../Controllers/rideSharingController.js';


import {getBusiness, updateBusinessDetails} from '../Controllers/businessController.js'





const  router = express.Router();








//FOR GENERAL USERS
router.get('/:userId', getGenUser); //get a Employer
router.patch('/update/:userId', updateGenDetails); //update epmloyer

// FOR ENROLL USER
router.get('/:userId', getEnroll); //get a Employer
router.patch('/update/:userId', updateEnrollDetails); //update epmloyer
router.post('/add/:userId', postEnroll); //add epmloyer
router.post('/delete/:userId', deleteEnroll); //delet epmloyer

// FOR RIDESHARING USER
router.get('/:userId', getRidesharing); //get a RIDESHARING
router.patch('/update/:userId', updateRidesharingDetails); //update RIDESHARING
router.post('/add/ride/:userId', postRidesharing); //update RIDESHARING


//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer
router.patch('/update/:userId', updateEmpDetails); //update epmloyer













//FOR BUSINESS 
router.get('/:userId', getBusiness); //get a business
router.patch('/update/:userId', updateBusinessDetails); //update business













//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant















export default router