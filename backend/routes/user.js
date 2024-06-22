const userSchema = require('../models/user');
const express = require('express');
const router = express.Router();


router.route('/register').post(async (req, res, next) => {    
    try {
        const existingUser = await userSchema.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                message: 'Email is Already Used'
            })
        }
        let user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            dob: req.body.dob,
            type: req.body.type,
        })
        await user.save();
        res.json({
            message: 'Sign Up Successfully'
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.post('/login', async (req, res) => {

    const { email, password } = req.body;    

    try {
        const user = await userSchema.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: false });
        }

        if (password !== user.password) {
            return res.status(400).json({ message: false });
        }

        return res.status(200).json({ message: true });

    } catch (error) {
        console.log(error);
        res.status(500).send('Error logging in');
    }
});

router.route('/getAll').get(async (req, res, next) => {
    try {
        const users = await userSchema.find();
        return res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



module.exports = router;
