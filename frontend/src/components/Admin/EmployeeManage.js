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

const EmployeeManage = () => {
    const [jobs, setJobs] = useState([]);
    const [apply, setApply] = useState([]);
    const [data, setData] = useState([]);
    const [cons, setCons] = useState([]);

    useEffect(() => {
        fetchEmployeeDetails();
        fetchApplyDetails();
        fetchApplyContDetails();
        fetchConsDetails();
        const editBtn = false;     
        const data = {            
            editBtn
        };
        localStorage.setItem('selectedJob', JSON.stringify(data));

    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/jobs/all');
            const employeesWithId = response.data.map((jobs, index) => ({
                id: index + 1,
                ...jobs
            }));
            setJobs(employeesWithId);
        } catch (error) {
            console.error('Error fetching jobs details:', error);
        }
    }; 

    const fetchConsDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/admin/getAll');
            const filteredCons = response.data.filter(cons => cons.type === 'Consultant');
            const conWithId = filteredCons.map((cons, index) => ({
                id: index + 1,
                ...cons
            }));
            setCons(conWithId);
        } catch (error) {
            console.error('Error fetching consultant details:', error);
        }
    };
    

    const fetchApplyDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/apply/all');
            const applyWithId = response.data.map((apply, index) => ({
                id: index + 1,
                ...apply
            }));
            setApply(applyWithId);
        } catch (error) {
            console.error('Error fetching Applied details:', error);
        }
    };
//fetch applied count
    const fetchApplyContDetails = async () => {
        try {
            const response = await axios.get(global.APIUrl + '/apply/allCount');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching Applied details:', error);
        }
    };

    const handleAddEmployee = () => {
        window.location.href = "/EmployeeForm";
    };

    //edit Job Form
    const handleEdit = (row) => {
        const editBtn = true;     
        const data = {
            row,
            editBtn
        };
        localStorage.setItem('selectedJob', JSON.stringify(data));
        window.location.href = "/EmployeeForm";

    };

    const handleDelete = (pid) => {
        axios.delete(global.APIUrl + "/jobs/delete/" + pid).then(() => {
            window.location.href = "/EmployeeManage";

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
        { field: 'company', headerName: 'Company', width: 150 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'experienceLevel', headerName: 'Experience Level', width: 350 },
        { field: 'minEducationLevel', headerName: 'Education Level', width: 350 },
        { field: 'responsibilities', headerName: 'Responsibilities', width: 350 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'availability', headerName: 'Ending Date', width: 150 },
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
    const column = [
        { field: 'jobId', headerName: 'ID', width: 150 },
        { field: 'companyName', headerName: 'Company', width: 150 },
        { field: 'position', headerName: 'Position', width: 150 },
        { field: 'experienceLevel', headerName: 'Experience Level', width: 150 },
        { field: 'minEducationLevel', headerName: 'Education Level', width: 150 },
        { field: 'experience', headerName: 'Experience', width: 150 },
        { field: 'email', headerName: 'Candidate Email', width: 150 },
        { field: 'appliedAt', headerName: 'Date', width: 150 },
        { field: 'appliedAt', headerName: 'Date', width: 150 },
        { field: 'picture', headerName: 'Picture', width: 150, renderCell: renderPicture },
    ]; 
    const admin = [
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'type', headerName: 'Type', width: 150 },
        { field: 'indus', headerName: 'Industry', width: 150 },
        { field: 'location', headerName: 'Location', width: 150 },
        { field: 'dob', headerName: 'Date of Birth', width: 150 },
        { field: 'email', headerName: 'Email', width: 150 },
        { field: 'phone', headerName: 'Phone', width: 150 },
    ];

    const sortedData = data.sort((a, b) => a.count - b.count);


    return (
        <div style={{ display: 'flex', height: '100vh', maxWidth: '161vh' }}>
            <Sidebar />
            <div style={{ flexGrow: 1, padding: 20, backgroundColor: '#705069', display: 'flex', flexDirection: 'column' }}>
                <AppBar position="static" sx={{ backgroundColor: '#1F0219', boxShadow: 'none' }}>
                    <Toolbar>
                        <Typography variant="h6" component="div">
                            Employee Management
                        </Typography>
                        <div style={{ flexGrow: 1 }}></div>
                        <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                            Add Post
                        </Button>
                    </Toolbar>
                </AppBar>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Job Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={jobs} columns={columns} pageSize={5} />
                    </div>
                </div>
                
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Consultants Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={cons} columns={admin} pageSize={5} autoHeight={true} sortingOrder={['desc', 'asc']} sortModel={[{ field: 'experience', sort: 'desc' }]} />
                    </div>
                </div>

                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Applied User Details
                    </Typography>
                    <div style={{ width: '100%' }}>
                        <DataGrid rows={apply} columns={column} pageSize={5} autoHeight={true} sortingOrder={['desc', 'asc']} sortModel={[{ field: 'experience', sort: 'desc' }]} />
                    </div>
                </div>
                <div style={{ padding: 20, backgroundColor: '#ffffff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', maxWidth: '161vh' }}>
                    <Typography variant="h5" gutterBottom>
                        Applied Analysis
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

export default EmployeeManage;
