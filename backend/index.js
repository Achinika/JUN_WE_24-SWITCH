import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';

import AuthRoute from './Routes/AuthRoute.js';
import userRoute from './Routes/userRoute.js';

import UserModel from './Models/userModel.js';

//Middleware-create instant for the server
const app = express();

//enable middleware
app.use(bodyParser.json({limit:'30mb', extended:true})); //parse incoming requests of
app.use(bodyParser.urlencoded({limit:'30mb', extended:true}));

dotenv.config();

//connect with mongoDB database
mongoose.connect(process.env.MONGO_DB)
.then(() => 
    app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`)
))
.catch((error) => console.log(error)); //catch errors


//usage of routes
app.use('/auth',AuthRoute); //authentications
app.use('/user',userRoute); //for  user related operations

// Define the route for switching to employer account
app.get('/auth/switchEmployer/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        //find user by id
        const user = await UserModel.findById(userId).select('isEmployer');
        
        if(!user){
            return  res.status(404).json ({message: 'User Not Found'});
        }

        //update user account to employer
        user.accountType = 'employer';

        //save update user data
        await user.save();
        res.status(200).json({ message: 'User account switched to employer' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Define the route for switching to consultant account
app.get('/auth/switchconsultant/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        //find user by id
        const user = await UserModel.findById(userId).select('isconsultant');
        
        if(!user){
            return  res.status(404).json ({message: 'User Not Found'});
        }

        //update user account to consultant
        user.accountType = 'consultant';

        //save update user data
        await user.save();
        res.status(200).json({ message: 'User account switched to consultant' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



// Define the route for switching to business account
app.get('/auth/switchBusiness/:userId', async(req, res) => {
    const userId = req.params.userId;

    try {
        //find user by id
        const user = await UserModel.findById(userId).select('isBusiness');
        
        if(!user){
            return  res.status(404).json ({message: 'User Not Found'});
        }

        //update user account to business
        user.accountType = 'business';

        //save update user data
        await user.save();
        res.status(200).json({ message: 'User account switched to business' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Handle undefined routes
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

// Handle errors
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});