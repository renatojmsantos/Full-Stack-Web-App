import React, { useState, useEffect } from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
  Grid,
  IconButton,
  Modal,
  Box,
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Button,
  Select,
  Slider
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MuiInput from '@mui/material/Input';


function OrderItem(props){

  const [quantity, setQuantity] = useState(25);
  const [email, setEmail] = useState("");

  const [emails, setEmails] = useState([]);

  const Input = styled(MuiInput)`
    width: 42px;
    `;

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

  const handleChangeEmail = e =>{
    setEmail(e.target.value);
  }
  
  useEffect(()=>{
    fetch('http://localhost:7000/users/emails',{
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then((data) =>{
        setEmails(data);
    })
    .catch(err =>{
        console.error(err);
    });
  },[])
  
  async function orderItem(name, quantity,email){
    if(quantity > 0){
        await fetch('http://localhost:7000/orders/',{
          method: 'POST',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              "item_name": name,
              "quantity": quantity,
              "user_email": email
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
            
            <Typography marginBottom={2} variant="h4">Order {props.item.name}</Typography>
            <Grid container spacing={3}>
                <Grid item xs="auto" md={12} lg={12}>
                <FormControl fullWidth>
                    <InputLabel>Email</InputLabel>
                        <Select
                          value={email}
                          label="Email"
                          onChange={handleChangeEmail}
                          >
                          {emails.map(({email},index)=>(
                              <MenuItem key={index} value={email}>{email}</MenuItem>
                          ))}
                        </Select>
                </FormControl>
                </Grid>
                            
                <Grid item xs="auto" md={12}  lg={12}>
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
                </Grid>

                <Grid item xs="auto" md={12}  lg={12}>
                    
                    <Button fullWidth variant="contained" size="big"
                    onClick = {() => orderItem(props.item.name, quantity,email)}
                    >
                      ORDER
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
export default OrderItem
