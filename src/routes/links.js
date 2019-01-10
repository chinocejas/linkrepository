const express = require('express');
const router = express.Router();
const pool = require('../database.js'); //DB connection 

router.get('/add',(req,res) => {
    //res.send('Form');
    res.render('links/add');
})
router.post('/add',async (req,res) => { //Async para que await funcione
    //console.log(req.body); //Acá envía los datos
    const {title,url,description} = req.body
    const newLink = {
        title,
        url,
        description
    };
    //INSERT TO DB
    await pool.query('INSERT INTO links set ?',[newLink]); //cuando termina esta linea pasa a la siguiente
    //res.send('Sendio');
    res.redirect('/links/');
})

router.get('/', async (req,res) =>{
    const links = await pool.query('SELECT * FROM links');
    console.log(links);
    //res.send('listo');
    res.render('links/list',{links})
});

router.get('/delete/:id', async (req,res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?',[id]);
    res.redirect('/links/');
});

router.get('/edit/:id', async (req,res) => {
    const { id } = req.params;
    console.log(id);
    //res.send('recibido');
    const links = await pool.query('SELECT * FROM links WHERE ID = ?',[id]);
    console.log(links[0]);
    res.render('links/edit',{link: links[0]});
});

router.post('/edit/:id', async (req,res) => {
    const { id } = req.params;
    const {title,url,description} = req.body
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE ID = ?',[newLink,id]);
    res.redirect('/links');
});

module.exports = router; 