var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.post('/boards', function(req, res) {
	request(req.body.boards).pipe(res);
	console.log("Board: " + req.body.boards);
});

app.post('/threads', function(req, res) {
	request(req.body.threads).pipe(res);
	console.log("Thread: " + req.body.threads);
});

app.listen(app.get('port'), function() {
  console.log('>ranchan is running on port', app.get('port'));
});