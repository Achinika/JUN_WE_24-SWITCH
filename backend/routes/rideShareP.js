const router = require('express').Router();
const RideShareP = require('../models/rideShareP');

// Route to add a new ride share entry
router.post('/add', async (req, res) => {
    try {
        const { rid, email, startPoint, endPoint, time, passengerCount } = req.body;
        const rideShareP = new RideShareP({ rid, email, startPoint, endPoint, time, passengerCount });
        await rideShareP.save();
        res.json({ message: 'Ride share entry added successfully' });
    } catch (error) {
        console.error('Error adding ride share entry:', error);
        res.status(500).json({ error: 'Failed to add ride share entry' });
    }
});

// Route to get all ride share entries
router.get('/all', async (req, res) => {
    try {
        const rideSharesP = await RideShareP.find();
        res.json(rideSharesP);
    } catch (error) {
        console.error('Error fetching ride share entries:', error);
        res.status(500).json({ error: 'Failed to fetch ride share entries' });
    }
});

router.route("/delete/:rid").delete(async (req, res) => {
    let rid = req.params.rid;
    RideShareP.findOneAndDelete({ rid: rid })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/update").put(async (req, res) => {
    const { rid, email, startPoint, endPoint, time, passengerCount } = req.body;    
    const data = {
        rid, email, startPoint, endPoint, time, passengerCount
    }
    const update = await RideShareP.findOneAndUpdate({ rid: rid }, data).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

module.exports = router;
