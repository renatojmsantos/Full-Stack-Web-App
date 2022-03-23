import React, { useState } from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
  Grid,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';


function AddUser(props){

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleChangeName = e =>{
    setName(e.target.value);
  }

  const handleChangeEmail = e =>{
    setEmail(e.target.value);
  }
  

  async function create(name,email){
    if(name.length > 2 && email.length > 6){
        await fetch('http://localhost:7000/users', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": name,
                "email": email
            })
        }).then(() => props.setTrigger(false)
        ).catch(err =>{
            console.error(err);
        });
    }
  }

  return (props.trigger) ? (
    
    <Box className="popup">
        <Modal open={props.trigger}
              onClose={() => props.setTrigger(false)}>
        
        <Box className="popup-inner-dash" sx={{ overflow: "hidden", overflowY: "scroll",
          width: '40%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} >
            
            <Typography marginBottom={2} variant="h4">Create User</Typography>

            <Grid container spacing={3}>
                <Grid item xs="auto" md={12} lg={12}>
                  <TextField fullWidth
                        label="Name"
                        id="user_name"
                        defaultValue={""}
                        onChange={handleChangeName}
                        error={name.length<2}
                        helperText={name.length<2 ? 'Please write something.' : ' '}
                  /> 
                </Grid>

                <Grid item xs="auto" md={12} lg={12}>
                  <TextField fullWidth
                        label="E-mail"
                        id="user_email"
                        defaultValue={""}
                        onChange={handleChangeEmail}
                        error={email.length<6}//TODO: validate email by regex
                        helperText={name.length<6 ? 'Please write something on email' : ' '}
                  /> 
                </Grid>

                <Grid item xs="auto" md={12}  lg={12}>
                    <Button fullWidth variant="contained" size="big"
                    onClick = {() => create(name,email)}
                    >
                      CREATE
                    </Button>
                </Grid>

            </Grid>
            
            <IconButton className="close-btn" onClick={() => props.setTrigger(false)}>
                <CloseIcon/>
            </IconButton>
            {props.children}
            
        </Box>
        </Modal>
    </Box>
  ) : "";
}
export default AddUser
