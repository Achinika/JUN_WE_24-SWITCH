import express from "express";
import {getEmployer, updateEmpDetails,deleteEmpAccount} from '../Controllers/empController.js';
import {getconsultant} from '../Controllers/cosultantController.js';
import {getGenUser, updateGenDetails, deleteGenAccount} from '../Controllers/generalUserController.js';

import {getEnroll, updateEnrollDetails, postEnroll, deleteEnroll} from '../Controllers/userEnrollController.js';

import {getRidesharing, updateRidesharingDetails, postRidesharing, deleteRideAccount} from '../Controllers/rideSharingController.js';


import {getBusiness, updateBusinessDetails, deleteBusinessAccount} from '../Controllers/businessController.js'








//import{followUser} from '../Controllers/allUsersController.js';


const  router = express.Router();
//router.put('/:id/followUser',followUser ); //follow a user-common for all user account types








//FOR GENERAL USERS
router.get('/:userId', getGenUser); //get a Employer
router.patch('/update/:userId', updateGenDetails); //update epmloyer
router.delete('/delete/:userId', deleteGenAccount); //delet RIDESHARING
// FOR ENROLL USER
router.get('/enroll/:userId', getEnroll); //get a Employer
router.patch('/update/enroll/:userId', updateEnrollDetails); //update epmloyer
router.post('/add/enroll/:userId', postEnroll); //add epmloyer
router.delete('/delete/enroll/:userId', deleteEnroll); //delet epmloyer

// FOR RIDESHARING USER
router.get('/ride/:userId', getRidesharing); //get a RIDESHARING
router.patch('/update/ride/:userId', updateRidesharingDetails); //update RIDESHARING
router.post('/add/ride/:userId', postRidesharing); //update RIDESHARING
router.delete('/delete/ride/:userId', deleteRideAccount); //delet RIDESHARING








//FOR EMPLOYERS
router.get('/emp/:userId', getEmployer); //get a Employer
router.patch('/update/emp/:userId', updateEmpDetails); //update epmloyer
router.delete('/emp/:userId',deleteEmpAccount); //delete employer












//FOR BUSINESS 
router.get('/bus/:userId', getBusiness); //get a business
router.patch('/update/bus/:userId', updateBusinessDetails); //update business
router.delete('/bus/:userId',deleteBusinessAccount); //delete business












//FOR CONSULTANT 
router.get('/con/:userId', getconsultant); //get a consultant












export default router