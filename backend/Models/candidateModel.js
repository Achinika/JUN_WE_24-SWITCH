/*import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define enums for experience levels
const experienceLevelEnum = ['Intern', 'Entry Level', 'Mid Level','Senior Level', 'Executive Level'];

// Define enums for job types
const minimumEduLevelEnum = ['PhD Degree', 'MasterDegree', 'Bachalor Degree', 'Associate Degree', 'HND', 'NVQ Level-4', 'A/L'];

const candiApplicationSchema = new Schema({
    jobId: {
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
   
    minimumEduLevel: {
        type: String,
        enum: minimumEduLevelEnum,
        required: true
    },
    uploadFile: {
        type: String,
        required: true
    }
});

const CandidatesApplications = mongoose.model('CandidatesApplications', candiApplicationSchema);

export default CandidatesApplications;*/