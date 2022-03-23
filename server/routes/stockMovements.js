const express = require('express');
const { message } = require('statuses');
const router = express.Router();

const db = require('../db/db.js');

// READ ALL STOCK MOVEMENTS order by the latest movements
router.get('/', async(req, res) => {
    try{
        const query = "SELECT * FROM stockmovement order by creationdate desc";
        const result = await db.query(query);
        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({message: err});
    }
})

// READ STOCK MOVEMENT PER ITEM 
router.get('/:item', async(req, res) => {
    try{
        const item = req.params.item;
        const query = "SELECT * FROM stockmovement WHERE item_name = '"+item+"' order by creationdate desc";
        const result = await db.query(query);

        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
        
    }catch(err){
        res.status(500).json({message: err});
    }
})

// GET CURRENT STOCK FOR ONE ITEM
router.get('/current/:item', async(req, res) => {
    try{
        const item = req.params.item;
        const query = "SELECT sum(quantity) as quantity FROM stockmovement WHERE item_name = '"+item+"' ";
        const result = await db.query(query);

        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }
        else{
            res.status(200).json(result);
        }
        
    }catch(err){
        res.status(500).json({message: err});
    }
})

// TODO: READ STOCK MOVEMENT PER DATETIME, DAY, MONTH, YEAR, ...

// CREATE STOCK MOVEMENT FOR ONE ITEM
router.post('/', async (req,res) =>{
    try{
        // get current datetime
        const current_date = new Date();
        // DATETIME FORMAT --> e.g. '2022-01-20 23:10:03'
        const creation_date = current_date.getFullYear()+'-'
                            + (current_date.getMonth()+1)+'-'
                            + current_date.getDate()+ ' '
                            + current_date.getHours() + ":" 
                            + current_date.getMinutes() + ":"
                            + current_date.getSeconds()
        const quantity = req.body['quantity'];
        const item_name = req.body['item_name'];
        const query = "INSERT INTO stockmovement values('"+creation_date+"', "+quantity+", '"+item_name+"' )";
        await db.query(query);
        res.status(200).json(item_name+" successfully inserted in STOCK!");
    }catch(err){
        res.status(500).json({message: err});
    }
})

// UPDATE STOCK MOVEMENT FOR ONE ITEM. We only can update the quantity field...
router.patch('/:creationdate', async(req, res) => {
    try{
        const creationdate = req.params.creationdate;

        const new_quantity = req.body['quantity'];
        const query = "UPDATE stockmovement SET quantity = '"+new_quantity+"'  WHERE creationdate = '"+creationdate+"' ";
        await db.query(query);
        res.status(200).json("STOCK successfully updated");
    }catch(err){
        res.status(500).json({message: err});
    }
})

// DELETE STOCK MOVEMENT BY DATETIME
router.delete('/:creationdate', async(req, res) => {
    try{
        const creationdate = req.params.creationdate;
        const query = "DELETE FROM stockmovement WHERE creationdate = '"+creationdate+"' ";
        await db.query(query);
        res.status(200).json("STOCK MOVEMENT DELETED!");
    }catch(err){
        res.status(500).json({message: err});
    }
})

module.exports = router;

