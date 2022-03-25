const express = require('express');
const orders = require('../controller/orders.js');

const router = express.Router();

// READ ALL ORDERS
router.get('/', orders.readAll);

// READ ALL ORDERS with STATUS incomplete (0)
router.get('/incomplete', orders.readAllIncomplete);

// READ ORDERS BY ITEM 
router.get('/:item', orders.readByItem);

// READ ORDER BY CREATIONDATE 
router.get('/date/:creationdate', orders.readByDate);

// TODO: READ ORDERS BY USER, DATETIME, DAY, MONTH, YEAR, ...

// CREATE ORDER
router.post('/', orders.create);

// UPDATE QUANTITY OF ORDER 
router.patch('/quantity/:creationdate', orders.updateQuantity);

// UPDATE STATUS OF ORDER 
router.patch('/status/:creationdate', orders.updateStatus);

// ACCEPT ORDER 
router.patch('/accept/:creationdate', orders.accept);

// DELETE ORDER BY DATETIME (PK) => Reject ORDER
router.delete('/:creationdate', orders.delete);

// TODO: DELETE ORDER BY USER, ITEM, STATUS ...

module.exports = router;

