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
import { red } from '@mui/material/colors';
import { green } from '@mui/material/colors';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import AcceptOrder from '../components/orders/AcceptOrder';
import EditOrder from '../components/orders/EditOrder';
import RejectOrder from '../components/orders/RejectOrder';
import ViewStockItem from '../components/orders/ViewStockItem';

import TopBar from '../components/AppBar';

const Orders = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const [orders, setOrders] = useState([]);

    // show popup
    const [id, setId] = useState(null);
    const [order, setOrder] = useState([]);
    
    const [StockPopUp, setStockPopUp] = useState(false);
    const [StockVisible,setStockVisible] = useState(null);

    const [AddPopUp, setAddPopUp] = useState(false);
    const [AddVisible,setAddVisible] = useState(null);

    const [EditPopUp, setEditPopUp] = useState(false);
    const [EditVisible,setEditVisible] = useState(null);

    const [DeletePopUp, setDeletePopUp] = useState(false);
    const [DeleteVisible,setDeleteVisible] = useState(null);


    function showStockItem(index,order){
        setId(index);
        setStockPopUp(true);
        setOrder(order);
        setStockVisible(StockVisible => StockVisible === index ? index : index);
    }

    function showAdd(index,order){
        setId(index);
        setAddPopUp(true);
        setOrder(order);
        setAddVisible(AddVisible => AddVisible === index ? index : index);
    }

    function showEdit(index,order){
        setId(index);
        setEditPopUp(true);
        setOrder(order);
        setEditVisible(EditVisible => EditVisible === index ? index : index);
    }

    function showDelete(index,order){
        setId(index);
        setDeletePopUp(true);
        setOrder(order);
        setDeleteVisible(DeleteVisible => DeleteVisible === index ? index : index);
    }

    function changeDate(date){
        let creationdate = date;
        creationdate = creationdate.replace("T"," ");
        creationdate = creationdate.replace(".000Z","");
        return creationdate;
    }

    function getStatus(status){
        if(status===0){
            return "Incomplete"
        }else{
            return "DONE"
        }
    }

    useEffect(() => 
        {
        fetch("http://localhost:7000/orders")
            .then(res => res.json())
            .then(
                (data) => {
                    setIsLoaded(true);
                    setOrders(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        },
    [StockPopUp, AddPopUp,EditPopUp,DeletePopUp]
    ) 

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
                    <b>Orders</b>
                </Typography>
                
                <TableContainer>
                    <Table sx={{ width: '50%', marginLeft: 5}}>
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Item</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Stock</TableCell>
                                <TableCell align="center" sx={{width:100}}>Decision</TableCell>
                                <TableCell align="center">Edit</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order,index) => (
                                <TableRow
                                    key={index}
                                >
                                <TableCell align="center">
                                    {changeDate(order.creationdate)}
                                </TableCell>
                                <TableCell align="center">
                                    {order.quantity}
                                </TableCell>
                                <TableCell align="center">
                                    {order.item_name}
                                </TableCell>

                                <TableCell align="center">
                                    {getStatus(order.status)}
                                </TableCell>

                                <TableCell align="center">
                                    <Button variant="outlined" size="small" onClick ={() => showStockItem(index, order)}>
                                        View
                                    </Button>
                                </TableCell>

                                <TableCell align="center">
                                    { // already accepted
                                    order.status === 1 && 
                                    <CheckIcon sx={{ color: green[500] }}/>
                                    }

                                    { // decide if accept or reject
                                        order.status === 0 &&
                                        <Box>
                                            <IconButton onClick ={() => showDelete(index, order)}>
                                                <ClearIcon sx={{ color: red[500] }}/>
                                            </IconButton>

                                            <IconButton onClick ={() => showAdd(index, order)}>
                                                <CheckIcon sx={{ color: green[500] }}/>
                                            </IconButton>
                                        </Box>
                                    }
                                    
                                </TableCell>
                                
                                <TableCell align="center">
                                    <IconButton onClick ={() => showEdit(index, order)}>
                                        <EditIcon />
                                    </IconButton>
                                </TableCell>
                                
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            
            {/* Show Pop Ups */}
            {StockVisible===id && StockVisible!=null && <ViewStockItem m={50} trigger={StockPopUp}  order={order} setTrigger={setStockPopUp}/>}
            {AddVisible===id && AddVisible!=null && <AcceptOrder m={50} trigger={AddPopUp}  order={order} setTrigger={setAddPopUp}/>}
            {EditVisible===id && EditVisible!=null && <EditOrder m={50} trigger={EditPopUp} order={order} setTrigger={setEditPopUp}/>}
            {DeleteVisible===id && DeleteVisible!=null && <RejectOrder m={50} trigger={DeletePopUp} order={order} setTrigger={setDeletePopUp}/>}
            </Box>
        );
    }

}
export default Orders;