import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const ConsultantManage = () => {

    const [users, setUsers] = useState([]);
    const [data, setData] = useState([]);


    useEffect(() => {
        fetchContDetails();
        axios.get(global.APIUrl + '/user/getAll')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.log(err);
            });
        sessionStorage.setItem("cus_mail", 'empty');
    }, []);

    const fetchContDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/conv/allCount');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching Applied details:', error);
        }
    };

    const sortedData = data.sort((a, b) => a.count - b.count);

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '300vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#705069', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1F0219', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                        Consultant Management
                        </Typography>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '300vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Chat With Users
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                        {users.map((user, index) => (
                            <SquareCard key={index} name={user.name} mail={user.email} />
                        ))}
                    </div>
                    <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Analysis Engage with Users
                    </Typography>
                    <br/>
                    <div className="chart-container">
                        <LineChart width={600} height={300} data={sortedData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="_id" style={{ fontWeight: 'bold', }} />
                            <YAxis style={{ fontWeight: 'bold', }} />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="count" stroke="#8884d8" />
                        </LineChart>
                    </div>
                </div>   
                </div>
            </div>
        </div>
    );
};

const SquareCard = ({ name, mail }) => {
    const handleClick = () => {
        sessionStorage.setItem("cus_mail", mail);
        window.location.href = `/ConsultantChat`;
    };

    return (
        <div onClick={handleClick} style={{ width: 'calc(20% - 20px)', backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', margin: '10px', cursor: 'pointer' }}>            
            <Typography variant="h6" style={{ marginBottom: '10px' }}>{name}</Typography>
            <Typography variant="body1">{mail}</Typography>
        </div>
    );
};

export default ConsultantManage;
