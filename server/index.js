const express = require('express');
const cors = require('cors');

require('dotenv/config');

const app = express();

// Import Routes
const items = require('./routes/items');
const users = require('./routes/users');
const orders = require('./routes/orders');
const stockMovements = require('./routes/stockMovements');

// Middlewares 
// Enable all CORS requests
app.use(cors()); 
// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// use routes
app.use('/items',items); 
app.use('/users',users);
app.use('/orders',orders);
app.use('/stock',stockMovements);

// http://localhost:7000/ -> the server is on.
app.get('/', async(req,res) => {
    res.status(200).send({message: 'Hello! The server is on. '});
});

// all other requests to / redirect to 404 error page
app.all("*", async(req, res) => {
    res.status(404).send({error: 'Not Found!'});
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

// TODO: 
// - if there no tables creates yet (1st time), automatically create tables for mysql database
// - use filtering, sorting, pagination, SSL