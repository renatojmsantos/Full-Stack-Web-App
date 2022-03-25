const express = require('express');
const items = require('../controller/items.js');

const router = express.Router();

// READ ALL ITEMS
router.get('/', items.readAll);

// READ ONE ITEM
router.get('/:name', items.readOne);

// CREATE ITEM
router.post('/', items.create)

// UPDATE ONE ITEM
router.patch('/:name', items.updateOne);

// DELETE ITEM
router.delete('/:name', items.delete);


module.exports = router;

