import React, { useState, useEffect } from 'react';
import Navbar from '../Main/NavBar';
import LogInNavbar from '../Main/LogInNavbar';
import Footer from '../Main/Footer';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardActionArea, CardContent, CardMedia, Grid, IconButton } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import img1 from '../Images/img-1.jpg';
import img2 from '../Images/image-2.jpg';
import img3 from '../Images/image-3.jpg';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(4),
  },
  card: {
    maxWidth: 345,
    margin: theme.spacing(2),
  },
  media: {
    height: 200,
    width: 350,
  },
  carousel: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: '700px',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '50%',
    padding: theme.spacing(1),
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
  },
  prevArrow: {
    left: theme.spacing(2),
  },
  nextArrow: {
    right: theme.spacing(2),
  },
  description: {
    position: 'absolute',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#E7D8E4',
    padding: theme.spacing(2),
    width: '85%',
  },
}));

const HomePage = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const email = sessionStorage.getItem("cus_mail");
  const carouselImages = [img1, img2, img3];

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [carouselImages.length]);

  const handlePrevSlide = () => {
    setActiveStep((prevStep) => (prevStep === 0 ? carouselImages.length - 1 : prevStep - 1));
  };

  const handleNextSlide = () => {
    setActiveStep((prevStep) => (prevStep === carouselImages.length - 1 ? 0 : prevStep + 1));
  };



  return (
    <div>
      {email === null || email === 'empty' ? (
        <LogInNavbar />
      ) : (
        <Navbar />
      )}
      <div className={classes.root}>
        <Typography style={{ paddingTop: '60px' }} variant="h2" align="center" className={classes.title}>
          Connet With SWITCH
          <hr style={{ width: '600px' }}></hr>
        </Typography>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={'auto'} >
            <div className={classes.carousel}>
              <SwipeableViews index={activeStep} onChangeIndex={handleStepChange}>
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <img src={image} alt={`${index + 1}`} className={classes.carouselImage} />
                  </div>
                ))}
              </SwipeableViews>
              <Typography variant="body1" className={classes.description} align="center">
                <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
                  SWITCH
                </Typography>
                <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>

                  SWITCH – where social media transcends the ordinary. Step into a world where connections are meaningful, conversations are authentic, and positivity reverberates through every interaction. Our platform is designed to prioritize quality over quantity, fostering genuine connections and enriching experiences. With innovative features like Echo, personalized content feeds, and robust privacy controls, environment offers a new paradigm in social networking. Join us today and embark on a journey where meaningful connections thrive and authenticity reigns supreme. Welcome to the future of social media.
                </Typography>
              </Typography>

              <IconButton className={`${classes.arrow} ${classes.prevArrow}`} onClick={handlePrevSlide}>
                <ArrowBackIcon />
              </IconButton>
              <IconButton className={`${classes.arrow} ${classes.nextArrow}`} onClick={handleNextSlide}>
                <ArrowForwardIcon />
              </IconButton>
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/young-businessman-office_23-2148205641.jpg?w=996&t=st=1715232578~exp=1715233178~hmac=981c091e12b3f70ce5144abe98408f3250fd331fa9123e110bdbde80101dd82c"
                  title="IT"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Wilson John
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "The innovative Echo feature on Environment is a game-changer. It's incredible to see how user engagement is amplified, spreading positivity and meaningful content throughout the community."
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/young-handsome-business-man-choosing-car-car-showroom_1303-17901.jpg?t=st=1715232005~exp=1715235605~hmac=359c2a99d4b259e42957ad6203856c802984ece17db3a4413cac4989dd88e938&w=996"
                  title="Business"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Nathan Cams
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "As a business owner, I appreciate how Environment fosters genuine connections and meaningful interactions. It's refreshing to see a social media platform prioritize quality over quantity
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/cheerful-young-caucasian-businessman_171337-727.jpg?w=996&t=st=1715232336~exp=1715232936~hmac=fdf599a9ba9035d0a5a9b5d807593ef7f18b7cfc6c6dfd9af67a4bcf52dc1c81"
                  title="Business"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Rohan weeraman
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "Environment's personalized content feeds are spot-on! As someone in the business field, I'm impressed by how accurately it tailors content to match my interests and preferences."
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <hr />
        <Typography variant="body1" style={{ paddingTop: '20px', paddingBottom: '20px', backgroundColor: '#eeeeee' }} align="center">
          <Typography variant="h4" component="h3" gutterBottom style={{ fontWeight: 'bold' }}>
            SWITCH Life
            <hr style={{ width: '500px', }}></hr>
          </Typography>
          <Typography variant="body1" style={{ fontSize: '1.2rem', fontWeight: 'lighter' }}>
            SWITCH Life – your gateway to a world where financial empowerment meets personal fulfillment. We believe that true prosperity encompasses more than just wealth; it's about achieving balance and fulfillment in every aspect of life. At Profitni Life, we're dedicated to providing you with the tools, resources, and insights to unlock your full potential and live a life of abundance on your own terms. From financial strategies and investment tips to wellness practices and personal development, we're here to support you on your journey to success and fulfillment. Join us as we redefine what it means to live a profitable life – one that's rich in purpose, passion, and prosperity.    </Typography>
        </Typography>
        <hr />
        <Grid container justifyContent="center" spacing={4}>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/woman-with-crossed-arms_23-2147574179.jpg?1&w=996&t=st=1715232499~exp=1715233099~hmac=e2b66ae5acb8dc65f71bac2be55de151aad77afdc6fbd5744fed82386b7c0324"
                  title="Business"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Menik 
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "SWITCH Life has been a game-changer for me. Its holistic approach to financial empowerment and personal fulfillment has transformed how I approach both my business and personal life."
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/young-businessman-using-mobile-phone-office-looking-camera_637285-8766.jpg?w=996&t=st=1715232296~exp=1715232896~hmac=7c6742ae0bffebb8fb4730475e16c1e95c79cf51db0002e335cf40d7e23e1cec"
                  title="Business"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Harshanath Gamge
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "The privacy and control features on Environment are top-notch. As an IT professional, I value platforms that prioritize user privacy and offer robust moderation tools to ensure a safe and inclusive environment."
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?w=900&t=st=1715232436~exp=1715233036~hmac=3e098ce666c14d0278ad3722bfac493c8d1317bd7b698730c5f11de0da504f0c"
                  title="IT"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Jaye Prakash
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    "The user experience on SWITCH Life is seamless and intuitive. As someone in the IT field, I appreciate the attention to detail and the smooth navigation, making it easy to access valuable resources and insights."
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
