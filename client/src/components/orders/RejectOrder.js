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


function RejectOrder(props){  
    async function deleteOrder(){
          // e.g. 2022-03-22T00:52:26.000Z -> 2022-03-22 00:52:26
          await fetch('http://localhost:7000/orders/'+creationdate, {
              method: 'DELETE',
              mode: 'cors',
              headers: { 'Content-Type': 'application/json' }
          }).then(() => props.setTrigger(false)
          ).catch(err =>{
              console.error(err);
          });
    }

    let creationdate = props.order.creationdate;
    creationdate = creationdate.replace("T"," ");
    creationdate = creationdate.replace(".000Z","");
  

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
            
            <Typography marginBottom={2} variant="h6">Reject Order of {props.order.item_name} at {creationdate}?</Typography>
            <Box textAlign='center' spacing={2}>
                <Button variant='contained' color='inherit' size = "medium" onClick={() => props.setTrigger(false)}>CANCEL</Button>
                <Button sx={{marginLeft:5}} variant='contained' color='error' size="medium" onClick = {() => deleteOrder()}>REJECT</Button>
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
export default RejectOrder
