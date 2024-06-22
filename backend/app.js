const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const url = process.env.ATLAS_URI;
global.URL = url;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB connection successfully");
});

const admin = require('./routes/admin.js');
app.use('/admin', admin);

const user = require('./routes/user.js');
app.use('/user', user);

const chat = require('./routes/chat.js');
app.use('/chat', chat);

const feedback = require('./routes/feedback.js');
app.use('/feedback', feedback);

const support = require('./routes/support.js');
app.use('/support', support);

const businessPost = require('./routes/businessPost.js');
app.use('/businessPost', businessPost);

const jobs = require('./routes/jobs.js');
app.use('/jobs', jobs);

const viewPosts = require('./routes/viewPosts.js');
app.use('/viewPosts', viewPosts);

const apply = require('./routes/apply.js');
app.use('/apply', apply);

const conv = require('./routes/conv.js');
app.use('/conv', conv);

const rideShareD = require('./routes/rideShareD.js');
app.use('/rideShareD', rideShareD);

const rideShareP = require('./routes/rideShareP.js');
app.use('/rideShareP', rideShareP);

const link = require('./routes/link.js');
app.use('/link', link);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});