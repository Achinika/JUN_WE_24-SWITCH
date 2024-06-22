const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define enums for experience levels
const experienceLevelEnum = ['Intern', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive Level'];

// Define enums for education levels
const educationLevelEnum = ['High School', 'Associate Degree', 'Bachelor Degree', 'Master Degree', 'PhD'];

const candidateSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    name: {
        type: String,
        required: true,
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
    description: {
        type: String,
        required: true
    },
    cv: {
        type: String, // This could be a path to a file or a cloud storage URI
        required: true
    },
    appliedDate: {
        type: Date,
        default: Date.now,
        required: true
    }
}, {
    timestamps: true
});

const Candidate = mongoose.model('Candidates', candidateSchema);

module.exports = Candidate;
