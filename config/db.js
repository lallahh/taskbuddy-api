const sql = require("mssql");

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

sql.connect(config)
  .then(() => console.log("SQL Server Connected"))
  .catch(err => console.log("DB Connection Failed:", err));

module.exports = sql;