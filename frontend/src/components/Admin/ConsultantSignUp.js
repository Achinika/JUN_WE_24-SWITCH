import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Card, CardContent, makeStyles, Link } from '@material-ui/core';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    card: {
        padding: theme.spacing(4),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ConsultantSignUp = () => {
    const classes = useStyles();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dob, setDob] = useState('');
    const [indus, setIndus] = useState('');
    const [location, setlocation] = useState('');
    const [type, setType] = useState('Consultant');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validatePassword()) return;
        if (!validateRePassword()) return;

        const admin = { name, type, dob, email, phone, password, indus, location };
        try {
            const response = await axios.post(
                `${global.APIUrl}/admin/register`,
                admin
            );            
            if (response.data.message !== "Email is Already Used") {

                Swal.fire({
                    title: "Success!",
                    text: response.data.message,
                    icon: "success",
                    confirmButtonText: "OK",
                    type: "success",
                }).then((okay) => {
                    if (okay) {
                        window.location.href = "/ConsultantLogin";
                    }
                });
            }
            else {
                Swal.fire({
                    title: "Error!",
                    text: "Email Already Taken",
                    icon: "error",
                    confirmButtonText: "OK",
                    type: "success",
                });
                setTimeout(() => {
                    window.location.href = "/ConsultantSignUp";
                }, 3000);
            }
        } catch (err) {
            Swal.fire({
                title: "Error!",
                text: "Registration Not Success",
                icon: "error",
                confirmButtonText: "OK",
                type: "success",
            });
            setTimeout(() => {
                window.location.href = "/ConsultantSignUp";
            }, 3000);
        }

    };

    const validatePassword = () => {
        if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            return false;
        }
        if (!/\d/.test(password)) {
            setPasswordError('Password must contain at least one digit');
            return false;
        }
        if (!/[a-zA-Z]/.test(password)) {
            setPasswordError('Password must contain at least one letter');
            return false;
        }
        setPasswordError('');
        return true;
    };

    const validateRePassword = () => {
        if (password !== rePassword) {
            setRePasswordError('Passwords do not match');
            return false;
        }
        setRePasswordError('');
        return true;
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon style={{ fontSize: 40 }} />
                </Avatar>
                <br />
                <Typography component="h1" variant="h5">
                    Consultant Sign Up
                </Typography>
                <br />
                <Card className={classes.card}>
                    <CardContent>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        autoComplete="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="location"
                                        label="Location"
                                        name="location"
                                        autoComplete="location"
                                        value={location}
                                        onChange={(e) => setlocation(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="indus"
                                        label="Industry"
                                        name="indus"
                                        autoComplete="indus"
                                        value={indus}
                                        onChange={(e) => setIndus(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="dob"
                                        type='date'
                                        label="Date of Birth"
                                        name="dob"
                                        autoComplete="dob"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        focused
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        id="phone"
                                        label="Phone Number"
                                        name="phone"
                                        autoComplete="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        error={!!passwordError}
                                        helperText={passwordError}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="rePassword"
                                        label="Re-enter Password"
                                        type="password"
                                        id="rePassword"
                                        autoComplete="new-password"
                                        value={rePassword}
                                        onChange={(e) => setRePassword(e.target.value)}
                                        error={!!rePasswordError}
                                        helperText={rePasswordError}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                        </form>
                        <Typography variant="body2" color="text.secondary" align="center" mt={5}>
                            {'Already have an account? '}
                            <Link href="ConsultantLogin" variant="body2">
                                Sign In
                            </Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
};

export default ConsultantSignUp;
