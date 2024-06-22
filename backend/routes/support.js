const router = require('express').Router();
const Support = require('../models/support');


router.post('/addSupport', (req, res) => {
    const { uniqueId, name, email, phone, issueDetail, status, todayDate } = req.body;
    const newSupport = new Support({ uniqueId, name, email, phone, issueDetail, status, todayDate });

    newSupport.save()
        .then(() => res.json('Support request added successfully!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.put('/updateSupport/:id', async (req, res) => {
    const uniqueId = req.params.id;
    const { name, email, phone, issueDetail, status } = req.body;

    Support.findOneAndUpdate({ uniqueId: uniqueId }, { name, email, phone, issueDetail, status, uniqueId }, { new: true })
        .then(updatedSupport => {
            if (updatedSupport) {
                res.json({ status: "Support request updated successfully!", support: updatedSupport });
            } else {
                res.status(404).json({ status: "Support request not found" });
            }
        })
        .catch(err => res.status(500).json({ status: "Error with updating support request", error: err.message }));
});

router.delete('/deleteSupport/:id', async (req, res) => {
    const uniqueId = req.params.id;
    Support.findOneAndDelete({ uniqueId: uniqueId })
        .then(() => res.status(200).json({ status: "Support request deleted successfully!" }))
        .catch(err => res.status(500).json({ status: "Error with deleting support request", error: err.message }));
});


router.get('/allSupport', async (req, res) => {
    Support.find()
        .then(supportRequests => res.json(supportRequests))
        .catch(err => res.status(400).json({ status: "No support requests found", error: err.message }));
});

module.exports = router;
