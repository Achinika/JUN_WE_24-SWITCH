import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, IconButton } from '@material-ui/core';
import { Facebook, Twitter, Instagram, LocationOn, Email, Phone, Print } from '@material-ui/icons';
import Logo from '../Images/switch.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import Copyright from '../Main/Copyright';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: '#212121',
        color: theme.palette.primary.contrastText,
        padding: theme.spacing(4),
    },
    socialIcons: {
        '& > *': {
            marginRight: theme.spacing(2),
            color: theme.palette.warning.main,
        },
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.contrastText,
        marginRight: theme.spacing(2),
    },
    contactGrid: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    contactIcon: {
        marginRight: theme.spacing(1),
    },
    logo: {
        width: '100px',
        marginBottom: theme.spacing(2),
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'right',
    },
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Grid container spacing={4} justifyContent="center">
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        SWITCH
                    </Typography>
                    <Typography variant="body1">
                        SWITCH is a platform that connects students with professionals in the industry.
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Useful Links
                    </Typography>
                    <Typography variant="body1">
                        <Link to="#" className={classes.link}>SWITCH</Link>
                        <br />
                        <a href="EmployeeLogin" className={classes.link}>Employee</a>
                        <br />                        
                        <a href="ConsultantLogin" className={classes.link}>Consultant</a>
                        <br />
                        <a href="BusinessLogin" className={classes.link}>Business</a>
                        <br />
                        <Link to="#" className={classes.link}>Privacy Policy</Link>
                    </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Contact
                    </Typography>
                    <div className={classes.contactGrid}>
                        <LocationOn className={classes.contactIcon} />
                        <Typography variant="body1">
                            Mal Street, Union Place, Colombo
                        </Typography>
                    </div>
                    <div className={classes.contactGrid}>
                        <Email className={classes.contactIcon} />
                        <Typography variant="body1">
                            switch@gmail.com
                        </Typography>
                    </div>
                    <div className={classes.contactGrid}>
                        <Phone className={classes.contactIcon} />
                        <Typography variant="body1">
                            +94 11 90 2903
                        </Typography>
                    </div>
                    <div className={classes.contactGrid}>
                        <Print className={classes.contactIcon} />
                        <Typography variant="body1">
                            +94 33 78 9029
                        </Typography>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>
                        Connect with Us
                    </Typography>
                    <div className={classes.socialIcons}>
                        <IconButton>
                            <Facebook />
                        </IconButton>
                        <IconButton>
                            <Twitter />
                        </IconButton>
                        <IconButton>
                            <Instagram />
                        </IconButton>
                    </div>
                    <div className={classes.logoContainer}>
                        <img src={Logo} alt="Company Logo" className={classes.logo} />
                    </div>
                </Grid>
            </Grid>
            <Typography variant="body1" align="center" style={{ marginTop: '2rem' }}>
                <Copyright />
            </Typography>
        </footer>
    );
};

export default Footer;
