const db = require('../model/db');

// READ ALL USERS
exports.readAll = (async(req, res) => {
    try{
        const query = "SELECT * FROM user";
        const result = await db.query(query);
        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({error: err});
    }
});

// READ ALL EMAILS
exports.readAllEmails = (async(req, res) => {
    try{
        const query = "SELECT email FROM user";
        const result = await db.query(query);

        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({error: err});
    }
});

// READ ONE USER BY EMAIL (PK)
exports.readOneByEmail = (async(req, res) => {
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
        res.status(500).json({error: err});
    }
});

// READ USERS BY NAME
exports.readOneByName = (async(req, res) => {
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
        res.status(500).json({error: err});
    }
});

// CREATE USER
exports.create = (async (req,res) =>{
    try{
        const name = req.body['name'];
        const email = req.body['email'];

        const query = "INSERT INTO user values('"+name+"', '"+email+"' )";
        await db.query(query);

        res.status(200).json({message: email+" successfully inserted!"});
    }catch(err){
        res.status(500).json({error: err});
    }
});

// UPDATE USER INFO - name
exports.updateName = (async(req, res) => {
    try{
        // TODO: handle with incorrect email format
        const current_email = req.params.email;
        const new_name = req.body['name'];

        const query = "UPDATE user SET name = '"+new_name+"' WHERE email = '"+current_email+"' ";
        await db.query(query);

        res.status(200).json({message:"User successfully updated"});
    }catch(err){
        res.status(500).json({error: err});
    }
});

// DELETE USER
exports.delete = (async(req, res) => {
    try{
        const email = req.params.email;
             
        // delete user
        const query = "DELETE FROM user WHERE email = '"+email+"' ";
        await db.query(query);
 
        res.status(200).json({message: "USER DELETED!"});
    }catch(err){
        res.status(500).json({error: err});
    }
});


