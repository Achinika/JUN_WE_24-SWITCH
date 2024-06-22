const router = require('express').Router();
const Candidate = require('../models/candidate');
import multer from 'multer';

// Add a new Model
router.post('/addCnd', async (req, res) => {
    try {
        // Extract candidate details from request body
        const { job, name,email, phone, location, experienceLevel, minEducationLevel, description } = req.body;

        // Create a new Candidate model instance
        const newCandidate = new CandidateModel({
            job,
            name,
            email,
            phone,
            location,
            experienceLevel,
            minEducationLevel,
            description,
            cv: req.file.path, // Save the file path of the uploaded CV
            appliedDate: Date.now() // Automatically set the applied date
        });

        // Save the new candidate
        const savedCandidate = await newCandidate.save();

        res.status(200).json(savedCandidate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all candidated for a job
router.get('/Cnd/all', async (req, res) => {
    try {
        // Extract job ID from request query parameters
        const pid = req.query.pid;

        // Find all candidates associated with the specified job ID
        const candidates = await Candidate.find({ job: pid });

        res.json(candidates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
