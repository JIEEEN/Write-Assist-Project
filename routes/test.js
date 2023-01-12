const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    const {q} = req.query;
    if(!q){
        res.send('NOTTHING FOUND');
    }
    console.log(q);
    res.send(`Hi ${q}`);
});

module.exports = router;