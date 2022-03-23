import React from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
  IconButton,
  Modal,
  Box,
  Typography,
  Button
} from '@mui/material';


function DeleteItem(props){  
  async function deleteItem(){
    await fetch('http://localhost:7000/items/'+props.item.name, {
        method: 'DELETE',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' }
    }).then(() => props.setTrigger(false)
    ).catch(err =>{
        console.error(err);
    });
  }

  return (props.trigger) ? (
    
    <Box className="popup">
        <Modal open={props.trigger}
              onClose={() => props.setTrigger(false)}>
        
        <Box className="popup-inner-dash" sx={{ overflow: "hidden", overflowY: "scroll",
          width: '30%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} >
            
            <Typography marginBottom={2} variant="h6">Delete Item {props.item.name}?</Typography>
            <Box textAlign='center' spacing={2}>
                <Button variant='contained' color='inherit' size = "medium" onClick={() => props.setTrigger(false)}>CANCEL</Button>
                <Button sx={{marginLeft:5}} variant='contained' color='error' size="medium" onClick = {() => deleteItem()}>DELETE</Button>
            </Box>

            <IconButton className="close-btn" onClick={() => props.setTrigger(false)}>
                <CloseIcon/>
            </IconButton>
            {props.children}
            
        </Box>
        </Modal>
    </Box>
  ) : "";
}
export default DeleteItem
