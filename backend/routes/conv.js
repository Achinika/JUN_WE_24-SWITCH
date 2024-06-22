const router = require('express').Router();
const Conversation = require('../models/conv');

// Route to create a new conversation
router.post('/create', async (req, res) => {
    try {
        const { umail, conMail } = req.body;
        const conversation = new Conversation({ umail, conMail });
        await conversation.save();
        res.json({ message: 'Conversation created successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create conversation' });
    }
});

router.get('/allCount', async (req, res) => {
    try {
        const view = await Conversation.aggregate([
            {
                $group: {
                    _id: '$conMail',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.json(view);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

module.exports = router;
