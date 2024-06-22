const router = require('express').Router();
const Apply = require('../models/apply');

router.post('/add', async (req, res) => {
    const { jobId, companyName, position, experience, email } = req.body;
    try {
        const application = new Apply({ jobId, companyName, position, experience, email });
        await application.save();
        res.json({ message: 'Application submitted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

router.get('/all', async (req, res) => {
    try {
        const applications = await Apply.find();
        res.json(applications);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

router.get('/allCount', async (req, res) => {
    try {
        const viewCount = await Apply.aggregate([
            {
                $group: {
                    _id: '$jobId',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(viewCount);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

module.exports = router;
