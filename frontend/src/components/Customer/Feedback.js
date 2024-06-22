import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    Divider,
    Avatar
} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: theme.palette.dark,
        color: theme.palette.primary,
        paddingTop: theme.spacing(4),
        textAlign: 'center',
    },
    headerText: {
        fontSize: '14px',
        letterSpacing: '2px',
    },
    section: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(10),
        marginLeft: theme.spacing(30),
        marginRight: theme.spacing(30),
    },
    card: {
        maxWidth: '100%',
        margin: theme.spacing(2),
    },
    cardMedia: {
        height: 0,
        paddingTop: '20%',
    },
    cardContent: {
        flexGrow: 1,
    },
    form: {
        marginTop: theme.spacing(3),
    },
    feedbackList: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    feedbackItem: {
        marginBottom: theme.spacing(2),
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        marginRight: '20px',
    },
}));

function Feedback() {
    const classes = useStyles();
    const fid = Math.floor(Math.random() * 1000);
    const [email, setEmail] = useState(sessionStorage.getItem("cus_mail"));
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [feedbacks, setFeedbacks] = useState([]);
    const [edtBtn, setEdtBtn] = useState(false);
    const [edfid, setEdfid] = useState('');

    useEffect(() => {
        fetchFeedbackDetails();
    }, []);

    const fetchFeedbackDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/feedback/all');
            const feedbacksWithId = response.data.map((feedback, index) => ({
                id: index + 1,
                ...feedback
            }));
            setFeedbacks(feedbacksWithId);
        } catch (error) {
            console.error('Error fetching feedback details:', error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleRatingChange = (event, newValue) => {
        setRating(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var feedback = { fid, email, description, rating };
        try {
            await axios.post(global.APIUrl + "/feedback/add", feedback)
            Swal.fire({
                title: "Success!",
                text: "Successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchFeedbackDetails();
            setTimeout(() => {
                window.location.href = "/Feedback";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed Feedback",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/Feedback";
            }, 1000);
        }
    };

    const handleEdit = (id) => {
        const feedback = feedbacks.find((feedback) => feedback.fid === id);
        setEmail(feedback.email);
        setDescription(feedback.description);
        setRating(feedback.rating);
        setEdtBtn(true);
        setEdfid(feedback.fid);
    };

    const editFun = () => {
        if (edtBtn) {
            var fid = edfid;
            const feedback = { fid, email, description, rating };
            axios.put(global.APIUrl + "/feedback/update", feedback)
                .then((response) => {
                    Swal.fire({
                        title: "Success!",
                        text: "Feedback Updated Successfully.",
                        icon: 'success',
                        confirmButtonText: "OK"
                    });
                    setTimeout(() => {
                        window.location.href = "/Feedback";
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error.message);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to Update Feedback",
                        icon: 'error',
                        confirmButtonText: "OK"
                    });
                    setTimeout(() => {
                        window.location.href = "/Feedback";
                    }, 1000);
                });
        }
    };

    const handleDelete = async (fid) => {
        try {
            await axios.delete(global.APIUrl + "/feedback/delete/" + fid);
            Swal.fire({
                title: "Success!",
                text: "Feedback Deleted Successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/Feedback";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to Delete Feedback",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/Feedback";
            }, 1000);
        }
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.header}>
                <Typography variant="h3" component="h1">Feedback</Typography>
            </div>
            <hr style={{ width: 100, }}></hr>
            <section className={classes.section}>
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={3} direction="column">
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        multiline
                                        rows={4}
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography component="legend">Rate Us</Typography>
                                    <Rating
                                        name="rating"
                                        value={rating}
                                        onChange={handleRatingChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {(edtBtn) ? (<Button onClick={editFun} variant="contained" color="primary">
                                        Edit Feedback
                                    </Button>) : (<Button type="submit" variant="contained" color="primary">
                                        Submit Feedback
                                    </Button>)}
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </section>
            <section className={classes.feedbackList}>
                <Typography variant="h5" component="h2" gutterBottom>
                    Recent Feedbacks
                </Typography>
                <Card className={classes.card}>
                    <CardContent>
                        <List>
                            {feedbacks.map((feedback) => (
                                <React.Fragment key={feedback.id}>
                                    <ListItem className={classes.feedbackItem}>
                                        <Avatar className={classes.avatar}>{feedback.email[0]}</Avatar>
                                        <ListItemText
                                            primary={feedback.email}
                                            secondary={
                                                <React.Fragment>
                                                    <Rating value={feedback.rating} readOnly />
                                                    <br />
                                                    {feedback.description}
                                                </React.Fragment>
                                            }
                                        />
                                        {(email === feedback.email) && (
                                            <div>
                                                <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={() => handleEdit(feedback.fid)}>Edit</Button>
                                                &nbsp;
                                                <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(feedback.fid)}>Delete</Button>
                                            </div>
                                        )}

                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </React.Fragment>
                            ))}
                        </List>

                    </CardContent>
                </Card>
            </section>
            <Footer />
        </div>
    );
}

export default Feedback;
