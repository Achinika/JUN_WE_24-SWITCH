import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    TextField,
    Button,
    Divider,
    
} from '@material-ui/core';

import Footer from '../Main/Footer.js';

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
}));

function RideShareD() {
    const classes = useStyles();
    const rid = Math.floor(Math.random() * 1000);
    const [email, setEmail] = useState(sessionStorage.getItem("cus_mail"));
    const [startPoint, setstartPoint] = useState('');
    const [endPoint, setendPoint] = useState('');
    const [time, settime] = useState('');
    const [passengerCount, setpassengerCount] = useState('');
    const [edtBtn, setEdtBtn] = useState(false);
    const [edrid, setEdrid] = useState('');
    const [rideShareD, setRideShareD] = useState([]);

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/rideShareD/all');
            const rideShareDWithId = response.data.map((rideShareD, index) => ({
                id: index + 1,
                ...rideShareD
            }));
            setRideShareD(rideShareDWithId);
        } catch (error) {
            console.error('Error fetching rideShareD details:', error);
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlestartPointChange = (event) => {
        setstartPoint(event.target.value);
    };

    const handleendPointChange = (event) => {
        setendPoint(event.target.value);
    };

    const handletimeChange = (event) => {
        settime(event.target.value);
    };

    const handlepassengerCountChange = (event) => {
        setpassengerCount(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        var data = { rid, email, startPoint, endPoint, time, passengerCount };
        try {
            await axios.post(global.APIUrl + "/rideShareD/add", data)
            Swal.fire({
                title: "Success!",
                text: "Successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            fetchDetails();
            setTimeout(() => {
                window.location.href = "/RideShareD";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed RideShareD",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/RideShareD";
            }, 1000);
        }
    };

    const handleEdit = (id) => {
        const data = rideShareD.find((rideShareD) => rideShareD.rid === id);
        setEmail(data.email);
        setEdtBtn(true);
        setEdrid(data.rid);
        setstartPoint(data.startPoint);
        setendPoint(data.endPoint);
        settime(data.time);
        setpassengerCount(data.passengerCount);        
    };

    const editFun = () => {
        if (edtBtn) {
            var rid = edrid;
            const data = { rid, email, startPoint, endPoint, time, passengerCount};
            axios.put(global.APIUrl + "/rideShareD/update", data)
                .then((response) => {
                    Swal.fire({
                        title: "Success!",
                        text: "RideShareD Updated Successfully.",
                        icon: 'success',
                        confirmButtonText: "OK"
                    });
                    setTimeout(() => {
                        window.location.href = "/RideShareD";
                    }, 1000);
                })
                .catch((error) => {
                    console.log(error.message);
                    Swal.fire({
                        title: "Error!",
                        text: "Failed to Update RideShareD",
                        icon: 'error',
                        confirmButtonText: "OK"
                    });
                    setTimeout(() => {
                        window.location.href = "/RideShareD";
                    }, 1000);
                });
        }
    };

    const handleDelete = async (rid) => {
        try {
            await axios.delete(global.APIUrl + "/rideShareD/delete/" + rid);
            Swal.fire({
                title: "Success!",
                text: "RideShareD Deleted Successfully.",
                icon: 'success',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/RideShareD";
            }, 1000);
        } catch (error) {
            console.log(error.message);
            Swal.fire({
                title: "Error!",
                text: "Failed to Delete RideShareD",
                icon: 'error',
                confirmButtonText: "OK"
            });
            setTimeout(() => {
                window.location.href = "/RideShareD";
            }, 1000);
        }
    }

    return (
        <div className={classes.root}>
           
            <div className={classes.header}>
                <Typography variant="h3" component="h1">Ride Sharing For Driver</Typography>
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
                                        id="startPoint"
                                        label="Start Point"
                                        rows={4}
                                        value={startPoint}
                                        onChange={handlestartPointChange}
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="endPoint"
                                        label="End Point"
                                        rows={4}
                                        value={endPoint}
                                        onChange={handleendPointChange}
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="time"
                                        label="Time"
                                        rows={4}
                                        value={time}
                                        onChange={handletimeChange}
                                        type='time'
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="passengerCount"
                                        label="Passenger Count"
                                        rows={4}
                                        value={passengerCount}
                                        onChange={handlepassengerCountChange}
                                        type='number'
                                        focused
                                        InputProps={{
                                            inputProps: {
                                                min: 0
                                            }
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    {(edtBtn) ? (<Button onClick={editFun} variant="contained" color="primary">
                                        Edit
                                    </Button>) : (<Button type="submit" variant="contained" color="primary">
                                        Add
                                    </Button>)}
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </section>
            <section className={classes.feedbackList}>               
                <Grid container spacing={3}>
                    {rideShareD.map((data) => (
                        <Grid item xs={12} sm={6} md={4} key={data.rid}>
                            <Card className={classes.card}>
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Ride Share ID: {data.rid}
                                    </Typography>
                                    <Divider />
                                    <Typography gutterBottom variant="h7" component="h3">
                                        Start Point: {data.startPoint}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="h3">
                                        End Point: {data.endPoint}
                                    </Typography>
                                    <Typography gutterBottom variant="h6" component="p">
                                        Time: {data.time}
                                    </Typography>
                                    <Typography gutterBottom variant="h7" component="h3">
                                        Passenger Count: {data.passengerCount}
                                    </Typography>
                                    <br/>
                                    {(email === data.email) && (
                                        <div>
                                            <Button style={{ backgroundColor: 'black', color: 'white' }} onClick={() => handleEdit(data.rid)}>Edit</Button>
                                            &nbsp;
                                            <Button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => handleDelete(data.rid)}>Delete</Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>                
            </section>
            <Footer />
        </div>
    );
}

export default RideShareD;
