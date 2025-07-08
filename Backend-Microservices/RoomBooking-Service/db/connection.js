const { Pool } = require("pg");
const fs = require("fs");
const { dbConfig } = require("../utils/config");

const db = new Pool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    ca: fs.readFileSync(process.env.AIVEN_CA_PATH),
  },
});

module.exports = db;
