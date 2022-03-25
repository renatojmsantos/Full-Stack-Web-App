const express = require('express');
const users = require('../controller/users.js');

const router = express.Router();

// READ ALL USERS
router.get('/',users.readAll);

// READ ALL EMAILS
router.get('/emails', users.readAll);

// READ ONE USER BY EMAIL (PK)
router.get('/:email', users.readOneByEmail);

// READ USERS BY NAME
router.get('/name/:name', users.readOneByName);

// CREATE USER
router.post('/', users.create);

// UPDATE USER NAME
router.put('/:email', users.updateName);

// DELETE USER
router.delete('/:email', users.delete);


module.exports = router;

