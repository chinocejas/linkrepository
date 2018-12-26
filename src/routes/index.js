const express = require('express');
const router = express.Router();



//initial Router

router.get('/',(req,res)=>{
res.send('Hello Word')
});


//exports
module.exports = router