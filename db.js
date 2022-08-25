let mysql = require('mysql');

function dbConnect() {
  let connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  connection.connect(function (error) {
    if (error) {
      res.status(500);
      return console.error('error: ' + error.message);
    }
    console.log('Connected to the MySQL.');
  });
  return connection;
}

const mySqlOperation = (sql, params) => {
  return new Promise((resolve, reject) => {
    let connection = dbConnect();
    connection.query(sql,params, (error, results) => {
      if (error) {
        resolve(error.message);
      }
      resolve(results)
      connection.end();
    });
  })
}



module.exports = { mySqlOperation };


