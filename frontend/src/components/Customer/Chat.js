import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
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
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    section: {
        marginTop: theme.spacing(5),
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        marginBottom: theme.spacing(10),
    },
    card: {
        maxWidth: '100%',
        paddingTop: theme.spacing(5),
    },
    cardContent: {
        flexGrow: 1,
    },
    button: {
        marginTop: theme.spacing(2),
    },
}));

function Consultant() {
    const classes = useStyles();
    const [messages, setMessages] = useState([]);
    const [message, setNewMessage] = useState("");
    const [submit, setSubmit] = useState(true);
    const email = sessionStorage.getItem("cus_mail");
    const conmail = sessionStorage.getItem("con_mail");
    const key = email + conmail

    useEffect(() => {
        fetchMessages();
        valid();
    }, [message]);

    const valid = () => {
        if ((message !== "")) {
            setSubmit(false);
        } else {
            setSubmit(true);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/chat/allchat');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleMessageSend = async () => {
        const chat = { email, message, key };
        try {
            await axios.post(global.APIUrl + '/chat/addchat', chat);
            window.location.href = "/Chat";
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className={classes.root}>
            <Navbar />
            <Container maxWidth="md" style={{ marginTop: '20px' }}>
                <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' }}>
                    <Card className="container mt-5">
                        <CardContent>
                            <Typography variant="h5" style={{ fontWeight: 'bold' }}>Chat With Consultant</Typography>
                            <div className="chat-card" style={{ maxHeight: '350px', overflowY: 'scroll', border: '1px solid #e0e0e0', borderRadius: '10px', backgroundColor: '#f9f9f9', marginTop: '15px' }}>
                                <List>
                                    {messages.map(message => (
                                        (message.key === key) && (<ListItem key={message.id}>
                                            <ListItemText primary={<Typography variant="body1" style={{ fontWeight: 'bold' }}>{message.email} : </Typography>} secondary={<Typography variant="body1">{message.message}</Typography>} />
                                        </ListItem>)

                                    ))}
                                </List>
                            </div>
                            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
                                <TextField
                                    variant="outlined"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={e => setNewMessage(e.target.value)}
                                    className="message-input"
                                    style={{ flex: '1' }}
                                />
                                <Button variant="contained" style={{ marginLeft: '10px', backgroundColor: 'green', color: 'white' }} onClick={handleMessageSend} disabled={submit}>Send</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Container>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default Consultant;
