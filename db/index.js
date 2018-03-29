const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/bnb_test',
});

module.exports = {
  query: function(text, params, callback) {
    return pool.query(text, params, callback)
  }
}
