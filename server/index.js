const express = require('express');
const cors = require('cors');
require('dotenv/config');

const app = express();

// TODO: file that creates tables for mysql

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
    res.status(200).send('Hello! The server is on. ');
});

// all other requests to / redirect to 404
app.all("*", async(req, res) => {
    res.status(404).send('Not Found!');
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