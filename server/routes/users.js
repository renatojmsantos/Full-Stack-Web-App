const express = require('express');
const { message } = require('statuses');
const router = express.Router();

const db = require('../db/db.js');

// READ ALL USERS
router.get('/', async(req, res) => {
    try{
        const query = "SELECT * FROM user";
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

// READ ALL EMAILS
router.get('/emails', async(req, res) => {
    try{
        const query = "SELECT email FROM user";
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

// READ ONE USER BY EMAIL (PK)
router.get('/:email', async(req, res) => {
    try{
        const email = req.params.email;
        const query = "SELECT * FROM user WHERE email = '"+email+"' ";
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

// READ USERS BY NAME
router.get('/name/:name', async(req, res) => {
    try{
        const name = req.params.name;
        const query = "SELECT * FROM user WHERE name LIKE '"+name+"%' ";
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

// CREATE USER
router.post('/', async (req,res) =>{
    try{
        const name = req.body['name'];
        const email = req.body['email'];
        const query = "INSERT INTO user values('"+name+"', '"+email+"' )";
        await db.query(query);
        res.status(200).json(email+" successfully inserted!");
    }catch(err){
        console.log(err);
        res.status(500).json({message: err});
    }
})

// UPDATE USER INFO
router.put('/:email', async(req, res) => {
    try{
        const current_email = req.params.email;

        const new_name = req.body['name'];

        const query = "UPDATE user SET name = '"+new_name+"' WHERE email = '"+current_email+"' ";
        await db.query(query);
        // TODO: handle with incorrect user input of current email 
        res.status(200).json("User successfully updated");
    }catch(err){
        res.status(500).json({message: err});
    }
})

// TODO: Patch to only update email or name

// DELETE USER
router.delete('/:email', async(req, res) => {
    try{
        const email = req.params.email;
        const query = "DELETE FROM user WHERE email = '"+email+"' ";
        await db.query(query);
        res.status(200).json("USER DELETED!");
    }catch(err){
        res.status(500).json({message: err});
    }
})

module.exports = router;

