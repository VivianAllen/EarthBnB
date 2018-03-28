var express = require('express');
var ejs = require('ejs');
const db = require('./db')

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  response.redirect('/properties')
});

app.get('/properties', function(request, response) {
  db.query('SELECT * FROM bnb_properties;', function(err, res) {
    if (err) {
      console.log(err.stack);
    } else {
      response.render('properties', { results: res.rows });
    };
  });
});

app.get('/properties/add', function(request, response) {
  response.render('add_property');
});

app.get('/test', function(request, response) {
  res.send('hello world');
});

app.get('/add_property_to_database', function(request, response) {
  var imgsrc = request.query.imgsrc
  var description = request.query.description
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
