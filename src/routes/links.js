const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //DB connection 

router.get('/add',(req,res) => {
    //res.send('Form');
    res.render('links/add');
})
router.post('/add',(req,res) => {
    res.send('Sendio');
})

module.exports = router; 