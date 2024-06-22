const router = require('express').Router();
const Job = require('../models/jobs');

// Add a new job
router.post('/add', async (req, res) => {
    try {
        const { pid, company, position, experienceLevel, minEducationLevel, responsibilities, email, phone, location, availability, picture } = req.body;        
        const newJob = new Job({ pid, company, position, experienceLevel, minEducationLevel, responsibilities, email, phone, location, availability, picture });
        await newJob.save();
        res.json({ message: 'Job added successfully', job: newJob });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all jobs
router.get('/all', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a Job post
router.route("/update").put(async (req, res) => {
    const post = req.body;
    const update = await Job.findOneAndUpdate({ pid: post.pid }, post).then(() => {
            res.status(200).send({ status: "Updated" });
    }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
    });
});


// Get a job by its pid
router.route("/:pid").get(async (req, res) => {
    try {
        const post = await Job.findOne({ pid: req.params.pid });
        if (post) {
            res.status(200).send(post);
        } else {
            res.status(404).send({ error: "Job not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Delete a job
router.delete('/delete/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        await Job.findOneAndDelete({ pid: pid });
        res.json('Job post deleted successfully');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});


module.exports = router;
