var express = require('express');
// ES6 Syntax
// const pg = require ('pg')
// const Client = pg.client
const { Pool } = require('pg');

var app = express();
// app.use(express.static(__dirname + ‘/public’));
// // views is directory for all template files
// app.set(‘views’, __dirname + ‘/views’);
// app.set(‘view engine’, ‘ejs’);

// Config settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
 response.send('Hello World, I am a small node app!');
});

app.get('/db', function(request, response) {

  pool.connect(function(err, client, done) {
    if (err) {
      throw err;
    } else {
      client.query('SELECT * FROM bnb_users;', function(err, res) {

        if (err) {
          console.log(err.stack);
        } else {
          console.log(res.rows);
          response.send(JSON.stringify(res.rows[0]));
        };
      });
    }
  })
});

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
