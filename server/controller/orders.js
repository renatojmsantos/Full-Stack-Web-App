const db = require('../model/db');
const fetch = require('cross-fetch');
const nodemailer = require('nodemailer');

// READ ALL ORDERS
exports.readAll = (async(req, res) => {
    try{
        const query = "SELECT * FROM orderitem ORDER BY creationdate DESC";
        const result = await db.query(query);

        if(result.length === 0){
            //don't have rows/content
            res.status(400).json({error: 'Not found!'})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({error: err});
    }
})


// READ ALL ORDERS with STATUS incomplete (0)
exports.readAllIncomplete = (async(req, res) => {
    try{
        const query = "SELECT * FROM orderitem WHERE STATUS=0 ORDER BY creationdate DESC";
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

// READ ORDERS BY ITEM 
exports.readByItem = (async(req, res) => {
    try{
        const item = req.params.item;
        const query = "SELECT * FROM orderitem WHERE item_name LIKE '"+item+"%' ORDER BY creationdate DESC";
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

// READ ORDER BY CREATIONDATE 
exports.readByDate = ( async(req, res) => {
    try{
        const creationdate = req.params.creationdate;
        const query = "SELECT * FROM orderitem WHERE creationdate = '"+creationdate+"' ";
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

// CREATE ORDER
exports.create = (async (req,res) =>{
    try{
        // Get current datetime
        const current_date = new Date();
        // DATETIME FORMAT --> e.g. '2022-01-20 23:10:03'
        const creation_date = current_date.getFullYear()+'-'
                            + (current_date.getMonth()+1)+'-'
                            + current_date.getDate()+ ' '
                            + current_date.getHours() + ":" 
                            + current_date.getMinutes() + ":"
                            + current_date.getSeconds()

        // status is only TRUE when user admin accept the order and have stock do it.
        const status = false; 
        // body json request params
        const quantity = req.body['quantity'];
        const item_name = req.body['item_name'];
        const user_email = req.body['user_email'];
        
        const query = "INSERT INTO orderitem values('"+creation_date+"', "+quantity+", "+status+", '"+item_name+"', '"+user_email+"' )";
        await db.query(query);

        res.status(200).json({message: "ORDER "+item_name+" successfully inserted!"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// UPDATE QUANTITY OF ORDER 
exports.updateQuantity = (async(req, res) => {
    try{
        const creationdate = req.params.creationdate;
        const new_quantity = req.body['quantity'];

        const query = "UPDATE orderitem SET quantity = '"+new_quantity+"'  WHERE creationdate = '"+creationdate+"' ";
        await db.query(query);

        res.status(200).json({message: "QUANTITY of ORDER successfully updated"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// UPDATE STATUS OF ORDER 
exports.updateStatus = (async(req, res) => {
    try{
        const creationdate = req.params.creationdate;
        const new_status = req.body['status'];

        const query = "UPDATE orderitem SET status = '"+new_status+"'  WHERE creationdate = '"+creationdate+"' ";
        await db.query(query);

        res.status(200).json({message: "ORDER STATUS successfully updated"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// ACCEPT ORDER 
exports.accept = (async(req, res) => {
    try{
        const creationdate = req.params.creationdate;
        // 1. get order info
        const info = await fetch('http://localhost:8000/orders/date/'+creationdate, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).catch(err =>{
            console.error(err);
        });
        const quantity = info[0].quantity;
        const item_name = info[0].item_name;
        const user_email = info[0].user_email;

        // 2. check stock
        const stock = await fetch('http://localhost:8000/stock/current/'+item_name, {
            method: 'GET'
        }).then(res => {
            return res.json()
        }).catch(err =>{
            console.error(err);
        });
        const current_stock = stock[0].quantity;

        // calculate stock after order
        const stock_after = current_stock - quantity;
        if (stock_after < 0){
            res.status(400).json({error: "NO STOCK TO ACCEPT! Please fill the stock with more quantity."});
        }else{
            // 3. accept order -> update status to 1
            const new_status = 1;
            query = "UPDATE orderitem SET status = '"+new_status+"' WHERE creationdate = '"+creationdate+"' ";
            await db.query(query);

            // 4. Create Stock Movement for item
            await fetch('http://localhost:8000/stock', {
                method: 'POST',
                mode: 'cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "quantity":-quantity,
                    "item_name":item_name
                })
            }).catch(err =>{
                console.error(err);
            });
            // 5. Send email to user
            try{
                // created a fake account here: https://ethereal.email/create
                const transporter = nodemailer.createTransport({
                    host: 'smtp.ethereal.email', //'smtp.gmail.com'
                    port: 587,
                    auth: {
                        user: 'jaiden.huel12@ethereal.email',
                        pass: 'wHez9wZg5x5U6vrmUS'
                    }
                });

                //content of email
                const content = {
                    from: 'jaiden.huel12@ethereal.email',
                    to: user_email,
                    subject: 'Prodsmart | '+item_name+' - Order Completed',
                    text: 'The order for '+quantity+' units of '+item_name+' is now completed. Thank you!'
                };

                // send email
                transporter.sendMail(content, function(error, info){
                    if(error){
                        console.log(error);
                    } else{
                        console.log("Email sent to "+user_email+": "+ info.response);
                    }
                })
                // check emails sent at: https://ethereal.email/messages
                res.status(200).json({message: "ORDER ACCEPTED for item "+item_name+"! Stock before: "+current_stock+" After: "+stock_after});
            }catch(err){
                res.status(500).json({error: "Error sending email! "+err});
            }
        }
    }catch(err){
        res.status(500).json({error: "Error: "+err});
    }
})

// DELETE ORDER BY DATETIME (PK) => Reject ORDER
exports.delete = (async(req, res) => {
    try{
        const creationdate = req.params.creationdate;

        const query = "DELETE FROM orderitem WHERE creationdate = '"+creationdate+"' ";
        await db.query(query);

        res.status(200).json({message: "ORDER DELETED!"});
    }catch(err){
        res.status(500).json({error: err});
    }
})

// TODO: DELETE ORDER BY USER, ITEM, STATUS ...
