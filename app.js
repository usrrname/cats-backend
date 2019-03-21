var surveyApi = require('./api').survey;
var catApi = require('./api').cats;
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// body parser middleware
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static('dist'))

// get api
app.get('/survey', surveyApi);

app.get('/cats', catApi);

// error handler
app.use(function (err, req, res, next) {
  console.log(res);
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('listening on port ' + port);
});