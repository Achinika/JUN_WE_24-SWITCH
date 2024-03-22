import express from "express";
import {getEmployer, updateEmpDetails} from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';

import {getBusiness, updateBusinessDetails} from '../Controllers/businessController.js'





const  router = express.Router();

//FOR GENERAL USERS













//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer
router.patch('/update/:userId', updateEmpDetails); //update epmloyer













//FOR BUSINESS 
router.get('/:userId', getBusiness); //get a business
router.patch('/update/:userId', updateBusinessDetails); //update business












//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant















export default router