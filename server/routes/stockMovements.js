const express = require('express');
const stockMovement = require('../controller/stockMovements.js');

const router = express.Router();

// READ ALL STOCK MOVEMENTS order by the latest movements
router.get('/', stockMovement.readAll);

// READ STOCK MOVEMENT PER ITEM 
router.get('/:item', stockMovement.readByItem);

// GET CURRENT STOCK FOR ONE ITEM
router.get('/current/:item', stockMovement.currentStockByItem);

// CREATE STOCK MOVEMENT FOR ONE ITEM
router.post('/', stockMovement.create);

// UPDATE STOCK MOVEMENT FOR ONE ITEM.
router.patch('/:creationdate', stockMovement.updateQuantity);

// DELETE STOCK MOVEMENT BY DATETIME
router.delete('/:creationdate', stockMovement.delete);

module.exports = router;

