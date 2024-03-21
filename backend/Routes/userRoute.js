import express from "express";
import {getEmployer } from '../Controllers/empController.js';


const  router = express.Router();


//FOR GENERAL USERS





//FOR EMPLOYERS
router.get('/:userId', getEmployer); //get a Employer






//FOR BUSINESS 







//FOR CONSULTANT 






export default router