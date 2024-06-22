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
import '../APIUrl';
import Footer from '../Main/Footer';
import LogInNavbar from '../Main/LogInNavbar';
import Copyright from '../Main/Copyright';


const defaultTheme = createTheme();

export default function SignUpSide() {
    const quotes = ["“You can't connect the dots looking forward; you can only connect them looking backwards. So you have to trust that the dots will somehow connect in your future. You have to trust in something - your gut, destiny, life, karma, whatever. This approach has never let me down, and it has made all the difference in my life.” - Steve Jobs", "“Part of being a winner is knowing when enough is enough. Sometimes you have to give up the fight and walk away, and move on to something that’s more productive.” -Donald Trump", "“If you are hardworking and determined, you will make it and that’s the bottom line. I don’t believe in an easy way.” -Isabel dos Santos"];
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
        const name = data.get('name');
        const phone = data.get('phone');
        const dob = data.get('dob');
        const type = 'Customer';

        if (!name || !email || !password || !phone || !dob || !type) {
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

        if (password.length < 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password must be at least 8 characters long',
            });
            return;
        }

        try {
            const user = { email, password, name, phone, dob, type };
            const response = await axios.post(
                `${global.APIUrl}/user/register`,
                user
            );

            if (response.data.message !== 'Email is Already Used') {
                Swal.fire({
                    title: 'Success!',
                    text: response.data.message,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    type: 'success',
                }).then((okay) => {
                    if (okay) {
                        window.location.href = '/';
                    }
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Email Already Taken',
                    icon: 'error',
                    confirmButtonText: 'OK',
                    type: 'error',
                });
                setTimeout(() => {
                    window.location.href = '/register';
                }, 3000);
            }
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Registration Not Success',
                icon: 'error',
                confirmButtonText: 'OK',
                type: 'error',
            });
            setTimeout(() => {
                window.location.href = '/register';
            }, 3000);
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
                        backgroundImage: 'url(https://images.pexels.com/photos/2887582/pexels-photo-2887582.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)',
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
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
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
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
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
                            my: 14,
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
                            <b>Sign Up</b>
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                autoComplete="name"
                                autoFocus
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                autoComplete="phone"
                                autoFocus
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                id="dob"
                                label="Date Of Birth"
                                name="dob"
                                autoComplete="dob"
                                focused
                                type='date'
                                required
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                required
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                color="warning"
                            >
                                Sign Up
                            </Button>
                            <Grid container>
                                <Grid item>
                                    Already have an account?{' '}
                                    <Link href="/Login" variant="body2">
                                        {'Log In'}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Typography align="center" sx={{ paddingTop: "50px" }}>
                                <Copyright sx={{ mt: 5 }} />
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </ThemeProvider>
    );
}
