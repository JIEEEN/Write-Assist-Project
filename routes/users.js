const express = require('express');
const router = express.Router();

//router.get('/', (req, res, next)=>{
//    res.render('index', {title: 'Express'});
//});

router.get('/', (req, res, next)=>{
    res.send('Hello');
});

router.post('/', (req, res, next)=>{
    res.send('Post request');
})

router.get('/r/:sub/:id', (req, res)=>{
    const {sub, id} = req.params;
    res.send(`hello ${id} on ${sub}`);
});

module.exports = router;