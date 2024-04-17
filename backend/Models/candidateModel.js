import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define enums for experience levels
const experienceLevelEnum = ['Intern', 'Entry Level', 'Mid Level', 'Senior Level', 'Executive Level'];

// Define enums for education levels
const educationLevelEnum = ['High School', 'Associate Degree', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'];

const candidateSchema = new Schema({
    job: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
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
});

const CandidateModel = mongoose.model('Candidate', candidateSchema);

export default CandidateModel;