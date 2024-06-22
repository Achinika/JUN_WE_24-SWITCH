import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card,CardContent,Grid,Typography,TextField,Button,Divider,} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    section: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        marginBottom: theme.spacing(30),
    },
    card: {
        maxWidth: '100%',
        paddingTop: theme.spacing(5),
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        marginTop: theme.spacing(2),
    },
    textField: {
        marginBottom: theme.spacing(2),
        width: '100%',
    },
}));

function Jobs() {
    const classes = useStyles();
    const [jobs, setJobs] = useState([]);
    const [experiences, setExperiences] = useState({});
    const email = sessionStorage.getItem("cus_mail");
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/jobs/all');
            const employeesWithId = response.data.map((job, index) => ({
                id: index + 1,
                ...job
            }));
            setJobs(employeesWithId);
        } catch (error) {
            console.error('Error fetching jobs details:', error);
        }
    };

    const handleApply = async (job) => {
        if (experiences[job.pid]) {
            const experienceData = {
                jobId: job.pid,
                companyName: job.company,
                position: job.position,
                experience: experiences[job.pid],
                email: email
            };
            try {
                const response = await axios.post(global.APIUrl + '/apply/add', experienceData);
                if (response.status === 200) {
                    Swal.fire({
                        title: 'Application Submitted',
                        text: 'Your application for ' + job.position + ' at ' + job.company + ' has been submitted successfully!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                    setTimeout(() => {
                        window.location.href = "/Jobs";
                    }, 1000);
                } else {
                    Swal.fire({
                        title: 'Application Failed',
                        text: 'There was an error submitting your application. Please try again later.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                    setTimeout(() => {
                        window.location.href = "/Jobs";
                    }, 1000);
                }
            } catch (error) {
                console.error('Error applying for job:', error);
                Swal.fire({
                    title: 'Application Failed',
                    text: 'There was an error submitting your application. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } else {
            Swal.fire({
                title: 'Application Incomplete',
                text: 'Please add your experience and upload a photo to apply for this job.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    };

    const handleExperienceChange = (e, jobId) => {
        setExperiences({ ...experiences, [jobId]: e.target.value });
    };

    const handleSearch = () => {
        if (!searchTerm) {
            fetchEmployeeDetails();
            return;
        }
        const filteredJobs = jobs.filter(job =>
            job.position.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setJobs(filteredJobs);
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container spacing={3} className={classes.section}>
                <Grid item xs={6} md={2} style={{ marginLeft: 550 }}>
                    <TextField
                        label="Search by Position"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
                {jobs.map(job => (
                    <Grid item xs={12} sm={6} md={4} key={job.pid}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography variant="h5" gutterBottom>{job.company}</Typography>
                                <Typography variant="subtitle1" gutterBottom>{job.position}</Typography>
                                <Divider style={{ marginBottom: '10px' }} />
                                <Typography variant="body2" gutterBottom><strong>Requirements:</strong></Typography>
                                <Typography variant="body2" paragraph>{job.requirements}</Typography>
                                <Typography variant="body2" gutterBottom><strong>Responsibilities:</strong></Typography>
                                <Typography variant="body2" paragraph>{job.responsibilities}</Typography>
                                <Divider style={{ marginBottom: '10px' }} />
                                <Typography variant="body2" gutterBottom><strong>Email:</strong> {job.email}</Typography>
                                <Typography variant="body2" gutterBottom><strong>Phone:</strong> {job.phone}</Typography>
                                <Typography variant="body2" gutterBottom><strong>Location:</strong> {job.location}</Typography>
                                <Typography variant="body2" gutterBottom><strong>Ending Date:</strong> {job.availability}</Typography>
                                <br />
                                <TextField
                                    label="Years of Experience"
                                    variant="outlined"
                                    fullWidth
                                    className={classes.textField}
                                    value={experiences[job.pid] || ''}
                                    onChange={(e) => handleExperienceChange(e, job.pid)}
                                    type='number'
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    className={classes.button}
                                    onClick={() => handleApply(job)}
                                    disabled={!experiences[job.pid]}
                                >
                                    Apply
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </div>
    );
}

export default Jobs;
