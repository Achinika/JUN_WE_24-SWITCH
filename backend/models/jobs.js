const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define enums for experience levels
const experienceLevelEnum = ['Intern', 'Entry Level', 'Manager Level', 'Senior Level', 'Executive Level'];

// Define enums for education levels
const educationLevelEnum = ['High School', 'Associate Degree', 'Bachelor Degree', 'Master Degree', 'PhD'];


const jobSchema = new Schema({
    pid: {
        type: String,
        required: true,
        unique: true
    },
    company: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    experienceLevel: {
        type: String,
        enum: experienceLevelEnum,
        required: true
    },
    minEducationLevel: {
        type: String,
        enum: educationLevelEnum,
        required: true
    },
    responsibilities: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        required: true
    },
    picture: {
        type: String
    }
}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
