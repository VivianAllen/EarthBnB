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
  response.redirect('/properties');
});

app.get('/signup', function(request, response) {
  response.render('signup');
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

app.get('/dbs/purge_tables', function(request, response) {
  var queryStrings = ['TRUNCATE TABLE bnb_properties RESTART IDENTITY;',
  'TRUNCATE TABLE bnb_users RESTART IDENTITY';];
  queryStrings.forEach (function(queryString) {
  db.query(queryString, function(err, res) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(queryString + ' sucessful!')
      };
    });
  });
  response.redirect('/')
});

app.get('/dbs/destroy_tables', function(request, response) {
  var queryStrings = ['DROP TABLE bnb_properties;',
  'DROP TABLE bnb_users;'];
  queryStrings.forEach (function(queryString) {
  db.query(queryString, function(err, res) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(queryString + ' sucessful!')
      };
    });
  });
  response.redirect('/')
});

app.get('/dbs/build_tables', function(request, response) {
  var queryStrings =
  ['CREATE TABLE bnb_properties (id SERIAL PRIMARY KEY, imgsrc VARCHAR(300), description VARCHAR(600));',
  'CREATE TABLE bnb_users (id SERIAL PRIMARY KEY, username VARCHAR(100), password VARCHAR(200));'];
  queryStrings.forEach (function(queryString) {
  db.query(queryString, function(err, res) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(queryString + ' sucessful!')
      };
    });
  });
  response.redirect('/')
});

app.get('/dbs/populate_tables', function(request, response) {
  var queryStrings =
  ["INSERT INTO bnb_properties (imgsrc, description) VALUES('test.jpg', 'Come and stay in our cool treehouse!');",
  "INSERT INTO bnb_users(username, password) VALUES('Test User', 'password');"];
  queryStrings.forEach (function(queryString) {
  db.query(queryString, function(err, res) {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(queryString + ' sucessful!')
      };
    });
  });
  response.redirect('/')
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
