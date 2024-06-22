import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Sidebar from '../Main/SideBar';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Avatar } from '@mui/material';

const BusinessManage = () => {
    const [post, setPost] = useState([]);    
    const [viewersC, setViewersC] = useState([]);

    useEffect(() => {
        fetchDetails();        
        fetchViewersC();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedBPost', JSON.stringify(data));

    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/businessPost/all');
            const postWithId = response.data.map((post, index) => ({
                id: index + 1,
                ...post
            }));
            setPost(postWithId);
        } catch (error) {
            console.error('Error fetching post details:', error);
        }
    };
   
     const fetchViewersC = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/viewPosts/allCount');            
            const viewersWithId = response.data.map((view, index) => ({
                id: index + 1,
                ...view
            }));
            setViewersC(viewersWithId);
        } catch (error) {
            console.error('Error fetching viewer details:', error);
        }
    };

    const handleAddMenu = () => {
        window.location.href = "/BusinessForm";
    };

    const handleEdit = (row) => {
        const editBtn = true;     
        const data = {
            row,
            editBtn
        };
        localStorage.setItem('selectedBPost', JSON.stringify(data));
        window.location.href = "/BusinessForm";

    };


    const handleDelete = (pid) => {
        axios.delete(global.APIUrl + "/businessPost/delete/" + pid).then(() => {
            window.location.href = "/BusinessManage";
        }).catch((err) => {
            Swal.fire({
                title: "Error!",
                text: "Not Delete",
                icon: 'error',
                confirmButtonText: "OK",
                type: "success"
            })
        })

    };

    const columns = [
        { field: 'pid', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Company Name', width: 150 },
        { field: 'description', headerName: 'Description', width: 550 },
        { field: 'phone', headerName: 'Contact', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'picture', headerName: 'Picture', width: 150, renderCell: renderPicture },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <IconButton color="primary" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(params.row.pid)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ),
        },
    ];  
    
    
    function renderPicture(params) {
        return <Avatar alt="Item Picture" src={params.value} sx={{ width: 50, height: 50 }} variant="square" />;
    }  
    
    const countcolumn = [
        { field: '_id', headerName: 'ID', width: 600 },
        { field: 'count', headerName: 'View Count', width: 600 },        
    ];

    const sortedData = viewersC.sort((a, b) => a.count - b.count);

    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#705069', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1F0219', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Switch with Business
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" color="primary" onClick={handleAddMenu}>
                            Add New Post
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Post Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={post} columns={columns} pageSize={5} />
                    </div>
                </div>
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Post Views Count
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={viewersC} columns={countcolumn} pageSize={5} />
                    </div>
                </div>    
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        View Analysis
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
    );
};

export default BusinessManage;
