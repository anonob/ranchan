var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());

app.get('/', function(req, res) {
	res.render('pages/index');
});

app.post('/thumb', function(req, res) {
	if(req.body.boards != undefined) {
		request(req.body.boards).pipe(res);
		console.log("Board: " + req.body.boards);
	} else if(req.body.threads != undefined) {
		request(req.body.threads).pipe(res);
		console.log("Thread: " + req.body.threads);
	}
});

app.listen(app.get('port'), function() {
  console.log('>ranchan is running on port', app.get('port'));
});