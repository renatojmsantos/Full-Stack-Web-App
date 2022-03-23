import React, { useState, useEffect }  from 'react';

import {
    Avatar,
    Stack,
    Box,
    Grid,
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    CircularProgress,
}from '@mui/material';

import EditUser from '../components/user/EditUser';
import DeleteUser from '../components/user/DeleteUser';
import AddUser from '../components/user/AddUser';

import TopBar from '../components/AppBar';


const Users = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [users, setUsers] = useState([]);

    // show popup
    const [id, setId] = useState(null);
    const [user, setUser] = useState([]);
    
    const [AddPopUp, setAddPopUp] = useState(false);

    const [EditPopUp, setEditPopUp] = useState(false);
    const [EditVisible,setEditVisible] = useState(null);

    const [DeletePopUp, setDeletePopUp] = useState(false);
    const [DeleteVisible,setDeleteVisible] = useState(null);

    function showAdd(){        
        setAddPopUp(true);
    }

    function showEdit(index,user){
        setId(index);
        setEditPopUp(true);
        setUser(user);
        setEditVisible(EditVisible => EditVisible === index ? index : index);
    }

    function showDelete(index,user){
        setId(index);
        setDeletePopUp(true);
        setUser(user);
        setDeleteVisible(DeleteVisible => DeleteVisible === index ? index : index);
    }

    useEffect(() => {
        fetch("http://localhost:7000/users")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setUsers(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [AddPopUp,EditPopUp,DeletePopUp]) 

    if (error) {
        return <Typography>Error: {error.message}</Typography>;
    } else if (!isLoaded) {
        return <Box sx={{ display: 'flex', marginTop:30 }}
                    alignItems="center"
                    justifyContent="center">
                    <CircularProgress/>
                </Box>
    } else {
        return (
            
            <Box>
                <TopBar/>
                <Typography align='left' variant='h3' margin={5}>
                    <b>Users</b>
                    <Button sx={{marginLeft:5}} variant="contained" size="big" onClick = {() => showAdd()}>Add New User</Button>
                </Typography>
                
            <Stack direction="row" spacing={2} marginTop={5} margin={5}>
            {users.map((user,index) => (
                <Card key={index}>
                    <CardContent>
                        <Grid container spacing={1} alignItems="center"
                justifyContent="center">
                            <Grid item xs="auto" md="auto" lg="auto">
                                <Avatar
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRr0YlatAy-hrNCQjzZ7fqDzNiXt7HGmzVaA&usqp=CAU"
                                sx={{ width: 56, height: 56}}
                                />
                            </Grid>
                            <Grid item xs="auto" md="auto" lg={"auto"}>
                                <Typography align='center' paddingTop={1} variant='body1'><b>{user.name}</b></Typography>
                                <Typography align='center' variant='body2'>{user.email}</Typography>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                    <CardActions>
                    <Grid container spacing={1}
                        alignItems="center"
                        justifyContent="center">

                        <Grid item xs="auto" md="auto" lg="auto">
                            <Button size="small" onClick = {() => showEdit(index,user)}>Edit</Button>
                        </Grid>

                        <Grid item xs="auto" md="auto" lg="auto">
                            <Button size="small" onClick = {() => showDelete(index,user)}>Delete</Button>
                        </Grid>
                        
                    </Grid>
                    </CardActions>
                </Card>
                ))}
            </Stack>
            
            {/* Show Pop Ups */}
            {<AddUser m={50} trigger={AddPopUp} setTrigger={setAddPopUp}/>}
            {EditVisible===id && EditVisible!=null && <EditUser m={50} trigger={EditPopUp} user={user} setTrigger={setEditPopUp}/>}
            {DeleteVisible===id && DeleteVisible!=null && <DeleteUser m={50} trigger={DeletePopUp} user={user} setTrigger={setDeletePopUp}/>}

            </Box>
        );
    }

}
export default Users;