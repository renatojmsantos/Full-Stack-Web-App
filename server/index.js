// Create = Post ; Read = Get; Update = Put ; Delete = Delete
const express = require('express');
const cors = require('cors');
const Joi = require('joi'); //joi@13.1.0
require('dotenv/config');

const app = express();

// Import Routes
const items = require('./routes/items');
const users = require('./routes/users');
const orders = require('./routes/orders');
const stockMovements = require('./routes/stockMovements');

// Middlewares 
app.use(cors()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use('/items',items); 
app.use('/users',users);
app.use('/orders',orders);
app.use('/stock',stockMovements);


// http://localhost:7000/ -> the server is on.
app.get('/', async(req,res) => {
    res.send('Hello! The server is on. ');
});


try{
    const BACKUP_PORT = 8080;
    const PORT = process.env.SERVER_DOCKER_PORT || BACKUP_PORT;
    app.listen(PORT, () => {
        console.log('Listening on... Docker Port: ' + PORT + '... ' + 'Local Port: '+ process.env.SERVER_LOCAL_PORT);
    });
}catch(e){
    console.log(e)
}