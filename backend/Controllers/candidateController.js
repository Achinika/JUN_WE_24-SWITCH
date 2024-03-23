import CandidatesApplications from '../models/model.js';

// Apply for a job
export const applyForJob = async (req, res) => {
    try {
        // Extract job application details from request body
        const { jobId, firstName, lastName, location, experienceLevel, minimumEduLevel, uploadFile } = req.body;

        // Create a new job application instance
        const newApplication = new CandidatesApplications({
            jobId,
            firstName,
            lastName,
            location,
            experienceLevel,
            minimumEduLevel,
            uploadFile
        });

        // Save the new job application
        const savedApplication = await newApplication.save();

        res.status(200).json(savedApplication);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
