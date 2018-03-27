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
console.log(process.env.PORT);

app.get('/', function(request, response) {
 response.send('Hello World, I am a small node app!');
});

app.get('/db', function(request, response) {

    // callback - checkout a client
    pool.connect((err, client, done) => {
      if (err) throw err
      client.query('SELECT * FROM test_table;', (err, res) => {
        done()

        if (err) {
          console.log(err.stack)
        } else {
          console.log(res.rows[0])
          response.send(JSON.stringify(res.rows[0]));
        }
      })
    })
});

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
