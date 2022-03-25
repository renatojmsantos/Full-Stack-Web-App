import React, { useState, useEffect } from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
  Grid,
  IconButton,
  Modal,
  Box,
  Typography,
  Button,
  Select,
  Slider,
  FormControl,
  MenuItem,
  InputLabel,
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import MuiInput from '@mui/material/Input';

function AddStock(props){

  const [quantity, setQuantity] = useState(50);

  const [name, setName] = useState("");
  const [items, setItems] = useState([]);

  const handleChangeItem = e => {
    console.log(e.target.value);
    setName(e.target.value);
  }

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

  useEffect(()=>{
    fetch('http://localhost:7000/items',{
    method: 'GET',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    }).then(res => res.json())
    .then((data) =>{
        setItems(data);
    })
    .catch(err =>{
        console.error(err);
    });
  },[props.trigger])

  async function createStock(quantity, itemName){
    console.log(quantity,itemName);
      await fetch('http://localhost:7000/stock/', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "quantity": quantity,
            "item_name": itemName
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
            
            <Typography marginBottom={2} variant="h4">Fill Stock</Typography>

            <Grid container spacing={3}>
              <Grid item xs="auto" md={12} lg={12}>
                <FormControl fullWidth>
                    <InputLabel>Item</InputLabel>
                        <Select
                          value={name}
                          label="Item"
                          onChange={handleChangeItem}
                          >
                          
                          {items.map(({name},index)=>(
                              <MenuItem key={index} value={name}>{name}</MenuItem>
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
                    onClick = {() => createStock(quantity, name)}
                    >
                      CREATE STOCK!
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
export default AddStock
