var bodyParser = require("body-parser");
var express = require('express');
var app = express();
var appView = require('./module/appView.js');
var module = require('./module/module.js');
var _ = require('lodash-node');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.set('port', (process.env.PORT || 3000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  res.render('pages/index');
});
app.get('/user', function(req, res) {
  res.render('pages/user');
});
app.get('/help', function(req, res) {
  res.render('pages/help');
});
app.get('/chart', function (req, res) {
  res.send(module.getChartData());
});

app.get('/chart1', function (req, res) {
  res.send(module.getChartData1());
});

app.get('/all', function(req, res) {	
  res.send(module.displayAll(req.query));
});
app.get('/user/:id', function(req, res) {	
  res.send(module.displayId(req.params.id));
  //res.send(module.getChartData1(req.params.id));  
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});