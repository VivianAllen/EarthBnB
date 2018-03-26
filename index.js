var express = require('express');
var pg = require('pg');
var app = express();
var pool = new pg.Pool();
// app.use(express.static(__dirname + ‘/public’));
// // views is directory for all template files
// app.set(‘views’, __dirname + ‘/views’);
// app.set(‘view engine’, ‘ejs’);

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
 response.send('Hello World, I am a small node app!');
});

app.get('/db', function(request, response) {
  pool.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err) {
        console.error(err);
        response.send("Error" + err);
      } else {
        console.log(result.rows);
        response.send(result.rows);
      };
    });
  });
  //pool.end();
});

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
