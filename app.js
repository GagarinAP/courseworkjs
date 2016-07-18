var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var module = require('./module/module.js');
var appView = require('./module/appView.js');
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
  res.render('pages/index');
});
app.get('/users', function(req, res) {
  res.render('pages/users');
});
app.get('/user', function(req, res) {
  res.render('pages/user');
});
app.get('/help', function(req, res) {
  res.render('pages/help');
});
app.get('/search', function(req, res) {
  res.render('pages/search');  
});
//ajax
app.get('/search/:name', function (req, res) {
  res.send(module.searchByCustomer(req.params.name));
});
app.get('/chartGas', function (req, res) {
  res.send(module.getChartDataGas());
});
app.get('/chartEnergy', function (req, res) {
  res.send(module.getChartDataEnergy());
});
app.get('/chartWather', function (req, res) {
  res.send(module.getChartDataWather());
});
app.get('/chartId/:id', function (req, res) {
  res.send(module.getChartDataIdGas(req.params.id));
});
app.get('/chartId/:id', function (req, res) {
  res.send(module.getChartDataIdEnergy(req.params.id));
});
app.get('/chartId/:id', function (req, res) {
  res.send(module.getChartDataIdWather(req.params.id));
});
app.get('/all', function(req, res) {	
  res.send(module.displayAll());
});
app.get('/user/:id', function(req, res) {	
  res.send(module.displayPerson(req.params.id));    
});



app.listen(app.get('port'), function() {
  console.log('App is running on port', app.get('port'));
});