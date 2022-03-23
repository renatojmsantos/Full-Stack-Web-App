const express = require('express');
const { message } = require('statuses');
const router = express.Router();

const db = require('../db/db.js');

// READ ALL ITEMS
router.get('/', async(req, res) => {
    try{
        const query = "SELECT * FROM item";
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

// READ ONE ITEM
router.get('/:name', async(req, res) => {
    try{
        console.log(req.params.name);
        const name = req.params.name;
        const query = "SELECT * FROM item WHERE name = '"+name+"' ";
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

// CREATE ITEM
router.post('/', async (req,res) =>{
    try{
        const name = req.body['name'];
        const query = "INSERT INTO item values('"+name+"')";
        await db.query(query);
        res.status(200).json(name+" successfully inserted!");
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// UPDATE ONE ITEM
router.patch('/:name', async(req, res) => {
    try{
        const old_name = req.params.name;
        const new_name = req.body['name'];
        const query = "UPDATE item SET name = '"+new_name+"' WHERE name = '"+old_name+"' ";
        await db.query(query);
        res.status(200).json("successfully updated");
    }catch(err){
        res.status(500).json({message: err});
    }
})

// DELETE ITEM
router.delete('/:name', async(req, res) => {
    try{
        const name = req.params.name;
        const query = "DELETE FROM item WHERE name = '"+name+"' ";
        await db.query(query);
        res.status(200).json("DELETED!");
    }catch(err){
        res.status(500).json({message: err});
    }
})

module.exports = router;

