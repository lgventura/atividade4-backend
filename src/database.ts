async function Connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }

  const mysql = require("mysql2/promise");

  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "atividade3Db",
  });

  global.connection = connection;
  return connection;
}

module.exports = { Connect };
