const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const userRouter = require('./routes/users');
const testRouter = require('./routes/test');

const port = process.env.PORT | 6125; //원래는 8080

let accountDB = {}
let novelDB = {}

accountDB['test']=1231;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static('lib'));


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

app.get('/test',(req, res) => {
  fs.readFile('./lib/html/main.html', 'utf8', function( err, html) {
	res.send(html);
  });
});

app.post('/login',(req, res) => {
  id = req.body.id;
  pw = req.body.pw;
  if(!(id in accountDB)){
	res.status(406).send('아직 가입이 안되어있어요.');
	console.log(`id : ${id} - not registered`);
	return;
  }
  if(!(accountDB[id] == pw)){
	res.status(406).send('비밀번호가 틀렸어요.');
	console.log(`id : ${id} -> wrong pw: ${pw}`);
	return;
  }
  res.status(200).json({'isLoginPassed':true, 'hasNovelWritten': id in novelDB})
});

app.post('/get-written-novel',(req, res) => {
  id = req.body.id;
  pw = req.body.pw;
  if(!(id in accountDB)){
	res.status(406).send('not registered');
	return;
  }
  if(!(accountDB[id] == pw)){
	res.status(406).send('incorrect pw');
	return;
  }
  console.log(`user ${id}'s  novel found in novelDB[id]`);
  res.status(200).send(novelDB[id]);
});

app.post('/save',(req, res) => {
  if(req.body.id == ''){
	res.status(406).send('no id');
	return;
  }
  novelDB[req.body.id] = req.body.novel;
  res.status(200).send('saved');
});

app.post('/load', (req, res) => {
  let id = req.body.id;
  if(id in novelDB){
	res.status(200).send(novelDB[id])
  }else{
	res.status(406).send('not registered');
  }
});

app.get('*', (req, res)=>{
    res.send('we cannot handle it');
});


app.listen(port, ()=>{
    console.log(`server is listening on ${port}`);
})
