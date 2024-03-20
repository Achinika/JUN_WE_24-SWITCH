import express from "express";
import { getbusiness } from "../Controllers/businessController.js";

const router = express.Router();

router.get('/',getbusiness)

export default router;

