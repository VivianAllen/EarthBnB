const { Pool } = require('pg');

const pool = new Pool({
});

// setup up a fake database - earthBnB test


console.log('Creating databases...');

connectAndQuery('CREATE DATABASE earthbnb_test;');
// connectAndQuery('CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(100));')
// connectAndQuery("INSERT INTO users (username) VALUES ('test_user');")

// connectAndQuery('CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(100));',
// connectAndQuery("INSERT INTO users (username) VALUES ('test_user');")
// );



function connectAndQuery(query, callback = false) {
  pool.connect(function(err, client) {
    if (err) {
      throw err;
    } else {
      client.query(query, function(err, res) {
        if (err) {
          console.log(err.stack);
        } else {
          console.log(query + ' completed');
          callback;
        };
      });
    }
  })
}
