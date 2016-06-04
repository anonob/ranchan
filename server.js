var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.post('/boards', function(req, res) {
	request(req.body.boards).pipe(res);
	console.log("Board: " + req.body.boards);
});

app.post('/threads', function(req, res) {
	request(req.body.threads).pipe(res);
	console.log("Thread: " + req.body.threads);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});