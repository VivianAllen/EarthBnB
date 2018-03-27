var express = require('express');
const { Client, Pool } = require('pg');

// ES6 Syntax
// const pg = require ('pg')
// const Client = pg.client

var app = express();
// app.use(express.static(__dirname + ‘/public’));
// // views is directory for all template files
// app.set(‘views’, __dirname + ‘/views’);
// app.set(‘view engine’, ‘ejs’);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
// Config Settings
// SSL is encrypted data


app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
 response.send('Hello World, I am a small node app!');
});

app.get('/db', function(request, response) {

  pool.query('SELECT * FROM test_table;', function(err, res) {
    if (err) {
      throw err;
      pool.end();
    } else {
      for (let row of res.rows) {
        console.log(JSON.stringify(row));
        response.send(row);
        pool.end()
      }
    }
  });

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
