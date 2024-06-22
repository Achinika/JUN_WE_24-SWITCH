const router = require('express').Router();
const BusinessPost = require('../models/businessPost');

// Add a new business post
router.post('/add', async (req, res) => {
    try {
        const { pid, name, description, phone, email, type, picture } = req.body;
        const newBusinessPost = new BusinessPost({ pid, name, description, phone, email, type, picture });
        await newBusinessPost.save();
        res.json('Business post added successfully');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Update a business post
router.route("/update").put(async (req, res) => {
    const post = req.body;
    const update = await BusinessPost.findOneAndUpdate({ pid: post.pid }, post).then(() => {
            res.status(200).send({ status: "Updated" });
    }).catch((err) => {
            console.log(err);
            res.status(500).send({ error: err.message });
    });
});



// Delete a business post
router.delete('/delete/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        await BusinessPost.findOneAndDelete({ pid: pid });
        res.json('Business post deleted successfully');
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

// Get all business posts
router.get('/all', async (req, res) => {
    try {
        const allBusinessPosts = await BusinessPost.find();
        res.json(allBusinessPosts);
    } catch (error) {
        res.status(400).json('Error: ' + error.message);
    }
});

module.exports = router;
