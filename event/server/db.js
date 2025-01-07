const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "milmo100",
  port: 5432,
  database: "eventmanager",
});

module.exports = pool;
