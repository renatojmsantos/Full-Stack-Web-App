const db = require('../model/db');

exports.readAll = (async(req, res) => {
  try{
      const query = "SELECT * FROM item";
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

// READ ONE ITEM
exports.readOne = (async(req, res) => {
    try{
        const name = req.params.name;
        const query = "SELECT * FROM item WHERE name = '"+name+"' ";
        const result = await db.query(query);

        if(result.length === 0){
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({error: err});
    }
})

// CREATE ITEM
exports.create = (async (req,res) =>{
    try{
        const name = req.body['name'];
        const query = "INSERT INTO item values('"+name+"')";
        await db.query(query);

        res.status(200).json({message: name+" successfully inserted!"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// UPDATE ONE ITEM
exports.updateOne = (async(req, res) => {
    try{
        const old_name = req.params.name;
        const new_name = req.body['name'];
        const query = "UPDATE item SET name = '"+new_name+"' WHERE name = '"+old_name+"' ";
        await db.query(query);

        res.status(200).json({message:"successfully updated"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// DELETE ITEM
exports.delete = (async(req, res) => {
    try{
        const name = req.params.name;
        const query = "DELETE FROM item WHERE name = '"+name+"' ";
        await db.query(query);

        res.status(200).json({message:"DELETED!"});
    }catch(err){
        res.status(500).json({error: err});
    }
})


