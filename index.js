var express = require('express');
const { Client } = require('pg');
var app = express();
// app.use(express.static(__dirname + ‘/public’));
// // views is directory for all template files
// app.set(‘views’, __dirname + ‘/views’);
// app.set(‘view engine’, ‘ejs’);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

app.set('port', (process.env.PORT || 5000));

app.get('/', function(request, response) {
 response.send('Hello World, I am a small node app!');
});

app.get('/db', function(request, response) {

  client.connect();

  client.query('SELECT * FROM test_table;', (err, res) => {

    if (err) client.end();

    for (let row of res.rows) {
      console.log(JSON.stringify(row));
      response.send(row);
    }
    client.end();
  });
});

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
