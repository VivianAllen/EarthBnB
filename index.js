var express = require('express');
var ejs = require('ejs');
const db = require('./db');

var app = express();
// body parser setup
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  response.render('db_admin');
});

app.get('/dbs/purge_tables', function(request, response) {
  var queryStrings = ['TRUNCATE TABLE bnb_properties RESTART IDENTITY;',
  'TRUNCATE TABLE bnb_users RESTART IDENTITY;'];
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
  ['CREATE TABLE bnb_properties (id SERIAL PRIMARY KEY, imgsrc VARCHAR(300), title VARCHAR(100), username VARCHAR(100), description VARCHAR(600));',
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
  ["INSERT INTO bnb_properties (imgsrc, title, username, description) VALUES('test.jpg', My Treehouse, Test User, 'Come and stay in our cool treehouse!');",
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
