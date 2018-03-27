var express = require('express');
var ejs = require('ejs');

//const db = require('./db');

var app = express();
// app.use(express.static(__dirname + ‘/public’));
// // views is directory for all template files
app.set('views', __dirname + '/views');


app.set('port', (process.env.PORT || 5000));
app.set('view engine', 'ejs')

app.get('/', function(request, response) {  
 response.render('index', { title: 'Hey', message: 'Somayeh' })
});

app.get('/db', function(request, response) {
  db.query('SELECT * FROM test_table', function(err, res) {
      if (err) {
        return next(err)
      }
      res.send(res.rows[0])
      console.log(res.rows[0])
    });
});

app.listen(app.get('port'), function() {
 console.log('Node app is running on port', app.get('port'));
});
