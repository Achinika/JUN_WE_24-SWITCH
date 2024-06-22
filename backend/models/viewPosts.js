const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const viewPostsSchema = new Schema({
    pid: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const ViewPosts = mongoose.model('ViewPosts', viewPostsSchema);

module.exports = ViewPosts;
