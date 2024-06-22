import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../APIUrl'
import Footer from '../Main/Footer';
import Navbar from '../Main/NavBar.js';
import Copyright from '../Main/Copyright';

const defaultTheme = createTheme();

export default function RideShare() {
    const quotes = ["“Our customer service team is ready to assist registered users in situations requiring particular assistance."]
    const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
        }, 5000);

        return () => clearInterval(intervalId);

    },);


    return (
        <ThemeProvider theme={defaultTheme}>
            <Navbar />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://greenerideal.com/wp-content/uploads/2021/07/benefits-of-carpooling.jpg)',
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
                           WE CONNECT
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
                            DRIVERS & PASSENGERS
                        </Typography>
                        <br />
                        <br />
                       
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
                           <DriveEtaOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h4">
                            <b>Ride Share</b>
                        </Typography>
                        <Box component="form" sx={{ mt: 1 }}>
                          
        
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="warning"
                                sx={{ mt: 3, mb: 2 }}
                            >

                            <Grid container>
                                <Grid item>
                                {" "}
                                    <Link href="RideShareD" variant="body2">
                                        {"Become a driver"}
                                    </Link>
                                </Grid>
                                </Grid> 
                                
                            </Button>
                          
                            <Button
                                component={Link} // Use the Link component from React Router
                                to="RideShare"
                                type="RideShareP"
                                fullWidth
                                variant="contained"
                                color="warning"
                                sx={{ mt: 3, mb: 2 }}
                            >
                
                            <Grid container>
                                <Grid item>
                                {" "}
                                    <Link href="RideShareP" variant="body2">
                                        {"Become a passenger"}
                                    </Link>
                                </Grid>
                                </Grid>    
                                
                            </Button>

                           
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Footer />
        </ThemeProvider>
    );
}