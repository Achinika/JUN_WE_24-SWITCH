const router = require('express').Router();
const Chat = require('../models/chat');


router.post('/addchat', (req, res) => {
    const {email, message, key} = req.body;
    const chat = new Chat({ email, message, key });

    chat.save()
        .then(() => res.json('Successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.get('/allchat', async (req, res) => {
    Chat.find()
        .then(chat => res.json(chat))
        .catch(err => res.status(400).json({ status: "No support requests found", error: err.message }));
});

module.exports = router;
