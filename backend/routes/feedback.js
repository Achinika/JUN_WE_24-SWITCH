const router = require('express').Router();
let feedbackSchema = require('../models/feedback');

router.route('/add').post((req, res) => {
    const { fid, email, description, rating} = req.body;
    const feedback = new feedbackSchema({ fid, email, description, rating });
    feedback.save()
        .then(() => res.json('Feeback Add!'))
        .catch(err => res.status(400).json('Error: ' + err));
});


router.route("/update").put(async (req, res) => {
    const { fid, email, description, rating } = req.body;
    const feedback = {
        fid, email, description, rating
    }
    const update = await feedbackSchema.findOneAndUpdate({ fid: fid }, feedback).then(() => {
        res.status(200).send({ status: "Updated" });
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "Error with Updating Data", error: err.message });
    });
});

router.route("/delete/:fid").delete(async (req, res) => {
    let fid = req.params.fid;
    feedbackSchema.findOneAndDelete({ fid: fid })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

router.route("/all").get(async (req, res) => {
    feedbackSchema.find()
        .then(feedback => res.json(feedback))
        .catch(err => res.status(400).json('No Data'))
});

module.exports = router;