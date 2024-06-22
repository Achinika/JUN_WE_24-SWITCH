const adminSchema = require('../models/admin');
const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();


router.route('/register').post(async (req, res, next) => {    
    try {
        const existingUser = await adminSchema.findOne({ email: req.body.email });
        if (existingUser) {
            return res.json({
                message: 'Email is Already Used'
            })
        }
        const hashedPass = await bcrypt.hash(req.body.password, 10);
        let admin = new adminSchema({
            name: req.body.name,
            dob: req.body.dob,
            email: req.body.email,
            phone: req.body.phone,
            type: req.body.type,
            indus: req.body.indus,
            location: req.body.location,
            password: hashedPass,
        })
        await admin.save();
        res.json({
            message: 'Admin Member Added'
        })
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.route('/login').post(async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const existingUser = await adminSchema.findOne({ email });
        if (!existingUser) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }
        
        const passwordMatch = await bcrypt.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Email or password is incorrect' });
        }
        
        return res.status(200).json({ message: true });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.route('/getAll').get(async (req, res, next) => {
    try {
        const admins = await adminSchema.find();
        return res.status(200).json(admins);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});




module.exports = router;