import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Grid, Typography, AppBar, Toolbar, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { useLocalStorage } from 'react-use';
import axios from 'axios';
import Swal from 'sweetalert2';

const ConsultantChat = () => {

    const [messages, setMessages] = useState([]);
    const [message, setNewMessage] = useState("");
    const [submit, setSubmit] = useState(true);
    const email = sessionStorage.getItem("admin_name");
    const conmail = sessionStorage.getItem("cus_mail");
    const key = conmail+email

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
            window.location.href = "/ConsultantChat";
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleCancel = () => {
        sessionStorage.setItem("cus_mail", 'empty');
        window.location.href = "/ConsultantManage";
    };

    return (
        <div style={{ height: '100vh', paddingTop: '64px', backgroundColor: '#f4f4f4' }}>
            <AppBar position="fixed" style={{ backgroundColor: '#1c2331', boxShadow: 'none' }}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1, fontWeight: 'bold' }}>
                        Chat Page
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    <Button variant="contained" color="error" onClick={handleCancel} style={{ marginLeft: '8px' }}>
                        Back
                    </Button>
                </Toolbar>
            </AppBar>
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
        </div>
    );
};

export default ConsultantChat;