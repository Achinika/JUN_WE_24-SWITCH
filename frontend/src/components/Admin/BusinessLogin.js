import React from 'react';
import { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Card, CardContent, makeStyles, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import axios from 'axios';
import Swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#873B78",
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#873B78",
  },
  card: {
    padding: theme.spacing(4),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const BusinessLogin = () => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let log = { email, password };
        try {
            const response = await axios.post(global.APIUrl + "/admin/login", log);            
            if (response.data.message === true) {
                sessionStorage.setItem("admin_name", email);
                sessionStorage.setItem("admintype", 'Business');
                await Swal.fire({
                    title: "Success!",
                    text: "Login Success",
                    icon: 'success',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/BusinessManage";
            } else {
                await Swal.fire({
                    title: "Error!",
                    text: "Login Not Success",
                    icon: 'error',
                    confirmButtonText: "OK",
                    type: "success"
                });
                window.location.href = "/BusinessLogin";
            }
        } catch (error) {
            console.error(error);
            await Swal.fire({
                title: "Error!",
                text: "Login Not Success",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            });
            window.location.href = "/BusinessLogin";
        }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <br/>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon style={{ fontSize: 40 }} />
        </Avatar>
      <br/>
        <Typography component="h1" variant="h5">
        Switch with Business
        </Typography>
      <br/>
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="#873B78"
                className={classes.submit}
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardContent>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  Don't have an account?{" "}
                  <Link href="BusinessSignUp" variant="body2">
                    Sign Up
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
      <br/>     
    </Container>
  );
}

export default BusinessLogin;
