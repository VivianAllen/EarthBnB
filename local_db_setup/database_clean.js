const { Pool } = require('pg');

const pool = new Pool({
});

console.log('Dropping earthbnb_test if exists');
connectAndQuery('DROP DATABASE IF EXISTS earthbnb_test;');

function connectAndQuery(query) {
  pool.connect((err, client, done) => {
    if (err) throw err
    client.query(query, (err, res) => {
      done()
      if (err) {
        console.log(err.stack)
      } else {
        console.log(query + ' completed')
      };
    });
  });
}
