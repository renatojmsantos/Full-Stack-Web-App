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
    IconButton
}from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddIcon from '@mui/icons-material/Add';

import AddItem from '../components/items/AddItem';
import EditItem from '../components/items/EditItem';
import DeleteItem from '../components/items/DeleteItem';
import OrderItem from '../components/items/OrderItem';

import TopBar from '../components/AppBar';

const Items = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // show popup
    const [id, setId] = useState(null);
    const [item, setItem] = useState([]);
    
    const [AddPopUp, setAddPopUp] = useState(false);

    const [EditPopUp, setEditPopUp] = useState(false);
    const [EditVisible,setEditVisible] = useState(null);

    const [DeletePopUp, setDeletePopUp] = useState(false);
    const [DeleteVisible,setDeleteVisible] = useState(null);

    const [OrderPopUp, setOrderPopUp] = useState(false);
    const [OrderVisible,setOrderVisible] = useState(null);

    function showAdd(){        
        setAddPopUp(true);
    }

    function showOrder(index,item){      
        setId(index);  
        setOrderPopUp(true);
        setItem(item);
        setOrderVisible(OrderVisible => OrderVisible === index ? index : index);
    }

    function showEdit(index,item){
        setId(index);
        setEditPopUp(true);
        setItem(item);
        setEditVisible(EditVisible => EditVisible === index ? index : index);
    }

    function showDelete(index,item){
        setId(index);
        setDeletePopUp(true);
        setItem(item);
        setDeleteVisible(DeleteVisible => DeleteVisible === index ? index : index);
    }

    useEffect(() => {
        fetch("http://localhost:7000/items")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setItems(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [AddPopUp,EditPopUp,DeletePopUp,OrderPopUp]) 

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
                    <b>Items</b>
                    <IconButton onClick ={() => showAdd()}>
                        <AddIcon/>
                    </IconButton>
                </Typography>
                
                
                <TableContainer>
                    <Table sx={{ width: '50%', marginLeft: 5}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Order</TableCell>
                                <TableCell align="right">Edit</TableCell>
                                <TableCell align="right">Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {items.map((item,index) => (
                                
                                <TableRow
                                key={item.name}
                                >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick ={() => showOrder(index, item)}>
                                        <ShoppingCartIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick ={() => showEdit(index, item)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton onClick ={() => showDelete(index, item)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            
            {/* Show Pop Ups */}
            {<AddItem m={50} trigger={AddPopUp} setTrigger={setAddPopUp}/>}
            {EditVisible===id && EditVisible!=null && <EditItem m={50} trigger={EditPopUp} item={item} setTrigger={setEditPopUp}/>}
            {DeleteVisible===id && DeleteVisible!=null && <DeleteItem m={50} trigger={DeletePopUp} item={item} setTrigger={setDeletePopUp}/>}
            {OrderVisible===id && OrderVisible!=null && <OrderItem m={50} trigger={OrderPopUp} item={item} setTrigger={setOrderPopUp}/>}

            </Box>
        );
    }

}
export default Items;