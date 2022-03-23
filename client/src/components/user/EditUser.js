import React, { useState, useEffect } from "react";

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


function EditUser(props){

  const [name, setName] = useState("");
  
  useEffect(() => {
    setName(props.user.name);
  },[props])

  const handleChangeName = e =>{
    setName(e.target.value);
  }
  

  async function saveInfo(name){
    if(name.length > 2){
        await fetch('http://localhost:7000/users/'+props.user.email, {
          method: 'PUT',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "name": name
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
            
            <Typography marginBottom={2} variant="h4">Edit User Name</Typography>

            <Grid container spacing={3}>
                <Grid item xs="auto" md={12} lg={12}>
                  <TextField fullWidth
                        label="Name"
                        id="user_name"
                        defaultValue={props.user.name}
                        onChange={handleChangeName}
                        error={name.length<2}
                        helperText={name.length<2 ? 'Empty field! Write the name.' : ' '}
                  /> 
                </Grid>

                <Grid item xs="auto" md={12}  lg={12}>
                  <Typography variant="body1">E-mail: {props.user.email}</Typography>
                </Grid>

                <Grid item xs="auto" md={12}  lg={12}>
                    <Button fullWidth variant="contained" size="big"
                    onClick = {() => saveInfo(name)}
                    >
                      SAVE
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
export default EditUser
