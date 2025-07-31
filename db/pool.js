require('dotenv').config();
const pg = require('pg');
pg.types.setTypeParser(pg.types.builtins.DATE, (val) => val); // Returns the date string as is (e.g., 'YYYY-MM-DD')

module.exports = new pg.Pool({
  connectionString: process.env.PGCONNECTSTRING,
});
