import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar, MenuItem } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';

const EmployeeEditForm = () => {
    const [newPost, setNewPost] = useState({
        pid: '',
        company: '',
        position: '',
        experienceLevel: '',
        minEducationLevel: '',
        responsibilities: '',
        email: '',
        phone: '',
        location: '',
        availability: '',
    });

    const [errors, setErrors] = useState({});

    const info = JSON.parse(localStorage.getItem("selectedJob"));

    useEffect(() => {
        if (info.editBtn) {
            setNewPost(info.row);
        }
    }, [info]);

     //select options for education and experience level
     const experienceLevelEnum = ['Intern', 'Entry Level', 'Manager Level', 'Senior Level', 'Executive Level'];
     const educationLevelEnum = ['High School', 'Associate Degree', 'Bachelor Degree', 'Master Degree', 'PhD'];

    const handleEditPost = async () => {
        if (validateForm()) {
            try {
                await axios.put(global.APIUrl + `/jobs/update/${newPost.pid}`, newPost);
                Swal.fire({
                    title: "Success!",
                    text: "Updated successfully.",
                    icon: 'success',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedJob', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/Employee";
                }, 1000);
            } catch (error) {
                console.log(error.message);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to Updated.",
                    icon: 'error',
                    confirmButtonText: "OK"
                });
                localStorage.setItem('selectedJob', JSON.stringify({}));
                setTimeout(() => {
                    window.location.href = "/Employee";
                }, 1000);
            }
        }
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!newPost.company.trim()) {
            errors.company = 'Company is required';
            isValid = false;
        }

        if (!newPost.position.trim()) {
            errors.position = 'Position is required';
            isValid = false;
        }

        if (!newPost.experienceLevel.trim()) {
            errors.experienceLevel = 'Experience Level is required';
            isValid = false;
        }

        if (!newPost.minEducationLevel.trim()) {
            errors.minEducationLevel = 'Education Level is required';
            isValid = false;
        }

        if (!newPost.responsibilities.trim()) {
            errors.responsibilities = 'Responsibilities is required';
            isValid = false;
        }

        if (!newPost.email.trim()) {
            errors.email = 'Email is required';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(newPost.email)) {
            errors.email = 'Email address is invalid';
            isValid = false;
        }

        if (!newPost.phone.trim()) {
            errors.phone = 'Phone is required';
            isValid = false;
        }

        if (!newPost.location.trim()) {
            errors.location = 'Location is required';
            isValid = false;
        }

        if (!newPost.availability.trim()) {
            errors.availability = 'Availability is required';
            isValid = false;
        }

        setErrors(errors);
        return isValid;
    };

    const handleCancel = () => {
        localStorage.setItem('selectedJob', JSON.stringify({}));
        window.location.href = "/Employee";
    };

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#E7D8E4' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Edit Post
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button variant="contained" color="primary" onClick={handleEditPost}>
                        Edit Post
                    </Button>
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Cancel
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="h6" style={{ marginBottom: '10px' }}>
                                Edit Job Post
                            </Typography>
                            <hr />
                        </Grid>
                        {/* Add your form fields here */}
                        <Grid item xs={12}>
                            <TextField
                                label="Company"
                                fullWidth
                                placeholder='A4562'
                                value={newPost.company}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, company: e.target.value }))}
                                error={!!errors.company}
                                helperText={errors.company}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Position"
                                fullWidth
                                value={newPost.position}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, position: e.target.value }))}
                                error={!!errors.position}
                                helperText={errors.position}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Experience Level"
                                fullWidth
                                select
                                value={newPost.experienceLevel}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, experienceLevel: e.target.value }))}
                                error={!!errors.experienceLevel}
                                helperText={errors.experienceLevel}
                            >
                                 {experienceLevelEnum.map((level, index) => (
                                    <MenuItem key={index} value={level}>
                                    {level}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Education Level"
                                fullWidth
                                select
                                value={newPost.minEducationLevel}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, minEducationLevel: e.target.value }))}
                                error={!!errors.minEducationLevel}
                                helperText={errors.minEducationLevel}
                            >
                            {educationLevelEnum.map((level, index) => (
                                <MenuItem key={index} value={level}>
                                {level}
                                </MenuItem>
                            ))}

                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Responsibilities"
                                fullWidth
                                value={newPost.responsibilities}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, responsibilities: e.target.value }))}
                                error={!!errors.responsibilities}
                                helperText={errors.responsibilities}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                fullWidth
                                value={newPost.email}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, email: e.target.value }))}
                                error={!!errors.email}
                                helperText={errors.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                type='number'
                                fullWidth
                                value={newPost.phone}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, phone: e.target.value }))}
                                error={!!errors.phone}
                                helperText={errors.phone}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Location"
                                fullWidth
                                value={newPost.location}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, location: e.target.value }))}
                                error={!!errors.location}
                                helperText={errors.location}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Availability"
                                type='date'
                                fullWidth
                                value={newPost.availability}
                                onChange={(e) => setNewPost(prevState => ({ ...prevState, availability: e.target.value }))}
                                error={!!errors.availability}
                                helperText={errors.availability}
                                focused
                            />
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    );
};

export default EmployeeEditForm;
