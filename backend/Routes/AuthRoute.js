import express from "express";
import { registerUser,loginUser } from "../Controllers/authController.js";

const  router = express.Router();


//define routes
router.post ('/register', registerUser)
router.post ('/login', loginUser)


export default router