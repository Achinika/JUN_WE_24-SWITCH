import express from "express";
const router = express.Router()

router.get('/',async(req, res)=> {
    response.send("product route")
})

export default router;
