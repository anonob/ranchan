var express = require('express'),
	path = require('path'),
	request = require('request'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	sass = require('node-sass'),
	sassMiddleware = require('node-sass-middleware');;


var app = express();
app.set('port', (process.env.PORT || 5000));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(cors());
app.use(sassMiddleware({
    src: path.join(__dirname, 'assets/private/scss'),
    dest: path.join(__dirname, 'assets/public/css'),
    outputStyle: 'compressed',
    prefix: '/css'
  })
);
app.use(express.static(path.join(__dirname, 'assets/public')));


app.get('/', function(req, res) {
	res.render('pages/index');
});
app.post('/boards', function(req, res) {
	var bURL = req.body.chan.boardURL;
	request(bURL).pipe(res);
});
app.post('/catalog', function(req, res) {
	var cURL = req.body.chan.catalogURLpre + req.body.board.sname + req.body.chan.catalogURLpost;
	request(cURL).pipe(res);
});


app.listen(app.get('port'), function() {
  console.log('>ranchan is running on port', app.get('port'));
});