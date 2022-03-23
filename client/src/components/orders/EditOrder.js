import React, { useState} from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
  Grid,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Slider
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MuiInput from '@mui/material/Input';

function EditOrder(props){

  const [quantity, setQuantity] = useState(50);
  
  const handleSliderChange = (event, newQuantity) => {
    setQuantity(newQuantity);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (quantity < 0) {
        setQuantity(0);
    } else if (quantity > 100) {
        setQuantity(100);
    }
  };
  
  const Input = styled(MuiInput)`
    width: 42px;
    `;


  function getFormatDate(date){
    let creationdate = date;
    creationdate = creationdate.replace("T"," ");
    creationdate = creationdate.replace(".000Z","");
    return creationdate;
  }

  async function updateQuantity(creationdate, quantity){
    const date = getFormatDate(creationdate);
    await fetch('http://localhost:7000/orders/quantity/'+date, {
          method: 'PATCH',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "quantity": quantity
          })
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
          width: '40%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }} >
            
            <Typography marginBottom={2} variant="h6">Edit quantity of {props.order.item_name} <br/>Ordered at {getFormatDate(props.order.creationdate)}</Typography>

            <Typography gutterBottom>
                    Quantity
                </Typography>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                            <AddShoppingCartIcon />
                        </Grid>
                        <Grid item xs>
                            <Slider
                                value={typeof quantity === 'number' ? quantity : 0}
                                onChange={handleSliderChange}
                            />
                        </Grid>
                        <Grid item>
                            <Input
                                value={quantity}
                                size="small"
                                onChange={handleQuantityChange}
                                onBlur={handleBlur}
                                inputProps={{
                                    step: 1,
                                    min: 0,
                                    max: 100,
                                    type: 'number',
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Button fullWidth variant="contained" size="big"
                    onClick = {() => updateQuantity(props.order.creationdate, quantity)}
                    >
                      CHANGE
                    </Button>
            
            <IconButton className="close-btn" onClick={() => props.setTrigger(false)}>
                <CloseIcon/>
            </IconButton>
            {props.children}
            
        </Box>
        </Modal>
    </Box>
  ) : "";
}
export default EditOrder
