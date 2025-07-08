require("dotenv").config();

module.exports = {
  dbConfig: {
    host: process.env.AIVEN_DB_HOST,
    user: process.env.AIVEN_DB_USER,
    password: process.env.AIVEN_DB_PASSWORD,
    database: process.env.AIVEN_DB_NAME,
    port: process.env.AIVEN_DB_PORT,
  },
};
