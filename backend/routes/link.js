const router = require('express').Router();
let linkSchema = require('../models/link');

router.route('/add').post((req, res) => {
    const { unique, email, name, link } = req.body;
    const links = new linkSchema({ unique, email, name, link });
    links.save()
        .then(() => res.json('Link Added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route("/all").get(async (req, res) => {
    linkSchema.find()
        .then(links => res.json(links))
        .catch(err => res.status(400).json('No Data'))
});

router.route("/delete/:unique").delete(async (req, res) => {
    let unique = req.params.unique;
    linkSchema.findOneAndDelete({ unique: unique })
        .then(() => {
            res.status(200).send({ status: "Deleted" });

        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with Deleting Data", error: err.message });
        });
});

module.exports = router;