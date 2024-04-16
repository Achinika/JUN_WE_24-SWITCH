import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define enums for experience levels
const experienceLevelEnum = ['Intern', 'Entry Level', 'Mid Level','Senior Level', 'Executive Level'];

// Define enums for job types
const jobTypeEnum = ['Remote', 'Physical'];

const jobSchema = new Schema({
    employer: {
        type: Schema.Types.ObjectId,
        ref: 'Employer'
    },
    jobTitle: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    postedDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    closingDate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Check if the closing date is in the future
                return value && value > new Date();
            },
            message: props => `Closing date must be in the future`
        }
    },
    experienceLevel: {
        type: String,
        enum: experienceLevelEnum,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        enum: jobTypeEnum,
        required: true
    },
    contactNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v); // Validate phone number format (10 digits)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    contactEmail: {
        type: String,
        required: true,
        match: [ // Use a regex pattern to validate email format
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please enter a valid email"]
    }
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
