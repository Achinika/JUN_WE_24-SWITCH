import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardContent,
    Grid,
    Typography,
    Button,
    TextField
} from '@material-ui/core';
import Navbar from '../Main/NavBar.js';
import Footer from '../Main/Footer';
import axios from 'axios';
import Swal from 'sweetalert2';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    section: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        marginBottom: theme.spacing(30),
    },
    card: {
        maxWidth: '80%',        
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        marginTop: theme.spacing(2),
    },
    avatar: {
        width: '100%', 
        height: 300, 
        marginBottom: theme.spacing(2), 
    },
}));

function Posts() {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/businessPost/all');
            const postWithId = response.data.map((post, index) => ({
                id: index + 1,
                ...post
            }));
            setPosts(postWithId);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };

    const handleViewDetails = async (post)  => {
        var viewer = {
            pid:post.pid,
            user : sessionStorage.getItem("cus_mail")
        }
        await axios.post(
            global.APIUrl + "/viewPosts/add", viewer
          )
        Swal.fire({
            title: "Company :" + post.name,
            text: "Description :" + post.description,
            imageUrl: post.picture,
            imageAlt: post.name,
            confirmButtonText: 'OK'
        });
    };

    const handleSearch = () => {
        if (searchTerm === "") {
            fetchDetails();
        }
        else {
            const filteredPosts = posts.filter(posts =>
                posts.type.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setPosts(filteredPosts);
        }
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container spacing={3} className={classes.section}>
            <Grid item xs={6} md={2} style={{marginLeft:550}}>
                    <TextField
                        label="Search by Type"
                        variant="outlined"
                        fullWidth
                        className={classes.textField}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Grid>
                {posts.map(post => (
                    <Grid item xs={12} sm={6} md={4} key={post.pid}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <img className={classes.avatar} alt={post.name} src={post.picture} />
                                <Typography variant="h5" gutterBottom>Company Name : {post.name}</Typography>
                                <Typography variant="h7" gutterBottom>Post Id : {post.pid}</Typography>
                                <Typography variant="body" paragraph>Contact No : {post.phone}</Typography>
                                <Typography variant="body" paragraph>Contact Mail : {post.email}</Typography>
                                <Typography variant="h8" paragraph><b>Type : {post.type}</b></Typography>
                                <Button variant="contained" color="primary" className={classes.button} onClick={() => handleViewDetails(post)}>View Details</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Footer />
        </div>
    );
}

export default Posts;
