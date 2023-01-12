const express = require('express');
const path = require('path');
const app = express();

const userRouter = require('./routes/users');
const testRouter = require('./routes/test');

const port = process.env.PORT | 8080;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));


app.use('/users', userRouter);
app.use('/search', testRouter);

//error page load 404
app.get((req, res)=>{
    res.status(404).send('not found');
});

app.get('/r/:sub', (req, res)=>{
    const {sub} = req.params;
    res.render('index', {title: sub});
})

app.get('*', (req, res)=>{
    res.send('we cannot handle it');
});

app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})