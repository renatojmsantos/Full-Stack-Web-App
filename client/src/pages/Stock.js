import React, { useState, useEffect }  from 'react';

import {
    Box,
    Typography,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Button
}from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import AddStock from '../components/stock/AddStock';
import EditStockMov from '../components/stock/EditStockMov';
import DeleteStockMov from '../components/stock/DeleteStockMov';

import TopBar from '../components/AppBar';

const Stock = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [moves, setMoves] = useState([]);

    // show popup
    const [id, setId] = useState(null);
    const [move, setMove] = useState([]);
    
    const [AddPopUp, setAddPopUp] = useState(false);

    const [EditPopUp, setEditPopUp] = useState(false);
    const [EditVisible,setEditVisible] = useState(null);

    const [DeletePopUp, setDeletePopUp] = useState(false);
    const [DeleteVisible,setDeleteVisible] = useState(null);

    function showAdd(){        
        setAddPopUp(true);
    }

    function showEdit(index,move){
        setId(index);
        setEditPopUp(true);
        setMove(move);
        setEditVisible(EditVisible => EditVisible === index ? index : index);
    }

    function showDelete(index,move){
        setId(index);
        setDeletePopUp(true);
        setMove(move);
        setDeleteVisible(DeleteVisible => DeleteVisible === index ? index : index);
    }

    function changeDate(date){
        let creationdate = date;
        creationdate = creationdate.replace("T"," ");
        creationdate = creationdate.replace(".000Z","");
        return creationdate;
    }
    useEffect(() => {
        fetch("http://localhost:7000/stock")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setMoves(data);
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
                    <b>Stock Movements</b>
                    <Button sx={{marginLeft:5}} variant="contained" size="big" onClick = {() => showAdd()}>
                        FILL STOCK!
                    </Button>
                </Typography>
                
                
                <TableContainer>
                    <Table sx={{ width: '50%', marginLeft: 5}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Item</TableCell>
                                <TableCell align="center">Edit</TableCell>
                                <TableCell align="center">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {moves.map((move,index) => (
                                
                                <TableRow
                                
                                key={index}
                                >
                                <TableCell align="center">
                                    {changeDate(move.creationdate)}
                                </TableCell>
                                <TableCell align="center">
                                    {move.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {move.item_name}
                                </TableCell>
                                
                                <TableCell align="center">
                                    <IconButton onClick ={() => showEdit(index, move)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton onClick ={() => showDelete(index, move)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            
            {/* Show Pop Ups */}
            {<AddStock m={50} trigger={AddPopUp} setTrigger={setAddPopUp}/>}
            {EditVisible===id && EditVisible!=null && <EditStockMov m={50} trigger={EditPopUp} move={move} setTrigger={setEditPopUp}/>}
            {DeleteVisible===id && DeleteVisible!=null && <DeleteStockMov m={50} trigger={DeletePopUp} move={move} setTrigger={setDeletePopUp}/>}
            
            </Box>
        );
    }

}
export default Stock;