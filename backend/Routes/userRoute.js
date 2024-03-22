import express from "express";
import {deleteEmpAccount, getEmployer, updateEmpDetails} from '../Controllers/empController.js';
import {getconsultant } from '../Controllers/cosultantController.js';






const  router = express.Router();

//FOR GENERAL USERS













//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer
router.patch('/update/:userId', updateEmpDetails); //update epmloyer
router.delete('/:userId', deleteEmpAccount); //delete Employer account from both db












//FOR BUSINESS 













//FOR CONSULTANT 
router.get('/:userId', getconsultant); //get a consultant















export default router