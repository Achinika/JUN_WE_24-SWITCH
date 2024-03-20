import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import dotenv from 'dotenv';
import AuthRoute from './Routes/AuthRoute.js'
import businessRoute from './Routes/businessRoute.js'

//Routes






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
app.use('/auth',AuthRoute)
app.use('/business',businessRoute)