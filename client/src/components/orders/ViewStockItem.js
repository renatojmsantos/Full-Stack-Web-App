import React, { useState, useEffect } from "react";

import '../popUp.css'

import CloseIcon from '@mui/icons-material/Close';

import {
    IconButton,
    Modal,
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';


function ViewStockItem(props){

    const [moves, setMoves] = useState([]);
    const [currentStock, setCurrentStock] = useState(0);

    useEffect( () =>{
        fetch('http://localhost:7000/stock/'+props.order.item_name,{
        method: 'GET',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        }).then(res => res.json())
        .then((data) =>{
            setMoves(data);
            //console.log(data[0]);
        })
        .catch(err =>{
            console.error(err);
        });

        fetch('http://localhost:7000/stock/current/'+props.order.item_name,{
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
        .then((data) =>{
            //console.log(data[0].quantity)
            if(data[0].quantity > 0){
                setCurrentStock(data[0].quantity);
            }
            else{
                setCurrentStock(0);
            }
        })
        .catch(err =>{
            console.error(err);
        });
    },[props.trigger])
    
    function changeDate(date){
        let creationdate = date;
        creationdate = creationdate.replace("T"," ");
        creationdate = creationdate.replace(".000Z","");
        return creationdate;
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
                
                <Typography marginBottom={2} variant="h6">Stock Movements for {props.order.item_name}</Typography>
                <Typography marginBottom={2} variant="body"><b>Current Stock: </b> 
                    {currentStock}    
                </Typography>

                <Box sx = {{height: 300, overflow: "hidden", overflowY: "scroll"}}>
                    <TableContainer>
                        <Table sx={{ width: '50%', marginLeft: 5}}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Date</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {moves.length >0 && moves.map((move,index) => (
                                    <TableRow
                                    key={index}
                                    >
                                    <TableCell align="center">
                                        {changeDate(move.creationdate)}
                                    </TableCell>
                                    <TableCell align="center">
                                        {move.quantity}
                                    </TableCell>
                                    
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
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
export default ViewStockItem
