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
    databackList: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[2],
    },
    avatar: {
        backgroundColor: theme.palette.secondary.main,
        marginRight: '20px',
    },
}));

function Links() {
    const classes = useStyles();
    const [users, setUsers] = useState([]);


    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/user/getAll');
            const dataWithId = response.data.map((data, index) => ({
                id: index + 1,
                ...data
            }));
            setUsers(dataWithId);
        } catch (error) {
            console.error('Error fetching data details:', error);
        }
    };

    const addLink = async (email, name) => {
        try {
            var unique = email + sessionStorage.getItem("cus_mail");
            const link = {
                unique: unique,
                email: email,
                name: name,
                link: sessionStorage.getItem("cus_mail")
            }
            const response = await axios.post(global.APIUrl + '/link/add', link);
            Swal.fire({
                icon: 'success',
                title: 'Link added successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Link Already Exists',
                showConfirmButton: false,
                timer: 1500
            });
            console.error('Error adding link:', error);
        }
    }

    return (
        <div className={classes.root}>
            <Navbar />
            <div className={classes.header}>
                <Typography variant="h3" component="h1">Add Your Friend Links</Typography>
            </div>
            <hr style={{ width: 100, }}></hr>
            <section className={classes.databackList}>
                <Card className={classes.card}>
                    <CardContent>
                        <List>
                            {users.map((data) => (
                                (data.email !== sessionStorage.getItem("cus_mail")) &&
                                <React.Fragment key={data.id}>
                                    <div className={classes.name}>
                                        <Avatar className={classes.avatar}>{data.email[0]}</Avatar><br />
                                        <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>{data.name}</Typography>
                                        <Typography style={{ fontSize: 20 }}>{data.email}</Typography>
                                        <Typography style={{ fontSize: 20 }}>{data.phone}</Typography>
                                        <div>
                                            <Button style={{ backgroundColor: 'black', color: 'white', marginLeft: 550 }} onClick={() => addLink(data.email, data.name)}>ADD Link</Button>
                                        </div>
                                        <br />
                                    </div>
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

export default Links;
