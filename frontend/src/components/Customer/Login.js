import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../APIUrl'
import Footer from '../Main/Footer';
import LogInNavbar from '../Main/LogInNavbar';
import Copyright from '../Main/Copyright';

const defaultTheme = createTheme();

export default function LogIn() {
    const quotes = ["“You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something - your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.” - Steve Jobs", "“Part of being a winner is knowing when enough is enough. Sometimes you have to give up the fight and walk away, and move on to something that’s more productive.” -Donald Trump", "“If you are hardworking and determined, you will make it and that’s the bottom line. I don’t believe in an easy way.” -Isabel dos Santos"]
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(intervalId);

    },);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');

        if (!email || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'All fields are required!',
            });
            return;
        }


        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid email address',
            });
            return;
        }

        let user = { email, password };

        try {
            const response = await axios.post(global.APIUrl + "/user/login", user);

            if (response.data.message === true) {
                sessionStorage.setItem("cus_mail", email);

                await Swal.fire({
                    title: "Success!",
                    text: "Login Success",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/";
            } else {
                await Swal.fire({
                    title: "Error!",
                    text: "Login Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "error"
                });
                window.location.href = "/";
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: "Error!",
                text: "Login Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "error"
            });
            window.location.href = "/";
        }

    };



    return (
        <ThemeProvider theme={defaultTheme}>
            <LogInNavbar />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://img.freepik.com/free-photo/focused-leader-woman-enter-office-meeting-room-lean-conference-table-brainstorming-business-company-presentation-late-night-diverse-multi-ethnic-teamwork-solving-management-strategy_482257-16485.jpg?t=st=1715232732~exp=1715236332~hmac=05d713e9572ae62f338108a10367f064218896ac0ad6b0680ebfe82f6df5c3d0&w=360)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <Box
                        sx={{
                            my: 16,
                            mx: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'black',
                            textAlign: 'center',
                            padding: '2rem',
                        }}
                    >
                        <Typography
                            component="h1"
                            variant="h2"
                            sx={{
                                marginBottom: '1rem',
                                color: '#fff',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                                fontWeight: 'bold',
                                paddingRight: '214px',
                                opacity: 1,
                            }}
                        >
                            Build Your Own,
                        </Typography>
                        <Typography
                            component="h1"
                            variant="h2"
                            sx={{
                                marginBottom: '1rem',
                                color: '#fff',
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
                                fontWeight: 'bold',
                                paddingLeft: '214px',
                                opacity: 1,
                            }}
                        >
                            Life Perfectly,
                        </Typography>
                        <br />
                        <br />
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: '#fff',
                                fontStyle: 'italic',
                                marginTop: '0.5rem',
                                letterSpacing: '0.5px',
                                lineHeight: '1.5',
                                fontSize: '23px',
                                opacity: 1,
                                transition: 'opacity 0.5s ease-in-out',
                                fontWeight: 'bold',
                            }}
                        >
                            {quotes[currentQuoteIndex]}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 20,
                            mx: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            <b>Log In</b>
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="warning"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Log In
                            </Button>
                            <Grid container>
                                <Grid item>
                                    Don't have an account? {" "}
                                    <Link href="Register" variant="body2">
                                        {"Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography align="center" sx={{paddingTop: "50px"}}>
                                <Copyright sx={{ mt: 5 }} />
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    );
}