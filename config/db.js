const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 17 for SQL Server};Server=DESKTOP-NK3B13Q\\SQLEXPRESS;Database=TaskBuddy;Trusted_Connection=Yes;"
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log("SQL Server Connected Successfully");
    return pool;
  })
  .catch(err => {
    console.log("Database connection failed:", err);
  });

module.exports = {
  sql,
  poolPromise
};