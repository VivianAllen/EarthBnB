var express = require('express');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var session = require('express-session');
const db = require('./db');

var app = express();
// body parser setup
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies
// end body parser setup

app.use(session({secret: 'Ssh'}));
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  request.session.signinError='';
  response.redirect('/properties');
});

app.get('/signup', function(request, response) {
  response.render('signup');
});

app.get('/signin', function(request, response) {
  var errorMessage = request.session.signinError
  response.render('signin', {errorMessage: errorMessage});
});

app.post('/session/add_user', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var queryString = `INSERT INTO bnb_users(username, password) VALUES
  ('${username}', '${password}')`;
  db.query(queryString, function(err, res) {
    if (err) {
      console.log(err.stack);
    } else {
      console.log(queryString + ' sucessful!')
    };
  });
  request.session.username=username;
  response.redirect('/properties')
});


app.post('/session/signin_user', function(request, response) {
  var username = request.body.username;
  var password = request.body.password;
  var foo;
  var queryString = `SELECT * FROM bnb_users WHERE username = '${username}'`;
  db.query(queryString, function(err, res) {
    if (err) {
      console.log(err.stack);
    } else {
      if (res.rows.length === 0) {
        request.session.signinError='Username not found.';
        response.redirect('/signin')
      }else if (res.rows[0].password != password){
        request.session.signinError='Password wrong.';
        response.redirect('/signin')
      } else {request.session.username=username;
        response.redirect('/properties')
      }
    };
  });
});

app.get('/properties', function(request, response) {
  var username = request.session.username || 'anonymous';
  db.query('SELECT * FROM bnb_properties;', function(err, res) {
    if (err) {
      console.log(err.stack);
    } else {
      response.render('properties', { results: res.rows, username: username });
    };
  });
});

app.get('/properties/add', function(request, response) {
  response.render('add_property');
});

app.get('/test', function(request, response) {
  response.send('hello world');
});

app.post('/properties/add', function(request, response) {
  var imgsrc = request.body.imgsrc;
  var description = request.body.description;
  var queryString = `INSERT INTO bnb_properties(imgsrc, description) VALUES
  ('${imgsrc}', '${description}')`;

    db.query(queryString, function(err, res) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(queryString + ' sucessful!')
      };
    });

  response.redirect('/')
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
