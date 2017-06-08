var express = require('express');
var router = require('./api/config/router');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var PORT = process.env.PORT || 3000;
var MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/disconnect.world';

mongoose.connect(MONGODB_URI,function (err) {
  if (err) {
    console.error('Could not connect to Mongo: err:', err);
    process.exit(1);
  }
  console.log('Connected to database: ', mongoose.connection.name);
});

app.use(function (req, res, next) {
  console.log(req.method, req.path);
  next()

});
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}));
app.use(router);

app.listen(PORT, function() {
  console.log('App is running on port', PORT);
});

module.exports = app;
