const router = require('express').Router();
const ViewPosts = require('../models/viewPosts');

// Add a new view post
router.post('/add', async (req, res) => {
    try {
        const { pid, user } = req.body;
        const newViewPost = new ViewPosts({ pid, user });
        await newViewPost.save();
        res.json('View post added successfully');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Get all view posts
router.get('/all', async (req, res) => {
    try {
        const allViewPosts = await ViewPosts.find();
        res.json(allViewPosts);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

router.get('/allCount', async (req, res) => {
    try {
        const viewPostsCount = await ViewPosts.aggregate([
            {
                $group: {
                    _id: '$pid',
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json(viewPostsCount);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

module.exports = router;
