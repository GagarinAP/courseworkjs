var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var module = require('./module/module.js');

var _ = require('lodash');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// routes for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//route for page
app.get('/', function(req, res) {
  res.render('pages/index', {title:'Головна ОСББ'});
});
app.get('/users', function(req, res) {
  res.render('pages/users', {title:'Користувачі ОСББ'});
});
app.get('/user', function(req, res) {
  res.render('pages/user', {title:'Користувач ОСББ'});
});
app.get('/search', function(req, res) {
  res.render('pages/search', {title:'Пошук ОСББ'});  
});
app.get('/add', function(req, res) {
  res.render('pages/add', {title:'ADD'});  
});


//Пошук, вивід всіх та по конкретному юзеру
app.get('/search/:name', function (req, res) {
  res.send(module.searchByCustomer(req.params.name));
});
app.get('/all', function(req, res) {	
  res.send(module.displayAll());
});
app.get('/user/:id', function(req, res) {	
  res.send(module.displayPerson(req.params.id));    
});
//Графіки
app.get('/chartGas', function (req, res) {
  res.send(module.getChartDataGas());
});
app.get('/chartEnergy', function (req, res) {
  res.send(module.getChartDataEnergy());
});
app.get('/chartWather', function (req, res) {
  res.send(module.getChartDataWather());
});
app.get('/chartIdGas/:id', function (req, res) {
  res.send(module.getChartDataIdGas(req.params.id));
});
app.get('/chartIdEnergy/:id', function (req, res) {
  res.send(module.getChartDataIdEnergy(req.params.id));
});
app.get('/chartIdWather/:id', function (req, res) {
  res.send(module.getChartDataIdWather(req.params.id));
});



app.post('/record', function (req, res) {
    res.send(module.addRecord(req.body)) ;
});


app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});