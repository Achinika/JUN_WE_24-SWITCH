import express from "express";
import {getEmployer, updateEmpDetails,deleteEmpAccount} from '../Controllers/empController.js';
import {getconsultant, updateconsultantDetails,deleteconsultantAccount} from '../Controllers/cosultantController.js';
import {getGenUser, updateGenDetails} from '../Controllers/generalUserController.js';

import {getEnroll, updateEnrollDetails,postEnroll} from '../Controllers/userEnrollController.js';




import {getBusiness, updateBusinessDetails, deleteBusinessAccount} from '../Controllers/businessController.js'











const  router = express.Router();


//FOR GENERAL USERS
router.get('/:userId', getGenUser); //get a Employer
router.patch('/update/:userId', updateGenDetails); //update epmloyer

// For Enroll User
router.get('/:userId', getEnroll); //get a Employer
router.patch('/update/:userId', updateEnrollDetails); //update epmloyer
router.post('/add/:userId', postEnroll); //update epmloyer












//FOR EMPLOYERS
router.get('/emp/:userId', getEmployer); //get a Employer
router.patch('/update/emp/:userId', updateEmpDetails); //update epmloyer
router.delete('/emp/:userId',deleteEmpAccount); //delete employer












//FOR BUSINESS 
router.get('/bus/:userId', getBusiness); //get a business
router.patch('/update/bus/:userId', updateBusinessDetails); //update business
router.delete('/emp/:userId',deleteBusinessAccount); //delete business












//FOR CONSULTANT 
router.get('/con/:userId', getconsultant); //get a consultant
router.patch('/con/update/:userId', updateconsultantDetails); //update consultant
router.delete('/con/:userId',deleteconsultantAccount); //delete consultant












export default router