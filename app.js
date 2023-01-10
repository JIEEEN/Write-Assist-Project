const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const port = process.env.PORT | 3000;


app.use(express.static('routes'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.set('view enjine', 'ejs');


let user_info = {};


app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/routes/main.html');
});
app.get('/main', (req, res)=>{
    res.sendFile(__dirname + '/routes/main.html');
});
app.get('/email_post', (req, res)=>{
    res.sendFile(__dirname + '/routes/form.html');
});
app.get('/info.json', (req, res, next)=>{
    res.json(user_info);
});


app.post('/email_post', (req, res)=>{
    res.render('email.ejs', {'email':req.body.email});
});


user_info = JSON.parse(
    fs.readFileSync(__dirname + '/public/data/info.json', 'utf-8')
);

let item = fetch('http://localhost:3000/info.json')
    .then(response => response.json())
    .then(json => console.log(json.name)) // -> ±è±Ô¹Î
    .catch(error => console.log("error :", error));


app.listen(port, ()=>{
    console.log(`listening on ${port}`);
});