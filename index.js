var express = require('express');
var ejs = require('ejs');

const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/bnb_test',
});

var app = express();

app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views');

app.get('/', function(request, response) {
  response.redirect('/properties')
 // response.render('index', { title: 'Hey', message: 'Somayeh' })
});

app.get('/properties', function(request, response) {
  pool.connect(function(err, client, done) {
    if (err) {
      throw err;
    } else {
      client.query('SELECT * FROM bnb_properties;', function(err, res) {
        if (err) {
          console.log(err.stack);
        } else {
          response.render('properties', res.rows[0])
          // console.log(res.rows);
          // response.send(JSON.stringify(res.rows[0]));
        };
      });
    }
  })

});

app.get('/add_property', function(request, response) {
  response.render('add_property')
});

app.get('/add_property_to_database', function(request, response) {
  console.log(request.query.description)
  //console.log(response)
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
